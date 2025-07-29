---
Tema Principal: 47-Método Cyclic Redundancy Checking (CRC)
Nível de Dificuldade: Avançado
Fonte/Referência: Redes de Computadores, Teoria da Codificação, Matemática Discreta
tags:
  - CRC
  - Detecção
  - Erros
  - Erro
  - Transmissão
  - Redes
---

# 47-Método Cyclic Redundancy Checking (CRC)

## Visão Geral

A Verificação por Redundância Cíclica (CRC - Cyclic Redundancy Check) é uma das técnicas de detecção de erros mais poderosas e amplamente utilizadas em redes digitais e sistemas de armazenamento. Baseada em aritmética polinomial sobre um corpo finito (GF(2)), o CRC calcula uma sequência curta de bits de verificação de tamanho fixo (conhecida como checksum CRC ou simplesmente CRC) para um bloco de dados. Este checksum é anexado aos dados e transmitido. O receptor realiza o mesmo cálculo sobre os dados recebidos e compara o resultado com o checksum recebido. Se não coincidirem (ou, mais comumente, se o cálculo sobre dados+checksum não resultar em zero), um erro é detectado com altíssima probabilidade. CRCs são particularmente eficazes na detecção de erros em rajada, que são comuns em muitos canais de comunicação.

## Definição

O método CRC trata o bloco de dados de k bits a ser transmitido como os coeficientes de um polinômio M(x) de grau k-1. Um polinômio gerador G(x) de grau r, pré-definido e conhecido tanto pelo transmissor quanto pelo receptor, é escolhido (ex: CRC-16, CRC-32). O transmissor realiza os seguintes passos:
1.  Anexa r bits zero ao final do bloco de dados, criando um novo polinômio M'(x) = x^r * M(x).
2.  Divide M'(x) pelo polinômio gerador G(x) usando aritmética polinomial módulo 2 (equivalente a operações XOR sem "vai um").
3.  O resto R(x) dessa divisão, que terá grau no máximo r-1 (ou seja, r bits), é o checksum CRC.
4.  O transmissor subtrai (que é o mesmo que somar em módulo 2) R(x) de M'(x), ou mais comumente, simplesmente anexa R(x) ao bloco de dados original M(x). O polinômio resultante T(x) = M'(x) + R(x) é exatamente divisível por G(x).
5.  O bloco de dados com o CRC anexado (correspondente a T(x)) é transmitido.

O receptor recebe o bloco T'(x) (que pode conter erros) e o divide pelo mesmo polinômio gerador G(x). Se o resto for zero, assume-se que não houve erros detectáveis. Se o resto for diferente de zero, um erro foi detectado.

## Exemplos

*   **Ethernet e Wi-Fi (802.3 e 802.11):** Usam CRC-32 para verificar a integridade de cada quadro (frame) na camada de enlace.
*   **HDLC, PPP:** Protocolos de enlace de dados que utilizam CRC (geralmente CRC-16 ou CRC-32).
*   **Armazenamento:** Usado em discos rígidos, SSDs e outros meios para verificar a integridade dos dados lidos.
*   **Compressão de Arquivos:** Formatos como ZIP e Gzip usam CRC-32 para verificar a integridade dos arquivos após a descompressão.
*   **Comunicações Seriais:** Muitas comunicações seriais industriais ou embarcadas utilizam CRC.
*   **ATM (Asynchronous Transfer Mode):** Usava CRC para verificar o cabeçalho de cada célula.

**Polinômios Geradores Comuns:**
*   **CRC-8:** Usado em alguns protocolos simples.
*   **CRC-16-CCITT:** G(x) = x^16 + x^12 + x^5 + 1 (Usado em HDLC, X.25, Modbus)
*   **CRC-32:** G(x) = x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1 (Usado em Ethernet, PKZIP, Gzip, PNG)

## Características

*   **Baseado em Divisão Polinomial (Módulo 2):** Fundamento matemático robusto.
*   **Tamanho Fixo do Checksum:** O CRC tem um tamanho fixo (r bits), independentemente do tamanho dos dados.
*   **Alta Capacidade de Detecção:**
    *   Detecta todos os erros de bit único.
    *   Detecta todos os erros de bit duplo (se G(x) tiver pelo menos 3 termos e fator x+1).
    *   Detecta qualquer número ímpar de erros de bit (se G(x) for divisível por x+1).
    *   Detecta todas as rajadas de erro de comprimento menor ou igual a r (grau de G(x)).
    *   Detecta a maioria das rajadas de erro de comprimento maior que r com alta probabilidade (1 - 2^-r ou 1 - 2^-(r-1)).
*   **Implementação Eficiente:** Pode ser implementado eficientemente em hardware usando registradores de deslocamento e portas XOR.

## Vantagens

*   **Excelente Capacidade de Detecção:** Muito mais robusto que paridade ou checksums simples, especialmente contra erros em rajada.
*   **Fundamentação Matemática Sólida:** Suas propriedades de detecção podem ser analisadas formalmente.
*   **Eficiência de Implementação:** Implementações em hardware são rápidas e relativamente simples.
*   **Padronização:** Polinômios geradores bem conhecidos e padronizados garantem interoperabilidade.

## Desvantagens

*   **Não Corrige Erros:** Assim como outras técnicas de *detecção*, o CRC não corrige os erros, apenas os sinaliza.
*   **Overhead:** Adiciona r bits de redundância aos dados.
*   **Complexidade (Comparado à Paridade):** Mais complexo de calcular do que a paridade simples, embora trivial para hardware moderno.
*   **Probabilidade Residual de Erro Não Detectado:** Embora muito baixa (ex: ~1 em 4 bilhões para CRC-32), ainda existe uma chance teórica de um padrão de erro específico resultar em um resto zero e não ser detectado.

## Notas Relacionadas

*   [[Sinal_Digital]]
*   [[Transmissão_Síncrona]]
*   [[Over_Head]]
*   [[Técnicas_para_Detecção_de_Erros]]
*   [[Geradores_de_Erros]]
*   [[Método_Par_e_Ímpar_(Paridade)]]
*   [[Medição_de_Erros_em_Transmissão_de_Dados]]

