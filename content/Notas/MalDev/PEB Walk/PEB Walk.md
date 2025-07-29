---
title: PEB Walk
tags:
  - Malware
  - Windows
  - Internals
author: Vithor
related:
  - Análise-Estática
  - Análise-Dinâmica
  - Importação
---

## Evadindo IAT com PEB Walk
Hoje em dia, se você usar direto as APIs do Windows (tipo `VirtualAllocEx`, `CreateRemoteThread`, etc.), seu binário vai ser cravado fácil por qualquer EDR ou AV mais decente. Isso acontece porque essas APIs aparecem na **IAT** (Import Address Table), que é basicamente um "print" do que seu código chama. E aí, qualquer analista ou ferramenta que lê PE consegue sacar o comportamento do binário só olhando ali.

Mas tem um jeito de burlar isso: **PEB Walk**.

Por padrão, quando queremos por exemplo começar uma analise estática de um possível malware, é extremamente interessante, ver as importações que esse programa realiza. como por exemplo, se a gente compilar um código simples, usando a API, `MessageBoxA`, para imprimir uma mensagem:

```c
#include <windows.h>

int main() {
	MessageBoxA(NULL, "Hello, World!", "My Message Box", MB_OK);
	return 0;
}
```

Se a gente olhar as importações desse código em C, já compilado vamos ver, que a gente consegue ver com facilidade que o programa está importando a `MessageBoxA`, ficando visível na IAT do programa.

<div align=center>

  <img alt="msg" src="MessageBoxA.PNG">

</div>

---

Em contrapartida se a gente, olhar as importações de outro programa que executa essa mesma função para chamar `MessageBoxA` para a impressão de uma mensagem, mas dessa fez com o ``PEB walk`` implementado, vamos ver que ao tentar acessar a IAT do programa, não vamos estar conseguindo assim ver a importação da `MessageBoxA`
Dessa forma, por exemplo um analista não consegue ter uma ideia do comportamento do programa se depender da lista IAT.
### Por que fazer PEB Walk?

A lógica é simples:

- Você não quer deixar rastro na IAT. 
- E consegue diminuir a taxa de detecção baseada em assinatura estática.
- E isso por si só, por pouco que pareça, já é importante para um desenvolvedor de malware.
### Entendendo o PEB

Quando um processo é criado, o Windows aloca uma estrutura interna chamada `PEB`. Dentro dela, tem um campo `Ldr` que aponta pra outra estrutura chamada `_PEB_LDR_DATA`, que tem uma lista com todas as DLLs carregadas:

![[PEB1.PNG]]

![[PEB_LDR_DATA.PNG]]

Essa lista se chama `InLoadOrderModuleList`. E cada item nela é um `LDR_DATA_TABLE_ENTRY`, que tem o caminho da DLL e a `DllBase`, ou seja, o endereço onde a DLL tá na memória.

![[LDR_DATA_TABLE_ENTRY.PNG]]

Um exemplo prático que poderíamos realizar para ver isso, é usar o ``WinDBG`` anexar ele ao um processo em execução, e digitar `!peb` então assim vamos estar conseguindo ver o campo `Ldr.InMemoryOrderModuleList` que vai estar mostrando assim a lista de DLLs carregadas para o processo atual:

<div align=center>

  <img alt="msg" src="windbg.PNG">

</div>

## Tá, mas como acessar o PEB?
Então, como o malware (ou qualquer outro código de baixo nível) pode acessar essa estrutura?

Uma das formas é fazendo acesso direto via assembly inline (montagem embutida no código), utilizando registradores de segmento que apontam para estruturas internas do processo.

Se o programa for em **32 bits**, a linha em assembly seria basicamente:

```asm
mov eax, fs:[0x30] ; eax agora tem o ponteiro pro PEB
```

E em 64 bits:

```asm
mov rax, gs:[0x60] ; rax agora tem o ponteiro pro PEB
```
### Mas o que é `fs` e `gs`?
Esses são **registradores de segmento** usados pelo Windows para apontar para o início de estruturas internas por thread:

- Em **32 bits**, o registrador `fs` aponta para o início do **TEB** (Thread Environment Block).
    
