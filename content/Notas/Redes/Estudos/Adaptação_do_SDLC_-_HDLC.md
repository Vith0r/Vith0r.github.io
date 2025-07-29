---
Tema Principal: 73-Adaptação do SDLC - HDLC
Nível de Dificuldade: Avançado
Fonte/Referência: Redes de Computadores, Protocolos de Comunicação, Padrões ISO
tags:
  - Protocolo
  - Enlace
  - Dados
  - ISO
---

# 73-Adaptação do SDLC - HDLC

## Visão Geral

O HDLC (High-Level Data Link Control) é um protocolo de enlace de dados (Camada 2) orientado a bits, síncrono, desenvolvido pela ISO (International Organization for Standardization) a partir do protocolo SDLC (Synchronous Data Link Control) da IBM. O SDLC foi um dos primeiros protocolos de enlace orientados a bits, projetado para a arquitetura SNA (Systems Network Architecture) da IBM. O HDLC padronizou e expandiu os conceitos do SDLC, tornando-se uma base influente para muitos outros protocolos de enlace, incluindo PPP (Point-to-Point Protocol), Frame Relay e ISDN (LAPD). Ele define regras para encapsulamento de dados em quadros (frames), endereçamento, controle de fluxo e controle de erros em links de comunicação síncronos, suportando topologias ponto a ponto e multiponto.

## Definição

HDLC é um protocolo padrão da ISO (ISO/IEC 13239) para a camada de enlace de dados que especifica um método de encapsulamento de dados em quadros para transmissão sobre links seriais síncronos. Ele utiliza um delimitador de quadro único (flag) `01111110` (ou 0x7E) no início e no fim de cada quadro e emprega a técnica de inserção de bits (bit stuffing) para garantir que esse padrão de flag não ocorra acidentalmente dentro dos dados. O HDLC define diferentes tipos de quadros (Informação, Supervisão, Não numerados) e modos de operação para gerenciar a comunicação.

**Adaptação do SDLC:** O HDLC adotou a estrutura básica de quadros e a filosofia orientada a bits do SDLC, mas introduziu mais flexibilidade:
*   **Endereçamento Extendido:** HDLC suporta endereços mais longos.
*   **Campos de Controle Extendidos:** Permite números de sequência maiores (7 bits vs 3 bits no SDLC original).
*   **Modos de Operação Adicionais:** Além do Modo de Resposta Normal (NRM) do SDLC, HDLC introduziu o Modo de Resposta Assíncrono (ARM) e o Modo Balanceado Assíncrono (ABM).
*   **Padronização ISO:** Tornou-se um padrão internacional, enquanto SDLC era proprietário da IBM.

## Exemplos (Derivados e Usos)

*   **PPP (Point-to-Point Protocol):** Embora use um formato de quadro ligeiramente diferente (sem alguns campos do HDLC), o mecanismo de delimitação de quadros e a filosofia geral do PPP são fortemente baseados no HDLC. Usado extensivamente em conexões dial-up e DSL.
*   **LAPB (Link Access Procedure, Balanced):** Usado no protocolo X.25 ([[Protocolo_X.25]]). É um subconjunto do modo ABM do HDLC.
*   **LAPD (Link Access Procedure on the D-channel):** Usado no canal D do ISDN para sinalização. Baseado no LAPB/HDLC.
*   **Frame Relay:** Utiliza uma estrutura de quadro simplificada derivada do HDLC.
*   **Links Seriais Dedicados:** HDLC (ou variantes) foi frequentemente usado para encapsulamento em linhas seriais síncronas dedicadas conectando roteadores.

## Características (Estrutura do Quadro HDLC Típico)

*   **Flag:** `01111110` - Delimitador de início e fim do quadro.
*   **Endereço:** Identifica a estação secundária em configurações multiponto (ou usado para outros fins em ponto a ponto).
*   **Controle:** Campo crucial que define o tipo de quadro (Informação - I-frame, Supervisão - S-frame, Não numerado - U-frame) e contém números de sequência (Ns, Nr) para controle de fluxo e erro (em I-frames e S-frames) ou códigos de controle (em U-frames).
*   **Informação (Payload):** Contém os dados da camada superior (opcional, presente apenas em I-frames).
*   **FCS (Frame Check Sequence):** Sequência de verificação de quadro (geralmente CRC-16 ou CRC-32) para detecção de erros. [[Método_Cyclic_Redundancy_Checking_(CRC)]]
*   **Bit Stuffing:** Insere um bit 0 após cinco bits 1 consecutivos dentro dos campos Endereço, Controle, Informação e FCS para evitar que o padrão de flag apareça acidentalmente.

**Modos de Operação:**
*   **NRM (Normal Response Mode):** Configuração não balanceada (primário-secundário). Secundários só transmitem quando explicitamente permitido pelo primário. Usado em multiponto.
*   **ARM (Asynchronous Response Mode):** Não balanceado. Secundários podem transmitir sem permissão explícita, mas o primário ainda tem responsabilidade geral. (Raramente usado).
*   **ABM (Asynchronous Balanced Mode):** Configuração balanceada ponto a ponto. Ambas as estações são combinadas (iguais) e podem iniciar transmissões a qualquer momento. É o modo mais comum hoje (usado em LAPB, LAPD).

## Vantagens

*   **Eficiência:** Orientado a bits, com baixo overhead de protocolo (comparado a protocolos orientados a caracteres).
*   **Flexibilidade:** Suporta diferentes topologias (ponto a ponto, multiponto) e modos de operação.
*   **Controle de Fluxo e Erro:** Inclui mecanismos robustos baseados em números de sequência (semelhante a TCP).
*   **Padronização:** Como padrão ISO, promoveu interoperabilidade.
*   **Influência:** Serviu de base para muitos protocolos de enlace subsequentes.

## Desvantagens

*   **Complexidade:** A implementação completa do HDLC com todos os modos e opções pode ser complexa.
*   **Síncrono:** Requer links síncronos, que são menos comuns hoje em dia do que links assíncronos ou baseados em pacotes como Ethernet.
*   **Overhead (Comparado a Ethernet Simples):** Embora eficiente para links seriais, pode ter mais overhead do que o necessário em links muito confiáveis como Ethernet ponto a ponto.
*   **Substituído em LANs:** Em redes locais, foi completamente substituído por Ethernet.

## Notas Relacionadas

*   [[Transmissão_Síncrona]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Método_Cyclic_Redundancy_Checking_(CRC)]]
*   [[Enlaces]]
*   [[Protocolos_de_Comunicação]]
*   [[Protocolo_X.25]]

