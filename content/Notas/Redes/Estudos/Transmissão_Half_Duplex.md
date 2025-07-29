---
Tema Principal: 14-Transmissão Half Duplex
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Transmissão
  - Comunicação
  - Redes
---

# 14-Transmissão Half Duplex

## Visão Geral

A transmissão half-duplex (ou semiduplex) oferece um avanço em relação à simplicidade da transmissão simplex, permitindo a comunicação nos dois sentidos entre dois dispositivos, porém não simultaneamente. Neste modo, cada dispositivo pode tanto transmitir quanto receber, mas apenas uma dessas ações pode ocorrer por vez no canal de comunicação compartilhado. É como uma conversa educada em uma rua de mão única que muda de direção: o tráfego pode fluir para um lado ou para o outro, mas nunca nos dois sentidos ao mesmo tempo. Este modo é comum em sistemas onde a comunicação bidirecional é necessária, mas não constante, como em rádios comunicadores (walkie-talkies).

## Definição

Transmissão half-duplex é um modo de comunicação bidirecional em que os dados podem fluir em ambas as direções entre dois dispositivos, mas apenas em uma direção por vez. Quando um dispositivo está transmitindo, o outro deve estar no modo de recepção. Para que a direção da transmissão seja invertida, é necessário um tempo de "virada" (turnaround time) e um mecanismo de controle para coordenar qual dispositivo tem permissão para transmitir em um determinado momento, evitando colisões de dados.

## Exemplos

1.  **Walkie-Talkies e Rádios CB (Citizen Band):** Usuários pressionam um botão para falar (transmitir) e o soltam para ouvir (receber). Apenas uma pessoa pode falar por vez no mesmo canal.
2.  **Redes Ethernet Antigas (Coaxial - 10BASE2, 10BASE5):** Nos primórdios da Ethernet com cabo coaxial, o meio era compartilhado e operava em modo half-duplex. Dispositivos usavam o protocolo CSMA/CD (Carrier Sense Multiple Access with Collision Detection) para tentar evitar e detectar colisões quando mais de um tentava transmitir ao mesmo tempo.
3.  **Algumas Conexões Ponto a Ponto:** Certos protocolos de comunicação ponto a ponto podem operar em half-duplex para simplificar o hardware ou o protocolo, alternando a direção da transmissão.
4.  **Sistemas de Intercomunicação Simples:** Muitos sistemas de interfone operam em half-duplex, onde você pressiona um botão para falar e solta para ouvir.

## Características

*   **Bidirecional Não Simultâneo:** Permite comunicação em ambos os sentidos, mas alternadamente.
*   **Canal Compartilhado:** Ambos os sentidos de comunicação utilizam o mesmo canal físico (ou frequência).
*   **Tempo de Virada (Turnaround Time):** Há um pequeno atraso necessário para mudar o estado do canal de transmissão para recepção e vice-versa.
*   **Necessidade de Coordenação:** Requer um protocolo ou mecanismo para controlar o acesso ao meio e decidir quem transmite (ex: CSMA/CD, apertar botão para falar).

## Vantagens

*   **Maior Flexibilidade que Simplex:** Permite comunicação nos dois sentidos, possibilitando interação e confirmação.
*   **Uso Eficiente da Capacidade do Canal (em comparação com dois canais simplex):** Utiliza a capacidade total do canal para a direção ativa no momento, sem precisar de um canal separado para cada sentido como seria necessário para implementar bidirecionalidade com simplex.
*   **Menor Custo/Complexidade que Full Duplex:** Geralmente requer hardware menos complexo do que a transmissão full-duplex, que precisa lidar com transmissão e recepção simultâneas.

## Desvantagens

*   **Ineficiência de Tempo:** Como apenas um dispositivo pode transmitir por vez, a taxa de transferência efetiva é menor do que a capacidade teórica do canal permitiria se fosse full-duplex.
*   **Atraso (Turnaround Time):** O tempo necessário para inverter a direção da transmissão introduz latência.
*   **Potencial para Colisões:** Em redes multiponto half-duplex, é necessário um mecanismo para gerenciar o acesso ao meio e evitar/tratar colisões (ex: [[Contention]], [[Selection_e_Polling]]).
*   **Menos Eficiente para Tráfego Intenso e Bidirecional:** Não é ideal para aplicações que exigem troca constante e simultânea de dados nos dois sentidos.

## Notas Relacionadas

*   [[Transmissão_Simplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Contention]]
*   [[Selection_e_Polling]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

