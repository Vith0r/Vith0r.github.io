---
Tema Principal: 69-Cabo Reto (DB 25)
Nível de Dificuldade: Técnico
Fonte/Referência: Hardware, Comunicação Serial, Cabeamento
tags:
  - Cabo
  - Serial
  - DB-25
  - RS-232
  - Cabo
---

# 69-Cabo Reto (DB 25)

## Visão Geral

Um cabo reto (straight-through cable) DB-25 é um tipo de cabo serial que utiliza conectores DB-25 em ambas as extremidades e conecta os pinos correspondentes diretamente um ao outro. Ou seja, o pino 1 em uma extremidade conecta-se ao pino 1 na outra extremidade, o pino 2 ao pino 2, e assim por diante, para todos os pinos utilizados. Este tipo de cabeamento é o padrão para conectar um Equipamento Terminal de Dados (DTE), como um computador, a um Equipamento de Comunicação de Dados (DCE), como um modem, seguindo a especificação RS-232. A lógica DTE/DCE já define quais pinos são de saída e quais são de entrada em cada lado, portanto, uma conexão direta pino a pino garante que as linhas de transmissão (TxD) de um lado cheguem às linhas de recepção (RxD) do outro, e que os sinais de controle de fluxo (handshake) se correspondam corretamente.

## Definição

Um cabo reto DB-25 é um cabo de comunicação serial com conectores DB-25 macho e/ou fêmea em suas extremidades, onde cada pino em um conector está conectado eletricamente ao pino de mesmo número no conector da outra extremidade. Ele é projetado para a interconexão padrão DTE-para-DCE conforme definido pelo padrão RS-232.

**Exemplo de Conexão (Pinos Principais):**
*   Pino 1 (Extremidade A) <---> Pino 1 (Extremidade B)
*   Pino 2 (Extremidade A) <---> Pino 2 (Extremidade B) (TxD do DTE vai para TxD no conector do DCE, que internamente é ligado ao RxD do DCE)
*   Pino 3 (Extremidade A) <---> Pino 3 (Extremidade B) (RxD do DTE vem do RxD no conector do DCE, que internamente vem do TxD do DCE)
*   Pino 4 (Extremidade A) <---> Pino 4 (Extremidade B) (RTS)
*   Pino 5 (Extremidade A) <---> Pino 5 (Extremidade B) (CTS)
*   Pino 6 (Extremidade A) <---> Pino 6 (Extremidade B) (DSR)
*   Pino 7 (Extremidade A) <---> Pino 7 (Extremidade B) (GND)
*   Pino 8 (Extremidade A) <---> Pino 8 (Extremidade B) (DCD)
*   Pino 20 (Extremidade A) <---> Pino 20 (Extremidade B) (DTR)
*   Pino 22 (Extremidade A) <---> Pino 22 (Extremidade B) (RI)
*   ... e assim por diante para os demais pinos.

## Exemplos de Uso

*   Conectar a porta serial DB-25 de um computador (DTE) a um modem externo com porta DB-25 (DCE).
*   Conectar um terminal serial (DTE) a um modem (DCE).
*   Conectar outros pares DTE-DCE que sigam a pinagem padrão RS-232 DB-25.

## Características

*   **Conectores DB-25:** Utiliza conectores de 25 pinos.
*   **Mapeamento 1:1:** Cada pino conecta-se ao pino de mesmo número na outra ponta.
*   **Padrão DTE-DCE:** Projetado para a conexão padrão entre DTE e DCE.
*   **Não Cruzado:** As linhas de transmissão e recepção não são cruzadas dentro do cabo.

## Vantagens

*   **Padronização:** Segue o padrão RS-232 para conexões DTE-DCE, garantindo compatibilidade.
*   **Simplicidade:** Fácil de construir e entender o mapeamento.

## Desvantagens

*   **Inadequado para DTE-DTE ou DCE-DCE:** Não funciona para conectar dois dispositivos do mesmo tipo (ex: dois computadores) diretamente, pois as linhas de transmissão estariam conectadas às linhas de transmissão, e as de recepção às de recepção. Para isso, é necessário um cabo crossover ou null modem ([[Cabo_Crossover_(DB_25)]]).
*   **Tamanho/Custo (DB-25):** Herda as desvantagens do conector DB-25 (tamanho, custo do cabo com muitos fios).

## Seção Expandida: Por que Reto para DTE-DCE?

A razão pela qual um cabo reto funciona para DTE-DCE reside na definição da própria interface RS-232:
*   O **DTE** (computador) **transmite** dados no pino **TxD** (pino 2 no DB-25) e **recebe** dados no pino **RxD** (pino 3).
*   O **DCE** (modem) **recebe** dados no seu pino **TxD** (pino 2 do seu conector, que internamente é a entrada de recepção) e **transmite** dados no seu pino **RxD** (pino 3 do seu conector, que internamente é a saída de transmissão).

Ao conectar pino 2 com pino 2 e pino 3 com pino 3 com um cabo reto, a saída TxD do DTE (pino 2) chega corretamente à entrada de recepção do DCE (via pino 2 do conector DCE), e a saída de transmissão do DCE (via pino 3 do conector DCE) chega corretamente à entrada RxD do DTE (pino 3). O mesmo raciocínio se aplica aos sinais de controle (RTS/CTS, DTR/DSR), onde as saídas de um lado correspondem às entradas esperadas no outro quando conectados pino a pino.

## Notas Relacionadas

*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Interface_de_Comunicação]]
*   [[Configuração_dos_Pinos_do_DB_25]]
*   [[Descrição_dos_Pinos_do_DB_09]]
*   [[Cabo_Crossover_(DB_25)]]
