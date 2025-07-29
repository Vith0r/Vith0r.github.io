---
Tema Principal: "16-Transmissão Serial"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Redes de Computadores, Interfaces de Comunicação, Eletrônica Digital"
Tags:
  - "Transmissão"
  - "Serial"
  - "Comunicação"
  - "Redes"
  - "Interface"
---

# 16-Transmissão Serial

---

![[5.svg]]

---
## Visão Geral

A transmissão serial é um método fundamental para enviar dados digitais onde os bits que compõem uma unidade de informação (como um byte ou caractere) são transmitidos sequencialmente, um após o outro, através de um único fio ou canal de comunicação. Este método contrasta com a transmissão paralela, onde múltiplos bits são enviados simultaneamente por múltiplos fios. Embora historicamente pudesse ser considerada mais lenta que a paralela para a mesma frequência de clock, a transmissão serial tornou-se dominante na maioria das interfaces de comunicação modernas (como USB, Ethernet, SATA) devido à sua simplicidade em termos de cabeamento, menor suscetibilidade a ruídos e interferências em altas velocidades e longas distâncias, e avanços nas técnicas de sinalização que permitem taxas de transferência extremamente altas.

## Definição

Transmissão serial é o processo de enviar dados um bit de cada vez, sequencialmente, sobre um canal de comunicação. Para que o receptor possa reconstruir a informação original, os bits devem ser enviados em uma ordem específica e, geralmente, mecanismos de sincronização são necessários para que o receptor saiba quando cada bit começa e termina. Essa sincronização pode ser feita de forma assíncrona (usando bits de start/stop) ou síncrona (usando um sinal de clock compartilhado ou embutido no próprio sinal de dados).

## Exemplos

1.  **Interface RS-232:** Um padrão clássico para comunicação serial, comumente usado em modems antigos, mouses seriais e equipamentos industriais.
2.  **USB (Universal Serial Bus):** A interface onipresente para conectar periféricos a computadores.
3.  **Ethernet (sobre par trançado e fibra óptica):** Embora possa parecer complexa, a transmissão fundamental em redes Ethernet modernas é serial em cada par de fios ou fibra.
4.  **SATA (Serial ATA):** Interface padrão para conectar discos rígidos e SSDs a placas-mãe.
5.  **PCI Express (PCIe):** Interface de alta velocidade para conectar placas de expansão (vídeo, rede) à placa-mãe, utiliza múltiplas "lanes" seriais.
6.  **I²C e SPI:** Protocolos seriais comuns para comunicação entre circuitos integrados em curtas distâncias dentro de um dispositivo eletrônico.
7.  **MIDI (Musical Instrument Digital Interface):** Padrão para conectar instrumentos musicais eletrônicos e computadores.

## Características

*   **Sequencial:** Bits são enviados um após o outro.
*   **Canal Único (por direção):** Geralmente utiliza um único fio ou par diferencial para transmitir dados em uma direção.
*   **Sincronização Necessária:** Requer métodos para alinhar o transmissor e o receptor (assíncrono ou síncrono).
*   **Menos Fios:** Utiliza significativamente menos condutores do que a transmissão paralela para a mesma largura de dados.
*   **Adequada para Longas Distâncias:** Menos problemas com desalinhamento temporal entre bits (skew) que afetam transmissões paralelas em longos cabos.
*   **Hardware SERDES:** Requer circuitos de Serialização/Desserialização para converter dados paralelos (como dentro do computador) em seriais para transmissão, e vice-versa.

## Vantagens

*   **Menor Custo de Cabeamento:** Menos fios resultam em cabos mais finos, mais baratos e mais fáceis de manusear.
*   **Menor Complexidade de Conectores:** Conectores podem ser menores e mais simples.
*   **Menor Interferência e Ruído:** Menos fios significam menos diafonia (crosstalk) entre eles. Técnicas como pares diferenciais melhoram ainda mais a imunidade a ruído.
*   **Melhor Desempenho em Altas Frequências/Longas Distâncias:** A ausência de problemas de "skew" (diferença no tempo de chegada dos bits em fios paralelos) permite atingir taxas de bits muito mais altas em transmissões seriais modernas.
*   **Facilidade de Isolação Óptica:** Mais simples de implementar com fibra óptica.

## Desvantagens

*   **Menor Taxa de Transferência (Histórica/Mesmo Clock):** Para uma mesma frequência de clock, uma interface paralela de N bits pode, teoricamente, transferir N vezes mais dados que uma serial. No entanto, as interfaces seriais modernas operam em frequências muito mais altas, superando as paralelas.
*   **Necessidade de Circuitos SERDES:** Requer hardware adicional para converter entre os formatos paralelo e serial.
*   **Protocolos Potencialmente Mais Complexos:** A necessidade de incorporar informações de sincronização e framing no fluxo de bits pode adicionar complexidade ao protocolo.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Transmissão_Simplex]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Transmissão_Paralela]]
*   [[Transmissão_Assíncrona]]
*   [[Transmissão_Síncrona]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

