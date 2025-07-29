---
Tema Principal: 33-Unidade Controladora de Terminais
Nível de Dificuldade: Médio
Fonte/Referência: Arquitetura de Computadores, Redes de Computadores, Sistemas IBM
tags:
  - Controladora
  - Terminal
  - Redes
  - IBM
  - Mainframe
---

# 33-Unidade Controladora de Terminais

---

![[11.svg]]

---

## Visão Geral

A Unidade Controladora de Terminais, frequentemente chamada de "cluster controller" especialmente no ecossistema IBM, era um componente crucial nas arquiteturas de computação centralizada e teleprocessamento, particularmente em ambientes mainframe. Ela atuava como um intermediário inteligente entre um grupo (cluster) de terminais "burros" (dispositivos com pouca ou nenhuma capacidade de processamento local) e o computador host central. Sua função principal era concentrar o tráfego de múltiplos terminais em uma única linha de comunicação de maior velocidade para o host, além de descarregar o host de tarefas repetitivas de gerenciamento de terminais, como polling, selection e formatação de dados, otimizando assim o uso dos recursos da linha e do próprio host.

## Definição

Uma Unidade Controladora de Terminais é um dispositivo de hardware que gerencia e controla um grupo de terminais de exibição e/ou impressoras, conectando-os a um computador host através de uma linha de comunicação compartilhada (geralmente multiponto). Ela implementa parte do protocolo de comunicação da rede (como BSC ou SDLC), lida com o polling e selection dos terminais conectados a ela, armazena temporariamente (buffer) os dados, realiza formatação de tela e pode executar algumas funções básicas de edição localmente, reduzindo a carga sobre o host e a linha de comunicação principal.

## Exemplos

1.  **IBM 3274 / 3174 Control Unit:** Dispositivos icônicos no mundo IBM 3270, conectando terminais de exibição 3278/3279 e impressoras 3287 ao mainframe via protocolos como BSC ou SDLC.
2.  **Controladores de Cluster em Outros Sistemas:** Conceitos similares existiram em outros sistemas de computação centralizada de diferentes fabricantes, gerenciando grupos de terminais proprietários.
3.  **Concentradores de Terminais:** Em um sentido mais amplo, dispositivos que agregam múltiplas conexões de terminais de baixa velocidade em uma linha de maior velocidade podem ser vistos como uma forma de controladora de terminais.

## Características

*   **Concentração de Terminais:** Conecta múltiplos terminais (tipicamente 8, 16, 32 ou mais) a uma única interface de comunicação com o host.
*   **Gerenciamento de Protocolo:** Implementa protocolos de enlace de dados (ex: SDLC, BSC) para comunicação com o host e, frequentemente, um protocolo mais simples para comunicação com os terminais locais.
*   **Polling/Selection:** Gerencia o polling dos terminais locais para verificar se têm dados a enviar e o selection para entregar dados vindos do host.
*   **Buffering:** Armazena temporariamente dados vindos dos terminais antes de enviá-los ao host e dados vindos do host antes de enviá-los aos terminais.
*   **Formatação de Dados/Tela:** Pode realizar tarefas de formatação de tela (ex: gerenciamento de campos protegidos/desprotegidos em terminais 3270).
*   **Conectividade:** Possui portas para conectar os terminais (ex: coaxial) e uma ou mais portas para conectar à linha de comunicação com o host (ex: via modem).

## Vantagens

*   **Redução da Carga no Host:** Descarrega o processador central das tarefas de baixo nível de gerenciamento de múltiplos terminais e do protocolo de linha.
*   **Uso Eficiente da Linha de Comunicação:** Permite que múltiplos terminais compartilhem uma única linha de maior custo para o host, reduzindo custos de telecomunicações.
*   **Melhor Desempenho Percebido:** Ao lidar com algumas interações localmente (como movimentação do cursor entre campos), pode melhorar o tempo de resposta para o usuário do terminal.
*   **Simplificação dos Terminais:** Permite que os terminais sejam mais simples e baratos, pois a inteligência reside na controladora.
*   **Ponto de Gerenciamento:** Centraliza a conexão e o gerenciamento de um grupo de terminais.

## Desvantagens

*   **Custo da Controladora:** Representa um custo adicional de hardware.
*   **Ponto Único de Falha:** Uma falha na controladora torna todos os terminais conectados a ela inoperantes.
*   **Potencial Gargalo:** A capacidade da controladora (processamento, buffer, velocidade da linha para o host) pode se tornar um gargalo se muitos terminais estiverem muito ativos.
*   **Tecnologia Proprietária:** Frequentemente ligada a arquiteturas e protocolos específicos de um fabricante (como a IBM).
*   **Complexidade de Configuração:** Configurar a controladora, os terminais e a conexão com o host podia ser complexo.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Ligação_Multiponto]]
*   [[Selection_e_Polling]]
*   [[Host]]
*   [[Controladoras_de_Comunicação]]
*   [[Controladoras_Hardwired_(TCU)]]
*   [[Controladoras_Programáveis_(PFEP)]]
*   [[Terminais_de_Dados]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]

