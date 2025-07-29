---
Tema Principal: 96-Meio Físico Rádio
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações, Física
tags:
  - Meio
  - Físico
  - Meio
  - Não
  - Guiado
  - Wireless
  - Ondas
  - Rádio
  - Rádio
  - Frequência
---

# 96-Meio Físico Rádio

## Visão Geral

As ondas de rádio são uma forma de radiação eletromagnética dentro de uma faixa específica do espectro eletromagnético, tipicamente com frequências que variam de alguns quilohertz (kHz) a centenas de gigahertz (GHz). Elas são um tipo fundamental de meio físico não guiado ([[Meio_Físico_Não_Guiado]]) amplamente utilizado para transmitir informações sem fio ([[Meio_Físico_Wireless]]) através do ar ou do espaço. As ondas de rádio são geradas por transmissores e detectadas por receptores usando antenas. Suas propriedades de propagação (como alcance, capacidade de penetrar obstáculos e largura de banda suportada) variam significativamente dependendo da frequência. Elas são a base para inúmeras tecnologias de comunicação, incluindo radiodifusão (AM/FM), televisão, redes locais sem fio (Wi-Fi), redes pessoais (Bluetooth), redes celulares (2G a 5G) e comunicações de longa distância.

## Definição

O meio físico rádio refere-se à utilização de ondas eletromagnéticas na faixa de radiofrequência (RF) para transportar sinais de comunicação através do espaço livre. A informação é codificada no sinal de rádio através de técnicas de modulação ([[Modulação_de_Sinais_Elétricos]], [[Modulação_por_Amplitude_e_Frequência_AM_e_FM]], etc.) antes da transmissão.

## Exemplos (Faixas de Frequência e Aplicações)

*   **LF (Low Frequency) / MF (Medium Frequency):** Rádio AM, navegação marítima.
*   **HF (High Frequency - Ondas Curtas):** Comunicações de rádio de longa distância (amador, aviação, militar), radiodifusão internacional.
*   **VHF (Very High Frequency):** Rádio FM, televisão analógica (canais baixos), comunicações de aviação e marítimas, rádio amador.
*   **UHF (Ultra High Frequency):** Televisão digital terrestre (TDT), redes celulares (frequências mais baixas de 4G/5G), Wi-Fi (2.4 GHz), Bluetooth, Zigbee, telefones sem fio, GPS.
*   **SHF (Super High Frequency):** Wi-Fi (5 GHz, 6 GHz), redes celulares (frequências mais altas de 4G/5G), links de micro-ondas ponto a ponto ([[Meio_Físico_Microondas]]), comunicações por satélite (bandas C, Ku, Ka).
*   **EHF (Extremely High Frequency - Ondas Milimétricas):** Algumas aplicações de 5G, Wi-Fi (802.11ad/ay - 60 GHz), radares de alta resolução, links de comunicação de altíssima capacidade e curto alcance.

## Características

*   **Propagação Omnidirecional (Geralmente):** Ondas de rádio tendem a se espalhar em todas as direções a partir da antena transmissora (embora antenas direcionais possam focar o sinal).
*   **Penetração de Obstáculos:** Ondas de rádio de frequência mais baixa (VHF, UHF) penetram melhor em edifícios e obstáculos do que frequências mais altas (SHF, EHF).
*   **Alcance:** Varia muito com a frequência, potência de transmissão, sensibilidade do receptor e condições ambientais. Frequências mais baixas geralmente têm maior alcance.
*   **Largura de Banda:** Frequências mais altas geralmente suportam larguras de banda maiores ([[Largura_de_Banda]]).
*   **Interferência:** Suscetível a interferências de outras fontes de RF na mesma faixa de frequência ou em faixas adjacentes, bem como ruído elétrico ([[Ruído_Impulsivo]], [[Ruído_Branco]]).
*   **Regulamentação do Espectro:** O uso das faixas de radiofrequência é regulamentado para evitar interferências.

## Vantagens

*   **Mobilidade:** Permite comunicação sem fio para dispositivos móveis.
*   **Facilidade de Implantação:** Não requer instalação de cabos.
*   **Cobertura Ampla:** Pode cobrir grandes áreas geográficas (dependendo da frequência e infraestrutura).
*   **Comunicação Broadcast:** Ideal para transmitir informações para múltiplos receptores simultaneamente (rádio, TV).
*   **Penetração:** Frequências mais baixas podem atravessar paredes e obstáculos.

## Desvantagens

*   **Espectro Limitado e Regulamentado:** A quantidade de espectro disponível é finita e seu uso é controlado.
*   **Interferência:** Vulnerável a interferências de múltiplas fontes.
*   **Segurança:** Sinais podem ser interceptados, exigindo criptografia.
*   **Largura de Banda Limitada (vs. Fibra):** Embora as frequências mais altas ofereçam mais banda, ainda é geralmente menor do que a fibra óptica.
*   **Efeitos de Propagação:** Sinal pode ser afetado por reflexões (multipath), sombreamento por obstáculos e condições atmosféricas.
*   **Requisitos de Potência:** Transmitir em longas distâncias ou altas frequências pode exigir mais energia.

## Seção Expandida: Modulação em Rádio

Para transmitir informação usando ondas de rádio, um sinal de informação (ex: voz, dados digitais) precisa ser sobreposto a uma onda portadora de rádio frequência. Isso é feito através da modulação, que altera alguma característica da onda portadora (amplitude, frequência ou fase) de acordo com o sinal de informação.
*   **AM (Amplitude Modulation):** A amplitude da portadora varia com o sinal de informação. Simples, mas suscetível a ruído ([[Modulação_por_Amplitude_e_Frequência_AM_e_FM]]).
*   **FM (Frequency Modulation):** A frequência da portadora varia com o sinal de informação. Mais resistente a ruído que AM ([[Modulação_por_Amplitude_e_Frequência_AM_e_FM]]).
*   **PSK (Phase Shift Keying):** A fase da portadora é alterada para representar dados digitais ([[Modulação_por_Desvio_de_Fase_–_PSK]], [[Modulação_por_Desvio_de_Fase_Diferencial_–_DPSK]]).
*   **FSK (Frequency Shift Keying):** A frequência da portadora é alterada entre valores discretos para representar dados digitais ([[Modulação_por_Desvio_de_Frequência_–_FSK]]).
*   **QAM (Quadrature Amplitude Modulation):** Combina modulação de amplitude e fase para transmitir mais bits por símbolo ([[Modulação_por_Amplitude_em_Quadratura_(QAM)]]).
*   **OFDM (Orthogonal Frequency-Division Multiplexing):** Técnica complexa usada em Wi-Fi moderno, 4G/5G e TDT, que divide o sinal em muitas subportadoras ortogonais, tornando-o robusto contra multipath.

## Notas Relacionadas

*   [[Modulação_de_Sinais_Elétricos]]
*   [[Modulação_por_Amplitude_e_Frequência_AM_e_FM]]
*   [[Modulação_por_Desvio_de_Fase_–_PSK]]
*   [[Modulação_por_Desvio_de_Frequência_–_FSK]]
*   [[Modulação_por_Desvio_de_Fase_Diferencial_–_DPSK]]
*   [[Modulação_por_Amplitude_em_Quadratura_(QAM)]]
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Não_Guiado]]
*   [[Meio_Físico_Wireless]]
*   [[Meio_Físico_Microondas]] (Faixa específica de rádio)
*   [[Largura_de_Banda]]

