---
Tema Principal: 85-Switch
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Hardware, Ethernet
tags:
  - Switch
  - Hardware
  - Rede
  - Ethernet
  - Bridge
---

# 85-Switch

## Visão Geral

Um switch (comutador, em português) é um dispositivo de rede inteligente que opera predominantemente na Camada de Enlace de Dados (Camada 2) do Modelo OSI e é usado para conectar múltiplos dispositivos em uma rede local (LAN), geralmente Ethernet. Ao contrário de um hub ([[Hub]]), que simplesmente repete o sinal para todas as portas, um switch aprende os endereços MAC (Media Access Control) dos dispositivos conectados a cada uma de suas portas e encaminha o tráfego (quadros Ethernet) apenas para a porta específica onde o dispositivo de destino está localizado. Isso cria conexões ponto a ponto virtuais e temporárias entre os dispositivos comunicantes. Cada porta de um switch funciona como um domínio de colisão separado, eliminando colisões entre portas e permitindo comunicação full-duplex (transmissão e recepção simultâneas). Switches são a base da maioria das redes locais modernas devido à sua eficiência, desempenho e capacidade de segmentação.

## Definição

Um switch é um dispositivo de Camada 2 que conecta segmentos de rede ou dispositivos individuais, utilizando endereços MAC para encaminhar quadros de forma seletiva entre suas portas. Ele mantém uma tabela de endereços MAC (tabela CAM - Content Addressable Memory) que mapeia os endereços MAC aprendidos para as portas correspondentes. Quando um quadro chega, o switch examina o endereço MAC de destino:
*   Se o destino é conhecido e está em uma porta diferente da origem, o quadro é encaminhado apenas para essa porta.
*   Se o destino está na mesma porta de origem, o quadro é descartado (filtrado).
*   Se o destino é desconhecido ou é um endereço de broadcast/multicast, o quadro é inundado (flooded) para todas as portas, exceto a de origem.

Essencialmente, um switch pode ser considerado uma **bridge multiportas** ([[Bridge]]) otimizada e de alta velocidade.

## Exemplos

*   **Switches Não Gerenciáveis (Unmanaged Switches):** Dispositivos plug-and-play simples, sem opções de configuração. Comuns em redes domésticas e pequenos escritórios. Aprendem MACs e encaminham tráfego automaticamente.
*   **Switches Gerenciáveis (Managed Switches):** Oferecem recursos avançados de configuração e monitoramento via interface web, CLI ou SNMP. Permitem configurar VLANs (Virtual LANs), QoS (Quality of Service), agregação de links (link aggregation), port mirroring, Spanning Tree Protocol (STP), etc. Usados em redes corporativas.
*   **Switches de Camada 3 (Multilayer Switches):** Combinam funcionalidades de switching de Camada 2 com funcionalidades de roteamento de Camada 3 ([[Roteador]]). Podem encaminhar tráfego entre diferentes VLANs/sub-redes IP sem a necessidade de um roteador externo dedicado, geralmente com desempenho muito alto.
*   **Switches PoE (Power over Ethernet):** Fornecem energia elétrica através do cabo Ethernet para dispositivos conectados, como telefones IP, câmeras de segurança e pontos de acesso Wi-Fi.

## Características

*   **Operação na Camada 2 (Enlace):** Trabalha com endereços MAC e quadros.
*   **Múltiplos Domínios de Colisão:** Cada porta é um domínio de colisão separado.
*   **Domínio de Broadcast Único (Por VLAN):** Por padrão, encaminha broadcasts para todas as portas dentro da mesma VLAN.
*   **Tabela MAC (CAM Table):** Armazena mapeamentos MAC-porta.
*   **Aprendizado Dinâmico de Endereços:** Constrói a tabela MAC automaticamente.
*   **Encaminhamento Seletivo:** Encaminha quadros apenas para a porta necessária.
*   **Suporte a Full-Duplex:** Permite transmissão e recepção simultâneas em cada porta, dobrando a largura de banda efetiva.
*   **Alta Velocidade:** Operam em velocidades Fast Ethernet (100 Mbps), Gigabit Ethernet (1 Gbps), 10 Gbps e superiores.
*   **Microsegmentação:** Quando cada dispositivo está conectado a uma porta dedicada do switch, a rede está microsegmentada, eliminando completamente as colisões.

## Vantagens

*   **Alto Desempenho:** Aumenta significativamente a largura de banda disponível e reduz o congestionamento em comparação com hubs ou barramentos compartilhados.
*   **Eliminação de Colisões (Microsegmentação):** Cada porta é um domínio de colisão, e o modo full-duplex elimina colisões.
*   **Eficiência:** Encaminha tráfego apenas onde é necessário.
*   **Segmentação (VLANs):** Switches gerenciáveis permitem criar redes locais virtuais (VLANs) para segmentar logicamente a rede, melhorando a segurança e o gerenciamento, mesmo que os dispositivos estejam conectados ao mesmo switch físico.
*   **Escalabilidade:** Fácil adicionar mais dispositivos (até o limite de portas) ou interligar switches.
*   **Custo-Efetivo:** O custo por porta dos switches diminuiu drasticamente, tornando-os a escolha padrão para conectividade LAN.

## Desvantagens

*   **Custo (vs. Hubs - Histórico):** Eram inicialmente mais caros que hubs, mas a diferença é mínima ou inexistente hoje.
*   **Complexidade (Gerenciáveis):** Switches gerenciáveis requerem conhecimento para configurar e manter seus recursos avançados.
*   **Não Bloqueia Broadcasts (Por Padrão):** Assim como bridges, switches não bloqueiam broadcasts dentro de uma VLAN, o que pode ser um problema em redes muito grandes (requer roteadores ou switches L3 para segmentar broadcasts entre VLANs).

## Seção Expandida: Métodos de Comutação (Switching Methods)

Switches podem usar diferentes métodos para encaminhar quadros:
1.  **Store-and-Forward:** O switch recebe o quadro inteiro, armazena-o temporariamente, verifica o FCS (Frame Check Sequence - [[Método_Cyclic_Redundancy_Checking_(CRC)]]) para erros e, se estiver correto, consulta a tabela MAC e o encaminha. É o método mais seguro (descarta quadros corrompidos), mas introduz a maior latência.
2.  **Cut-Through:** O switch começa a encaminhar o quadro assim que lê o endereço MAC de destino no cabeçalho, antes mesmo de receber o quadro inteiro. Reduz a latência significativamente, mas pode encaminhar quadros corrompidos (erros no final do quadro não são detectados antes do encaminhamento). Existem variações como "Fragment-Free" que esperam receber os primeiros 64 bytes (onde a maioria das colisões ocorre) antes de encaminhar.
3.  **Adaptive Switching:** Combina os dois métodos, começando com cut-through e mudando para store-and-forward se a taxa de erro em uma porta exceder um certo limiar.

A maioria dos switches modernos usa store-and-forward ou implementações avançadas de cut-through/adaptativas.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Rede_Estrela]] (Topologia onde switches são usados)
*   [[Hub]] (Contraste)
*   [[Bridge]] (Conceito fundamental do switch)
*   [[Roteador]] (Contraste, e Switches L3)
*   [[Gateway]]
*   [[Meio_Físico_Par_Trançado]]