---
Tema Principal: Windows
tags:
  - fundamentos-windows
  - segurança-windows
  - windows-internals
related:
  - Cybersecurity
  - Windows-Internals
author: Vithor
---

# Mecanismos de Segurança do Windows

Neste post, vou apresentar alguns dos mecanismos de segurança do Windows, explicando como eles funcionam por baixo dos panos. O objetivo é entender como o Windows protege o sistema contra ameaças modernas, explorando os componentes internos desses mecanismos de segurança.

## Como o Windows se protege?

O Windows implementa várias camadas de proteção que trabalham em conjunto para defender o sistema contra diferentes tipos de ameaças. Vamos mergulhar nos detalhes de como esses mecanismos funcionam internamente.

## Windows Defender Antivirus

O **Windows Defender Antivirus** não é apenas um antivírus comum, ele é profundamente integrado ao **kernel** do sistema, o que lhe dá capacidades que soluções de terceiros não conseguem obter facilmente.

<div align=center>
  <img alt="msg" src="https://www.microsoft.com/en-us/security/blog//wp-content/uploads/2019/07/fig1-Windows-Defender-System-Guard-runtime-attestation.png">
</div>

A arquitetura do **Windows Defender** é composta por vários componentes:

1. **WdFilter.sys**: Este é um driver de filtro em modo **kernel** que monitora atividades do sistema de arquivos e operações de rede. Ele intercepta operações como criação, leitura e escrita de arquivos antes que elas sejam concluídas, permitindo análise em tempo real.

2. **MsMpEng.exe (Antimalware Service Executable)**: Este é o processo principal do **Windows Defender** que executa em modo usuário. Ele coordena todas as atividades de proteção e contém os mecanismos de escaneamento e detecção.

3. **WdNisSvc.dll (Network Inspection Service)**: Responsável pela inspeção do tráfego de rede para identificar tentativas de exploração e malware baseado em rede.

Uma característica interessante do **Windows Defender** é seu modo de "**proteção em tempo real**". Quando você abre um arquivo, o **WdFilter.sys** intercepta a operação de I/O e notifica o **MsMpEng.exe** para verificar o arquivo antes que seu conteúdo seja carregado na memória. Isso acontece usando um mecanismo de "**callback**" registrado no **kernel** que é acionado em operações específicas.

Por exemplo, quando um arquivo é aberto, a seguinte sequência ocorre:

1. O driver **WdFilter.sys** recebe uma notificação do **kernel** através de seu **callback** registrado
2. O driver coloca a operação em uma fila e notifica o serviço **MsMpEng.exe**
3. O **MsMpEng.exe** analisa o arquivo usando suas definições e heurísticas
4. Dependendo do resultado, a operação original é permitida ou bloqueada

Essa integração profunda com o **kernel** é o que torna o **Windows Defender** mais eficiente que muitas soluções de terceiros, já que ele opera no mesmo nível de privilégio que potenciais malwares em modo **kernel**.

## SmartScreen

O **Windows SmartScreen** é outro componente de segurança que atua principalmente contra ameaças baseadas na web e downloads maliciosos. Diferente do **Windows Defender**, que analisa o conteúdo dos arquivos, o **SmartScreen** funciona verificando a reputação dos arquivos e sites com base em uma enorme base de dados na nuvem.

Quando você tenta baixar um arquivo ou acessar um site, o **SmartScreen** realiza as seguintes operações:

1. Calcula um **hash criptográfico** do arquivo ou da URL
2. Envia esse **hash** para os servidores da **Microsoft** via conexão **HTTPS**
3. Os servidores comparam o **hash** com um banco de dados de ameaças conhecidas
4. Se o arquivo for conhecido como malicioso ou desconhecido (sem histórico de downloads), o **SmartScreen** exibe um aviso

O aspecto mais interessante do **SmartScreen** é como ele está integrado em diferentes níveis do sistema:

- No **Microsoft Edge**, através de DLLs como `edgehtml.dll` e componentes nativos do navegador
- No **Windows Explorer**, através do serviço `smartscreen.exe` que monitora a execução de arquivos
- No subsistema de instalação de aplicativos, verificando aplicativos da **Microsoft Store**

O **SmartScreen** usa um modelo de "**reputação adaptativa**" que considera não apenas se um arquivo é malicioso, mas também quão comum ele é. Arquivos raros ou novos recebem maior escrutínio. Isso é especialmente eficaz contra ataques direcionados que podem usar malware personalizado.

## Controle de Conta de Usuário (UAC)

O **UAC** é um dos mecanismos de segurança mais visíveis do **Windows**, mas seu funcionamento interno é frequentemente mal compreendido. Ele não é apenas uma caixa de diálogo irritante - é um componente fundamental do modelo de segurança do **Windows**.

