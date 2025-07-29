---
Tema Principal: 89-Modelo de Referência OSI
Nível de Dificuldade: Fundamental
Fonte/Referência: Redes de Computadores, Padrões ISO, Conceitos Fundamentais
tags:
  - OSI
  - Modelo
  - OSI
  - Modelo
  - Referência
  - Camadas
  - Redes
  - ISO
---

# 89-Modelo de Referência OSI

## Visão Geral

O Modelo de Referência OSI (Open Systems Interconnection), desenvolvido pela ISO (International Organization for Standardization) a partir do final dos anos 70, é um modelo conceitual que padroniza as funções de um sistema de telecomunicação ou computação em termos de abstração de camadas. Seu objetivo era fornecer um framework padrão para que diferentes sistemas de computador pudessem se comunicar através de redes, independentemente da arquitetura de hardware ou software subjacente. O modelo divide o processo de comunicação em sete camadas abstratas, cada uma com funções específicas e bem definidas, interagindo apenas com as camadas imediatamente adjacentes. Embora a suíte de protocolos TCP/IP ([[Protocolo_TCP-IP]]) tenha se tornado o padrão prático da Internet, o Modelo OSI continua sendo uma ferramenta pedagógica fundamental para ensinar e entender arquiteturas de rede e protocolos de comunicação.

## Definição

O Modelo OSI é um modelo de referência de 7 camadas que descreve como as informações de uma aplicação de software em um computador se movem através de um meio de rede para uma aplicação de software em outro computador. As 7 camadas são (de cima para baixo):

7.  **Camada de Aplicação:** Fornece a interface para os usuários e processos de aplicação acessarem os serviços de rede. Contém protocolos que interagem diretamente com o software do usuário (ex: HTTP, FTP, SMTP, DNS). Não é a aplicação em si, mas os serviços que ela usa.
6.  **Camada de Apresentação:** Responsável pela tradução, compressão e criptografia/descriptografia dos dados, garantindo que a informação enviada pela camada de aplicação de um sistema seja legível pela camada de aplicação de outro sistema. Formata os dados em um formato comum.
5.  **Camada de Sessão:** Estabelece, gerencia e encerra conexões (sessões) entre aplicações. Lida com o controle de diálogo (quem transmite quando), sincronização (adicionando pontos de verificação em fluxos de dados longos) e gerenciamento da sessão.
4.  **Camada de Transporte:** Fornece transferência de dados ponta a ponta (host-a-host) confiável ou não confiável entre processos de aplicação. Responsável pela segmentação dos dados da camada superior, controle de fluxo, controle de erro ponta a ponta e multiplexação/demultiplexação de diferentes fluxos de dados usando números de porta (ex: TCP, UDP).
3.  **Camada de Rede:** Responsável pelo endereçamento lógico (ex: endereços IP), determinação de rota (roteamento) e encaminhamento de pacotes através de múltiplas redes interconectadas (internetworking). Decide o caminho que os dados devem seguir da origem ao destino.
2.  **Camada de Enlace de Dados:** Fornece transferência de dados confiável (ou não) através de um link físico direto entre dois nós adjacentes. Responsável pelo endereçamento físico (ex: endereços MAC), enquadramento (framing) dos dados em quadros, detecção de erros no link físico e controle de acesso ao meio (MAC) em meios compartilhados (ex: Ethernet, Wi-Fi, PPP).
1.  **Camada Física:** Define as especificações elétricas, mecânicas, procedurais e funcionais para ativar, manter e desativar o link físico entre sistemas finais. Lida com a transmissão bruta de bits sobre o meio físico (cabo de cobre, fibra óptica, ondas de rádio), definindo níveis de tensão, taxas de bits, conectores, pinagens, etc.

## Exemplos (Funções por Camada)

*   **Camada 7 (Aplicação):** Navegador web usando HTTP, cliente de e-mail usando SMTP/POP3.
*   **Camada 6 (Apresentação):** Criptografia TLS/SSL, codificação de caracteres (ASCII, Unicode), compressão de dados (JPEG, MPEG).
*   **Camada 5 (Sessão):** Estabelecimento de chamada RPC (Remote Procedure Call), sincronização em transferências de arquivos grandes.
*   **Camada 4 (Transporte):** TCP garantindo entrega ordenada de segmentos web, UDP enviando datagramas de streaming de vídeo.
*   **Camada 3 (Rede):** Roteador ([[Roteador]]) encaminhando um pacote IP com base no endereço IP de destino.
*   **Camada 2 (Enlace):** Switch ([[Switch]]) encaminhando um quadro Ethernet com base no endereço MAC, placa de rede Wi-Fi esperando o meio ficar livre para transmitir.
*   **Camada 1 (Física):** Transmissão de sinais elétricos por um cabo Ethernet ([[Meio_Físico_Par_Trançado]]), sinais ópticos por fibra ([[Meio_Físico_Fibra_Óptica]]), sinais de rádio por Wi-Fi ([[Meio_Físico_Wireless]]).

