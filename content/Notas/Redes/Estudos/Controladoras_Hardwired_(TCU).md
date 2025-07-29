---
Tema Principal: 35-Controladoras Hardwired (TCU)
Nível de Dificuldade: Médio
Fonte/Referência: Arquitetura de Computadores, História da Computação, Sistemas IBM
tags:
  - Controladora
  - Comunicação
  - Legado
  - Hardware
---

# 35-Controladoras Hardwired (TCU)

## Visão Geral

As Controladoras Hardwired, frequentemente designadas pela sigla TCU (Transmission Control Unit) nos primórdios da computação centralizada, representam a primeira geração de dispositivos dedicados a gerenciar a comunicação entre um computador host e seus periféricos remotos ou linhas de comunicação. Diferentemente das controladoras programáveis (FEPs) que surgiram posteriormente, as TCUs tinham sua lógica de controle e as funcionalidades de protocolo implementadas diretamente em circuitos eletrônicos (hardware), sem a flexibilidade de serem modificadas por software. Elas desempenharam um papel importante ao aliviar o host de algumas tarefas básicas de controle de linha, mas sua funcionalidade fixa limitava sua adaptabilidade e longevidade.

## Definição

Uma Controladora Hardwired (TCU) é um dispositivo de hardware cuja função é gerenciar a interface entre um computador host e uma ou mais linhas de comunicação ou terminais, utilizando lógica implementada permanentemente em seus circuitos. Ela executa um conjunto fixo de protocolos e gerencia tipos específicos de linhas e velocidades para os quais foi projetada. Qualquer mudança na funcionalidade, como suportar um novo protocolo ou velocidade, exigiria uma modificação física no hardware ou a substituição da unidade.

## Exemplos

1.  **IBM 2701, 2702, 2703:** Estas foram algumas das primeiras Unidades de Controle de Transmissão da IBM, projetadas para conectar linhas de comunicação de baixa e média velocidade (telegráficas, telefônicas com modems) aos mainframes System/360. Cada modelo tinha capacidades e conjuntos de adaptadores de linha específicos e fixos.
2.  **Controladoras de Linha Específicas:** Outros fabricantes de mainframes e minicomputadores também produziram controladoras hardwired com funcionalidades semelhantes para seus próprios sistemas e protocolos.
3.  **Primeiras Controladoras de Terminais:** Algumas das primeiras unidades que gerenciavam clusters de terminais também podem ser consideradas hardwired em sua lógica de comunicação com o host.

## Características

*   **Lógica Fixa em Hardware:** Funcionalidade definida por circuitos eletrônicos, não por software.
*   **Não Programável:** Impossibilidade de alterar ou atualizar a funcionalidade via software.
*   **Suporte Limitado a Protocolos:** Projetada para um ou poucos protocolos de comunicação específicos da época (ex: Start-Stop, talvez uma versão inicial de BSC).
*   **Especificidade de Linha/Velocidade:** Suportava apenas os tipos e velocidades de linha para os quais seus adaptadores foram construídos.
*   **Funções Básicas:** Tipicamente realizava controle básico de linha (ativação/desativação), buffering simples de caracteres, conversão serial/paralela e detecção de erros elementar.
*   **Interface com Host:** Conectava-se ao canal de I/O do host.

## Vantagens (na Época)

*   **Descarregamento Básico do Host:** Aliviava a CPU principal de interrupções constantes para lidar com cada bit ou caractere da comunicação, uma tarefa onerosa para as CPUs da época.
*   **Interface Dedicada:** Fornecia uma interface física padronizada para conectar diversas linhas de comunicação ao host.
*   **Velocidade Potencial:** Para as tarefas específicas que realizava, a execução em hardware dedicado podia ser mais rápida do que a emulação por software no host daquele tempo.

## Desvantagens

*   **Inflexibilidade Total:** A principal desvantagem. Incapaz de se adaptar a novos protocolos, velocidades ou requisitos de comunicação sem redesenho do hardware.
*   **Funcionalidade Limitada:** Oferecia apenas funções básicas de controle de comunicação, deixando tarefas mais complexas (como gerenciamento de sessões, roteamento) para o host.
*   **Obsolescência Rápida:** À medida que os protocolos e as tecnologias de rede evoluíam rapidamente, as TCUs hardwired tornavam-se obsoletas.
*   **Custo de Modificação/Upgrade:** Qualquer mudança exigia substituição de hardware, o que era caro e disruptivo.
*   **Dificuldade de Diagnóstico:** Diagnosticar problemas em lógica hardwired podia ser mais complexo do que depurar software.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Controladoras_de_Comunicação]]
*   [[Controladoras_Programáveis_(PFEP)]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

