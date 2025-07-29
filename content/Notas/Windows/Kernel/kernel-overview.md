---
Tema Principal: Windows
tags:
  - fundamentos-windows
  - windows-internals
  - artigos-windows
related:
  - Windows-Internals
author: Vithor
---

# Visão Geral do Kernel do Windows

Neste documento, vamos explorar a arquitetura do **kernel** do **Windows**, seus componentes principais e o papel que desempenha na gestão de recursos do sistema e na interação com o hardware. O objetivo é apresentar os fundamentos essenciais para quem deseja entender como o **Windows** funciona em um nível mais profundo, especialmente no que diz respeito ao **kernel**, que é o coração do sistema operacional.
## O que é o Kernel?

O **kernel** é a parte central do sistema operacional **Windows**, responsável por gerenciar as interações entre o hardware e o software. Ele atua como um intermediário, garantindo que os aplicativos possam acessar os recursos do sistema de forma segura e eficiente. Imagine o **kernel** como o cérebro do sistema operacional, onde todas as decisões importantes são tomadas. Sem ele, o **Windows** simplesmente não funcionaria.

Por exemplo, quando você move o cursor do mouse, quem realmente faz o cursor se mover na tela é o **kernel**. Ele recebe os sinais do hardware (via **drivers**), processa essas informações e as transforma em ações visíveis para o usuário. É por isso que o **kernel** é tão crucial: ele está envolvido em absolutamente tudo que acontece no sistema.

![[rings.svg]]

## Arquitetura do Kernel do Windows

O **Windows** utiliza o que chamamos de arquitetura de **kernel híbrido**. Isso significa que ele combina características de **kernel monolítico** (onde todas as funções do sistema operacional são executadas em um único espaço de endereço) e **microkernel** (onde apenas as funções essenciais são executadas no espaço do **kernel**, e o restante é executado como processos de usuário).

Esta abordagem híbrida permite que o **Windows** tenha o melhor dos dois mundos: a eficiência de um **kernel monolítico** e a modularidade de um **microkernel**. Por exemplo, alguns subsistemas críticos, como o **gerenciador de processos** e o **gerenciador de memória**, são executados no espaço do **kernel** para garantir desempenho, enquanto outros serviços, como o subsistema de interface gráfica (**Win32**), são executados como processos de usuário, o que aumenta a estabilidade geral do sistema.

<div align=center>
  <img alt="sys" src="sys.png">
</div>

O **kernel** do **Windows** é estruturado em camadas, o que permite uma organização lógica e uma separação clara de responsabilidades. Essas camadas incluem:

1. **Camada de abstração de hardware (HAL)**: Atua como uma interface entre o hardware do computador e o restante do **kernel**. A **HAL** oculta as diferenças específicas do hardware, permitindo que o resto do **kernel** funcione de maneira consistente em diferentes plataformas de hardware.

2. **Camada de kernel**: Inclui os componentes fundamentais, como **gerenciador de processos**, **gerenciador de memória** e **escalonador**.

3. **Camada de subsistemas**: Inclui os subsistemas que fornecem funcionalidades específicas, como o subsistema de **I/O** e o subsistema de **segurança**.

<div align=center>
  <img alt="userandkernelmode01" src="https://learn.microsoft.com/es-es/windows-hardware/drivers/gettingstarted/images/userandkernelmode01.png">
</div>

## Componentes do Kernel

O **kernel** do **Windows** é composto por várias partes essenciais que trabalham juntas para garantir o funcionamento do sistema. Entre elas, podemos destacar:
### Gerenciador de Processos e Threads

O **gerenciador de processos** é responsável por criar, agendar e encerrar processos. Imagine que cada programa que você abre é um processo, e o **gerenciador de processos** é quem organiza tudo isso, garantindo que cada um receba os recursos necessários para funcionar.

