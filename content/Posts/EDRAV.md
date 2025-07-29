---
weight: 7
title: "Post VII: Criando um EDR/AV Part-1"
date: 2024-08-06T15:58:26+08:00
lastmod: 2024-08-06T15:58:26+08:00
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

Bom, neste post vou criar uma ideia para o começo de um `EDR/AV` básico que provavelmente eu nunca vou terminar.<br> A ideia principal agora é criar uma DLL simples que utilize a `MinHook` para conseguir realizar um hook em APIs.
## Como vai funcionar?

Primeiro vamos fazer o código principal que será responsável por injetar nossa `dll` no executavel que queremos monitorar.
O principal intuito vai ser monitorar as APIs utilizadas por loaders. O intuito é apenas monitorar as chamadas de API da kernel32.
Ou seja, se o programa utilizar técnicas como syscalls indiretas ou diretas, nosso `EDR/AV` não terá como detectar o loader.
## Código Principal:

### Código que obtém o ID do processo com o nome fornecido:

```cpp
DWORD GetProcessIdByName(const wstring& processName) {
    DWORD processId = 0;
    HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    PROCESSENTRY32 processEntry = { sizeof(PROCESSENTRY32) };
    if (Process32First(snapshot, &processEntry)) {
        do {
            if (processName == processEntry.szExeFile) {
                processId = processEntry.th32ProcessID;
                break;
            }
        } while (Process32Next(snapshot, &processEntry));
    }
    CloseHandle(snapshot);
    return processId;
}
```

---
### Código para Injeção da DLL:

1. `Abertura do Processo Alvo:` Utiliza a API `OpenProcess` para obter um identificador para o processo alvo, especificado pelo `processId`.
2. `Localização da Função LoadLibraryW:` Obtém o endereço da função `LoadLibraryW` na biblioteca `kernel32.dll` que será utilizada para carregar a DLL no processo alvo.
3. `Alocação de Memória no Processo Alvo:` Usa `VirtualAllocEx` para alocar memória no processo alvo para armazenar o caminho da DLL.
4. `Escrita do Caminho da DLL na Memória do Processo Alvo:` Com `WriteProcessMemory`.
5. `Criação de um Novo Thread:` Cria um novo thread no processo alvo com `CreateRemoteThread`, que executa a função `LoadLibraryW` para carregar a DLL.
6. `Aguarda a Conclusão da Injeção:` Utiliza `WaitForSingleObject` para aguardar o término do thread.
7. `Limpeza e Fechamento:` Após a execução, libera a memória alocada com `VirtualFreeEx` e fecha o handle do processo e do thread com `CloseHandle`.

```cpp
int InjectDll(DWORD processId, const wstring& dllPath) {
    HANDLE processHandle = OpenProcess(PROCESS_ALL_ACCESS, FALSE, processId);
    if (processHandle == NULL) {
        return -1;
    }

    LPVOID loadLibraryAddress = (LPVOID)GetProcAddress(GetModuleHandle(L"kernel32.dll"), "LoadLibraryW");
    if (loadLibraryAddress == NULL) {
        CloseHandle(processHandle);
        return -2;
    }

    size_t pathLength = (dllPath.size() + 1) * sizeof(wchar_t);
    LPVOID remoteDllPath = VirtualAllocEx(processHandle, NULL, pathLength, MEM_COMMIT, PAGE_READWRITE);
    if (remoteDllPath == NULL) {
        CloseHandle(processHandle);
        return -3;
    }

    if (!WriteProcessMemory(processHandle, remoteDllPath, dllPath.c_str(), pathLength, NULL)) {
        VirtualFreeEx(processHandle, remoteDllPath, 0, MEM_RELEASE);
        CloseHandle(processHandle);
        return -4;
    }

    HANDLE threadHandle = CreateRemoteThread(processHandle, NULL, 0, (LPTHREAD_START_ROUTINE)loadLibraryAddress, remoteDllPath, 0, NULL);
    if (threadHandle == NULL) {
        VirtualFreeEx(processHandle, remoteDllPath, 0, MEM_RELEASE);
        CloseHandle(processHandle);
        return -5;
    }

    WaitForSingleObject(threadHandle, INFINITE);

    DWORD exitCode = 0;
    GetExitCodeThread(threadHandle, &exitCode);

    CloseHandle(threadHandle);
    VirtualFreeEx(processHandle, remoteDllPath, 0, MEM_RELEASE);
    CloseHandle(processHandle);

    return exitCode;
}
```

