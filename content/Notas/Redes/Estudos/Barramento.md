---
Tema Principal: 72-Barramento
Nível de Dificuldade: Médio
Fonte/Referência: Arquitetura de Computadores, Hardware, Redes de Computadores
tags:
  - Barramento
  - Hardware
  - Comunicação
  - Arquitetura
---

# 72-Barramento

## Visão Geral

Um barramento (bus, em inglês) é um subsistema de comunicação que transfere dados entre componentes dentro de um computador ou entre computadores. Diferente de uma conexão ponto a ponto, um barramento conecta logicamente vários periféricos sobre o mesmo conjunto de fios. Cada barramento define seu conjunto de conectores para conectar fisicamente dispositivos, placas ou cabos. Em arquitetura de computadores, os barramentos são essenciais para conectar a CPU (Unidade Central de Processamento), a memória principal e os dispositivos de entrada/saída (E/S). Em redes, o conceito de barramento também aparece em topologias onde múltiplos dispositivos compartilham um meio de comunicação comum (como na topologia de barramento linear - [[Rede_Barra]]).

## Definição

Um barramento é um conjunto de condutores elétricos (fios, trilhas em uma placa de circuito impresso) que funcionam como um canal de comunicação compartilhado por múltiplos dispositivos. Ele geralmente consiste em três partes principais:
1.  **Barramento de Dados:** Transporta os dados reais entre os componentes.
2.  **Barramento de Endereços:** Especifica a origem ou o destino dos dados no barramento de dados (ex: endereço de memória, porta de E/S).
3.  **Barramento de Controle:** Transporta sinais de controle e temporização que gerenciam o fluxo de dados e o acesso ao barramento (ex: sinais de leitura/escrita, requisição/concessão de barramento, clock).

## Exemplos

*   **Barramentos Internos do Computador:**
    *   **Barramento Frontal (FSB - Front-Side Bus):** (Legado) Conectava a CPU ao Northbridge (chipset).
    *   **Barramento de Memória:** Conecta a CPU (ou controlador de memória) aos slots de RAM.
    *   **Barramento PCI (Peripheral Component Interconnect):** (Legado) Para conectar placas de expansão (vídeo, rede, som).
    *   **Barramento AGP (Accelerated Graphics Port):** (Legado) Barramento dedicado para placas de vídeo.
    *   **Barramento PCIe (PCI Express):** Padrão moderno de alta velocidade para placas de expansão, SSDs NVMe, etc. (opera mais como conexões ponto a ponto comutadas, mas conceitualmente é um barramento de E/S).
    *   **Barramento ISA (Industry Standard Architecture):** (Muito Legado) Usado nos primeiros PCs.
*   **Barramentos Externos:**
    *   **USB (Universal Serial Bus):** Embora serial, conecta múltiplos dispositivos a um host controller.
    *   **SATA (Serial ATA):** Conecta dispositivos de armazenamento (HDs, SSDs).
    *   **SCSI (Small Computer System Interface):** (Legado em PCs, ainda usado em servidores) Conecta múltiplos periféricos em cadeia.
*   **Barramento em Redes:**
    *   **Topologia de Barramento (Linear):** Como no Ethernet coaxial antigo (10BASE2, 10BASE5), onde todos os nós compartilhavam o mesmo cabo. [[Rede_Barra]]

## Características

*   **Meio Compartilhado:** Múltiplos dispositivos usam o mesmo conjunto de linhas.
*   **Conjunto de Linhas:** Dados, Endereços, Controle.
*   **Protocolo de Barramento:** Define como os dispositivos requisitam e obtêm acesso ao barramento, como os dados são transferidos, e como os sinais de controle são usados.
*   **Largura do Barramento:** Número de bits que podem ser transferidos simultaneamente pelo barramento de dados (ex: 32 bits, 64 bits).
*   **Velocidade/Clock do Barramento:** A frequência com que os dados são transferidos.
*   **Taxa de Transferência:** A quantidade total de dados transferida por unidade de tempo (geralmente produto da largura pela velocidade).

## Vantagens

*   **Economia de Conexões:** Reduz o número de fios necessários em comparação com conexões ponto a ponto dedicadas para todos os dispositivos.
*   **Modularidade/Expansibilidade:** Facilita a adição ou remoção de dispositivos que aderem ao padrão do barramento.
*   **Padronização:** Barramentos padrão (PCI, PCIe, USB) permitem interoperabilidade.

## Desvantagens

*   **Contenção/Arbitragem:** Como o meio é compartilhado, é necessário um mecanismo de arbitragem para decidir qual dispositivo pode usar o barramento em um determinado momento. Isso pode introduzir atrasos.
*   **Gargalo Potencial:** A taxa de transferência total é limitada pela capacidade do barramento e compartilhada entre todos os dispositivos conectados. Pode se tornar um gargalo se muitos dispositivos rápidos tentarem usá-lo simultaneamente.
*   **Limitações Elétricas:** O número de dispositivos que podem ser conectados e o comprimento do barramento são limitados por fatores elétricos (capacitância, reflexão de sinal).
*   **Velocidade Limitada pelo Mais Lento:** Em alguns barramentos mais antigos, a velocidade geral podia ser limitada pelo dispositivo mais lento conectado.

## Seção Expandida: Evolução para Ponto a Ponto Comutado (PCIe)

Barramentos paralelos tradicionais como PCI enfrentaram limitações de velocidade devido a problemas de sincronização (clock skew) e elétricos em altas frequências. A solução moderna, exemplificada pelo PCIe (PCI Express), foi migrar para uma arquitetura baseada em conexões seriais ponto a ponto de alta velocidade, organizadas através de switches internos. Embora ainda seja conceitualmente um "barramento" de E/S, ele não é um barramento compartilhado no sentido elétrico tradicional. Cada dispositivo PCIe tem seu próprio link dedicado (uma ou mais "lanes") para um switch raiz ou intermediário, eliminando a contenção direta e permitindo taxas de transferência muito mais altas e escaláveis.

## Notas Relacionadas

*   [[Transmissão_Serial]]
*   [[Transmissão_Paralela]]
*   [[Interface_de_Comunicação]]
*   [[Rede_Barra]]
*   [[Hub]] (Dispositivo que cria um barramento lógico compartilhado em Ethernet)

