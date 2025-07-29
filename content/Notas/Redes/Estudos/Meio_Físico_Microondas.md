---
Tema Principal: 97-Meio Físico Microondas
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações, Física
tags:
  - Meio
  - Físico
  - Meio
  - Não
  - Guiado
  - Wireless
  - Microondas
  - Rádio
  - Frequência
  - Link
---

# 97-Meio Físico Microondas

## Visão Geral

As micro-ondas são uma forma de radiação eletromagnética que ocupa uma porção do espectro de radiofrequência ([[Meio_Físico_Rádio]]), geralmente definida como frequências entre 300 MHz (0.3 GHz) e 300 GHz. Como um meio físico não guiado ([[Meio_Físico_Não_Guiado]]), as micro-ondas são amplamente utilizadas para comunicações sem fio ([[Meio_Físico_Wireless]]), especialmente para links ponto a ponto de longa distância e comunicações por satélite. Devido às suas altas frequências, as micro-ondas podem transportar grandes quantidades de informação (alta largura de banda - [[Largura_de_Banda]]) e são altamente direcionais, permitindo que antenas foquem a energia em feixes estreitos. No entanto, elas requerem linha de visada (line-of-sight, LoS) entre as antenas transmissora e receptora e são mais suscetíveis a atenuação por chuva e obstáculos do que as ondas de rádio de frequência mais baixa.

## Definição

O meio físico micro-ondas refere-se à utilização de ondas eletromagnéticas na faixa de micro-ondas (tipicamente 0.3 GHz a 300 GHz) para transmitir sinais de comunicação através do espaço livre. É caracterizado pela necessidade de linha de visada e pela capacidade de suportar altas taxas de dados.

## Exemplos

*   **Links Terrestres Ponto a Ponto:** Usados por operadoras de telecomunicações para conectar torres de celular, backbones de rede ou interligar prédios corporativos onde passar fibra óptica é inviável. Utilizam antenas parabólicas altamente direcionais montadas em torres.
*   **Comunicações por Satélite:** Satélites em órbita geoestacionária (GEO), órbita terrestre média (MEO) ou órbita terrestre baixa (LEO) usam micro-ondas (em bandas como C, Ku, Ka) para retransmitir sinais de TV, telefone e dados sobre vastas áreas geográficas.
*   **Radar:** Sistemas de radar usam micro-ondas para detectar objetos.
*   **Redes Wi-Fi (5 GHz / 6 GHz):** As faixas superiores do Wi-Fi (802.11a/n/ac/ax) operam em frequências de micro-ondas (SHF - [[Meio_Físico_Rádio]]).
*   **Redes Celulares (5G):** Algumas implementações de 5G utilizam faixas de frequência de micro-ondas e ondas milimétricas para altíssima capacidade em curtas distâncias.
*   **Fornos de Micro-ondas:** Usam micro-ondas (tipicamente 2.45 GHz) para aquecer alimentos (e podem causar interferência em dispositivos Wi-Fi/Bluetooth na mesma faixa).

## Características

*   **Altas Frequências:** 0.3 GHz a 300 GHz.
*   **Alta Largura de Banda:** Capaz de suportar taxas de dados muito altas.
*   **Direcionalidade:** Sinais podem ser focados em feixes estreitos usando antenas direcionais (parabólicas, de corneta).
*   **Linha de Visada (LoS) Requerida:** Transmissor e receptor precisam ter um caminho visual desobstruído entre eles (a curvatura da Terra limita o alcance terrestre).
*   **Atenuação por Chuva (Rain Fade):** Sinais de micro-ondas, especialmente em frequências mais altas (> 10 GHz), são significativamente atenuados pela chuva, neblina e neve.
*   **Bloqueio por Obstáculos:** Facilmente bloqueadas por edifícios, árvores e outros obstáculos sólidos.
*   **Propagação:** Viajam em linha reta.

## Vantagens

*   **Alta Largura de Banda:** Permite transmitir grandes volumes de dados rapidamente.
*   **Menor Custo que Cabos (em alguns cenários):** Pode ser mais barato instalar um link de micro-ondas ponto a ponto do que passar cabos (especialmente fibra) em terrenos difíceis ou entre prédios.
*   **Implantação Rápida:** Links terrestres podem ser estabelecidos relativamente rápido.
*   **Cobertura Global (Satélite):** Satélites permitem comunicação em áreas remotas ou sobre oceanos.
*   **Direcionalidade:** Antenas direcionais reduzem a interferência e aumentam a segurança (mais difícil interceptar um feixe estreito).

## Desvantagens

*   **Requisito de Linha de Visada:** Limita as aplicações terrestres pela distância (curvatura da Terra, obstáculos) e requer alinhamento cuidadoso das antenas.
*   **Sensibilidade a Condições Atmosféricas:** Chuva, neve e neblina podem degradar ou interromper o sinal (rain fade).
*   **Custo de Infraestrutura:** Torres, antenas direcionais e equipamentos de satélite podem ser caros.
*   **Atraso de Propagação (Satélite):** Satélites GEO introduzem um atraso significativo (latência) devido à grande distância que o sinal precisa percorrer.
*   **Interferência:** Embora direcionais, ainda podem sofrer interferência de outras fontes na mesma frequência.
*   **Segurança:** Embora mais seguro que rádio omnidirecional, o sinal ainda pode ser interceptado no ar.

## Seção Expandida: Micro-ondas Terrestres vs. Satélite

*   **Micro-ondas Terrestres:**
    *   **Prós:** Menor latência, maior largura de banda potencial (dependendo da frequência e distância), controle direto sobre a infraestrutura.
    *   **Contras:** Alcance limitado pela linha de visada e curvatura da Terra (tipicamente 30-50 km entre torres), requer múltiplas estações repetidoras para longas distâncias.
*   **Micro-ondas via Satélite:**
    *   **Prós:** Cobertura muito ampla (regional/global), útil para áreas remotas e comunicação broadcast.
    *   **Contras:** Alta latência (especialmente GEO - ~250ms de ida, ~500ms ida e volta), largura de banda compartilhada e geralmente menor que terrestre, custo de lançamento e operação do satélite, dependência do operador do satélite.

## Notas Relacionadas

*   [[Atenuação]]
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Não_Guiado]]
*   [[Meio_Físico_Wireless]]
*   [[Meio_Físico_Rádio]]
*   [[Largura_de_Banda]]
