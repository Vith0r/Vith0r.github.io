---
weight: 10
title: "Post X: Writing and Compiling Shellcode in C"
date: 2024-07-23T15:58:26+08:00
lastmod: 2024-07-23T15:58:26+08:00
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

Bom nesse post vou mostrar rapidamente como utilizar o projeto [masm_shc](https://github.com/hasherezade/masm_shc/) primeiro deixamos na mesma pasta o `peb_lookup.h` e nosso código em C.
## Criação

Vamos precisar do `Developer Command Prompt` para executar os sequintes comandos `"vcvarsall.bat" x64` e `cl.exe /c /FA /GS- /I"D:\seu_diretorio" shellcode.cpp` Então, esse comando irá gerar o `shellcode.asm` Aqui está o código do shellcode.cpp:

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.

```cpp
#include <Windows.h>
#include "peb_lookup.h"

int main()
{
    LPVOID base = get_module_by_name((const LPWSTR)L"kernel32.dll");
    if (!base) {
        return 1;
    }
    auto _WinExec = reinterpret_cast<decltype(&WinExec)>(get_func_by_name((HMODULE)base, (LPSTR)"WinExec"));
    if (!_WinExec) {
        return 4;
    }
    _WinExec("cmd.exe /C systeminfo > systeminfo.txt", SW_SHOWNORMAL);
    return 0;
}
```

Bom depois do `shellcode.asm` ter sido gerado, vamos utilizar o `masm_shc.exe` para corrigir algumas coisas do `shellcode.asm` então vamos dar os argumentos `masm_shc.exe shellcode.asm shellcode2.asm` e pronto em seguida vamos dar o comando `"ml64.exe" shellcode2.asm /link /entry:AlignRSP` que irá nos gerar um executável. Então, abrimos esse executável no 
`CFF-EXPLORER` Para fazer o dump da seção .text, que será o nosso shellcode:

![](https://telegra.ph/file/13c05682bc8a7466a26c0.png)

Então, pronto! Temos nosso shellcode. Podemos usar um carregador simples para testar nosso shellcode:

![](https://telegra.ph/file/8f6c49d48a7642ecb4046.png)

Se jogarmos esse shellcode no `VirusTotal`, obteremos os seguintes resultados:

![](https://telegra.ph/file/efd326b1f1b861066f780.png)

O objetivo deste post era mais mostrar o uso do projeto `masm_shc`. Não me aprofundei muito no tópico de criação de shellcode, pois estou meio sem tempo. Porém, vou ver se consigo reservar um tempo livre em um fim de semana para ler mais sobre o assunto. Já salvei alguns materiais que abordam esse tópico, como:
[From a C project through assembly to shellcode](https://github.com/vxunderground/VXUG-Papers/blob/main/From%20a%20C%20project%20through%20assembly%20to%20shellcode.pdf)
[Leveraging from PE parsing technique to write x86 shellcode](https://mohamed-fakroud.gitbook.io/red-teamings-dojo/shellcoding/leveraging-from-pe-parsing-technique-to-write-x86-shellcode#finding-kernel32-base-address)
[introduction-to-windows-shellcode-development-part1](https://securitycafe.ro/2015/10/30/introduction-to-windows-shellcode-development-part1/)
[Introduction to Windows shellcode development – Part 2](https://securitycafe.ro/2015/12/14/introduction-to-windows-shellcode-development-part-2/)
[Introdução ao desenvolvimento de shellcode do Windows – Parte 3](https://securitycafe.ro/2016/02/15/introduction-to-windows-shellcode-development-part-3/)
[Windows x64 Shellcode Development](https://www.bordergate.co.uk/windows-x64-shellcode-development/)
[Basics of Windows shellcode writing](https://idafchev.github.io/exploit/2017/09/26/writing_windows_shellcode.html)
[Windows shellcoding - part 1. Simple example](https://cocomelonc.github.io/tutorial/2021/10/27/windows-shellcoding-1.html)
[Windows shellcoding - part 2. Find kernel32 address](https://cocomelonc.github.io/tutorial/2021/10/30/windows-shellcoding-2.html)
[Windows shellcoding - part 3. PE file format](https://cocomelonc.github.io/tutorial/2021/10/31/windows-shellcoding-3.html)