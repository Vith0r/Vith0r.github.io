---
Tema Principal: 82-Bridge
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Hardware
tags:
  - Bridge
  - Hardware
  - Rede
  - Ethernet
---

# 82-Bridge

## Visão Geral

Uma bridge (ponte, em português) é um dispositivo de rede que opera na Camada de Enlace de Dados (Camada 2) do Modelo OSI e é usado para conectar dois ou mais segmentos de rede local (LAN) separados, permitindo que eles se comuniquem como se fossem uma única rede lógica maior (um único domínio de broadcast). Diferente de um repetidor ou hub ([[Hub]]), que opera na Camada 1 e simplesmente repete sinais elétricos, uma bridge examina o endereço MAC (Media Access Control) de destino de cada quadro (frame) que recebe. Com base em uma tabela de endereços MAC que ela constrói dinamicamente (tabela CAM), a bridge toma decisões inteligentes sobre encaminhar (forward), filtrar (filter/drop) ou inundar (flood) o quadro. O principal objetivo de usar bridges é segmentar uma rede local em múltiplos domínios de colisão menores, melhorando o desempenho ao reduzir o número de colisões, e filtrar tráfego desnecessário entre os segmentos.

## Definição

Uma bridge é um dispositivo de Camada 2 que conecta segmentos de LAN e utiliza os endereços MAC dos quadros para tomar decisões de encaminhamento. Ela aprende quais endereços MAC residem em cada segmento conectado às suas portas e usa essa informação para:
*   **Filtrar:** Se um quadro recebido em uma porta tem origem e destino no mesmo segmento (mesma porta), a bridge descarta o quadro (não o encaminha para outros segmentos).
*   **Encaminhar:** Se um quadro recebido em uma porta tem um endereço MAC de destino conhecido que reside em um segmento diferente (outra porta), a bridge encaminha o quadro apenas para a porta correspondente.
*   **Inundar (Flood):** Se o endereço MAC de destino é desconhecido ou é um endereço de broadcast/multicast, a bridge encaminha o quadro para todas as portas, exceto a porta de origem.

## Exemplos

*   **Bridges Transparentes (Transparent Bridges):** O tipo mais comum em redes Ethernet. Elas aprendem a topologia da rede automaticamente ouvindo o tráfego (endereços MAC de origem) e não requerem configuração manual dos dispositivos finais. Usam o algoritmo Spanning Tree Protocol (STP) para evitar loops em topologias com caminhos redundantes.
*   **Bridges de Rota de Origem (Source Routing Bridges):** Usadas principalmente em redes Token Ring ([[Rede_Anel]]). A rota que o quadro deve seguir é determinada pelo dispositivo de origem e incluída no próprio quadro.
*   **Bridges Translacionais (Translational Bridges):** Convertem entre diferentes formatos de quadro de Camada 2 (ex: Ethernet para Token Ring ou FDDI). Raras e complexas.
*   **Switches (Modernos):** Um switch Ethernet moderno ([[Switch]]) é essencialmente uma bridge multiportas de alta velocidade. Cada porta do switch representa um segmento de rede separado (domínio de colisão), e o switch realiza a função de bridging entre todas as suas portas de forma muito eficiente usando hardware dedicado (ASICs).

## Características

*   **Operação na Camada 2 (Enlace):** Trabalha com endereços MAC e quadros.
*   **Segmentação de Domínios de Colisão:** Cada porta conectada a uma bridge (ou switch) forma um domínio de colisão separado.
*   **Domínio de Broadcast Único:** Por padrão, bridges não segmentam domínios de broadcast; elas inundam quadros de broadcast para todas as portas.
*   **Tabela de Endereços MAC (CAM Table):** Armazena mapeamentos entre endereços MAC e portas.
*   **Aprendizado Dinâmico:** Constrói a tabela MAC automaticamente observando o tráfego.
*   **Decisões de Encaminhamento/Filtragem:** Encaminha ou filtra quadros com base no MAC de destino.
*   **Transparente para Protocolos de Camada Superior:** Opera independentemente dos protocolos de rede (IP, IPX, etc.) transportados dentro dos quadros.

## Vantagens

*   **Melhora o Desempenho:** Reduz colisões ao segmentar a rede em domínios de colisão menores.
*   **Filtra Tráfego:** Isola o tráfego local dentro de um segmento, reduzindo o tráfego desnecessário em outros segmentos.
*   **Aumenta o Alcance da Rede:** Permite conectar segmentos que excederiam os limites de distância de um único segmento.
*   **Conecta Segmentos com Tecnologias Diferentes (Bridges Translacionais):** Embora complexo.
*   **Simplicidade (Transparente):** Não requer configuração nos hosts.

## Desvantagens

*   **Não Segmenta Broadcasts:** Tempestades de broadcast (broadcast storms) podem se propagar por toda a rede interligada por bridges, consumindo largura de banda e CPU dos dispositivos.
*   **Latência:** Introduz uma pequena latência ao processar cada quadro (armazenar, verificar MAC, encaminhar).
*   **Custo (Histórico):** Eram mais caras que repetidores/hubs.
*   **Limitações de Escalabilidade (Comparado a Roteadores):** Não escalam tão bem quanto roteadores para redes muito grandes, devido ao domínio de broadcast único e ao tamanho potencial das tabelas MAC.
*   **Loops de Rede:** Topologias com loops requerem protocolos como STP para evitar a circulação infinita de quadros, o que adiciona complexidade e pode desativar links redundantes.

## Seção Expandida: Bridge vs. Roteador

A principal diferença reside na camada de operação e na função:
*   **Bridge (Camada 2):** Conecta segmentos de LAN, encaminha com base em endereços MAC, opera dentro de um único domínio de rede lógica (sub-rede IP), não bloqueia broadcasts por padrão.
*   **Roteador (Camada 3):** Conecta redes lógicas diferentes (sub-redes IP), encaminha com base em endereços IP (lógicos), bloqueia broadcasts por padrão (cada porta é um domínio de broadcast separado), toma decisões de roteamento com base em tabelas de roteamento. [[Roteador]]

Switches modernos de Camada 3 (multilayer switches) combinam funcionalidades de bridging/switching rápido na Camada 2 com funcionalidades de roteamento na Camada 3.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Rede_Barra]]
*   [[Rede_Estrela]]
*   [[Hub]] (Contraste)
*   [[Roteador]] (Contraste)
*   [[Switch]] (Evolução da bridge)
