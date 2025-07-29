---
Tema Principal: "92-Meio Físico Guiado"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Redes de Computadores, Camada Física, Cabeamento"
Tags:
  - "Meio Físico"
  - "Meio Guiado"
  - "Cabeamento"
  - "Par Trançado"
  - "Coaxial"
  - "Fibra Óptica"
---

# 92-Meio Físico Guiado

## Visão Geral

Meios físicos guiados, também conhecidos como meios cabeados ou meios confinados, são aqueles em que os sinais eletromagnéticos são confinados e direcionados ao longo de um caminho físico sólido, como um fio metálico ou uma fibra de vidro. Esses meios fornecem um caminho tangível para a propagação do sinal, o que geralmente resulta em maior largura de banda, menor suscetibilidade a interferências externas e maior segurança em comparação com os meios não guiados ([[Meio_Físico_Não_Guiado]]). Os tipos mais comuns de meios físicos guiados usados em redes de computadores e telecomunicações são o par trançado ([[Meio_Físico_Par_Trançado]]), o cabo coaxial ([[Meio_Físico_Coaxial]]) e a fibra óptica ([[Meio_Físico_Fibra_Óptica]]).

## Definição

Um meio físico guiado é um tipo de meio de transmissão ([[Meio_Físico]]) que utiliza um condutor físico (cabo) para direcionar a propagação dos sinais de comunicação entre o transmissor e o receptor.

## Exemplos

*   **Par Trançado:**
    *   UTP (Unshielded Twisted Pair): Usado em Ethernet (10BASE-T, 100BASE-TX, 1000BASE-T), telefonia.
    *   STP (Shielded Twisted Pair): Similar ao UTP, mas com blindagem adicional para melhor proteção contra interferência. Usado em ambientes com alto ruído eletromagnético.
*   **Cabo Coaxial:**
    *   Thicknet (10BASE5) e Thinnet (10BASE2): Redes Ethernet legadas.
    *   TV a Cabo (CATV): Distribuição de sinais de televisão e Internet (DOCSIS).
    *   Algumas conexões de vídeo e rádio frequência.
*   **Fibra Óptica:**
    *   Monomodo (Single-mode): Para longas distâncias e altíssima largura de banda (backbones de operadoras, links submarinos).
    *   Multimodo (Multi-mode): Para distâncias mais curtas (LANs, data centers) com custo menor que monomodo.

## Características

*   **Confinamento do Sinal:** O sinal é guiado ao longo do cabo.
*   **Conexão Física:** Requer instalação de cabos e conectores.
*   **Largura de Banda:** Variável (moderada a altíssima, dependendo do tipo).
*   **Suscetibilidade a Interferência:** Variável (coaxial e STP/fibra são mais resistentes que UTP).
*   **Atenuação:** O sinal enfraquece com a distância, limitando o comprimento do cabo sem repetidores ([[Repetidor]]).
*   **Segurança:** Geralmente mais seguro que meios não guiados, pois requer acesso físico para interceptação (tapping).

## Vantagens

*   **Maior Largura de Banda (Potencial):** Fibra óptica oferece larguras de banda muito superiores às tecnologias sem fio atuais.
*   **Menor Interferência:** Menos suscetível a interferências eletromagnéticas externas e condições atmosféricas em comparação com wireless (especialmente fibra e cabos blindados).
*   **Maior Segurança:** Mais difícil de interceptar sinais sem acesso físico ao cabo.
*   **Conexão Estável:** Geralmente mais confiável e com desempenho mais consistente do que conexões sem fio, que podem sofrer com interferências e obstáculos.

## Desvantagens

*   **Custo de Instalação:** Instalar cabos pode ser caro, demorado e disruptivo, especialmente em edifícios existentes ou longas distâncias.
*   **Falta de Mobilidade:** Os dispositivos conectados estão fisicamente presos ao cabo.
*   **Danos Físicos:** Cabos podem ser danificados por corte, esmagamento, roedores, etc.
*   **Limitações de Distância:** Cada tipo de cabo tem um comprimento máximo recomendado antes que a atenuação degrade o sinal excessivamente (requer repetidores para distâncias maiores).

## Seção Expandida: Comparativo Básico entre Meios Guiados

| Característica        | Par Trançado (UTP Cat 5e/6) | Cabo Coaxial (RG-6) | Fibra Óptica (Monomodo) |
| :-------------------- | :-------------------------- | :------------------ | :---------------------- |
| **Largura de Banda**  | Alta (até 10 Gbps)          | Alta (até ~1 Gbps+) | Altíssima (Tbps+)       |
| **Distância Máx.**    | Curta (~100m)               | Moderada (~500m+)   | Muito Longa (dezenas/centenas de km) |
| **Imunidade a EMI**   | Baixa a Moderada            | Moderada a Alta     | Muito Alta (imune)      |
| **Custo (Cabo)**      | Baixo                       | Moderado            | Alto                    |
| **Custo (Equip/Inst.)**| Baixo                       | Moderado            | Alto                    |
| **Flexibilidade**     | Alta                        | Moderada            | Baixa (mais frágil)     |
| **Aplicação Típica**  | LAN Ethernet, Telefonia     | TV a Cabo, Internet | Backbones, WAN, LANs    |

## Notas Relacionadas

*   [[Repetidor]]
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Não_Guiado]] (Contraste)
*   [[Meio_Físico_Coaxial]]
*   [[Meio_Físico_Par_Trançado]]
*   [[Meio_Físico_Fibra_Óptica]]
*   [[Largura_de_Banda]]

