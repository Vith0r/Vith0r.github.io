---
Tema Principal: 06-Histórico de Teleprocessamento de Dados
Nível de Dificuldade: Médio
Fonte/Referência: História da Computação, Redes de Computadores
tags:
  - Redes
  - Comunicação
---

# 06-Histórico de Teleprocessamento de Dados

## Visão Geral

O teleprocessamento de dados representa um marco fundamental na história da computação e das comunicações, surgindo da necessidade de acessar e processar informações remotamente. Antes do advento das redes de computadores como as conhecemos hoje, o teleprocessamento permitiu que usuários localizados distantes de grandes e caros computadores centrais (mainframes) pudessem interagir com eles através de linhas de comunicação, geralmente telefônicas. Este conceito foi essencial para a expansão do uso da computação para além dos centros de dados, viabilizando aplicações como reservas de passagens aéreas e acesso bancário remoto, e pavimentando o caminho para os sistemas distribuídos e a internet.

## Definição

Teleprocessamento é a combinação de **tele**comunicações com processamento de **dados**. Refere-se ao processamento de dados que ocorre em um local diferente de onde os dados são originados ou utilizados, utilizando linhas de comunicação para transmitir os dados entre o ponto de origem/uso (terminal) e o ponto de processamento (computador central ou host). Essencialmente, permitia que terminais remotos enviassem dados para serem processados por um computador central e recebessem os resultados de volta.

## Exemplos

1.  **SABRE (Semi-Automated Business Research Environment):** Desenvolvido pela IBM para a American Airlines no início dos anos 60, é um dos primeiros e mais famosos sistemas de teleprocessamento, permitindo que agentes de viagens em diferentes locais acessassem informações de voos e fizessem reservas em tempo real (para a época).
2.  **Sistemas de Time-Sharing:** A partir dos anos 60, sistemas como o CTSS (Compatible Time-Sharing System) do MIT permitiam que múltiplos usuários acessassem um mainframe simultaneamente a partir de terminais remotos, compartilhando o tempo de processamento da máquina central.
3.  **Primeiros Terminais Bancários:** Antes dos ATMs modernos, terminais operados por funcionários em agências bancárias se conectavam a um computador central para consultar saldos e registrar transações.
4.  **Acesso Remoto a Bases de Dados:** Empresas e instituições acadêmicas utilizavam teleprocessamento para permitir que pesquisadores ou funcionários acessassem bases de dados centralizadas a partir de locais remotos.

## Características

*   **Computador Central (Host):** Um mainframe ou minicomputador realizava a maior parte do processamento.
*   **Terminais Remotos:** Dispositivos (muitas vezes "burros", apenas para entrada/saída) localizados longe do host.
*   **Linhas de Comunicação:** Inicialmente, linhas telefônicas discadas ou dedicadas (privativas) eram usadas, conectadas através de modems.
*   **Modems (Modulador-Demodulador):** Equipamentos necessários para converter sinais digitais do computador/terminal em sinais analógicos para transmissão pela linha telefônica, e vice-versa.
*   **Protocolos de Comunicação:** Conjuntos de regras para controlar a troca de dados entre terminal e host, garantindo a integridade e o fluxo da informação.
*   **Software de Controle de Comunicação:** Programas no host para gerenciar as conexões com os terminais remotos.

## Vantagens (na Época)

*   **Acesso Remoto:** Permitiu o acesso a recursos computacionais caros a partir de locais distantes.
*   **Compartilhamento de Recursos:** O alto custo dos mainframes era diluído ao permitir que muitos usuários o acessassem remotamente.
*   **Dispersão Geográfica:** Viabilizou operações de negócios em múltiplos locais (ex: agências bancárias, escritórios de vendas).
*   **Centralização de Dados:** Mantinha os dados importantes em um local seguro e controlado.

## Desvantagens (na Época)

*   **Alto Custo das Comunicações:** Linhas dedicadas eram caras, e linhas discadas eram lentas e sujeitas a ruídos.
*   **Baixa Velocidade de Transmissão:** As taxas de transmissão de dados eram muito limitadas (medidas em bauds).
*   **Complexidade:** Configurar e manter a infraestrutura de comunicação e os modems era complexo.
*   **Dependência do Host Central:** Similar ao processamento centralizado, a falha do host impactava todos os usuários remotos.
*   **Capacidade Limitada dos Terminais:** Os terminais tinham pouca ou nenhuma inteligência local.

## Seção Expandida

O teleprocessamento evoluiu significativamente desde seus primórdios. Inicialmente, as conexões eram ponto a ponto, muitas vezes usando protocolos simples e proprietários. Com o tempo, surgiram as unidades controladoras de terminais e de comunicação para gerenciar múltiplas conexões de forma mais eficiente. O desenvolvimento de padrões de comunicação, impulsionado por instituições como a ITU-T (antigo CCITT) e a ISO, foi crucial. Protocolos como o BSC (Binary Synchronous Communications) da IBM e, posteriormente, arquiteturas mais complexas como a SNA (Systems Network Architecture) da IBM e a DNA (Digital Network Architecture) da DEC, trouxeram mais robustez e funcionalidades. O teleprocessamento foi o precursor direto das redes de longa distância (WANs) e estabeleceu muitos dos princípios básicos de comunicação de dados que foram posteriormente adaptados e expandidos na era da internet e das redes locais (LANs).

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Instituições_de_Padronização]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Controladoras_de_Comunicação]]
*   [[Terminais_de_Dados]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]
*   [[Linhas_Discadas_–_LD]]

