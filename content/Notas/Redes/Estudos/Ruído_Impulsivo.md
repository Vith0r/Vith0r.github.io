---
Tema Principal: 22-Ruído Impulsivo
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Computadores
tags:
  - Ruído
  - Transmissão
  - Erro
  - Telecomunicações
---

# 22-Ruído Impulsivo

---

![[9.svg]]

---
## Visão Geral

O ruído impulsivo é um tipo de perturbação significativa em sistemas de comunicação, caracterizado por picos de energia de curta duração e alta amplitude que ocorrem de forma irregular. Diferente do ruído térmico (ou ruído branco), que é contínuo e previsível estatisticamente, o ruído impulsivo é transiente e muitas vezes causado por fontes externas. Sua natureza abrupta e energética o torna particularmente prejudicial para a transmissão de dados digitais, pois um único impulso pode corromper vários bits consecutivos, levando a erros em rajada (burst errors).

## Definição

Ruído impulsivo consiste em pulsos ou picos de energia eletromagnética de curta duração e amplitude significativamente maior que o nível médio de ruído de fundo. Esses pulsos são irregulares no tempo e na amplitude, tornando-os difíceis de prever ou modelar usando distribuições estatísticas simples como a Gaussiana (usada para ruído térmico). Ele é frequentemente causado por eventos eletromagnéticos discretos no ambiente ou falhas no próprio sistema de comunicação.

## Exemplos

1.  **Descargas Atmosféricas (Raios):** Podem induzir picos de tensão significativos em linhas de transmissão aéreas ou mesmo em cabos enterrados e afetar transmissões de rádio.
2.  **Comutação de Cargas Elétricas:** Ligar ou desligar motores elétricos, relés, lâmpadas fluorescentes ou outros equipamentos de alta potência pode gerar transientes elétricos que se propagam pelas linhas de energia e de comunicação.
3.  **Falhas em Componentes:** Contatos elétricos defeituosos, arcos voltaicos em interruptores ou conectores podem gerar ruído impulsivo.
4.  **Interferência Automotiva:** Sistemas de ignição de veículos podem gerar pulsos de rádio frequência.
5.  **Diafonia (Crosstalk) de Sinais Pulsados:** Sinais de alta energia em pares de cabos adjacentes podem induzir pulsos em um par vizinho.

## Características

*   **Curta Duração:** Os pulsos individuais são tipicamente muito breves (microssegundos a milissegundos).
*   **Alta Amplitude:** A potência instantânea durante um pulso pode ser muito maior que a do sinal ou do ruído de fundo.
*   **Irregularidade:** Ocorrem em momentos imprevisíveis.
*   **Distribuição Não-Gaussiana:** Sua natureza esporádica e de alta amplitude não segue a distribuição normal.
*   **Causa Erros em Rajada (Burst Errors):** Em transmissão serial, um único pulso pode afetar vários bits transmitidos sequencialmente durante sua ocorrência.

## Efeitos e Impacto

*   **Corrupção de Dados:** É uma das principais causas de erros em sistemas de comunicação digital, especialmente em meios propensos a interferências externas (como linhas telefônicas de par trançado usadas para DSL).
*   **Degradação da Relação Sinal-Ruído (SNR) Instantânea:** Durante o pulso, a SNR pode cair drasticamente, tornando a detecção do sinal impossível.
*   **Dificuldade de Mitigação:** Sua natureza imprevisível torna difícil cancelá-lo completamente.
*   **Necessidade de Códigos de Correção Robustos:** Exige o uso de técnicas de detecção e correção de erros capazes de lidar com erros em rajada, não apenas erros aleatórios de bits individuais.

## Seção Expandida: Ruído Impulsivo e Erros em Rajada

A principal consequência do ruído impulsivo em sistemas digitais é a ocorrência de erros em rajada (burst errors). Como os bits são transmitidos serialmente um após o outro, um pulso de ruído que dura o tempo suficiente para abranger, digamos, 5 bits, pode potencialmente corromper todos esses 5 bits. Isso contrasta com o ruído térmico, que tende a causar erros de bits individuais e aleatórios. A ocorrência de erros em rajada tem implicações significativas no projeto de sistemas de correção de erros. Códigos simples, como a paridade, são ineficazes contra rajadas. Códigos mais poderosos, como os códigos Reed-Solomon ou códigos convolucionais combinados com intercalação (interleaving), são frequentemente empregados. A intercalação funciona rearranjando a ordem dos bits antes da transmissão e revertendo-a na recepção. Isso espalha os bits de uma rajada de erro, fazendo com que pareçam erros de bits individuais para o decodificador, que pode então corrigi-los de forma mais eficaz.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Atenuação]]
*   [[Distorção]]
*   [[Ruído_Branco]]
*   [[Decibel_(Db)]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Geradores_de_Erros]]
*   [[Método_Par_e_Ímpar_(Paridade)]]
*   [[Método_Cyclic_Redundancy_Checking_(CRC)]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]