---
Tema Principal: 39-Unidade de Derivação Digital (UDD) e Unidade de Derivação Analógica (UDA)
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Dados Legadas
tags:
  - Analógico
  - Digital
  - Telecomunicações
  - Hardware
---

# 39-Unidade de Derivação Digital (UDD) e Unidade de Derivação Analógica (UDA)

## Visão Geral

As Unidades de Derivação Digital (UDD) e Analógica (UDA), também conhecidas como "line splitters" ou "modem sharing units", eram dispositivos utilizados em redes de comunicação de dados legadas, especialmente em configurações multiponto. Sua função principal era permitir que múltiplos terminais ou dispositivos de comunicação de dados (DCEs, como modems) localizados em um mesmo local físico compartilhassem uma única linha de comunicação física (geralmente uma linha privada - LPCD) conectada a um host remoto ou a uma controladora. Elas atuavam como um ponto de derivação ou "tap" na linha principal, distribuindo o sinal para os vários dispositivos locais e combinando os sinais de volta para a linha principal, de forma a otimizar o uso da linha e reduzir custos de cabeamento local.

## Definição

*   **Unidade de Derivação Analógica (UDA):** Um dispositivo passivo ou ativo que divide um sinal analógico de uma linha de comunicação principal (tipicamente 4 fios) em múltiplas saídas para conectar vários modems analógicos ou outros DCEs analógicos em um mesmo local. Ela também combina os sinais transmitidos por esses modems de volta para a linha principal. A UDA opera no nível do sinal analógico, antes da demodulação pelo modem.
*   **Unidade de Derivação Digital (UDD):** Um dispositivo que realiza uma função similar à UDA, mas opera com sinais digitais, após a interface entre o Equipamento Terminal de Dados (DTE, como um terminal ou computador) e o Equipamento de Comunicação de Dados (DCE, como um modem digital ou CSU/DSU - Channel Service Unit/Data Service Unit). Ela permite que múltiplos DTEs compartilhem uma única interface digital com um DCE, ou que um DTE se conecte a múltiplos DCEs (para redundância, por exemplo), ou ainda que múltiplos DCEs compartilhem a mesma linha digital. A UDD regenera o sinal digital para cada porta derivada.

## Exemplos

1.  **Compartilhamento de Modem Analógico (UDA):** Em um escritório com vários terminais que precisavam se conectar a um host remoto via uma única linha privada analógica, uma UDA poderia ser usada para conectar vários modems (um para cada grupo de terminais ou controlador local) à mesma linha física de 4 fios.
2.  **Compartilhamento de CSU/DSU (UDD):** Em um local com múltiplos roteadores ou outros DTEs que precisavam acessar uma linha digital dedicada (como uma T1/E1), uma UDD poderia ser usada para permitir que esses DTEs compartilhassem a mesma CSU/DSU conectada à linha.
3.  **Redundância de Linha (UDD):** Uma UDD poderia conectar um DTE (ex: roteador) a duas CSU/DSUs diferentes, cada uma conectada a uma linha digital separada, permitindo um chaveamento em caso de falha de uma das linhas.
4.  **Monitoramento de Linha (UDD/UDA):** Algumas unidades de derivação podiam ter uma porta de monitoramento para conectar equipamentos de teste sem interromper a comunicação principal.

## Características

**UDA (Analógica):**
*   Opera com sinais analógicos.
*   Divide/Combina sinais em linhas de 4 fios.
*   Pode ser passiva (simples divisão de sinal) ou ativa (com amplificação/regeneração).
*   Conecta múltiplos DCEs analógicos a uma linha.

**UDD (Digital):**
*   Opera com sinais digitais (interface DTE-DCE, ex: V.35, RS-232).
*   Regenera o sinal digital em cada porta.
*   Permite compartilhamento de DCE por múltiplos DTEs, ou compartilhamento de DTE por múltiplos DCEs.
*   Pode suportar diferentes interfaces digitais.

**Comuns:**
*   Permitem compartilhamento de linha/equipamento em um local físico.
*   Reduzem necessidade de cabeamento extenso ou múltiplos equipamentos caros (modems, CSU/DSUs).
*   Utilizadas em configurações ponto a ponto ou multiponto.

## Vantagens

*   **Economia de Custos:** Reduz o número de linhas dedicadas, modems ou CSU/DSUs necessários, diminuindo custos de equipamento e de aluguel de linhas.
*   **Simplificação do Cabeamento Local:** Evita a necessidade de passar múltiplos cabos de longa distância dentro de um mesmo prédio ou campus.
*   **Flexibilidade:** Permite adicionar ou remover dispositivos locais compartilhando a mesma infraestrutura de linha principal.
*   **Possibilidade de Redundância (UDD):** Facilita a implementação de links redundantes.

## Desvantagens

*   **Ponto Único de Falha:** A falha da UDA/UDD pode interromper a comunicação para todos os dispositivos conectados a ela.
*   **Degradação do Sinal (Especialmente UDA Passiva):** A divisão do sinal pode causar atenuação adicional.
*   **Complexidade Adicional:** Adiciona mais um componente ao circuito de comunicação, que precisa ser gerenciado e pode falhar.
*   **Limitações de Distância:** A distância entre a UDA/UDD e os dispositivos conectados é geralmente limitada.
*   **Tecnologia Legada:** São dispositivos associados a tecnologias de rede mais antigas (linhas privadas analógicas e digitais de baixa/média velocidade) e menos comuns em redes modernas baseadas em Ethernet e IP.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Ligação_Multiponto]]
*   [[Multiplexação]]
*   [[Concentrador_e_Conversor]]
*   [[Terminais_de_Dados]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]

