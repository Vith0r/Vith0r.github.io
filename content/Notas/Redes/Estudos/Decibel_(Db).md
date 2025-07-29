---
Tema Principal: 26-Decibel (Db)
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Física (Acústica), Engenharia Elétrica
tags:
  - Medição
  - Sinal
  - Telecomunicações
---

# 26-Decibel (Db)

## Visão Geral

O decibel (dB) é uma unidade logarítmica fundamental usada para expressar a razão entre duas quantidades físicas, geralmente potências ou intensidades. Em vez de lidar com números muito grandes ou muito pequenos em uma escala linear, o decibel utiliza uma escala logarítmica (base 10) que comprime essa faixa, tornando a representação e os cálculos mais convenientes. É amplamente utilizado em diversas áreas da ciência e engenharia, especialmente em acústica (para medir níveis de intensidade sonora), eletrônica e telecomunicações (para medir ganhos de amplificadores, perdas em cabos - atenuação, e a relação sinal-ruído - SNR). Compreender o decibel é essencial para analisar o desempenho de sistemas de comunicação e interpretar especificações técnicas.

## Definição

O decibel é definido com base no Bel (B), embora o Bel seja raramente usado na prática. Um Bel representa uma razão de potência de 10:1. O decibel é um décimo de um Bel (deci-Bel).

A definição para **potências** (P1 e P2) é:
`dB = 10 * log10(P2 / P1)`

A definição para **amplitudes** (como tensão V ou corrente I), assumindo que as impedâncias são as mesmas, deriva da relação P = V²/R ou P = I²R. Como o logaritmo de um quadrado é duas vezes o logaritmo da base, a fórmula se torna:
`dB = 20 * log10(A2 / A1)` (onde A é a amplitude, como tensão ou pressão sonora)

O decibel expressa uma **razão**, portanto, requer um valor de referência (P1 ou A1). Frequentemente, são usadas referências padronizadas, indicadas por um sufixo:
*   **dBm:** Potência relativa a 1 miliwatt (mW). 0 dBm = 1 mW.
*   **dBW:** Potência relativa a 1 watt (W). 0 dBW = 1 W = 30 dBm.
*   **dBi:** Ganho de uma antena relativo a uma antena isotrópica ideal.
*   **dBd:** Ganho de uma antena relativo a uma antena dipolo de meia onda.
*   **dBFS:** Nível de sinal digital relativo à escala completa (Full Scale).
*   **dBSPL:** Nível de pressão sonora (Sound Pressure Level) relativo a 20 micropascals (limiar da audição humana).

## Exemplos

*   **Ganho de 3 dB:** Corresponde a dobrar a potência (10 * log10(2) ≈ 3.01 dB).
*   **Perda de 3 dB:** Corresponde a reduzir a potência pela metade (10 * log10(0.5) ≈ -3.01 dB).
*   **Ganho de 10 dB:** Corresponde a multiplicar a potência por 10.
*   **Perda de 10 dB:** Corresponde a dividir a potência por 10.
*   **Ganho de 20 dB:** Corresponde a multiplicar a potência por 100 (ou a amplitude por 10).
*   **Relação Sinal-Ruído (SNR):** Se a potência do sinal é 100 vezes maior que a potência do ruído, a SNR é de 20 dB (10 * log10(100)).
*   **Atenuação de Cabo:** Um cabo pode ter uma especificação de atenuação de 0.5 dB por metro a uma certa frequência.

## Características

*   **Logarítmico:** Baseado no logaritmo de base 10.
*   **Relativo:** Expressa uma razão entre duas quantidades ou entre uma quantidade e uma referência padrão.
*   **Aditivo para Ganhos/Perdas em Cascata:** Ganhos e perdas expressos em dB podem ser simplesmente somados ou subtraídos ao longo de uma cadeia de componentes (ex: Ganho Amplificador (dB) - Perda Cabo (dB) = Ganho Líquido (dB)).
*   **Compressão de Escala:** Representa faixas muito amplas de valores de forma mais compacta.
*   **Adimensional (quando expressa razão pura):** O dB em si é adimensional, mas sufixos (dBm, dBW) indicam a referência e dão uma dimensão.

## Vantagens

*   **Conveniência:** Simplifica cálculos envolvendo multiplicação e divisão de razões (transforma em soma e subtração).
*   **Representação de Grandes Faixas:** Permite visualizar e comparar facilmente valores que variam por muitas ordens de magnitude.
*   **Relação com Percepção Humana:** A percepção humana de intensidade (som, luz) é aproximadamente logarítmica, tornando o dB uma unidade intuitiva em acústica.
*   **Padronização:** O uso de referências padrão (dBm, etc.) facilita a comparação de especificações.

## Desvantagens

*   **Menos Intuitivo Inicialmente:** A natureza logarítmica pode ser confusa para quem não está familiarizado.
*   **Requer Referência:** O valor em dB só tem significado absoluto se a referência for conhecida ou implícita.
*   **Não Pode Ser Usado Diretamente em Somas de Potências:** Para somar potências de sinais diferentes, é preciso convertê-las de dBm/dBW para unidades lineares (mW/W), somá-las e depois converter o resultado de volta para dBm/dBW, se necessário.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Atenuação]]
*   [[Ruído_Impulsivo]]
*   [[Distorção]]
*   [[Ruído_Branco]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