## Características

*   **Modelo Conceitual/Referência:** Não é uma implementação ou protocolo específico.
*   **Sete Camadas:** Divisão funcional hierárquica.
*   **Abstração:** Cada camada esconde os detalhes das camadas inferiores.
*   **Interação Adjacente:** Cada camada interage apenas com as camadas imediatamente acima e abaixo dela.
*   **Comunicação Par-a-Par:** Logicamente, cada camada se comunica com a camada correspondente no outro sistema usando um protocolo específico daquela camada.
*   **Encapsulamento/Desencapsulamento:** Dados descem as camadas no transmissor (adicionando cabeçalhos - encapsulamento) e sobem no receptor (removendo cabeçalhos - desencapsulamento).

## Vantagens (Como Modelo)

*   **Padronização:** Fornece uma linguagem e um framework comuns para descrever arquiteturas de rede.
*   **Modularidade:** Facilita o entendimento e o desenvolvimento de protocolos, permitindo que especialistas se concentrem em uma camada por vez.
*   **Ensino e Aprendizagem:** Excelente ferramenta pedagógica para explicar o complexo processo de comunicação em rede.
*   **Solução de Problemas:** Ajuda a diagnosticar problemas de rede, isolando a falha em uma camada específica.
*   **Interoperabilidade (Teórica):** Promove a ideia de que produtos de diferentes fornecedores possam interoperar se seguirem o mesmo modelo e protocolos.

## Desvantagens (Como Modelo Prático)

*   **Complexidade:** Sete camadas podem ser consideradas excessivas por alguns; o modelo TCP/IP é mais simples.
*   **Não Mapeamento Direto:** Alguns protocolos do mundo real (especialmente da suíte TCP/IP) não se encaixam perfeitamente em uma única camada OSI.
*   **Implementação Ineficiente (Histórica):** As primeiras tentativas de implementar protocolos estritamente baseados no OSI foram muitas vezes consideradas ineficientes em comparação com o TCP/IP.
*   **Timing:** Foi padronizado depois que o TCP/IP já estava ganhando tração significativa, especialmente na comunidade de pesquisa e na Internet inicial.

## Seção Expandida: OSI vs. TCP/IP

| Característica        | Modelo OSI                                  | Modelo TCP/IP                                      |
| :-------------------- | :------------------------------------------ | :------------------------------------------------- |
| **Propósito**         | Modelo de referência prescritivo, conceitual | Modelo descritivo, baseado em protocolos práticos |
| **Número de Camadas** | 7                                           | 4 (ou 5)                                           |
| **Camadas Superiores**| Aplicação, Apresentação, Sessão             | Aplicação (combina as 3 do OSI)                    |
| **Camada Transporte** | Transporte (TCP, UDP, etc.)                 | Transporte (TCP, UDP)                              |
| **Camada Rede**       | Rede (IP, CLNS, etc.)                       | Internet (IP)                                      |
| **Camadas Inferiores**| Enlace de Dados, Física                     | Interface de Rede (ou Enlace + Física separadas)   |
| **Orientação Conexão**| Definido nas camadas de Rede e Transporte   | Definido apenas na camada de Transporte (TCP)      |
| **Adoção Prática**    | Limitada (protocolos OSI); Ampla (modelo)   | Dominante (protocolos e modelo da Internet)        |

Embora o TCP/IP seja o padrão de fato, o Modelo OSI ainda é inestimável para entender os conceitos fundamentais da comunicação em rede.

## Notas Relacionadas

*   [[Instituições_de_Padronização]] (ISO)
*   [[Protocolos_de_Comunicação]]
*   [[Protocolo_TCP-IP]] (Comparação)
*   [[Hub]] (Camada 1)
*   [[Bridge]] (Camada 2)
*   [[Roteador]] (Camada 3)
*   [[Switch]] (Camada 2)
*   [[Repetidor]] (Camada 1)
*   [[Redes_Locais_(LAN)]]
*   [[Redes_Metropolitanas_e_de_Longa_Distância_(MAN_e_WAN)]]