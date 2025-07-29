---
Tema Principal: 28-Ligação Ponto a Ponto Comutado
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Ligação
  - Ponto
  - Ponto
  - Comutado
  - Redes
  - WAN
  - Telefonia
---

# 28-Ligação Ponto a Ponto Comutado

## Visão Geral

A ligação ponto a ponto comutada, mais conhecida como comunicação por comutação de circuitos, é um método de estabelecer uma conexão temporária e dedicada entre dois pontos através de uma rede. Diferente de uma linha dedicada permanente, um circuito comutado é estabelecido sob demanda (por exemplo, ao discar um número de telefone) e mantido exclusivamente para essa comunicação específica durante toda a sua duração. Ao final da comunicação, o circuito é desfeito, liberando os recursos da rede para outras chamadas. Este foi o princípio fundamental da rede telefônica pública por décadas e também foi utilizado para acesso à internet discada e algumas conexões de dados mais antigas.

## Definição

Comutação de circuitos é uma técnica de rede que estabelece um caminho de comunicação físico ou lógico dedicado (um circuito) entre dois nós ou terminais antes que eles possam se comunicar. Durante a fase de estabelecimento da conexão, os recursos necessários ao longo do caminho (como canais em multiplexadores ou portas em comutadores) são reservados exclusivamente para essa sessão. Uma vez estabelecido, o circuito garante uma taxa de transferência constante e um atraso de propagação fixo. A comunicação ocorre, e ao final, o circuito é explicitamente desfeito (tear-down). A rede telefônica pública comutada (PSTN) é o exemplo clássico de uma rede baseada em comutação de circuitos.

## Exemplos

1.  **Rede Telefônica Pública Comutada (PSTN):** Ao fazer uma chamada telefônica tradicional, um circuito dedicado é estabelecido através das centrais telefônicas entre o telefone de origem e o de destino. Esse circuito permanece ativo durante toda a chamada.
2.  **Acesso à Internet Discado (Dial-up):** O modem do usuário discava para um número do provedor de internet, estabelecendo um circuito comutado através da PSTN para a transferência de dados.
3.  **ISDN (Integrated Services Digital Network - Rede Digital de Serviços Integrados):** Uma tecnologia que oferecia canais digitais comutados (canais B) para voz ou dados, estabelecidos sob demanda.
4.  **Algumas Redes de Videoconferência Legadas:** Utilizavam conexões ISDN ou outras linhas comutadas para estabelecer links temporários entre os locais.
5.  **Linhas Discadas (LD) para Transferência de Dados:** Antes da popularização da internet banda larga e das VPNs, empresas podiam usar linhas discadas para transferências de dados intermitentes entre locais.

## Características

*   **Orientado à Conexão:** Requer três fases: estabelecimento do circuito, transferência de dados e desconexão do circuito.
*   **Reserva de Recursos:** Largura de banda e recursos de comutação são dedicados durante a chamada.
*   **Caminho Fixo (Temporário):** O caminho estabelecido permanece o mesmo durante toda a sessão.
*   **Largura de Banda Constante:** Garante uma taxa de transferência fixa e contínua após o estabelecimento.
*   **Atraso Constante:** A latência de ponta a ponta é predominantemente o atraso de propagação, que é constante.
*   **Possibilidade de Bloqueio:** A conexão pode falhar se não houver recursos disponíveis na rede para estabelecer o circuito (sinal de ocupado).
*   **Cobrança por Tempo (Tipicamente):** O custo geralmente está associado à duração da conexão.

## Vantagens

*   **Desempenho Garantido (Durante a Conexão):** Uma vez estabelecido o circuito, a largura de banda é garantida e a latência é baixa e constante, ideal para aplicações em tempo real como voz.
*   **Simplicidade de Operação (para o usuário):** O processo de discar e conectar é familiar.
*   **Sem Congestionamento (no circuito estabelecido):** Como os recursos são dedicados, não há congestionamento dentro do circuito estabelecido (embora possa haver bloqueio inicial).

## Desvantagens

*   **Ineficiência de Recursos:** A largura de banda é reservada mesmo que não haja dados sendo transmitidos (ex: silêncio em uma chamada de voz, pausas na transferência de dados). Isso é muito ineficiente para tráfego de dados em rajadas (bursty), típico da internet.
*   **Tempo de Estabelecimento da Conexão:** Há um atraso inicial para estabelecer o circuito antes que a comunicação possa começar.
*   **Bloqueio:** A conexão pode ser bloqueada se a rede estiver congestionada.
*   **Custo (para uso contínuo ou dados):** Manter um circuito aberto pode ser caro, especialmente para longas durações ou transferências de dados que poderiam usar a capacidade de forma mais eficiente com comutação de pacotes.
*   **Largura de Banda Fixa:** A taxa de transferência é fixa e não se adapta dinamicamente às necessidades da aplicação.

## Notas Relacionadas

*   [[Ligação_Ponto_a_Ponto_Dedicado]]
*   [[Ligação_Multiponto]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Discadas_–_LD]]