- Em **64 bits**, o registrador usado é o `gs`.
#### O que é o TEB?
O **TEB (Thread Environment Block)** é uma estrutura que contém **informações específicas da thread atual** — como:
- ID da thread,
- ponteiro para o **PEB** do processo ao qual pertence,
- dados de exceção,
- pilha de chamada,
- e por ai vai.
Ou seja: quando fazemos `fs:[0x30]` (em 32 bits) ou `gs:[0x60]` (em 64 bits), estamos acessando um **campo dentro do TEB** no caso o `ProcessEnvironmentBlock`  que aponta diretamente para a estrutura **PEB** — a estrutura que vai conter informações globais do processo, como pode ser visto nessa imagem de exemplo:

![[PEB.png]]
## Resumindo
Definindo a estrutura do ``PEB``:

```c
typedef struct _PEB
{
    UCHAR InheritedAddressSpace;            // +0x00
    UCHAR ReadImageFileExecOptions;         // +0x01
    UCHAR BeingDebugged;                    // +0x02
    UCHAR BitField;                         // +0x03
    ULONG ImageUsesLargePages : 1;          // +0x03
    ULONG IsProtectedProcess : 1;           // +0x03
    ULONG IsLegacyProcess : 1;              // +0x03
    ULONG IsImageDynamicallyRelocated : 1;  // +0x03
    ULONG SpareBits : 4;                    // +0x03
    PVOID Mutant;                           // +0x08
    PVOID ImageBaseAddress;                 // +0x10
    PVOID Ldr;                              // +0x18 (Foco aqui!)

    // Recortado (não precisamos definir o resto do PEB)

} PEB, *PPEB;
```

Definindo a estrutura ``PEB_LDR_DATA``:

```c
typedef struct _PEB_LDR_DATA
{
    ULONG Length;                                // +0x00
    UCHAR Initialized;                           // +0x04
    PVOID SsHandle;                              // +0x08
    LIST_ENTRY InLoadOrderModuleList;            // +0x10
    LIST_ENTRY InMemoryOrderModuleList;          // +0x20
    LIST_ENTRY InInitializationOrderModuleList;  // +0x30
} PEB_LDR_DATA, *PPEB_LDR_DATA;
```

 Para obter o endereço da Tabela de Dados do Carregador, tudo o que precisamos fazer é ler o deslocamento Ldr da estrutura PEB:
 
```c
#include <Windows.h>
#include <Stdio.h>

/* Insira a definição PEB e PEB_LDR_DATA aqui */

int main()
{
    PEB* peb = (PEB*)__readgsqword(0x60);
    PEB_LDR_DATA* ldr = (PEB_LDR_DATA*)peb->Ldr;

    printf("PEB address: 0x%p\n", peb);
    printf("Ldr address: 0x%p\n", ldr);
}
```

> **O que esse código faz?**
>
> - Primeiro, ele acessa o PEB do processo atual usando o registrador de segmento (`__readgsqword(0x60)` em 64 bits).
> - Depois, pega o campo `Ldr` do PEB, que aponta para a estrutura `PEB_LDR_DATA`.
> - Com isso, já temos acesso à lista de módulos carregados pelo processo, que é o ponto de partida para o PEB Walk.
> - Esse acesso é feito totalmente em tempo de execução, sem depender da IAT, dificultando a análise estática.

Isso em assembly seria assim:

```asm
mov     rax, gs:60h     ; rax = address of PEB
mov     rbx, [rax+18h]  ; rbx = address of Ldr (PEB_LDR_DATA)
```

Definindo a estrutura ``LDR_DATA_TABLE_ENTRY``:

```c
typedef struct _UNICODE_STRING {
    USHORT Length;                             // +0x00
    USHORT MaximumLength;                      // +0x02
    PWSTR  Buffer;                             // +0x08
} UNICODE_STRING, *PUNICODE_STRING;

typedef struct _LDR_DATA_TABLE_ENTRY
{
    LIST_ENTRY InLoadOrderLinks;               // +0x00
    LIST_ENTRY InMemoryOrderLinks;             // +0x10
    LIST_ENTRY InInitializationOrderLinks;     // +0x20
    PVOID DllBase;                             // +0x30
    PVOID EntryPoint;                          // +0x38
    ULONG SizeOfImage;                         // +0x40
    UNICODE_STRING FullDllName;                // +0x48
    UNICODE_STRING BaseDllName;                // +0x58
    ULONG Flags;                               // +0x68
    USHORT LoadCount;                          // +0x6C
    USHORT TlsIndex;                           // +0x6E
    LIST_ENTRY HashLinks;                      // +0x70
    ULONG TimeDateStamp;                       // +0x80
} LDR_DATA_TABLE_ENTRY, *PLDR_DATA_TABLE_ENTRY;
```

