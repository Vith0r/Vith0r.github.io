---
Tema Principal: 99-Meio Físico Fibra Óptica
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Camada Física, Telecomunicações, Óptica
tags:
  - Meio
  - Físico
  - Meio
  - Guiado
  - Fibra
  - Óptica
  - Fibra
  - Óptica
  - Cabeamento
  - Velocidade
---

# 99-Meio Físico Fibra Óptica

## Visão Geral

A fibra óptica é um tipo de meio físico guiado ([[Meio_Físico_Guiado]]) que utiliza filamentos finos e flexíveis de vidro ou plástico (a fibra) para transmitir informações na forma de pulsos de luz. A luz viaja ao longo da fibra através de um princípio chamado reflexão total interna. Uma fibra óptica típica consiste em um núcleo (core) central por onde a luz se propaga, rodeado por um revestimento (cladding) com um índice de refração ligeiramente menor, e uma ou mais camadas protetoras (buffer, jacket). A fibra óptica oferece vantagens significativas sobre os cabos metálicos (par trançado - [[Meio_Físico_Par_Trançado]], coaxial - [[Meio_Físico_Coaxial]]), incluindo larguras de banda ([[Largura_de_Banda]]) muito maiores, capacidade de transmissão em distâncias muito longas com baixa atenuação ([[Atenuação]]), e imunidade total a interferências eletromagnéticas (EMI) e ruídos ([[Ruído_Impulsivo]], [[Ruído_Branco]]). É a tecnologia preferida para backbones de redes de longa distância (WANs - [[Redes_Metropolitanas_e_de_Longa_Distância_(MAN_e_WAN)]]), links submarinos, redes metropolitanas (MANs) e, cada vez mais, em redes locais (LANs - [[Redes_Locais_(LAN)]]) de alto desempenho e data centers.

## Definição

Fibra óptica é um meio de transmissão que utiliza fios finos de vidro ou plástico para guiar pulsos de luz que representam dados. A transmissão baseia-se na reflexão total interna da luz dentro do núcleo da fibra.

## Exemplos

*   **Tipos de Fibra:**
    *   **Monomodo (Single-Mode Fiber - SMF):** Possui um núcleo muito fino (tipicamente 9 micrômetros) que permite apenas um modo (caminho) de luz se propagar. Usada para longas distâncias (dezenas a milhares de km) e altíssimas larguras de banda, geralmente com fontes de luz laser. É o padrão para telecomunicações de longa distância.
    *   **Multimodo (Multi-Mode Fiber - MMF):** Possui um núcleo mais largo (tipicamente 50 ou 62.5 micrômetros) que permite múltiplos modos de luz se propagarem simultaneamente. Usada para distâncias mais curtas (até algumas centenas de metros ou poucos km, dependendo da categoria e velocidade) em LANs, data centers e backbones de edifícios. Geralmente usada com fontes de luz mais baratas como LEDs ou VCSELs. Sofre de dispersão modal, que limita a distância/largura de banda.
*   **Aplicações:**
    *   Backbones da Internet e de operadoras.
    *   Cabos submarinos intercontinentais.
    *   Redes Metropolitanas (Metro Ethernet).
    *   FTTH (Fiber To The Home): Levar fibra diretamente às residências para acesso à Internet de alta velocidade.
    *   Links de backbone em LANs corporativas e de campus.
    *   Conexões em Data Centers (alta densidade e velocidade).
    *   Sistemas de TV a cabo (HFC - Hybrid Fiber-Coax).
    *   Sensores e aplicações médicas (endoscopia).
*   **Conectores Comuns:** LC, SC, ST, MTP/MPO.

## Características

