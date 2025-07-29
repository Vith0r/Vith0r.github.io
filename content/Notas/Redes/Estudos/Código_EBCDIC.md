---
Tema Principal: 12-Código EBCDIC
Nível de Dificuldade: Médio
Fonte/Referência: Padrões de Codificação, História da Computação, Sistemas IBM
tags:
  - Codificação
  - Padrão
  - Texto
  - IBM
  - Mainframe
---

# 12-Código EBCDIC

## Visão Geral

O EBCDIC (Extended Binary Coded Decimal Interchange Code) é um código de caracteres de 8 bits criado pela IBM para seus sistemas operacionais de mainframe, como z/OS, OS/390, VM e VSE, e também para periféricos como impressoras e terminais desses sistemas. Diferente do ASCII, que se tornou o padrão dominante na maioria dos outros sistemas (minicomputadores, microcomputadores, Unix), o EBCDIC foi e continua sendo amplamente utilizado no ambiente de computação de grande porte da IBM. Sua existência representa um exemplo histórico de padrões concorrentes e destaca a importância da padronização para a interoperabilidade.

## Definição

EBCDIC é um esquema de codificação que usa 8 bits para representar 256 caracteres possíveis. Ele mapeia caracteres alfabéticos (maiúsculos e minúsculos), dígitos numéricos, símbolos de pontuação e caracteres de controle para valores binários específicos. Uma característica distintiva do EBCDIC em comparação com o ASCII é a sua organização interna; por exemplo, as letras do alfabeto não formam uma sequência binária contínua, o que pode complicar a ordenação alfabética baseada apenas nos valores numéricos dos códigos. Existem também diversas variantes nacionais do EBCDIC, com caracteres adicionais específicos para diferentes idiomas.

## Exemplos

*   A letra 'A' maiúscula em EBCDIC é representada pelo valor hexadecimal C1 (decimal 193).
*   A letra 'a' minúscula em EBCDIC é representada pelo valor hexadecimal 81 (decimal 129).
*   O dígito '0' em EBCDIC é representado pelo valor hexadecimal F0 (decimal 240).
*   O caractere de espaço em EBCDIC é representado pelo valor hexadecimal 40 (decimal 64).

(Note como esses valores são diferentes dos equivalentes em ASCII e a falta de contiguidade entre maiúsculas e minúsculas).

## Características

*   **Baseado em 8 bits:** Define 256 códigos possíveis.
*   **Origem IBM:** Criado e primariamente utilizado em sistemas mainframe da IBM.
*   **Não Contiguidade Alfabética:** As sequências de códigos para letras maiúsculas e minúsculas não são contíguas como em ASCII.
*   **Organização Decimal Codificada em Binário (BCD):** Sua estrutura deriva de representações BCD usadas em cartões perfurados, o que influencia a atribuição de códigos para números.
*   **Variantes Nacionais:** Existem múltiplas versões do EBCDIC para acomodar diferentes conjuntos de caracteres de idiomas específicos.
*   **Caracteres de Controle:** Inclui um conjunto de caracteres de controle, alguns dos quais são diferentes dos controles ASCII.

## Vantagens

*   **Compatibilidade com Legado IBM:** Garante a continuidade e compatibilidade com décadas de software e dados existentes em plataformas mainframe IBM.
*   **Representação BCD:** A forma como os números são codificados (zona e dígito) facilitava certas operações em hardware mais antigo e a conversão de/para formatos de cartão perfurado.

## Desvantagens

*   **Incompatibilidade com ASCII:** A principal desvantagem. A troca de dados textuais entre sistemas EBCDIC e sistemas baseados em ASCII (a vasta maioria dos sistemas modernos) requer conversão cuidadosa, que pode ser propensa a erros, especialmente com caracteres especiais ou variantes nacionais.
*   **Não Padronizado Fora do Ecossistema IBM:** Não é um padrão universalmente reconhecido ou utilizado fora das plataformas IBM, limitando a interoperabilidade direta.
*   **Complexidade de Ordenação:** A não contiguidade das letras torna a ordenação alfabética baseada no valor numérico do código menos direta do que em ASCII.
*   **Menos Intuitivo:** A atribuição de códigos é geralmente considerada menos lógica ou intuitiva do que a do ASCII.
*   **Legado:** Embora ainda em uso, é amplamente visto como uma tecnologia legada em comparação com o Unicode.

## Seção Expandida: Conversão EBCDIC <=> ASCII

A necessidade de converter entre EBCDIC e ASCII é comum em ambientes que integram mainframes IBM com outras plataformas. Existem tabelas de mapeamento padrão, mas a conversão pode ser complicada por vários fatores:
1.  **Caracteres sem Equivalente Direto:** Alguns caracteres existem em uma codificação, mas não na outra.
2.  **Variantes Nacionais:** A conversão correta depende de saber quais variantes específicas de EBCDIC e ASCII (ou página de código ASCII estendida) estão sendo usadas.
3.  **Caracteres de Controle:** Mapear caracteres de controle pode ser problemático, pois eles podem ter significados diferentes ou não existir na outra codificação.
4.  **Dados Binários:** Tentar converter arquivos que contêm dados binários (não textuais) como se fossem texto EBCDIC ou ASCII corromperá os dados.
Ferramentas de transferência de arquivos (como FTP) e software de integração de dados geralmente possuem opções para realizar essa conversão automaticamente, mas a configuração correta é crucial.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Código_ASCII]]
*   [[Host]]

