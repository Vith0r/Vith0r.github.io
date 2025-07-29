---
Tema Principal: 17-Transmissão Paralela
Nível de Dificuldade: Básico
Fonte/Referência: Arquitetura de Computadores, Interfaces de Comunicação, Eletrônica Digital
tags:
  - Transmissão
  - Comunicação
  - Interface
  - Barramento
---

# 17-Transmissão Paralela

---

![[6.svg]]

---
## Visão Geral

A transmissão paralela é um método de enviar dados digitais onde múltiplos bits de uma unidade de informação (como um byte) são transmitidos simultaneamente através de múltiplos fios ou canais de comunicação paralelos. Cada bit viaja em seu próprio fio dedicado. Historicamente, essa foi a abordagem predominante para comunicação de alta velocidade em curtas distâncias, como entre a CPU e a memória de um computador ou para conectar impressoras (porta paralela Centronics). A principal vantagem percebida era a capacidade de transferir mais dados por ciclo de clock em comparação com a transmissão serial operando na mesma frequência. No entanto, desafios como custo de cabeamento, complexidade de conectores e problemas de sincronização em altas velocidades (skew) levaram à sua substituição pela transmissão serial na maioria das interfaces modernas.

## Definição

Transmissão paralela é o processo de enviar múltiplos bits de dados simultaneamente sobre múltiplos canais (geralmente fios em um cabo). Se uma interface paralela tem N fios de dados, ela pode transmitir N bits a cada ciclo de clock. Além dos fios de dados, geralmente são necessários fios adicionais para controle (indicando quando os dados estão válidos, por exemplo) e, às vezes, um fio de clock compartilhado para sincronização.

## Exemplos

1.  **Barramentos Internos de Computador (Antigos/Atuais):** Barramentos como ISA, PCI (Parallel Component Interconnect) e barramentos de memória (conectando CPU e RAM) utilizam transmissão paralela para transferir grandes quantidades de dados rapidamente em curtas distâncias dentro da placa-mãe.
2.  **Interface de Impressora Centronics (Porta Paralela):** O padrão clássico (IEEE 1284) para conectar impressoras a PCs, usando um cabo largo com muitos pinos para transmitir 8 bits de dados por vez, além de sinais de controle.
3.  **Interface SCSI (Small Computer System Interface) Paralela:** Usada para conectar discos rígidos, scanners e outros periféricos, especialmente em servidores e workstations mais antigos. Utilizava cabos largos com 50, 68 ou 80 pinos.
4.  **Interface IDE/ATA (Integrated Drive Electronics / AT Attachment) Paralela (PATA):** O padrão dominante por muitos anos para conectar discos rígidos e drives ópticos em PCs, usando cabos planos de 40 ou 80 vias.
5.  **Comunicação entre Chips em Placas de Circuito:** Em distâncias muito curtas, a comunicação paralela ainda é usada entre certos componentes em uma placa.

## Características

*   **Simultaneidade:** Múltiplos bits são enviados ao mesmo tempo.
*   **Múltiplos Canais:** Requer um fio ou canal dedicado para cada bit transmitido em paralelo.
*   **Sincronização Crítica (em altas velocidades):** Garantir que todos os bits cheguem ao receptor ao mesmo tempo (ou dentro de uma janela aceitável) torna-se difícil em altas frequências e cabos longos devido ao "skew" (diferenças nos tempos de propagação entre os fios).
*   **Maior Número de Fios:** Requer cabos e conectores com muitos pinos.
*   **Ideal para Curtas Distâncias:** O problema de skew limita o comprimento prático dos cabos para altas velocidades.

## Vantagens

*   **Alta Taxa de Transferência (a baixas frequências/curtas distâncias):** Para uma dada frequência de clock, pode transferir mais bits por ciclo do que uma interface serial.
*   **Simplicidade de Protocolo (em alguns casos):** A lógica para enviar e receber múltiplos bits de uma vez pode ser mais simples em termos de framing do que em interfaces seriais complexas.
*   **Latência Potencialmente Menor (em curtas distâncias):** Menos overhead de serialização/desserialização.

## Desvantagens

*   **Custo de Cabeamento e Conectores:** Cabos com muitos fios são mais caros, mais grossos e menos flexíveis. Conectores são maiores e mais complexos.
*   **Problema de Skew:** A principal limitação para altas velocidades e longas distâncias. Pequenas diferenças no comprimento ou características elétricas dos fios fazem com que os bits cheguem dessincronizados.
*   **Interferência e Diafonia (Crosstalk):** Mais fios próximos aumentam a chance de interferência eletromagnética entre eles.
*   **Limitação de Distância:** O skew e o ruído limitam severamente o comprimento máximo do cabo para operação confiável em altas velocidades.
*   **Consumo de Energia:** Múltiplos drivers de linha podem consumir mais energia.
*   **Dificuldade de Implementação Óptica:** Implementar transmissão paralela sobre fibra óptica é muito mais complexo e caro do que serial.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Transmissão_Simplex]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Assíncrona]]
*   [[Transmissão_Síncrona]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

