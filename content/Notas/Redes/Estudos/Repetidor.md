---
Tema Principal: 86-Repetidor
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Hardware, Camada Física
tags:
  - Repetidor
  - Hardware
  - Rede
  - Ethernet
  - Sinal
---

# 86-Repetidor

## Visão Geral

Um repetidor (repeater, em inglês) é o tipo mais simples de dispositivo de interconexão de redes, operando na Camada Física (Camada 1) do Modelo OSI. Sua única função é receber um sinal de rede (elétrico, óptico ou sem fio), regenerá-lo para combater os efeitos da atenuação ([[Atenuação]]) e distorção ([[Distorção]]) que ocorrem durante a transmissão em longas distâncias, e retransmitir o sinal regenerado. Repetidores não examinam o conteúdo dos dados (endereços MAC ou IP) nem tomam decisões de encaminhamento; eles simplesmente amplificam e limpam o sinal, permitindo que ele viaje por distâncias maiores do que seria possível em um único segmento de cabo. Hubs ([[Hub]]) são essencialmente repetidores com múltiplas portas.

## Definição

Um repetidor é um dispositivo eletrônico de Camada 1 que recebe um sinal fraco ou corrompido e o retransmite em um nível de potência mais alto ou por um lado diferente, de modo que o sinal possa cobrir distâncias mais longas sem degradação significativa. Ele atua como um extensor do meio físico da rede.

## Exemplos

*   **Repetidores Ethernet (Legado):** Usados em redes Ethernet coaxiais (10BASE5, 10BASE2 - [[Rede_Barra]]) para conectar dois segmentos de cabo e estender o comprimento total da rede além do limite de um único segmento.
*   **Hubs Ethernet:** Como mencionado, um hub é um repetidor multiportas. Conecta múltiplos dispositivos em uma topologia estrela física, mas funciona como um repetidor, compartilhando o mesmo domínio de colisão ([[Hub]]).
*   **Repetidores de Fibra Óptica:** Usados em links de fibra óptica de longa distância para regenerar o sinal óptico.
*   **Repetidores Wi-Fi (Extensores de Alcance):** Dispositivos que recebem o sinal Wi-Fi de um roteador ou ponto de acesso e o retransmitem para aumentar a área de cobertura da rede sem fio. Operam de forma análoga a um repetidor, geralmente na Camada 2 ou superior devido à natureza do Wi-Fi, mas o conceito de regenerar/retransmitir é similar.
*   **Repetidores Celulares:** Usados para amplificar sinais de celular em áreas com cobertura fraca.

## Características

*   **Operação na Camada 1 (Física):** Lida apenas com sinais brutos (elétricos, ópticos, de rádio).
*   **Regeneração de Sinal:** Amplifica, limpa e re-temporiza o sinal.
*   **Extensão de Distância:** Permite que a rede cubra distâncias maiores.
*   **Não Inteligente:** Não interpreta dados (endereços, protocolos).
*   **Não Segmenta Rede:** Não filtra tráfego nem separa domínios de colisão ou broadcast. Um repetidor conecta dois segmentos no mesmo domínio de colisão e broadcast.
*   **Transparente:** Invisível para protocolos de camadas superiores.

## Vantagens

*   **Extensão de Rede:** Permite superar as limitações de distância do cabeamento.
*   **Simplicidade:** Dispositivo muito simples.
*   **Baixo Custo (Histórico):** Eram a forma mais barata de estender uma rede.
*   **Mantém Características do Sinal:** Regenera o sinal para manter sua qualidade.

## Desvantagens

*   **Não Reduz Tráfego/Colisões:** Conecta segmentos no mesmo domínio de colisão, portanto, não melhora o desempenho em termos de congestionamento ou colisões. Na verdade, ao estender o segmento, pode até aumentar o diâmetro da rede e piorar o problema de colisões (Regra 5-4-3 da Ethernet legada).
*   **Propaga Problemas:** Retransmite tudo, incluindo erros, colisões e tráfego desnecessário (broadcasts).
*   **Limitações de Número:** Em redes Ethernet coaxiais, havia limites estritos (Regra 5-4-3) sobre quantos repetidores poderiam ser usados em série entre dois nós para garantir a detecção adequada de colisões.
*   **Obsolescência (em LANs Ethernet):** Amplamente substituídos por bridges ([[Bridge]]) e switches ([[Switch]]), que oferecem segmentação de domínios de colisão e filtragem inteligente de tráfego, além de estender a rede.

## Seção Expandida: A Regra 5-4-3 (Ethernet 10 Mbps Legada)

Para redes Ethernet 10BASE5 e 10BASE2 que usavam repetidores, a regra 5-4-3 limitava a topologia para garantir o funcionamento correto do CSMA/CD:
*   **5:** Máximo de 5 segmentos de rede em série entre quaisquer dois nós.
*   **4:** Máximo de 4 repetidores ou hubs entre quaisquer dois nós.
*   **3:** Máximo de 3 segmentos de "tronco" (segmentos com usuários conectados) entre quaisquer dois nós (os outros 2 segmentos deveriam ser "inter-repetidores").

Essa regra garantia que o tempo de propagação do sinal e a detecção de colisões funcionassem dentro dos limites do padrão. Switches eliminaram essa restrição ao criar domínios de colisão separados por porta.

## Notas Relacionadas

*   [[Atenuação]]
*   [[Distorção]]
*   [[Rede_Barra]] (Onde repetidores eram comuns)
*   [[Rede_Estrela]]
*   [[Hub]] (Repetidor multiportas)
*   [[Bridge]] (Contraste - Camada 2)
*   [[Switch]] (Contraste - Camada 2)
