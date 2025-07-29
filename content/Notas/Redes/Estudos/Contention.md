---
Tema Principal: 29-Contention
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Sistemas Operacionais
tags:
  - Contention
  - Redes
  - Acesso
  - Meio
  - Polling
---

# 29-Contention

## Visão Geral

Contention (contenção ou disputa) é uma situação que surge em sistemas de comunicação ou computacionais quando múltiplos dispositivos ou processos tentam acessar um recurso compartilhado (como um meio de transmissão, um barramento ou um arquivo) ao mesmo tempo. Como o recurso só pode ser utilizado por um de cada vez (ou tem capacidade limitada), a contenção leva a conflitos, colisões ou atrasos, exigindo mecanismos para arbitrar o acesso, resolver os conflitos e garantir que o recurso seja utilizado de forma ordenada e eficiente. Gerenciar a contenção é um desafio fundamental no projeto de redes de acesso múltiplo e sistemas concorrentes.

## Definição

Contention refere-se à condição em que dois ou more dispositivos ou processos tentam usar um recurso compartilhado simultaneamente, resultando em um conflito. Em redes, isso ocorre tipicamente quando múltiplos nós tentam transmitir dados no mesmo meio físico compartilhado (como em redes Ethernet antigas com cabo coaxial ou redes Wi-Fi) ao mesmo tempo, levando a uma colisão de sinais. Em sistemas operacionais, pode ocorrer quando múltiplos threads tentam acessar a mesma variável ou estrutura de dados sem sincronização adequada.

## Exemplos

1.  **Redes Ethernet com Meio Compartilhado (CSMA/CD):** Em redes 10BASE2 ou 10BASE5, ou mesmo em hubs Ethernet (não switches), todos os dispositivos compartilham o mesmo meio físico. Se dois dispositivos tentam transmitir ao mesmo tempo, ocorre uma colisão. O protocolo CSMA/CD (Carrier Sense Multiple Access with Collision Detection) é um método baseado em contenção: os dispositivos ouvem o meio (Carrier Sense), transmitem se estiver livre, mas continuam ouvindo para detectar colisões (Collision Detection). Se uma colisão é detectada, eles param, esperam um tempo aleatório (backoff) e tentam novamente.
2.  **Redes Wi-Fi (CSMA/CA):** Redes sem fio também usam um meio compartilhado (o espectro de rádio). O protocolo CSMA/CA (Collision Avoidance) tenta evitar colisões usando mecanismos como ouvir o meio e, opcionalmente, trocar sinais RTS/CTS (Request to Send/Clear to Send) antes de transmitir dados, especialmente para transmissões mais longas.
3.  **Ligação Multiponto (Polling vs. Contention):** Em algumas topologias multiponto, onde vários terminais compartilham uma linha para se comunicar com um host central, pode-se usar contenção (onde terminais tentam transmitir quando precisam, arriscando colisões) ou polling (onde o host controla explicitamente qual terminal pode transmitir).
4.  **Acesso a Barramentos em Computadores:** Múltiplos dispositivos (CPU, DMA, periféricos) podem tentar acessar o barramento do sistema simultaneamente, exigindo um árbitro de barramento para gerenciar a contenção.
5.  **Acesso Concorrente a Dados:** Em bancos de dados ou sistemas de arquivos, múltiplos usuários ou processos podem tentar ler ou escrever no mesmo registro ou arquivo, exigindo mecanismos de bloqueio (locking) para evitar inconsistências.

## Características

*   **Recurso Compartilhado:** Ocorre quando um recurso limitado é acessado por múltiplos requisitantes.
*   **Acesso Simultâneo (Tentativa):** Múltiplos requisitantes tentam acessar o recurso ao mesmo tempo.
*   **Conflito/Colisão:** A tentativa de acesso simultâneo resulta em um estado indesejado (dados corrompidos, deadlock).
*   **Necessidade de Arbitragem/Resolução:** Requer um mecanismo ou protocolo para decidir quem ganha acesso ou para recuperar do conflito.
*   **Impacto no Desempenho:** A contenção e os mecanismos para gerenciá-la geralmente introduzem atrasos e reduzem a taxa de transferência efetiva.

## Vantagens (de Métodos Baseados em Contenção)

*   **Simplicidade (em baixa carga):** Protocolos como CSMA/CD podem ser relativamente simples e eficientes quando a rede está pouco carregada, pois os dispositivos podem transmitir imediatamente se o meio estiver livre.
*   **Descentralização (em alguns casos):** Métodos como CSMA/CD não requerem um controlador central para alocar o acesso (ao contrário do polling).
*   **Justiça (potencial):** Com mecanismos de backoff aleatório, todos os dispositivos têm uma chance estatisticamente justa de acessar o meio.

## Desvantagens (da Contenção e seus Métodos)

*   **Colisões:** Inerentemente leva a colisões, que desperdiçam largura de banda e tempo.
*   **Degradação do Desempenho sob Alta Carga:** À medida que mais dispositivos tentam transmitir, a probabilidade de colisão aumenta drasticamente, e a taxa de transferência útil da rede pode cair significativamente.
*   **Imprevisibilidade:** O tempo de acesso ao meio não é determinístico, tornando métodos baseados em contenção inadequados para aplicações de tempo real estrito.
*   **Overhead de Recuperação:** O processo de detecção de colisão e backoff introduz atrasos.
*   **Problema do Terminal Oculto/Exposto (em Wi-Fi):** Complexidades adicionais surgem em redes sem fio devido à natureza da propagação de rádio.

## Notas Relacionadas

*   [[Transmissão_Half_Duplex]]
*   [[Ligação_Multiponto]]
*   [[Selection_e_Polling]]

