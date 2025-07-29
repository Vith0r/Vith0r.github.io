---
Tema Principal: 74-Protocolo X.25
Nível de Dificuldade: Avançado
Fonte/Referência: Redes de Computadores, Telecomunicações, Padrões ITU-T
tags:
  - Protocolo
  - Rede
  - WAN
---

# 74-Protocolo X.25

## Visão Geral

O X.25 é um conjunto de protocolos padrão da ITU-T para Redes de Longa Distância (WANs) de comutação de pacotes. Desenvolvido nos anos 70, o X.25 foi um dos primeiros padrões de rede de pacotes amplamente adotados, definindo a interface entre o equipamento do usuário (DTE - [[Equipamentos_Terminais_de_Dados_(DTE)]]) e a rede pública de dados (DCE - [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]). Ele oferece um serviço orientado à conexão, confiável, estabelecendo "circuitos virtuais" (VCs) através da rede de pacotes. Embora largamente substituído por tecnologias mais modernas como Frame Relay, ATM e, principalmente, redes baseadas em IP, o X.25 foi fundamental para o desenvolvimento das redes de dados públicas e privadas, sendo usado por décadas em serviços como transações financeiras, sistemas de reservas e acesso a mainframes.

## Definição

X.25 é um padrão de interface DTE-DCE para operação em redes públicas de comutação de pacotes. Ele define três camadas de protocolos, correspondendo aproximadamente às três camadas inferiores do Modelo OSI:
1.  **Camada Física (Camada 1):** Define a interface física e elétrica entre o DTE e o DCE. Padrões comuns incluem X.21 e X.21bis (que é compatível com RS-232 - [[Configuração_dos_Pinos_do_DB_25]], [[Descrição_dos_Pinos_do_DB_09]]).
2.  **Camada de Enlace de Dados (Camada 2):** Utiliza o protocolo LAPB (Link Access Procedure, Balanced), um subconjunto do HDLC ([[Adaptação_do_SDLC_-_HDLC]]), para fornecer uma conexão confiável e com controle de fluxo e erro no link físico entre o DTE e o DCE.
3.  **Camada de Pacote (Camada 3):** Define o formato dos pacotes e os procedimentos para estabelecer, manter e encerrar circuitos virtuais (VCs) através da rede de pacotes. Os VCs podem ser permanentes (PVCs - Permanent Virtual Circuits) ou comutados (SVCs - Switched Virtual Circuits).

## Exemplos de Uso (Histórico)

*   **Redes Públicas de Dados (PDNs):** Serviços como CompuServe, Tymnet, Telenet (nos EUA), DATAPAC (Canadá), TRANSPAC (França) eram baseados em X.25.
*   **Setor Financeiro:** Caixas eletrônicos (ATMs) e sistemas de Ponto de Venda (POS) frequentemente usavam X.25 para transações seguras e confiáveis.
*   **Sistemas de Reservas Aéreas:** Conectavam terminais de agências de viagens aos sistemas centrais.
*   **Acesso Remoto a Mainframes:** Terminais "burros" podiam acessar mainframes através de redes X.25 usando PADs (Packet Assembler/Disassembler).
*   **Interconexão de Redes Corporativas:** Antes do Frame Relay e do IP se tornarem dominantes.

## Características

*   **Orientado à Conexão:** Opera com base em Circuitos Virtuais (VCs).
*   **Comutação de Pacotes:** Os dados são divididos em pacotes que podem seguir caminhos diferentes na rede interna (embora o VC forneça uma conexão lógica ponta a ponta).
*   **Serviço Confiável:** Inclui controle de fluxo e erro robusto em múltiplas camadas (LAPB na camada 2, e mecanismos na camada 3 e dentro da rede X.25).
*   **Interface DTE-DCE:** Define especificamente a interação na borda da rede.
*   **Tarifação:** Frequentemente baseada no volume de dados transmitidos e na duração da conexão (para SVCs).
*   **Baixas Velocidades (Comparado a Hoje):** Projetado para operar sobre links de baixa velocidade e potencialmente não confiáveis (ex: 64 kbps era comum).

## Vantagens

*   **Confiabilidade:** O forte controle de erro e fluxo em múltiplas camadas tornava o X.25 muito robusto, adequado para as linhas de comunicação ruidosas da época.
*   **Padronização Internacional (ITU-T):** Permitiu a criação de redes de dados públicas globais interoperáveis.
*   **Compartilhamento de Recursos:** A comutação de pacotes permitia que múltiplos usuários compartilhassem eficientemente os caros links de longa distância.
*   **Circuitos Virtuais:** Ofereciam uma conexão lógica estável para as aplicações.

## Desvantagens

*   **Alto Overhead:** Os múltiplos níveis de controle de erro e fluxo (na camada 2, camada 3 e dentro da rede) introduziam um overhead significativo (cabeçalhos grandes, processamento) e latência.
*   **Baixa Eficiência em Links Confiáveis:** Em links modernos de alta qualidade (como fibra óptica), o extenso controle de erro do X.25 torna-se redundante e ineficiente.
*   **Baixa Velocidade:** Projetado para velocidades baixas, não escalou bem para as demandas de banda larga.
*   **Complexidade:** A pilha de protocolos era relativamente complexa.
*   **Substituído:** Tecnologias como Frame Relay (que simplificou a camada 2/3 movendo o controle de erro para as pontas), ATM e, principalmente, o TCP/IP sobre diversas tecnologias de enlace (Ethernet, MPLS) ofereceram maior velocidade, menor latência e melhor custo-benefício, levando à obsolescência do X.25 na maioria das aplicações.

## Seção Expandida: X.25 vs. TCP/IP

Embora ambos usem comutação de pacotes, há diferenças fundamentais:
*   **Orientação:** X.25 é inerentemente orientado à conexão na camada de rede (via VCs). IP é sem conexão (datagramas), com a orientação à conexão sendo fornecida opcionalmente pela camada de transporte (TCP).
*   **Confiabilidade:** X.25 fornece confiabilidade na camada de rede e enlace. IP oferece um serviço "best-effort" (não confiável), com a confiabilidade sendo responsabilidade da camada de transporte (TCP).
*   **Controle:** No X.25, a rede (operadora) tinha mais controle e inteligência. No modelo IP, a inteligência está nas pontas (dispositivos finais), e a rede é mais simples (apenas roteia pacotes).
*   **Flexibilidade:** O modelo TCP/IP provou ser muito mais flexível e adaptável a diferentes tecnologias de enlace subjacentes.

## Notas Relacionadas

*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Método_Cyclic_Redundancy_Checking_(CRC)]]
*   [[Enlaces]]
*   [[Configuração_dos_Pinos_do_DB_25]]
*   [[Descrição_dos_Pinos_do_DB_09]]
*   [[Protocolos_de_Comunicação]]
*   [[Adaptação_do_SDLC_-_HDLC]] (LAPB)
*   [[Protocolo_TCP-IP]] (Contraste)