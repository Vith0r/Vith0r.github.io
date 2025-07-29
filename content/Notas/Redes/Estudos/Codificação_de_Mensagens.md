---
Tema Principal: 10-Codificação de Mensagens
Nível de Dificuldade: Básico
Fonte/Referência: Teoria da Informação, Redes de Computadores, Sistemas Digitais
tags:
  - Codificação
  - Dados
  - Digital
  - ASCII
---

# 10-Codificação de Mensagens

## Visão Geral

A codificação de mensagens é o processo fundamental de converter informação de uma forma (como texto legível por humanos, números ou símbolos) para outra forma, geralmente uma sequência de bits (0s e 1s), adequada para processamento, armazenamento ou transmissão por sistemas digitais. É a ponte essencial entre o mundo da informação como a percebemos e o mundo binário dos computadores e das redes de comunicação. Sem esquemas de codificação padronizados, a troca de informações entre diferentes sistemas e dispositivos seria caótica e impraticável.

## Definição

Codificação de mensagens é o ato de aplicar um conjunto de regras (um código) para representar unidades de informação (como caracteres alfabéticos, dígitos numéricos, sinais de pontuação ou outros símbolos) através de um conjunto específico de símbolos de outro alfabeto, tipicamente o alfabeto binário {0, 1}. Cada unidade de informação original é mapeada para uma sequência única (ou pelo menos não ambígua dentro do contexto) de símbolos codificados. Exemplos clássicos incluem a representação de caracteres de texto para uso em computadores e a conversão de sequências de bits em sinais elétricos adequados para transmissão física (codificação de linha).

## Exemplos

1.  **Código Morse:** Um código histórico (não binário, usa pontos, traços e espaços) para transmitir letras e números através de telégrafos.
2.  **Código ASCII (American Standard Code for Information Interchange):** Um dos primeiros e mais influentes padrões para codificar caracteres (letras, números, pontuação, controles) usando 7 bits (ou 8 bits na versão estendida), permitindo representar 128 (ou 256) caracteres distintos.
3.  **Código EBCDIC (Extended Binary Coded Decimal Interchange Code):** Um código de 8 bits desenvolvido pela IBM, usado principalmente em seus sistemas mainframe.
4.  **Unicode (e suas codificações como UTF-8, UTF-16):** Um padrão moderno que visa abranger todos os caracteres de todos os sistemas de escrita do mundo. UTF-8 é a codificação dominante na web, usando um número variável de bytes por caractere.
5.  **Códigos de Linha (ex: NRZ, Manchester, Bipolar AMI):** Técnicas usadas na camada física para codificar sequências de bits em sinais elétricos ou ópticos, otimizando a transmissão (ex: garantindo sincronização, evitando componentes DC).
6.  **Codificação de Huffman:** Um método de codificação de comprimento variável usado em compressão de dados, onde símbolos mais frequentes recebem códigos mais curtos.

## Características

*   **Mapeamento:** Define uma correspondência entre os símbolos da fonte original e as sequências de código.
*   **Unicidade/Não Ambiguidade:** Idealmente, cada sequência de código corresponde a apenas um símbolo original, ou a sequência de códigos pode ser decodificada sem ambiguidade.
*   **Comprimento Fixo vs. Variável:** Códigos podem ter um número fixo de bits por símbolo (ex: ASCII 7 bits) ou variável (ex: UTF-8, Huffman).
*   **Eficiência:** A quantidade média de bits usada por símbolo original. Códigos de comprimento variável podem ser mais eficientes se a frequência dos símbolos for conhecida.
*   **Robustez:** Alguns códigos podem ter propriedades que facilitam a detecção ou correção de erros (embora isso seja mais propriamente o domínio da codificação de canal).
*   **Padronização:** A existência de padrões amplamente aceitos (ASCII, Unicode) é crucial para a interoperabilidade.

## Vantagens

*   **Possibilita Processamento Digital:** Converte informação em um formato que computadores podem manipular.
*   **Padronização e Interoperabilidade:** Permite que diferentes sistemas troquem e interpretem informações corretamente.
*   **Eficiência de Armazenamento/Transmissão:** Códigos bem projetados podem representar informações de forma compacta.
*   **Base para Funcionalidades Avançadas:** Permite aplicar técnicas como compressão, criptografia e correção de erros sobre a representação codificada.

## Desvantagens

*   **Overhead:** Alguns esquemas de codificação podem introduzir bits adicionais que não fazem parte da informação original (ex: bits de paridade, bits de sincronização em códigos de linha).
*   **Complexidade:** Códigos mais sofisticados (como Unicode) são mais complexos de implementar e processar do que códigos simples (como ASCII).
*   **Necessidade de Acordo:** Transmissor e receptor devem concordar e usar o mesmo esquema de codificação/decodificação.
*   **Ineficiência (em alguns casos):** Códigos de comprimento fixo podem ser ineficientes se a frequência dos símbolos variar muito.
*   **Problemas de Compatibilidade:** A existência de múltiplos padrões (ex: ASCII vs. EBCDIC, diferentes páginas de código) historicamente causou problemas de compatibilidade.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Código_ASCII]]
*   [[Código_EBCDIC]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Transmissão_Assíncrona]]
*   [[Transmissão_Síncrona]]
*   [[Técnicas_para_Detecção_de_Erros]]

