---
Tema Principal: 32-Host
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Arquitetura de Computadores
tags:
  - Host
  - Redes
---

# 32-Host

## Visão Geral

O termo "host" (hospedeiro, anfitrião) em computação e redes refere-se a um computador ou dispositivo conectado a uma rede que fornece ou consome recursos e serviços. Originalmente, o termo estava fortemente associado aos grandes computadores centrais (mainframes) em arquiteturas de processamento centralizado e teleprocessamento, onde o host era o cérebro da operação, executando aplicações e gerenciando dados para terminais remotos. Com a evolução para redes distribuídas e a internet, o conceito se expandiu, mas a ideia fundamental de um computador que "hospeda" recursos ou serviços para outros na rede permanece central. Qualquer computador conectado a uma rede que participa da comunicação pode ser considerado um host.

## Definição

Um host é um computador ou outro dispositivo conectado a uma rede de computadores que pode oferecer recursos, dados, serviços ou programas para outros nós (clientes) ou consumir serviços oferecidos por outros hosts (servidores). Em arquiteturas cliente-servidor, o servidor é um tipo de host que fornece serviços, e o cliente é um host que os requisita. Em redes peer-to-peer, cada nó atua como host, podendo ser tanto cliente quanto servidor. No contexto histórico do teleprocessamento, "host" referia-se especificamente ao computador central (mainframe ou minicomputador) que realizava o processamento principal.

## Exemplos

1.  **Mainframes:** Os computadores centrais em sistemas legados que executam aplicações e gerenciam bancos de dados para terminais conectados.
2.  **Servidores:** Qualquer computador dedicado a fornecer um serviço específico na rede:
    *   **Servidor Web:** Hospeda sites e responde a requisições HTTP de navegadores (hosts clientes).
    *   **Servidor de Arquivos:** Armazena arquivos e os disponibiliza para acesso por outros hosts na rede.
    *   **Servidor de E-mail:** Gerencia o envio, recebimento e armazenamento de e-mails.
    *   **Servidor de Banco de Dados:** Hospeda e gerencia um banco de dados, respondendo a consultas de aplicações clientes.
    *   **Servidor de Aplicação:** Executa a lógica de negócio de uma aplicação.
3.  **Computadores Pessoais (Desktops, Laptops):** Quando conectados a uma rede (internet ou LAN), atuam como hosts, consumindo serviços (navegação web, e-mail) e, potencialmente, oferecendo recursos (compartilhamento de arquivos).
4.  **Smartphones e Tablets:** Também são hosts quando conectados a redes Wi-Fi ou celulares.
5.  **Dispositivos IoT (Internet of Things):** Sensores, câmeras e outros dispositivos conectados à rede são considerados hosts.

## Características

*   **Conectividade de Rede:** Possui uma interface de rede (física ou sem fio) e um endereço de rede (como um endereço IP) para comunicação.
*   **Capacidade de Processamento:** Possui CPU, memória e armazenamento para executar programas e processar dados (variando enormemente conforme o tipo de host).
*   **Oferece ou Consome Serviços:** Atua como provedor (servidor) ou consumidor (cliente) de recursos na rede, ou ambos (peer).
*   **Identificação Única (na rede):** Possui um endereço que o identifica unicamente na rede local ou global.
*   **Executa Sistema Operacional:** Geralmente executa um sistema operacional que gerencia seus recursos e a pilha de protocolos de rede.

## Vantagens (de usar Hosts/Servidores)

*   **Centralização de Recursos/Serviços:** Facilita o gerenciamento, backup e segurança de dados e aplicações quando centralizados em hosts servidores.
*   **Compartilhamento de Recursos:** Permite que múltiplos clientes acessem os mesmos recursos (arquivos, impressoras, aplicações).
*   **Processamento Poderoso:** Hosts servidores podem ser dimensionados para ter grande capacidade de processamento e armazenamento.
*   **Disponibilidade:** Servidores são frequentemente projetados para alta disponibilidade (redundância, etc.).

## Desvantagens (de depender de Hosts Centrais)

*   **Ponto Único de Falha:** Se um servidor crítico falhar, os serviços que ele hospeda ficam indisponíveis para os clientes.
*   **Gargalo de Desempenho:** Um servidor sobrecarregado pode se tornar um gargalo, afetando o desempenho para todos os clientes conectados.
*   **Custo:** Hosts servidores de alta capacidade podem ser caros para adquirir e manter.
*   **Complexidade de Gerenciamento:** Administrar servidores requer conhecimento especializado.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Processamento_Distribuido]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Código_EBCDIC]]
*   [[Ligação_Multiponto]]
*   [[Selection_e_Polling]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Controladoras_de_Comunicação]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]

