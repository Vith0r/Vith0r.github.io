---
Tema Principal: "40-Terminais de Dados"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Redes de Computadores, História da Computação"
Tags:
  - "Terminal"
  - "Dados"
  - "Interface"
  - "DTE"
  - "Legado"
---

# 40-Terminais de Dados

## Visão Geral

Terminais de dados são dispositivos de interface utilizados por usuários para interagir com um sistema computacional, geralmente um computador central ou servidor localizado remotamente. Eles funcionam como pontos de entrada e saída de informações, permitindo que os usuários enviem comandos ou dados para o sistema e recebam os resultados processados. Historicamente, os terminais eram dispositivos de hardware dedicados com pouca ou nenhuma capacidade de processamento local (terminais "burros"), dependendo inteiramente do host para executar as tarefas. Com a evolução da tecnologia, o conceito se expandiu para incluir computadores pessoais, smartphones e outros dispositivos que, ao se conectarem a uma rede, atuam como terminais para acessar serviços remotos.

## Definição

Um terminal de dados é um equipamento eletrônico ou eletromecânico de hardware usado para inserir dados em, e exibir ou imprimir dados de, um computador ou sistema de computação. Ele serve como a interface homem-máquina (IHM) para comunicação com o sistema central. No contexto da camada física e de enlace de dados, o terminal é frequentemente classificado como Equipamento Terminal de Dados (DTE - Data Terminal Equipment), que se conecta a um Equipamento de Comunicação de Dados (DCE - Data Communications Equipment, como um modem) para acessar a rede de comunicação.

## Exemplos

1.  **Teletipos (TTYs):** Um dos primeiros tipos de terminais, eram essencialmente máquinas de escrever eletromecânicas que podiam enviar e receber caracteres via uma linha de comunicação serial.
2.  **Terminais de Vídeo "Burros" (Dumb Terminals):** Dispositivos como o DEC VT100 ou o IBM 3270 consistiam em um teclado e um monitor (CRT), capazes apenas de exibir texto e enviar caracteres digitados para o host. Toda a lógica de processamento residia no host.
3.  **Terminais Gráficos:** Evoluções que podiam exibir gráficos vetoriais ou raster, mas ainda dependiam do host para gerar as imagens.
4.  **Terminais de Ponto de Venda (POS):** Dispositivos usados em caixas de lojas para registrar vendas e processar pagamentos, conectando-se a um sistema central.
5.  **Caixas Eletrônicos (ATMs):** Terminais especializados para interação bancária.
6.  **Computadores Pessoais (em modo de emulação):** Um PC rodando um software de emulação de terminal (ex: PuTTY, Tera Term) para se conectar a um servidor via SSH ou Telnet, ou emulando um terminal 3270 para acessar um mainframe.
7.  **Thin Clients:** Dispositivos com hardware mínimo que se conectam a um servidor central (via RDP, ICA, VNC) que executa o desktop e as aplicações do usuário.
8.  **Smartphones e Tablets:** Atuam como terminais ao usar aplicativos que acessam serviços baseados em nuvem ou servidores remotos.

## Características

*   **Interface de Entrada/Saída:** Possui dispositivos de entrada (teclado, mouse, leitor de código de barras) e saída (monitor, impressora).
*   **Conectividade:** Conecta-se a um sistema computacional via rede ou linha de comunicação (diretamente ou através de um DCE).
*   **Dependência do Host (Tradicional):** Terminais clássicos tinham pouca ou nenhuma capacidade de processamento local.
*   **Foco na Interação:** Projetados primariamente para a interação do usuário com o sistema.
*   **Classificação DTE:** No modelo de interface DTE/DCE, o terminal é o DTE.

## Vantagens (de Terminais Dedicados Legados)

*   **Baixo Custo (Individual):** Terminais burros eram mais baratos que computadores completos.
*   **Simplicidade:** Fáceis de usar e manter (menos componentes para falhar).
*   **Segurança (Centralizada):** Como os dados e aplicações residiam no host, era mais fácil controlar o acesso e a segurança centralmente.
*   **Gerenciamento Centralizado:** Atualizações e manutenção eram feitas no host.

## Desvantagens (de Terminais Dedicados Legados)

*   **Falta de Processamento Local:** Incapacidade de executar aplicações localmente, dependência total do host.
*   **Dependência da Rede/Host:** Se a conexão com o host ou o próprio host falhasse, o terminal tornava-se inútil.
*   **Interface Limitada:** Geralmente interfaces baseadas em texto ou gráficos simples.
*   **Flexibilidade Reduzida:** Projetados para tarefas específicas, difíceis de adaptar para outros usos.
*   **Obsolescência:** Amplamente substituídos por PCs e outros dispositivos mais versáteis que podem atuar como terminais quando necessário.

## Notas Relacionadas

*   [[Processamento_Centralizado]]
*   [[Histórico_de_Teleprocessamento_de_Dados]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Unidade_de_Derivação_Digital_(UDD)_e_Unidade_de_Derivação_Analógica_(UDA)]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]

