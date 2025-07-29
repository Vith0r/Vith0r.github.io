---
Tema Principal: 56-Modulação por Desvio de Frequência – FSK
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Computadores
tags:
  - Modulação
  - Frequência
  - Digital
  - Telecomunicações
---

# 56-Modulação por Desvio de Frequência – FSK

## Visão Geral

A Modulação por Desvio de Frequência (FSK - Frequency Shift Keying) é uma técnica de modulação digital onde a informação binária (bits 0 e 1) é representada pela variação da frequência de uma onda portadora. Diferente da ASK (que varia a amplitude) e da PSK (que varia a fase), a FSK utiliza duas (ou mais, em variantes MFSK) frequências distintas, próximas à frequência central da portadora, para codificar os dados. Uma frequência (por exemplo, f1) representa o bit 0, e outra frequência (f2) representa o bit 1. A amplitude da portadora geralmente permanece constante. FSK é relativamente simples de implementar e mais robusta a ruído que a ASK, sendo historicamente utilizada em modems de baixa velocidade, sistemas de identificação por rádio e telemetria.

## Definição

Frequency Shift Keying (FSK) é um esquema de modulação em que os dados digitais são transmitidos através de mudanças discretas na frequência da onda portadora. Na forma mais comum, Binary FSK (BFSK), duas frequências distintas são usadas: uma frequência de "marca" (mark frequency, f_m) para representar o bit 1 e uma frequência de "espaço" (space frequency, f_s) para representar o bit 0. O sinal FSK pode ser visto como a soma de duas portadoras ASK ligadas e desligadas alternadamente, ou como o resultado da variação da frequência de um oscilador controlado pela entrada digital.

## Exemplos

1.  **Modems de Baixa Velocidade:** O padrão Bell 103 (300 bps full-duplex) nos EUA usava FSK. Cada direção usava um par diferente de frequências de marca e espaço.
2.  **Identificação de Chamadas (Caller ID):** Alguns sistemas de identificação de chamadas (como o Bell 202) usam FSK para transmitir o número do chamador pela linha telefônica antes do primeiro toque.
3.  **RTTY (Radioteletype):** Radioamadores usam FSK (ou AFSK - Audio FSK) para transmissões de texto RTTY.
4.  **Sistemas de Alarme e Telemetria:** A simplicidade e robustez tornam FSK adequada para alguns sistemas de comunicação sem fio de baixa taxa de dados.
5.  **Protocolo HART:** Usado em automação industrial, sobrepõe sinais FSK em loops de corrente 4-20mA para comunicação digital.

## Características

*   **Modulação de Frequência:** A informação está na frequência da portadora.
*   **Amplitude Constante:** Idealmente, a amplitude não varia, conferindo alguma imunidade a ruído de amplitude.
*   **Frequências Discretas:** Utiliza um conjunto finito de frequências (duas em BFSK).
*   **Simplicidade:** Moduladores e demoduladores FSK são relativamente simples de construir.
*   **Largura de Banda:** A largura de banda necessária depende da separação entre as frequências de marca e espaço e da taxa de bits. Geralmente, FSK é menos eficiente espectralmente que PSK ou QAM.

## Vantagens

*   **Simplicidade de Implementação:** Circuitos moduladores (ex: VCO - Voltage-Controlled Oscillator) e demoduladores (ex: filtros passa-banda, PLL) são relativamente simples e baratos.
*   **Melhor Imunidade a Ruído que ASK:** Por não depender da amplitude para codificar informação, é menos afetada por variações de amplitude causadas por ruído ou fading (desvanecimento).
*   **Não Requer Sincronização de Fase Complexa:** Demoduladores FSK não coerentes são mais simples que os receptores PSK que precisam recuperar a fase da portadora.

## Desvantagens

*   **Baixa Eficiência Espectral:** Utiliza mais largura de banda para transmitir a mesma taxa de bits em comparação com esquemas como PSK e QAM. Isso limita a taxa de dados alcançável em canais com largura de banda restrita.
*   **Taxa de Dados Limitada:** Devido à ineficiência espectral, FSK não é adequada para aplicações de alta velocidade.
*   **Transições de Frequência:** Transições abruptas de frequência podem gerar componentes espectrais indesejados (embora técnicas como Continuous Phase FSK - CPFSK minimizem isso).

## Seção Expandida: FSK Coerente vs. Não Coerente

Existem duas formas principais de demodular FSK:
*   **Demodulação Não Coerente:** É a mais simples. Usa filtros passa-banda sintonizados nas frequências de marca e espaço, seguidos por detectores de envelope. Compara-se a energia na saída dos dois filtros para decidir qual frequência foi enviada. Não requer recuperação da fase da portadora.
*   **Demodulação Coerente:** Requer a recuperação da fase da portadora para cada uma das possíveis frequências. É mais complexa, mas oferece melhor desempenho em termos de taxa de erro de bit (BER) para uma dada relação sinal-ruído (SNR), especialmente em condições de baixo ruído.

**MFSK (Multiple FSK):** É uma extensão que usa mais de duas frequências (M > 2) para representar múltiplos bits por símbolo (N = log2(M)). Aumenta a taxa de bits, mas também a largura de banda e a complexidade.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Baud_e_Bps_–_Bits_por_Segundo]]
*   [[Modems_Analógicos_e_Modems_Digitais]]
*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Amplitude_e_Frequência_AM_e_FM]]
*   [[Modulação_por_Desvio_de_Fase_–_PSK]]
*   [[Modulação_por_Desvio_de_Fase_Diferencial_–_DPSK]]
*   [[Modulação_por_Amplitude_em_Quadratura_(QAM)]]

