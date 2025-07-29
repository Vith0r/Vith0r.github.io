---
Tema Principal: 05-Processamento Distribuído
Nível de Dificuldade: Médio
Fonte/Referência: Sistemas Distribuídos, Redes de Computadores
tags:
  - Processamento
  - Arquitetura
  - Redes
---

# 05-Processamento Distribuído

---

![[2.svg]]

---

## Visão Geral

O processamento distribuído é um paradigma onde componentes de um sistema de software são compartilhados entre múltiplos computadores ou nós de processamento interconectados por uma rede. Em vez de depender de um único local central, as tarefas de processamento, armazenamento de dados e controle são distribuídas entre várias máquinas que colaboram para atingir um objetivo comum. Este modelo é a base da maioria das aplicações modernas, desde a internet e computação em nuvem até sistemas peer-to-peer, oferecendo escalabilidade, tolerância a falhas e melhor desempenho.

## Definição

Processamento distribuído refere-se a um sistema computacional cujos componentes estão localizados em diferentes computadores em rede, que se comunicam e coordenam suas ações passando mensagens. O objetivo é fazer com que a coleção de computadores autônomos apareça para seus usuários como um único sistema coerente. As tarefas são divididas e executadas em paralelo ou de forma concorrente em diferentes nós.

## Exemplos

1.  **World Wide Web (WWW):** Um exemplo massivo de sistema distribuído, onde servidores web em todo o mundo hospedam páginas, e clientes (navegadores) acessam essas informações através da rede.
2.  **Computação em Nuvem (Cloud Computing):** Serviços como AWS, Google Cloud e Azure utilizam vastos data centers com milhares de servidores interconectados para oferecer poder computacional, armazenamento e serviços sob demanda de forma distribuída.
3.  **Redes Peer-to-Peer (P2P):** Sistemas como BitTorrent, onde os participantes (peers) atuam tanto como clientes quanto como servidores, compartilhando recursos diretamente entre si sem um servidor central.
4.  **Sistemas de Nomes de Domínio (DNS):** Um banco de dados hierárquico e distribuído globalmente que traduz nomes de domínio legíveis por humanos (ex: www.google.com) em endereços IP.
5.  **Aplicações Corporativas Modernas:** Muitas aplicações empresariais (ERPs, CRMs) são construídas usando arquiteturas distribuídas (ex: microsserviços) para melhor escalabilidade e manutenção.
6.  **Banco de Dados Distribuídos:** Bancos de dados cujos dados são armazenados em múltiplos computadores, permitindo maior volume de armazenamento e processamento paralelo de consultas.

## Características

*   **Concorrência:** Múltiplos processos podem executar simultaneamente em diferentes máquinas.
*   **Ausência de Relógio Global:** Coordenar ações baseadas no tempo é complexo, pois cada máquina tem seu próprio relógio.
*   **Falhas Independentes:** Falhas em um nó não necessariamente derrubam todo o sistema; outros nós podem continuar operando.
*   **Comunicação por Mensagens:** Os nós se comunicam trocando mensagens pela rede.
*   **Heterogeneidade:** Os nós podem ter hardware, sistemas operacionais e implementações diferentes.
*   **Transparência (Ideal):** O sistema deve esconder a complexidade da distribuição dos usuários e desenvolvedores (transparência de acesso, localização, falha, etc.).

## Vantagens

*   **Escalabilidade:** É mais fácil adicionar mais nós à rede para aumentar a capacidade de processamento ou armazenamento (escalabilidade horizontal).
*   **Tolerância a Falhas / Alta Disponibilidade:** A falha de um nó pode não afetar a disponibilidade geral do sistema se houver redundância.
*   **Desempenho:** Tarefas podem ser executadas em paralelo, potencialmente reduzindo o tempo total de execução.
*   **Custo-Efetividade:** Utilizar clusters de computadores comuns pode ser mais barato do que um único supercomputador ou mainframe de capacidade equivalente.
*   **Compartilhamento de Recursos:** Permite o compartilhamento de hardware, software e dados entre múltiplos usuários e aplicações.
*   **Flexibilidade Geográfica:** Os nós podem estar localizados em qualquer lugar, permitindo colaboração e acesso global.

## Desvantagens

*   **Complexidade:** Projetar, implementar, depurar e gerenciar sistemas distribuídos é significativamente mais complexo.
*   **Segurança:** Proteger dados e comunicações em uma rede distribuída é um desafio maior.
*   **Comunicação de Rede:** A latência e a largura de banda da rede podem se tornar gargalos. Falhas na rede podem dividir o sistema (network partitioning).
*   **Consistência de Dados:** Manter a consistência dos dados replicados em múltiplos nós é um problema complexo (ver Teorema CAP).
*   **Sincronização:** Coordenar ações entre nós sem um relógio global é difícil.
*   **Software:** Requer software mais sofisticado (middleware, algoritmos de consenso, etc.).

## Notas Relacionadas

*   [[Processamento_em_Batch]]
*   [[Processamento_Online]]
*   [[Processamento_Real_Time]]
*   [[Processamento_Centralizado]]
*   [[Instituições_de_Padronização]]
*   [[Host]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

