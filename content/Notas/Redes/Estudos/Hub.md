---
Tema Principal: 81-Hub
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Hardware
tags:
  - Hub
  - Repetidor
  - Ethernet
  - Hardware
  - Rede
---

# 81-Hub

## Visão Geral

Um hub, também conhecido como repetidor multiportas, é um dispositivo de hardware de rede simples usado para conectar múltiplos dispositivos Ethernet em uma rede local (LAN), formando um segmento de rede único. Operando na Camada Física (Camada 1) do Modelo OSI, a função principal de um hub é receber um sinal elétrico (quadro Ethernet) em uma de suas portas e simplesmente repeti-lo (regenerando o sinal para combater a atenuação) para todas as outras portas, independentemente do endereço de destino do quadro. Isso significa que todos os dispositivos conectados a um hub compartilham a mesma largura de banda e pertencem ao mesmo domínio de colisão. Se dois dispositivos tentarem transmitir ao mesmo tempo, ocorrerá uma colisão que afetará todo o segmento. Devido a essas limitações de desempenho e eficiência, os hubs foram amplamente substituídos por switches ([[Switch]]) em redes modernas.

## Definição

Um hub é um dispositivo de Camada 1 que conecta vários dispositivos em uma rede, atuando como um ponto central em uma topologia em estrela física ([[Rede_Estrela]]). Ele não examina o tráfego que passa por ele (não lê endereços MAC ou IP); apenas regenera e retransmite os sinais elétricos recebidos em uma porta para todas as outras portas ativas. Por isso, cria uma topologia lógica de barramento ([[Rede_Barra]]) sobre uma fiação física em estrela.

## Exemplos

*   **Hubs Ethernet 10BASE-T:** Dispositivos comuns no início das redes Ethernet de par trançado, conectando computadores a 10 Mbps.
*   **Hubs Ethernet 100BASE-TX (Fast Ethernet):** Versões mais rápidas, mas ainda com as mesmas limitações de compartilhamento de banda e domínio de colisão.
*   **Hubs USB:** Embora usem um protocolo diferente, conceitualmente funcionam de forma semelhante, compartilhando a largura de banda USB entre os dispositivos conectados a ele.

## Características

*   **Operação na Camada 1 (Física):** Lida apenas com sinais elétricos/bits.
*   **Repetidor Multiportas:** Regenera e repete sinais.
*   **Broadcast Físico:** Transmite dados recebidos para todas as outras portas.
*   **Domínio de Colisão Único:** Todos os dispositivos conectados compartilham o mesmo domínio de colisão.
*   **Largura de Banda Compartilhada:** A capacidade total do hub (ex: 10 Mbps, 100 Mbps) é compartilhada entre todos os dispositivos.
*   **Operação Half-Duplex:** Devido ao domínio de colisão único, os dispositivos conectados a um hub geralmente operam em modo half-duplex (só podem transmitir ou receber por vez, não ambos simultaneamente).
*   **Não Inteligente:** Não aprende endereços MAC nem toma decisões de encaminhamento.

## Vantagens

*   **Baixo Custo (Histórico):** Eram mais baratos que switches quando surgiram.
*   **Simplicidade:** Dispositivos muito simples, fáceis de instalar (plug-and-play).
*   **Conectividade:** Permitem conectar múltiplos dispositivos usando uma topologia física em estrela, que é mais robusta que a barra física.

## Desvantagens

*   **Desempenho Ruim:** A largura de banda compartilhada e o domínio de colisão único levam a um desempenho muito baixo, especialmente com muitos dispositivos ou tráfego intenso.
*   **Ineficiência:** Transmitir todos os pacotes para todas as portas desperdiça largura de banda e aumenta a chance de colisões.
*   **Sem Suporte a Full-Duplex:** Geralmente limitados a half-duplex.
*   **Não Segmenta a Rede:** Não isola o tráfego entre as portas.
*   **Obsolescência:** Praticamente obsoletos em redes Ethernet, substituídos por switches que oferecem desempenho e eficiência vastamente superiores por um custo similar ou ligeiramente maior.

## Seção Expandida: Hub vs. Switch

A diferença fundamental está na camada de operação e na inteligência:
*   **Hub (Camada 1):** Repete bits para todas as portas. Domínio de colisão único. Largura de banda compartilhada. Half-duplex.
*   **Switch (Camada 2):** Encaminha quadros com base no endereço MAC de destino para a porta específica. Cada porta é um domínio de colisão separado. Largura de banda dedicada por porta (em modo full-duplex). Suporta full-duplex.

O uso de switches em vez de hubs resultou em um aumento dramático no desempenho e na eficiência das redes locais Ethernet.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Barramento]] (Topologia lógica criada pelo hub)
*   [[Rede_Barra]] (Comparação de topologia lógica)
*   [[Rede_Estrela]] (Topologia física onde o hub é usado)
*   [[Bridge]] (Conceito similar ao switch, mas geralmente com menos portas)
*   [[Switch]] (Substituto moderno do hub)
*   [[Meio_Físico_Par_Trançado]]
