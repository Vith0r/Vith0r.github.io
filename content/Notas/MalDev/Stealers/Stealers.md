---
Tema Principal: Malware
tags:
  - Malware
related:
  - Cybersecurity
author: Vithor
---
# Roubo Silencioso

**Stealers** são *malwares* especializados em extrair informações confidenciais da vítima de forma rápida e quase invisível.  
Diferente de **ransomwares**, que exigem pagamento, ou *spywares*, que monitoram, o **stealer** foca em ser rápido e coletar **credenciais**, *cookies* e outros dados valiosos, enviando tudo para o atacante e encerrando suas atividades em seguida.
## O que é um Stealer?

**Stealer** é um tipo de *malware* projetado para:

- Extrair **senhas** salvas em navegadores  
- Capturar **cookies** e sessões ativas  
- Obter *carteiras de criptomoedas* armazenadas localmente  
- Roubar informações de **cartões de crédito**  
- Coletar dados de preenchimento automático (**autofill**)  
- Acessar *arquivos específicos* do usuário  

A maioria dos **stealers** não mantém *persistência* nem comunicação prolongada. Eles são executados, coletam os dados desejados e, em seguida, enviam tudo para **painéis de controle remotos**, muitas vezes se autodestroem e desaparecem, dificultando a **análise forense**.

> Para entender melhor o impacto real desses ataques, recomendo a leitura do artigo:  
> [Stealer Logs — Uma análise aprofundada de mais de meio bilhão de credenciais roubadas](https://hakaisecurity.io/stealer-logs-uma-analise-aprofundada-de-mais-de-meio-bilhao-de-credenciais-roubadas/research-blog/)
## Funcionamento Básico

O ciclo de ataque de um **stealer** pode ser dividido em quatro etapas:

1. **Execução Inicial**  
   A vítima executa o programa infectado, enviado por exemplo via *e-mail de phishing*, **download falso** ou *anexo malicioso*.

2. **Coleta de Dados**  
   O **stealer** pesquisa caminhos padrão de navegadores como **Chrome**, *Firefox*, **Edge** e *Opera* para extrair arquivos **SQLite** que contêm **credenciais**, *cookies* e dados de **autofill**.

3. **Compactação e Envio**  
   Os dados coletados são agrupados em arquivos **ZIP** ou enviados em **JSON compactado** via **HTTP/HTTPS**, *FTP* ou **Webhooks** em plataformas como **Discord** e *Telegram*.
## 2FA Inútil?
### Exploração de Cookies para Bypass de 2FA
- **Stealers** mais atuais incluem módulos que extraem **cookies de sessão** de navegadores. Com esses **cookies**, o atacante pode recuperar acessos a contas e serviços protegidos por **autenticação de dois fatores**.
### HVNC para Contornar 2FA  
Fugindo um pouco agora do tópico de **stealers**, podemos citar o `HVNC` como mais um tipo “método” que poderia ser utilizado para realizar login em alguma coisa mesmo com **2FA**:

- **HVNC (Hidden VNC)** permite que o atacante controle o computador da vítima de forma completamente oculta, como se fosse a vítima usando o navegador e acessando suas próprias contas.  
- O atacante não vai ver a tela de **2FA**, pois todo o processo acontece no ambiente real da vítima. O popup de **2FA** aparece apenas ao tentar realizar login, mas tudo já vai estar logado.  
- Quando o usuário digita o código de **2FA** no próprio navegador, o atacante, que já está conectado ao sistema, se beneficia da sessão autenticada sem precisar interceptar **SMS** ou *app de autenticação*.  
- Assim, mesmo com **2FA** ativo, o invasor obtém acesso completo porque a verificação ocorre dentro da sessão “real” da vítima, sem expor o código ao atacante “diretamente”.
## Exemplos de Stealers
### RedLine Stealer  
- Ferramenta amplamente conhecida, vendida como “**Stealer-as-a-Service**”.  
- Extrai **credenciais** de navegadores, **carteiras de criptomoedas**, *mensageiros* e **clientes FTP**.  
- Módulo avançado de extração de **cookies** que permite reconstruir sessões web e contornar **2FA** em diversas plataformas.
### LummaC2  
- **Stealer** moderno com painel completo de controle e atualizações constantes.  
- Foca em técnicas de **evasão de antivírus**.  
- Integração nativa com canais do **Telegram** para envio de logs em tempo real.
## Recomendação de “Proteção”
Use navegadores realmente pouco utilizados, como **Library Wolf**, ou outras alternativas menos conhecidas. Isso faz com que a maioria dos módulos de extração de **stealers** simplesmente não consiga localizar nem descriptografar dados.

**Stealers** costumam ser desenvolvidos e testados em navegadores populares (**Chrome**, **Firefox**, **Edge**), que seguem padrões consolidados de armazenamento de **credenciais** e **cookies**.

Navegadores raramente utilizados tendem a armazenar dados em formatos ou locais atípicos, tornando o código genérico de um **stealer** incapaz de identificar caminhos padrão, estruturas **SQLite** ou chaves de **criptografia**.