---
Tema Principal: 51-Baud e Bps – Bits por Segundo
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Computadores
tags:
  - Transferência
  - Modulação
---

# 51-Baud e Bps – Bits por Segundo

## Visão Geral

Baud e Bps (Bits por Segundo) são duas unidades de medida frequentemente confundidas, mas que representam conceitos distintos na transmissão de dados. Ambas se referem à velocidade de comunicação, mas de maneiras diferentes. **Baud** mede a taxa de símbolos, ou seja, quantas vezes o estado do sinal na linha de comunicação muda por segundo. **Bps**, por outro lado, mede a taxa de bits, ou seja, quantos bits de dados são efetivamente transmitidos por segundo. Em sistemas de modulação simples, onde cada mudança de sinal (símbolo) representa um único bit, as taxas de Baud e Bps são iguais. No entanto, com técnicas de modulação mais avançadas, um único símbolo pode representar múltiplos bits, fazendo com que a taxa de Bps seja maior que a taxa de Baud. Compreender essa diferença é crucial para analisar a eficiência das técnicas de modulação e a capacidade real de um canal de comunicação.

## Definição

*   **Baud Rate (Taxa de Baud):** Refere-se ao número de unidades de sinalização distintas, ou símbolos, transmitidos por segundo através de um canal de comunicação. Um símbolo é uma mudança significativa no sinal (por exemplo, uma mudança de voltagem, frequência ou fase). A unidade é Baud (Bd).
*   **Bit Rate (Taxa de Bits) ou Bps (Bits por Segundo):** Refere-se ao número total de bits de informação transmitidos por segundo. A unidade é bits por segundo (bps ou b/s).

A relação entre eles é dada por:
`Bit Rate (Bps) = Baud Rate (Bd) * N`
Onde `N` é o número de bits representados por cada símbolo. `N = log2(M)`, sendo `M` o número de símbolos distintos possíveis na técnica de modulação utilizada.

## Exemplos

1.  **Modulação Simples (ex: NRZ):** Se usamos uma codificação onde +5V representa '1' e -5V representa '0', cada mudança de voltagem (símbolo) carrega 1 bit. Se a taxa de símbolos for 9600 Baud, a taxa de bits também será 9600 Bps (N=1).
2.  **Modulação QPSK (Quadrature Phase Shift Keying):** Nesta técnica, cada símbolo (uma combinação específica de fase e amplitude) representa 2 bits (M=4, N=log2(4)=2). Se a taxa de símbolos for 2400 Baud, a taxa de bits será 2400 * 2 = 4800 Bps.
3.  **Modulação 256-QAM (Quadrature Amplitude Modulation):** Aqui, cada símbolo representa 8 bits (M=256, N=log2(256)=8). Se a taxa de símbolos for 6 Mbaud (MegaBaud), a taxa de bits será 6 * 8 = 48 Mbps (Megabits por segundo). Isso é comum em modems a cabo e Wi-Fi.
4.  **Modems Dial-up Antigos:** Um modem V.22bis operava a 600 Baud, mas usava uma modulação (QAM-16, M=16, N=4, embora na prática fosse um pouco diferente) para atingir 2400 Bps (600 * 4). Modems V.32 operavam a 2400 Baud para atingir 9600 Bps (N=4).

## Características

*   **Baud:** Mede a velocidade de mudança do sinal (símbolos/segundo).
*   **Bps:** Mede a velocidade de transferência de informação (bits/segundo).
*   **Relação:** Bps ≥ Baud.
*   **Dependência da Modulação:** A relação Bps/Baud depende diretamente da eficiência da técnica de modulação (quantos bits por símbolo).
*   **Limites Físicos:** A taxa de Baud é limitada pelas características físicas do canal (largura de banda), enquanto a taxa de Bps pode ser aumentada usando modulações mais complexas (até o limite de Shannon).

## Vantagens (de Entender a Diferença)

*   **Análise de Eficiência:** Permite comparar a eficiência de diferentes esquemas de modulação (quantos Bps se consegue por Baud).
*   **Compreensão de Limites:** Ajuda a entender como as limitações de largura de banda do canal (que restringem a taxa de Baud) impactam a taxa de bits alcançável.
*   **Evitar Confusão:** Clarifica especificações técnicas de equipamentos de comunicação.

## Desvantagens (da Confusão entre os Termos)

*   **Interpretação Errada:** Usar os termos como sinônimos pode levar a uma compreensão incorreta da capacidade de um sistema.
*   **Marketing Enganoso:** Às vezes, taxas de Baud podem ser citadas de forma a parecerem mais impressionantes do que a taxa de bits real (embora o contrário seja mais comum hoje, com Bps sendo a medida principal).

## Seção Expandida: Limite de Nyquist e Limite de Shannon

A taxa máxima de Baud que um canal pode suportar está relacionada à sua largura de banda (W) pelo **Teorema de Nyquist para Canais sem Ruído**: `Taxa Máxima de Símbolos (Baud) = 2 * W`. Isso significa que, mesmo em um canal perfeito, a velocidade com que podemos mudar o sinal é limitada pela largura de banda.

Para aumentar a taxa de bits (Bps) além de 2W, precisamos fazer com que cada símbolo carregue mais bits (aumentar N), usando modulações mais complexas. No entanto, canais reais têm ruído. O **Teorema de Shannon-Hartley** define a capacidade máxima teórica do canal (C, em Bps) em um canal com ruído:
`C = W * log2(1 + S/N)`
Onde W é a largura de banda e S/N é a Relação Sinal-Ruído (Signal-to-Noise Ratio). Este teorema mostra que tanto a largura de banda (que limita Baud) quanto a relação sinal-ruído (que limita quantos bits por símbolo podemos distinguir confiavelmente) determinam a taxa de bits máxima alcançável.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Modems_Analógicos_e_Modems_Digitais]]
*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Amplitude_e_Frequência_AM_e_FM]]
*   [[Modulação_por_Desvio_de_Fase_–_PSK]]
*   [[Modulação_por_Desvio_de_Frequência_–_FSK]]
*   [[Modulação_por_Amplitude_em_Quadratura_(QAM)]]

