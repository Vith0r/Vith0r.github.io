---
Tema Principal: 54-Modulação por Amplitude e Frequência AM e FM
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Eletrônica, Radiodifusão
tags:
  - Modulação
  - Analógico
  - Rádio
---

# 54-Modulação por Amplitude e Frequência AM e FM

## Visão Geral

Modulação em Amplitude (AM) e Modulação em Frequência (FM) são duas das técnicas fundamentais e mais conhecidas de modulação analógica, usadas para imprimir um sinal de informação (como áudio) em uma onda portadora de rádio frequência para transmissão. Em **AM**, a amplitude da onda portadora é variada de acordo com a amplitude do sinal de informação, enquanto sua frequência e fase permanecem constantes. Em **FM**, a frequência instantânea da onda portadora é variada de acordo com a amplitude do sinal de informação, enquanto sua amplitude permanece constante. Ambas foram cruciais para o desenvolvimento da radiodifusão e outras formas de comunicação sem fio, cada uma com suas próprias vantagens e desvantagens em termos de qualidade de áudio, resistência a ruído e largura de banda ocupada.

## Definição

*   **Modulação em Amplitude (AM - Amplitude Modulation):** Um processo onde a amplitude de uma onda portadora de alta frequência é alterada em proporção direta à amplitude instantânea do sinal modulante (informação). A frequência e a fase da portadora não são alteradas pelo sinal modulante.
*   **Modulação em Frequência (FM - Frequency Modulation):** Um processo onde a frequência instantânea de uma onda portadora de alta frequência é alterada (desviada de sua frequência central) em proporção direta à amplitude instantânea do sinal modulante. A amplitude da portadora permanece constante.

## Exemplos

*   **AM:**
    *   Radiodifusão AM (Ondas Longas, Médias, Curtas): Estações de rádio AM tradicionais.
    *   Comunicações Aeronáuticas (VHF AM): Usado para comunicação por voz entre aeronaves e controle de tráfego aéreo.
    *   Modulação QAM (em parte): Técnicas digitais como QAM ([[Modulação_por_Amplitude_em_Quadratura_(QAM)]]) modulam tanto a amplitude quanto a fase.
*   **FM:**
    *   Radiodifusão FM (VHF): Estações de rádio FM estéreo de alta fidelidade (88-108 MHz).
    *   Som de TV Analógica:** O áudio em sistemas de TV analógicos (como NTSC, PAL) era frequentemente transmitido usando FM.
    *   Rádios Bidirecionais (Walkie-talkies, Rádio Amador, Serviços de Emergência): FM é comumente usado para comunicação de voz móvel devido à sua robustez.
    *   Modems de Baixa Velocidade (FSK): Frequency Shift Keying ([[Modulação_por_Desvio_de_Frequência_–_FSK]]) é uma forma digital de FM.

## Características

**AM:**
*   Variação da Amplitude da Portadora.
*   Frequência e Fase Constantes (idealmente).
*   Espectro: Portadora + Banda Lateral Superior (USB) + Banda Lateral Inferior (LSB).
*   Largura de Banda: Aproximadamente 2x a largura de banda do sinal modulante.
*   Demodulação Simples (Detector de Envelope).
*   Suscetível a Ruído (ruído afeta a amplitude).

**FM:**
*   Variação da Frequência da Portadora.
*   Amplitude Constante (idealmente).
*   Espectro: Mais complexo, com múltiplas bandas laterais (teoricamente infinitas, mas na prática limitadas).
*   Largura de Banda: Geralmente muito maior que AM (Regra de Carson: BW ≈ 2 * (Δf + fm), onde Δf é o desvio máximo de frequência e fm é a frequência máxima do sinal modulante).
*   Demodulação Mais Complexa (Discriminador de Frequência, PLL).
*   Mais Resistente a Ruído (ruído de amplitude é rejeitado).

## Vantagens

*   **AM:**
    *   Simplicidade do Receptor (Demodulador barato).
    *   Menor Largura de Banda (permite mais canais em uma faixa de frequência).
    *   Propagação de Longa Distância (especialmente em ondas médias e curtas).
*   **FM:**
    *   Maior Fidelidade de Áudio (devido à maior largura de banda).
    *   Melhor Imunidade a Ruído e Interferência (efeito de captura).
    *   Eficiência de Potência (amplitude constante permite que o transmissor opere em potência máxima o tempo todo).

## Desvantagens

*   **AM:**
    *   Baixa Qualidade de Áudio (largura de banda limitada).
    *   Alta Suscetibilidade a Ruído (estática, interferência elétrica).
    *   Ineficiência de Potência (maior parte da potência está na portadora, não nas bandas laterais que carregam a informação).
*   **FM:**
    *   Maior Largura de Banda Ocupada (limita o número de canais).
    *   Receptores Mais Complexos e Caros.
    *   Alcance mais limitado (geralmente opera em VHF/UHF, propagação em linha de visada).
    *   Efeito Limiar (Threshold Effect): Abaixo de um certo nível de sinal-ruído, a qualidade degrada rapidamente.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Atenuação]]
*   [[Ruído_Branco]]
*   [[Multiplexação]] (FDM)
*   [[Baud_e_Bps_–_Bits_por_Segundo]]
*   [[Modems_Analógicos_e_Modems_Digitais]]
*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Desvio_de_Fase_–_PSK]]
*   [[Modulação_por_Desvio_de_Frequência_–_FSK]]
*   [[Modulação_por_Amplitude_em_Quadratura_(QAM)]]

