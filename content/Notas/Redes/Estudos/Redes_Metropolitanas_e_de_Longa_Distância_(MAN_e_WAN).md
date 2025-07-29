---
Tema Principal: 88-Redes Metropolitanas e de Longa Distância (MAN e WAN)
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Conceitos Fundamentais, Telecomunicações
tags:
  - Rede
  - Interconexão
---

# 88-Redes Metropolitanas e de Longa Distância (MAN e WAN)

## Visão Geral

Enquanto as Redes Locais (LANs - [[Redes_Locais_(LAN)]]) cobrem áreas geográficas pequenas, as Redes Metropolitanas (MANs - Metropolitan Area Networks) e as Redes de Longa Distância (WANs - Wide Area Networks) são projetadas para interconectar dispositivos e redes sobre áreas geográficas muito maiores. Uma MAN tipicamente abrange uma cidade ou uma grande área metropolitana, enquanto uma WAN pode cobrir regiões, países ou até mesmo o globo inteiro (a Internet é o maior exemplo de WAN). Diferente das LANs, a infraestrutura de MANs e WANs (links de comunicação de longa distância) é frequentemente de propriedade e operada por operadoras de telecomunicações ou provedores de serviços, e as organizações alugam capacidade nesses links para conectar suas próprias LANs ou dispositivos remotos.

## Definição

*   **MAN (Metropolitan Area Network):** Uma rede que interconecta usuários com recursos de computador em uma área geográfica ou região maior que a coberta por uma LAN, mas menor que a área coberta por uma WAN. Geralmente abrange uma cidade. Tecnologias como DQDB (Distributed Queue Dual Bus) e alguns serviços Metro Ethernet se encaixam nesta categoria.
*   **WAN (Wide Area Network):** Uma rede de telecomunicações que se estende por uma grande área geográfica para o propósito primário de comunicação de computadores. WANs são usadas para conectar LANs e outras redes juntas, para que usuários e computadores em um local possam se comunicar com usuários e computadores em outros locais. Utilizam tecnologias como linhas alugadas ([[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]), Frame Relay, ATM, MPLS e a própria Internet.

## Exemplos

*   **MAN:**
    *   Rede de fibra óptica de uma operadora cobrindo uma cidade para oferecer serviços de Internet e conectividade corporativa (Metro Ethernet).
    *   Rede de TV a cabo que também oferece serviços de Internet em uma cidade.
    *   Redes WiMAX (IEEE 802.16) que visavam cobertura metropolitana sem fio (com sucesso limitado).
*   **WAN:**
    *   **A Internet:** A maior WAN existente, interconectando bilhões de dispositivos globalmente.
    *   **Rede Corporativa Privada:** Uma empresa com escritórios em várias cidades ou países, conectando suas LANs através de links de WAN alugados (ex: MPLS VPN) ou túneis VPN sobre a Internet.
    *   **Redes de Operadoras de Telecomunicações:** A infraestrutura de longa distância usada para transportar voz e dados entre cidades e países.
    *   **Redes de Satélite:** Usadas para fornecer conectividade em áreas remotas ou para comunicação global.

## Características

| Característica        | MAN                                    | WAN                                          |
| :-------------------- | :------------------------------------- | :------------------------------------------- |
| **Escopo Geográfico** | Cidade / Área Metropolitana            | Região / País / Continente / Global          |
| **Propriedade**       | Frequentemente Operadora/Provedor      | Geralmente Operadora/Provedor (Infra.)       |
| **Tecnologias**     | Metro Ethernet, DQDB, WiMAX (legado) | Linhas Alugadas, MPLS, Frame Relay, ATM, Satélite, Internet |
| **Velocidade**        | Geralmente Alta (Mbps a Gbps)          | Variável (Kbps a muitos Gbps), tipicamente menor que LAN/MAN para custo similar |
| **Latência**          | Moderada                               | Geralmente Alta                              |
| **Custo**             | Moderado a Alto                        | Geralmente Alto (links de longa distância)   |

## Vantagens

*   **MAN/WAN:**
    *   **Ampla Cobertura Geográfica:** Permitem conectar locais distantes.
    *   **Compartilhamento de Informações:** Facilitam a comunicação e o compartilhamento de dados entre locais geograficamente dispersos.
    *   **Acesso a Recursos Remotos:** Permitem acessar serviços e recursos centralizados ou distribuídos globalmente (ex: Internet).
*   **MAN (Específico):**
    *   Pode oferecer uma solução de conectividade de alta velocidade mais econômica que links de WAN dedicados para conectar múltiplos locais dentro da mesma cidade.

## Desvantagens

*   **MAN/WAN:**
    *   **Custo:** Links de longa distância e serviços de operadora podem ser caros.
    *   **Velocidade (Relativa):** Frequentemente mais lentas que LANs.
    *   **Latência:** Atrasos maiores devido às longas distâncias e múltiplos saltos.
    *   **Complexidade:** Gerenciar e solucionar problemas em WANs pode ser complexo.
    *   **Segurança:** Transmitir dados sobre redes públicas ou de terceiros requer medidas de segurança robustas (criptografia, VPNs).
    *   **Dependência de Terceiros:** A disponibilidade e a qualidade do serviço muitas vezes dependem da operadora de telecomunicações.

## Seção Expandida: Tecnologias Comuns de WAN

*   **Linhas Alugadas (Leased Lines):** Conexões ponto a ponto dedicadas e permanentes entre dois locais, alugadas de uma operadora (ex: T1/E1, T3/E3). Oferecem largura de banda garantida, mas são caras.
*   **Comutação de Circuitos:** Cria um caminho dedicado temporário para a comunicação (ex: ISDN, rede telefônica legada). Ineficiente para tráfego em rajadas.
*   **Comutação de Pacotes:** Dados são divididos em pacotes e enviados pela rede compartilhada (ex: X.25 [[Protocolo_X.25]], Frame Relay, ATM, IP). Mais eficiente para dados.
*   **MPLS (Multiprotocol Label Switching):** Tecnologia moderna usada por operadoras para criar WANs eficientes e gerenciáveis, oferecendo VPNs de Camada 2 ou 3 com QoS.
*   **Internet (VPNs):** Usar a Internet pública como infraestrutura de WAN, criando túneis seguros (VPNs - Virtual Private Networks) entre os locais usando protocolos como IPsec ou SSL/TLS.

## Notas Relacionadas

*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]
*   [[Protocolos_de_Comunicação]]
*   [[Protocolo_X.25]]
*   [[Protocolo_TCP-IP]]
*   [[Rede_Ponto_a_Ponto]] (Base para links WAN)
*   [[Roteador]] (Dispositivo chave em WANs)
*   [[Redes_Locais_(LAN)]] (Contraste)
