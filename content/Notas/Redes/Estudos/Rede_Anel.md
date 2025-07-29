---
Tema Principal: 77-Rede Anel
Nível de Dificuldade: Básico
Fonte/Referência: Redes de Computadores, Topologias de Rede
tags:
  - Topologia
  - Anel
  - Rede
  - Anel
---

# 77-Rede Anel

## Visão Geral

A topologia de rede em anel (ring topology) é uma configuração de rede onde cada nó se conecta exatamente a outros dois nós, formando um único caminho contínuo para os sinais através de cada nó - um anel. Os dados trafegam de nó em nó ao redor do anel, geralmente em uma única direção. Cada dispositivo no anel atua como um repetidor, regenerando o sinal antes de passá-lo adiante. Para enviar dados, um nó geralmente precisa esperar por um "token" (um pequeno quadro especial) que circula pelo anel. Quando um nó com dados a enviar recebe o token, ele o remove do anel, anexa seus dados ao token (criando um quadro de dados) e envia o quadro para o próximo nó. O quadro circula até chegar ao destino, que copia os dados. O quadro continua circulando até retornar ao remetente original, que então o remove e libera um novo token no anel. Exemplos clássicos incluem Token Ring (IEEE 802.5) e FDDI (Fiber Distributed Data Interface).

## Definição

Uma topologia de rede em anel é uma arquitetura de rede na qual os dispositivos são conectados em uma configuração circular fechada. Cada dispositivo está conectado ao seu sucessor e predecessor no anel, e os dados fluem em uma direção específica (unidirecional) ou, em alguns casos (anéis duplos), em ambas as direções. A comunicação geralmente depende de um esquema de passagem de token para controlar o acesso ao meio.

## Exemplos

*   **Token Ring (IEEE 802.5):** Desenvolvido pela IBM, operava a 4 ou 16 Mbps. Usava um esquema de passagem de token determinístico. Fisicamente, era frequentemente cabeado em uma topologia de estrela usando um dispositivo central chamado MAU (Multistation Access Unit), mas logicamente formava um anel.
*   **FDDI (Fiber Distributed Data Interface):** Um padrão de rede de alta velocidade (100 Mbps) sobre fibra óptica, frequentemente usado como backbone. Utilizava uma topologia de anel duplo para redundância e um esquema de passagem de token.
*   **SONET/SDH:** Redes de telecomunicações ópticas que usam anéis (geralmente duplos) para alta disponibilidade e recuperação rápida de falhas.

## Características

*   **Conexão Circular:** Cada nó conecta-se a dois vizinhos.
*   **Fluxo Unidirecional (Geralmente):** Dados circulam em uma direção.
*   **Repetição de Sinal:** Cada nó regenera o sinal.
*   **Passagem de Token (Comum):** Método de controle de acesso ao meio determinístico.
*   **Sem Colisões (com Token):** O token garante que apenas um nó transmita por vez.
*   **Dependência Sequencial:** Uma falha em um nó ou cabo pode interromper todo o anel (a menos que haja mecanismos de redundância, como anéis duplos ou MAUs inteligentes).

## Vantagens

*   **Determinismo (com Token Passing):** O acesso ao meio é ordenado e previsível, garantindo que cada nó terá uma oportunidade de transmitir dentro de um tempo máximo. Isso é vantajoso para aplicações de tempo real.
*   **Sem Colisões (com Token Passing):** Elimina o problema de colisões presente em barramentos CSMA/CD, levando a um melhor desempenho sob alta carga (comparado ao barramento Ethernet antigo).
*   **Facilidade de Adicionar Nós (Teórica):** Adicionar um nó requer interromper o anel brevemente para inserir o novo nó entre dois existentes (na prática, MAUs simplificaram isso).
*   **Não Requer Terminadores:** O anel é fechado.

## Desvantagens

*   **Falha Única Derruba o Anel:** A falha de um único nó ou cabo interrompe a comunicação para todos (problema mitigado por anéis duplos e MAUs/hubs inteligentes que podem "bypassar" nós falhos).
*   **Dificuldade na Solução de Problemas:** Localizar uma falha no anel pode ser complexo.
*   **Latência:** Os dados precisam passar por múltiplos nós para chegar ao destino, adicionando latência a cada salto.
*   **Reconfiguração Complexa:** Adicionar ou remover nós pode interromper temporariamente a operação do anel (novamente, mitigado por MAUs).
*   **Custo (Token Ring/FDDI):** Equipamentos Token Ring e FDDI eram historicamente mais caros que Ethernet.
*   **Obsolescência (em LANs):** Amplamente substituída pela Ethernet comutada (topologia em estrela - [[Rede_Estrela]], [[Switch]]), que oferece maior velocidade, menor custo, maior confiabilidade e gerenciamento mais fácil.

## Seção Expandida: Anéis Duplos e MAUs

Para superar a vulnerabilidade a falhas únicas, muitas implementações de anel usavam mecanismos de redundância:
*   **Anel Duplo (ex: FDDI, SONET/SDH):** Utiliza dois anéis independentes, com dados fluindo em direções opostas. Se um anel falhar (cabo rompido ou nó falho), o sistema pode automaticamente reconfigurar-se (wrap) usando o segundo anel para manter a conectividade, contornando a falha.
*   **MAU (Multistation Access Unit) / MSAU (Multi-Station Access Unit) em Token Ring:** Embora a topologia lógica fosse um anel, a fiação física era em estrela, conectando cada estação a uma porta na MAU. A MAU continha relés que formavam o anel internamente. Se uma estação falhasse ou fosse desligada, a MAU automaticamente bypassava aquela porta, mantendo a integridade do anel para as outras estações. Isso melhorou significativamente a confiabilidade e a facilidade de gerenciamento do Token Ring em comparação com um anel físico puro.

## Notas Relacionadas

*   [[Protocolos_de_Comunicação]]
*   [[Rede_Barra]] (Comparação de topologia)
*   [[Rede_Estrela]] (Topologia dominante hoje)
*   [[Rede_Híbrida]]
*   [[Rede_Ponto_a_Ponto]]
*   [[Switch]]
*   [[Meio_Físico_Wireless]] (Não aplicável diretamente, mas contraste de topologia)

