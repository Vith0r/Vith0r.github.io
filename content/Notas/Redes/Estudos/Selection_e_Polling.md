---
Tema Principal: 31-Selection e Polling
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Protocolos de Comunicação
tags:
  - Polling
  - Multiponto
  - Acesso
  - Meio
  - Protocolo
---

# 31-Selection e Polling

## Visão Geral

Selection e Polling são dois mecanismos fundamentais de controle de acesso ao meio utilizados em ligações multiponto, onde um dispositivo primário (host) gerencia a comunicação com múltiplos dispositivos secundários (terminais) que compartilham o mesmo canal. Em vez de permitir que os terminais transmitam livremente (contenção), o que poderia levar a colisões, o primário controla ativamente quem pode transmitir e quando. O Polling é usado pelo primário para convidar os secundários a enviar dados, enquanto o Selection é usado pelo primário para escolher um secundário específico para receber dados. Essas técnicas garantem uma comunicação ordenada e sem colisões no meio compartilhado, sendo cruciais em protocolos clássicos como BSC e SDLC/HDLC em configurações multiponto.

## Definição

*   **Polling (Sondagem):** É o processo pelo qual o dispositivo primário pergunta sequencialmente a cada dispositivo secundário se ele tem dados para transmitir. O primário envia uma mensagem de "poll" (sondagem) endereçada a um secundário específico. Se o secundário sondado tiver dados, ele os transmite de volta ao primário. Se não tiver, ele envia uma resposta negativa, e o primário passa a sondar o próximo secundário na lista. Apenas o secundário que foi sondado tem permissão para transmitir.
*   **Selection (Seleção):** É o processo pelo qual o dispositivo primário informa a um dispositivo secundário específico que ele (o primário) tem dados para enviar a ele. O primário envia uma mensagem de "select" endereçada ao secundário desejado, perguntando se ele está pronto para receber. Se o secundário estiver pronto, ele envia uma confirmação positiva (ACK), e o primário então transmite os dados. Se não estiver pronto, envia uma confirmação negativa (NAK), e o primário pode tentar novamente mais tarde.

## Exemplos

1.  **Protocolo BSC (Binary Synchronous Communications) da IBM:** Utilizava extensivamente polling e selection para gerenciar terminais em linhas multiponto.
2.  **Protocolos SDLC/HDLC (Synchronous Data Link Control / High-Level Data Link Control):** Em sua configuração de resposta normal (NRM - Normal Response Mode), o secundário só pode transmitir após receber um comando de poll do primário.
3.  **Sistemas SCADA:** A estação mestre frequentemente usa polling para coletar dados das RTUs remotas em intervalos regulares.
4.  **Ambientes de Terminais 3270:** O controlador de cluster (ex: IBM 3174) usava polling para verificar se os terminais conectados tinham dados para enviar ao mainframe.

## Características

*   **Controle Centralizado:** O dispositivo primário controla todo o acesso ao meio.
*   **Comunicação Ordenada:** Evita colisões, pois apenas um dispositivo (o primário ou o secundário sondado/selecionado) transmite por vez.
*   **Polling:** Primário pergunta aos secundários se têm dados para enviar (Secundário -> Primário).
*   **Selection:** Primário pergunta a um secundário se está pronto para receber dados (Primário -> Secundário).
*   **Endereçamento:** Mensagens de poll e select devem conter o endereço do secundário alvo.
*   **Overhead de Protocolo:** As mensagens de poll, select, ACK e NAK representam overhead.

## Vantagens

*   **Sem Colisões:** Elimina completamente a possibilidade de colisões no meio compartilhado.
*   **Determinismo (Relativo):** O acesso ao meio é controlado e mais previsível do que em sistemas baseados em contenção, embora possa haver atraso de polling.
*   **Gerenciamento Centralizado:** Facilita o monitoramento e controle da comunicação pelo dispositivo primário.
*   **Priorização Possível:** O primário pode implementar esquemas de polling que priorizem certos terminais ou tipos de tráfego.

## Desvantagens

*   **Overhead de Polling/Selection:** As mensagens de controle consomem largura de banda e tempo, especialmente se muitos terminais não tiverem dados para enviar quando sondados.
*   **Atraso de Polling:** Um terminal com dados prontos pode ter que esperar um tempo considerável até ser sondado pelo primário, introduzindo latência.
*   **Dependência do Primário:** Todo o sistema depende do funcionamento correto do dispositivo primário. Se ele falhar, a comunicação cessa.
*   **Ineficiência em Baixa Carga:** Se apenas um terminal tem dados para enviar frequentemente, o polling de todos os outros terminais é um desperdício de recursos.
*   **Escalabilidade Limitada:** O tempo total do ciclo de polling aumenta com o número de terminais, limitando o número de dispositivos que podem ser eficientemente gerenciados em uma única linha.

## Notas Relacionadas

*   [[Transmissão_Half_Duplex]]
*   [[Contention]]
*   [[Ligação_Multiponto]]
*   [[Host]]
*   [[Unidade_Controladora_de_Terminais]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]

