---
Tema Principal: 58-Modulação por Amplitude em Quadratura (QAM)
Nível de Dificuldade: Avançado
Fonte/Referência: Telecomunicações, Redes de Computadores, Processamento Digital de Sinais
tags:
  - Modulação
  - Fase
  - Digital
---

# 58-Modulação por Amplitude em Quadratura (QAM)

## Visão Geral

A Modulação por Amplitude em Quadratura (QAM - Quadrature Amplitude Modulation) é uma técnica de modulação digital altamente eficiente que combina duas formas de modulação – Amplitude Shift Keying (ASK) e Phase Shift Keying (PSK) – para transmitir múltiplos bits de dados por símbolo. Em vez de variar apenas a amplitude ou apenas a fase da onda portadora, a QAM varia ambas simultaneamente. Isso permite criar um grande número de estados de sinal distintos (símbolos), cada um representando uma combinação única de bits. QAM é amplamente utilizada em sistemas de comunicação digital que exigem altas taxas de transferência de dados dentro de uma largura de banda limitada, como modems ADSL e a cabo, Wi-Fi (802.11a/g/n/ac/ax), televisão digital e comunicações por micro-ondas.

## Definição

QAM é um esquema de modulação onde dois sinais portadores da mesma frequência, mas defasados em 90° um do outro (em quadratura), são modulados em amplitude independentemente por dois fluxos de dados diferentes e depois somados. Matematicamente, o sinal QAM s(t) pode ser representado como:
`s(t) = I(t) * cos(2πfct) - Q(t) * sin(2πfct)`
Onde:
*   `fc` é a frequência da portadora.
*   `I(t)` (In-phase) é o sinal que modula a portadora cosseno.
*   `Q(t)` (Quadrature) é o sinal que modula a portadora seno.

Os sinais I(t) e Q(t) assumem níveis de amplitude discretos baseados nos bits de entrada. Cada combinação única de níveis de I e Q define um ponto no diagrama de constelação, representando um símbolo que codifica `N = log2(M)` bits, onde `M` é o número total de símbolos (pontos na constelação).

## Exemplos e Tipos Principais

O número antes de QAM indica o número total de símbolos (estados) possíveis:
1.  **4-QAM:** Possui 4 símbolos. É funcionalmente equivalente a QPSK, com 2 bits por símbolo.
2.  **16-QAM:** Possui 16 símbolos distintos, geralmente arranjados em uma grade 4x4 no diagrama de constelação. Cada símbolo representa 4 bits (log2(16)=4). Usado em modems, DVB-C (TV a cabo digital).
3.  **32-QAM:** Possui 32 símbolos, 5 bits por símbolo.
4.  **64-QAM:** Possui 64 símbolos (grade 8x8), 6 bits por símbolo. Usado em Wi-Fi (802.11a/g/n/ac), DVB-C, modems a cabo (DOCSIS).
5.  **128-QAM:** Possui 128 símbolos, 7 bits por símbolo.
6.  **256-QAM:** Possui 256 símbolos (grade 16x16), 8 bits por símbolo. Usado em Wi-Fi (802.11ac/ax), DVB-C/T2, modems a cabo (DOCSIS 3.0/3.1).
7.  **1024-QAM e superior (4096-QAM):** Usados em sistemas mais recentes (Wi-Fi 6/7, DOCSIS 3.1/4.0) para taxas de dados ainda maiores, mas exigem condições de sinal excelentes (alta SNR).

## Características

*   **Modulação Combinada:** Varia tanto a amplitude quanto a fase da portadora.
*   **Alta Eficiência Espectral:** Permite transmitir muitos bits por símbolo, resultando em altas taxas de dados na mesma largura de banda comparada a ASK, FSK ou PSK de baixa ordem.
*   **Diagrama de Constelação:** Representado por uma grade de pontos no plano I/Q.
*   **Sensibilidade a Ruído:** Ordens mais altas de QAM (mais pontos na constelação) são mais sensíveis a ruído e distorção, pois os pontos ficam mais próximos.
*   **Complexidade:** Requer transmissores e receptores mais complexos do que esquemas mais simples.

## Vantagens

*   **Altíssima Eficiência Espectral:** A principal vantagem. Permite taxas de dados muito elevadas em canais com largura de banda limitada.
*   **Flexibilidade:** Diferentes ordens de QAM podem ser usadas para se adaptar às condições do canal (maior ordem com bom sinal, menor ordem com sinal ruim - modulação adaptativa).

## Desvantagens

*   **Maior Sensibilidade a Ruído e Distorção:** Conforme a ordem QAM aumenta, a distância entre os pontos da constelação diminui, tornando o sistema mais suscetível a erros causados por ruído, interferência e distorções de fase e amplitude.
*   **Requer Alta Relação Sinal-Ruído (SNR):** Ordens elevadas de QAM só funcionam bem em canais com alta SNR.
*   **Complexidade do Transmissor/Receptor:** Requer circuitos mais precisos e complexos para gerar e demodular os sinais, incluindo equalização de canal e recuperação de portadora e temporização robustas.

## Seção Expandida: Diagrama de Constelação QAM

O diagrama de constelação QAM mostra os possíveis estados do sinal como pontos em um plano bidimensional I/Q. Diferente da PSK onde todos os pontos estão em um círculo, na QAM os pontos formam uma grade (geralmente quadrada ou retangular).
*   **16-QAM:** Uma grade 4x4 com 16 pontos. Cada ponto representa 4 bits. Existem diferentes níveis de amplitude e fase.
*   **64-QAM:** Uma grade 8x8 com 64 pontos. Cada ponto representa 6 bits.
*   **256-QAM:** Uma grade 16x16 com 256 pontos. Cada ponto representa 8 bits.

A distância entre os pontos adjacentes determina a robustez contra ruído. Em ordens QAM mais altas, os pontos estão muito mais próximos, exigindo um sinal muito limpo para que o receptor possa distinguir corretamente qual ponto (símbolo) foi transmitido.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Baud_e_Bps_–_Bits_por_Segundo]]
*   [[Modems_Analógicos_e_Modems_Digitais]]
*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Amplitude_e_Frequência_AM_e_FM]] (Conceito de modulação de amplitude)
*   [[Modulação_por_Desvio_de_Fase_–_PSK]] (Conceito de modulação de fase)
*   [[Modulação_por_Desvio_de_Frequência_–_FSK]]
*   [[Modulação_por_Desvio_de_Fase_Diferencial_–_DPSK]]
