---
Tema Principal: 36-Controladoras Programáveis (PFEP)
Nível de Dificuldade: Médio
Fonte/Referência: Arquitetura de Computadores, Redes de Computadores, Sistemas IBM
tags:
  - Controladora
  - FEP
  - Comunicação
  - Software
---

# 36-Controladoras Programáveis (PFEP)

## Visão Geral

As Controladoras Programáveis, ou Processadores de Front-End Programáveis (PFEP - Programmable Front-End Processors), representaram uma evolução significativa em relação às controladoras hardwired (TCUs) na arquitetura de comunicação de sistemas centralizados, especialmente mainframes. Ao contrário das TCUs com lógica fixa, as PFEPs eram essencialmente computadores dedicados, equipados com seu próprio processador, memória e software (como o NCP - Network Control Program da IBM). Essa programabilidade conferiu uma flexibilidade sem precedentes, permitindo que as controladoras fossem adaptadas para suportar novos protocolos, velocidades de linha, tipos de dispositivos e funcionalidades de rede complexas através de atualizações de software, sem a necessidade de substituir o hardware. Elas se tornaram o padrão para gerenciamento de redes de grande porte em ambientes mainframe por muitos anos.

## Definição

Uma Controladora Programável (PFEP) é um computador especializado que atua como interface entre um computador host central e a rede de comunicação, cuja funcionalidade é definida primariamente por software, e não por circuitos hardwired. Ela executa um sistema operacional ou programa de controle dedicado (ex: NCP) que gerencia as linhas de comunicação, implementa múltiplos protocolos de comunicação (ex: SNA, BSC, X.25), controla o fluxo de dados, realiza buffering, concentração de tráfego e pode executar funções de rede mais avançadas, como roteamento básico e conversão de protocolos, descarregando efetivamente essas tarefas do host.

## Exemplos

1.  **IBM 3704/3705:** Introduzidas no início dos anos 70, foram as primeiras controladoras de comunicação programáveis de grande sucesso da IBM, rodando o NCP e suportando a arquitetura SNA.
2.  **IBM 3720/3725/3745/3746:** Gerações subsequentes de PFEPs da IBM, oferecendo maior desempenho, capacidade de linhas, memória e funcionalidades avançadas de rede.
3.  **Controladoras de Comunicação de Outros Fabricantes:** Outras empresas que competiam no mercado de mainframes (como Amdahl, Hitachi) ou minicomputadores (como DEC) também desenvolveram suas próprias controladoras de comunicação programáveis.

## Características

*   **Baseada em Software:** Funcionalidade definida e controlada por software executado na própria controladora.
*   **Programável/Atualizável:** Novas funcionalidades, protocolos e suporte a dispositivos podem ser adicionados via atualizações de software.
*   **Flexibilidade:** Capaz de suportar uma ampla gama de protocolos, velocidades e tipos de linha simultaneamente.
*   **Processamento Dedicado:** Possui sua própria CPU e memória para executar o software de controle de rede.
*   **Funções Avançadas:** Capaz de realizar tarefas mais complexas que TCUs, como roteamento, conversão de protocolos, coleta de estatísticas de rede.
*   **Descarregamento Significativo do Host:** Assume uma carga muito maior de processamento de comunicação do que as TCUs.
*   **Interface com Host e Rede:** Conecta-se ao canal do host e a múltiplas linhas de comunicação.

## Vantagens

*   **Flexibilidade e Adaptabilidade:** A principal vantagem. Podem ser adaptadas a novas tecnologias e requisitos de rede sem troca de hardware.
*   **Longevidade:** A capacidade de atualização por software estendeu a vida útil desses equipamentos.
*   **Suporte a Redes Complexas:** Essenciais para a implementação e gerenciamento de redes grandes e complexas como a SNA.
*   **Melhor Desempenho do Sistema:** Descarregamento mais eficiente do host comparado às TCUs.
*   **Funcionalidades Ricas:** Podem oferecer serviços de rede mais sofisticados.
*   **Gerenciamento Centralizado da Rede:** O software da PFEP (como o NCP) permitia um controle e monitoramento mais centralizado da rede de comunicação.

## Desvantagens

*   **Custo Elevado:** Eram equipamentos significativamente caros, tanto o hardware quanto as licenças de software (NCP).
*   **Complexidade de Software:** O software de controle (NCP) era complexo para instalar, configurar (geração do NCP - NGEN), gerenciar e depurar.
*   **Requisitos de Memória e Processamento:** Exigiam recursos computacionais próprios consideráveis.
*   **Ponto Único de Falha:** Continuavam sendo um ponto crítico; sua falha impactava toda a comunicação externa do host.
*   **Administração Especializada:** Requeriam administradores de rede com conhecimento específico do hardware e software da controladora.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Controladoras_de_Comunicação]]
*   [[Controladoras_Hardwired_(TCU)]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

