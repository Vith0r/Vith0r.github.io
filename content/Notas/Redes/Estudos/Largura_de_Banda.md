---
Tema Principal: 100-Largura de Banda
Nível de Dificuldade: Fundamental
Fonte/Referência: Redes de Computadores, Telecomunicações, Teoria da Informação
tags:
  - Transferência
  - Velocidade
---

# 100-Largura de Banda

## Visão Geral

Largura de banda (bandwidth) é um conceito fundamental em redes de computadores e telecomunicações que se refere à capacidade máxima de um canal de comunicação transmitir dados. Existem duas interpretações principais do termo:

1.  **Largura de Banda Analógica:** Em sistemas analógicos (como rádio - [[Meio_Físico_Rádio]]), refere-se à largura da faixa de frequência (medida em Hertz, Hz) que um sinal ocupa ou que um canal pode transmitir. É a diferença entre a frequência mais alta e a mais baixa do sinal ou canal.
2.  **Largura de Banda Digital (Taxa de Transferência):** Em sistemas digitais (o foco principal em redes de computadores), refere-se à taxa máxima na qual os dados podem ser transferidos através de um link ou rede, geralmente medida em bits por segundo (bps) e seus múltiplos (Kbps, Mbps, Gbps, Tbps). Esta é a interpretação mais comum no contexto de redes.

Embora relacionadas (maior largura de banda analógica geralmente permite maior taxa de transferência digital), não são a mesma coisa. A largura de banda digital representa a "capacidade do cano", enquanto a taxa de transferência real (throughput) representa quantos dados realmente passam por ele em um determinado momento, podendo ser menor devido a fatores como latência, erros, congestionamento e overhead de protocolos.

## Definição

*   **Largura de Banda (Analógica):** A faixa de frequências contida em um sinal ou que pode ser transmitida por um canal, medida em Hertz (Hz). `Largura de Banda = Frequência Máxima - Frequência Mínima`.
*   **Largura de Banda (Digital) / Taxa de Transferência Máxima:** A quantidade máxima de dados digitais que podem ser transmitidos por um canal de comunicação em um determinado período de tempo, medida em bits por segundo (bps).

## Exemplos

*   **Largura de Banda Analógica:**
    *   Um canal de voz telefônico tradicional tem uma largura de banda de aproximadamente 3.1 kHz (de 300 Hz a 3400 Hz).
    *   Um canal de TV analógica ocupa cerca de 6 MHz de largura de banda no espectro de RF.
*   **Largura de Banda Digital:**
    *   Conexão Ethernet 10BASE-T: 10 Mbps (Megabits por segundo).
    *   Conexão Fast Ethernet 100BASE-TX: 100 Mbps.
    *   Conexão Gigabit Ethernet 1000BASE-T: 1 Gbps (Gigabits por segundo).
    *   Conexão Wi-Fi 802.11ac: Várias centenas de Mbps a mais de 1 Gbps (teórico).
    *   Link de fibra óptica ([[Meio_Físico_Fibra_Óptica]]): De Gbps a Tbps (Terabits por segundo).
    *   Conexão de Internet residencial: Anunciada como "500 Mbps", "1 Gbps", etc.

## Características

*   **Medida de Capacidade:** Indica o potencial máximo de transmissão.
*   **Unidades:** Hz (analógica), bps (digital).
*   **Dependente do Meio Físico:** O tipo de meio ([[Meio_Físico]]) é um fator limitante primário (fibra > coaxial > par trançado > wireless, geralmente).
*   **Dependente da Tecnologia:** Os padrões e protocolos usados (Ethernet, Wi-Fi, DOCSIS, 5G) definem a largura de banda alcançável sobre um meio.
*   **Fator de Desempenho Chave:** Influencia diretamente a velocidade percebida das aplicações de rede.
*   **Recurso Finito:** A largura de banda total disponível em qualquer meio ou espectro é limitada.
*   **Largura de Banda vs. Throughput:** Largura de banda é a capacidade teórica máxima; throughput é a taxa de transferência real medida, que é frequentemente menor.

## Vantagens (de Alta Largura de Banda)

*   **Transferências Rápidas:** Permite baixar/subir arquivos grandes rapidamente.
*   **Melhor Experiência Multimídia:** Suporta streaming de vídeo de alta definição (HD, 4K, 8K) sem buffering.
*   **Suporte a Múltiplos Usuários/Dispositivos:** Permite que mais usuários ou dispositivos usem a rede simultaneamente sem degradação significativa.
*   **Melhor Desempenho de Aplicações:** Aplicações que transferem muitos dados (jogos online, videoconferência, backup na nuvem) funcionam melhor.
*   **Menor Congestionamento (Potencial):** Reduz a probabilidade de gargalos na rede local ou no link de acesso.

## Desvantagens (de Baixa Largura de Banda)

*   **Transferências Lentas:** Arquivos grandes demoram muito para baixar/subir.
*   **Qualidade de Streaming Ruim:** Vídeos podem travar (buffering) ou ter baixa resolução.
*   **Desempenho Lento com Múltiplos Usuários:** A rede fica lenta quando muitas pessoas a usam ao mesmo tempo.
*   **Limitação de Aplicações:** Algumas aplicações podem não funcionar adequadamente (ex: videoconferência HD).
*   **Frustração do Usuário:** Lentidão geral na navegação e uso de serviços online.

## Seção Expandida: Fatores que Afetam o Throughput

Mesmo com alta largura de banda nominal, a taxa de transferência real (throughput) pode ser menor devido a:
*   **Latência:** O tempo de ida e volta do sinal (ping). Alta latência pode limitar o throughput, especialmente para protocolos como TCP que esperam confirmações.
*   **Perda de Pacotes e Erros:** Pacotes perdidos ou corrompidos precisam ser retransmitidos, consumindo largura de banda.
*   **Congestionamento:** Gargalos em qualquer ponto do caminho (switches locais, roteador doméstico, rede do ISP, servidores de destino) limitam a taxa.
*   **Overhead de Protocolo:** Cabeçalhos adicionados em cada camada (Ethernet, IP, TCP) consomem parte da largura de banda.
*   **Limitações do Dispositivo:** A capacidade de processamento do seu computador, roteador ou do servidor remoto pode ser o gargalo.
*   **Meio Compartilhado (ex: Wi-Fi, Hubs):** A largura de banda é dividida entre os usuários ativos.
*   **Throttling pelo ISP:** O provedor pode limitar sua velocidade (traffic shaping).

## Notas Relacionadas

*   [[Baud_e_Bps_–_Bits_por_Segundo]] (Unidade de medida)
*   [[Modelo_de_Referência_OSI]]
*   [[Modelo_TCP_IP]]
*   [[Meio_Físico]] (Principal fator limitante)
*   [[Meio_Físico_Guiado]]
*   [[Meio_Físico_Não_Guiado]]
*   [[Meio_Físico_Coaxial]]
*   [[Meio_Físico_Wireless]]
*   [[Meio_Físico_Rádio]]
*   [[Meio_Físico_Microondas]]
*   [[Meio_Físico_Par_Trançado]]
*   [[Meio_Físico_Fibra_Óptica]]
