---
Tema Principal: Reverse-Engineering
tags:
  - Reverse-Engineering
  - Cybersegurança
  - segurança-informação
related:
  - MALDEV
author: Vithor
---

Os tempos estão mudando, então com a nova era da inteligência artificial não é de se duvidar que isso iria aparecer uma hora ou outra...

Estamos cada vez mais próximos de modelos que não apenas compreendem e respondem em linguagem natural, mas que também **interagem com softwares diretamente**, executando tarefas complexas em tempo real. Isso representa uma mudança radical na forma como desenvolvedores, engenheiros e analistas utilizam ferramentas computacionais no dia a dia.

E é aí que entra o **MCP (Model Context Protocol)** — um protocolo que conecta **LLMs** a aplicações reais, tornando possível essa automação inteligente.

Então antes de darmos uma olhada nisso... o que é esse tal de MCP?

<div align="center">
    <img src="1.png">
</div>

## O que é MCP (Model Context Protocol)?

O **MCP**, ou **Model Context Protocol**, é um protocolo que funciona como uma ponte entre **Modelos de Linguagem de Grande Escala (LLMs)** e **aplicações**, permitindo que eles se comuniquem diretamente e executem ações dentro dessas aplicações.

Ele utiliza uma arquitetura do tipo **cliente-servidor**. Nesse modelo, as **aplicações-alvo** funcionam como **servidores MCP**, que expõem funções padronizadas. Essas funções podem ser chamadas pelos **clientes MCP**, que se comunicam diretamente com o modelo de linguagem.

Na prática, isso significa que os LLMs podem incorporar essas funções como ferramentas, permitindo que realizem tarefas de forma autônoma em nome do usuário. O modelo não apenas interpreta comandos, mas também executa ações diretas nas aplicações conectadas por meio do protocolo.

O mais interessante é que o MCP não é limitado a um único modelo de linguagem ou aplicação específica. **É possível criar diversos servidores MCP**, e cada um representa uma nova ferramenta disponível para o modelo, aumentando sua capacidade de agir como um agente inteligente e automatizado para realizar tarefas complexas.

Essa abordagem elimina a necessidade de copiar e colar manualmente informações entre o modelo e a aplicação, permitindo que o modelo atue de forma independente, com base em um conjunto de ferramentas padronizadas que você define.

### Como isso vai funcionar

<div align="center">
    <img src="2.png" width="405" height="423">
</div>

1. “O **LLM** (por exemplo, ChatGPT) inicia o fluxo ao enviar uma solicitação de ação.”
    
2. “Essa requisição chega no **MCP Client**, que é o intermediário entre modelo e app.”
    
3. “O client usa o **MCP Protocol** para falar com o **MCP Server**, que é o próprio aplicativo.”
    
4. “O servidor expõe suas **APIs internas** como um conjunto padronizado de funções.”
    
5. “Com isso, o LLM consegue invocar rotinas do app de forma transparente e automatizada.”

<div align="center">
    <img src="3-1.png" width="494" height="557">
</div>

1. “O **LLM** recebe sua instrução em linguagem natural e envia ao **MCP Client** — no nosso caso, um plugin externo ao IDA Pro.”
    
2. “O client, então, transmite o comando pelo **MCP Protocol** até o **IDA Pro**, que aqui atua como servidor.”
    
3. “Dentro do IDA, existe uma camada de **API MCP**, com funções como `rename_function` ou `describe_symbol`.”
    
4. “Cada chamada dessa API mapeia para uma ação concreta na interface do IDA, como renomear símbolos, inspecionar estruturas ou gerar documentação.”
    
5. “Assim, o LLM passa a controlar diretamente o IDA, sem que o usuário precise clicar em nada.”

## Exemplo prático

Bom, para realizarmos isso, podemos utilizar, por exemplo, projetos como [ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp) ou [GhidraMCP](https://github.com/LaurieWired/GhidraMCP), entre outros.

Mas para este post, vou usar como exemplo o [ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp):

---
### Instalação
A instalação do MCP para o IDA é bem simples, como podemos ver no **README** do projeto:

1. Install the latest version of the IDA Pro MCP package:

```shell
pip uninstall ida-pro-mcp
pip install git+https://github.com/mrexodia/ida-pro-mcp
```

2. Configure the MCP servers and install the IDA Plugin:

```
ida-pro-mcp --install
```

Como você pode ver no vídeo abaixo, tudo é bem simples e rápido de se fazer:

<div align="center">
    <video src="ida.mp4" controls></video>
</div>

Recomendo fortemente que experimente o uso de pelo menos um desses MCPs, você vai ver que é bem interessante e fácil de usar.
## Considerações finais

O MCP é um passo importante para integrar modelos de IA com softwares de forma prática. Em vez de perder tempo com comandos manuais, agora o modelo pode fazer isso sozinho por você.

Com o avanço dos LLMs e padrões como o MCP, fica cada vez mais fácil automatizar tarefas e ganhar produtividade.

O futuro não é mais sobre o que você faz no software, mas sobre o que a IA pode fazer por você.