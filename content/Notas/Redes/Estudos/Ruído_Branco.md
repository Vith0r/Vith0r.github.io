---
Tema Principal: 24-Ruído Branco
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Processamento de Sinais, Física
tags:
  - Ruído
  - Telecomunicações
---

# 24-Ruído Branco

## Visão Geral

O ruído branco, também conhecido como ruído térmico ou ruído Johnson-Nyquist, é um tipo fundamental de ruído eletrônico presente em praticamente todos os sistemas de comunicação. Sua característica definidora é ter uma densidade espectral de potência (potência por unidade de largura de banda) uniforme em toda a faixa de frequências de interesse. Isso significa que ele contém quantidades iguais de energia em todas as frequências. O nome "branco" é uma analogia à luz branca, que contém todas as cores (frequências) visíveis em intensidades aproximadamente iguais. É um ruído inerente, causado pela agitação térmica aleatória dos elétrons nos condutores e componentes eletrônicos, e estabelece um limite fundamental para a sensibilidade dos receptores e a qualidade da comunicação.

## Definição

Ruído branco é um sinal aleatório cuja densidade espectral de potência é constante dentro de uma determinada largura de banda. Matematicamente, isso implica que sua autocorrelação é uma função delta de Dirac no domínio do tempo (ou seja, o valor do ruído em um instante é completamente não correlacionado com o valor em qualquer outro instante, por menor que seja a diferença). Na prática, o ruído branco verdadeiro (com espectro plano até frequência infinita) não existe, mas o ruído térmico gerado em componentes eletrônicos se aproxima muito dessa definição dentro das faixas de frequência usadas em telecomunicações. A amplitude instantânea do ruído branco geralmente segue uma distribuição de probabilidade Gaussiana (ou Normal).

## Exemplos

1.  **Ruído Térmico em Resistores:** A agitação térmica dos elétrons em um resistor gera uma pequena tensão aleatória em seus terminais, que é um exemplo clássico de ruído branco.
2.  **Ruído em Semicondutores:** Processos aleatórios em transistores e diodos também contribuem para o ruído térmico.
3.  **Ruído de Fundo em Receptores de Rádio/TV:** O "chiado" ouvido em um rádio ou a "neve" vista em uma TV analógica sem sinal sintonizado é, em grande parte, devido ao ruído branco gerado nos primeiros estágios de amplificação do receptor.
4.  **Ruído em Sensores:** Sensores eletrônicos também geram ruído térmico que limita a precisão de suas medições.
5.  **Radiação Cósmica de Fundo:** Embora não seja gerada eletronicamente, a radiação remanescente do Big Bang captada por radiotelescópios tem características espectrais semelhantes ao ruído branco em certas faixas.

## Características

*   **Densidade Espectral Plana:** Potência constante por Hz em toda a faixa de frequência relevante.
*   **Aleatório e Imprevisível:** O valor instantâneo do sinal é aleatório.
*   **Distribuição Gaussiana:** A amplitude do ruído segue uma distribuição normal (curva de sino).
*   **Aditivo:** Geralmente se soma ao sinal desejado (modelo AWGN - Additive White Gaussian Noise).
*   **Inerente:** Presente em todos os condutores e componentes eletrônicos a temperaturas acima do zero absoluto.
*   **Dependente da Temperatura e Largura de Banda:** A potência total do ruído é proporcional à temperatura absoluta (em Kelvin) e à largura de banda do sistema (P = kTB, onde k é a constante de Boltzmann, T é a temperatura e B é a largura de banda).

## Efeitos e Impacto

*   **Limitação Fundamental da Sensibilidade:** Define o nível mínimo de sinal que um receptor pode detectar de forma confiável.
*   **Degradação da Relação Sinal-Ruído (SNR):** A presença constante do ruído branco reduz a SNR, afetando a qualidade do sinal analógico e aumentando a taxa de erro de bit (BER) em sinais digitais.
*   **Impacto em Todas as Frequências:** Por ter um espectro plano, afeta todos os canais e componentes de frequência igualmente dentro da banda.
*   **Base para Análise de Desempenho:** O modelo AWGN é amplamente utilizado na teoria da comunicação para analisar e prever o desempenho de sistemas digitais.
*   **Diferente do Ruído Impulsivo:** É contínuo e estatisticamente previsível, ao contrário do ruído impulsivo que é transiente e irregular.

## Seção Expandida: Ruído Branco vs. Ruído Colorido

Enquanto o ruído branco tem uma densidade espectral plana, outros tipos de ruído, conhecidos coletivamente como "ruído colorido", têm espectros não planos. Alguns exemplos incluem:
*   **Ruído Rosa (Pink Noise):** Sua densidade espectral de potência é inversamente proporcional à frequência (1/f). Tem mais energia em baixas frequências. É frequentemente usado em testes de áudio.
*   **Ruído Marrom (Brownian Noise):** Sua densidade espectral é inversamente proporcional ao quadrado da frequência (1/f²). Tem ainda mais energia em baixas frequências, lembrando o movimento Browniano.
*   **Ruído Azul (Blue Noise):** Sua densidade espectral é diretamente proporcional à frequência (f). Tem mais energia em altas frequências.
*   **Ruído Violeta (Violet Noise):** Sua densidade espectral é proporcional ao quadrado da frequência (f²). Tem ainda mais energia em altas frequências.
Compreender o tipo de ruído dominante em um sistema é importante para projetar filtros e técnicas de mitigação adequadas.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Atenuação]]
*   [[Ruído_Impulsivo]]
*   [[Distorção]]
*   [[Decibel_(Db)]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

