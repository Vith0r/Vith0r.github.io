---
Tema Principal: Análise de Malware
tags:
  - Análise-Dinâmica
  - Malware
  - Cybersegurança
related:
  - Análise-Estática
  - MALDEV
author: Vithor
---

## O que é Análise Dinâmica de Malware?
A **análise dinâmica de malware** é o processo de examinar o comportamento de um código malicioso durante sua execução em um ambiente controlado, geralmente conhecido como "**sandbox**".

Diferente da **análise estática**, que examina o código sem executá-lo, a **análise dinâmica** permite observar o que o **malware** realmente faz quando está em funcionamento.

Este método envolve a monitorização em tempo real das interações do **malware** com o sistema operacional, incluindo:
- **Modificações de arquivos**
- **Alterações no registro**
- **Comunicações de rede**
- **Processos criados ou manipulados**
- **Chamadas de API**
- **Comportamentos de evasão**
## **Vantagens do Método de Análise Dinâmica**

1. **Observação de Comportamentos Reais**: Permite ver exatamente o que o **malware** faz quando é executado, revelando seu verdadeiro propósito e funcionamento.

2. **Detecção de Técnicas de Ofuscação**: **Malwares** frequentemente usam ofuscação para esconder seu código durante a **análise estática**, mas essas técnicas são menos eficazes durante a execução.

3. **Identificação de Comportamentos Complexos**: Alguns comportamentos maliciosos só se manifestam durante a execução, como **injeção de código** em outros processos ou técnicas de **evasão avançadas**.

4. **Menos Conhecimento Técnico Requerido**: Comparado à **análise estática**, que pode exigir conhecimentos profundos de linguagens de programação e desmontagem de código, a **análise dinâmica** pode ser mais acessível para analistas iniciantes.

5. **Eficácia contra Packers e Criptografia**: **Malwares** que usam **packers** ou **criptografia** para proteger seu código são mais facilmente analisados dinamicamente, pois eventualmente precisam se descompactar ou descriptografar para executar suas funções.

## **Desvantagens do Método de Análise Dinâmica**

1. **Detecção de Ambiente Sandbox**: **Malwares modernos** frequentemente incluem técnicas para detectar se estão sendo executados em um ambiente de análise, podendo alterar seu comportamento ou simplesmente não executar suas funções maliciosas.

2. **Riscos de Segurança**: Executar um **malware**, mesmo em ambiente controlado, sempre representa um risco potencial de infecção ou comprometimento.

3. **Limitações de Tempo**: A **análise dinâmica** só pode observar comportamentos que ocorrem durante o período de monitoramento. **Malwares** programados para executar ações após um longo período ou em condições específicas podem não revelar todo seu potencial durante a análise.

4. **Limitações de Ambiente**: O comportamento do **malware** pode variar dependendo do ambiente em que é executado. Um ambiente **sandbox** que não replica perfeitamente o alvo pretendido pode levar a análises incompletas.

5. **Falta de Visibilidade Completa**: Embora a **análise dinâmica** mostre o que o **malware** faz, ela nem sempre revela como ele faz, limitando a compreensão dos mecanismos internos.

Quando realizamos uma **análise dinâmica**, existem vários aspectos críticos que devemos monitorar cuidadosamente:

---
### 1. Configuração do Ambiente

Antes de iniciar a análise, devemos garantir que:
- O ambiente **sandbox** esteja isolado da rede principal
- **Snapshots** do sistema estejam criados para reverter após a análise
- Ferramentas de monitoramento estejam instaladas e configuradas
- O ambiente seja convincente o suficiente para enganar técnicas de detecção de **sandbox**
### 2. Pontos de Observação Críticos

Durante a execução do **malware**, devemos focar nossa atenção em:
## **Atividades de Processo**

Quando o **malware** é executado, ele cria um **processo próprio** como outros aplicativos. Todas as operações no sistema operacional são realizadas através de um **processo**. Antes de seguir outras atividades, devemos detectar os *processos pertencentes ao malware*.

Um grande número de atividades de **processo**, **rede**, **registro** e **arquivo** ocorre dentro do sistema operacional. Como pode não ser possível analisar todas essas atividades, podemos começar a analisar as atividades dos **processos de malware** para ver se podemos encontrar algo sólido sobre suas atividades.

Ao examinar um **processo**, deve-se prestar especial atenção às informações, como se ele cria um novo **processo**, as **DLLs** que ele importa.

Você pode usar um aplicativo chamado **Process Hacker** para examinar **processos**.

O **malware** pode se *injetar em diferentes processos*, realizar atividades para seus próprios fins com a vida dos binários de terra ou fazer com que aplicativos legítimos executem seus próprios aplicativos. Por estas razões, as atividades de todos os **processos pertencentes ao malware** e utilizados pelo **malware** devem ser analisadas.

Por exemplo, digamos que o **malware** se injeta no **processo** ``notepad.exe`` depois de ser executado.

Neste caso, precisamos examinar todas as atividades que o ``notepad.exe`` criou desde o momento em que foi injetado.
## **Atividades de Rede**

A monitorização das comunicações de **rede** é fundamental na **análise dinâmica**, pois muitos **malwares** precisam se comunicar com servidores de **comando e controle (C2)** ou realizar outras atividades na internet.

Aspectos importantes a serem observados:

1. **Conexões Estabelecidas**: Identificar todos os **endereços IP** e **domínios** com os quais o **malware** tenta se comunicar.

2. **Protocolos Utilizados**: Analisar se o **malware** usa **HTTP**, **HTTPS**, **TCP** ou outros protocolos para comunicação.

3. **Dados Transmitidos**: Examinar o conteúdo dos pacotes para identificar informações exfiltradas ou comandos recebidos.

4. **Beacons e Heartbeats**: Identificar comunicações periódicas que podem indicar que o **malware** está verificando a disponibilidade do servidor **C2** ou aguardando instruções.

Ferramentas como **Wireshark**, podem ser essenciais para essa análise.
## **Atividades de Registro**
O **registro do Windows** é frequentemente alvo de **malwares** para **persistência**, **configuração** e **armazenamento de dados**. Devemos monitorar:

1. **Modificações para Persistência**: Alterações em chaves de inicialização como `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run` ou `HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run`.

2. **Configurações de Segurança**: Tentativas de desativar ferramentas de segurança através de modificações no **registro**.

3. **Armazenamento de Dados**: Criação de novas chaves para armazenar configurações do **malware** ou dados roubados.

4. **Técnicas de Evasão**: Modificações que visam ocultar a presença do **malware** ou dificultar sua remoção.

Ferramentas como **RegShot** (para comparar o estado do **registro** antes e depois da infecção) e **Process Monitor** (para capturar operações de **registro** em tempo real) são extremamente úteis.
## **Atividades de Arquivo**

O monitoramento de operações de **arquivo** é crucial para entender como o **malware** se instala, se propaga e manipula dados:

1. **Criação de Arquivos**: Novos **arquivos** criados pelo **malware**, como executáveis, **DLLs**, scripts ou **arquivos** de dados.

2. **Modificação de Arquivos**: Alterações em **arquivos** do sistema ou **arquivos** de configuração.

3. **Exclusão de Arquivos**: Remoção de **arquivos** de segurança ou logs que poderiam revelar sua presença.

4. **Acesso a Arquivos**: Leitura de **arquivos** contendo informações sensíveis que podem ser exfiltradas.