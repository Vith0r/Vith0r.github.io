---
Tema Principal: 15-Transmissão Full Duplex
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Transmissão
  - Comunicação
  - Redes
---

# 15-Transmissão Full Duplex

## Visão Geral

A transmissão full-duplex representa o modo de comunicação mais eficiente e interativo entre dois dispositivos, permitindo que os dados fluam em ambas as direções simultaneamente. Diferente dos modos simplex (unidirecional) e half-duplex (bidirecional alternado), o full-duplex elimina a necessidade de esperar que o outro lado termine de transmitir antes de poder enviar dados. É como uma conversa telefônica normal, onde ambas as pessoas podem falar e ouvir ao mesmo tempo. Este modo é essencial para a maioria das comunicações de dados modernas, incluindo conexões de rede Ethernet comutadas e muitas formas de comunicação serial, pois maximiza a taxa de transferência e minimiza a latência.

## Definição

Transmissão full-duplex é um modo de comunicação em que os dados podem ser transmitidos e recebidos simultaneamente por ambos os dispositivos conectados. Isso requer que o canal de comunicação seja capaz de suportar dois fluxos de dados independentes e simultâneos, um em cada direção. Fisicamente, isso pode ser alcançado usando pares de fios separados para transmissão e recepção (como em muitos cabos Ethernet), ou usando técnicas de multiplexação (como divisão de frequência ou cancelamento de eco) para permitir que ambos os sentidos compartilhem o mesmo meio físico sem interferência significativa.

## Exemplos

1.  **Conversa Telefônica:** A rede telefônica tradicional (e VoIP) permite que ambos os interlocutores falem e ouçam ao mesmo tempo.
2.  **Redes Ethernet Comutadas (Switched Ethernet):** Conexões entre um computador e um switch Ethernet moderno (usando cabos de par trançado) operam em modo full-duplex. Pares de fios distintos são usados para enviar e receber dados, eliminando colisões e permitindo a taxa de transferência nominal em cada direção simultaneamente (ex: 1 Gbps de envio e 1 Gbps de recebimento).
3.  **Muitas Interfaces Seriais (ex: RS-232 com hardware adequado):** Algumas configurações de comunicação serial permitem transmissão e recepção simultâneas usando linhas TxD (Transmit Data) e RxD (Receive Data) separadas.
4.  **Modems Modernos:** Modems de banda larga (cabo, DSL) operam em modo full-duplex, permitindo downloads e uploads simultâneos (embora as taxas possam ser assimétricas).
5.  **Conexões de Rede Celular (LTE, 5G):** Utilizam técnicas sofisticadas (FDD - Frequency Division Duplex ou TDD - Time Division Duplex) para alcançar comunicação full-duplex entre o dispositivo e a estação base.

## Características

*   **Bidirecional Simultâneo:** Dados fluem em ambas as direções ao mesmo tempo.
*   **Canais Independentes (Lógicos ou Físicos):** Requer capacidade para dois fluxos de dados simultâneos.
*   **Sem Tempo de Virada:** Não há atraso para inverter a direção da transmissão.
*   **Maior Taxa de Transferência Efetiva:** A capacidade total do canal pode ser utilizada, dobrando potencialmente a taxa de transferência em comparação com o half-duplex para a mesma taxa de sinalização.
*   **Eliminação de Colisões (em conexões ponto a ponto):** Em conexões como Ethernet comutada, o full-duplex elimina a possibilidade de colisões de dados.

## Vantagens

*   **Máxima Eficiência:** Permite a maior taxa de transferência de dados possível para uma dada tecnologia de sinalização, pois ambas as direções estão sempre ativas.
*   **Menor Latência:** Elimina os atrasos associados à inversão de direção do modo half-duplex.
*   **Ideal para Aplicações Interativas:** Suporta comunicação responsiva e em tempo real de forma muito eficaz.
*   **Simplifica Protocolos (em alguns casos):** A eliminação de colisões em redes ponto a ponto simplifica os protocolos da camada de enlace (não precisa de CSMA/CD).

## Desvantagens

*   **Maior Complexidade/Custo:** Requer hardware mais complexo (transceptores capazes de transmitir e receber simultaneamente) e/ou mais recursos físicos (ex: mais pares de fios no cabo).
*   **Não Aplicável a Meios Compartilhados (sem técnicas adicionais):** Em meios de transmissão naturalmente compartilhados (como rádio ou cabo coaxial antigo), alcançar full-duplex requer técnicas mais complexas (FDD, TDD, cancelamento de eco).

## Notas Relacionadas

*   [[Transmissão_Simplex]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