Um processo no **Windows** é essencialmente um contêiner que possui pelo menos uma **thread**, um espaço de endereço virtual, um handle de **token** de acesso e um conjunto de recursos alocados pelo sistema. Quando você abre um aplicativo como o ``Notepad.exe``, o **Windows** cria um novo processo com suas próprias estruturas de dados associadas.

As **threads**, por outro lado, são as unidades básicas de execução dentro de um processo. Um processo pode ter várias **threads**, cada uma executando uma parte diferente do código do programa. Por exemplo, um navegador web pode ter uma **thread** para renderizar a interface do usuário, outra para baixar dados da internet e uma terceira para processar scripts.

O **escalonador** (ou **scheduler**) do **Windows** decide qual **thread** deve ser executada em cada momento, com base em suas prioridades e no tempo que cada uma já consumiu. Isso garante que todos os programas tenham uma chance de usar o processador, mesmo em um sistema com muitos aplicativos em execução.

---
### Gerenciador de Memória

O **gerenciador de memória** do **Windows** é um componente sofisticado que controla como a memória é alocada, usada e liberada. Ele implementa um sistema de **memória virtual** que permite que cada processo tenha seu próprio espaço de endereço virtual de 4GB (em sistemas de 32 bits) ou muito mais (em sistemas de 64 bits).

O espaço de endereço virtual é mapeado para a memória física (**RAM**) pelo **gerenciador de memória**. Isso significa que, quando um programa acessa a memória, ele está na verdade acessando um endereço virtual que o **gerenciador de memória** traduz para um endereço físico real.

<div align=center>
  <img alt="mem" src="https://cos.ufrj.br/~vitor/aulas/COS773/slides/vm_maps.jpeg">
</div>

Uma das vantagens desse sistema é que os processos são isolados uns dos outros. Se um programa tenta acessar a memória de outro processo, o **gerenciador de memória** detecta isso e pode impedir o acesso não autorizado. Isso aumenta a segurança e a estabilidade do sistema, já que um programa com problemas não pode facilmente corromper a memória de outros programas.

O **gerenciador de memória** também implementa o sistema de **paginação**, que permite que o **Windows** use o disco rígido como uma extensão da memória **RAM**. Quando a memória física está ficando cheia, o **gerenciador de memória** pode mover partes menos usadas da memória para um arquivo de paginação no disco. Quando essas partes são necessárias novamente, elas são carregadas de volta para a **RAM**. Esse processo é chamado de "**swap**" e, embora seja mais lento do que usar a **RAM** diretamente, permite que o sistema execute mais programas simultaneamente do que a **RAM** permitiria por si só.

---
### Gerenciador de Segurança

O **gerenciador de segurança** do **Windows** é responsável por implementar e fazer cumprir as políticas de segurança do sistema. Ele controla quem pode acessar quais recursos e o que pode ser feito com esses recursos.

O **Windows** utiliza um sistema de segurança baseado em **tokens de acesso** e **listas de controle de acesso (ACLs)**. Quando um usuário faz login, o **Windows** cria um **token de acesso** que contém informações sobre a identidade do usuário e seus privilégios. Esse **token** é então anexado a todos os processos iniciados pelo usuário.

Quando um processo tenta acessar um recurso, como um arquivo ou um objeto do **kernel**, o **gerenciador de segurança** verifica se o **token de acesso** do processo tem permissão para realizar a operação solicitada. Isso é feito comparando as informações no **token** com as **ACLs** associadas ao recurso.

Por exemplo, se você tenta abrir um arquivo em `C:\Windows\System32`, o **gerenciador de segurança** verifica se seu **token** de usuário tem permissão para ler esse arquivo. Se você estiver executando como um usuário normal (não administrador), provavelmente não terá permissão para modificar esse arquivo, e o acesso será negado.

## Modo Usuário vs. Modo Kernel

Uma das características mais importantes do **Windows** é a separação entre o **modo usuário** e o **modo kernel**. Essa divisão é essencial para garantir a segurança e a estabilidade do sistema.