*   **Transmissão por Luz:** Usa pulsos de luz para representar bits.
*   **Estrutura:** Núcleo (core), revestimento (cladding), buffer, capa (jacket).
*   **Tipos Monomodo e Multimodo:** Diferem no diâmetro do núcleo e nas características de propagação.
*   **Altíssima Largura de Banda:** Capacidade de transmissão na faixa de Terabits por segundo (Tbps) ou mais.
*   **Baixa Atenuação:** Perda de sinal muito baixa, permitindo longas distâncias sem repetidores ([[Repetidor]]).
*   **Imunidade a EMI/RFI:** Completamente imune a interferências eletromagnéticas e de radiofrequência.
*   **Segurança:** Muito difícil de interceptar o sinal sem interromper fisicamente a fibra (tapping).
*   **Leveza e Tamanho:** Cabos de fibra são mais leves e finos que cabos de cobre com capacidade similar.
*   **Isolamento Elétrico:** Sendo feita de vidro ou plástico, é um isolante elétrico, eliminando problemas de aterramento e loops de terra.

## Vantagens

*   **Capacidade Enorme (Largura de Banda):** Principal vantagem, suporta taxas de dados muito superiores às de qualquer cabo de cobre.
*   **Longas Distâncias:** Baixa atenuação permite links muito longos (dezenas ou centenas de km para SMF) sem necessidade de regeneração do sinal.
*   **Imunidade a Interferências:** Ideal para ambientes com alto ruído elétrico ou para instalação próxima a cabos de energia.
*   **Segurança:** Mais segura contra interceptação do que cabos de cobre ou wireless.
*   **Leveza e Diâmetro Reduzido:** Facilita a instalação em conduítes congestionados.
*   **Durabilidade (Potencial):** Não corrói como o cobre.

## Desvantagens

*   **Custo:** Cabos de fibra (especialmente SMF), conectores, equipamentos de transmissão/recepção (transceivers ópticos) e ferramentas de instalação/teste são geralmente mais caros do que os equivalentes de cobre.
*   **Fragilidade:** A fibra de vidro pode quebrar se for dobrada excessivamente (respeitar raio mínimo de curvatura) ou manuseada incorretamente.
*   **Complexidade de Instalação e Reparo:** Requer técnicos especializados e ferramentas específicas (como máquinas de fusão) para terminar (conectorizar) e emendar fibras.
*   **Conversão Óptico-Elétrica:** Requer conversores (transceivers) nas extremidades para interfacear com equipamentos eletrônicos.

## Seção Expandida: Monomodo (SMF) vs. Multimodo (MMF)

*   **SMF (Single-Mode Fiber):**
    *   Núcleo fino (~9 µm).
    *   Fonte de luz: Laser.
    *   Propagação: Um modo.
    *   Dispersão: Baixa (principalmente cromática e de modo de polarização).
    *   Distância: Muito Longa (10 km a >100 km).
    *   Largura de Banda: Altíssima.
    *   Custo: Equipamento mais caro, cabo pode ser mais barato que MMF para grandes volumes.
    *   Aplicação: Longa distância, telecom, WAN, MAN.
*   **MMF (Multi-Mode Fiber):**
    *   Núcleo largo (50 µm ou 62.5 µm).
    *   Fonte de luz: LED ou VCSEL (mais barato).
    *   Propagação: Múltiplos modos.
    *   Dispersão: Alta (dispersão modal limita distância/banda).
    *   Distância: Curta (< 2 km, geralmente < 500m para altas velocidades).
    *   Largura de Banda: Alta, mas limitada pela dispersão modal.
    *   Custo: Equipamento mais barato, cabo pode ser mais caro.
    *   Aplicação: LAN, Data Center, backbone de edifício.

Existem diferentes categorias de MMF (OM1, OM2, OM3, OM4, OM5) otimizadas para diferentes velocidades e distâncias usando fontes VCSEL.

## Notas Relacionadas

*   [[Atenuação]]
*   [[Repetidor]]
*   [[Redes_Locais_(LAN)]]
*   [[Redes_Metropolitanas_e_de_Longa_Distância_(MAN_e_WAN)]]
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Guiado]]
*   [[Meio_Físico_Coaxial]] (Comparação)
*   [[Meio_Físico_Par_Trançado]] (Comparação)
*   [[Largura_de_Banda]]

