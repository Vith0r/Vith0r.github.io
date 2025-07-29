---
Tema Principal: Análise de Malware
tags:
  - Análise-Dinâmica
  - Análise-Memória
  - Malware
  - Cybersegurança
related:
  - Análise-Estática
  - MALDEV
author: Vithor
---

# Análise Forense de Memória:
A memória é o último refúgio dos malwares modernos. Enquanto as técnicas de evasão e ataques fileless continuam evoluindo, mais e mais malwares estão executando exclusivamente na memória, nunca tocando o disco ou deixando apenas rastros mínimos. Neste artigo, vou compartilhar técnicas avançadas de análise de memória para detectar, extrair e entender malwares, mesmo aqueles projetados para serem invisíveis.
## Por Que a Análise de Memória é Essencial?
Quando comecei a analisar malware, a maioria dos analistas se concentrava quase exclusivamente em artefatos de disco. Mas o mundo mudou drasticamente. Hoje, por várias razões, a análise de memória se tornou indispensável:

1. **Malware Fileless**: Malwares que operam exclusivamente em memória, como certas variantes de Powershell Empire, Cobalt Strike e Metasploit, não deixam artefatos significativos no disco.

2. **Criptografia em Repouso**: Muitos malwares permanecem criptografados no disco, descriptografando-se apenas na memória durante a execução.

3. **Injeção de Processo**: Técnicas como Process Hollowing, DLL Injection e Reflective DLL Injection permitem que malwares se escondam dentro de processos legítimos.

## Ferramentas Avançadas para Análise de Memória
Existem diversas ferramentas que podem nos auxiliar na análise de memória para detecção de malware. Vamos explorar duas ferramentas particularmente poderosas: ``PE-sieve`` e ``Moneta``.
### PE-sieve
[PE-sieve](https://github.com/hasherezade/pe-sieve) é uma ferramenta desenvolvida pela renomada pesquisadora de segurança [hasherezade](https://github.com/hasherezade). Esta ferramenta é especializada em escanear processos em execução em busca de módulos que foram modificados ou injetados.
#### Principais recursos do PE-sieve:
- **Detecção de injeção de código**: Identifica executáveis injetados e shellcode em processos legítimos
- **Verificação de hooks**: Detecta hooks em IAT (Import Address Table), hooks inline e outras modificações de código
- **Dumping de memória**: Extrai módulos PE (Portable Executable) suspeitos ou modificados da memória
- **Verificação de implantes**: Detecta implantes maliciosos escondidos em processos
- **Escaneamento em tempo real**: Analisa processos em execução sem interrompê-los
### Moneta
[Moneta](https://github.com/forrest-orr/moneta), desenvolvida por [Forrest Orr](https://github.com/forrest-orr), é uma ferramenta poderosa que se concentra em detectar anomalias de memória. Diferentemente de outras ferramentas, Moneta foi projetada especificamente para detectar técnicas avançadas de evasão de malware em memória.
#### Principais recursos do Moneta:
- **Análise abrangente de memória privada**: Examina regiões de memória privada em busca de padrões suspeitos
- **Detecção de técnicas de mascaramento de memória**: Identifica técnicas sofisticadas de ocultação que enganam outras ferramentas
- **Classificação de anomalias**: Categoriza diferentes tipos de artefatos maliciosos de memória
- **Análise de permissões de memória**: Detecta combinações incomuns de permissões que podem indicar atividade maliciosa
## Leitura Recomendada
Para uma compreensão mais profunda sobre técnicas avançadas de evasão em memória e como detectá-las, recomendo fortemente a leitura do artigo [Masking Malicious Memory Artifacts - Part II: Insights from Moneta](https://www.forrest-orr.net/post/masking-malicious-memory-artifacts-part-ii-insights-from-moneta) de Forrest Orr. 