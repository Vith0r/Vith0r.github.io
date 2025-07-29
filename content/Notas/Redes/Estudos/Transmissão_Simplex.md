---
Tema Principal: 13-Transmissão Simplex
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Transmissão
  - Comunicação
  - Redes
---

# 13-Transmissão Simplex

## Visão Geral

A transmissão simplex representa a forma mais básica de comunicação entre dois dispositivos, caracterizada por um fluxo de dados estritamente unidirecional. Neste modo, um dispositivo atua exclusivamente como transmissor, enquanto o outro atua exclusivamente como receptor. Não há possibilidade de inverter os papéis ou de enviar informações de volta pelo mesmo canal. Embora limitada em interatividade, a transmissão simplex é fundamental para aplicações de difusão (broadcasting) e para situações onde a informação precisa fluir apenas em um sentido, como de um sensor para um sistema de monitoramento ou de um teclado para um computador.

## Definição

Transmissão simplex é um modo de comunicação em que os dados podem fluir em apenas uma direção. De dois dispositivos conectados, um só pode transmitir e o outro só pode receber. A capacidade total do canal de comunicação é utilizada para enviar dados no único sentido permitido. Não há mecanismo para o receptor enviar confirmações, pedidos de retransmissão ou qualquer outra informação de volta ao transmissor através do mesmo link.

## Exemplos

1.  **Radiodifusão e Teledifusão (Rádio/TV Tradicional):** Uma estação de rádio ou TV transmite o sinal (áudio/vídeo) para os receptores (rádios, televisores), que apenas recebem o conteúdo. Não há comunicação no sentido inverso do ouvinte/espectador para a estação pelo mesmo meio.
2.  **Teclado e Mouse para Computador:** O teclado e o mouse enviam dados de entrada para a unidade central de processamento (CPU) do computador. A comunicação é simplex nesse sentido (do dispositivo de entrada para o computador).
3.  **Sensores Simples:** Um sensor de temperatura que envia leituras para uma unidade de controle central opera em modo simplex.
4.  **Sistemas de Pager (Antigos):** A central enviava mensagens para os pagers, que apenas as recebiam.
5.  **Monitor de Computador (Conexão de Vídeo):** A placa de vídeo envia o sinal de imagem para o monitor, que apenas o exibe (ignorando canais de controle auxiliares que podem existir em padrões modernos como HDMI).

## Características

*   **Unidirecional:** O fluxo de dados ocorre em apenas um sentido.
*   **Papéis Fixos:** Um dispositivo é sempre o transmissor, o outro é sempre o receptor.
*   **Uso Total da Capacidade:** Toda a largura de banda do canal é dedicada à transmissão no único sentido permitido.
*   **Sem Canal de Retorno:** Não há como o receptor se comunicar com o transmissor pelo mesmo link.

## Vantagens

*   **Simplicidade:** É o modo de transmissão mais simples de implementar em termos de hardware e protocolo.
*   **Custo (para Broadcasting):** Ideal e de baixo custo para aplicações que precisam enviar a mesma informação para muitos receptores simultaneamente.
*   **Máxima Utilização do Canal (em um sentido):** Como não há necessidade de dividir o tempo ou a frequência para um canal de retorno, toda a capacidade pode ser usada para a transmissão principal.

## Desvantagens

*   **Falta de Interatividade:** Não permite comunicação bidirecional, tornando-o inadequado para conversas ou aplicações interativas.
*   **Sem Confirmação ou Controle de Erro:** O transmissor não tem como saber se o receptor recebeu os dados corretamente ou mesmo se os recebeu.
*   **Flexibilidade Limitada:** Os papéis de transmissor e receptor são fixos.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

