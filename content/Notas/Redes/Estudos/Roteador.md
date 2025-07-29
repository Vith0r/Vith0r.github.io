---
Tema Principal: 83-Roteador
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Hardware, Protocolo IP
tags:
  - Hardware
  - Rede
---

# 83-Roteador

## Visão Geral

Um roteador (router, em inglês) é um dispositivo de rede fundamental que opera na Camada de Rede (Camada 3) do Modelo OSI e do modelo TCP/IP ([[Protocolo_TCP-IP]]). Sua principal função é conectar redes lógicas diferentes (sub-redes IP) e encaminhar pacotes de dados entre elas com base em seus endereços IP de destino. Roteadores tomam decisões inteligentes sobre o melhor caminho (rota) que um pacote deve seguir para alcançar seu destino final, utilizando tabelas de roteamento que são construídas manualmente (rotas estáticas) ou dinamicamente através de protocolos de roteamento (como RIP, OSPF, BGP). Ao contrário de bridges ([[Bridge]]) e switches ([[Switch]]) que operam na Camada 2 e encaminham com base em endereços MAC, os roteadores trabalham com endereços lógicos (IP) e são essenciais para a interconexão de redes locais (LANs) e para o funcionamento da Internet, direcionando o tráfego entre diferentes redes autônomas em escala global.

## Definição

Um roteador é um dispositivo de interconexão de redes que encaminha pacotes de dados entre redes de computadores. Ele funciona lendo o endereço IP de destino no cabeçalho de um pacote recebido, consultando sua tabela de roteamento para determinar a melhor interface de saída para encaminhar o pacote em direção ao seu destino, e então retransmitindo o pacote pela interface apropriada. Roteadores também servem como limites de domínios de broadcast, pois não encaminham pacotes de broadcast por padrão, ajudando a controlar o tráfego e a segmentar redes grandes.

## Exemplos

*   **Roteadores Domésticos/SOHO (Small Office/Home Office):** Dispositivos comuns que conectam a rede local doméstica à Internet (fornecida pelo ISP). Geralmente combinam funções de roteador, switch, ponto de acesso Wi-Fi, firewall e servidor DHCP em um único aparelho.
*   **Roteadores Corporativos (Enterprise Routers):** Dispositivos mais robustos e com mais recursos, usados em redes empresariais para conectar diferentes sub-redes internas, filiais (via WAN) e a Internet. Suportam protocolos de roteamento avançados e recursos de segurança.
*   **Roteadores de Borda (Edge Routers):** Localizados na fronteira entre uma rede (ex: rede corporativa, rede de um ISP) e outra rede (ex: a Internet, outra rede de ISP). Lidam com o tráfego que entra e sai da rede.
*   **Roteadores de Núcleo (Core Routers):** Roteadores de alta capacidade e velocidade localizados no backbone da Internet ou de grandes redes de operadoras, responsáveis por encaminhar grandes volumes de tráfego rapidamente entre redes principais.

## Características

*   **Operação na Camada 3 (Rede):** Trabalha com endereços IP e pacotes.
*   **Conecta Redes Diferentes:** Interliga redes com diferentes endereçamentos lógicos (sub-redes).
*   **Decisões de Roteamento:** Usa tabelas de roteamento para escolher o melhor caminho.
*   **Tabelas de Roteamento:** Podem ser estáticas (configuradas manualmente) ou dinâmicas (aprendidas via protocolos de roteamento).
*   **Segmentação de Domínios de Broadcast:** Cada interface do roteador pertence a um domínio de broadcast diferente.
*   **Não Encaminha Broadcasts (Por Padrão):** Bloqueia a propagação de broadcasts entre redes.
*   **Modifica Cabeçalhos de Camada 2:** Ao encaminhar um pacote de uma rede para outra (ex: de Ethernet para uma linha serial), o roteador remove o cabeçalho de enlace antigo e cria um novo cabeçalho apropriado para o próximo link.
*   **Pode Realizar NAT (Network Address Translation):** Muitos roteadores (especialmente os domésticos e de borda) traduzem endereços IP privados para públicos.

## Vantagens

*   **Interconexão de Redes:** Permite a comunicação entre redes diferentes e heterogêneas.
*   **Seleção Inteligente de Caminho:** Escolhe as melhores rotas com base em métricas (distância, custo, velocidade).
*   **Controle de Tráfego:** Segmenta domínios de broadcast, reduzindo o tráfego desnecessário e melhorando o desempenho.
*   **Segurança:** Atua como um ponto de controle de acesso entre redes, permitindo a implementação de firewalls e listas de controle de acesso (ACLs).
*   **Redundância:** Protocolos de roteamento dinâmico podem encontrar rotas alternativas em caso de falha de um link ou roteador.
*   **Escalabilidade:** Essencial para construir redes grandes e complexas como a Internet.

## Desvantagens

*   **Latência:** Introduz mais latência do que switches ou bridges, pois precisa processar o cabeçalho da Camada 3 de cada pacote.
*   **Custo:** Geralmente mais caros que switches ou hubs.
*   **Complexidade de Configuração:** Configurar roteamento (especialmente dinâmico) e políticas de segurança pode ser complexo.
*   **Processamento:** Requer mais poder de processamento do que dispositivos de Camada 2.

## Seção Expandida: Roteamento Estático vs. Dinâmico

*   **Roteamento Estático:** O administrador da rede configura manualmente cada rota na tabela de roteamento do roteador. É simples para redes pequenas e estáveis, mas não escala bem e não se adapta automaticamente a falhas na rede. Se um caminho falhar, a rota alternativa precisa ser configurada manualmente.
*   **Roteamento Dinâmico:** Os roteadores usam protocolos de roteamento (ex: RIP, EIGRP, OSPF, BGP) para trocar informações sobre a topologia da rede com outros roteadores e construir suas tabelas de roteamento automaticamente. Ele se adapta dinamicamente a mudanças na rede (novos links, falhas), encontrando rotas alternativas. É mais complexo de configurar inicialmente, mas muito mais escalável e resiliente para redes maiores.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Protocolo_TCP-IP]]
*   [[Rede_Estrela]]
*   [[Bridge]] (Contraste)
*   [[Gateway]] (Função frequentemente realizada por roteadores)
*   [[Switch]] (Contraste, e Switches L3)
