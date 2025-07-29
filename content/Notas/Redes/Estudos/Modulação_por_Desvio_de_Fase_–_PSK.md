---
Tema Principal: "55-Modulação por Desvio de Fase – PSK"
Nível de Dificuldade: "Médio"
Fonte/Referência: "Telecomunicações, Redes de Computadores"
Tags:
  - "Modulação"
  - "PSK"
  - "Fase"
  - "Digital"
  - "Telecomunicações"
---

# 55-Modulação por Desvio de Fase – PSK

## Visão Geral

A Modulação por Desvio de Fase (PSK - Phase Shift Keying) é uma técnica de modulação digital amplamente utilizada onde a informação (bits) é codificada variando a fase de uma onda portadora de frequência constante. Em vez de alterar a amplitude (como em ASK) ou a frequência (como em FSK), a PSK altera o ângulo de fase da portadora para representar diferentes símbolos digitais. Cada símbolo corresponde a um ou mais bits de dados. Por manter a amplitude constante, a PSK é menos suscetível a ruídos baseados em amplitude do que a ASK. Existem várias variantes de PSK, diferindo no número de fases distintas utilizadas, o que impacta diretamente a taxa de bits que pode ser alcançada para uma dada taxa de símbolos (Baud rate).

## Definição

Phase Shift Keying (PSK) é um esquema de modulação digital que transmite dados alterando (modulando) a fase de uma onda portadora de referência. A fase da portadora é deslocada para um de um conjunto discreto de valores pré-definidos. Cada valor de fase representa um símbolo, que por sua vez codifica um ou mais bits. O demodulador no receptor detecta a fase do sinal recebido e a compara com a fase de referência (ou a fase do símbolo anterior, em variantes diferenciais) para determinar qual símbolo foi transmitido e, consequentemente, quais bits foram enviados.

## Exemplos e Tipos Principais

1.  **BPSK (Binary PSK):** A forma mais simples. Usa duas fases separadas por 180° (tipicamente 0° e 180°) para representar os bits 0 e 1. Cada símbolo carrega 1 bit. É robusta, mas espectralmente ineficiente.
2.  **QPSK (Quadrature PSK):** Usa quatro fases separadas por 90° (tipicamente 0°, 90°, 180°, 270° ou 45°, 135°, 225°, 315°). Cada símbolo representa 2 bits (00, 01, 10, 11). Oferece o dobro da taxa de bits do BPSK para a mesma taxa de símbolos, sendo amplamente utilizada (ex: satélite, alguns sistemas Wi-Fi antigos, cabo).
3.  **8-PSK:** Usa oito fases separadas por 45°. Cada símbolo representa 3 bits. Permite maior taxa de bits, mas é mais sensível a ruído e requer maior relação sinal-ruído (SNR) do que QPSK.
4.  **16-PSK:** Usa dezesseis fases. Cada símbolo representa 4 bits. Ainda mais eficiente espectralmente, mas ainda mais sensível a ruído.
5.  **DPSK (Differential PSK):** Uma variante onde a informação é codificada na *diferença* de fase entre símbolos consecutivos, em vez da fase absoluta. Isso simplifica o receptor, pois não requer uma portadora de referência precisa, mas pode ser ligeiramente mais propenso a erros. [[Modulação_por_Desvio_de_Fase_Diferencial_–_DPSK]]

## Características

*   **Modulação de Fase:** A informação está na fase da portadora.
*   **Amplitude Constante:** Idealmente, a amplitude do sinal modulado não varia, tornando-a robusta a distorções de amplitude e permitindo o uso de amplificadores não lineares eficientes.
*   **Número de Fases (M):** Determina o número de bits por símbolo (N = log2(M)).
*   **Eficiência Espectral:** Aumenta com o número de fases (mais bits/símbolo para a mesma taxa de Baud).
*   **Sensibilidade a Ruído:** Aumenta com o número de fases (fases mais próximas são mais difíceis de distinguir na presença de ruído).
*   **Complexidade do Receptor:** Aumenta com o número de fases.

## Vantagens

*   **Boa Imunidade a Ruído (comparado a ASK):** Manter a amplitude constante ajuda a rejeitar ruído baseado em amplitude.
*   **Eficiência Espectral (QPSK e superior):** Permite transmitir mais bits por segundo na mesma largura de banda em comparação com BPSK ou FSK simples.
*   **Amplamente Utilizada:** Tecnologias maduras e bem compreendidas.

## Desvantagens

*   **Sensibilidade a Ruído de Fase (Phase Jitter):** Variações indesejadas na fase do canal ou do oscilador podem causar erros.
*   **Complexidade do Receptor:** Requer circuitos para detectar a fase com precisão (ex: usando Phase-Locked Loops - PLLs ou recuperação de portadora).
*   **Requer Maior SNR para Ordens Superiores:** Esquemas como 8-PSK e 16-PSK exigem um sinal muito mais limpo (maior relação sinal-ruído) do que BPSK ou QPSK para operar com a mesma taxa de erro.
*   **Ambiguidade de Fase:** Em PSK não diferencial, o receptor pode sincronizar com uma fase incorreta (ex: 180° fora), o que pode ser resolvido com codificação diferencial ou outros métodos.

## Seção Expandida: Diagrama de Constelação

As modulações PSK (e QAM) são frequentemente visualizadas usando um **diagrama de constelação**. Este é um gráfico bidimensional onde o eixo horizontal representa a componente em fase (I - In-phase) e o eixo vertical representa a componente em quadratura (Q - Quadrature) do sinal. Cada símbolo possível na modulação é representado por um ponto no diagrama. Para PSK, todos os pontos ficam sobre um círculo de raio constante (amplitude constante), e suas posições angulares correspondem às fases permitidas. Por exemplo:
*   BPSK tem 2 pontos a 180° um do outro.
*   QPSK tem 4 pontos a 90° um do outro.
*   8-PSK tem 8 pontos a 45° um do outro.
A distância entre os pontos no diagrama de constelação está relacionada à robustez da modulação contra ruído. Quanto mais próximos os pontos, mais fácil é para o ruído fazer com que o receptor interprete um símbolo erroneamente como outro.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Baud_e_Bps_–_Bits_por_Segundo]]
*   [[Modems_Analógicos_e_Modems_Digitais]]
*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Amplitude_e_Frequência_AM_e_FM]]
*   [[Modulação_por_Desvio_de_Frequência_–_FSK]]
*   [[Modulação_por_Desvio_de_Fase_Diferencial_–_DPSK]]
*   [[Modulação_por_Amplitude_em_Quadratura_(QAM)]]

