---
Tema Principal: "67-Configuração dos Pinos do DB 25"
Nível de Dificuldade: "Técnico"
Fonte/Referência: "Padrão RS-232, Hardware, Comunicação Serial"
Tags:
  - "DB-25"
  - "RS-232"
  - "Pinagem"
  - "Serial"
  - "Interface"
---

# 67-Configuração dos Pinos do DB 25

## Visão Geral

O conector DB-25 (originalmente DE-25, mas popularizado como DB-25) é um conector elétrico de 25 pinos da família D-subminiature. Ele foi amplamente utilizado como o conector padrão para a interface serial RS-232 em computadores (especialmente PCs mais antigos) e periféricos como modems, impressoras e terminais. A configuração dos pinos define qual sinal elétrico é transportado por cada um dos 25 pinos, permitindo a comunicação serial assíncrona e síncrona, incluindo linhas de dados, controle de fluxo (handshaking) e temporização. Embora muitos desses pinos não fossem utilizados na maioria das aplicações assíncronas simples, a pinagem completa foi definida pelo padrão RS-232.

## Definição

A configuração dos pinos do DB-25 para a interface RS-232 especifica a função de cada um dos 25 pinos quando usado para comunicação serial entre um Equipamento Terminal de Dados (DTE - [[Equipamentos_Terminais_de_Dados_(DTE)]], como um computador) e um Equipamento de Comunicação de Dados (DCE - [[Equipamentos_de_Comunicação_de_Dados_(DCE)]], como um modem). A pinagem define quais pinos são usados para transmitir dados (TxD), receber dados (RxD), sinais de controle de fluxo por hardware (RTS, CTS, DSR, DTR, DCD) e aterramento (GND), além de outros sinais para comunicação síncrona e canais secundários.

## Exemplos (Pinagem Principal RS-232 em DB-25 - Vista do DTE)

A pinagem mais comum para RS-232 em um conector DB-25 macho (lado do DTE/computador) é:

*   **Pino 1:** FG (Frame Ground) / Shield - Aterramento da Carcaça/Malha
*   **Pino 2:** TxD (Transmitted Data) - Dados Transmitidos (Saída do DTE)
*   **Pino 3:** RxD (Received Data) - Dados Recebidos (Entrada no DTE)
*   **Pino 4:** RTS (Request To Send) - Requisição Para Enviar (Saída do DTE, controle de fluxo)
*   **Pino 5:** CTS (Clear To Send) - Livre Para Enviar (Entrada no DTE, controle de fluxo)
*   **Pino 6:** DSR (Data Set Ready) - Equipamento de Dados Pronto (Entrada no DTE, status do DCE)
*   **Pino 7:** SG (Signal Ground) - Terra do Sinal (Referência de tensão comum)
*   **Pino 8:** DCD (Data Carrier Detect) / CD (Carrier Detect) - Detecção de Portadora (Entrada no DTE, status do DCE)
*   **Pino 20:** DTR (Data Terminal Ready) - Terminal de Dados Pronto (Saída do DTE, status do DTE)
*   **Pino 22:** RI (Ring Indicator) - Indicador de Chamada (Entrada no DTE, status do DCE)

**Outros Pinos (Menos Comuns em Aplicações Assíncronas Simples):**
*   Pinos 15, 17, 24: Sinais de clock para comunicação síncrona.
*   Pinos 14, 16, 19: Canais de dados e controle secundários.
*   Outros: Não atribuídos ou reservados.

**Nota:** A pinagem vista do lado do DCE (fêmea) é espelhada em termos de entrada/saída (ex: TxD do DTE no pino 2 conecta ao RxD do DCE no pino 2).

## Características

*   **25 Pinos:** Oferece um grande número de conexões.
*   **Padrão RS-232:** A pinagem mais comum segue este padrão.
*   **Sinais Dedicados:** Pinos específicos para dados, controle, terra e temporização.
*   **Comunicação Assíncrona e Síncrona:** Suporta ambos os modos.
*   **Controle de Fluxo por Hardware:** Pinos dedicados (RTS/CTS, DTR/DSR) permitem controle de fluxo robusto.
*   **Conector Robusto:** Fisicamente grande e relativamente robusto.

## Vantagens

*   **Padronização (RS-232):** Garantiu ampla compatibilidade entre equipamentos seriais.
*   **Funcionalidade Completa:** Suportava todos os sinais definidos no padrão RS-232, incluindo modos síncronos e canais secundários.
*   **Controle de Fluxo Robusto:** O controle por hardware era mais confiável que o controle por software (XON/XOFF) em altas velocidades ou conexões instáveis.

## Desvantagens

*   **Tamanho Físico:** O conector DB-25 é grande e ocupa muito espaço, especialmente em dispositivos portáteis.
*   **Muitos Pinos Não Utilizados:** Na maioria das aplicações assíncronas simples, muitos dos 25 pinos não eram necessários, levando ao desenvolvimento do conector DB-9 ([[Descrição_dos_Pinos_do_DB_09]]), mais compacto.
*   **Complexidade de Cabeamento:** Cabos com 25 fios eram mais caros e menos flexíveis.
*   **Obsolescência:** Amplamente substituído por interfaces mais modernas, rápidas e compactas como USB, Ethernet.

## Seção Expandida: DB-25 vs. DB-9

Devido ao tamanho e ao fato de muitos pinos do DB-25 serem raramente usados em PCs, a IBM introduziu um conector DB-9 (na verdade, DE-9) para a porta serial em seus PCs AT. O DB-9 continha apenas os sinais essenciais para a comunicação serial assíncrona mais comum:

*   DB-9 Pino 1: DCD
*   DB-9 Pino 2: RxD
*   DB-9 Pino 3: TxD
*   DB-9 Pino 4: DTR
*   DB-9 Pino 5: GND
*   DB-9 Pino 6: DSR
*   DB-9 Pino 7: RTS
*   DB-9 Pino 8: CTS
*   DB-9 Pino 9: RI

Adaptadores DB-9 para DB-25 eram comuns para conectar dispositivos com diferentes conectores. A pinagem do DB-9 tornou-se o padrão de fato para portas seriais em PCs posteriores, até ser suplantada pelo USB.

## Notas Relacionadas

*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Interface_de_Comunicação]]
*   [[Descrição_dos_Pinos_do_DB_09]]
*   [[Cabo_Reto_(DB_25)]]
*   [[Cabo_Crossover_(DB_25)]]
