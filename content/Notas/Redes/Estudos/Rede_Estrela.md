---
Tema Principal: "78-Rede Estrela"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Redes de Computadores, Topologias de Rede"
Tags:
  - "Topologia"
  - "Estrela"
  - "Rede Estrela"
  - "Hub"
  - "Switch"
  - "Ethernet"
---

# 78-Rede Estrela

## Visão Geral

A topologia de rede em estrela (star topology) é a arquitetura de rede local (LAN) mais comum atualmente. Nesta configuração, todos os nós da rede (computadores, servidores, impressoras, etc.) são conectados individualmente a um dispositivo central, como um hub ([[Hub]]) ou, mais comumente hoje, um switch ([[Switch]]). Cada dispositivo tem um cabo dedicado que o liga ao ponto central. Toda a comunicação entre os nós da rede passa através deste dispositivo central. Se um nó A quer enviar dados para um nó B, ele envia os dados para o dispositivo central, que então os encaminha para o nó B. A topologia em estrela superou as topologias em barra ([[Rede_Barra]]) e anel ([[Rede_Anel]]) em LANs devido à sua maior confiabilidade, facilidade de gerenciamento e melhor desempenho (especialmente quando se usa switches).

## Definição

Uma topologia de rede em estrela é uma arquitetura de rede na qual cada dispositivo de rede está conectado a um nó central (hub ou switch) através de um link ponto a ponto dedicado. Não há conexões diretas entre os dispositivos finais; toda a comunicação é mediada pelo dispositivo central.

## Exemplos

*   **Ethernet com Par Trançado (10BASE-T, 100BASE-TX, 1000BASE-T, etc.):** A vasta maioria das redes locais Ethernet cabeadas hoje utiliza uma topologia física em estrela, conectando computadores, impressoras e outros dispositivos a switches centrais usando cabos de par trançado (UTP/STP - [[Meio_Físico_Par_Trançado]]).
*   **Redes Wi-Fi (WLANs):** Embora a conexão seja sem fio, a topologia lógica de uma rede Wi-Fi típica é uma estrela, com todos os dispositivos sem fio (clientes) se conectando a um ponto de acesso central (AP - Access Point - [[Meio_Físico_Wireless]]).
*   **Redes Telefônicas (Legadas):** A rede telefônica tradicional (PSTN) pode ser vista como uma hierarquia de estrelas, com cada telefone conectado à central local ([[LAL_–_Loop_Analógico_Local]]).

## Características

*   **Ponto Central:** Todos os nós se conectam a um dispositivo central (hub ou switch).
*   **Links Ponto a Ponto:** Cada nó tem uma conexão dedicada ao ponto central.
*   **Comunicação Mediata:** O tráfego entre nós passa pelo dispositivo central.
*   **Dependência do Ponto Central:** Uma falha no dispositivo central (hub/switch) paralisa toda a rede (ou o segmento conectado a ele).
*   **Isolamento de Falhas (Cabos):** Uma falha em um cabo afeta apenas o dispositivo conectado a ele, não a rede inteira.
*   **Fácil Adição/Remoção de Nós:** Adicionar ou remover um dispositivo envolve apenas conectar/desconectar seu cabo do ponto central, sem interromper os outros.

## Vantagens

*   **Confiabilidade:** A falha de um cabo ou nó individual não afeta o resto da rede.
*   **Facilidade de Gerenciamento e Solução de Problemas:** É fácil isolar problemas, pois cada nó tem sua própria conexão. Falhas são geralmente limitadas a um único link ou ao dispositivo central.
*   **Fácil Expansão:** Adicionar novos nós é simples, bastando conectar um novo cabo ao hub/switch (desde que haja portas disponíveis).
*   **Desempenho (com Switches):** Quando um switch é usado como ponto central, ele permite múltiplas comunicações simultâneas entre diferentes pares de nós (ao contrário de um hub, que cria um domínio de colisão único), melhorando significativamente o desempenho.
*   **Tecnologia Madura e Custo:** Ethernet em estrela com par trançado é uma tecnologia madura, bem compreendida e relativamente barata.

## Desvantagens

*   **Ponto Único de Falha:** O dispositivo central (hub/switch) é um ponto crítico. Se ele falhar, toda a rede conectada a ele para de funcionar.
*   **Custo de Cabeamento (Potencial):** Requer mais cabo do que uma topologia em barra, pois cada dispositivo precisa de um cabo até o ponto central.
*   **Dependência de Portas:** O número de nós é limitado pelo número de portas disponíveis no dispositivo central (embora switches possam ser interligados para expansão).

## Seção Expandida: Hub vs. Switch na Topologia Estrela

Embora ambos sejam usados como ponto central em uma topologia estrela, hubs e switches operam de maneira muito diferente:
*   **Hub (Repetidor Multiporta):** Opera na Camada Física (Camada 1). Simplesmente recebe um sinal em uma porta e o repete (regenera) para todas as outras portas. Todos os dispositivos conectados a um hub compartilham a mesma largura de banda e estão no mesmo domínio de colisão (funcionando como um barramento lógico). Obsoleto para a maioria dos usos.
*   **Switch (Ponte Multiporta):** Opera na Camada de Enlace de Dados (Camada 2). Aprende os endereços MAC dos dispositivos conectados a cada porta e encaminha o tráfego apenas para a porta de destino apropriada (exceto para broadcasts/multicasts). Cada porta de um switch é um domínio de colisão separado, e ele permite comunicação full-duplex simultânea entre diferentes pares de portas, aumentando drasticamente a largura de banda disponível. É o dispositivo padrão para redes locais em estrela hoje.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Rede_Barra]] (Comparação de topologia)
*   [[Rede_Anel]] (Comparação de topologia)
*   [[Rede_Híbrida]]
*   [[Rede_Ponto_a_Ponto]] (Tipo de link usado na estrela)
*   [[Hub]]
*   [[Switch]]
*   [[Meio_Físico_Wireless]] (Topologia lógica em WLANs)
*   [[Meio_Físico_Par_Trançado]]

