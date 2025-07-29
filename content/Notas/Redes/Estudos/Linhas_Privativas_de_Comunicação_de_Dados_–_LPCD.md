---
Tema Principal: 48-Linhas Privativas de Comunicação de Dados – LPCD
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes WAN
tags:
  - LPCD
  - Linha
  - Dedicado
  - WAN
  - Telecomunicações
---

# 48-Linhas Privativas de Comunicação de Dados – LPCD

## Visão Geral

Linha Privativa de Comunicação de Dados (LPCD), frequentemente chamada simplesmente de "Linha Privada" ou "Circuito Dedicado", é um serviço de telecomunicações que fornece uma conexão ponto a ponto permanente e exclusiva entre dois locais especificados pelo cliente. Este termo foi (e ainda é, em alguns contextos) amplamente utilizado no Brasil pelas operadoras de telecomunicações. Diferente das linhas comutadas (como as linhas telefônicas convencionais ou a internet pública), a LPCD oferece uma capacidade de transmissão (largura de banda) fixa e garantida, disponível 24 horas por dia, 7 dias por semana, para uso exclusivo do contratante. Elas foram a espinha dorsal para a construção de Redes de Longa Distância (WANs) corporativas por muitos anos, interligando matrizes, filiais, data centers e outros pontos de presença.

## Definição

Uma LPCD é um circuito de comunicação alugado de uma operadora que estabelece um caminho físico ou lógico dedicado e não compartilhado entre dois pontos geográficos. A operadora garante a disponibilidade contínua do circuito e a largura de banda contratada (que podia variar desde baixas velocidades, como 64 kbps, até velocidades mais altas como E1/T1 - 2 Mbps/1.5 Mbps, ou superiores com tecnologias mais recentes). A conexão é permanente, não exigindo discagem ou estabelecimento de chamada. O custo é geralmente uma mensalidade fixa, independentemente do volume de dados trafegado.

## Exemplos

1.  **Interconexão de Escritórios:** Uma empresa alugando uma LPCD de 2 Mbps (um circuito E1) para conectar sua matriz em São Paulo à sua filial no Rio de Janeiro.
2.  **Conexão com Provedor de Internet (Legado):** Empresas podiam usar LPCDs para estabelecer uma conexão dedicada e de alta qualidade com o ponto de presença (POP) de seu provedor de internet.
3.  **Aplicações Financeiras:** Bancos utilizando LPCDs para conectar agências ou caixas eletrônicos a seus data centers, garantindo segurança e disponibilidade.
4.  **Sistemas Críticos:** Conexões para controle de tráfego aéreo, redes de energia ou outros sistemas que exigem comunicação constante e confiável.
5.  **Backbone de Redes:** Operadoras menores ou provedores regionais podiam alugar LPCDs de alta capacidade de operadoras maiores para formar seus backbones.

## Características

*   **Dedicada/Exclusiva:** O circuito é de uso exclusivo do cliente.
*   **Ponto a Ponto:** Conecta especificamente dois locais.
*   **Permanente (Always On):** A conexão está sempre ativa.
*   **Largura de Banda Fixa e Garantida:** A capacidade contratada está sempre disponível.
*   **Qualidade de Serviço (QoS) Previsível:** Latência, jitter e perda de pacotes tendem a ser mais estáveis.
*   **Custo Fixo Mensal:** Modelo de precificação baseado em assinatura.
*   **Tecnologia Variada:** Podem ser implementadas sobre par de cobre, fibra óptica, rádio, etc.
*   **Interface Padrão:** Entregue ao cliente através de interfaces padrão (ex: V.35, G.703, Ethernet) via um DCE ([[Equipamentos_de_Comunicação_de_Dados_(DCE)]]) como um modem ou CSU/DSU.

## Vantagens

*   **Confiabilidade e Disponibilidade:** Geralmente oferecem alta disponibilidade e Service Level Agreements (SLAs) garantidos pela operadora.
*   **Desempenho Consistente:** Largura de banda garantida e QoS previsível, ideal para aplicações sensíveis à latência ou que exigem taxa de transferência constante.
*   **Segurança:** Por ser um circuito privado, oferece maior segurança inerente contra interceptação externa comparado a redes públicas (embora criptografia ainda seja recomendável).
*   **Simplicidade (Conceitual):** Do ponto de vista da rede do cliente, funciona como um "fio" direto entre dois pontos.

## Desvantagens

*   **Alto Custo:** Tradicionalmente, um dos serviços de conectividade WAN mais caros, especialmente para longas distâncias e altas velocidades.
*   **Inflexibilidade:** Alterar a largura de banda, adicionar ou mover pontos pode ser um processo lento e caro.
*   **Ineficiência para Tráfego Variável:** A largura de banda fixa pode ser subutilizada se o tráfego for muito intermitente ou em rajadas.
*   **Não Escalável para Topologias Complexas:** Construir uma rede em malha (full mesh) com LPCDs torna-se rapidamente proibitivo em termos de custo.
*   **Tempo de Provisionamento:** O tempo para instalar uma nova LPCD pode ser longo.
*   **Alternativas Modernas:** Tecnologias como MPLS VPNs e SD-WAN sobre links de internet banda larga oferecem alternativas mais flexíveis e com melhor custo-benefício em muitos cenários hoje em dia.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Ligação_Ponto_a_Ponto_Dedicado]] (Conceito geral)
*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Multiplexação]]
*   [[Unidade_de_Derivação_Digital_(UDD)_e_Unidade_de_Derivação_Analógica_(UDA)]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Discadas_–_LD]]
