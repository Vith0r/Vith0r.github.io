---
Tema Principal: 43-Técnicas para Detecção de Erros
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Teoria da Codificação
tags:
  - Detecção
  - Erros
  - Erro
  - Transmissão
  - Redes
  - Protocolo
  - CRC
  - Paridade
---

# 43-Técnicas para Detecção de Erros

## Visão Geral

Durante a transmissão de dados através de canais de comunicação, diversos fatores como ruído, atenuação e distorção podem introduzir erros, alterando os bits transmitidos. As técnicas de detecção de erros são mecanismos essenciais incorporados aos protocolos de comunicação (principalmente na camada de enlace de dados) para permitir que o receptor identifique se os dados recebidos foram corrompidos durante a transmissão. Essas técnicas adicionam informações redundantes (bits de verificação) aos dados originais de uma forma calculada. O receptor realiza o mesmo cálculo sobre os dados recebidos e compara o resultado com os bits de verificação recebidos. Uma discrepância indica que um erro ocorreu. A detecção de erros é o primeiro passo crucial para garantir a integridade dos dados; uma vez detectado um erro, o sistema pode solicitar a retransmissão do bloco de dados corrompido (usando protocolos ARQ - Automatic Repeat reQuest) ou, em alguns casos, tentar corrigi-lo (usando códigos de correção de erros).

## Definição

Técnicas de detecção de erros são algoritmos e métodos usados para verificar a integridade dos dados transmitidos através de um canal de comunicação não confiável. Elas funcionam adicionando bits redundantes (checksum, bits de paridade, CRC) aos dados originais, calculados com base no conteúdo dos próprios dados. O receptor recalcula esses bits a partir dos dados recebidos e os compara com os bits redundantes que acompanham a mensagem. Se houver uma diferença, um erro é detectado. É importante notar que as técnicas de *detecção* apenas indicam a presença de erros; elas não os corrigem (isso é função das técnicas de *correção* de erros, que são mais complexas e exigem mais redundância).

## Exemplos e Tipos Principais

1.  **Verificação de Paridade (Simples):** A técnica mais simples. Um bit extra (bit de paridade) é adicionado a cada caractere ou bloco de bits para tornar o número total de bits '1' par (paridade par) ou ímpar (paridade ímpar). O receptor verifica se a paridade está correta. **Limitação:** Detecta apenas um número ímpar de erros de bit em cada unidade verificada; falha se ocorrerem dois erros (ou qualquer número par de erros).
    *   **Paridade Bidimensional (LRC/VRC):** Organiza os dados em uma matriz e calcula a paridade para cada linha (VRC - Vertical Redundancy Check, geralmente paridade simples por caractere) e cada coluna (LRC - Longitudinal Redundancy Check). Detecta todos os erros de 1, 2 e 3 bits, e a maioria dos erros em rajada, mas ainda pode falhar em certos padrões de erro.
2.  **Checksum (Soma de Verificação):** Os dados são divididos em segmentos (ex: 16 bits), que são somados usando aritmética de complemento de um. O complemento de um da soma final é transmitido como checksum. O receptor realiza a mesma soma (incluindo o checksum recebido) e o resultado deve ser um valor específico (geralmente todos os bits '1'). Usado em protocolos como IP, TCP e UDP (embora o checksum do IP cubra apenas o cabeçalho). **Limitação:** Menos robusto que CRC, pode falhar em detectar certos erros, como a transposição de segmentos.
3.  **Verificação por Redundância Cíclica (CRC - Cyclic Redundancy Check):** A técnica de detecção de erros mais poderosa e comumente usada em redes (Ethernet, Wi-Fi, HDLC, PPP, etc.). Trata o bloco de dados como um polinômio binário e realiza uma divisão polinomial por um polinômio gerador pré-definido. O resto dessa divisão (tipicamente 16 ou 32 bits) é o CRC, que é anexado aos dados. O receptor realiza a mesma divisão nos dados recebidos (incluindo o CRC) e verifica se o resto é zero. **Força:** CRCs são muito eficazes na detecção de erros únicos, erros duplos, erros de bits ímpares e a maioria dos erros em rajada (especialmente rajadas menores que o tamanho do CRC).

## Características

*   **Adição de Redundância:** Todas as técnicas adicionam bits extras aos dados.
*   **Cálculo Baseado nos Dados:** Os bits redundantes são uma função do conteúdo dos dados.
*   **Verificação no Receptor:** O receptor refaz o cálculo e compara.
*   **Foco na Detecção:** O objetivo primário é apenas saber se ocorreu um erro.
*   **Probabilidade de Erro Não Detectado:** Nenhuma técnica é 100% infalível; sempre há uma pequena probabilidade residual de que um erro ocorra de forma a não ser detectado (embora essa probabilidade seja extremamente baixa para CRCs bem projetados).

## Vantagens

*   **Garantia de Integridade (com alta probabilidade):** Permite que o receptor confie (com alto grau de certeza) que os dados recebidos estão corretos.
*   **Base para Confiabilidade:** Essencial para protocolos que garantem entrega confiável (como TCP), pois permite solicitar retransmissões.
*   **Relativamente Simples (Comparado à Correção):** Algoritmos de detecção (especialmente CRC) são eficientes para implementar em hardware.

## Desvantagens

*   **Overhead:** Os bits redundantes consomem largura de banda ([[Over_Head]]).
*   **Não Corrige Erros:** Apenas detecta. A correção requer mecanismos adicionais (retransmissão ou códigos corretores).
*   **Atraso:** O cálculo e a verificação adicionam um pequeno atraso de processamento.
*   **Complexidade (para alta robustez):** Técnicas mais robustas como CRC são mais complexas que a paridade simples.

## Notas Relacionadas

*   [[Instituições_de_Padronização]]
*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Transmissão_Síncrona]]
*   [[Over_Head]]
*   [[Ruído_Impulsivo]]
*   [[Ruído_Branco]]
*   [[Geradores_de_Erros]]
*   [[Método_Ecopelexing]]
*   [[Método_Par_e_Ímpar_(Paridade)]]
*   [[Método_Cyclic_Redundancy_Checking_(CRC)]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

