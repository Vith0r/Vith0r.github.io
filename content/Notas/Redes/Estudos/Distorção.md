---
Tema Principal: 23-Distorção
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Processamento de Sinais, Redes de Computadores
tags:
  - Sinal
  - Transmissão
  - Erro
  - Telecomunicações
---

# 23-Distorção

---

![[10.svg]]

---

## Visão Geral

A distorção, em sistemas de comunicação, refere-se a qualquer alteração indesejada na forma de onda de um sinal entre o ponto de transmissão e o ponto de recepção, que não seja uma simples atenuação (perda de amplitude) ou adição de ruído. Ela ocorre quando diferentes componentes do sinal (por exemplo, diferentes frequências ou diferentes níveis de amplitude) são afetados de maneira desigual pelo meio de transmissão ou pelos equipamentos do sistema (amplificadores, filtros). A distorção altera a forma original do sinal, o que pode levar à perda de informação, dificuldade na interpretação correta dos dados pelo receptor e aumento da taxa de erros, especialmente em sinais complexos ou de alta frequência.

## Definição

Distorção é a alteração da forma de onda de um sinal que ocorre durante sua transmissão ou processamento. Isso significa que o sinal recebido não é uma réplica exata do sinal transmitido, mesmo que sua amplitude geral seja corrigida e o ruído seja ignorado. A distorção pode se manifestar de várias formas, incluindo distorção de amplitude, distorção de frequência (ou de fase/atraso) e distorção não linear.

## Tipos e Exemplos

1.  **Distorção de Amplitude (ou de Ganho):** Ocorre quando diferentes níveis de amplitude do sinal são amplificados ou atenuados de forma desigual. Por exemplo, um amplificador que comprime (satura) os picos do sinal introduz distorção de amplitude. Isso pode acontecer em amplificadores operando perto de seus limites.
2.  **Distorção de Frequência:** Ocorre quando diferentes componentes de frequência de um sinal complexo são atenuados ou amplificados de forma diferente pelo meio ou sistema. Por exemplo, um cabo que atenua mais as altas frequências do que as baixas frequências introduz distorção de frequência, alterando o timbre de um sinal de áudio ou arredondando as bordas de um pulso digital.
3.  **Distorção de Fase (ou de Atraso):** Ocorre quando diferentes componentes de frequência de um sinal sofrem atrasos de tempo diferentes ao passar pelo meio ou sistema. Isso altera a relação de fase entre as diferentes frequências, deformando a forma de onda composta. É uma causa significativa de Interferência Intersimbólica (ISI) em sinais digitais, onde a energia de um bit "vaza" para o intervalo de tempo do bit seguinte.
4.  **Distorção Harmônica:** Um tipo de distorção não linear onde o sistema gera frequências que são múltiplos inteiros (harmônicos) das frequências presentes no sinal original. Comum em amplificadores de áudio de baixa qualidade.
5.  **Distorção de Intermodulação (IMD):** Outro tipo de distorção não linear onde o sistema gera novas frequências que são somas e diferenças das frequências presentes no sinal original. Particularmente problemática quando múltiplos sinais compartilham o mesmo canal não linear.

## Características

*   **Alteração da Forma de Onda:** A característica definidora é a mudança na forma do sinal.
*   **Dependência da Frequência/Amplitude:** Muitas formas de distorção dependem das características (frequência, amplitude) do próprio sinal.
*   **Causada pelo Sistema/Meio:** É uma propriedade intrínseca do canal de comunicação ou dos componentes eletrônicos.
*   **Diferente de Ruído:** Ruído é um sinal indesejado adicionado, enquanto distorção é uma alteração do sinal desejado.
*   **Impacto Cumulativo:** A distorção pode se acumular à medida que o sinal passa por múltiplos estágios de processamento ou longas distâncias.

## Efeitos e Impacto

*   **Degradação da Qualidade:** Reduz a fidelidade de sinais analógicos (áudio, vídeo).
*   **Aumento da Taxa de Erro de Bit (BER):** Em sinais digitais, a distorção (especialmente a de atraso, causando ISI) dificulta a decisão correta do receptor sobre qual bit foi transmitido, aumentando os erros.
*   **Limitação da Taxa de Transferência:** A ISI causada pela distorção limita a velocidade máxima em que os bits podem ser enviados sem que interfiram uns nos outros.
*   **Necessidade de Equalização:** Exige o uso de circuitos ou algoritmos equalizadores no receptor para tentar compensar os efeitos da distorção introduzida pelo canal.

## Seção Expandida: Equalização

Como a distorção (especialmente de frequência e fase) é frequentemente causada pelas características previsíveis do canal de transmissão, é possível tentar revertê-la no receptor usando um equalizador. Um equalizador é essencialmente um filtro projetado para ter características de frequência e fase opostas às do canal. Por exemplo, se o canal atenua mais as altas frequências, o equalizador as amplificará mais. Se o canal atrasa mais certas frequências, o equalizador tentará compensar esses atrasos. Equalizadores podem ser fixos (projetados para um canal específico) ou adaptativos (capazes de ajustar seus parâmetros dinamicamente com base em sinais de treinamento ou nas características do sinal recebido). A equalização é uma técnica fundamental em modems de alta velocidade, DSL, Wi-Fi e comunicações por fibra óptica para combater a distorção e permitir taxas de dados mais altas.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Atenuação]]
*   [[Ruído_Impulsivo]]
*   [[Ruído_Branco]]
*   [[Eco]]
*   [[Decibel_(Db)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

