---
Tema Principal: 68-Descrição dos Pinos do DB 09
Nível de Dificuldade: Técnico
Fonte/Referência: Padrão RS-232 (TIA/EIA-574), Hardware, Comunicação Serial
tags:
  - RS-232
  - Pinagem
  - Serial
  - Interface
---

# 68-Descrição dos Pinos do DB 09

## Visão Geral

O conector DB-9 (tecnicamente DE-9, mas comumente chamado DB-9) é um conector elétrico de 9 pinos da família D-subminiature. Ele se tornou o conector padrão de fato para portas de comunicação serial RS-232 em PCs (Personal Computers) a partir do IBM PC AT, substituindo o conector DB-25 maior ([[Configuração_dos_Pinos_do_DB_25]]) para a maioria das aplicações assíncronas. A configuração de 9 pinos inclui os sinais mais essenciais para a comunicação serial assíncrona, como transmissão e recepção de dados, aterramento e as principais linhas de controle de fluxo por hardware, tornando-o mais compacto e econômico que seu predecessor de 25 pinos.

## Definição

A descrição dos pinos do DB-9 para a interface serial RS-232 (conforme o padrão TIA/EIA-574) especifica a função de cada um dos 9 pinos para a comunicação entre um DTE (como um computador) e um DCE (como um modem). Ela define quais pinos carregam os dados transmitidos (TxD), dados recebidos (RxD), terra (GND) e os sinais de controle de fluxo e status (DCD, DSR, RTS, CTS, DTR, RI).

## Exemplos (Pinagem Padrão RS-232 em DB-9 - Vista do DTE)

A pinagem padrão para um conector DB-9 macho (lado do DTE/computador) é:

*   **Pino 1:** DCD (Data Carrier Detect) - Detecção de Portadora (Entrada no DTE, vindo do DCE)
*   **Pino 2:** RxD (Received Data) - Dados Recebidos (Entrada no DTE, vindo do DCE)
*   **Pino 3:** TxD (Transmitted Data) - Dados Transmitidos (Saída do DTE, para o DCE)
*   **Pino 4:** DTR (Data Terminal Ready) - Terminal Pronto (Saída do DTE, para o DCE)
*   **Pino 5:** GND (Signal Ground) - Terra do Sinal (Referência comum)
*   **Pino 6:** DSR (Data Set Ready) - Equipamento Pronto (Entrada no DTE, vindo do DCE)
*   **Pino 7:** RTS (Request To Send) - Requisição Para Enviar (Saída do DTE, para o DCE)
*   **Pino 8:** CTS (Clear To Send) - Livre Para Enviar (Entrada no DTE, vindo do DCE)
*   **Pino 9:** RI (Ring Indicator) - Indicador de Chamada (Entrada no DTE, vindo do DCE)

**Nota:** A pinagem vista do lado do DCE (fêmea) é espelhada em termos de entrada/saída.

## Características

*   **9 Pinos:** Conector compacto.
*   **Padrão RS-232 (TIA/EIA-574):** Define a pinagem para DTEs.
*   **Sinais Essenciais:** Inclui os sinais mais usados para comunicação serial assíncrona e controle de fluxo por hardware.
*   **Compacto:** Significativamente menor que o DB-25.
*   **Amplamente Adotado em PCs:** Tornou-se o padrão para portas COM em computadores pessoais.

## Vantagens

*   **Tamanho Reduzido:** Mais adequado para computadores e dispositivos menores.
*   **Custo Menor:** Conectores e cabos mais baratos que os de 25 pinos.
*   **Simplicidade:** Contém apenas os sinais mais frequentemente necessários.
*   **Padronização:** Garantiu boa compatibilidade para comunicação serial assíncrona em PCs.

## Desvantagens

*   **Funcionalidade Limitada (vs. DB-25):** Não inclui os pinos para comunicação síncrona (clocks) ou canais secundários presentes no DB-25.
*   **Obsolescência:** Assim como o DB-25, foi amplamente substituído pelo USB e Ethernet para a maioria das aplicações de conexão de periféricos e comunicação.
*   **Confusão de Nomenclatura:** Tecnicamente DE-9, mas quase universalmente chamado de DB-9.

## Seção Expandida: Null Modem com DB-9

Para conectar dois DTEs diretamente (dois computadores, por exemplo) usando cabos DB-9, era necessário um cabo especial chamado "Null Modem". Este cabo cruzava as linhas de transmissão e recepção e também simulava os sinais de controle de fluxo para que ambos os DTEs pensassem estar conectados a um DCE. Uma configuração comum de Null Modem DB-9 era:

*   Pino 2 (RxD) de um lado conecta ao Pino 3 (TxD) do outro.
*   Pino 3 (TxD) de um lado conecta ao Pino 2 (RxD) do outro.
*   Pino 5 (GND) conecta ao Pino 5 (GND).
*   Pinos 7 (RTS) e 8 (CTS) são interligados em cada conector (loopback local) ou cruzados (7 com 8 do outro lado).
*   Pinos 1 (DCD), 4 (DTR) e 6 (DSR) são interligados em cada conector ou conectados de forma específica dependendo do software.

Existem várias configurações de Null Modem, dependendo do tipo de controle de fluxo necessário.

## Notas Relacionadas

*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Interface_de_Comunicação]]
*   [[Configuração_dos_Pinos_do_DB_25]]
*   [[Cabo_Reto_(DB_25)]] (Conceito de cabo reto vs. crossover)
*   [[Cabo_Crossover_(DB_25)]] (Conceito de cabo reto vs. crossover)
