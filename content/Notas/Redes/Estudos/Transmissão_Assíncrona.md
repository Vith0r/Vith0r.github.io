---
Tema Principal: 18-Transmissão Assíncrona
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Interfaces de Comunicação Serial
tags:
  - Transmissão
  - Serial
  - Comunicação
  - Sincronização
---

# 18-Transmissão Assíncrona

---

![[7.svg]]

---
## Visão Geral

A transmissão assíncrona é um método de comunicação serial onde a sincronização temporal entre o transmissor e o receptor não é mantida continuamente através de um sinal de clock compartilhado. Em vez disso, a sincronização é restabelecida no início de cada pequena unidade de dados transmitida, tipicamente um caractere (ou byte). Isso é alcançado através do uso de bits especiais de controle, conhecidos como start bit e stop bit(s), que enquadram cada caractere. Este método é vantajoso pela sua simplicidade e baixo custo, sendo ideal para conexões onde a taxa de dados não é extremamente alta e onde pode haver períodos de inatividade (idle) entre os caracteres transmitidos, como na clássica interface RS-232.

## Definição

Na transmissão serial assíncrona, os dados são enviados caractere por caractere. Antes de cada caractere, um "start bit" (geralmente um bit de nível lógico 0) é enviado para alertar o receptor da chegada de dados e permitir que ele sincronize seu clock interno com o início do caractere. Em seguida, os bits de dados do caractere (geralmente 5 a 8 bits, comumente 7 para ASCII ou 8 para bytes) são enviados, seguidos opcionalmente por um bit de paridade para detecção de erros. Finalmente, um ou mais "stop bits" (geralmente 1, 1.5 ou 2 bits de nível lógico 1) são enviados para marcar o fim do caractere e garantir que a linha retorne ao estado ocioso (idle state, geralmente nível 1) antes do próximo start bit. O receptor usa a borda de descida do start bit para iniciar seu temporizador e amostrar os bits de dados subsequentes em intervalos de tempo esperados, baseados na taxa de transmissão (baud rate) previamente acordada.

## Exemplos

1.  **Interface RS-232:** O exemplo mais clássico de comunicação assíncrona, amplamente utilizada para conectar terminais, modems, mouses seriais e diversos equipamentos industriais e de laboratório a computadores.
2.  **MIDI (Musical Instrument Digital Interface):** A comunicação entre instrumentos musicais eletrônicos, sequenciadores e computadores via MIDI utiliza um protocolo serial assíncrono.
3.  **Comunicação com Microcontroladores (UARTs):** Muitos microcontroladores utilizam interfaces UART (Universal Asynchronous Receiver/Transmitter) para comunicação serial simples com outros dispositivos ou computadores.
4.  **Alguns Sistemas de Sensores:** Sensores que enviam dados esporadicamente podem usar comunicação assíncrona.

## Características

*   **Sincronização por Caractere:** O alinhamento temporal é feito no início de cada caractere via start bit.
*   **Framing:** Cada caractere é delimitado por start e stop bits.
*   **Sem Clock Compartilhado:** Não requer um fio de clock separado entre transmissor e receptor.
*   **Overhead:** Os start, stop e (opcionalmente) paridade bits adicionam sobrecarga à transmissão (ex: 8 bits de dados + 1 start + 1 stop = 10 bits transmitidos para 8 bits úteis).
*   **Períodos Ociosos (Idle):** A linha pode permanecer em estado ocioso (geralmente nível lógico alto) entre caracteres.
*   **Taxa de Baud (Baud Rate):** Transmissor e receptor devem estar configurados para a mesma taxa de transmissão (número de símbolos por segundo).

## Vantagens

*   **Simplicidade e Baixo Custo:** Requer hardware menos complexo (UARTs são circuitos comuns e baratos) e menos fios (sem clock dedicado).
*   **Flexibilidade:** Não exige que os clocks do transmissor e receptor sejam perfeitamente sincronizados a longo prazo, apenas que sejam estáveis o suficiente durante a transmissão de um caractere.
*   **Ideal para Dados Intermitentes:** Funciona bem quando os dados não são enviados continuamente, pois a sincronização é refeita a cada caractere.

## Desvantagens

*   **Overhead Elevado:** Os bits de framing (start/stop) consomem uma parte significativa da largura de banda (tipicamente 20% ou mais de overhead para caracteres de 8 bits com 1 start e 1 stop bit).
*   **Menor Eficiência:** A taxa de transferência de dados útil é menor que a taxa de baud devido ao overhead.
*   **Velocidade Limitada:** A resincronização a cada caractere e a dependência da estabilidade dos clocks locais limitam as velocidades máximas alcançáveis em comparação com a transmissão síncrona.
*   **Sensibilidade a Erros de Temporização:** Se os clocks do transmissor e receptor diferirem muito, o receptor pode amostrar os bits nos momentos errados, levando a erros de framing.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Código_ASCII]]
*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Transmissão_Síncrona]]
*   [[Over_Head]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
