---
Tema Principal: "41-Equipamentos Terminais de Dados (DTE)"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Redes de Computadores, Telecomunicações, Padrões de Interface"
Tags:
  - "DTE"
  - "Terminal"
  - "Interface"
  - "Redes"
  - "Hardware"
---

# 41-Equipamentos Terminais de Dados (DTE)

## Visão Geral

O Equipamento Terminal de Dados (DTE - Data Terminal Equipment) é um conceito fundamental nas interfaces de comunicação de dados, particularmente em padrões como RS-232 e X.21. Ele representa o dispositivo final em uma cadeia de comunicação que atua como a fonte ou o destino da informação do usuário. Em termos simples, o DTE é o equipamento que o usuário utiliza para gerar ou receber dados, como um computador, um terminal, uma impressora ou um roteador. Ele se conecta a um Equipamento de Comunicação de Dados (DCE), como um modem, que por sua vez o conecta à rede de comunicação. A distinção entre DTE e DCE é crucial porque define os papéis e as direções dos sinais de controle na interface física entre eles.

## Definição

Equipamento Terminal de Dados (DTE) é qualquer equipamento que funciona como a origem ou o destino final dos dados em uma comunicação. Ele gera os dados a serem transmitidos ou processa os dados recebidos. O DTE não se conecta diretamente à linha de transmissão; ele se conecta através de um DCE. Na interface física DTE-DCE (por exemplo, um conector DB-25 para RS-232), os pinos são definidos com base na perspectiva do DTE (ex: pino 2 é "Transmit Data" (TxD) do ponto de vista do DTE, pino 3 é "Receive Data" (RxD)).

## Exemplos

*   **Computadores (Desktops, Laptops, Servidores):** Quando conectados a uma rede via modem ou outro dispositivo de comunicação.
*   **Terminais de Dados:** Terminais burros (VT100, IBM 3270) ou terminais gráficos.
*   **Roteadores:** Atuam como DTE na interface que se conecta ao DCE (modem, CSU/DSU) fornecido pela operadora de telecomunicações para acessar a WAN.
*   **Impressoras de Rede (em algumas configurações):** Podem atuar como DTE.
*   **Telefones Digitais ou Equipamentos de Videoconferência:** Podem ser considerados DTEs.
*   **Caixas Registradoras ou Equipamentos POS:** Que se comunicam com um servidor central.

## Características

*   **Fonte/Destino dos Dados:** Origina ou consome a informação do usuário.
*   **Interface com DCE:** Conecta-se a um DCE para acessar a rede.
*   **Define Pinos de Interface:** Padrões como RS-232 definem a pinagem (TxD, RxD, sinais de controle como RTS, CTS, DTR, DSR) do ponto de vista do DTE.
*   **Não Realiza Codificação/Modulação para Linha:** Essas funções são tipicamente realizadas pelo DCE.
*   **Pode ser Simples ou Complexo:** Varia desde um terminal burro até um supercomputador.

## Vantagens (da Distinção DTE/DCE)

*   **Padronização da Interface:** Define claramente os papéis e as conexões entre o equipamento do usuário (DTE) e o equipamento de rede (DCE), permitindo interoperabilidade entre dispositivos de diferentes fabricantes.
*   **Modularidade:** Permite que DTEs e DCEs sejam desenvolvidos e substituídos independentemente.
*   **Simplificação para o DTE:** O DTE não precisa se preocupar com os detalhes da sinalização na linha de transmissão; essa é a função do DCE.

## Desvantagens (da Distinção DTE/DCE)

*   **Confusão na Conexão Direta:** Conectar dois DTEs diretamente (sem um DCE no meio) requer um cabo especial chamado "null modem" ou "crossover cable" que cruza os pinos de transmissão e recepção (TxD/RxD) e simula os sinais de controle do DCE.
*   **Legado (em parte):** Embora o conceito ainda seja válido (ex: roteador como DTE conectando a CSU/DSU como DCE), em redes modernas como Ethernet comutada, a distinção é menos proeminente nas conexões diretas entre switches e computadores (ambos podem ser vistos como DTEs negociando a conexão).

## Seção Expandida: DTE vs. DCE em RS-232

No padrão RS-232, a distinção é crucial. Um DTE (como um PC) espera transmitir no pino 2 (TxD) e receber no pino 3 (RxD). Ele ativa o pino Request To Send (RTS) para pedir permissão para enviar e espera um sinal Clear To Send (CTS) do DCE. Ele ativa o Data Terminal Ready (DTR) para indicar que está ligado e pronto. Um DCE (como um modem) faz o oposto: recebe no pino 2, transmite no pino 3, recebe RTS e ativa CTS, recebe DTR e ativa Data Set Ready (DSR) e Data Carrier Detect (DCD). Para conectar dois PCs (DTEs) via RS-232, um cabo null modem cruza TxD com RxD, RTS com CTS, e DTR com DSR/DCD entre os dois conectores, fazendo cada DTE "pensar" que está conectado a um DCE.

## Notas Relacionadas

*   [[Processamento_Online]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Transmissão_Simplex]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Transmissão_Assíncrona]]
*   [[Transmissão_Síncrona]]
*   [[Ligação_Ponto_a_Ponto_Dedicado]]
*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Ligação_Multiponto]]
*   [[Selection_e_Polling]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Controladoras_de_Comunicação]]
*   [[Controladoras_Hardwired_(TCU)]]
*   [[Controladoras_Programáveis_(PFEP)]]
*   [[Concentrador_e_Conversor]]
*   [[Unidade_de_Derivação_Digital_(UDD)_e_Unidade_de_Derivação_Analógica_(UDA)]]
*   [[Terminais_de_Dados]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

