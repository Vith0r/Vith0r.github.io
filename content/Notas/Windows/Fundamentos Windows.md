---
Tema Principal: Windows
tags:
  - fundamentos-windows
  - artigos-windows
  - casos-windows
related:
  - Cybersecurity
  - Windows-Internals
author: Vithor
---
# Arquitetura do Windows

Neste post, vou apresentar os fundamentos essenciais da arquitetura do Windows. O objetivo é facilitar a compreensão de conceitos que serão abordados em outros conteúdos, especialmente para quem está começando, então acho que nada melhor que começar a explicar sobre as camadas de Ring do Windows.
## Windows é uma cebola?

Para quem não sabe, o Windows tem “camadas” como uma cebola, podemos categorizar elas da seguinte forma:

![[rings.svg]]

Para entender melhor, imagine o seguinte, o *Ring3* é a camada mais superficial do sistema operacional, ou seja o usuário atua nessa camada, juntamente com os programas que geralmente o Usuário abre, como por exemplo o ``Notepad.exe``.

Então o Ring0 seria a camada mais profunda, uma camada que um Usuário comum geralmente não iria conseguir acessar, o Usuário comum não conseguiria atuar em Ring0 nem mesmo sendo um administrador, mas mesmo assim todos os programas do computador tem que se comunicar com o Ring0 (Kernel).

Como assim, todos os programas tem que se comunicar com o Ring0?, imagine que o Ring0 é como se fosse o cérebro de todo sistema operacional, absolutamente tudo que ocorre dentro do sistema operacional, acontece graças ao Kernel. então tudo que acontece na superfície (*Ring3*) Tem que ser realizado pelo Ring0 (Kernel).

Por exemplo quando você mexe seu mouse, quem faz o cursor do mouse realmente se mexer é o ``kernel``. então para isso, seu mouse tem que se comunicar com um driver, que tem instalado no seu sistema operacional, sem esse driver o seu mouse não iria realizar absolutamente nada, é graças ao driver que seu mouse faz alguma coisa, porque o driver do seu mouse se comunica com o ``Kernel``, Você pode tentar entender melhor o que eu estou falando olhando a imagem abaixo:

<div align=center>
  <img alt="amsi" src="13.png">
</div>

Observe a imagem e olhe que temos algumas coisas que já atuam em nível de ``kernel``, como:

**`Hardware Abstraction Layer`**, que é o responsável por servir como uma ponte entre o ``kernel`` e o ``hardware``, ele faz com que o ``kernel`` não precise saber os detalhes de como cada peça de hardware funciona, ou seja, ele padroniza o jeito que o ``kernel`` conversa com os dispositivos.

E também temos os ``Drivers`` que são responsáveis por fazer o trabalho mais direto com o ``hardware``, seguindo o exemplo o driver do seu mouse é quem entende os sinais que o mouse envia e transforma isso em algo que o ``kernel`` consegue usar, sem o driver o ``kernel`` não saberia como lidar com o mouse, com a impressora por exemplo, e por aí vai, então os drivers funcionam como “tradutores” entre o hardware e o ``kernel``.

Mas já se perguntou o por que existe essas sub divisões no Windows? Porque um usuário é comum, porque o outro é administrador…

Bom de forma simples poderíamos categorizar os seguintes tipos de contas no Windows: 

| Tipo de Conta | O que pode fazer                                                    |
| ------------- | ------------------------------------------------------------------- |
| Usuário Comum | Tarefas básicas (abrir programas, navegar, usar arquivos próprios)  |
| Administrador | Instalar/remover programas, alterar configurações, gerenciar contas |
| SYSTEM        | Controle total do sistema (usado internamente pelo Windows)         |
|               |                                                                     |

Mas porque exatamente tem que ter esse tipo de divisão, bom precisamos ter esses tipos de permissões por vários motivos, mas vou dar alguns exemplos simples como por exemplo.

Essa separação ajuda a manter uma maior ``segurança e a integridade do sistema``, se qualquer usuário tivesse acesso total a qualquer coisa,  como por exemplo acessar arquivos de outras contas de usuário no sistema. 

Mesmo que todos os perfis estejam salvos no mesmo disco, cada pasta de usuário (em `C:\Users`) tem permissões restritas, então um usuário só pode ler e modificar seus próprios arquivos, a menos que o administrador altere essas permissões manualmente.

Outro exemplo é o poder de Modificar arquivos do sistema, como aqueles presentes nas pastas `C:\Windows\System32` ou `C:\Program Files`.