Quando um processo precisa de privilégios elevados, o seguinte acontece:

1. O **Windows** detecta a solicitação de elevação através de metadados do aplicativo (manifesto) ou quando o aplicativo tenta acessar recursos protegidos
2. O **UAC** suspende a execução do processo solicitante
3. Um novo processo, o `consent.exe`, é iniciado pelo sistema
4. O `consent.exe` cria a interface de usuário solicitando permissão e opera em uma área de trabalho segura e isolada
5. Se o usuário aprovar, um novo processo é criado com **token** de acesso elevado

Um detalhe interessante sobre o **UAC** é como ele manipula os **tokens** de acesso. No **Windows**, quando um usuário faz login, dois **tokens** são criados:

- Um **token** com privilégios padrão para uso normal
- Um **token** com privilégios elevados que é mantido em reserva

Quando o **UAC** é acionado e aprovado, o **Windows** usa o **token** elevado para criar o novo processo. Esse sistema de "**tokens divididos**" é implementado através de estruturas de dados do **kernel** chamadas `TOKEN` que contêm todos os atributos de segurança do processo.

## AMSI (Antimalware Scan Interface)

O **AMSI** é uma das tecnologias de segurança mais interessantes do **Windows**, pois fornece uma interface que permite que qualquer aplicativo envie conteúdo para ser escaneado pelo antimalware instalado. É especialmente útil para linguagens de script como **PowerShell** e **JavaScript**, que são frequentemente usadas em ataques.

<div align=center>
  <img alt="msg" src="https://learn.microsoft.com/pt-br/windows/win32/amsi/images/amsi7archi.jpg">
</div>

A implementação do **AMSI** funciona assim:

1. Aplicativos compatíveis com **AMSI** (como **PowerShell**, **Office**, **Windows Script Host**) capturam scripts ou conteúdo dinâmico antes da execução
2. Esse conteúdo é enviado para a interface **AMSI** através da DLL `amsi.dll`
3. O provedor de antimalware registrado (geralmente o **Windows Defender**) analisa o conteúdo
4. Baseado no resultado da análise, a execução é permitida ou bloqueada

O que torna o **AMSI** particularmente eficaz é sua capacidade de ver o conteúdo após desofuscação. Por exemplo, em um ataque típico com **PowerShell**, os atacantes geralmente usam ofuscação como:

```powershell
$code = [System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String("..."));
Invoke-Expression $code
```

Sem o **AMSI**, seria difícil para um antivírus analisar o que está no conteúdo codificado. Mas o **AMSI** captura o script após a desofuscação, no momento exato antes da execução, quando o código malicioso está exposto.

O **AMSI** é implementado nos aplicativos através de hooks em pontos críticos do interpretador ou mecanismo de script. No **PowerShell**, por exemplo, o módulo `System.Management.Automation.dll` contém pontos de integração com o **AMSI** que enviam o conteúdo para escaneamento antes da execução.

## Core Isolation e Secure Boot
O **Core Isolation** e o **Secure Boot** são tecnologias de segurança que trabalham em conjunto para proteger áreas críticas do sistema contra ataques. Enquanto o **Core Isolation** utiliza virtualização para isolar processos sensíveis, o **Secure Boot** garante que apenas componentes assinados digitalmente sejam carregados durante a inicialização.

### Como funcionam?
- **Core Isolation**: Cria uma camada separada de proteção usando **virtualização baseada em hardware**, gerenciada pelo **Hyper-V**. Isso impede que malwares acessem diretamente processos isolados.
- **Secure Boot**: Verifica a assinatura digital de cada componente carregado durante a inicialização, bloqueando qualquer tentativa de modificar o processo de boot para carregar malwares ou componentes não autorizados.

### Benefícios
- **Proteção contra ataques de kernel**: O **Core Isolation** opera em um ambiente virtualizado, enquanto o **Secure Boot** impede que rootkits se infiltrem no processo de boot.
- **Segurança de credenciais**: O **Core Isolation** funciona em conjunto com o **Credential Guard** para proteger informações sensíveis, como hashes de senhas.
- **Defesa contra rootkits e ataques persistentes**: Ambos bloqueiam rootkits e malwares que tentam comprometer o sistema em áreas críticas, como o kernel ou o firmware.
- **Integridade do sistema**: Garantem que o sistema operacional e os componentes críticos sejam carregados de forma segura, protegendo contra modificações não autorizadas.

Essa tecnologia é especialmente útil em ambientes corporativos, onde a proteção de dados sensíveis e a integridade do sistema são prioridades.