No **modo usuário**, os aplicativos têm acesso limitado aos recursos do sistema. Isso significa que, se um programa falhar, o impacto será restrito a ele mesmo, sem comprometer o restante do sistema. Por outro lado, no **modo kernel**, o código tem acesso total ao hardware e aos recursos do sistema. Isso é necessário para que o **kernel** possa gerenciar o sistema de forma eficiente, mas também significa que qualquer falha no **modo kernel** pode ter consequências graves, como a famosa "**tela azul da morte**" (BSOD).

A transição entre o **modo usuário** e o **modo kernel** é controlada por mecanismos de hardware, como as instruções `syscall` e `sysret` nos processadores modernos. Quando um programa precisa realizar uma operação que requer privilégios de **kernel**, ele faz uma chamada de sistema (**syscall**), que causa uma transição controlada para o **modo kernel**. O **kernel** executa a operação solicitada e, em seguida, retorna ao **modo usuário**.

<div align=center>
  <img alt="Kernel_Layout" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Kernel_Layout.svg/langpt-1280px-Kernel_Layout.svg.png">
</div>

Essa separação é implementada por meio de mecanismos como as chamadas de sistema (**syscalls**), que permitem que os aplicativos em **modo usuário** solicitem serviços ao **kernel**. Por exemplo, quando um programa precisa acessar o disco rígido, ele faz uma chamada de sistema para que o **kernel** execute a operação em seu nome.

## Cadeia de Chamadas no Windows

Quando um aplicativo precisa realizar uma operação que requer privilégios de kernel, ele segue uma cadeia específica de chamadas. Vamos usar o exemplo de criar um arquivo para ilustrar:

1. O aplicativo chama uma função da API Win32, como `CreateFile()`. Essa função está implementada em bibliotecas do sistema, como `kernel32.dll`.

2. A função da API Win32 prepara os parâmetros e chama uma função correspondente na `ntdll.dll`, que é a biblioteca que implementa a interface entre o modo usuário e o modo kernel.

3. A função na `ntdll.dll` executa uma instrução `syscall` para transitar para o modo kernel, passando o número da chamada de sistema e os parâmetros necessários.

4. No modo kernel, o dispatcher de chamadas de sistema redireciona a chamada para a função apropriada no kernel, como `NtCreateFile()`.

5. A função do kernel executa a operação solicitada, interagindo com os subsistemas necessários, como o gerenciador de I/O e o sistema de arquivos.

6. Após concluir a operação, o kernel prepara o resultado e retorna ao modo usuário através da instrução `sysret`.

7. A função na `ntdll.dll` recebe o resultado, faz qualquer processamento necessário e o repassa para a função da API Win32.

8. A função da API Win32 processa o resultado final e o retorna para o aplicativo.

<div align=center>
  <img alt="notepad_transition_syscall" src="https://redops.at/assets/images/blog/notepad_transition_syscall.png">
</div>

Essa cadeia de chamadas garante que o aplicativo nunca execute código diretamente no modo kernel, mantendo a segurança e a estabilidade do sistema.

## Comunicação Interprocessos (IPC)
O **Windows** oferece vários mecanismos para que os processos se comuniquem entre si, coletivamente conhecidos como comunicação interprocessos (IPC). Esses mecanismos são essenciais para a cooperação entre diferentes componentes do sistema e aplicativos.

Alguns dos principais mecanismos de IPC no **Windows** incluem:

1. **Pipes**: Canais de comunicação unidirecionais ou bidirecionais entre processos. Podem ser anônimos (para comunicação entre processos relacionados) ou nomeados (para comunicação entre processos não relacionados).

2. **Mailslots**: Um mecanismo simples de mensagem que permite a comunicação em uma rede local.

3. **Memória compartilhada**: Permite que múltiplos processos acessem a mesma região de memória, facilitando a transferência eficiente de grandes quantidades de dados.

