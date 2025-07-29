---
Tema Principal: 45-Método Ecopelexing
Nível de Dificuldade: Médio
Fonte/Referência: Redes de Computadores, Protocolos de Comunicação, Interfaces de Terminal
tags:
  - Eco
  - Terminal
---

# 45-Método Ecopelexing

## Visão Geral

Echoplexing, frequentemente chamado simplesmente de "remote echo" (eco remoto), é um método de feedback utilizado em comunicações de dados interativas, especialmente em sessões de terminal remotas. Neste método, quando um usuário digita um caractere no seu terminal (DTE), o caractere não é exibido localmente de imediato. Em vez disso, ele é transmitido para o sistema host remoto. O host, ao receber o caractere, o envia de volta (eco) para o terminal original, que só então o exibe na tela. Este mecanismo serve como uma confirmação visual para o usuário de que o caractere foi recebido corretamente pelo host e também pode atuar como uma forma rudimentar de detecção de erros na linha de comunicação.

## Definição

Echoplexing é um procedimento em comunicação de dados full-duplex onde os caracteres digitados em um terminal são enviados para um computador remoto, e este computador remoto é responsável por ecoar (transmitir de volta) esses caracteres para o terminal de origem para que sejam exibidos. O terminal local geralmente tem sua própria capacidade de eco (local echo) desativada quando o echoplexing está em uso.

## Exemplos

1.  **Sessões Telnet/SSH:** Muitas conexões Telnet e SSH operam em modo de echoplexing. Quando você digita um comando, cada caractere viaja até o servidor remoto, que o envia de volta para ser exibido no seu cliente SSH/Telnet.
2.  **Modems em Modo de Comando (alguns):** Alguns modems, quando em modo de comando, podem usar echoplexing para confirmar a recepção dos comandos AT.
3.  **Sistemas Operacionais Multi-usuário Legados:** A interação com shells em sistemas como UNIX/Linux via terminais seriais frequentemente utilizava echoplexing.
4.  **Acesso a BBS (Bulletin Board Systems) via Modem:** Era comum que a BBS controlasse o eco dos caracteres digitados pelo usuário.

## Características

*   **Eco Remoto:** A exibição do caractere digitado depende do seu retorno pelo sistema remoto.
*   **Requer Full-Duplex:** A linha de comunicação deve permitir a transmissão simultânea em ambas as direções para que o caractere seja enviado e seu eco recebido eficientemente.
*   **Feedback de Recepção:** Fornece uma confirmação implícita de que o host recebeu o caractere.
*   **Latência Visível:** O atraso entre digitar um caractere e vê-lo aparecer na tela corresponde ao tempo de ida e volta (Round-Trip Time - RTT) da comunicação.
*   **Eco Local Desativado:** O terminal não deve exibir o caractere localmente ao ser digitado.

## Vantagens

*   **Confirmação de Entrega:** O usuário vê que o caractere chegou ao host (ou pelo menos que *algo* chegou e foi ecoado).
*   **Detecção Rudimentar de Erros:** Se o caractere ecoado for diferente do digitado, ou se não houver eco, indica um problema na comunicação (embora não identifique o erro exato).
*   **Simplificação do Terminal:** O terminal não precisa implementar lógica complexa de edição local ou eco, transferindo essa responsabilidade para o host.
*   **Controle do Host:** Permite que o host controle o que é exibido, por exemplo, suprimindo o eco de senhas.

## Desvantagens

*   **Latência Perceptível:** Em conexões com alta latência (satélite, redes congestionadas), o atraso entre digitar e ver o caractere pode ser significativo e frustrante.
*   **Dobro de Tráfego:** Cada caractere digitado gera tráfego em ambas as direções (envio do caractere, recebimento do eco), consumindo mais largura de banda do que o eco local.
*   **Inviável em Half-Duplex:** Não funciona bem em sistemas half-duplex, pois a linha precisaria ser revertida constantemente.
*   **Confusão se Eco Local Estiver Ativo:** Se o eco local não for desativado, cada caractere aparecerá duplicado na tela.
*   **Sensibilidade a Perda de Pacotes:** A perda do caractere original ou do seu eco resulta em o caractere não aparecer na tela.

## Seção Expandida: Echoplexing vs. Eco Local

A alternativa ao echoplexing é o **eco local (local echo)**. Neste modo, o próprio terminal (ou o software de emulação) exibe imediatamente o caractere na tela assim que ele é digitado, e simultaneamente o transmite para o host. O host não ecoa o caractere de volta. O eco local é preferível em conexões half-duplex ou de alta latência, pois fornece feedback instantâneo ao usuário. No entanto, não oferece a confirmação de que o host recebeu o caractere. A escolha entre eco local e echoplexing geralmente depende das características da conexão e das capacidades do host e do terminal, sendo frequentemente negociada no início da sessão ou configurável.

## Notas Relacionadas

*   [[Transmissão_Half_Duplex]]
*   [[Transmissão_Full_Duplex]]
*   [[Eco]] (Eco de linha, diferente de echoplexing)
*   [[Terminais_de_Dados]]
*   [[Equipamentos_Terminais_de_Dados_(DTE)]]
*   [[Equipamentos_de_Comunicação_de_Dados_(DCE)]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

