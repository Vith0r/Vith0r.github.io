---
Tema Principal: "60-Enlaces"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Redes de Computadores, Telecomunicações"
Tags:
  - "Enlace"
  - "Link"
  - "Conexão"
  - "Redes"
  - "Comunicação"
---

# 60-Enlaces

---

![[12.svg]]

---
## Visão Geral

Em redes de computadores e telecomunicações, um **enlace** (ou **link**, em inglês) refere-se ao caminho de comunicação físico ou lógico que conecta dois ou mais nós (dispositivos) para permitir a transmissão de dados entre eles. É o componente fundamental que possibilita a troca de informações em qualquer rede. Os enlaces podem variar enormemente em suas características, dependendo do meio físico utilizado (cobre, fibra óptica, ondas de rádio), da topologia (ponto a ponto, multiponto), da tecnologia de transmissão (Ethernet, Wi-Fi, T1/E1) e dos protocolos utilizados para gerenciar a comunicação sobre ele (camada de enlace de dados). Compreender os diferentes tipos e características dos enlaces é essencial para projetar, implementar e gerenciar redes eficientes e confiáveis.

## Definição

Um enlace de comunicação é o meio de transmissão e os protocolos associados que conectam dois ou mais dispositivos (nós) em uma rede, permitindo que eles troquem dados. Pode referir-se tanto à conexão física (o cabo, a fibra, o canal de rádio) quanto à conexão lógica estabelecida sobre essa infraestrutura física pela camada de enlace de dados (Camada 2 do modelo OSI), que é responsável por tarefas como enquadramento (framing), controle de acesso ao meio (MAC) e detecção de erros sobre o enlace físico.

## Exemplos

*   **Enlace Físico:**
    *   Um cabo Ethernet UTP conectando um computador a um switch ([[Meio_Físico_Par_Trançado]]).
    *   Uma fibra óptica conectando dois roteadores em um backbone ([[Meio_Físico_Fibra_Óptica]]).
    *   O canal de rádio entre um laptop e um ponto de acesso Wi-Fi ([[Meio_Físico_Wireless]]).
    *   Uma linha T1/E1 conectando dois escritórios via infraestrutura da operadora ([[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]).
    *   Uma conexão dial-up estabelecida sobre a linha telefônica ([[Linhas_Discadas_–_LD]]).
*   **Enlace Lógico (Camada 2):**
    *   Um enlace Ethernet entre duas placas de rede.
    *   Um enlace PPP (Point-to-Point Protocol) sobre uma linha serial ou DSL.
    *   Um enlace HDLC sobre uma linha dedicada.
    *   Um circuito virtual em uma rede Frame Relay ou ATM.

## Características

Enlaces podem ser caracterizados por diversos atributos:
*   **Meio Físico:** Cobre (par trançado, coaxial), fibra óptica, ondas de rádio (wireless), satélite.
*   **Topologia:**
    *   **Ponto a Ponto:** Conecta exatamente dois nós ([[Ligação_Ponto_a_Ponto_Dedicado]], [[Ligação_Ponto_a_Ponto_Comutado]]).
    *   **Multiponto (Broadcast/Compartilhado):** Conecta mais de dois nós, onde a transmissão de um pode ser recebida por múltiplos outros (ex: Ethernet antiga com hub, Wi-Fi). [[Ligação_Multiponto]]
*   **Modo de Transmissão:** Simplex, Half-Duplex, Full-Duplex ([[Transmissão_Simplex]], [[Transmissão_Half_Duplex]], [[Transmissão_Full_Duplex]]).
*   **Largura de Banda/Taxa de Transferência:** A capacidade máxima de transmissão do enlace (ex: 100 Mbps, 1 Gbps).
*   **Latência:** O tempo de atraso para um sinal percorrer o enlace.
*   **Confiabilidade:** A probabilidade de erros ocorrerem durante a transmissão (medida por BER, etc. [[Medição_de_Erros_em_Transmissão_de_Dados]]).
*   **Tipo de Conexão:** Dedicado/Privado ([[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]) ou Comutado/Compartilhado ([[Linhas_Discadas_–_LD]], Internet pública).

## Vantagens (de ter Enlaces)

*   **Conectividade:** Permitem que dispositivos se comuniquem e compartilhem recursos.
*   **Base da Rede:** São os blocos de construção fundamentais de qualquer topologia de rede.

## Desvantagens (Limitações dos Enlaces)

*   **Custo:** Implementar e manter enlaces físicos pode ser caro (cabeamento, aluguel de linhas).
*   **Limitações Físicas:** Cada tipo de enlace tem limitações de distância, velocidade e suscetibilidade a interferências.
*   **Congestionamento:** Enlaces compartilhados podem sofrer congestionamento se muitos dispositivos tentarem transmitir ao mesmo tempo.
*   **Falhas:** Enlaces físicos podem falhar (cabo rompido, interferência de rádio), interrompendo a comunicação.

## Seção Expandida: Enlace Físico vs. Enlace de Dados

É importante distinguir o enlace físico da camada de enlace de dados:
*   **Camada Física (Camada 1 OSI):** Lida com a transmissão bruta de bits sobre o meio físico. Define as características elétricas, ópticas ou de rádio, conectores, pinagens e a codificação dos bits em sinais. O enlace físico é o próprio meio.
*   **Camada de Enlace de Dados (Camada 2 OSI):** Fornece transferência de dados confiável (ou não confiável, dependendo do protocolo) através do enlace físico. Ela organiza os bits em quadros (frames), adiciona endereços físicos (MAC addresses), realiza detecção de erros (ex: CRC [[Método_Cyclic_Redundancy_Checking_(CRC)]]) e controla o acesso ao meio compartilhado. O enlace lógico é estabelecido por esta camada.

Um enlace funcional requer ambas as camadas operando corretamente.

## Notas Relacionadas

*   [[Transmissão_Simplex]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Ligação_Ponto_a_Ponto_Dedicado]]
*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Ligação_Multiponto]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]
*   [[Linhas_Discadas_–_LD]]
*   [[LDL_–_Loop_Digital_Local]]
*   [[LAL_–_Loop_Analógico_Local]]
*   [[LDR_–_Loop_Digital_Remoto]]
*   [[LAR_–_Loop_Analógico_Remoto]]
*   [[Protocolos_de_Comunicação]]
*   [[Meio_Físico_Coaxial]]
*   [[Meio_Físico_Wireless]]
*   [[Meio_Físico_Par_Trançado]]

