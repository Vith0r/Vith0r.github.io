---
Tema Principal: 98-Meio Físico Par Trançado
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Camada Física, Cabeamento Estruturado
tags:
  - Meio
  - Físico
  - Meio
  - Guiado
  - Par
  - Trançado
  - Ethernet
  - Cabeamento
---

# 98-Meio Físico Par Trançado

## Visão Geral

O cabo de par trançado (twisted pair) é o tipo de meio físico guiado ([[Meio_Físico_Guiado]]) mais comum e amplamente utilizado em redes locais (LANs - [[Redes_Locais_(LAN)]]) Ethernet e em sistemas de telefonia. Ele consiste em pares de fios de cobre isolados que são trançados juntos. O ato de trançar os fios ajuda a reduzir a interferência eletromagnética (EMI) e a diafonia (crosstalk) entre os pares adjacentes e de fontes externas. Existem dois tipos principais: UTP (Unshielded Twisted Pair), que não possui blindagem adicional, e STP (Shielded Twisted Pair), que inclui uma ou mais camadas de blindagem metálica para maior proteção contra ruído. O par trançado é popular devido ao seu baixo custo, flexibilidade e facilidade de instalação, especialmente quando usado em conjunto com a topologia em estrela ([[Rede_Estrela]]) e conectores RJ-45.

## Definição

Um cabo de par trançado é um tipo de cabeamento no qual dois condutores de um único circuito são trançados juntos com o propósito de melhorar a imunidade a ruídos eletromagnéticos e reduzir a diafonia. Múltiplos pares trançados são geralmente agrupados dentro de uma capa externa comum para formar um cabo multipares (tipicamente 4 pares em cabos Ethernet).

## Exemplos

*   **UTP (Unshielded Twisted Pair):**
    *   **Categoria 3 (Cat 3):** Legado, usado para telefonia e Ethernet 10BASE-T (10 Mbps).
    *   **Categoria 5/5e (Cat 5/5e):** Amplamente utilizado para Fast Ethernet (100BASE-TX, 100 Mbps) e Gigabit Ethernet (1000BASE-T, 1 Gbps).
    *   **Categoria 6 (Cat 6):** Suporta Gigabit Ethernet e 10 Gigabit Ethernet (10GBASE-T) em distâncias mais curtas (até 55m).
    *   **Categoria 6A (Cat 6A):** Projetado para 10 Gigabit Ethernet até 100 metros.
    *   **Categoria 7/7A/8:** Categorias mais recentes com blindagem aprimorada (geralmente STP/FTP) para velocidades ainda maiores (25/40 Gbps).
*   **STP (Shielded Twisted Pair):** Inclui blindagem.
    *   **FTP (Foiled Twisted Pair):** Uma folha metálica envolve todos os pares.
    *   **S/FTP (Shielded/Foiled Twisted Pair):** Blindagem de malha geral e folhas individuais para cada par.
    *   Usado em ambientes com alta interferência ou para padrões de maior velocidade que exigem melhor proteção.
*   **Conector RJ-45:** Conector padrão de 8 pinos usado com cabos de par trançado em redes Ethernet.

## Características

*   **Pares Trançados:** Fios de cobre isolados e trançados em pares.
*   **Redução de Interferência:** O trançamento cancela parte do ruído induzido.
*   **Tipos UTP e STP:** Sem blindagem (mais comum, barato) ou com blindagem (melhor proteção, mais caro).
*   **Categorias:** Padrões que definem as características de desempenho (largura de banda, frequência máxima) dos cabos (Cat 3, 5e, 6, 6A, etc.).
*   **Conector RJ-45:** Conector padrão.
*   **Custo:** Relativamente baixo, especialmente UTP.
*   **Flexibilidade e Facilidade de Instalação:** Mais flexível e fácil de manusear que coaxial ou fibra.
*   **Limitação de Distância:** Geralmente limitado a 100 metros por segmento em redes Ethernet.

## Vantagens

*   **Baixo Custo:** É o tipo de cabeamento de rede mais barato.
*   **Facilidade de Instalação:** Leve, flexível e fácil de instalar e terminar com conectores RJ-45.
*   **Ampla Adoção:** Tecnologia madura e universalmente suportada por equipamentos de rede Ethernet.
*   **Bom Desempenho (Categorias Modernas):** Categorias como Cat 5e, Cat 6 e Cat 6A suportam altas velocidades (Gigabit e 10 Gigabit Ethernet).
*   **Adequado para Cabeamento Estruturado:** Facilmente integrado em sistemas de cabeamento estruturado em edifícios.

## Desvantagens

*   **Suscetibilidade a Interferência (UTP):** Mais vulnerável a EMI e diafonia do que cabos blindados (STP, coaxial) ou fibra óptica, especialmente em longas distâncias ou altas frequências.
*   **Limitação de Distância:** Restrito a segmentos de 100 metros em Ethernet padrão.
*   **Largura de Banda Limitada (vs. Fibra):** Embora suporte altas velocidades, a fibra óptica oferece capacidade de largura de banda muito maior.
*   **Segurança:** Sinais elétricos podem, teoricamente, ser interceptados (embora mais difícil que wireless).

## Seção Expandida: UTP vs. STP

*   **UTP (Não Blindado):**
    *   **Prós:** Mais barato, mais fino, mais flexível, mais fácil de instalar.
    *   **Contras:** Menor imunidade a ruído.
    *   **Uso:** A vasta maioria das instalações de LAN em ambientes de escritório e residenciais.
*   **STP (Blindado):**
    *   **Prós:** Maior imunidade a ruído e EMI, melhor desempenho em altas frequências.
    *   **Contras:** Mais caro, mais grosso, mais rígido, mais difícil de instalar (requer aterramento adequado da blindagem).
    *   **Uso:** Ambientes industrialmente ruidosos, data centers, aplicações de 10 Gbps e superiores (especialmente Cat 7/8), ou onde a proteção extra é necessária.

A escolha entre UTP e STP depende do ambiente de instalação, dos requisitos de desempenho e do orçamento.

## Notas Relacionadas

*   [[Atenuação]]
*   [[Ruído_Impulsivo]]
*   [[Ruído_Branco]]
*   [[Rede_Estrela]] (Topologia usada com par trançado)
*   [[Hub]]
*   [[Switch]]
*   [[Redes_Locais_(LAN)]]
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Guiado]]
*   [[Meio_Físico_Coaxial]] (Comparação)
*   [[Meio_Físico_Fibra_Óptica]] (Comparação)
*   [[Largura_de_Banda]]
