---
Tema Principal: 76-Rede Barra
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Topologias de Rede
tags:
  - Topologia
  - Barramento
  - Rede
  - Ethernet
  - Coaxial
---

# 76-Rede Barra

## Visão Geral

A topologia de rede em barra (ou barramento, bus topology em inglês) é uma configuração de rede local (LAN) onde todos os nós (computadores, servidores, impressoras) são conectados a um único cabo central compartilhado, chamado de barramento ou backbone. Os dados enviados por um nó trafegam ao longo de todo o barramento e são recebidos por todos os outros nós, mas apenas o nó destinatário (identificado pelo endereço no pacote) processa a mensagem. Para evitar que os sinais reflitam nas extremidades do cabo e causem interferência, terminadores são colocados em ambas as pontas do barramento. Esta topologia foi muito popular nas primeiras implementações de Ethernet (10BASE5 - Thick Ethernet e 10BASE2 - Thin Ethernet) que utilizavam cabo coaxial, devido à sua simplicidade e baixo custo inicial.

## Definição

Uma topologia de rede em barra é uma arquitetura de rede na qual um único canal de comunicação (o barramento) é compartilhado por todos os dispositivos conectados. A comunicação ocorre de forma que a mensagem enviada por um dispositivo é propagada ao longo do barramento em ambas as direções, ficando disponível para todos os outros dispositivos, mas sendo processada apenas pelo destinatário pretendido. Requer um mecanismo de controle de acesso ao meio (como CSMA/CD na Ethernet) para gerenciar colisões quando múltiplos dispositivos tentam transmitir simultaneamente.

## Exemplos

*   **Ethernet 10BASE5 (Thicknet):** Usava um cabo coaxial grosso como backbone. Os dispositivos se conectavam ao backbone através de transceptores (vampire taps) e cabos AUI.
*   **Ethernet 10BASE2 (Thinnet/Cheapernet):** Usava um cabo coaxial mais fino e flexível. Os dispositivos se conectavam diretamente ao cabo usando conectores BNC em formato de "T". Era mais barata e fácil de instalar que a 10BASE5.
*   **Redes AppleTalk (LocalTalk):** Usavam uma topologia de barramento sobre par trançado.
*   **Algumas Redes Industriais (CAN bus):** Embora não seja Ethernet, o CAN bus usado em automação e veículos também emprega uma topologia de barramento.

## Características

*   **Meio Compartilhado:** Todos os nós compartilham o mesmo cabo.
*   **Cabo Central (Backbone):** Um único cabo conecta todos os dispositivos.
*   **Terminadores:** Necessários nas extremidades do cabo para absorver o sinal e evitar reflexões.
*   **Transmissão Broadcast (Física):** O sinal se propaga por todo o barramento.
*   **Simplicidade:** Estrutura física relativamente simples.
*   **Dependência do Barramento:** Uma falha no cabo principal (ruptura) pode derrubar toda a rede.
*   **Controle de Acesso ao Meio:** Necessita de um protocolo para gerenciar o acesso compartilhado (ex: CSMA/CD).

## Vantagens

*   **Baixo Custo de Cabeamento (Inicial):** Requer menos cabo do que topologias como estrela, especialmente em instalações lineares.
*   **Simplicidade de Instalação (Inicial):** Relativamente fácil de conectar novos nós (especialmente com 10BASE2).
*   **Fácil de Entender:** Conceito simples de um cabo compartilhado.

## Desvantagens

*   **Dificuldade na Solução de Problemas:** Uma falha no cabo (ruptura, conector solto, terminador defeituoso) pode ser difícil de localizar e afeta toda a rede.
*   **Desempenho Degradado com Carga:** Como o meio é compartilhado, o desempenho diminui significativamente à medida que mais nós são adicionados e tentam transmitir, devido ao aumento das colisões (em CSMA/CD).
*   **Escalabilidade Limitada:** O número de nós e o comprimento total do barramento são limitados por especificações elétricas e de desempenho.
*   **Baixa Confiabilidade:** Uma única falha no backbone paralisa todo o segmento de rede.
*   **Segurança:** Todos os nós recebem todas as transmissões (embora só processem as destinadas a eles), facilitando a interceptação de tráfego (sniffing).
*   **Obsolescência:** Praticamente substituída pela topologia em estrela (usando switches e cabos de par trançado - [[Rede_Estrela]], [[Hub]], [[Switch]]) em redes locais modernas, devido à sua maior confiabilidade, desempenho e facilidade de gerenciamento.

## Seção Expandida: CSMA/CD em Redes Barra Ethernet

O protocolo CSMA/CD (Carrier Sense Multiple Access with Collision Detection) era essencial para o funcionamento da Ethernet em barramento:
1.  **Carrier Sense:** Antes de transmitir, a estação escuta o barramento para verificar se ele está livre.
2.  **Multiple Access:** Múltiplas estações compartilham o mesmo meio.
3.  **Collision Detection:** Se duas estações transmitirem quase ao mesmo tempo, ocorrerá uma colisão. As estações detectam essa colisão (monitorando o nível de tensão no cabo) e param de transmitir.
4.  **Backoff:** Após uma colisão, cada estação envolvida espera um tempo aleatório (algoritmo de backoff exponencial) antes de tentar transmitir novamente, reduzindo a chance de outra colisão imediata.

Esse mecanismo funcionava, mas limitava o desempenho da rede, pois apenas uma estação podia transmitir com sucesso por vez, e o tempo era perdido com colisões e recuperações.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Barramento]] (Conceito de barramento)
*   [[Rede_Anel]] (Comparação de topologia)
*   [[Rede_Estrela]] (Topologia dominante hoje)
*   [[Rede_Híbrida]]
*   [[Hub]] (Cria uma topologia lógica de barramento sobre uma fiação física em estrela)
*   [[Switch]] (Substituiu hubs e barramentos)
*   [[Meio_Físico_Coaxial]]
