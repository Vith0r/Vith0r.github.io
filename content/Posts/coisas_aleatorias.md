---
weight: 4
title: "Post IV: Coisas-aleatorias"
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

Neste post bem aleatório, vou mostrar algumas coisas que devemos saber ou conhecer para realizar uma evasão de antivírus (AV).<br> Se você é iniciante e quer conhecer algumas coisas este conteúdo é para você.

> [!warning] Warning
> As informações que você encontrar neste post, técnicas, códigos, provas de conceito ou qualquer outra coisa são estritamente para fins educacionais.
## Começo de tudo!

Se você é iniciante e decidiu procurar um mapa mental para entender os processos necessários para contornar antivírus, pode se deparar com a seguinte situação:

![BypassAV|783x460](https://raw.githubusercontent.com/matro7sh/BypassAV/main/img/Bypass-AV.png)

Então, você olha para isso e fica de boca aberta :O
Mas calma, amigo! Não se preocupe tanto assim. Esses especialistas nerds querem tudo perfeito, eles usam siglas para fazer você questionar sua própria existência.
Obs: Não estou julgando o mapa apresentado pelo [matro7sh](https://github.com/matro7sh/BypassAV/), até recomendo que de uma olhada nele, eu apenas estou dando um exemplo de uma situação que poderia ocorrer com um iniciante.
Então, você tem que entender tudo que está nesse mapa mental e testar tudo? A resposta curta é não, mas, se você tiver bastante tempo livre, eu recomendaria fazer isso.
## Principal Problema com inciantes

Bom, o principal problema que iniciantes enfrentam é achar que você precisa criar algo totalmente novo para contornar alguns antivírus. É como se eles não conseguissem entender que, muitas vezes, não é necessário criar algo do zero, apenas modificar pequenas partes do código existente já pode ser suficiente para torná-lo indetectável novamente.<br> Ou seja:

![](https://i.imgur.com/BiPfHOx.gif)

## Contornar é fácil!

Bom, eu não sou um anjo que vai pegar na sua mão e fazer você sair daqui contornando qualquer antivírus. Pode até parecer que estou ironizando os antivírus ao dizer que é fácil contorná-los, mas isso pode ser porque já faço isso há um tempo. Para um iniciante, pode ser complexo entender o que deve ser modificado no código.
## Porque ficou detectável?

Postaram um projeto que conseguia contornar alguns antivírus, e em menos de dois dias já estava sendo detectado. Por que isso aconteceu?
A resposta para isso é o envio de amostras.

Caso você não saiba, o próprio Windows vem com essa opção habilitada por padrão.<br> Basicamente, ele realiza o envio de amostras de arquivos suspeitos que estão presentes no seu computador para serviços de segurança, como o Windows Defender. Isso permite que os antivírus atualizem suas assinaturas e detectem novos malwares com base nas amostras enviadas:

![envio|564x258](amostra.png)

Além disso, existem plataformas como o [VirusTotal](https://www.virustotal.com/gui/). que quando você faz o upload de um arquivo para o VirusTotal, ele é analisado por múltiplos antivírus e motores de detecção. Se o arquivo é identificado como malicioso por algum dos motores, essa informação pode ser compartilhada com os fornecedores de antivírus, atualizando suas bases de dados e aumentando a probabilidade de detecção de novas versões do mesmo malware.
Portanto, mesmo que você consiga criar um código que contorne antivírus no início, o envio de amostras e a análise por múltiplas ferramentas de segurança pode rapidamente levar à detecção e à atualização das assinaturas antivírus.
## Evitar o envio de amostra!

Bom, para que seu arquivo consiga permanecer indetectável por mais tempo, você vai precisar aprender a contornar máquinas virtuais. Esse processo pode ser bastante desafiador e tedioso, mas é essencial. Após criar um malware indetectável, fazer com que ele consiga contornar máquinas virtuais. caso contrário, você estará basicamente jogando seu trabalho no "lixo".
## Técnicas de Detecção de Carregadores

Existem três técnicas principais para detecção de carregadores:

- **Verificação de Arquivos**:
Verificação de assinaturas (por exemplo, usando regras `YARA`) para arquivos.
- **Varredura de Memória**:
Varredura de assinaturas (por exemplo, usando regras `YARA`) para a memória de processo.
- **Telemetria/Comportamento**:
Análise das ações executadas pelo processo, principalmente via sistema operacional.

A maioria dos implantes de arquivo .exe gerados prontos para uso por `frameworks C2` são assinados e, portanto, não são úteis. Portanto, o primeiro passo é ofuscar o código, o que é difícil. Ou usar um carregador, que carrega o implante como carga útil, Na maioria das vezes, essa técnica usa uma `shellcode` gerado pelo C2 (alternativa, a DLL gerada pode ser usada com um carregador de DLL ou o EXE convertendo-o em Shellcode ou DLL). A vantagem é que a carga útil pode ser criptografada, então a única coisa que precisa ser ofuscada da varredura de assinatura de arquivo AV é o próprio carregador real.
Em vez de escanear um arquivo, o AV também pode escanear a memória dos processos. Isso derrota os carregadores, pois o código de carga útil precisa ser descriptografado na memória para ser executado. Para evitar a detecção na memória, o processo precisa criptografar suas regiões de memória quando estiver dormindo. Então, no momento em que o AV escaneia o processo, nada suspeito deve estar na memória. O escaneamento de memória é uma operação intensiva em desempenho e só é feito se o AV achar que vale a pena. Isso se baseia na telemetria coletada ou em intervalos regulares.
A maioria dos casos de uso de detecção depende de telemetria: Chamadas de função importantes no Windows geram eventos que são processados, correlacionados e analisados ​​pelo AV. Como alteração de permissões de regiões de memória, criação de processos e threads, cópia de memória e similares.
Por exemplo, se usarmos um carregador para ignorar o AV e simplesmente alocar uma região de memória para nosso shellcode, não geraremos muita telemetria para o AV. Mas o payload será detectável por um scanner de memória. Se introduzirmos criptografia de memória para ignorar o scanner de memória, então geraremos mais telemetria, que por sua vez pode ser usada para detectar a criptografia de memória.
## Técnicas de detecção

Quando um arquivo está sendo gravado no disco, ele será escaneado pelo antivírus (AV). O AV possui um banco de dados de assinaturas com malwares conhecidos (como regras do Yara). Eventos de gravação de arquivos são gerados pelo Sistema Operacional (SO) e entregues ao AV através de AMSI ou callbacks do kernel / ETW. O AV então escaneará os arquivos recém-criados.
`ETW (Event Tracing for Windows)`: Um mecanismo de rastreamento de eventos do Windows que permite ao sistema e aos aplicativos gerar eventos para análise e depuração. Por exemplo, quando um arquivo é criado ou modificado, o ETW pode gerar um evento que informa ao antivírus que uma nova operação de arquivo ocorreu, permitindo que ele faça a varredura.
`AMSI (Antimalware Scan Interface)`: Uma interface fornecida pelo Windows para permitir que aplicativos e scripts se integrem com software antivírus para realizar varreduras de malware. Por exemplo, se um script PowerShell tentar baixar e executar um arquivo, o AMSI pode interceptar essa ação e solicitar ao antivírus que faça uma varredura no arquivo antes da execução.
A varredura de assinatura é baseada no conteúdo estático do arquivo. Isso significa que o antivírus analisa os dados do arquivo, incluindo seus cabeçalhos e seções, antes de ser executado.
`Cabeçalhos PE (Portable Executable)`: São estruturas de dados no arquivo que fornecem informações sobre a organização do arquivo executável. Por exemplo, um antivírus pode analisar os cabeçalhos PE para verificar se há algo suspeito, como strings de código malicioso ou seções incomuns.

![PE](https://onlyf8.com/assets/pe101-1.png)

`Conteúdo das Seções PE`: As seções de um arquivo PE podem conter código executável, dados e recursos. O antivírus examina essas seções para procurar padrões conhecidos de malware. Por exemplo, pode verificar se há seções com tamanho anormalmente grande ou com padrões de bytes que correspondem a assinaturas de malware conhecidas.
Isso acontece antes que o EXE seja executado. Após uma detecção positiva, o arquivo será removido antes da execução para evitar que o malware seja ativado.

---
### Um exemplo de detecção:

Vou utilizar o projeto [yara](https://github.com/VirusTotal/yara) para detectar um binario gerado pelo [donut](https://github.com/TheWover/donut), utilizando as regras do [elastic](https://github.com/elastic/protections-artifacts/tree/main/yara/rules), lembrando que o Yara pode escanear executáveis, binários e processos em execução etc:

```
rule Windows_Trojan_Donutloader_f40e3759 {
    meta:
        author = "Elastic Security"
        id = "f40e3759-2531-4e21-946a-fb55104814c0"
        fingerprint = "a6b9ccd69d871de081759feca580b034e3c5cec788dd5b3d3db033a5499735b5"
        creation_date = "2021-09-15"
        last_modified = "2022-01-13"
        threat_name = "Windows.Trojan.Donutloader"
        severity = 100
        arch_context = "x86"
        scan_context = "file, memory"
        license = "Elastic License v2"
        os = "windows"
    strings:
        $x64 = { 06 B8 03 40 00 80 C3 4C 8B 49 10 49 8B 81 30 08 00 00 }
        $x86 = { 04 75 EE 89 31 F0 FF 46 04 33 C0 EB 08 83 21 00 B8 02 }
    condition:
        any of them
}
```

Para realizar essa análise, vamos executar o Yara com o primeiro argumento sendo o local onde está nossa regra Yara, que, neste caso, deixei no mesmo diretório, e o segundo argumento sendo o arquivo no qual queremos aplicar a regra.

```c
Usage: yara [OPTION]... [NAMESPACE:]RULES_FILE... FILE | DIR | PID
PS D:\para minha area de trabalho\-\Analise De Malware\yara: .\yara64.exe donut.yar loader.bin
Windows_Trojan_Donutloader_f40e3759 loader.bin (Detectou!)
```
## Scanners de memória
 Scanners de memória típicos são:
[PE-sieve](https://github.com/hasherezade/pe-sieve) e o [Moneta](https://github.com/forrest-orr/moneta) que eu já mostrei o uso no post: `Malware-Analysis-2`.
Os scanners de memória servem basicamente para ajudar a detectar algum tipo de malware. Obviamente, não são ferramentas utilizadas por leigos, mas têm como objetivo realizar uma análise do processo escaneado e identificar shellcodes, hooks e patches realizados na memória do processo. Caso ainda não tenha testado esses projetos, recomendo fortemente que experimente.

**Para consequir contornar esses scanners de memoria pode ser utilizado**:
[SWAPPALA](https://oldboy21.github.io/posts/2024/05/swappala-why-change-when-you-can-hide/) / [Gargoyle](https://github.com/JLospinoso/gargoyle) / [Ekko](https://github.com/Cracked5pider/Ekko) / [Cronos](https://github.com/Idov31/Cronos) / [Foliage](https://github.com/y11en/FOLIAGE)

Caso já for experiente recomendo fortemente que teste esses projetos e leia o artigo escrito pelo **Bakki**:<br> [Naively bypassing new memory scanning POCs](https://sillywa.re/posts/flower-da-flowin-shc/) e o artigo escrito pelo **oldboy21** [Timer Callbacks Spoofing to Improve your SLEAP and SWAPPALA Untold](https://oldboy21.github.io/posts/2024/09/timer-callbacks-spoofing-to-improve-your-sleap-and-swappala-untold/), Caso contrário, deixe isso para depois, pois pode ser bastante complexo para um iniciante.
Mas você pode abordar o uso de algumas técnicas de sono utilizando o [Havoc Framework](https://havocframework.com/), já que ele tem técnicas de ofuscação do sono.
## Análise de pilha de chamadas

Quando um processo chama uma função do Windows, é possível descobrir as funções pai que levam a essa chamada. Isso é chamado de callstack.

![](https://telegra.ph/file/bbeeb6aaebc666ddb0d68.gif)

Um exemplo de como funciona uma análise de pilha de chamadas:

![](https://i.imgur.com/YeRX9Ih.png)

**Falsificação de pilha de chamadas**:
[ThreadStackSpoofer](https://github.com/mgeeky/ThreadStackSpoofer) / [VulcanRaven](https://github.com/WithSecureLabs/CallStackSpoofer) / [Máscara de pilha de chamadas](https://github.com/Cobalt-Strike/CallStackMasker) / [An Introduction into Stack Spoofing](https://dtsec.us/2023-09-15-StackSpoofin/)
## O que poderia desencadear uma varredura de memória?

Lembrando que isso não é uma regra, sempre é bom considerar que diferentes antivírus e EDRs podem ter comportamentos variados para essas operações.

| O que                 | Aciona a varredura? | Notas                                  |
|----------------------|---------------------|-----------------------------------------|
| VirtualAlloc()       | Não?                | Muito comum, exceto quando RWX          |
| WriteProcessMemory() | Talvez              | Muito comum                             |
| VirtualProtect()     | Não?                | RWX ou RW->RX podem ser gatilhos        |
| CreateRemoteThread() | Sim                 | Deve acionar a varredura de memória     |

`VirtualAlloc()` e `WriteProcessMemory()` são comumente chamadas. `CreateRemoteThread()` Não só é menos chamada, como também é um indicador mais claro de comportamento potencialmente malicioso.
## Hooking

Um hook pode ser usado por um AV/EDR para monitorar e modificar chamadas de funções em APIs do sistema, como as fornecidas pela `kernel32.dll`. por exemplo um antivírus pode usar hooks para interceptar chamadas a funções como `CreateFile` ou `ReadFile` para detectar atividades suspeitas de malware, caso queira saber mais sobre recomendo que leia meu post: [Creating-EDR-AV](https://vith0r.github.io/posts/Creating-EDR-AV/).

![](https://telegra.ph/file/9e0be2c0844129fedcc9a.png)

Caso queria entender melhor sobre como realizar unhooking leia meu post `Unhooking-Windows-API`.
## Criação do seu próprio shellcode!

Criar seu próprio shellcode pode ser uma tarefa bastante difícil e complexa. No entanto, é algo a se considerar, especialmente quando falamos sobre acesso inicial, onde não precisamos de algo tão sofisticado. Abordei brevemente a criação de shellcode no post `Writing and Compiling Shellcode in C`.<br> Se você deseja explorar mais sobre o assunto:<br>
[From a C project through assembly to shellcode](https://github.com/vxunderground/VXUG-Papers/blob/main/From%20a%20C%20project%20through%20assembly%20to%20shellcode.pdf)
[Leveraging from PE parsing technique to write x86 shellcode](https://mohamed-fakroud.gitbook.io/red-teamings-dojo/shellcoding/leveraging-from-pe-parsing-technique-to-write-x86-shellcode#finding-kernel32-base-address)
[introduction-to-windows-shellcode-development-part1/](https://securitycafe.ro/2015/10/30/introduction-to-windows-shellcode-development-part1/)
[Introduction to Windows shellcode development – Part 2](https://securitycafe.ro/2015/12/14/introduction-to-windows-shellcode-development-part-2/)
[Introdução ao desenvolvimento de shellcode do Windows – Parte 3](https://securitycafe.ro/2016/02/15/introduction-to-windows-shellcode-development-part-3/)
[Windows x64 Shellcode Development](https://www.bordergate.co.uk/windows-x64-shellcode-development/)
[Basics of Windows shellcode writing](https://idafchev.github.io/exploit/2017/09/26/writing_windows_shellcode.html)
[Windows shellcoding - part 1. Simple example](https://cocomelonc.github.io/tutorial/2021/10/27/windows-shellcoding-1.html)
[Windows shellcoding - part 2. Find kernel32 address](https://cocomelonc.github.io/tutorial/2021/10/30/windows-shellcoding-2.html)
[Windows shellcoding - part 3. PE file format](https://cocomelonc.github.io/tutorial/2021/10/31/windows-shellcoding-3.html)
## Indirect syscalls

A técnica de syscall indireta é mais ou menos uma evolução da técnica de `syscall direta`. Comparadas as `syscalls diretas`, as `syscalls indiretas` podem resolver os seguintes problemas de evasão de AV/EDR.

Primeiro, a execução do comando syscall ocorre na memória do `ntdll.dll` e, portanto, é legítima para o AV/EDR. 
Por outro lado, a execução da instrução return ocorre na memória do `ntdll.dll` e aponta da memória do ntdll.dll para a memória do assembly de `syscall indireta`.

![](https://i.imgur.com/jduNVcE.png)

`Chamada de sistema direta`: basta fazer a chamada de sistema você mesmo (com o número de chamada de sistema correto).
`Chamada de sistema indireta`: Reutilize partes do hooked ntdll.dll, invoque a chamada de sistema, mas não o hook:

![](https://i.imgur.com/kBBanai.png)

`Syscalls indiretas` oferecem uma aparência mais legítima no contexto da `pilha de chamadas de thread`. Com `syscalls indiretas`, tanto a execução da syscall quanto a instrução de retorno ocorrem dentro da memória de `ntdll.dll`, que é o comportamento esperado em processos normais de aplicativos.<br> Ao substituir `syscalls diretas` por `indiretas`, a pilha de chamadas resultante imita um padrão de execução mais convencional. Isso pode ser útil para contornar sistemas AV/EDR que examinam a área de memória onde syscalls e seus retornos são executados.

Vários experimentos com diferentes EDRs mostraram que syscalls diretos ainda podem funcionar, mas também são cada vez mais detectados dependendo do EDR. Com base em IOCs no contexto de syscalls diretos, syscalls indiretos podem ser uma solução útil, pois resolvem os seguintes problemas em comparação 

---
### Resumo:

Primeiro, a execução do comando syscall ocorre na memória do `ntdll.dll` e, portanto, é legítima para o AV/EDR.
Por outro lado, a execução da declaração return ocorre dentro da memória de `ntdll.dll` e aponta da memória de `ntdll.dll` para a memória do assembly syscall indireto. Esse comportamento é pelo menos mais legítimo do que o comportamento com `syscalls diretos`, mas ainda pode levar a IOCs dependendo do AV/EDR, por exemplo, se o AV/EDR também verificar a pilha de chamadas.
`Syscalls indiretas` são uma melhoria em relação a `syscalls diretas`, mas têm suas limitações e também têm certos IOCs que agora são usados ​​por fornecedores de AV/EDR para gerar regras de detecção. Por exemplo, com `syscalls indiretas` é possível falsificar o endereço de retorno, o que coloca o endereço de memória do retorno subsequente no topo da pilha de chamadas e ignora a verificação de retorno do AV/EDR. No entanto, se um AV/EDR estiver usando ETW, ele pode verificar adicionalmente a própria pilha de chamadas para comportamento impróprio. `Syscalls indiretas` sozinhas não são mais suficientes para evasão de EDR no caso de um EDR também usar ETW, e você precisa dar uma olhada mais de perto na falsificação de pilha de chamadas. Um bom artigo sobre isso:<br>
[Hiding In PlainSight - Indirect Syscall is Dead! Long Live Custom Call Stacks](https://0xdarkvortex.dev/proxying-dll-loads-for-hiding-etwti-stack-tracing/). Part1<br>
[Hiding In PlainSight - Indirect Syscall is Dead! Long Live Custom Call Stacks](https://0xdarkvortex.dev/hiding-in-plainsight). Part2