4. **Windows Sockets (Winsock)**: Implementa a API de sockets padrão para comunicação em rede.

5. **COM e DCOM**: Component Object Model e Distributed COM, que permitem que objetos em diferentes processos (e até mesmo em diferentes máquinas) se comuniquem.

6. **Windows RPC**: Remote Procedure Call, um mecanismo que permite que um processo execute código em outro processo, possivelmente em outra máquina.

## Virtualização e o Kernel
A virtualização é outro aspecto importante do **kernel** do **Windows**. Com o uso de tecnologias como o **Hyper-V**, o **kernel** pode criar e gerenciar máquinas virtuais, permitindo que múltiplos sistemas operacionais sejam executados simultaneamente no mesmo hardware. Isso é especialmente útil em ambientes corporativos, onde a virtualização é amplamente utilizada para consolidar servidores e reduzir custos.

O **Hyper-V** é um hypervisor de tipo 1, o que significa que ele é executado diretamente no hardware, abaixo do sistema operacional host. Isso contrasta com hypervisors de tipo 2, como o VMware Workstation ou o VirtualBox, que são executados como aplicativos dentro de um sistema operacional host.

O **kernel** utiliza extensões de virtualização de hardware, como Intel VT-x e AMD-V, para garantir que as máquinas virtuais tenham acesso eficiente aos recursos do sistema. Essas extensões permitem que o hypervisor execute código de máquina virtual diretamente no processador, sem a necessidade de emulação, o que melhora significativamente o desempenho.

Além disso, o **kernel** implementa mecanismos de isolamento para garantir que as máquinas virtuais não interfiram umas nas outras, aumentando a segurança e a estabilidade do sistema. Cada máquina virtual tem seu próprio conjunto de recursos virtuais, como processadores virtuais, memória virtual e dispositivos virtuais, que são mapeados para recursos físicos pelo hypervisor.
## Segurança no Kernel
A segurança é uma prioridade fundamental no design do **kernel** do **Windows**. Além de exigir assinaturas digitais para drivers, o **Windows** implementa várias outras medidas de segurança para proteger o **kernel** contra ameaças.

Uma dessas medidas é o ``PatchGuard``, também conhecido como Kernel Patch Protection (KPP). O ``PatchGuard`` monitora estruturas críticas do **kernel** em busca de modificações não autorizadas. Se detectar uma alteração suspeita, o ``PatchGuard`` causa um "bug check" (a famosa tela azul), encerrando o sistema para evitar danos adicionais ou comprometimento de segurança.

Outra medida importante é o ``Credential Guard``, que utiliza virtualização baseada em hardware para isolar segredos críticos, como hashes de senhas e tickets ``Kerberos``, do restante do sistema operacional. Isso impede que malware, mesmo aquele com privilégios de administrador, acesse esses segredos.

O **Windows** também implementa o ``Secure Boot``, que verifica a integridade do bootloader e do **kernel** durante a inicialização, garantindo que apenas código assinado e confiável seja carregado.
## O Kernel e os Subsistemas do Windows
O **Windows** é composto por vários subsistemas que trabalham juntos para fornecer a experiência completa do sistema operacional. O **kernel** interage com esses subsistemas para fornecer serviços específicos.

O principal subsistema do **Windows** é o ``Win32``, que fornece a API usada pela maioria dos aplicativos **Windows**. O subsistema ``Win32`` é implementado como um processo em modo usuário (csrss.exe) e uma série de DLLs (como ``kernel32.dll`` e ``user32.dll``).

<div align=center>
  <img alt="Win32" src="https://miro.medium.com/v2/resize:fit:720/format:webp/0*MOZjcbbc3Ah63sHH">
</div>

Esses subsistemas se comunicam com o **kernel** através da API nativa do NT, que é implementada na ``ntdll.dll``. A API nativa do NT é mais primitiva e de baixo nível do que as APIs expostas pelos subsistemas, mas fornece acesso direto às funcionalidades do **kernel**.