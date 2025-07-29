---
Tema Principal: 65-Comandos Hayes
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Hardware, História da Computação
tags:
  - Modem
  - Comunicação
  - Serial
  - Dial-up
---

# 65-Comandos Hayes

## Visão Geral

Os Comandos Hayes, mais conhecidos como **Comandos AT** (Attention Commands), formam um conjunto de instruções de controle desenvolvido originalmente pela Hayes Microcomputer Products para seus modems Smartmodem no início dos anos 80. Este conjunto de comandos tornou-se um padrão de fato para controlar modems dial-up e, posteriormente, foi adaptado para controlar outros tipos de dispositivos de comunicação, como modems GSM/GPRS/3G/4G/5G e alguns dispositivos Bluetooth. Os comandos AT permitem que um computador (DTE) envie instruções para o modem (DCE) através da mesma interface serial usada para a transmissão de dados, colocando o modem em modo de comando para configurar parâmetros, discar números, atender chamadas, verificar status e retornar ao modo de dados.

## Definição

O conjunto de comandos Hayes (Comandos AT) é uma linguagem de comando baseada em strings de texto curtas, usadas para controlar modems e outros dispositivos de comunicação. Os comandos geralmente começam com as letras "AT" (Attention), seguidas por um comando específico e, opcionalmente, parâmetros. O modem responde aos comandos com códigos de resultado (ex: "OK", "CONNECT", "NO CARRIER", "ERROR"). Para entrar no modo de comando enquanto uma conexão de dados está ativa, uma sequência de escape específica (geralmente "+++" com pausas antes e depois) é usada.

## Exemplos (Comandos Comuns)

*   **AT:** Comando básico de atenção. Usado para verificar se o modem está respondendo. Resposta esperada: "OK".
*   **ATZ:** Resetar o modem para as configurações de fábrica.
*   **ATD<número>:** Discar um número. Ex: `ATDT12345678` (T para discagem por tom, P para pulso).
*   **ATH:** Desligar (Hang up) a chamada.
*   **ATA:** Atender uma chamada recebida.
*   **ATE[0|1]:** Desativar (0) ou ativar (1) o eco local dos comandos.
*   **ATI[n]:** Exibir informações de identificação do modem (fabricante, modelo, versão).
*   **AT+CGMI:** (GSM/3GPP) Solicitar identificação do fabricante.
*   **AT+CGMM:** (GSM/3GPP) Solicitar identificação do modelo.
*   **AT+CSQ:** (GSM/3GPP) Verificar a qualidade do sinal.
*   **AT&F:** Restaurar perfil de fábrica.
*   **AT&W:** Salvar a configuração atual na memória não volátil.
*   **ATS0=n:** Definir o número de toques (n) antes de atender automaticamente.

## Características

*   **Baseado em Texto (ASCII):** Comandos são strings de caracteres fáceis de enviar por uma porta serial.
*   **Prefixo "AT":** Quase todos os comandos começam com "AT".
*   **Modo Comando vs. Modo Dados:** O modem opera em um desses dois modos.
*   **Sequência de Escape:** Permite alternar do modo dados para o modo comando (ex: "+++").
*   **Códigos de Resultado:** O modem envia respostas textuais indicando o sucesso ou falha do comando.
*   **Extensibilidade:** O padrão básico foi estendido por diferentes fabricantes e para diferentes tecnologias (ex: comandos AT+ para GSM/3GPP).

## Vantagens

*   **Padronização (De Facto):** Amplamente adotado, permitindo que softwares de comunicação controlassem modems de diferentes fabricantes.
*   **Simplicidade:** Relativamente fácil de usar e implementar em software de terminal.
*   **Controle Completo:** Oferecia controle granular sobre as funções do modem.
*   **Interface Unificada:** Usava a mesma porta serial para dados e controle.

## Desvantagens

*   **Legado:** Projetado primariamente para modems dial-up, menos relevante para conexões banda larga modernas (DSL, Cabo, Fibra) que usam interfaces e protocolos diferentes (Ethernet, USB, protocolos web/SNMP para gerenciamento).
*   **Variações:** Embora houvesse um núcleo comum, existiam variações e extensões proprietárias entre fabricantes.
*   **Segurança:** Em modems celulares, o acesso irrestrito aos comandos AT pode ser um vetor de ataque se a interface estiver exposta.
*   **Modo Texto:** Menos eficiente que interfaces binárias ou baseadas em protocolos de rede para controle complexo.

## Seção Expandida: A Evolução e Relevância Atual

Embora os modems dial-up sejam obsoletos na maioria dos contextos, os comandos AT encontraram uma sobrevida significativa no controle de **módems celulares (GSM, GPRS, UMTS, LTE, 5G)**, especialmente em aplicações M2M (Machine-to-Machine) e IoT (Internet of Things). Microcontroladores e sistemas embarcados frequentemente usam comandos AT (geralmente via interface UART) para instruir um módulo celular a estabelecer conexões de dados, enviar/receber SMS, verificar status da rede, obter localização GPS (se disponível no módulo), etc. O padrão 3GPP define um conjunto extenso de comandos AT específicos para tecnologias celulares (começando com `AT+C...`). Assim, apesar de sua origem nos anos 80, o conceito fundamental dos comandos AT permanece relevante em nichos específicos da comunicação moderna.

## Notas Relacionadas

*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Discadas_–_LD]]
*   [[Modems_Analógicos_e_Modems_Digitais]]
*   [[Interface_de_Comunicação]]