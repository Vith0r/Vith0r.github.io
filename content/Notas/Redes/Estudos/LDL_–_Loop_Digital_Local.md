---
Tema Principal: 61-LDL – Loop Digital Local
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Acesso
tags:
  - Loop
  - Local
  - Digital
  - Rede
  - Acesso
  - Telecomunicações
---

# 61-LDL – Loop Digital Local

## Visão Geral

O Loop Digital Local (LDL), também conhecido como "Local Digital Loop" em inglês, refere-se à porção da rede de acesso de telecomunicações que utiliza tecnologia de transmissão digital para conectar diretamente a instalação do cliente (residência, empresa) à central telefônica local (CO - Central Office) da operadora. Ele representa a evolução do tradicional loop analógico local (LAL), permitindo a oferta de serviços digitais integrados, como ISDN (Rede Digital de Serviços Integrados) ou acesso primário T1/E1, diretamente sobre a infraestrutura de par de cobre existente, mas utilizando técnicas de codificação e transmissão digitais em vez de sinais analógicos de voz.

## Definição

LDL é o circuito físico (geralmente um par de cobre) e a tecnologia de transmissão digital associada que se estende do ponto de terminação de rede na localidade do assinante (ex: o equipamento NT1 no caso do ISDN) até o equipamento de linha correspondente na central telefônica local. Diferente do LAL ([[LAL_–_Loop_Analógico_Local]]), que transporta sinais analógicos na faixa de voz (300-3400 Hz), o LDL transporta um fluxo de bits digitais usando códigos de linha específicos (como 2B1Q para ISDN BRI ou AMI/B8ZS/HDB3 para ISDN PRI/T1/E1).

## Exemplos

1.  **ISDN BRI (Basic Rate Interface):** O acesso básico ISDN (2 canais B de 64 kbps + 1 canal D de 16 kbps = 144 kbps) utiliza um LDL sobre um único par de cobre padrão, empregando codificação como 2B1Q para transmitir os 144 kbps digitalmente.
2.  **ISDN PRI (Primary Rate Interface) / Linhas T1/E1:** O acesso primário ISDN ou linhas T1/E1 (1.544/2.048 Mbps) também são exemplos de serviços entregues via LDL, geralmente requerendo pares de cobre de melhor qualidade ou múltiplos pares, e usando codificações como AMI com substituição de zeros ([[Codificação_AMI_–_Inversão_Alternada_de_Marcas]]).
3.  **HDSL (High-bit-rate Digital Subscriber Line):** Uma das primeiras tecnologias DSL, projetada para fornecer serviço T1/E1 simétrico sobre pares de cobre existentes, pode ser considerada uma forma de LDL.

## Características

*   **Transmissão Digital:** Transporta dados na forma de bits digitais.
*   **Conexão Local:** Liga o cliente diretamente à central local.
*   **Uso de Par de Cobre:** Geralmente implementado sobre a infraestrutura de cobre existente.
*   **Codificação de Linha Específica:** Utiliza códigos como 2B1Q, AMI, B8ZS, HDB3 para representar os bits no meio físico.
*   **Serviços Digitais:** Permite a oferta de serviços como ISDN, T1/E1.
*   **Não Compartilhado (Geralmente):** O loop físico é dedicado ao assinante até a central.

## Vantagens

*   **Maior Qualidade:** A transmissão digital é menos suscetível a ruído e degradação do que a analógica.
*   **Maior Velocidade:** Permite taxas de dados significativamente maiores que o LAL tradicional.
*   **Serviços Integrados:** Possibilita a integração de voz e dados sobre a mesma linha (ex: ISDN).
*   **Reutilização da Infraestrutura:** Permite oferecer serviços digitais sobre a rede de cobre já instalada.

## Desvantagens

*   **Limitação de Distância:** A taxa de dados alcançável em tecnologias LDL (como ISDN, T1/E1 sobre cobre) diminui com a distância do loop.
*   **Custo (Histórico):** Serviços baseados em LDL (como ISDN) eram historicamente mais caros que o serviço telefônico analógico básico.
*   **Complexidade:** Requer equipamentos de terminação (NT - Network Termination) na ponta do cliente e equipamentos de linha digital na central.
*   **Superado por xDSL/Fibra:** Tecnologias mais recentes como ADSL, VDSL e Fibra Óptica (FTTH) oferecem velocidades muito superiores sobre o mesmo loop local ou substituindo-o, tornando o LDL tradicional (ISDN, T1/E1 sobre cobre para acesso) menos comum para novos serviços residenciais ou de pequenas empresas, embora T1/E1 ainda sejam usados em contextos empresariais específicos.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]] (T1/E1 como serviço)
*   [[Codificação_AMI_–_Inversão_Alternada_de_Marcas]]
*   [[Enlaces]]
*   [[LAL_–_Loop_Analógico_Local]] (Contraste)
*   [[LDR_–_Loop_Digital_Remoto]]
*   [[LAR_–_Loop_Analógico_Remoto]]

