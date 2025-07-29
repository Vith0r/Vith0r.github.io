---
Tema Principal: 25-Eco
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Computadores
tags:
  - Eco
  - Sinal
  - Transmissão
  - Telecomunicações
---

# 25-Eco

## Visão Geral

Em telecomunicações, o eco é um fenômeno onde uma versão atrasada e geralmente atenuada do sinal transmitido é refletida de volta para a fonte ou para o receptor. Essa reflexão pode ocorrer devido a descasamentos de impedância em pontos de conexão ou terminação de linhas de transmissão, ou devido a acoplamentos indesejados entre os caminhos de transmissão e recepção (como no acoplamento acústico em viva-voz ou no acoplamento elétrico em circuitos híbridos de telefonia). O eco é uma fonte significativa de degradação da qualidade em comunicações de voz (tornando a conversa difícil) e pode causar interferência intersimbólica (ISI) em transmissões de dados, limitando o desempenho.

## Definição

Eco é a reflexão de um sinal de volta para sua origem ou para outro ponto do circuito, com um atraso suficiente para ser percebido como um sinal distinto ou para interferir com o sinal original ou subsequente. Em sistemas de comunicação, distinguimos principalmente dois tipos:
*   **Eco de Linha (Elétrico):** Causado por reflexões em pontos onde há mudança na impedância da linha de transmissão (conectores, emendas, terminação inadequada, circuitos híbridos 2-fios/4-fios em telefonia).
*   **Eco Acústico:** Ocorre quando o som do alto-falante de um dispositivo (telefone viva-voz, sistema de videoconferência) é captado pelo microfone do mesmo dispositivo e retransmitido de volta ao interlocutor distante.

## Exemplos

1.  **Chamadas Telefônicas (Especialmente Internacionais ou Via Satélite Antigas):** O longo atraso podia tornar o eco da própria voz audível para quem falava (talker echo) ou o eco da voz do interlocutor distante (listener echo).
2.  **Sistemas de Viva-Voz:** Sem cancelamento de eco adequado, a pessoa do outro lado da linha ouve sua própria voz retornando com atraso.
3.  **Transmissão de Dados em Linhas Ruins:** Reflexões podem causar ISI, onde a energia de um pulso refletido interfere com pulsos subsequentes.
4.  **Sinais de TV a Cabo:** Reflexões em conexões mal feitas podem causar "fantasmas" na imagem analógica.
5.  **Radar e Sonar:** Utilizam o princípio do eco de forma proposital, transmitindo um pulso e medindo o tempo e a intensidade do eco refletido por um objeto para determinar sua distância e características.

## Características

*   **Reflexão do Sinal:** O eco é uma cópia refletida do sinal original.
*   **Atraso:** O sinal de eco chega com um atraso em relação ao sinal direto.
*   **Atenuação:** O eco geralmente tem uma amplitude menor que o sinal original devido às perdas na reflexão e no percurso de volta.
*   **Causado por Descontinuidades/Acoplamento:** Origina-se em pontos de mudança de impedância ou acoplamento entre caminhos.
*   **Degradação da Qualidade:** Prejudica a inteligibilidade da voz e a integridade dos dados.

## Causas Principais

*   **Descasamento de Impedância:** Ocorre quando a impedância de um cabo, conector ou terminação não corresponde à impedância característica da linha. Parte da energia do sinal é refletida na interface.
*   **Híbridas Telefônicas:** Circuitos usados para converter a linha de assinante de 2 fios (envio e recebimento no mesmo par) para os 4 fios usados internamente nas centrais (pares separados para envio e recebimento). Imperfeições na híbrida causam vazamento do sinal de envio para o de recebimento, gerando eco.
*   **Acoplamento Acústico:** O som do alto-falante sendo captado pelo microfone no mesmo ambiente.

## Desvantagens (Efeitos do Eco)

*   **Redução da Inteligibilidade da Voz:** Torna conversas telefônicas difíceis e cansativas.
*   **Interferência Intersimbólica (ISI):** Em dados, o eco pode sobrepor-se a símbolos subsequentes, causando erros.
*   **Instabilidade em Sistemas com Feedback:** Em sistemas de áudio, pode levar à microfonia (feedback acústico).
*   **Necessidade de Cancelamento/Supressão:** Exige o uso de técnicas complexas e custosas (canceladores de eco, supressores de eco) para mitigar seus efeitos.

## Seção Expandida: Cancelamento vs. Supressão de Eco

Existem duas abordagens principais para lidar com o eco:
1.  **Supressão de Eco:** Uma técnica mais antiga e simples. Detecta a presença de voz em uma direção e atenua fortemente (ou corta) o sinal na direção oposta. Funciona, mas transforma a comunicação em half-duplex efetivo (só um pode falar por vez) e pode cortar o início ou fim das palavras.
2.  **Cancelamento de Eco:** Uma técnica mais sofisticada e preferida. O cancelador de eco cria um modelo adaptativo do caminho do eco. Ele pega o sinal que está sendo transmitido (ex: a voz recebida que vai para o alto-falante), usa o modelo para prever o eco que será gerado (ex: o que o microfone captará do alto-falante) e subtrai essa previsão do sinal captado pelo microfone antes de transmiti-lo de volta. Isso permite comunicação full-duplex sem o eco perceptível. Canceladores de eco são componentes essenciais em modems de alta velocidade, gateways VoIP e sistemas de conferência.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Atenuação]]
*   [[Distorção]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]
*   [[Linhas_Discadas_–_LD]]