Como mencionado anteriormente, é possível assumir a ordem dos 3 primeiros módulos para um aplicativo nativo. Portanto, o código mais simples para obter a entrada do módulo para o executável atual, ntdll e kernel32 é o seguinte.

```c
#include <Windows.h>
#include <Stdio.h>

/* Insira as definições PEB, PEB_LDR_DATA e LDR_DATA_TABLE_ENTRY aqui */

int main()
{
    PEB *peb = (PEB *)__readgsqword(0x60);
    PEB_LDR_DATA* ldr = (PEB_LDR_DATA*)peb->Ldr;
    
    LDR_DATA_TABLE_ENTRY *main_module = (LDR_DATA_TABLE_ENTRY * )ldr->InLoadOrderModuleList.Flink;
    LDR_DATA_TABLE_ENTRY *ntdll = (LDR_DATA_TABLE_ENTRY * )main_module->InLoadOrderLinks.Flink;
    LDR_DATA_TABLE_ENTRY *kernel32 = (LDR_DATA_TABLE_ENTRY * )ntdll->InLoadOrderLinks.Flink;
    
    printf("Module name: %S, Base address: 0x%p, Entrypoint: 0x%p\n", 
           main_module->BaseDllName.Buffer, main_module->DllBase, main_module->EntryPoint);

    printf("Module name: %S, Base address: 0x%p, Entrypoint: 0x%p\n",
           ntdll->BaseDllName.Buffer, ntdll->DllBase, ntdll->EntryPoint);

    printf("Module name: %S, Base address: 0x%p, Entrypoint: 0x%p\n",
           kernel32->BaseDllName.Buffer, kernel32->DllBase, kernel32->EntryPoint);
}
```

>**O que esse código faz?**
>
> `LDR_DATA_TABLE_ENTRY *main_module = (LDR_DATA_TABLE_ENTRY *)ldr->InLoadOrderModuleList.Flink;`
> Aqui, acessamos o **primeiro elemento** da lista `InLoadOrderModuleList`, que está dentro da estrutura `PEB_LDR_DATA`. 
> 
> `Flink` é um ponteiro para o próximo item da lista (o primeiro módulo carregado).  
> Esse primeiro item normalmente representa o **executável principal** do processo (ou seja, o próprio `.exe` que está rodando). 
> 
> `LDR_DATA_TABLE_ENTRY *ntdll = (LDR_DATA_TABLE_ENTRY *)main_module->InLoadOrderLinks.Flink;`  
> Agora, pegamos o campo `InLoadOrderLinks.Flink` do primeiro módulo (o executável).  
> Isso nos leva ao **próximo módulo carregado**, que geralmente é o `ntdll.dll`. 
> Cada módulo na lista tem um campo `InLoadOrderLinks` que aponta para o próximo módulo, formando uma lista encadeada.
> 
> `LDR_DATA_TABLE_ENTRY *kernel32 = (LDR_DATA_TABLE_ENTRY *)ntdll->InLoadOrderLinks.Flink;`  
> Repetimos o processo: pegamos o próximo da lista, que normalmente é o `kernel32.dll`.  
> Assim, caminhando de um item para o próximo usando o campo `Flink`, conseguimos acessar os módulos carregados na ordem em que o Windows os adicionou.

Em assembly seria assim:

```c
mov rax, gs:60h         ; get PEB
mov rax, [rax+0x18]     ; get PEB_LDR_DATA address from PEB
mov rax, [rax+0x10]     ; get InLoadOrderModuleList from PEB_LDR_DATA

mov rax, [rax]          ; rax = module entry for application.exe
mov rcx, [rax+0x30]     ; rcx = base address of application.exe

mov rax, [rax]          ; rax = module entry for ntdll.dll
mov rcx, [rax+0x30]     ; rcx = base address of ntdll.dll

mov rax, [rax]          ; rax = module entry for kernel32.dll
mov rcx, [rax+0x30]     ; rcx = base address of kernel32.dll
```

---

O código C a seguir demonstra como procurar a entrada do módulo para ``kernelbase.dll``:

