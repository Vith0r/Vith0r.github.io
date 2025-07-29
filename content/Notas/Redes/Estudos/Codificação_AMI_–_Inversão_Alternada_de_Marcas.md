---
Tema Principal: 59-Codificação AMI – Inversão Alternada de Marcas
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Codificação de Linha, Redes Digitais
tags:
  - Codificação
  - Linha
  - Digital
---

# 59-Codificação AMI – Inversão Alternada de Marcas

## Visão Geral

A Codificação AMI (Alternate Mark Inversion), também conhecida como codificação bipolar, é um tipo de código de linha usado para transmitir dados digitais em sistemas de telecomunicações, particularmente em linhas T1/E1 mais antigas. Pertence à categoria de códigos de retorno a zero (RZ) ou não retorno a zero (NRZ) modificados. A ideia principal da AMI é representar os bits '0' por um nível de tensão zero e os bits '1' (marcas) por níveis de tensão alternados, positivo e negativo. Ou seja, o primeiro '1' é representado por um pulso positivo, o segundo '1' por um pulso negativo, o terceiro '1' por um positivo novamente, e assim por diante. Esta alternância introduz características benéficas como a ausência de componente DC (corrente contínua) e a capacidade inerente de detecção de alguns erros.

## Definição

Alternate Mark Inversion (AMI) é um código de linha síncrono que usa três níveis de tensão: zero, positivo (+V) e negativo (-V). 
*   Um bit '0' é sempre representado por um nível de tensão zero (ausência de pulso).
*   Um bit '1' (marca) é representado por um pulso de tensão (geralmente com 50% de ciclo de trabalho, ou seja, ocupando metade do intervalo do bit), alternando a polaridade a cada ocorrência. Se o último '1' foi +V, o próximo '1' será -V, e vice-versa.

## Exemplos

*   **Linhas T1 (DS1):** O padrão original para linhas T1 (1.544 Mbps) nos EUA utilizava codificação AMI. No entanto, longas sequências de zeros podiam causar perda de sincronismo.
*   **Linhas E1 (CEPT):** O padrão europeu E1 (2.048 Mbps) também utilizou AMI inicialmente, mas rapidamente adotou códigos mais robustos como HDB3 para resolver o problema das sequências de zeros.
*   **ISDN PRI (Primary Rate Interface):** A interface física para ISDN PRI (baseada em T1 ou E1) também utiliza codificações baseadas em AMI (como B8ZS ou HDB3).

**Exemplo de Codificação:**
Sequência de bits: `0 1 0 0 1 1 0 1`
Sinal AMI: `0 +V 0 0 -V +V 0 -V`

## Características

*   **Três Níveis (Ternário):** Usa +V, -V e 0V.
*   **Sem Componente DC:** A alternância de polaridade dos pulsos '1' garante que, em média, não haja componente de corrente contínua no sinal, o que é importante para passar por transformadores e acoplamentos AC em equipamentos de linha.
*   **Densidade de Pulsos:** A energia do sinal está concentrada em frequências mais baixas do que códigos como Manchester, mas a ausência de transições durante longas sequências de '0's dificulta a recuperação do clock.
*   **Detecção de Erros Inerente:** Se dois pulsos '1' consecutivos com a mesma polaridade forem recebidos, isso indica uma violação da regra de alternância (Bipolar Violation - BPV), sinalizando um erro de bit.
*   **Problema com Zeros Consecutivos:** Longas sequências de '0's não geram transições no sinal, dificultando a manutenção do sincronismo de clock no receptor. Isso levou ao desenvolvimento de códigos como B8ZS e HDB3, que substituem sequências de zeros por padrões específicos que incluem violações bipolares deliberadas para manter o clock.

## Vantagens

*   **Sem Componente DC:** Facilita o acoplamento através de transformadores e evita problemas de linha.
*   **Detecção Simples de Erros:** Violações bipolares (BPVs) são fáceis de detectar e indicam erros com alta probabilidade.
*   **Menor Largura de Banda (vs. Manchester):** Comparado a códigos como Manchester, que têm uma transição por bit, AMI pode usar menos largura de banda.
*   **Simplicidade:** Relativamente simples de implementar.

## Desvantagens

*   **Perda de Sincronismo com Zeros Longos:** A principal desvantagem. O receptor pode perder o sincronismo de clock se não houver transições suficientes (pulsos '1').
*   **Não Garante Sincronismo:** Diferente de códigos como Manchester, AMI não garante uma transição em cada intervalo de bit.
*   **Superada por Códigos Melhores:** Códigos como B8ZS (Bipolar with 8-Zero Substitution) e HDB3 (High-Density Bipolar 3-zero) foram desenvolvidos para resolver o problema dos zeros longos, mantendo os benefícios da AMI, e a substituíram na maioria das aplicações T1/E1.

## Seção Expandida: B8ZS e HDB3

Para resolver o problema das sequências de zeros em AMI, foram criados códigos de substituição:
*   **B8ZS (Usado na América do Norte - T1):** Quando uma sequência de 8 zeros consecutivos ocorre, ela é substituída por um padrão especial: `000VB0VB`. O 'V' representa uma Violação Bipolar (um pulso '1' com a mesma polaridade do pulso '1' anterior), e 'B' representa um pulso '1' Bipolar (com polaridade oposta ao 'V' anterior). O receptor reconhece esse padrão com duas violações e o substitui de volta por 8 zeros.
*   **HDB3 (Usado na Europa e resto do mundo - E1):** Quando uma sequência de 4 zeros consecutivos ocorre, ela é substituída por `000V` ou `B00V`. A escolha entre os dois padrões é feita para garantir que violações consecutivas ('V') sejam separadas por um número ímpar de pulsos bipolares ('B'), mantendo o balanço DC. O receptor detecta o padrão `000V` ou `B00V` e o substitui por 4 zeros.
Esses códigos garantem transições suficientes para manter o sincronismo, mesmo com longas sequências de zeros nos dados originais.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Modems_Analógicos_e_Modems_Digitais]] (Contexto de linhas digitais)

