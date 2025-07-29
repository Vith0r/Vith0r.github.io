---
Tema Principal: 90-Modelo TCP-IP
Nível de Dificuldade: Fundamental
Fonte/Referência: Redes de Computadores, Internet, RFCs
tags:
  - TCP/IP
  - Modelo
  - TCP/IP
  - Modelo
  - Referência
  - Camadas
  - Internet
  - Protocolo
---

# 90-Modelo TCP/IP

## Visão Geral

O Modelo TCP/IP é um modelo de arquitetura de rede e um conjunto de protocolos de comunicação que formam a base da Internet e da maioria das redes de computadores atuais. Desenvolvido antes do Modelo OSI ([[Modelo_de_Referência_OSI]]), o TCP/IP surgiu de pesquisas financiadas pela DARPA nos EUA e foi projetado com foco na praticidade, resiliência e interconexão de redes heterogêneas. Ele organiza a comunicação em uma pilha de quatro ou cinco camadas (dependendo da representação), definindo como os dados são formatados, endereçados, transmitidos e roteados. Seus protocolos mais conhecidos, TCP (Transmission Control Protocol) e IP (Internet Protocol), dão nome ao modelo, mas ele engloba muitos outros protocolos essenciais para o funcionamento das redes modernas. Ao contrário do OSI, que é primariamente um modelo de referência, o TCP/IP é tanto um modelo quanto uma implementação prática de protocolos.

## Definição

O Modelo TCP/IP descreve a arquitetura de comunicação da Internet, dividindo as tarefas em camadas funcionais. As representações mais comuns são:

**Modelo de 4 Camadas (Original/RFC 1122):**
1.  **Camada de Aplicação:** Combina as funções das camadas de Aplicação, Apresentação e Sessão do OSI. Lida com protocolos de alto nível usados por aplicações (HTTP, SMTP, DNS, etc.) e a representação dos dados.
2.  **Camada de Transporte:** Responsável pela comunicação lógica ponta a ponta entre processos. Fornece serviços como segmentação, controle de fluxo e erro (TCP) ou um serviço de datagrama simples (UDP).
3.  **Camada de Internet:** Responsável pelo endereçamento lógico (IP), roteamento de pacotes entre redes e fragmentação. Define o formato do pacote IP e como ele é encaminhado.
4.  **Camada de Interface de Rede (ou Acesso à Rede/Enlace):** Combina as funções das camadas de Enlace e Física do OSI. Lida com a interface com o hardware de rede específico, o encapsulamento de pacotes IP em quadros e a transmissão de bits sobre o meio físico.

**Modelo de 5 Camadas (Híbrido/Pedagógico):** Frequentemente usado para melhor comparação com o OSI, separa a camada inferior em:
1.  Aplicação
2.  Transporte
3.  Rede (equivalente à Internet)
4.  Enlace de Dados
5.  Física

Esta nota focará no modelo de 4 camadas, que é mais fiel à filosofia original do TCP/IP.

## Exemplos (Protocolos por Camada - Modelo 4 Camadas)

*   **Aplicação:** HTTP, HTTPS, FTP, SMTP, POP3, IMAP, DNS, DHCP, Telnet, SSH, SNMP...
*   **Transporte:** TCP, UDP.
*   **Internet:** IP (IPv4, IPv6), ICMP, IGMP, ARP (embora ARP opere "sobre" a camada de enlace, é logicamente ligado à camada Internet para resolução de endereços).
*   **Interface de Rede:** Não define protocolos específicos, mas descreve como IP opera sobre Ethernet, Wi-Fi, PPP, Token Ring, FDDI, etc.

## Características

*   **Modelo Prático:** Baseado em protocolos que foram implementados e funcionam.
*   **Arquitetura em Camadas:** 4 (ou 5) camadas funcionais.
*   **Comutação de Pacotes:** Baseado em datagramas IP.
*   **Interconexão:** Foco em conectar redes diferentes.
*   **Endereçamento IP:** Esquema de endereçamento lógico.
*   **Padrões Abertos (RFCs):** Desenvolvido e mantido pela comunidade da Internet (IETF).
*   **Robustez:** Projetado para ser resiliente a falhas.

## Vantagens (Como Modelo e Suíte)

*   **Padrão da Internet:** Amplamente adotado e testado em escala global.
*   **Interoperabilidade:** Permite comunicação entre diversos sistemas.
*   **Escalabilidade:** Demonstrou capacidade de crescer enormemente.
*   **Flexibilidade:** Funciona sobre muitas tecnologias de rede subjacentes.
*   **Desenvolvimento Aberto:** Padrões abertos incentivam a inovação.

## Desvantagens (Como Modelo)

*   **Não Distingue Claramente Serviço, Interface e Protocolo:** O Modelo OSI é mais formal nesses aspectos.
*   **Não Descreve Tão Bem Redes Não-TCP/IP:** Menos genérico que o OSI como modelo puramente conceitual.
*   **Camada de Interface de Rede Ampla:** Combinar Enlace e Física pode obscurecer detalhes importantes dessas camadas.
*   **Modelo Surgiu Depois dos Protocolos:** O modelo foi mais uma descrição dos protocolos existentes do que um guia prescritivo para criá-los (ao contrário do OSI).

## Seção Expandida: Filosofia de Design

O design do TCP/IP foi guiado por alguns princípios chave:
1.  **Interconexão de Redes Existentes:** Foco em conectar redes heterogêneas, não em ditar como essas redes deveriam ser internamente.
2.  **Sobrevivência:** A rede deveria continuar funcionando mesmo que alguns nós ou links falhassem (levando ao roteamento dinâmico e à natureza sem conexão do IP).
3.  **Flexibilidade:** Deveria suportar múltiplas tecnologias de comunicação.
4.  **Arquitetura Aberta:** Permitir que qualquer um pudesse desenvolver e implementar os protocolos.
5.  **Inteligência nas Pontas (End-to-End Principle):** Funções complexas como controle de erro e fluxo deveriam ser implementadas nos hosts finais (TCP), mantendo a rede intermediária (IP) o mais simples possível (apenas roteamento best-effort). Isso facilitou a evolução da rede e a introdução de novas aplicações.

## Notas Relacionadas

*   [[Instituições_de_Padronização]] (IETF, DARPA)
*   [[Protocolos_de_Comunicação]]
*   [[Protocolo_TCP-IP]] (Nota focada na suíte de protocolos)
*   [[Roteador]] (Operação na Camada Internet)
*   [[Switch]] (Operação na Camada Interface de Rede/Enlace)
*   [[Modelo_de_Referência_OSI]] (Comparação)