Esses diretórios são protegidos por ``ACLs`` (Access Control Lists) que impedem que contas com privilégios limitados façam alterações que comprometam a estabilidade do sistema.

Também impede que um usuário comum consiga desabilitar mecanismos de segurança, como por exemplo o ``Windows Defender``. 

Existem dados no sistema que nem mesmo um ``administrador`` consegue acessar diretamente, como é o caso do processo `lsass.exe` que para conseguir ler a memória desse processo, seria necessário ter **permissões em nível de sistema**, acima do nível de ``administrador``.

O `lsass.exe` (Local Security Authority Subsystem Service) é o processo responsável por **armazenar e gerenciar informações sensíveis**, como:

- **Senhas e hashes de usuários**
    
- **Tokens de autenticação**

Esses dados ficam na memória desse processo, e é por isso que o ``Windows`` protege fortemente o `lsass.exe`, então se alguém conseguisse acessar essa memória, poderia conseguir fazer mais estragos dentro do sistema.

Para evitar isso, o Windows tem **processos protegidos** e o **Credential Guard**, que impedem o acesso, mesmo para usuários com privilégios de ``administrador``, isso garante que essas informações fiquem seguras.

Outro exemplo de segurança do Windows é a proteção contra ``drivers não assinados``. 

No Windows, ``os drivers atuam em nível de sistema``, como você viu na imagem. Isso significa que eles têm **acesso direto ao kernel** e, consequentemente, ao ``hardware`` e a áreas críticas da memória.

Como a Microsoft não é burra, ela implementou um mecanismo muito eficaz para impedir que **qualquer driver malicioso ou alterado** seja carregado no sistema: 
**A exigência de uma ``assinatura digital``**.

![[14.png]]

Para que um driver possa ser carregado no Windows (especialmente nas versões de 64 bits), ele precisa estar **assinado digitalmente por uma autoridade confiável**, reconhecida pela Microsoft.

Se o driver não tiver uma assinatura válida, o Windows simplesmente **recusa carregá-lo**.
## API (Application Programming Interface)

Como eu falei lá em cima, tudo que acontece a nível de usuário precisa ser repassado para o ``kernel``, porque, no fim das contas, **quem realmente executa as ações dentro do sistema operacional é o ``kernel``**.

Então, por exemplo, você já se perguntou o que acontece por baixo dos panos quando tentamos salvar um texto no `notepad.exe`?
 
![[15.png]]
Como você pode observar na imagem acima, quando o `notepad.exe` tenta salvar um arquivo, ele precisa utilizar uma **API** do sistema chamada `CreateFile`.  

Essa API faz parte do conjunto de funções disponíveis para aplicações em modo de usuário, mas ela **não executa diretamente a operação de escrita no disco**. 

Em vez disso, ela segue uma cadeia de camadas que repassam essa solicitação até o ``kernel``:

1. A chamada começa na `Kernel32.dll`, que é uma das bibliotecas principais usadas por programas em modo de usuário, ela é uma **Subsystem DLL** como pode ser observado na imagem que mostrei anteriormente, ela acaba atuando como uma **ponte entre aplicações de usuário e a `ntdll.dll`**.
    
2. Da `Kernel32.dll`, a chamada é repassada para a `KernelBase.dll`, que fornece uma interface mais moderna e modularizada para o sistema.
    
3. Em seguida, chega na `Ntdll.dll`, que é conhecida como o **"gate" (portão)** para o modo ``kernel``. Essa DLL é especial porque é a **última camada executada no espaço de usuário antes de entrar no “núcleo” do sistema**.

A `Ntdll.dll` possui funções chamadas **"NT Native API"**, que fazem a transição para o kernel por meio de instruções especiais, como `syscall`, abaixo está uma imagem para melhor entendimento:

![[16.PNG]]

Essa transição é onde o *Ring3* acaba e o Ring0 (nível de kernel) assume o controle. 

A partir daí, o kernel processa a solicitação e interage com o sistema de arquivos, para realmente gravar o arquivo no disco.

Ou seja, mesmo que pareça simples clicar em "Salvar Arquivo", existe toda uma cadeia estruturada e controlada de chamadas que garantem que a operação ocorra.

Por enquanto, é isso que irei abordar sobre os fundamentos do Windows. Tudo o que foi explicado até aqui, na minha opinião, representa a base essencial para começar a entender a arquitetura do sistema operacional Windows.