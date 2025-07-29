---
Tema Principal: 04-Processamento Centralizado
Nível de Dificuldade: Básico
Fonte/Referência: Arquitetura de Computadores e Sistemas Distribuídos
tags:
  - Processamento
  - Arquitetura
---

# 04-Processamento Centralizado

![[1.svg]]

## Visão Geral

O processamento centralizado é um modelo de arquitetura computacional onde a maior parte do processamento, armazenamento de dados e controle reside em um único computador central, geralmente um mainframe ou servidor potente. Os usuários interagem com o sistema central através de terminais "burros" (dumb terminals) ou clientes leves (thin clients) que possuem pouca ou nenhuma capacidade de processamento local. Este modelo foi dominante nas primeiras décadas da computação e ainda é relevante em cenários específicos que exigem alto controle e segurança.

## Definição

Processamento centralizado descreve uma arquitetura de sistema onde um computador central (host) executa todas ou a maioria das tarefas de processamento e gerenciamento de dados. Dispositivos periféricos, como terminais, servem primariamente como interfaces de entrada e saída, enviando dados para o centro e exibindo os resultados processados por ele. Toda a lógica da aplicação e os dados residem no servidor central.

## Exemplos

1.  **Sistemas Mainframe Tradicionais:** Grandes bancos e seguradoras historicamente utilizam mainframes para processar transações financeiras, gerenciar contas de clientes e executar aplicações críticas. Os funcionários acessam o sistema via terminais conectados diretamente ao mainframe.
2.  **Servidores de Terminal (Terminal Services / Remote Desktop Services):** Usuários se conectam remotamente a um servidor central que executa suas aplicações e desktops. O dispositivo local do usuário (thin client ou PC) atua principalmente como um display remoto.
3.  **Algumas Aplicações Web Antigas ou Específicas:** Arquiteturas onde toda a lógica de negócio e manipulação de dados ocorre exclusivamente no servidor web central, com o navegador do cliente apenas renderizando HTML.
4.  **Sistemas de Ponto de Venda (POS) Centralizados:** Em algumas configurações de varejo, os terminais de caixa apenas capturam a venda e enviam para um servidor central que processa o estoque, pagamento e registro.

## Características

*   **Ponto Único de Processamento:** A CPU principal e a memória estão localizadas no computador central.
*   **Armazenamento Centralizado:** Os dados são armazenados e gerenciados no sistema host.
*   **Terminais Dependentes:** Os dispositivos de acesso (terminais) têm capacidade de processamento limitada ou nula.
*   **Controle Central:** Facilita o gerenciamento, a segurança e a manutenção, pois tudo está concentrado em um local.
*   **Dependência do Host:** A disponibilidade de todo o sistema depende do funcionamento do computador central.

## Vantagens

*   **Controle e Segurança:** Mais fácil de controlar o acesso aos dados e garantir a segurança, pois tudo está em um único local.
*   **Gerenciamento Simplificado:** Atualizações de software, backups e manutenção são realizados centralmente.
*   **Consistência de Dados:** Garante que todos os usuários acessem a mesma versão dos dados e da lógica da aplicação.
*   **Economia em Terminais:** Terminais burros ou thin clients são geralmente mais baratos e consomem menos energia que PCs completos.
*   **Facilidade de Administração:** Menos pontos para administrar em comparação com sistemas distribuídos.

## Desvantagens

*   **Ponto Único de Falha:** Se o computador central falhar, todo o sistema fica indisponível.
*   **Gargalo de Desempenho:** O computador central pode se tornar um gargalo se o número de usuários ou a carga de processamento aumentar muito.
*   **Custo Elevado do Host:** O computador central (ex: mainframe) pode ter um custo inicial e de manutenção muito alto.
*   **Menor Escalabilidade (granular):** Escalar o sistema geralmente significa atualizar ou substituir o hardware central, o que pode ser caro e disruptivo.
*   **Latência de Rede:** A comunicação entre terminais e o host pode introduzir latência, especialmente em redes lentas.
*   **Menor Flexibilidade:** Menos flexível para adaptar-se a novas tecnologias ou necessidades departamentais específicas em comparação com modelos distribuídos.

## Notas Relacionadas

*   [[Processamento_em_Batch]]
*   [[Processamento_Online]]
*   [[Processamento_Distribuido]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Terminais_de_Dados]]

