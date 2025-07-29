---
Tema Principal: 27-Ligação Ponto a Ponto Dedicado
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Ligação
  - Ponto
  - Ponto
  - Dedicado
  - Redes
  - WAN
  - LPCD
---

# 27-Ligação Ponto a Ponto Dedicado

## Visão Geral

Uma ligação ponto a ponto dedicada, também conhecida como linha privada ou circuito dedicado, é uma conexão de comunicação que interliga exclusivamente dois locais ou dois dispositivos específicos. Diferente das conexões comutadas (como a rede telefônica pública ou a internet), onde o caminho pode variar a cada comunicação, uma linha dedicada oferece um caminho fixo e permanente, com capacidade de transmissão (largura de banda) reservada para o uso exclusivo dos pontos conectados. Historicamente, eram a principal forma de conectar redes locais (LANs) de diferentes filiais de uma empresa para formar uma rede de longa distância (WAN), garantindo desempenho e segurança.

## Definição

Uma ligação ponto a ponto dedicada é um circuito de comunicação alugado de uma operadora de telecomunicações que fornece uma conexão direta e contínua entre dois pontos definidos pelo cliente. A linha não é compartilhada com outros usuários e a largura de banda contratada está sempre disponível, independentemente do tráfego de outros clientes da operadora. Essas linhas podem usar diferentes tecnologias físicas, como pares de cobre, fibra óptica ou enlaces de rádio, e podem transportar sinais digitais (como em circuitos T1/E1) ou, historicamente, analógicos.

## Exemplos

1.  **Interconexão de LANs Corporativas:** Uma empresa com escritórios em duas cidades diferentes pode alugar uma linha dedicada (ex: um circuito E1 ou uma conexão Metro Ethernet) para conectar os roteadores de suas respectivas LANs, criando uma WAN privada.
2.  **Conexão de Data Centers:** Empresas podem usar linhas dedicadas de alta capacidade (ex: fibra óptica escura ou comprimentos de onda dedicados) para conectar seus data centers para replicação de dados e recuperação de desastres.
3.  **Aplicações Críticas:** Sistemas que exigem alta disponibilidade e desempenho garantido, como controle de tráfego aéreo ou transações financeiras entre instituições, podem usar linhas dedicadas.
4.  **Links de Rádio Ponto a Ponto:** Em áreas onde a infraestrutura de cabos não está disponível ou é muito cara, enlaces de rádio micro-ondas dedicados podem ser usados para conectar dois locais.
5.  **Linhas Privativas de Comunicação de Dados (LPCD):** Termo frequentemente usado no Brasil para se referir a esses circuitos dedicados, especialmente os baseados em tecnologias mais antigas.

## Características

*   **Conexão Fixa:** O caminho entre os dois pontos é permanente.
*   **Exclusividade:** A capacidade do circuito é dedicada aos dois pontos conectados.
*   **Largura de Banda Garantida:** A taxa de transferência contratada está sempre disponível.
*   **Disponibilidade Contínua (24/7):** A linha está sempre ativa, não requer estabelecimento de chamada.
*   **Qualidade de Serviço (QoS) Previsível:** Desempenho (latência, jitter, perda de pacotes) tende a ser mais estável e previsível do que em redes compartilhadas.
*   **Custo Fixo Mensal:** Geralmente contratada com base em uma mensalidade fixa, independentemente do uso.

## Vantagens

*   **Desempenho Garantido:** A largura de banda e a qualidade de serviço são constantes e previsíveis.
*   **Alta Disponibilidade:** Por ser dedicada, tende a ser mais confiável que conexões compartilhadas.
*   **Segurança:** Sendo uma conexão privada entre dois pontos, oferece um nível inerente de segurança maior contra interceptação externa (embora a criptografia ainda seja recomendada).
*   **Simplicidade (do ponto de vista do usuário):** Uma vez estabelecida, funciona como uma conexão direta.
*   **Baixa Latência (geralmente):** O caminho direto e dedicado geralmente resulta em menor latência comparado a redes comutadas complexas.

## Desvantagens

*   **Custo Elevado:** Geralmente é a opção de conectividade WAN mais cara, especialmente para longas distâncias ou altas larguras de banda.
*   **Falta de Flexibilidade/Escalabilidade:** Mudar a largura de banda ou adicionar/remover locais pode ser um processo lento e caro, dependente da operadora.
*   **Ineficiência para Tráfego em Rajadas:** A largura de banda está sempre alocada, mesmo que não esteja sendo utilizada, o que pode ser ineficiente se o tráfego for muito variável.
*   **Dependência da Operadora:** O cliente depende da infraestrutura e da manutenção da operadora de telecomunicações.
*   **Não é Ideal para Topologias Complexas:** Conectar múltiplos locais em uma topologia de malha (mesh) usando apenas linhas dedicadas torna-se proibitivamente caro rapidamente (requer N*(N-1)/2 linhas para N locais).

## Notas Relacionadas

*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Ligação_Multiponto]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]
*   [[Linhas_Discadas_–_LD]]
