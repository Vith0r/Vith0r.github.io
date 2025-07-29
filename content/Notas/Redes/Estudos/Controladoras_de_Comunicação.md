---
Tema Principal: 34-Controladoras de Comunicação
Nível de Dificuldade: Médio
Fonte/Referência: Arquitetura de Computadores, Redes de Computadores, Sistemas IBM
tags:
  - Controladora
  - Comunicação
  - Redes
  - Host
  - FEP
---

# 34-Controladoras de Comunicação

## Visão Geral

As Controladoras de Comunicação, também conhecidas como Processadores de Front-End (FEP - Front-End Processors) ou Processadores de Comunicação, são dispositivos especializados (hardware e software) que atuam como intermediários entre um computador host central (tipicamente um mainframe) e a rede de comunicação. Sua principal função é descarregar o host das tarefas complexas e intensivas de gerenciamento das linhas de comunicação, protocolos de rede e dispositivos conectados (como terminais, controladoras de terminais e outras redes). Ao assumir essas responsabilidades, a controladora de comunicação libera ciclos preciosos da CPU do host para se concentrar no processamento das aplicações principais, melhorando o desempenho geral do sistema e a eficiência da rede.

## Definição

Uma Controladora de Comunicação é um computador ou dispositivo dedicado, localizado próximo ao host, que gerencia as funções de entrada/saída (I/O) relacionadas à comunicação de dados. Ela lida com o controle físico das linhas de comunicação, execução de protocolos de enlace de dados e rede (ex: montagem/desmontagem de frames/pacotes, controle de erros, controle de fluxo), gerenciamento de múltiplas linhas e diferentes velocidades, conversão de códigos e, em modelos mais avançados (programáveis), pode até executar parte da lógica da aplicação relacionada à comunicação.

## Exemplos

1.  **IBM 37xx Series (ex: 3705, 3720, 3725, 3745):** A linha clássica de controladoras de comunicação da IBM, projetada para trabalhar com mainframes System/360, System/370 e sucessores, rodando software como o NCP (Network Control Program). Elas gerenciavam redes SNA (Systems Network Architecture) e outros protocolos.
2.  **Processadores de Interface de Mensagens (IMPs):** Os roteadores originais da ARPANET, precursora da Internet, atuavam como controladoras de comunicação para os hosts conectados à rede.
3.  **Servidores de Acesso Remoto (RAS - Remote Access Servers):** Em um contexto mais moderno, servidores que gerenciam múltiplas conexões de dial-up, ISDN ou VPN podem ser vistos como uma evolução do conceito, descarregando o servidor principal do gerenciamento dessas conexões.
4.  **Placas de Rede Inteligentes (SmartNICs):** Placas de rede avançadas que descarregam tarefas de processamento de rede (TCP offload, criptografia) da CPU principal do servidor podem ser consideradas uma forma moderna e distribuída de controladora de comunicação.

## Características

*   **Descarregamento do Host (Offloading):** Principal função é liberar a CPU do host das tarefas de comunicação.
*   **Gerenciamento de Linhas:** Controla múltiplas linhas de comunicação de diferentes tipos e velocidades.
*   **Execução de Protocolos:** Implementa protocolos de enlace (SDLC, HDLC, Ethernet) e, às vezes, de rede (IP, IPX).
*   **Controle de Erros e Fluxo:** Gerencia a detecção/correção de erros e o controle de fluxo nas linhas.
*   **Buffering:** Armazena temporariamente dados em trânsito entre o host e a rede.
*   **Concentração/Multiplexação:** Pode concentrar tráfego de linhas de baixa velocidade em linhas de maior velocidade.
*   **Conectividade com Host:** Conecta-se ao host através de um canal de I/O de alta velocidade.
*   **Programabilidade (em FEPs):** Modelos mais avançados eram programáveis, permitindo customização e execução de funções adicionais.

## Vantagens

*   **Melhora Desempenho do Host:** Libera a CPU principal para tarefas de aplicação, resultando em melhor desempenho geral.
*   **Maior Throughput de Rede:** O processamento dedicado permite gerenciar mais linhas e maior volume de tráfego de forma eficiente.
*   **Flexibilidade:** Permite conectar o host a diferentes tipos de redes e dispositivos usando protocolos variados sem exigir modificações complexas no software do host.
*   **Modularidade:** Permite atualizar ou modificar a infraestrutura de comunicação sem impactar diretamente o host.
*   **Confiabilidade:** Isola parcialmente o host de problemas na rede de comunicação.

## Desvantagens

*   **Custo Elevado:** Eram equipamentos caros, tanto em hardware quanto em software (ex: licença do NCP).
*   **Complexidade:** Configurar e gerenciar a controladora de comunicação e seu software era uma tarefa especializada.
*   **Ponto Único de Falha:** Uma falha na controladora podia interromper toda a comunicação do host com a rede externa.
*   **Potencial Gargalo:** A própria controladora poderia se tornar um gargalo se subdimensionada para a carga da rede.
*   **Obsolescência (em parte):** Com o aumento da capacidade das CPUs dos hosts e a evolução das redes (especialmente Ethernet e TCP/IP, onde parte do processamento é distribuído), o conceito de FEP monolítico tornou-se menos comum, embora o princípio de offloading persista em SmartNICs e outros dispositivos.

## Seção Expandida: Hardwired vs. Programáveis

As primeiras controladoras de comunicação eram frequentemente "hardwired" ([[Controladoras_Hardwired_(TCU)]]), com sua lógica implementada diretamente em circuitos, oferecendo pouca flexibilidade. A grande evolução veio com as controladoras programáveis ([[Controladoras_Programáveis_(PFEP)]]), como a série IBM 37xx. Essas eram essencialmente computadores dedicados que rodavam um sistema operacional e software de controle de rede (como o NCP). Isso permitia que fossem atualizadas para suportar novos protocolos, novas velocidades de linha e novas funcionalidades através de software, oferecendo muito mais flexibilidade e longevidade, além de permitir a execução de funções mais complexas, como roteamento básico e conversão de protocolos.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Controladoras_Hardwired_(TCU)]]
*   [[Controladoras_Programáveis_(PFEP)]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

