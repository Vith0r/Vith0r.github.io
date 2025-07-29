---
weight: 1
title: Bem Vindo(a)
date: 2023-03-05T15:58:26+08:00
lastmod: 2023-03-05T15:58:26+08:00
dr: false
author: Vith0r
authorLink: https://github.com/Vith0r
description: Falando um pouco sobre meu blog.
images: 
resources:
  - name: featured-image
    src: Image.jpeg
tags: 
lightgallery: false
toc:
  auto: false
---
<img src="./banner.svg" width="701" height="175">

Eai! seja **bem-vindo(a)** ao meu **blog**.

> [!info] Informação
> Neste post, vou indicar um caminho para quem se interessar pelo conteúdo e falar sobre algumas coisas.
## Por que fiz este blog?
Bom, sei que existem muitos outros blogs e canais que abordam esses assuntos de forma muito mais profissional, mas não me importo. Além de ser bom escrever artigos, mesmo que simples, este é basicamente um cantinho onde guardo alguns textos escritos por mim. Nada muito profissional.

Meu objetivo é escrever artigos que sejam simples, não super complexos, mas que eu goste de fazer no pouco tempo livre que tenho. Espero que você goste do que tenho para mostrar aqui.
## Este não é meu primeiro blog! 
Meu primeiro blog foi feito em **2023**, logo após a criação de um grupo que, infelizmente, não durou muito tempo.<br> O nome do grupo era [Digitall-Hell](https://web.archive.org/web/20240303174829/https://digitalh3ll.org/), criado por alguns amigos meus.
Desde então, fiz aproximadamente dois blogs sem utilizar nenhum tema específico, você pode encontrar um dos meus blogs aqui: [Blog-Antigo](https://github.com/Vith0r/old-blog).
Mas já utilizei temas como o [jekyll-theme-chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) e o [pages-themes/hacker](https://github.com/pages-themes/hacker). Também utilizei o tema [LoveIt](https://github.com/dillonzq/LoveIt), mas eu encontrei o [quartz](https://github.com/jackyzha0/quartz), então decidi estar utilizando ele.
## Um pouco sobre mim

Bom como já deve saber meu nome é **Vithor**, tenho atualmente 18 anos, meu principal hobby nos últimos anos da minha vida, foi aprender sobre **Windows Internals**, e desenvolver **malwares** para contornar alguns antivírus, eu gosto desses temas, mas não faço a menor ideia se algum dia eu irei procurar trabalhar na área de **cybersegurança**.

**90% de tudo que sei sobre análise ou desenvolvimento de malware eu aprendi lendo em algum site**.

Bom, quase tudo que eu sei sobre esses temas eu aprendi lendo em algum blog, então eu consegui começar a salvar alguns dos blogs que eu acabava frequentando eventualmente para ler alguma coisa, aproveitando isso eu decidi criar um repositório no github contendo esses blogs você pode acessar esse repositório aqui: [Awesome-Malware-Blogs](https://github.com/Vith0r/Awesome-Malware-Blogs)

---
### Seja mais realista!

Por uma boa parte da minha vida, nessa extensa internet, conheci muitas pessoas, e uma das coisas que a gente infelizmente mais encontra pelo caminho, são pessoas de **EGO inflado**, ou pessoas que fingem saber coisas que elas não sabem, felizmente eu acho que eu nunca fui esse tipo de pessoa, mas se você é um iniciante nessa área de **maldev**, por favor não seja mais uma das pessoas que tem o efeito **Dunning-Kruger**.

<div align=center>
  <img alt="msg" src="17.svg">
</div>

## Sobre Meus Posts

Antes de tudo, quero deixar claro que **ainda estou aprendendo** a escrever bem.  
E se por acaso em algum momento eu não conseguir transmitir ou ensinar o conteúdo da melhor forma, peço desculpas.
Meus posts tem um propósito mais pessoal em fazer com que ao escrever e ler os meus posts eu consiga fixar na minha cabeça esses determinados assuntos com mais facilidade.

## Fundamentos

Inicialmente, meus blogs não eram muito focados em abordar os fundamentos dos temas que geralmente trato aqui. No entanto, após começar a usar o Obsidian para organizar minhas anotações, decidi dedicar um tempo para criar posts que abordam brevemente os fundamentos sobre **Windows**, **Análise de Malware** e **MalDev**.

### SecOps

Na seção **SecOps**, você encontrará posts que abordam diferentes aspectos da análise de malware:

- [[Introdução-]]: Uma introdução rápida e direta sobre análise dinâmica de malware.
- [[Análise de Memória]]: Técnicas para investigar o comportamento de malwares na memória.
- [[Malware Não Fez Nada]]: Discussão sobre malwares que aparentam não executar ações visíveis.
- [[Introdução]]: Uma introdução sobre análise estática de malware.
- [[Assinaturas YARA]]: Uso de regras YARA para identificar padrões em malwares.
- [[Hash do Arquivo]]: Importância de hashes para verificação de integridade.
- [[Importação e Exeportação]]: Análise de funções importadas e exportadas por executáveis.
- [[Strings]]: Extração de strings para identificar comportamentos.
- [[Análise simples de malware]]: Uma análise simples e direta de um malware.

### MalDev

Na seção **MalDev**, você encontrará posts que exploram diferentes aspectos do desenvolvimento de malware e técnicas relacionadas. Esses posts abordam desde fundamentos até técnicas avançadas:

- [[Fundamentos Windows]]: Introdução aos conceitos básicos do sistema operacional Windows.
- [[Stealers]]: Análise de malwares especializados em roubo de informações sensíveis.
- [[Spyware]]: Discussão sobre malwares projetados para espionagem.
- [[Ransomware]]: Explicação sobre malwares que criptografam dados e exigem resgate.
- [[PEB Walk]]: Técnica avançada para evitar detecção de APIs na Import Address Table (IAT).

## Evasão de Antivírus

Bom um dos principais temas na comunidade de **Maldev** é a **evasão de antivirus**, e esse foi por um bom tempo um dos meus focos principais, já consegui contornar tudo que eu queria até hoje e tenho alguns posts por mais simples que sejam, onde tendo passar as ideias que tive para conseguir contorna-los.

- [[dll-loader]]: Mostro como converter um executável para binário e fazer uma DLL carregar esse binário. Durante o processo, consegui contornar o **Windows Defender**.

- [[creating-simple-loader-1]]: Post voltado para iniciantes. Mostro a evolução de um loader com foco em reduzir a detecção.

- [[creating-simple-loader-2]]: Ensino a criar um carregador que contorna o **Windows Defender**.

- [[criando-loader]]: Demonstro um loader que atingiu **zero detecções** no [VirusTotal](https://www.virustotal.com/).

- [[powershell]]: Aplico um patch no **AMSI** e executo payloads diretamente da memória.

- [[criando-loader]]: Modifico um projeto detectado para contornar AVs e EDRs.

- [[unhooking]]: Post simples sobre como fazer unhook da `kernel32.dll` para contornar um EDR básico que criei.

- [[Indirect-Syscalls]]: Loader usando **syscalls indiretas**, com sucesso na evasão do **Windows Defender**.

- [[reverse-shell]]: Criação de um reverse shell simples para acesso inicial.

- [[Hell Code Loader]]: Criação de um loader com capacidade de contornar AV/EDR.

## Análise de Malware
Análise de Malware é um tema que ainda **estou tentando melhorar**, mas gosto bastante desse tema, por mais que eu não seja nenhum expert nesse tipo de assunto, eu tenho alguns posts onde realizo a análise de alguns “malwares".

- [[Análise simples de malware]]: Aqui eu mostro rapidamente uma analise simples e direta de um malware.
- [[AI Reverse Engineering]]: Aqui eu mostro como a **inteligência artificial** pode nos ajudar com uma analise de malware.

## Informações
Minha mente as vezes não consegue focar em um tema em especifico por muito tempo, então as vezes eu acabo **escrevendo várias coisas aleatórias em um único post**, um bom exemplo disso pode ser visto abaixo:

- [[coisas_aleatorias]]: Comentários diversos sobre criação e evasão de antivírus no Windows.

## Hooking
Posts sobre projetos envolvendo **hooking de APIs**:

- [[api-hooking]]: Reupload do meu primeiro post, originalmente publicado no [Digital Hell](https://web.archive.org/web/20240303174829/https://digitalh3ll.org/), onde desenvolvo um mini "rootkit" para ocultar processos.

- [[EDRAV]]: Mini antivírus que monitora chamadas de API de outros programas.

## Redes
Esse tópico de notas sobre redes foi montado por mim como base para eu **estudar para minhas provas de redes**, em alguns desses tópicos de redes eu fiz alguns desenhos, já que meu professor me disse para fazer, mas são tópicos bem interessantes, eu diria que é um bom começo de estudo sobre redes.

- [[Redes]] Aqui contem 100 temas de redes.