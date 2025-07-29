---
Tema Principal: Análise de Malware
tags:
  - Análise-Estática
  - Malware
  - Cybersegurança
  - Importação
  - Exportação
related:
  - Análise-Dinâmica
  - MALDEV
author: Vithor
---
## **O que são Importações e Exportações?**

Importações referem-se às ==funções importadas por um executável do Windows a partir de DLL== Exportações refere-se a todas as funções exportadas por um determinado DLL.
## **Importância das importações**

Na análise de malware estática de arquivos executáveis do Windows, examinar importações e exportações é crucial. Isso ocorre porque é possível obter insights sobre o comportamento do malware com base nas DLLs e nas funções que elas contêm.

## **Visualizando Importações e Exportações**

Existem várias ferramentas disponíveis para visualizar as importações e exportações. Por exemplo, a ferramenta [Detect-It-Easy](https://github.com/horsicq/Detect-It-Easy) pode ser usada para analisar as importações e exportações de arquivos de malware do Windows.

Recomendo fortemente acessar o site [MalAPI](https://malapi.io) para ter uma ideia mais ampla de quais APIs podem ser utilizadas por malwares:

<div align=center>
  <img alt="malapi" src="malapi.PNG">
</div>

Vamos examinar as importações de um malware:

<div align=center>
  <img alt="imports" src="Imports.PNG">
</div>

Como podemos ver, esse arquivo faz a importação de 3 APIs que podem estar sendo utilizadas para injeção. No entanto, é importante lembrar que: ==Nem sempre essas APIs serão usadas para fins maliciosos, muitos programas legítimos também fazem uso dessas funções.==

Por isso, é fundamental analisar o contexto: verificar se o arquivo importa outras APIs, quais são elas e como são utilizadas. Assim, podemos ter mais certeza se aquele arquivo realmente possui comportamento malicioso ou não. **Sempre seja criterioso e evite conclusões precipitadas**.