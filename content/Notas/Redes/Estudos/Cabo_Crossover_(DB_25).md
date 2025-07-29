---
Tema Principal: 70-Cabo Crossover (DB 25)
Nível de Dificuldade: Técnico
Fonte/Referência: Hardware, Comunicação Serial, Cabeamento
tags:
  - Cabo
  - Serial
  - DB-25
  - RS-232
  - Cabo
  - Modem
---

# 70-Cabo Crossover (DB 25)

## Visão Geral

Um cabo crossover (ou cruzado) DB-25, frequentemente chamado de **cabo Null Modem** quando usado para comunicação serial RS-232, é um tipo especial de cabo projetado para conectar diretamente dois dispositivos do mesmo tipo, como dois Equipamentos Terminais de Dados (DTEs, ex: dois computadores) ou, menos comumente, dois Equipamentos de Comunicação de Dados (DCEs). Diferente de um cabo reto ([[Cabo_Reto_(DB_25)]]) que conecta os pinos pino a pino, o cabo crossover cruza certas linhas, principalmente as de transmissão (TxD) e recepção (RxD), para que a saída de transmissão de um dispositivo seja conectada à entrada de recepção do outro. Além disso, ele geralmente simula ou cruza os sinais de controle de fluxo (handshaking) para "enganar" os dispositivos, fazendo-os pensar que estão conectados através de um par DTE-DCE funcional.

## Definição

Um cabo crossover DB-25 (ou Null Modem DB-25) é um cabo de comunicação serial com conectores DB-25 em ambas as extremidades, onde as conexões internas são cruzadas de forma específica para permitir a comunicação direta entre dois DTEs ou dois DCEs. A configuração mais comum (DTE-para-DTE) envolve cruzar TxD (pino 2) com RxD (pino 3) e configurar as linhas de controle de fluxo (RTS, CTS, DSR, DTR, DCD) para permitir a comunicação sem um modem intermediário.

**Exemplo de Cruzamento Comum (Null Modem DTE-DTE):**
*   Pino 2 (TxD A) <---> Pino 3 (RxD B)
*   Pino 3 (RxD A) <---> Pino 2 (TxD B)
*   Pino 7 (GND A) <---> Pino 7 (GND B)
*   Pino 4 (RTS A) <---> Pino 5 (CTS B)
*   Pino 5 (CTS A) <---> Pino 4 (RTS B)
*   Pino 6 (DSR A) <---> Pino 20 (DTR B) (e às vezes Pino 8 DCD A)
*   Pino 20 (DTR A) <---> Pino 6 (DSR B) (e às vezes Pino 8 DCD B)
*   (Pino 8 DCD pode ser ligado ao DSR/DTR ou deixado desconectado)

**Nota:** Existem *muitas* variações de cabos Null Modem DB-25, dependendo do tipo de controle de fluxo necessário (nenhum, hardware completo, loopback parcial). A configuração exata pode variar.

## Exemplos de Uso

*   Conectar dois computadores diretamente através de suas portas seriais DB-25 para transferência de arquivos ou jogos em rede (muito comum antes das redes Ethernet se popularizarem).
*   Conectar um terminal diretamente a um computador host (ambos DTEs).
*   Diagnóstico e teste de portas seriais.

## Características

*   **Conectores DB-25:** Utiliza conectores de 25 pinos.
*   **Mapeamento Cruzado:** Linhas TxD/RxD e linhas de controle são cruzadas ou interligadas internamente.
*   **Padrão DTE-DTE (ou DCE-DCE):** Projetado para conectar dispositivos do mesmo tipo.
*   **Simula Conexão Modem:** Faz os dispositivos DTE acreditarem que há um DCE presente (ou vice-versa).
*   **Variações:** Múltiplas configurações de pinagem possíveis (Null Modem com controle total, parcial, sem controle).

## Vantagens

*   **Conexão Direta:** Permite a comunicação entre dois dispositivos DTE sem a necessidade de modems ou outros DCEs.
*   **Baixo Custo (Comparado a Modems):** Uma solução barata para conectar dois dispositivos próximos.

## Desvantagens

*   **Não Padronizado (Exatamente):** Existem muitas variações na fiação interna dos cabos Null Modem, o que pode causar problemas de compatibilidade se o cabo errado for usado para uma aplicação específica que depende de um certo tipo de controle de fluxo.
*   **Curta Distância:** Limitado pelas especificações de distância do RS-232 (tipicamente ~15 metros, embora distâncias maiores fossem possíveis com taxas de bits mais baixas).
*   **Complexidade (Variações):** Saber qual cabo Null Modem usar podia ser confuso.
*   **Obsolescência:** Redes locais (Ethernet, Wi-Fi) e USB tornaram a conexão serial direta entre computadores obsoleta para a maioria dos usos.

## Seção Expandida: Tipos de Controle de Fluxo em Null Modems

A principal variação nos cabos Null Modem reside em como as linhas de controle de fluxo (handshaking) são tratadas:
1.  **Sem Controle de Fluxo:** Apenas TxD, RxD e GND são conectados. Funciona apenas para taxas de bits baixas ou quando o software usa controle de fluxo por software (XON/XOFF).
2.  **Loopback de Controle de Fluxo:** Em cada conector, RTS é ligado a CTS, e DSR é ligado a DTR e DCD. Isso engana o DTE fazendo-o pensar que o outro lado está sempre pronto. Requer controle de fluxo por software.
3.  **Controle de Fluxo Parcial:** Cruza RTS/CTS, mas faz loopback de DTR/DSR/DCD.
4.  **Controle de Fluxo Completo (Full Handshake):** Cruza TxD/RxD, RTS/CTS e DTR/DSR (e às vezes DCD). É a configuração mais robusta, permitindo controle de fluxo por hardware completo entre os dois DTEs.

A escolha dependia das capacidades e requisitos do software de comunicação em ambos os lados.

## Notas Relacionadas

*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Interface_de_Comunicação]]
*   [[Configuração_dos_Pinos_do_DB_25]]
*   [[Descrição_dos_Pinos_do_DB_09]] (Conceito aplicável também a DB-9 Null Modems)
*   [[Cabo_Reto_(DB_25)]] (Contraste)
