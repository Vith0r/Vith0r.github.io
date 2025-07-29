---
Tema Principal: Análise de Malware
tags:
  - Análise-Estática
  - Malware
  - Cybersegurança
  - Strings
related:
  - Análise-Dinâmica
  - MALDEV
author: Vithor
---

## **O que é uma String?**

Uma **string** é um tipo de *variável* que é incluída no código fonte do software. Este tipo de variável consiste em **cadeias de caracteres** que geralmente são feitas de palavras significativas ou grupos de palavras. Por exemplo, o seguinte código fonte C- contém variáveis de tipo string:

![[Strings.PNG]]

## Importância da análise de strings

Aqui estão alguns exemplos da informação que pode ser derivada de Strings

- **Nomes de arquivo**: As strings podem conter os ==nomes dos arquivos direcionados ou usados no sistema operacional==. Saber quais arquivos no sistema são direcionados e usados pode fornecer informações importantes sobre o comportamento do malware.

- **Caminhos de arquivo**: As strings dentro do código de malware podem incluir ==informações de caminho sobre os arquivos utilizados pelo malware==. Conhecer o diretório em que o malware opera pode agilizar o processo de análise e reduzir o tempo necessário. 

- **Endereços IP**: As strings podem conter endereços IP em formato legível. Esses endereços IP podem corresponder ao servidor Command & Control (C2) com o qual o malware se comunica para receber comandos.

- **Nomes de domínio**: O malware pode ==tentar exfiltrar dados da rede usando o protocolo DNS==. 

- **Endereços de URL**: O malware pode ==baixar arquivos ou recuperar as informações necessárias da Internet, ou da mesma forma, pode usar um endereço URL para exfiltrar dados da rede==.

- **Informações sobre a API do Windows**: O malware pode usar bibliotecas do Windows para executar operações no sistema. Por exemplo, "o invasor pode tentar se conectar remotamente ao sistema através da sessão iniciada pelo malware e gerenciar o sistema a partir da interface gráfica". As bibliotecas do Windows podem ser empregadas para determinar a presença ou ausência de atividade do usuário na tela ou para monitorar atividades semelhantes do sistema.

## Analisando as strings

Podemos utilizar o [Detect-It-Easy](https://github.com/horsicq/Detect-It-Easy) para dar uma olhada rápida nas strings de um programa:

<div align=center>
  <img alt="strings" src="Strings2.PNG">
</div>

