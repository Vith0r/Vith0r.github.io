---
Tema Principal: 37-Multiplexação
Nível de Dificuldade: Médio
Fonte/Referência: Telecomunicações, Redes de Computadores
tags:
  - Multiplexação
  - Telecomunicações
  - Redes
---

# 37-Multiplexação

## Visão Geral

A multiplexação é uma técnica fundamental em telecomunicações e redes de computadores que permite combinar múltiplos sinais ou fluxos de dados independentes em um único canal de comunicação compartilhado. O objetivo principal é otimizar o uso de recursos de transmissão caros ou limitados, como cabos físicos (cobre, fibra óptica) ou o espectro de radiofrequência. Ao transmitir vários sinais simultaneamente sobre o mesmo meio, a multiplexação aumenta drasticamente a capacidade e a eficiência da infraestrutura de comunicação, sendo essencial para serviços como telefonia de longa distância, transmissão de TV, redes de dados de alta velocidade e comunicações ópticas.

## Definição

Multiplexação é o processo de agregar vários canais de informação de baixa capacidade em um único canal de alta capacidade. No lado transmissor, um dispositivo chamado multiplexador (MUX) combina os sinais de entrada. No lado receptor, um demultiplexador (DEMUX) realiza o processo inverso, separando os sinais combinados de volta em seus componentes originais. Existem várias técnicas de multiplexação, que diferem na forma como o canal compartilhado é dividido entre os sinais constituintes, sendo as mais comuns a divisão por frequência (FDM), por tempo (TDM) e por comprimento de onda (WDM).

## Exemplos e Tipos Principais

1.  **Multiplexação por Divisão de Frequência (FDM - Frequency Division Multiplexing):** O espectro de frequência total do canal compartilhado é dividido em várias bandas de frequência menores e não sobrepostas. Cada sinal de entrada é modulado para ocupar uma dessas bandas exclusivas. É como sintonizar diferentes estações de rádio ou canais de TV, cada um ocupando sua própria frequência. Usado em: Rádio e TV analógica, sistemas de telefonia analógica de longa distância (sistemas de portadora), TV a cabo analógica.
2.  **Multiplexação por Divisão de Tempo (TDM - Time Division Multiplexing):** O tempo de acesso ao canal compartilhado é dividido em pequenos intervalos de tempo recorrentes (time slots). Cada sinal de entrada recebe um ou mais desses time slots para transmitir seus dados. Em **TDM Síncrono (STDM)**, cada entrada tem um slot fixo alocado em cada ciclo, mesmo que não tenha dados para enviar (ineficiente para tráfego em rajadas). Em **TDM Estatístico (StatMux ou TDM Assíncrono)**, os slots são alocados dinamicamente apenas para as entradas que têm dados, aumentando a eficiência. Usado em: Linhas telefônicas digitais (T1/E1, ISDN), redes ópticas síncronas (SONET/SDH).
3.  **Multiplexação por Divisão de Comprimento de Onda (WDM - Wavelength Division Multiplexing):** Usada exclusivamente em sistemas de fibra óptica. Múltiplos feixes de luz de diferentes comprimentos de onda (cores) são transmitidos simultaneamente pela mesma fibra. Cada comprimento de onda funciona como um canal independente. **CWDM (Coarse WDM)** usa espaçamento maior entre comprimentos de onda, permitindo menos canais mas com componentes mais baratos. **DWDM (Dense WDM)** usa espaçamento muito pequeno, permitindo um número muito maior de canais (dezenas ou centenas) na mesma fibra, sendo a base das redes ópticas de alta capacidade. Usado em: Redes metropolitanas e de longa distância (backbones de internet).
4.  **Multiplexação por Divisão de Código (CDM - Code Division Multiplexing):** Cada sinal é multiplicado por um código de espalhamento único (pseudo-aleatório). Os sinais codificados são transmitidos simultaneamente na mesma faixa de frequência. O receptor, conhecendo o código específico, pode extrair o sinal desejado dos demais. Usado principalmente em sistemas de acesso múltiplo (CDMA - Code Division Multiple Access) como em algumas gerações de telefonia celular (ex: 3G).

## Características

*   **Compartilhamento de Meio:** Permite que múltiplos usuários/sinais usem um único recurso de transmissão.
*   **MUX/DEMUX:** Requer equipamentos nas extremidades para combinar e separar os sinais.
*   **Técnicas Diversas:** Utiliza diferentes métodos (frequência, tempo, comprimento de onda, código) para separar os sinais.
*   **Aumento da Capacidade:** Multiplica a capacidade efetiva de um único link físico.
*   **Transparência (Ideal):** Idealmente, cada usuário/sinal não percebe que está compartilhando o meio.

## Vantagens

*   **Economia de Custos:** Reduz drasticamente a necessidade de instalar múltiplos cabos ou alocar mais espectro, diminuindo os custos de infraestrutura.
*   **Eficiência de Recursos:** Maximiza a utilização de links de comunicação caros ou limitados.
*   **Simplificação da Rede:** Reduz o número de conexões físicas a serem gerenciadas.
*   **Escalabilidade:** Permite adicionar mais canais a um link existente (dentro dos limites da tecnologia).

## Desvantagens

*   **Custo dos Equipamentos MUX/DEMUX:** Adiciona custo e complexidade nas extremidades do link.
*   **Ponto Único de Falha:** Uma falha no meio compartilhado ou nos equipamentos MUX/DEMUX afeta todos os canais multiplexados.
*   **Overhead e Atraso:** O processo de multiplexação/demultiplexação pode introduzir algum atraso e overhead.
*   **Potencial para Interferência/Crosstalk:** Em FDM, pode haver interferência entre canais adjacentes se os filtros não forem perfeitos. Em TDM, problemas de sincronização podem causar erros.
*   **Gerenciamento Complexo:** Gerenciar múltiplos canais lógicos sobre um único link físico pode ser complexo.

## Notas Relacionadas

*   [[Sinal_Analógico]]
*   [[Sinal_Digital]]
*   [[Concentrador_e_Conversor]]
*   [[Unidade_de_Derivação_Digital_(UDD)_e_Unidade_de_Derivação_Analógica_(UDA)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Linhas_Privativas_de_Comunicação_de_Dados_–_LPCD]]

