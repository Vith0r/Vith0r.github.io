---
Tema Principal: 38-Concentrador e Conversor
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Telecomunicações, Hardware de Rede
tags:
  - Redes
  - Hardware
  - Multiplexação
---

# 38-Concentrador e Conversor

## Visão Geral

Concentradores e conversores são categorias de dispositivos de hardware utilizados em redes de comunicação para agregar tráfego, adaptar interfaces ou modificar sinais, otimizando a infraestrutura e permitindo a interconexão de diferentes tipos de equipamentos ou meios. Um **concentrador** tipicamente combina múltiplos fluxos de dados de baixa velocidade de vários dispositivos em um único fluxo de maior velocidade, de forma mais inteligente que um simples multiplexador, muitas vezes envolvendo armazenamento temporário (buffering) e algum nível de processamento. Um **conversor**, por outro lado, foca na adaptação de sinais ou protocolos entre diferentes padrões ou meios físicos (ex: elétrico para óptico, serial para paralelo, protocolo A para protocolo B).

## Definição

*   **Concentrador:** Um dispositivo que coleta dados de múltiplas linhas de entrada (geralmente de baixa velocidade e de múltiplos terminais) e os transmite sobre uma única linha de saída compartilhada de maior velocidade para um destino central (como um host). Diferente de um multiplexador TDM síncrono que aloca slots fixos, um concentrador geralmente usa TDM estatístico ou outras técnicas que envolvem buffering e alocação dinâmica, sendo mais eficiente para tráfego em rajadas. Ele pode realizar funções como controle de erros e fluxo localmente.
*   **Conversor:** Um dispositivo que transforma sinais ou dados de um formato, protocolo ou meio físico para outro, permitindo a comunicação entre sistemas ou componentes que, de outra forma, seriam incompatíveis. Exemplos incluem conversores de mídia (elétrico/óptico), conversores de protocolo e conversores de interface (serial/paralelo).

## Exemplos

**Concentradores:**
1.  **Concentradores de Terminais (Histórico):** Semelhantes às [[Unidade_Controladora_de_Terminais]], mas às vezes com menos inteligência, focando na agregação de linhas de terminais assíncronos em uma linha síncrona para o host.
2.  **Concentradores de Acesso Remoto (RAS - Remote Access Server):** Agregam múltiplas conexões dial-up, ISDN ou VPN de usuários remotos em uma conexão de alta velocidade para a rede corporativa.
3.  **Concentradores DSLAM (Digital Subscriber Line Access Multiplexer):** Localizados na central telefônica, agregam o tráfego DSL de centenas ou milhares de assinantes em um backbone de alta velocidade.
4.  **Hubs USB (em certo sentido):** Concentram múltiplas portas USB em uma única conexão com o computador host (embora a arquitetura USB seja mais complexa).

**Conversores:**
1.  **Conversores de Mídia (Media Converters):** Convertem sinais entre cabo de par trançado (Ethernet elétrico) e fibra óptica, permitindo estender redes Ethernet por longas distâncias.
2.  **Conversores de Protocolo:** Traduzem entre diferentes protocolos de comunicação (ex: converter SNA para TCP/IP, ou Modbus RTU para Modbus TCP).
3.  **Conversores de Interface:** Adaptam diferentes interfaces físicas ou elétricas (ex: RS-232 para RS-485, USB para Serial).
4.  **Conversores Analógico-Digital (ADC) e Digital-Analógico (DAC):** Convertem sinais entre os domínios analógico e digital.
5.  **Adaptadores de Rede (NICs):** Convertem os dados paralelos do barramento do computador em sinais seriais adequados para o meio de rede (e vice-versa).

## Características

**Concentrador:**
*   Agregação de Tráfego (Muitos para Um).
*   Buffering e Armazenamento Temporário.
*   Multiplexação Estatística (Comum).
*   Pode realizar controle de fluxo/erro local.
*   Otimiza uso de linha de alta velocidade.

**Conversor:**
*   Transformação de Sinal/Protocolo/Meio.
*   Adaptação de Interfaces.
*   Permite Interoperabilidade.
*   Geralmente opera em nível físico ou de enlace.
*   Pode ser bidirecional.

## Vantagens

**Concentrador:**
*   **Economia de Linhas:** Reduz o número de linhas de longa distância necessárias.
*   **Eficiência para Tráfego em Rajadas:** Mais eficiente que TDM síncrono quando as fontes de dados são intermitentes.
*   **Centralização:** Simplifica a conexão de múltiplos dispositivos remotos.

**Conversor:**
*   **Interoperabilidade:** Permite conectar dispositivos ou redes incompatíveis.
*   **Extensão de Rede:** Conversores de mídia permitem usar diferentes meios físicos para superar limitações de distância.
*   **Flexibilidade:** Permite integrar tecnologias legadas com sistemas modernos.
*   **Reutilização de Equipamentos:** Permite usar equipamentos existentes com novas infraestruturas.

## Desvantagens

**Concentrador:**
*   **Atraso:** O buffering e processamento introduzem latência.
*   **Potencial Gargalo:** A capacidade do concentrador e da linha de saída pode limitar o desempenho.
*   **Complexidade:** Mais complexo que um simples multiplexador.
*   **Ponto Único de Falha:** Sua falha afeta todos os dispositivos conectados.

**Conversor:**
*   **Atraso:** A conversão pode introduzir latência.
*   **Ponto Único de Falha:** Sua falha interrompe a comunicação entre os sistemas conectados.
*   **Custo:** Adiciona um componente (e custo) extra ao caminho da comunicação.
*   **Limitações de Desempenho:** A conversão pode não ser capaz de operar na velocidade máxima dos sistemas conectados.
*   **Complexidade de Gerenciamento:** Adiciona mais um dispositivo para gerenciar na rede.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Multiplexação]]
*   [[Unidade_de_Derivação_Digital_(UDD)_e_Unidade_de_Derivação_Analógica_(UDA)]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

