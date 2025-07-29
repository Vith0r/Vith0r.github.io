---
Tema Principal: 46-Método Par e Ímpar (Paridade)
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Teoria da Codificação
tags:
  - Paridade
  - Detecção
  - Erros
  - Erro
  - Transmissão
---

# 46-Método Par e Ímpar (Paridade)

## Visão Geral

O método de paridade, também conhecido como verificação de paridade ou método par e ímpar, é uma das técnicas mais simples e antigas para a detecção de erros em transmissões de dados digitais. Ele funciona adicionando um único bit extra, chamado bit de paridade, a cada unidade de dados (geralmente um caractere ou byte) antes da transmissão. O valor desse bit (0 ou 1) é escolhido de forma que o número total de bits com valor '1' na unidade de dados, incluindo o bit de paridade, seja sempre par (no caso de paridade par) ou sempre ímpar (no caso de paridade ímpar). O receptor então verifica se essa condição de paridade é mantida nos dados recebidos. Embora seja fácil de implementar, sua capacidade de detecção de erros é limitada.

## Definição

A verificação de paridade é um esquema de detecção de erros que envolve anexar um bit de paridade a um grupo de bits de dados para tornar o número total de bits '1' no grupo (incluindo o bit de paridade) par ou ímpar. 
*   **Paridade Par:** O bit de paridade é definido como 1 se o número de bits '1' nos dados for ímpar, e 0 se for par. O resultado é que o número total de bits '1' (dados + paridade) é sempre par.
*   **Paridade Ímpar:** O bit de paridade é definido como 1 se o número de bits '1' nos dados for par, e 0 se for ímpar. O resultado é que o número total de bits '1' (dados + paridade) é sempre ímpar.
O transmissor calcula e anexa o bit de paridade. O receptor recalcula a paridade dos bits de dados recebidos e a compara com o bit de paridade recebido (ou simplesmente verifica se a contagem total de '1's, incluindo o bit de paridade, corresponde à convenção par/ímpar acordada). Uma incompatibilidade indica um erro.

## Exemplos

1.  **Transmissão Serial Assíncrona (RS-232):** Historicamente, a paridade era frequentemente usada como parte da configuração de portas seriais para comunicação entre computadores e periféricos (modems, impressoras). Podia-se configurar para paridade par, ímpar, nenhuma (none), marca (mark - sempre 1) ou espaço (space - sempre 0).
2.  **Memória RAM com Paridade:** Algumas memórias RAM mais antigas incluíam um bit de paridade extra por byte para detectar erros de memória. Se um erro de bit único fosse detectado durante a leitura, o sistema poderia gerar um erro.
3.  **Código ASCII de 7 bits:** Frequentemente transmitido como 8 bits, sendo o oitavo bit usado para paridade.
4.  **Paridade Bidimensional (LRC/VRC):** Combina a paridade por caractere (VRC) com uma paridade calculada sobre um bloco de caracteres (LRC) para aumentar a capacidade de detecção.

## Características

*   **Adição de 1 Bit Redundante:** Apenas um bit extra é adicionado por unidade de dados verificada.
*   **Simplicidade:** Fácil de calcular e verificar, tanto em hardware quanto em software.
*   **Baixo Overhead:** Adiciona pouco overhead à transmissão (1 bit por caractere/byte).
*   **Detecção Limitada:** Detecta apenas um número ímpar de erros de bit (1, 3, 5, etc.) dentro da unidade verificada.
*   **Falha com Erros Pares:** Não detecta se ocorrerem 2, 4, 6, etc., erros de bit na mesma unidade.

## Vantagens

*   **Simplicidade de Implementação:** Requer lógica muito simples.
*   **Baixo Custo Computacional:** O cálculo é extremamente rápido.
*   **Overhead Mínimo:** Adiciona a menor quantidade possível de redundância (1 bit).
*   **Eficaz para Erros Isolados:** Funciona bem se a probabilidade de mais de um erro de bit em uma única unidade de dados for muito baixa.

## Desvantagens

*   **Incapacidade de Detectar Erros Pares:** Esta é a principal limitação. Se dois bits forem invertidos na mesma unidade, a paridade permanecerá a mesma e o erro não será detectado.
*   **Nenhuma Capacidade de Correção:** Apenas detecta a presença de um número ímpar de erros, não indica qual bit está errado nem permite correção.
*   **Ineficaz Contra Erros em Rajada:** Em canais ruidosos onde os erros tendem a ocorrer em rajadas (múltiplos bits consecutivos afetados), a paridade simples frequentemente falha em detectar o erro.
*   **Obsolescência:** Devido à sua baixa capacidade de detecção, foi amplamente substituída por técnicas mais robustas como o CRC em aplicações de rede modernas.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Transmissão_Assíncrona]]
*   [[Over_Head]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Geradores_de_Erros]]
*   [[Método_Cyclic_Redundancy_Checking_(CRC)]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

