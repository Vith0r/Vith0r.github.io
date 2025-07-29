---
Tema Principal: 19-Transmissão Síncrona
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Telecomunicações, Interfaces de Comunicação Serial
tags:
  - Transmissão
  - Serial
  - Comunicação
  - Sincronização
---

# 19-Transmissão Síncrona

## Visão Geral

A transmissão síncrona é um método de comunicação serial onde o transmissor e o receptor compartilham um sinal de clock comum ou utilizam mecanismos para extrair informações de temporização diretamente do fluxo de dados recebido. Diferente da transmissão assíncrona, que sincroniza a cada caractere usando start/stop bits, a transmissão síncrona envia grandes blocos de dados (frames ou pacotes) de forma contínua, sem os bits de framing por caractere. Isso resulta em um overhead muito menor e permite taxas de transferência de dados significativamente mais altas, tornando-a ideal para comunicações de alta velocidade e grande volume, como em links de telecomunicações (T1/E1), redes de longa distância e interfaces seriais de alta performance.

## Definição

Na transmissão serial síncrona, os bits são transmitidos continuamente, sem espaços ou bits de start/stop entre os bytes. A sincronização entre o transmissor e o receptor é mantida por um sinal de clock. Esse clock pode ser fornecido através de um fio separado (comum em curtas distâncias) ou pode ser embutido no próprio sinal de dados usando códigos de linha específicos (como Manchester ou Bipolar AMI) que garantem transições suficientes para que o receptor possa extrair o clock (recuperação de clock). Os dados são agrupados em blocos maiores chamados frames, que possuem sequências especiais de bits (flags ou sync characters) no início e no fim para indicar os limites do frame e ajudar na sincronização inicial.

## Exemplos

1.  **Links de Telecomunicações (T1/E1, SONET/SDH):** Padrões usados para troncos telefônicos digitais e redes ópticas de alta capacidade utilizam transmissão síncrona para maximizar a eficiência.
2.  **Protocolos de Enlace Síncronos (HDLC, SDLC, PPP em modo síncrono):** Protocolos usados em redes WAN para transmitir frames de dados entre roteadores ou outros equipamentos de comunicação.
3.  **Interface Serial Síncrona (SSI):** Usada em algumas aplicações industriais e de comunicação de dados.
4.  **Ethernet (em nível de codificação de linha):** Embora a Ethernet moderna use pacotes (frames), a codificação física dos bits no meio (ex: 8b/10b, PAM5) incorpora mecanismos que permitem a recuperação de clock no receptor, característico de sistemas síncronos.
5.  **Comunicação Interna em Equipamentos:** Dentro de equipamentos complexos, barramentos síncronos são usados para comunicação de alta velocidade entre chips.

## Características

*   **Sincronização Contínua:** Transmissor e receptor operam sob um clock comum ou recuperado.
*   **Transmissão em Blocos (Frames):** Dados são enviados em grandes frames contínuos.
*   **Sem Start/Stop Bits por Byte:** Elimina o overhead de framing por caractere da transmissão assíncrona.
*   **Flags ou Caracteres de Sincronização:** Utiliza padrões de bits especiais para delimitar frames e auxiliar na sincronização.
*   **Maior Eficiência:** Menor overhead resulta em maior taxa de transferência de dados útil.
*   **Requer Sincronização de Clock:** A manutenção da sincronia é crucial e pode exigir hardware mais complexo (ex: PLLs - Phase-Locked Loops para recuperação de clock).

## Vantagens

*   **Alta Eficiência:** O overhead é muito baixo (apenas os delimitadores de frame e informações de controle), permitindo que quase toda a largura de banda seja usada para dados úteis.
*   **Altas Velocidades:** A sincronização contínua permite atingir taxas de bits muito mais elevadas do que a transmissão assíncrona.
*   **Ideal para Grandes Volumes de Dados:** Muito mais eficiente para transferir grandes arquivos ou fluxos contínuos de dados.

## Desvantagens

*   **Maior Complexidade:** Requer circuitos de sincronização mais sofisticados (geração e/ou recuperação de clock).
*   **Menos Adequada para Dados Intermitentes:** Pode ser menos eficiente se os dados forem enviados em pequenas rajadas esporádicas, pois pode haver um tempo inicial para estabelecer a sincronização.
*   **Custo Potencialmente Maior:** O hardware necessário pode ser mais caro.
*   **Sensibilidade à Perda de Sincronia:** Se a sincronização for perdida (devido a ruído excessivo ou falha no clock), um bloco inteiro de dados pode ser corrompido até que a sincronia seja restabelecida.

## Notas Relacionadas

*   [[Processamento_Real_Time]]
*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Transmissão_Assíncrona]]
*   [[Over_Head]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Técnicas_para_Detecção_de_Erros]]

