---
Tema Principal: 20-Over Head
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Telecomunicações
tags:
  - Transmissão
  - Protocolo
  - Redes
---

# 20-Over Head

## Visão Geral

Em redes de computadores e telecomunicações, o termo "overhead" (ou sobrecarga) refere-se a qualquer informação ou recurso adicional que é transmitido ou consumido além dos dados úteis do usuário (payload), a fim de possibilitar a própria comunicação. Isso inclui cabeçalhos de protocolo, informações de controle, bits de sincronização, dados de correção de erros e qualquer outro dado não pertencente à mensagem original do usuário, mas necessário para o transporte, endereçamento, controle de fluxo, controle de erros e gerenciamento da conexão. Compreender o overhead é crucial para avaliar a eficiência real de um sistema de comunicação, pois uma alta sobrecarga significa que uma parte significativa da capacidade do canal está sendo usada para fins de controle, e não para transmitir os dados do usuário.

## Definição

Overhead é a quantidade de dados ou recursos (como tempo ou largura de banda) que não são parte da carga útil (payload) da mensagem original, mas que são necessários para facilitar a transmissão, o roteamento, a entrega e o gerenciamento dessa mensagem através de uma rede ou sistema de comunicação. É a diferença entre a quantidade total de dados transmitidos e a quantidade de dados úteis recebidos pelo destinatário final. Geralmente é expresso como uma porcentagem da capacidade total ou como um número absoluto de bytes ou bits por pacote ou frame.

## Exemplos

1.  **Cabeçalhos de Protocolo:** Cada camada do modelo OSI ou TCP/IP adiciona seu próprio cabeçalho ao pacote de dados. Por exemplo, um pacote IP tem um cabeçalho IP (endereços de origem/destino, etc.), que encapsula um segmento TCP ou UDP, que por sua vez tem seu próprio cabeçalho (portas, números de sequência, etc.). Tudo isso é overhead em relação aos dados da aplicação.
2.  **Bits de Framing (Start/Stop):** Na transmissão assíncrona, os bits de start e stop adicionados a cada caractere são overhead.
3.  **Delimitadores de Frame (Flags):** Em protocolos síncronos como HDLC, os flags que marcam o início e o fim de um frame são overhead.
4.  **Bits de Paridade e Códigos de Correção de Erros (ECC):** Bits adicionados para detectar ou corrigir erros de transmissão (como o CRC - Cyclic Redundancy Check) são overhead.
5.  **Mensagens de Controle:** Pacotes ou mensagens trocadas exclusivamente para gerenciamento da rede ou da conexão (ex: pacotes ICMP, mensagens de roteamento, confirmações TCP - ACKs) são considerados overhead.
6.  **Preâmbulo e SFD (Start Frame Delimiter) em Ethernet:** Sequências de bits usadas no início de um frame Ethernet para sincronização do receptor.
7.  **Preenchimento (Padding):** Bytes adicionados para garantir que um pacote atinja um tamanho mínimo exigido pelo protocolo.

## Características

*   **Não-Payload:** Não faz parte dos dados originais do usuário.
*   **Necessário para a Comunicação:** Essencial para o funcionamento do protocolo ou sistema.
*   **Consome Recursos:** Utiliza largura de banda, tempo de processamento e buffers.
*   **Variável:** A quantidade de overhead pode variar dependendo do protocolo, do tamanho do payload e das opções configuradas.
*   **Impacto na Eficiência:** Quanto maior o overhead, menor a eficiência da transmissão (taxa de dados úteis / taxa de dados total).

## Vantagens (do que o Overhead Permite)

Embora o overhead em si seja uma "desvantagem" em termos de eficiência pura, ele é necessário para habilitar funcionalidades cruciais:
*   **Endereçamento e Roteamento:** Cabeçalhos contêm endereços para guiar os dados pela rede.
*   **Controle de Erros:** Permite detectar e, às vezes, corrigir erros de transmissão.
*   **Controle de Fluxo e Congestionamento:** Ajuda a evitar que transmissores rápidos sobrecarreguem receptores lentos ou a rede.
*   **Sequenciamento:** Garante que os dados cheguem na ordem correta.
*   **Sincronização:** Permite que o receptor interprete corretamente o fluxo de bits.
*   **Segurança:** Alguns cabeçalhos podem conter informações para autenticação ou criptografia.

## Desvantagens (do Overhead em si)

*   **Redução da Eficiência:** Diminui a taxa de transferência efetiva de dados úteis.
*   **Consumo de Largura de Banda:** Utiliza parte da capacidade do canal que poderia ser usada para dados do usuário.
*   **Aumento da Latência:** O processamento dos cabeçalhos e informações de controle adiciona pequenos atrasos em cada nó da rede.
*   **Maior Complexidade:** A gestão do overhead adiciona complexidade aos protocolos e implementações.
*   **Problema com Pacotes Pequenos:** O overhead fixo dos cabeçalhos torna-se proporcionalmente muito grande quando o payload é pequeno (ex: em aplicações VoIP ou jogos online), reduzindo drasticamente a eficiência.

## Notas Relacionadas

*   [[Transmissão_Assíncrona]]
*   [[Transmissão_Síncrona]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Método_Cyclic_Redundancy_Checking_(CRC)]]
