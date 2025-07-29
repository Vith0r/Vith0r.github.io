---
Tema Principal: 57-Modulação por Desvio de Fase Diferencial – DPSK
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Computadores
tags:
  - Modulação
  - PSK
  - Fase
  - Digital
---

# 57-Modulação por Desvio de Fase Diferencial – DPSK

## Visão Geral

A Modulação por Desvio de Fase Diferencial (DPSK - Differential Phase Shift Keying) é uma forma de modulação de fase digital que codifica a informação não na fase absoluta da portadora (como na PSK convencional), mas sim na *mudança* de fase entre símbolos consecutivos. Por exemplo, um bit '1' pode ser representado por uma mudança de fase de 180° em relação ao símbolo anterior, enquanto um bit '0' é representado por nenhuma mudança de fase (0°). A principal vantagem da DPSK é que ela simplifica o receptor, eliminando a necessidade de um circuito complexo e potencialmente problemático para recuperar a fase exata da portadora original (demodulação não coerente ou diferencialmente coerente). No entanto, essa simplificação vem ao custo de uma ligeira degradação no desempenho em relação à taxa de erro de bit comparada à PSK coerente.

## Definição

Differential Phase Shift Keying (DPSK) é uma técnica de modulação digital onde a fase da portadora é deslocada em relação à fase do símbolo transmitido anteriormente para representar os dados. A informação não está no valor absoluto da fase, mas na transição entre as fases de símbolos adjacentes. O demodulador compara a fase do símbolo atual com a do símbolo anterior para determinar qual dado foi enviado. Por exemplo, em DBPSK (Differential Binary PSK), uma mudança de fase de 180° pode codificar um '1', e uma mudança de 0° pode codificar um '0'.

## Exemplos e Tipos Principais

1.  **DBPSK (Differential Binary PSK):** Usa duas mudanças de fase (ex: 0° e 180°) para codificar 1 bit por símbolo. Se o bit atual é 1, a fase muda 180°; se é 0, a fase não muda.
2.  **DQPSK (Differential Quadrature PSK):** Usa quatro mudanças de fase (ex: 0°, 90°, 180°, 270°) para codificar 2 bits por símbolo. A combinação dos dois bits determina qual das quatro mudanças de fase será aplicada em relação ao símbolo anterior.
3.  **D8PSK (Differential 8-PSK):** Usa oito mudanças de fase para codificar 3 bits por símbolo.
4.  **Padrões de Comunicação:** DPSK e suas variantes foram usadas em alguns padrões de modems e sistemas de comunicação sem fio onde a simplicidade do receptor era uma vantagem ou onde a recuperação de portadora coerente era difícil (ex: canais com rápido desvanecimento ou desvio de frequência).

## Características

*   **Codificação Diferencial:** A informação está na mudança de fase entre símbolos.
*   **Demodulação Não Coerente (ou Diferencialmente Coerente):** Não requer um sinal de referência de fase preciso no receptor.
*   **Simplicidade do Receptor:** O demodulador é mais simples do que o de PSK coerente.
*   **Propagação de Erros:** Um erro na detecção da fase de um símbolo pode causar erros na decodificação de dois símbolos consecutivos (o atual e o próximo, pois ambos dependem da transição).
*   **Desempenho de BER:** Ligeiramente pior (tipicamente requer 1-3 dB a mais de SNR para a mesma BER) do que a PSK coerente equivalente.

## Vantagens

*   **Receptor Simplificado:** Elimina a necessidade de circuitos complexos de recuperação de portadora, tornando o receptor mais barato e robusto a certas imperfeições do canal (como desvios lentos de fase).
*   **Robustez a Ambiguidade de Fase:** Resolve inerentemente o problema da ambiguidade de fase (o receptor sincronizar 180° fora) presente na PSK coerente.

## Desvantagens

*   **Pior Desempenho de BER:** Comparada à PSK coerente (BPSK, QPSK), a DPSK (DBPSK, DQPSK) tem uma taxa de erro de bit ligeiramente maior para a mesma relação sinal-ruído (SNR).
*   **Propagação de Erros:** Um único erro de símbolo na detecção de fase geralmente leva a dois erros de bit consecutivos na saída decodificada.

## Seção Expandida: Implementação do Demodulador DPSK

Um demodulador DPSK típico funciona da seguinte forma (para DBPSK):
1.  O sinal recebido é dividido em dois caminhos.
2.  Um caminho atrasa o sinal pelo tempo de duração de um símbolo (T).
3.  O sinal original e o sinal atrasado são então multiplicados em um misturador (mixer).
4.  O resultado da multiplicação passa por um filtro passa-baixas.

A saída do filtro terá uma polaridade (positiva ou negativa) que depende da diferença de fase entre o símbolo atual e o anterior. Se a diferença for 0°, a saída será positiva (representando, por exemplo, bit 0); se a diferença for 180°, a saída será negativa (representando bit 1). Um circuito de decisão compara a saída do filtro com um limiar (geralmente zero) para determinar o bit recebido. Note que este processo não requer conhecimento da fase absoluta da portadora.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Baud_e_Bps_–_Bits_por_Segundo]]
*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Desvio_de_Fase_–_PSK]]
*   [[Modulação_por_Desvio_de_Frequência_–_FSK]]
*   [[Modulação_por_Amplitude_em_Quadratura_(QAM)]]

