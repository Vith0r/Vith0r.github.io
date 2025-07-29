---
Tema Principal: 64-LAR – Loop Analógico Remoto
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Acesso, Telefonia
tags:
  - Loop
  - Remoto
  - Analógico
  - DLC
  - Telefonia
---

# 64-LAR – Loop Analógico Remoto

## Visão Geral

O Loop Analógico Remoto (LAR) refere-se a uma arquitetura de rede de acesso onde o serviço telefônico analógico tradicional (POTS - Plain Old Telephone Service) é estendido a assinantes distantes da central telefônica (CO) através de um sistema intermediário, geralmente um Digital Loop Carrier (DLC). Embora o serviço final entregue ao assinante seja analógico (o mesmo que seria entregue por um LAL - [[LAL_–_Loop_Analógico_Local]]), a implementação entre a CO e o ponto de concentração próximo ao assinante (o Terminal Remoto - RT) utiliza tecnologia digital ([[LDR_–_Loop_Digital_Remoto]]). O RT converte o sinal digital do enlace feeder de volta para o formato analógico padrão POTS antes de entregá-lo ao assinante através de um curto loop de cobre. Portanto, LAR descreve o serviço analógico entregue remotamente, mas frequentemente implementado sobre uma infraestrutura LDR/DLC.

## Definição

LAR é a entrega de um serviço de loop de assinante analógico (POTS) a um cliente cuja conexão física passa por um Terminal Remoto (RT) de um sistema Digital Loop Carrier (DLC), em vez de se conectar diretamente à central telefônica (CO) via um LAL contínuo. O RT, conectado à CO por um enlace digital (feeder), realiza a conversão digital-analógica para fornecer o serviço POTS padrão ao assinante através do loop de distribuição final.

## Exemplos

1.  **Telefonia Rural ou Suburbana Distante:** Para fornecer serviço telefônico básico a áreas residenciais ou rurais muito distantes da CO, onde um LAL direto seria inviável ou de baixa qualidade, a operadora instala um RT/DLC. Múltiplas linhas POTS são transportadas digitalmente até o RT e então convertidas para analógico para os loops finais dos assinantes.
2.  **Grandes Condomínios ou Edifícios Comerciais:** Em vez de passar centenas de pares de cobre individuais desde a CO, a operadora pode instalar um RT no local, conectado por fibra ou T1/E1, e distribuir as linhas POTS a partir dali.
3.  **Sistemas DLC "Universais":** Muitos sistemas DLC são projetados para entregar tanto serviços digitais (como ISDN) quanto analógicos (POTS) a partir do mesmo Terminal Remoto, dependendo da placa de linha instalada para cada assinante.

## Características

*   **Serviço Final Analógico (POTS):** O assinante recebe o serviço telefônico padrão.
*   **Implementação via DLC/LDR:** Utiliza um Terminal Remoto (RT) e um enlace feeder digital entre a CO e o RT.
*   **Conversão D/A no RT:** O sinal é convertido de digital para analógico no RT antes de ir para o assinante.
*   **Loop de Distribuição Analógico Curto:** O trecho final entre o RT e o assinante é um loop de cobre analógico, geralmente curto.
*   **Transparente para o Assinante:** Idealmente, o serviço POTS entregue via LAR deve ser indistinguível do serviço entregue via LAL direto.

## Vantagens

*   **Extensão do Alcance POTS:** Permite fornecer telefonia básica a locais distantes com qualidade aceitável.
*   **Economia de Cobre:** Reduz drasticamente a necessidade de pares de cobre longos desde a CO.
*   **Consistência do Serviço:** Mantém a compatibilidade com equipamentos telefônicos analógicos padrão.

## Desvantagens

*   **Dependência de Energia no RT:** Assim como no LDR, o RT requer energia local, tornando-se um ponto de falha. A falha de energia no RT (se o backup falhar) interrompe o serviço telefônico, ao contrário do LAL direto alimentado pela CO.
*   **Custo do Equipamento DLC:** Requer investimento nos equipamentos da CO e no RT.
*   **Ponto de Falha Adicional:** O RT e o enlace feeder são pontos de falha adicionais na cadeia.
*   **Limitações para Banda Larga:** Embora o sistema DLC use um feeder digital, a entrega final analógica via LAR não suporta diretamente serviços xDSL. Para oferecer xDSL a partir de um RT, é necessário um RT-DSLAM, que já opera no domínio digital até mais perto do cliente (configuração mais próxima de um LDR para dados).

## Seção Expandida: LAR vs. LDR

A distinção chave é o tipo de serviço entregue no loop de distribuição final:
*   **LAR:** O loop de distribuição final (RT -> Assinante) carrega um sinal **analógico** (POTS).
*   **LDR:** O loop de distribuição final (RT -> Assinante) carrega um sinal **digital** (ISDN, T1/E1 via HDSL, etc.).

No entanto, ambos frequentemente compartilham a mesma infraestrutura de Digital Loop Carrier (DLC) entre a CO e o RT, com a diferença estando nas placas de linha usadas no RT e no equipamento terminal do assinante.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Enlaces]]
*   [[LDL_–_Loop_Digital_Local]]
*   [[LAL_–_Loop_Analógico_Local]]
*   [[LDR_–_Loop_Digital_Remoto]]
*   [[Meio_Físico_Par_Trançado]]