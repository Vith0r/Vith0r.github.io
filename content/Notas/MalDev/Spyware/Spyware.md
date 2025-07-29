---
Tema Principal: Spyware
tags:
  - Malware
related:
  - Cybersecurity
author: Vithor
---
# Espionagem Digital

**Spyware**, ou *trojan* como alguns costumam chamar, é na minha opinião o melhor tipo de **malware** a ser utilizado. O fato de manter uma conexão constante com a vítima, sem que ela sequer imagine que está sendo observada, permite um nível de controle e vigilância extremamente eficaz. É como se estivéssemos presentes, acompanhando cada ação em tempo real, sem sermos notados.
## O que é e como funciona

Na prática, o conceito é simples. Podemos usar como exemplo uma *reverse shell*, que, para quem não sabe, é uma conexão remota iniciada pela máquina da vítima. Ela "chama" o atacante, estabelecendo um canal de comunicação que possibilita o controle da máquina remotamente. Isso já fornece uma boa ideia do funcionamento básico de um **spyware**.

Entretanto, na realidade, mais de 60% de todos os ataques de **spyware** que acontecem no dia a dia são realizados com payloads gerados por ferramentas conhecidas como **RATs** (*Remote Access Trojans*). Essas ferramentas funcionam como "kits de espionagem" e permitem monitorar e controlar a vítima de forma completa. Um exemplo bastante conhecido e acessível é o **AsyncRAT**, um projeto de código aberto que pode ser facilmente encontrado no GitHub: [AsyncRAT](https://github.com/NYAN-x-CAT/AsyncRAT-C-Sharp).

![](https://camo.githubusercontent.com/2a010ac3ffdda9c94e456a50ba24aac5d2bcf4610886660b6b9af6eb419407db/68747470733a2f2f692e696d6775722e636f6d2f4b626f6d45636f2e706e67)

Essas ferramentas geralmente são de fácil acesso e uso. Existem centenas de **RATs** espalhados pela internet, muitas vezes desenvolvidos a partir do código de outros. O funcionamento é bem simples, e podemos descrever os passos básicos da seguinte forma:
## Etapas do Ataque com RATs

1. **Preparação do Servidor**  
   O atacante precisa de um endereço de IP ou domínio público para onde a vítima enviará a conexão. Ferramentas como **Ngrok** são frequentemente utilizadas para isso, pois permitem expor localmente um serviço na internet, mesmo por trás de NATs ou firewalls.  
   ![](https://miro.medium.com/v2/resize:fit:1400/0*ADBMfAVYNUBpasTs.png)

2. **Configuração do Payload**  
   O atacante utiliza o painel do **RAT** para gerar um executável que, quando executado pela vítima, inicia a conexão com o servidor configurado. Nessa etapa, é possível configurar opções como *persistência*, *ofuscação do código* e exclusão automática de logs.

3. **Envio e Engenharia Social**  
   O *payload* precisa ser entregue à vítima. Isso é geralmente feito por meio de *engenharia social*.

4. **Execução e Conexão**  
   Após a execução do arquivo, a vítima estabelece a conexão com o painel de controle do atacante. A partir daí, o invasor tem acesso total ao sistema, podendo capturar telas, registrar teclas, acessar microfone e câmera, além de navegar pelos arquivos.

5. **Persistência e Ocultação**  
   O **RAT** pode configurar-se para iniciar junto com o sistema, garantir sua presença em caso de reinicialização e, em versões mais avançadas, até desabilitar o antivírus ou enganar soluções de segurança com técnicas de evasão.
## Considerações Finais

A disseminação de ferramentas como **AsyncRAT**, **Quasar** e outras de código aberto, mostra o quão acessível se tornou esse tipo de “ataque”, mesmo para usuários com pouco conhecimento técnico.

Acredite eu já vi uma criança com menos de 15 anos no Discord, que tinha +500 vítimas no **Troianos RAT**!😂