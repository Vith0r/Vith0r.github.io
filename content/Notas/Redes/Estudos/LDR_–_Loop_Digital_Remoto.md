---
Tema Principal: 63-LDR – Loop Digital Remoto
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Acesso
tags:
  - Loop
  - Remoto
  - Digital
  - DLC
  - Rede
  - Acesso
---

# 63-LDR – Loop Digital Remoto

## Visão Geral

O Loop Digital Remoto (LDR), frequentemente associado aos sistemas DLC (Digital Loop Carrier) ou SLC (Subscriber Loop Carrier), é uma arquitetura de rede de acesso que permite estender serviços digitais (como ISDN, T1/E1 ou mesmo POTS convertido para digital) a assinantes localizados distantes da central telefônica local (CO). Em vez de conectar cada assinante diretamente à CO com um longo loop de cobre individual (o que seria caro e tecnicamente inviável para longas distâncias devido à atenuação), o LDR utiliza um enlace digital de alta capacidade (geralmente fibra óptica ou linhas T1/E1) para conectar a CO a um equipamento intermediário chamado Terminal Remoto (RT - Remote Terminal) ou Concentrador, localizado mais próximo do grupo de assinantes. O RT então distribui os serviços aos assinantes individuais através de loops de cobre curtos. Essencialmente, o LDR multiplexa o tráfego de múltiplos assinantes em um link digital de alta velocidade, superando as limitações de distância do loop de cobre tradicional.

## Definição

LDR refere-se à combinação de um enlace digital de alta velocidade (feeder) entre a central telefônica (CO) e um Terminal Remoto (RT), e os loops de cobre individuais (distribution) que conectam o RT aos assinantes finais. O sistema como um todo (equipamento na CO, enlace feeder, RT e loops de distribuição) é conhecido como Digital Loop Carrier (DLC). O RT realiza a multiplexação/demultiplexação e a conversão entre o formato digital do enlace feeder e o formato (digital ou analógico convertido) dos loops de distribuição individuais.

## Exemplos

1.  **Extensão de ISDN:** Para oferecer ISDN a assinantes muito distantes da CO, onde um LDL direto não funcionaria, a operadora instala um RT em um armário na vizinhança. O RT é conectado à CO via fibra ou T1/E1, e os assinantes são conectados ao RT via loops de cobre curtos que suportam o LDL do ISDN.
2.  **Concentração de Linhas POTS:** Mesmo para telefonia analógica (POTS), sistemas DLC são usados para economizar cobre. Múltiplas linhas POTS são digitalizadas e multiplexadas no RT, transportadas digitalmente até a CO via feeder, e então convertidas de volta para analógico na CO (ou conectadas diretamente a um switch digital). Isso é tecnicamente um LAR ([[LAR_–_Loop_Analógico_Remoto]]) do ponto de vista do serviço final, mas utiliza tecnologia LDR/DLC na implementação.
3.  **Base para DSLAMs Remotos:** Equipamentos DSLAM (Digital Subscriber Line Access Multiplexer), que fornecem serviços xDSL, podem ser instalados em Terminais Remotos (RT-DSLAMs) conectados à rede principal via fibra, funcionando de forma análoga a um LDR para serviços de banda larga.

## Características

*   **Arquitetura de Dois Segmentos:** Feeder (CO <-> RT) e Distribuição (RT <-> Assinante).
*   **Enlace Feeder Digital:** Alta capacidade (T1/E1, fibra óptica).
*   **Terminal Remoto (RT):** Equipamento ativo localizado próximo aos assinantes, realiza multiplexação/demultiplexação e conversões.
*   **Loops de Distribuição Curtos:** Geralmente loops de cobre mais curtos que os loops locais diretos.
*   **Superação de Distância:** Permite estender o alcance de serviços digitais (e analógicos).
*   **Economia de Meios Físicos:** Reduz a necessidade de múltiplos pares de cobre longos desde a CO.

## Vantagens

*   **Extensão do Alcance:** Permite oferecer serviços digitais (e analógicos) a assinantes distantes da CO.
*   **Economia de Custo de Planta Externa:** Reduz significativamente a quantidade de cobre necessária em comparação com loops individuais longos.
*   **Melhor Qualidade (Potencial):** Loops de distribuição mais curtos podem oferecer melhor qualidade de sinal do que loops locais longos.
*   **Flexibilidade:** Permite a implantação de novos serviços mais perto dos clientes.

## Desvantagens

*   **Custo do Equipamento:** Requer investimento em Terminais Remotos (RTs) e no enlace feeder.
*   **Dependência de Energia no RT:** O RT é um equipamento ativo e requer alimentação elétrica local (geralmente com backup de bateria), tornando-o um ponto de falha potencial.
*   **Complexidade:** Adiciona complexidade à rede de acesso.
*   **Limitações do RT:** A capacidade e os tipos de serviço são limitados pelo equipamento RT instalado.
*   **Ponto de Falha Único:** Uma falha no RT ou no enlace feeder pode afetar múltiplos assinantes.

## Notas Relacionadas

*   [[Multiplexação]]
*   [[Enlaces]]
*   [[LDL_–_Loop_Digital_Local]]
*   [[LAL_–_Loop_Analógico_Local]]
*   [[LAR_–_Loop_Analógico_Remoto]]
*   [[Meio_Físico_Par_Trançado]]
