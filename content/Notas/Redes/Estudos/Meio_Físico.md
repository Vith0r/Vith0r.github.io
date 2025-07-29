---
Tema Principal: 91-Meio Físico
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Camada Física, Telecomunicações
tags:
  - Meio
  - Transmissão
  - Cabeamento
  - Wireless
---

# 91-Meio Físico

## Visão Geral

O meio físico, no contexto de redes de computadores e telecomunicações, refere-se ao canal ou caminho físico através do qual os sinais que representam os dados são transmitidos de um ponto a outro. É o componente fundamental da Camada Física (Camada 1) do Modelo OSI ([[Modelo_de_Referência_OSI]]) e do Modelo TCP/IP ([[Modelo_TCP_IP]]). O meio físico pode ser tangível, como cabos de cobre ([[Meio_Físico_Par_Trançado]], [[Meio_Físico_Coaxial]]) ou fibra óptica ([[Meio_Físico_Fibra_Óptica]]), ou intangível, como o espaço livre através do qual as ondas de rádio ou micro-ondas se propagam ([[Meio_Físico_Wireless]], [[Meio_Físico_Rádio]], [[Meio_Físico_Microondas]]). A escolha do meio físico impacta diretamente características cruciais da rede, como a largura de banda ([[Largura_de_Banda]]), a distância máxima de transmissão, a suscetibilidade a interferências ([[Ruído_Impulsivo]], [[Ruído_Branco]]) e o custo.

## Definição

O meio físico é o substrato material ou não material que transporta os sinais de comunicação (elétricos, ópticos ou eletromagnéticos) entre os dispositivos de rede. Ele define as propriedades físicas e elétricas/ópticas da conexão.

## Exemplos

*   **Meios Guiados (Cabeados):**
    *   **Par Trançado (Twisted Pair):** Cabos UTP (Unshielded Twisted Pair) e STP (Shielded Twisted Pair) usados em Ethernet, telefonia. ([[Meio_Físico_Par_Trançado]])
    *   **Cabo Coaxial:** Usado em redes Ethernet antigas (10BASE5, 10BASE2), TV a cabo, algumas conexões de Internet. ([[Meio_Físico_Coaxial]])
    *   **Fibra Óptica:** Usa pulsos de luz para transmitir dados em alta velocidade e longas distâncias. ([[Meio_Físico_Fibra_Óptica]])
*   **Meios Não Guiados (Sem Fio / Wireless):**
    *   **Ondas de Rádio:** Usadas em Wi-Fi, Bluetooth, redes celulares (3G, 4G, 5G), rádio AM/FM. ([[Meio_Físico_Rádio]], [[Meio_Físico_Wireless]])
    *   **Micro-ondas:** Usadas em links ponto a ponto terrestres, redes de satélite, algumas tecnologias sem fio. ([[Meio_Físico_Microondas]])
    *   **Infravermelho:** Usado em controles remotos, comunicações de curta distância (IrDA - legado).

## Características

*   **Tangibilidade:** Pode ser guiado (cabo) ou não guiado (espaço livre).
*   **Largura de Banda:** Capacidade de transmissão de dados do meio ([[Largura_de_Banda]]).
*   **Atenuação:** Perda de força do sinal com a distância ([[Atenuação]]).
*   **Suscetibilidade a Interferência/Ruído:** Quão vulnerável o meio é a interferências eletromagnéticas (EMI) ou ruídos ([[Ruído_Impulsivo]], [[Ruído_Branco]]).
*   **Custo:** Custo do material e da instalação.
*   **Facilidade de Instalação:** Complexidade da instalação física.
*   **Segurança:** Facilidade com que os sinais podem ser interceptados.
*   **Distância:** Alcance máximo efetivo do sinal.

## Vantagens (Geral)

*   **Base da Comunicação:** É o que torna a comunicação à distância possível.
*   **Variedade:** Diversos tipos de meios disponíveis para diferentes necessidades e orçamentos.

## Desvantagens (Geral)

*   **Limitações Físicas:** Cada meio tem limitações inerentes de banda, distância e suscetibilidade a ruído.
*   **Custo:** Aquisição e instalação podem ser caras, especialmente para grandes distâncias ou meios de alta performance.
*   **Degradação:** Meios físicos podem se degradar com o tempo ou sofrer danos.

## Seção Expandida: Guiados vs. Não Guiados

*   **Meios Guiados ([[Meio_Físico_Guiado]]):**
    *   **Vantagens:** Geralmente oferecem maior largura de banda, maior segurança (mais difícil de interceptar sem acesso físico) e menor suscetibilidade a interferências externas (especialmente fibra óptica e STP).
    *   **Desvantagens:** Requerem instalação física (pode ser cara e disruptiva), menos mobilidade.
*   **Meios Não Guiados ([[Meio_Físico_Não_Guiado]]):**
    *   **Vantagens:** Mobilidade, facilidade de instalação (sem cabos), podem cobrir áreas onde cabear é difícil.
    *   **Desvantagens:** Geralmente menor largura de banda (para custo similar), mais suscetíveis a interferências e ruído, menor segurança (sinais podem ser interceptados mais facilmente), podem sofrer com obstáculos físicos e condições atmosféricas.

A escolha entre guiado e não guiado depende da aplicação, ambiente, requisitos de desempenho, segurança e orçamento.

## Notas Relacionadas

*   [[Atenuação]]
*   [[Ruído_Impulsivo]]
*   [[Distorção]]
*   [[Ruído_Branco]]
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico_Guiado]]
*   [[Meio_Físico_Não_Guiado]]
*   [[Meio_Físico_Coaxial]]
*   [[Meio_Físico_Wireless]]
*   [[Meio_Físico_Rádio]]
*   [[Meio_Físico_Microondas]]
*   [[Meio_Físico_Par_Trançado]]
*   [[Meio_Físico_Fibra_Óptica]]
*   [[Largura_de_Banda]]