```c
#include <Windows.h>
#include <Stdio.h>

/* Insira as definições PEB, PEB_LDR_DATA e LDR_DATA_TABLE_ENTRY aqui */

int main()
{
    PEB* peb = (PEB*)__readgsqword(0x60);
    PEB_LDR_DATA* ldr = (PEB_LDR_DATA*)peb->Ldr;

    LIST_ENTRY* head = &ldr->InLoadOrderModuleList;
    LIST_ENTRY* curr = ldr->InLoadOrderModuleList.Flink;

    while (curr != head) {
        LDR_DATA_TABLE_ENTRY* ldr_data = (LDR_DATA_TABLE_ENTRY*)curr;

        wchar_t target_module[] = L"kernelbase.dll";

        if (_wcsicmp(ldr_data->BaseDllName.Buffer, target_module) == 0) {
            printf("Found module entry for %S!, Base address: 0x%p, Entrypoint: 0x%p\n", 
                   ldr_data->BaseDllName.Buffer, ldr_data->DllBase, ldr_data->EntryPoint);
        }

        curr = curr->Flink;
    }
}
```

>**O que esse código faz?**
>
> `PEB* peb = (PEB*)__readgsqword(0x60);`  
> Obtém o ponteiro para o PEB (Process Environment Block) do processo atual.  
> Em sistemas 64 bits, o endereço do PEB está em `gs:[0x60]`, e a função `__readgsqword` lê esse valor diretamente do registrador de segmento.
>
> `PEB_LDR_DATA* ldr = (PEB_LDR_DATA*)peb->Ldr;`  
> Acessa o campo `Ldr` do PEB, que aponta para a estrutura `PEB_LDR_DATA`.  
> Essa estrutura contém as listas encadeadas de todos os módulos (DLLs) carregados no processo.
>
> `LIST_ENTRY* head = &ldr->InLoadOrderModuleList;`  
> Define o início da lista de módulos carregados.  
> Essa variável serve como referência para saber quando a iteração pela lista deve parar (a lista é circular).
>
> `LIST_ENTRY* curr = ldr->InLoadOrderModuleList.Flink;`  
> Começa a iteração pelo primeiro módulo da lista.  
> O campo `Flink` aponta para o próximo elemento da lista, que é o primeiro módulo carregado.
>
> O laço `while (curr != head)` percorre a lista de módulos até retornar ao início, garantindo que todos os módulos sejam verificados.  
> Como a lista é circular, quando `curr` volta a ser igual a `head`, significa que todos os módulos já foram visitados.
>
> Dentro do loop:  
> `LDR_DATA_TABLE_ENTRY* ldr_data = (LDR_DATA_TABLE_ENTRY*)curr;`  
> Converte o ponteiro atual da lista para a estrutura que contém as informações detalhadas do módulo, como nome, endereço base e entrypoint.
>
> `wchar_t target_module[] = L"kernelbase.dll";`  
> Define o nome do módulo que queremos encontrar.  
> O nome é comparado em formato wide string (Unicode), pois é assim que o Windows armazena nomes de módulos.
>
> `if (_wcsicmp(ldr_data->BaseDllName.Buffer, target_module) == 0)`  
> Compara o nome do módulo atual com o nome desejado, ignorando diferenças entre maiúsculas e minúsculas.  
> Se for igual, significa que encontramos o módulo procurado.
>
> Se o módulo for encontrado, o código imprime o nome, endereço base e entrypoint usando `printf`.
>
> `curr = curr->Flink;`  
> Avança para o próximo módulo da lista, repetindo o processo até retornar ao início da lista.
>
> Esse método é útil quando você precisa localizar qualquer módulo carregado, independentemente da ordem em que foi carregado, bastando comparar o nome de cada entrada da lista.  
> Isso permite acessar informações de qualquer DLL presente no processo, sem depender da Import Address Table (IAT) e sem expor as funções usadas na lista de importação do executável.
## Conclusão
O **PEB Walk** é uma técnica poderosa para acessar informações sobre **módulos carregados** em um processo Windows sem depender da **Import Address Table (IAT)**. Ao navegar manualmente pelas estruturas internas do sistema operacional, como o **PEB**, **PEB_LDR_DATA** e **LDR_DATA_TABLE_ENTRY**, é possível localizar e interagir com **DLLs** e funções de forma discreta, dificultando a **análise estática** e a **detecção por antivírus**.

Essa abordagem é amplamente utilizada em **desenvolvimento de malware** e também pode ser útil para **pesquisadores de segurança** e **engenheiros reversos** que desejam entender melhor o funcionamento interno dos processos no Windows.

Dominar o **PEB Walk** abre portas para uma compreensão mais profunda do **Windows Internals** e permite criar soluções mais sofisticadas, seja para fins de **pesquisa**, **análise** ou **desenvolvimento de ferramentas avançadas**.