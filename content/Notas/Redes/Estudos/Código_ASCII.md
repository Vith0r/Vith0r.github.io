---
Tema Principal: "11-Código ASCII"
Nível de Dificuldade: "Básico"
Fonte/Referência: "Padrões de Codificação, História da Computação"
Tags:
  - "Codificação"
  - "ASCII"
  - "Padrão"
  - "Texto"
  - "Computação"
---

# 11-Código ASCII

## Visão Geral

O ASCII (American Standard Code for Information Interchange) é um padrão de codificação de caracteres fundamental na história da computação e das telecomunicações. Desenvolvido nos anos 60, ele define uma correspondência entre caracteres (letras do alfabeto inglês, números, pontuação e caracteres de controle) e números inteiros de 7 bits. Sua importância reside em ter sido o primeiro padrão amplamente adotado que permitiu a diferentes equipamentos de computação e comunicação trocar informações textuais de forma consistente. Embora limitado em sua capacidade de representar caracteres de outros idiomas, o ASCII formou a base para codificações posteriores, como o Latin-1 e o próprio Unicode (UTF-8 é retrocompatível com ASCII).

## Definição

ASCII é um código de caracteres baseado no alfabeto inglês que atribui um número único, variando de 0 a 127 (representável por 7 bits), a 128 símbolos: 95 caracteres imprimíveis (letras maiúsculas e minúsculas, dígitos de 0 a 9, símbolos de pontuação e o espaço) e 33 caracteres de controle não imprimíveis (como carriage return, line feed, tabulação, escape). Esses caracteres de controle foram originalmente concebidos para controlar dispositivos como teletipos e impressoras. Posteriormente, surgiu o ASCII estendido, que utiliza 8 bits (um byte) para representar 256 caracteres, incluindo os 128 originais mais caracteres adicionais (acentuados, símbolos gráficos, etc.), embora existam várias versões incompatíveis do ASCII estendido (páginas de código).

## Exemplos

*   A letra 'A' maiúscula é representada pelo número decimal 65 (binário 1000001).
*   A letra 'a' minúscula é representada pelo número decimal 97 (binário 1100001).
*   O dígito '0' é representado pelo número decimal 48 (binário 0110000).
*   O caractere de espaço é representado pelo número decimal 32 (binário 0100000).
*   O caractere de controle Line Feed (LF), usado para pular linha em sistemas Unix/Linux, é o decimal 10 (binário 0001010).
*   O caractere de controle Carriage Return (CR), usado em sistemas mais antigos e Windows (junto com LF), é o decimal 13 (binário 0001101).

## Características

*   **Baseado em 7 bits:** O padrão original define 128 códigos (0-127).
*   **Foco no Inglês:** Contém apenas caracteres do alfabeto inglês não acentuado.
*   **Caracteres Imprimíveis e de Controle:** Inclui tanto símbolos visíveis quanto comandos para dispositivos.
*   **Ordenação Lógica:** Letras e números são organizados em sequências numéricas contíguas, facilitando comparações e ordenação.
*   **Padrão Amplamente Adotado:** Tornou-se a base para a troca de texto em computadores e na internet inicial.
*   **Extensibilidade (ASCII Estendido):** O uso do 8º bit permitiu extensões (páginas de código), mas introduziu problemas de compatibilidade.

## Vantagens

*   **Simplicidade:** Fácil de implementar em hardware e software.
*   **Eficiência (para texto em inglês):** Usa apenas 7 bits por caractere no padrão original.
*   **Padronização:** Foi crucial para a interoperabilidade entre sistemas de diferentes fabricantes.
*   **Base para Outros Padrões:** Serviu de alicerce para codificações mais abrangentes como ISO-8859-1 e Unicode.

## Desvantagens

*   **Limitado ao Inglês:** Não suporta caracteres acentuados, cirílicos, asiáticos ou outros símbolos de idiomas não ingleses.
*   **Número Limitado de Caracteres:** Mesmo o ASCII estendido (256 caracteres) é insuficiente para representar todos os caracteres necessários globalmente.
*   **Ambiguidade do ASCII Estendido:** Existem múltiplas versões incompatíveis de páginas de código ASCII estendido, causando problemas na exibição de textos.
*   **Caracteres de Controle Obsoletos:** Muitos dos caracteres de controle não têm mais relevância direta em sistemas modernos.

## Seção Expandida: ASCII e a Internet

O ASCII desempenhou um papel vital nos primórdios da Internet. Protocolos fundamentais como SMTP (para e-mail), HTTP (para a Web) e Telnet foram originalmente projetados para trabalhar primariamente com texto codificado em ASCII de 7 bits. Isso simplificou o desenvolvimento inicial, mas rapidamente se tornou uma limitação à medida que a Internet se globalizou. A necessidade de enviar e-mails ou exibir páginas web em outros idiomas levou ao desenvolvimento de mecanismos como MIME (Multipurpose Internet Mail Extensions) e à especificação de conjuntos de caracteres em cabeçalhos HTTP, culminando na adoção massiva do Unicode (especialmente UTF-8) como a solução definitiva para a internacionalização.

## Notas Relacionadas

*   [[Instituições_de_Padronização]]
*   [[Sinal_Digital]]
*   [[Codificação_de_Mensagens]]
*   [[Código_EBCDIC]]
*   [[Transmissão_Assíncrona]]

