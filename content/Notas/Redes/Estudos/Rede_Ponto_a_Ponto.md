---
Tema Principal: 80-Rede Ponto a Ponto
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Topologias de Rede, Telecomunicações
tags:
  - Topologia
  - Ponto
  - Ponto
  - Rede
  - Ponto
  - Ponto
  - Link
  - Dedicado
---

# 80-Rede Ponto a Ponto

## Visão Geral

A topologia de rede ponto a ponto (point-to-point topology) é a configuração de rede mais simples, consistindo em um link de comunicação dedicado que conecta exatamente dois nós (dispositivos). Não há outros dispositivos compartilhando o link; toda a capacidade do link está disponível exclusivamente para a comunicação entre esses dois pontos finais. Exemplos clássicos incluem uma conexão serial direta entre dois computadores, um link de micro-ondas entre duas antenas, ou uma linha T1/E1 dedicada conectando dois roteadores em locais diferentes. Embora simples, a topologia ponto a ponto é um bloco de construção fundamental para redes mais complexas. Redes em estrela ([[Rede_Estrela]]), por exemplo, são compostas por múltiplos links ponto a ponto conectando cada nó ao hub/switch central.

## Definição

Uma topologia ponto a ponto é uma conexão de rede que estabelece um link direto e dedicado entre dois pontos finais (nós ou dispositivos). A comunicação ocorre exclusivamente entre esses dois pontos sobre o link estabelecido.

## Exemplos

*   **Conexão Serial Direta:** Usando um cabo null modem ([[Cabo_Crossover_(DB_25)]]) para conectar as portas seriais de dois computadores.
*   **Linha Dedicada (Leased Line):** Uma linha T1/E1, E3/T3 ou outra linha alugada de uma operadora para conectar dois escritórios ou data centers ([[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]).
*   **Link de Fibra Óptica Direta:** Um par de fibras conectando diretamente dois switches ou roteadores.
*   **Link de Rádio (Micro-ondas, Laser):** Uma conexão sem fio direcional entre duas antenas ou dispositivos.
*   **Conexão Dial-up:** Uma conexão temporária ponto a ponto estabelecida sobre a rede telefônica comutada ([[Linhas_Discadas_–_LD]]) usando modems e protocolos como PPP.
*   **Links Individuais em Topologia Estrela:** Cada conexão entre um dispositivo final e o hub/switch central em uma rede estrela é um link ponto a ponto.
*   **Links entre Roteadores em WANs:** Muitas conexões que formam a espinha dorsal da Internet ou de grandes WANs são links ponto a ponto entre roteadores.

## Características

*   **Dois Nós:** Conecta exatamente dois dispositivos.
*   **Link Dedicado:** O caminho de comunicação não é compartilhado com outros nós.
*   **Simplicidade:** A topologia mais básica.
*   **Largura de Banda Total:** Toda a capacidade do link está disponível para os dois nós.
*   **Segurança (Relativa):** Mais seguro que meios compartilhados, pois o tráfego não é exposto a outros nós no mesmo link (embora a segurança dependa do meio físico e da criptografia).

## Vantagens

*   **Simplicidade:** Fácil de configurar e entender.
*   **Desempenho:** A largura de banda total do link está disponível, sem contenção com outros nós no mesmo link.
*   **Segurança:** Menos propenso a interceptação (sniffing) do que topologias de barramento.
*   **Confiabilidade (do Link):** A falha afeta apenas os dois nós conectados (a confiabilidade geral depende da qualidade do link em si).

## Desvantagens

*   **Não Escalável (Diretamente):** Não é prático para conectar muitos nós, pois exigiria um número muito grande de links (N*(N-1)/2 links para uma malha completa de N nós).
*   **Custo (para Longas Distâncias):** Links dedicados de longa distância (linhas alugadas) podem ser caros.
*   **Uso como Bloco de Construção:** Geralmente usado como parte de topologias maiores (estrela, malha, híbrida) em vez de ser a topologia completa da rede (exceto em casos muito específicos).

## Seção Expandida: Protocolo Ponto a Ponto (PPP)

O PPP (Point-to-Point Protocol) é um protocolo da camada de enlace de dados ([[Protocolos_de_Comunicação]]) projetado especificamente para operar sobre links ponto a ponto, sejam eles síncronos ou assíncronos, seriais ou baseados em pacotes. Ele fornece funções essenciais como:
*   **Enquadramento (Framing):** Define como encapsular os pacotes da camada de rede (ex: IP) para transmissão sobre o link (usando um formato semelhante ao HDLC - [[Adaptação_do_SDLC_-_HDLC]]).
*   **Autenticação:** Permite que os dois lados do link se autentiquem (ex: usando PAP ou CHAP).
*   **Negociação de Protocolo de Rede:** Permite que os dois lados concordem sobre qual(is) protocolo(s) da camada de rede serão transportados (ex: IP, IPX) usando o NCP (Network Control Protocol).
*   **Negociação de Opções de Link:** Permite negociar parâmetros do link, como compressão, usando o LCP (Link Control Protocol).

O PPP foi fundamental para conexões dial-up à Internet e ainda é usado em algumas conexões de banda larga (como PPPoE - PPP over Ethernet) e links seriais.

## Notas Relacionadas

*   [[Transmissão_Simplex]]
*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Ligação_Ponto_a_Ponto_Dedicado]]
*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]
*   [[Linhas_Discadas_–_LD]]
*   [[Enlaces]]
*   [[Cabo_Crossover_(DB_25)]] (Para conexão DTE-DTE)
*   [[Protocolos_de_Comunicação]]
*   [[Adaptação_do_SDLC_-_HDLC]]
*   [[Rede_Estrela]] (Composta por links ponto a ponto)

