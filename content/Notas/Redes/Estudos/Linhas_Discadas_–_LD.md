---
Tema Principal: 49-Linhas Discadas – LD
Nível de Dificuldade: Básico
Fonte/Referência: Telecomunicações, Redes WAN, História da Internet
tags:
  - Dial-up
  - Comutado
  - Telefonia
  - WAN
---

# 49-Linhas Discadas – LD

## Visão Geral

Linhas Discadas (LD), mais conhecidas internacionalmente como "dial-up lines", referem-se ao uso da Rede Telefônica Pública Comutada (PSTN - Public Switched Telephone Network) tradicional para estabelecer conexões de dados temporárias entre dois pontos. Utilizando modems, os computadores ou terminais podiam "discar" o número de telefone de outro sistema (como um servidor de acesso remoto de um provedor de internet ou um BBS) para estabelecer um circuito comutado dedicado durante a chamada. Este método foi a principal forma de acesso à internet para residências e pequenas empresas por muitos anos, antes da popularização das tecnologias de banda larga como DSL e cabo. Também foi usado para conexões WAN intermitentes entre escritórios ou para acesso remoto a redes corporativas.

## Definição

Uma Linha Discada é uma conexão de comunicação de dados estabelecida sob demanda através da rede telefônica pública comutada (PSTN). O processo envolve um dispositivo DTE ([[Equipamentos_Terminais_de_Dados_(DTE)]]) utilizando um modem ([[Equipamentos_de_Comunicação_de_Dados_(DCE)]]) para iniciar uma chamada para o número de telefone de um modem remoto conectado a outro DTE. Uma vez que a chamada é atendida e os modems negociam os parâmetros da conexão (handshake), um circuito temporário ponto a ponto é estabelecido, permitindo a transferência de dados. Ao final da sessão, a chamada é desligada, liberando o circuito. A velocidade era limitada pela qualidade da linha telefônica e pela tecnologia dos modems (evoluindo de 300 bps para até 56 kbps).

## Exemplos

1.  **Acesso à Internet Dial-up:** O uso mais emblemático. Usuários discavam para o número de acesso de um provedor (ISP - Internet Service Provider) para se conectar à internet.
2.  **Acesso a BBS (Bulletin Board Systems):** Antes da web, usuários discavam para BBSs para trocar mensagens, arquivos e jogar.
3.  **Conexão Remota a Redes Corporativas (RAS - Remote Access Service):** Funcionários podiam discar para um servidor RAS da empresa para acessar recursos da rede interna.
4.  **Transferência de Dados Intermitente:** Empresas podiam usar linhas discadas para transferências de baixo volume entre filiais, como envio de relatórios diários, quando uma linha dedicada (LPCD) era muito cara.
5.  **Comunicação Máquina-a-Máquina (M2M) Legada:** Alguns sistemas de monitoramento ou controle remoto utilizavam linhas discadas para enviar dados periodicamente.

## Características

*   **Conexão Temporária (Sob Demanda):** O circuito só existe durante a chamada.
*   **Baseada na PSTN:** Utiliza a infraestrutura telefônica existente.
*   **Comutação de Circuitos:** Estabelece um circuito dedicado temporário ([[Ligação_Ponto_a_Ponto_Comutado]]).
*   **Requer Modems:** Necessita de modems em ambas as extremidades para converter digital/analógico.
*   **Velocidade Limitada:** Taxas de transferência baixas (máximo teórico de 56 kbps para download, 33.6/48 kbps para upload).
*   **Ocupa a Linha Telefônica:** Impede o uso da linha para chamadas de voz simultaneamente (a menos que fosse uma segunda linha).
*   **Cobrança por Tempo (Geralmente):** O custo estava frequentemente associado à duração da chamada (pulsos telefônicos) e/ou a uma assinatura do provedor.

## Vantagens

*   **Ampla Disponibilidade (Histórica):** Utilizava a rede telefônica onipresente, tornando o acesso disponível em quase qualquer lugar com uma linha telefônica.
*   **Baixo Custo de Infraestrutura Inicial (para o usuário):** Requer apenas um modem e uma linha telefônica existente.
*   **Simplicidade de Uso:** O processo de discagem era relativamente simples.

## Desvantagens

*   **Baixa Velocidade:** A principal limitação. Extremamente lenta para os padrões modernos, inadequada para multimídia, downloads grandes ou navegação web complexa.
*   **Conexão Instável:** Sujeita a ruídos na linha telefônica, desconexões e variações de velocidade.
*   **Tempo de Conexão:** Havia um atraso para discar e estabelecer a conexão (handshake do modem).
*   **Ocupa a Linha Telefônica:** Impedia o uso da linha para voz.
*   **Custo por Tempo:** Podia se tornar caro se usado por longos períodos em planos tarifados por tempo.
*   **Obsolescência:** Amplamente substituída por tecnologias de banda larga (DSL, cabo, fibra, celular 3G/4G/5G) que oferecem velocidades muito maiores, conexões permanentes (always-on) e não ocupam a linha de voz.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Ligação_Ponto_a_Ponto_Comutado]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]] (especialmente Modems)
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]] (Contraste)
