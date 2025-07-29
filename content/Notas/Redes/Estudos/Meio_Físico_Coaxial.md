---
Tema Principal: 94-Meio Físico Coaxial
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Camada Física, Cabeamento
tags:
  - Físico
  - Meio
  - Guiado
  - Cabo
  - Coaxial
  - Coaxial
  - Ethernet
---

# 94-Meio Físico Coaxial

## Visão Geral

O cabo coaxial é um tipo de meio físico guiado ([[Meio_Físico_Guiado]]) usado para transmitir sinais de radiofrequência (RF) e dados. Sua estrutura consiste em um condutor central (geralmente um fio de cobre sólido ou trançado), cercado por uma camada isolante dielétrica, que por sua vez é coberta por uma malha metálica condutora (blindagem) e, finalmente, uma capa externa protetora de plástico. Essa construção "coaxial" (com eixos concêntricos) permite que o campo eletromagnético que transporta o sinal exista apenas no espaço entre o condutor interno e a blindagem externa, o que confere ao cabo uma boa proteção contra interferências eletromagnéticas (EMI) externas e também evita que o sinal irradie para fora do cabo. O cabo coaxial foi amplamente utilizado nas primeiras redes Ethernet (10BASE5 "Thicknet" e 10BASE2 "Thinnet" - [[Rede_Barra]]) e ainda é muito comum em sistemas de distribuição de TV a cabo (CATV) e para conexões de Internet via cabo (DOCSIS).

## Definição

Um cabo coaxial é um cabo de transmissão de dados ou RF que possui um condutor interno envolto por uma camada isolante tubular, rodeada por uma blindagem condutora tubular. A estrutura é projetada para manter os condutores em uma geometria fixa e coaxial, minimizando a perda de sinal e a interferência.

## Exemplos

*   **RG-6:** Tipo comum usado hoje para TV a cabo e Internet via cabo (DOCSIS).
*   **RG-58:** Usado em redes Thinnet (10BASE2) Ethernet legadas (impedância de 50 ohms).
*   **RG-8 ou RG-11:** Usado em redes Thicknet (10BASE5) Ethernet legadas (impedância de 50 ohms).
*   **RG-59:** Usado antigamente para TV a cabo e ainda encontrado em algumas instalações de vídeo analógico (CFTV).
*   **Conectores Comuns:** Conector BNC (usado em Thinnet), Conector N (usado em Thicknet), Conector F (usado em TV a cabo/RG-6).

## Características

*   **Estrutura Coaxial:** Condutor central, dielétrico, blindagem, capa externa.
*   **Boa Blindagem:** A malha externa protege contra EMI e contém o sinal interno.
*   **Largura de Banda:** Suporta larguras de banda mais altas e frequências maiores do que o par trançado não blindado (UTP) em distâncias equivalentes.
*   **Impedância Característica:** Possui uma impedância específica (ex: 50 ohms para redes de dados legadas, 75 ohms para vídeo/CATV) que deve ser mantida para evitar reflexões de sinal.
*   **Atenuação:** O sinal enfraquece com a distância e com o aumento da frequência ([[Atenuação]]).
*   **Custo:** Geralmente mais caro que UTP, mas mais barato que fibra óptica.
*   **Flexibilidade:** Menos flexível que par trançado, especialmente os tipos mais grossos (Thicknet).

## Vantagens

*   **Boa Largura de Banda:** Suporta taxas de dados mais altas do que o par trançado em distâncias maiores (comparado a categorias mais antigas de UTP).
*   **Boa Imunidade a Ruído:** A blindagem oferece boa proteção contra interferência eletromagnética.
*   **Durabilidade:** Geralmente mais robusto que o par trançado.
*   **Tecnologia Madura:** Bem estabelecido para aplicações como CATV.

## Desvantagens

*   **Custo:** Mais caro e mais difícil de instalar do que o par trançado UTP.
*   **Flexibilidade Limitada:** Mais rígido e volumoso, dificultando a passagem por conduítes apertados.
*   **Topologia de Barramento (Legado):** Em redes Ethernet legadas (10BASE2/5), usava uma topologia de barramento ([[Rede_Barra]]) que era inerentemente menos confiável e mais difícil de solucionar problemas do que a topologia em estrela ([[Rede_Estrela]]) usada com par trançado.
*   **Conectores:** Conectores (especialmente BNC em 10BASE2) podiam ser pontos de falha.
*   **Obsolescência (em LANs):** Praticamente substituído pelo par trançado (UTP/STP - [[Meio_Físico_Par_Trançado]]) e pela fibra óptica ([[Meio_Físico_Fibra_Óptica]]) em redes locais Ethernet modernas devido ao custo, facilidade de instalação e desempenho superior dessas alternativas com topologias em estrela.

## Seção Expandida: Thicknet (10BASE5) vs. Thinnet (10BASE2)

As duas primeiras implementações populares de Ethernet usavam cabo coaxial:
*   **10BASE5 (Thick Ethernet ou Thicknet):**
    *   Usava um cabo coaxial grosso e rígido (RG-8/RG-11) como backbone.
    *   Segmentos de até 500 metros.
    *   Dispositivos conectavam-se usando um transceptor externo (MAU) preso ao cabo (vampire tap) e um cabo AUI (Attachment Unit Interface) até a placa de rede.
    *   Caro e difícil de instalar.
*   **10BASE2 (Thin Ethernet, Thinnet ou Cheapernet):**
    *   Usava um cabo coaxial mais fino e flexível (RG-58).
    *   Segmentos de até 185 metros.
    *   Dispositivos conectavam-se diretamente ao cabo usando conectores BNC em formato de "T".
    *   Mais barato e fácil de instalar que Thicknet, mas mais propenso a falhas (um conector solto derrubava o segmento).

Ambos operavam a 10 Mbps em um barramento compartilhado com CSMA/CD.

## Notas Relacionadas

*   [[Atenuação]]
*   [[Rede_Barra]]
*   [[Rede_Estrela]] (Contraste de topologia)
*   [[Modelo_de_Referência_OSI]] (Camada 1)
*   [[Modelo_TCP_IP]] (Camada Física/Interface de Rede)
*   [[Meio_Físico]]
*   [[Meio_Físico_Guiado]]
*   [[Meio_Físico_Par_Trançado]] (Alternativa principal em LANs)
*   [[Meio_Físico_Fibra_Óptica]] (Alternativa de maior performance)
*   [[Largura_de_Banda]]

