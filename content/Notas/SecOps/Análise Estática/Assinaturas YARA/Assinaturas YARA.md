---
Tema Principal: Análise de Malware
tags:
  - Análise-Estática
  - Malware
  - Cybersegurança
  - YARA
  - Detecção
related:
  - Análise-Dinâmica
  - MALDEV
  - Packing-Unpacking
author: Vithor
---
## O que são Regras YARA?

YARA é uma ferramenta poderosa criada para ajudar pesquisadores de malware a identificar e classificar amostras de malware. Funcionando como um "grep para binários", YARA permite criar descrições baseadas em padrões textuais ou binários que identificam determinados malwares ou famílias de malware.
## Por Que YARA é Importante?

YARA tornou-se uma ferramenta essencial no arsenal de qualquer analista de malware por vários motivos:

1. **Flexibilidade**: Pode identificar qualquer tipo de padrão em arquivos, seja texto, código, ou dados binários.
2. **Especificidade**: Permite criar regras tão específicas ou genéricas quanto necessário.
3. **Integração**: É suportada por quase todas as principais ferramentas de segurança.
4. **Compartilhamento**: Fornece um formato padrão para compartilhar inteligência sobre ameaças.
5. **Eficiência**: Permite varreduras rápidas em grandes conjuntos de dados.

## Anatomia de uma Regra YARA

Uma regra YARA básica consiste em:

```yara
rule ExampleMalware {
    meta:
        description = "Detects a exemplo de malware fictício"
        author = "Vithor"
        date = "2024-06-30"
        hash = "e1da2544fc39d597ef8eb726a89b379857d35654"
    
    strings:
        $string1 = "infectar_sistema" ascii
        $string2 = "roubar_credenciais" wide
        $hex1 = { 4D 5A 90 00 03 00 00 00 }  // Assinatura hexadecimal
        $regex1 = /senha[0-9]{4}\.txt/ ascii
    
    condition:
        uint16(0) == 0x5A4D and  // Verifica se é um executável PE (MZ header)
        filesize < 1MB and       // Verifica se o arquivo é menor que 1MB
        (
            2 of ($string*) or   // Pelo menos 2 das strings definidas
            $hex1 or             // Ou a assinatura hexadecimal
            $regex1              // Ou o padrão de regex
        )
}
```

### Elementos Principais:
1. **Nome da Regra**: Identificador único para a regra
2. **Meta**: Informações descritivas (opcional mas recomendado)
3. **Strings**: Definições de padrões a serem procurados
4. **Condição**: Expressão lógica que determina quando a regra aciona um alerta
## Tipos de Strings em YARA
YARA suporta vários tipos de padrões de string:
### 1. Strings de Texto
```yara
$plain = "comando_malicioso" ascii    // ASCII string
$wide = "dados_sensiveis" wide        // Unicode string
$both = "c2.malware.com" nocase       // Case-insensitive
```
### 2. Strings Hexadecimais
```yara
$mz_header = { 4D 5A }                // Cabeçalho MZ exato
$sequence = { 33 C0 8B ?? 4? }        // Com curingas (?)
$jumps = { 83 F? 1? [4-6] 48 }        // Com saltos [n-m]
```
### 3. Expressões Regulares
```yara
$re1 = /[a-z0-9]{32}\.exe/i           // Regex com flag case-insensitive
$re2 = /IP\s*:\s*192\.168\.\d{1,3}\.\d{1,3}/
```
### 4. Seções PE

```yara
condition:
    pe.number_of_sections == 6 and    // Número de seções
    pe.imports("kernel32.dll", "CreateRemoteThread") and  // Importações específicas
    pe.sections[2].entropy > 7        // Entropia de uma seção específica
```
## Melhores Práticas para Regras YARA

1. **Documentação Clara**: Use o campo `meta` para documentar o propósito da regra, IOCs relacionados e contexto.

2. **Balanceamento de Especificidade**: 
   - Muito específica: Detecta apenas variantes exatas
   - Muito genérica: Causa falsos positivos

3. **Versionamento**: Mantenha um histórico de versões de suas regras para rastrear mudanças.

4. **Modularidade**: Divida regras complexas em componentes reutilizáveis com regras privadas.

```yara
private rule Suspicious_APIs {
    strings:
        $api1 = "CreateRemoteThread" nocase
        $api2 = "WriteProcessMemory" nocase
        $api3 = "VirtualAllocEx" nocase
    
    condition:
        2 of them
}

rule Process_Injection {
    meta:
        description = "Detecta padrões comuns de injeção de processos"
        threat_level = "Medium"
    
    strings:
        $pattern1 = { 68 ?? ?? ?? ?? 53 FF 75 ?? FF 55 }
    
    condition:
        Suspicious_APIs and $pattern1
}
```

## Recursos para Regras YARA

Existem várias fontes de regras YARA públicas que podem ser usadas como referência ou base:

1. **GitHub**:
   - [YARA-Rules Project](https://github.com/Yara-Rules/rules)

2. **Fornecedores de Segurança**:
   - Regras publicadas por empresas como, Kaspersky, ESET

3. **MISP**: Plataforma de compartilhamento de inteligência de ameaças que frequentemente inclui regras YARA