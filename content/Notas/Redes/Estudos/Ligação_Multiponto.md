---
Tema Principal: 30-Ligação Multiponto
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Ligação
  - Multiponto
  - Redes
  - Polling
  - Contention
---

# 30-Ligação Multiponto

## Visão Geral

A ligação multiponto, também conhecida como multidrop, é uma configuração de comunicação onde múltiplos dispositivos secundários (terminais) compartilham um único canal de comunicação físico para se conectar a um dispositivo primário (geralmente um computador host ou controlador). Este arranjo contrasta com as ligações ponto a ponto, onde cada conexão interliga apenas dois dispositivos. As ligações multiponto foram historicamente importantes em ambientes de computação centralizada (mainframes) e em certas redes de longa distância (WANs) como uma forma econômica de conectar vários terminais remotos a um sistema central, reduzindo a necessidade de múltiplas linhas dedicadas. No entanto, o compartilhamento do meio introduz desafios no gerenciamento do acesso para evitar colisões.

## Definição

Uma ligação multiponto é uma topologia de comunicação na qual mais de dois dispositivos específicos compartilham um único link físico. Tipicamente, há um dispositivo designado como primário (master ou host) e vários dispositivos secundários (slaves ou terminais). A comunicação no link compartilhado deve ser gerenciada por um protocolo de controle de acesso ao meio (MAC - Media Access Control) para determinar qual dispositivo pode transmitir em um determinado momento e para quem a mensagem se destina. Os métodos mais comuns para gerenciar o acesso em linhas multiponto são o polling/selection e a contenção.

## Exemplos

1.  **Ambientes Mainframe:** Vários terminais "burros" (como IBM 3270) conectados a uma unidade controladora de terminais, que por sua vez se conecta ao mainframe através de uma única linha de comunicação (frequentemente usando protocolos como BSC ou SDLC).
2.  **Redes de Automação Industrial (SCADA):** Em alguns sistemas SCADA (Supervisory Control and Data Acquisition), múltiplos dispositivos remotos (RTUs - Remote Terminal Units) em campo podem compartilhar uma linha de comunicação (rádio ou cabo) para reportar dados a uma estação mestre central.
3.  **Topologia de Barramento (Bus) em LANs Antigas:** Redes como a Ethernet coaxial (10BASE2, 10BASE5) utilizavam uma topologia de barramento onde todos os nós compartilhavam o mesmo cabo, funcionando como uma ligação multiponto gerenciada por contenção (CSMA/CD).
4.  **Sistemas de Ponto de Venda (POS):** Algumas arquiteturas mais antigas de POS podiam ter vários caixas compartilhando uma linha para se comunicar com um servidor central.

## Características

*   **Meio Compartilhado:** Múltiplos dispositivos usam o mesmo canal físico.
*   **Relação Primário/Secundário (Comum):** Geralmente envolve um host controlando múltiplos terminais.
*   **Necessidade de Controle de Acesso ao Meio (MAC):** Protocolos são necessários para evitar ou gerenciar colisões (ex: [[Selection_e_Polling]], [[Contention]]).
*   **Endereçamento:** Mensagens enviadas pelo primário precisam endereçar o secundário específico, e mensagens dos secundários precisam identificar sua origem.
*   **Operação Half-Duplex (Comum no Meio Compartilhado):** Frequentemente, a transmissão no meio compartilhado ocorre em modo half-duplex.

## Vantagens

*   **Economia de Custo (Cabeamento/Linhas):** Reduz significativamente o número de linhas de comunicação necessárias em comparação com a conexão de cada terminal ao host através de uma linha ponto a ponto dedicada.
*   **Utilização Eficiente da Linha (em certos cenários):** Se o tráfego de cada terminal for baixo e intermitente, compartilhar uma linha pode ser mais eficiente do que ter múltiplas linhas dedicadas subutilizadas.
*   **Simplicidade Estrutural (em alguns casos):** A topologia física pode ser mais simples de implementar.

## Desvantagens

*   **Largura de Banda Compartilhada:** A capacidade total da linha é dividida entre todos os terminais. O desempenho degrada à medida que o número de terminais ou o volume de tráfego aumenta.
*   **Complexidade do Protocolo MAC:** Os protocolos de polling/selection ou contenção adicionam complexidade e overhead.
*   **Atrasos (Polling Latency):** Em sistemas baseados em polling, um terminal pode ter que esperar sua vez de ser sondado, mesmo que tenha dados prontos para enviar.
*   **Ponto Único de Falha:** Uma falha na linha compartilhada ou no dispositivo primário pode afetar a comunicação com todos os terminais secundários.
*   **Menor Taxa de Transferência Efetiva:** Devido ao compartilhamento e ao overhead do protocolo MAC, a taxa de transferência útil por terminal é geralmente baixa.
*   **Dificuldade de Diagnóstico:** Isolar problemas em uma linha compartilhada pode ser mais complexo.

## Notas Relacionadas

*   [[Ligação_Ponto_a_Ponto_Dedicado]]
*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Contention]]
*   [[Selection_e_Polling]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]

