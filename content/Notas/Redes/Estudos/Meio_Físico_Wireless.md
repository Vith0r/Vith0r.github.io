---
Tema Principal: 95-Meio Físico Wireless
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Camada Física, Tecnologias Sem Fio
tags:
  - Meio
  - Físico
  - Meio
  - Não
  - Guiado
  - Wireless
  - Fio
  - Wi-Fi
---

# 95-Meio Físico Wireless

## Visão Geral

O termo "Meio Físico Wireless" (ou Sem Fio) refere-se a qualquer meio físico não guiado ([[Meio_Físico_Não_Guiado]]) que utiliza ondas eletromagnéticas (principalmente ondas de rádio - [[Meio_Físico_Rádio]], mas também micro-ondas - [[Meio_Físico_Microondas]] e infravermelho) para transmitir informações através do ar ou do espaço, sem a necessidade de cabos. Esta categoria abrange uma vasta gama de tecnologias que permitem a comunicação de dados, voz e vídeo entre dispositivos, oferecendo mobilidade e flexibilidade. As aplicações mais conhecidas em redes de computadores incluem Redes Locais Sem Fio (WLANs) baseadas no padrão IEEE 802.11 (Wi-Fi) e Redes Pessoais Sem Fio (WPANs) como Bluetooth.

## Definição

Meio Físico Wireless é a utilização de ondas eletromagnéticas propagando-se pelo espaço livre como canal de comunicação para transmitir sinais entre dispositivos de rede. A comunicação ocorre através de antenas que convertem sinais elétricos em ondas eletromagnéticas (transmissor) e vice-versa (receptor).

## Exemplos

*   **Wi-Fi (IEEE 802.11):** Padrão dominante para WLANs, operando nas faixas de 2.4 GHz, 5 GHz e 6 GHz. Usado para conectar computadores, laptops, smartphones, etc., a uma rede local e à Internet através de Pontos de Acesso (APs).
*   **Bluetooth (IEEE 802.15.1):** Tecnologia de WPAN para comunicação sem fio de curto alcance e baixo consumo de energia entre dispositivos como fones de ouvido, teclados, mouses, smartphones e alto-falantes.
*   **Zigbee (IEEE 802.15.4):** Padrão de WPAN de baixo consumo e baixa taxa de dados, frequentemente usado em automação residencial, redes de sensores e Internet das Coisas (IoT).
*   **Z-Wave:** Outro protocolo de WPAN popular para automação residencial.
*   **NFC (Near Field Communication):** Comunicação sem fio de curtíssimo alcance (poucos centímetros), usada para pagamentos móveis, pareamento de dispositivos e troca de dados simples.
*   **Redes Celulares (3G, 4G/LTE, 5G):** Usam ondas de rádio para comunicação móvel de longa distância ([[Redes_Metropolitanas_e_de_Longa_Distância_(MAN_e_WAN)]]).
*   **Comunicações por Satélite:** Usam micro-ondas para comunicação de longa distância via satélites.
*   **Infravermelho (IrDA - legado):** Comunicação de curto alcance e linha de visada.

## Características

*   **Transmissão pelo Espaço Livre:** Usa ondas de rádio, micro-ondas ou infravermelho.
*   **Mobilidade:** Permite que dispositivos se conectem e se movam livremente dentro da área de cobertura.
*   **Não Requer Cabeamento Físico:** Instalação mais flexível.
*   **Uso de Antenas:** Necessárias para transmitir e receber sinais.
*   **Espectro de Frequência:** Opera em faixas de frequência específicas (muitas vezes compartilhadas e regulamentadas).
*   **Suscetibilidade a Interferência:** Vulnerável a interferências de outras fontes sem fio, obstáculos físicos e condições ambientais.
*   **Segurança:** Requer mecanismos de segurança (criptografia, autenticação) para proteger a comunicação.
*   **Largura de Banda Variável:** Depende da tecnologia, frequência, distância e condições do ambiente.

## Vantagens

*   **Mobilidade e Conveniência:** Principal benefício, permitindo conexão em qualquer lugar dentro da área de cobertura.
*   **Flexibilidade de Instalação:** Mais fácil e rápido de implantar em muitos ambientes, sem a necessidade de passar cabos.
*   **Suporte a Múltiplos Dispositivos:** Permite que muitos dispositivos se conectem facilmente (smartphones, tablets, laptops).
*   **Custo (Infraestrutura Inicial):** Pode ser mais barato instalar uma rede sem fio básica do que cabear um edifício inteiro.

## Desvantagens

*   **Desempenho:** Geralmente oferece menor largura de banda e maior latência do que conexões cabeadas equivalentes (embora as tecnologias mais recentes estejam diminuindo essa diferença).
*   **Interferência:** Suscetível a interferências de outros dispositivos Wi-Fi, Bluetooth, fornos de micro-ondas, telefones sem fio, etc., além de obstáculos físicos (paredes, móveis).
*   **Segurança:** Mais vulnerável a interceptação e acesso não autorizado se não for devidamente protegida com criptografia forte (WPA2/WPA3) e autenticação.
*   **Alcance Limitado:** O alcance do sinal é limitado e pode ser afetado por materiais de construção e layout do ambiente.
*   **Confiabilidade:** A qualidade da conexão pode ser menos estável do que a de uma conexão cabeada devido a flutuações no sinal e interferências.

## Seção Expandida: Wi-Fi (IEEE 802.11)

O Wi-Fi é a tecnologia wireless mais onipresente para redes locais. Opera principalmente nas faixas de 2.4 GHz (maior alcance, mais interferência, menor velocidade) e 5 GHz (menor alcance, menos interferência, maior velocidade), com o padrão mais recente (Wi-Fi 6E/7) adicionando a faixa de 6 GHz. Utiliza um método de acesso ao meio chamado CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance), onde os dispositivos escutam o meio antes de transmitir e usam mecanismos para tentar evitar colisões, em vez de apenas detectá-las como no CSMA/CD da Ethernet legada ([[Rede_Barra]]).

Os padrões Wi-Fi evoluíram significativamente:
*   802.11b (11 Mbps, 2.4 GHz)
*   802.11a (54 Mbps, 5 GHz)
*   802.11g (54 Mbps, 2.4 GHz)
*   802.11n (Wi-Fi 4, até 600 Mbps, 2.4/5 GHz, MIMO)
*   802.11ac (Wi-Fi 5, até Gbps, 5 GHz, MU-MIMO)
*   802.11ax (Wi-Fi 6/6E, maior eficiência e velocidade, 2.4/5/6 GHz, OFDMA, MU-MIMO aprimorado)
*   802.11be (Wi-Fi 7, velocidades ainda maiores, MLO - Multi-Link Operation)

## Notas Relacionadas

*   [[Rede_Estrela]] (Topologia lógica comum em Wi-Fi com AP)
*   [[Redes_Locais_(LAN)]]
*   [[Modelo_de_Referência_OSI]] (Camada 1 e 2)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Guiado]] (Contraste)
*   [[Meio_Físico_Não_Guiado]]
*   [[Meio_Físico_Rádio]]
*   [[Meio_Físico_Microondas]]
*   [[Largura_de_Banda]]