---
### NamedPipeServer para Comunicação:

O [NamedPipeServer](https://learn.microsoft.com/en-us/dotnet/standard/io/how-to-use-named-pipes-for-network-interprocess-communication) é basicamente responsável por criar um servidor de Named Pipe que escuta por conexões e processa mensagens recebidas.

Explicação do Código:

1. `Criação do Named Pipe:` Utiliza CreateNamedPipe para criar um pipe nomeado (MyPipe) que aceita conexões. Configurado para acesso de entrada (PIPE_ACCESS_INBOUND), com suporte a mensagens e leitura no modo de mensagens.
2. `Conexão com o Pipe:` ConnectNamedPipe aguarda a conexão de um cliente ao pipe. Se falhar, o erro é exibido e o pipe é fechado.
3. `Leitura de Dados:` Usa ReadFile para ler os dados do pipe. Se ocorrer um erro de leitura ou o pipe for quebrado (ERROR_BROKEN_PIPE), o loop de leitura é interrompido. Se a leitura for bem-sucedida, os dados são exibidos no console.
4. `Fechamento e Repetição:` Após a leitura ou se a conexão falhar, o handle do pipe é fechado. O servidor continua a executar e criar novos pipes em um loop infinito.

```cpp
void StartNamedPipeServer() {
    while (true) {
        HANDLE hPipe = CreateNamedPipe(
            TEXT("\\\\.\\pipe\\MyPipe"),
            PIPE_ACCESS_INBOUND,
            PIPE_TYPE_MESSAGE | PIPE_READMODE_MESSAGE | PIPE_WAIT,
            1, 0, 0, 0, NULL);

        if (hPipe == INVALID_HANDLE_VALUE) {
            cerr << "Failed to create named pipe. Error: " << GetLastError() << endl;
            return;
        }

        if (ConnectNamedPipe(hPipe, NULL) != FALSE) {
            char buffer[1024];
            DWORD bytesRead;

            while (true) {
                if (!ReadFile(hPipe, buffer, sizeof(buffer) - 1, &bytesRead, NULL)) {
                    if (GetLastError() == ERROR_BROKEN_PIPE) {
                        break;
                    }
                    else if (GetLastError() != ERROR_MORE_DATA) {
                        cerr << "ReadFile failed. Error: " << GetLastError() << endl;
                        break;
                    }
                }
                else {
                    buffer[bytesRead] = '\0';
                    cout << "Received: " << buffer << endl;
                }
            }
        }
        else {
            cerr << "Failed to connect to named pipe. Error: " << GetLastError() << endl;
            CloseHandle(hPipe);
            break;
        }

        CloseHandle(hPipe);
    }
}
```

```cpp
int main() {
    PrintBanner();

    cout << "Escolha o modo de operacao:" << endl;
    cout << "1. Fornecer caminho completo do executavel" << endl;
    cout << "Digite sua escolha (1): ";
    int choice;
    cin >> choice;
    cin.ignore();

    wstring exePathW;
    DWORD processId = 0;
    wstring dllName(L"hook.dll");

    if (choice == 1) {
        cout << "Digite o caminho completo do executavel para abrir e escanear: ";
        string exePath;
        getline(cin, exePath);
        exePathW = wstring(exePath.begin(), exePath.end());

        STARTUPINFO si = { sizeof(si) };
        PROCESS_INFORMATION pi;
        if (!CreateProcess(NULL, &exePathW[0], NULL, NULL, FALSE, CREATE_SUSPENDED, NULL, NULL, &si, &pi)) {
            cerr << "Falha ao iniciar o processo. Erro: " << GetLastError() << endl;
            return -1;
        }

        int result = InjectDll(pi.dwProcessId, dllName);
        if (result < 0) {
            cout << "Falha na injecao da DLL. Codigo de erro: " << result << endl;
            TerminateProcess(pi.hProcess, result);
            CloseHandle(pi.hProcess);
            CloseHandle(pi.hThread);
            return -1;
        }

        ResumeThread(pi.hThread);
        CloseHandle(pi.hProcess);
        CloseHandle(pi.hThread);

        cout << "Injecao realizada com sucesso. DLL conectada." << endl;
    }
    else {
        cerr << "Opcao invalida. Por favor, escolha 1." << endl;
        return -1;
    }

    StartNamedPipeServer();

    cout << "Pressione Enter para sair...";
    cin.get();

    return 0;
}
```
## Código Responsavel pelo hook:

### Inclusão da MinHook:
Este trecho de código inclui a biblioteca `MinHook`, uma popular biblioteca de hooking para a API do Windows.

```cpp
#include "MinHook.h"

#ifdef _WIN64
#pragma comment(lib, "minhook.x64.lib")
#elif _WIN32
#pragma comment(lib, "minhook.x32.lib")
#endif
```

---
### Funções:
Aqui definidos tipos de função para algumas das APIs do Windows que serão `hooked`.
Cada tipo de função corresponde a uma função da API do Windows que será substituída por uma função personalizada para monitorar ou modificar seu comportamento.

```cpp
typedef BOOL(WINAPI* fnWriteProcessMemory)(
    HANDLE hProcess,
    LPVOID lpBaseAddress,
    LPCVOID lpBuffer,
    SIZE_T nSize,
    SIZE_T* lpNumberOfBytesWritten);

typedef BOOL(WINAPI* fnOpenProcess)(
    WORD dwDesiredAccess,
    BOOL  bInheritHandle,
    DWORD dwProcessId
);

typedef BOOL(WINAPI* fnVirtualAllocEx)(
    HANDLE hProcess,
    LPVOID lpAddress,
    SIZE_T dwSize,
    DWORD  flAllocationType,
    DWORD  flProtect
);

typedef BOOL(WINAPI* fnCreateRemoteThread)(
    HANDLE                 hProcess,
    LPSECURITY_ATTRIBUTES  lpThreadAttributes,
    SIZE_T                 dwStackSize,
    LPTHREAD_START_ROUTINE lpStartAddress,
    LPVOID                 lpParameter,
    DWORD                  dwCreationFlags,
    LPDWORD                lpThreadId
);
```

---
### Ponteiros para as funções originais:

Essa parte define ponteiros para as funções originais da API do Windows que serão substituídas pelos hooks. Esses ponteiros são necessários para que o código possa chamar as funções originais após interceptá-las.

```cpp
fnWriteProcessMemory g_WriteProcessMemory = NULL;
fnOpenProcess g_OpenProcess = NULL;
fnVirtualAllocEx g_VirtualAllocEx = NULL;
fnCreateRemoteThread g_CreateRemoteThread = NULL;
```

---
### Enviar Mensagem para o Named Pipe:

Essa parte é responsável por enviar mensagens para o nosso `Named Pipe`.

```cpp
void SendMessageToPipe(const char* message) {
    HANDLE hPipe = CreateFile(
        TEXT("\\\\.\\pipe\\MyPipe"),
        GENERIC_WRITE,
        0,
        NULL,
        OPEN_EXISTING,
        0,
        NULL);

    if (hPipe != INVALID_HANDLE_VALUE) {
        DWORD bytesWritten;
        BOOL result = WriteFile(hPipe, message, strlen(message), &bytesWritten, NULL);

        if (!result) {
            char errorMsg[128];
            snprintf(errorMsg, sizeof(errorMsg), "Failed to write to pipe. Error: %lu\n", GetLastError());
            WriteFile(hPipe, errorMsg, strlen(errorMsg), &bytesWritten, NULL);
        }

        CloseHandle(hPipe);
    }
    else {
        char errorMsg[128];
        snprintf(errorMsg, sizeof(errorMsg), "Failed to open pipe. Error: %lu\n", GetLastError());
        HANDLE hPipeError = CreateFile(
            TEXT("\\\\.\\pipe\\MyPipe"),
            GENERIC_WRITE,
            0,
            NULL,
            OPEN_EXISTING,
            0,
            NULL);
        if (hPipeError != INVALID_HANDLE_VALUE) {
            DWORD bytesWrittenError;
            WriteFile(hPipeError, errorMsg, strlen(errorMsg), &bytesWrittenError, NULL);
            CloseHandle(hPipeError);
        }
    }
}
```

---
### Código Responsavel por terminar o processo:

Essa parte do código exibe uma caixa de mensagem de alerta e em seguida encerra o processo atual.
essa função será usada para bloquear a execução do processo caso ele faça uso de uma API que consideramos maliciosa.

```cpp
void BlockExecution(BOOL showMessageBox) {
    if (showMessageBox) {
        MessageBox(NULL, TEXT("Acao maliciosa detectada! O processo sera encerrado."), TEXT("EDR Alerta"), MB_ICONWARNING | MB_OK);
    }

    TerminateProcess(GetCurrentProcess(), 1);
}
```

---
### Função para o hook OpenProcess:

Esta parte é uma função de um hook para a função `OpenProcess`. Ela vai interceptar as chamadas para a API `OpenProcess`, então vai enviar uma mensagem com o ID do processo alvo para nosso `Named Pipe`, e depois irá chamar a função original do `OpenProcess`.

```cpp
BOOL WINAPI Hooked_OpenProcess(
    WORD dwDesiredAccess,
    BOOL  bInheritHandle,
    DWORD dwProcessId) {

    char message[512];
    snprintf(message, sizeof(message), "[#] OpenProcess Detected! Process ID: %lu", dwProcessId);
    SendMessageToPipe(message);

    return g_OpenProcess(dwDesiredAccess, bInheritHandle, dwProcessId);
}
```

---
### Função para o hook WriteProcessMemory:

Essa é outra função de hook mas para a API `WriteProcessMemory`. essa parte registra detalhes sobre o endereço de memória que está sendo modificado e envia para o nosso `Named Pipe`, e depois chama a função original `WriteProcessMemory` para garantir que a operação de escrita ocorra normalmente.

```cpp
BOOL WINAPI Hooked_WriteProcessMemory(
    HANDLE hProcess,
    LPVOID lpBaseAddress,
    LPCVOID lpBuffer,
    SIZE_T nSize,
    SIZE_T* lpNumberOfBytesWritten) {

    char message[512];
    snprintf(message, sizeof(message), "[#] WriteProcessMemory Detected! Address: %p", lpBaseAddress);
    SendMessageToPipe(message);

    return g_WriteProcessMemory(hProcess, lpBaseAddress, lpBuffer, nSize, lpNumberOfBytesWritten);
}
```

---
### Função para o hook VirtualAllocEx:

```cpp
BOOL WINAPI Hooked_VirtualAllocEx(
    HANDLE hProcess,
    LPVOID lpAddress,
    SIZE_T dwSize,
    DWORD  flAllocationType,
    DWORD  flProtect) {

    char message[512];
    snprintf(message, sizeof(message), "[#] VirtualAllocEx Detected!");
    SendMessageToPipe(message);

    return g_VirtualAllocEx(hProcess, lpAddress, dwSize, flAllocationType, flProtect);
}
```

---
### Função para o hook CreateRemoteThread:

Essa é outra função de hook, mas para a API `CreateRemoteThread`. Diferente das outras, essa irá chamar a função `BlockExecution` que irá barrar a execução do programa e em seguida, chamará a função original `CreateRemoteThread`.

```cpp
BOOL WINAPI HookedCreateRemoteThread(
    HANDLE                 hProcess,
    LPSECURITY_ATTRIBUTES  lpThreadAttributes,
    SIZE_T                 dwStackSize,
    LPTHREAD_START_ROUTINE lpStartAddress,
    LPVOID                 lpParameter,
    DWORD                  dwCreationFlags,
    LPDWORD                lpThreadId) {

    char message[512];
    snprintf(message, sizeof(message), "[#] CreateRemoteThread Detected! Process: %ls");
    SendMessageToPipe(message);

    BlockExecution(TRUE);

    return g_CreateRemoteThread(hProcess, lpThreadAttributes, dwStackSize, lpStartAddress, lpParameter, dwCreationFlags, lpThreadId);
}
```

---
### Função para Implementar o hook:

Agora nossa função `SetupHook` vai configurar todos os hooks necessários utilizando a biblioteca `MinHook`. então ela irá criar os hooks para `VirtualAllocEx`, `CreateRemoteThread`, `OpenProcess`, e `WriteProcessMemory`, e finalmente habilita todos os hooks criados. Se houver falhas em qualquer uma dessas operações, uma mensagem de erro é enviada para o `Named Pipe`.

```cpp
void SetupHook() {

    if (MH_Initialize() != MH_OK) {
        SendMessageToPipe("Failed to initialize MinHook.\n");
        return;
    }

    if (MH_CreateHookApi(TEXT("kernel32"), "VirtualAllocEx", Hooked_VirtualAllocEx, (LPVOID*)&g_VirtualAllocEx) != MH_OK) {
        SendMessageToPipe("Failed to create hook for VirtualAllocEx.\n");
        return;
    }

    if (MH_CreateHookApi(TEXT("kernel32"), "CreateRemoteThread", HookedCreateRemoteThread, (LPVOID*)&g_CreateRemoteThread) != MH_OK) {
        SendMessageToPipe("Failed to create hook for CreateRemoteThread.\n");
        return;
    }

    if (MH_CreateHookApi(TEXT("kernel32"), "OpenProcess", Hooked_OpenProcess, (LPVOID*)&g_OpenProcess) != MH_OK) {
        SendMessageToPipe("Failed to create hook for OpenProcess.\n");
        return;
    }

    if (MH_CreateHookApi(TEXT("kernel32"), "WriteProcessMemory", Hooked_WriteProcessMemory, (LPVOID*)&g_WriteProcessMemory) != MH_OK) {
        SendMessageToPipe("Failed to create hook for WriteProcessMemory.\n");
        return;
    }

    if (MH_EnableHook(MH_ALL_HOOKS) != MH_OK) {
        SendMessageToPipe("Failed to enable hook.\n");
        return;
    }

    SendMessageToPipe("Hook enabled.\n");
}
```

---
### Iniciar thread após a dll ser carregada:

Agora por fim a função `DllMain` é o ponto de entrada para a DLL. Quando a DLL é carregada `DLL_PROCESS_ATTACH`, ela desativa as chamadas de thread para a DLL e configura os hooks. Quando a DLL é descarregada `DLL_PROCESS_DETACH`, ela desativa todos os hooks e desinicializa a biblioteca `MinHook`.

```cpp
#ifdef _WINDLL
bool __stdcall DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpvReserved) {
    switch (fdwReason) {
    case DLL_PROCESS_ATTACH:
        DisableThreadLibraryCalls(hinstDLL);
        SetupHook();
        break;
    case DLL_PROCESS_DETACH:
        MH_DisableHook(MH_ALL_HOOKS);
        MH_Uninitialize();
        break;
    }
    return TRUE;
}
#endif
```
## Entendendo o que fizemos:
O código que fizemos implementa um sistema de hooking para monitorar e controlar chamadas para funções críticas da API do Windows, como `OpenProcess`, `WriteProcessMemory`, `VirtualAllocEx`, e `CreateRemoteThread`.
O uso de hooks nos permite interceptar essas funções para detectar e bloquear ações que possam indicar comportamento malicioso.
e enviar mensagens de alerta sobre o uso dessas APIs para o nosso "painel".
## Prova de Conceito:

<iframe width="760" height="515" src="https://www.youtube.com/embed/Zr8241Tnn90" frameborder="0" allowfullscreen></iframe>