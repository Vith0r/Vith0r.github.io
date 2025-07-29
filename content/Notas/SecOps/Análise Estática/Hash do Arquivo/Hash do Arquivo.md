---
Tema Principal: Análise de Malware
tags:
  - Análise-Estática
  - Malware
  - Cybersegurança
  - Hash
related:
  - Análise-Dinâmica
  - MALDEV
author: Vithor
---
## Encontrando o hash do arquivo
Ao *pesquisar* o valor hash de um arquivo em bancos de dados de assinatura bem conhecidos, é possível ==determinar se o malware foi analisado anteriormente e obter os resultados de análise correspondentes.== No entanto, é essencial notar que, se um malware recém-criado não tiver uma análise preliminar, nenhum relatório de análise pode ser acessado usando seu valor de hash.

## **Obtendo o hash do arquivo através de Powershell**

No Windows, os hashes de arquivo podem ser facilmente calculados usando o Powershell. Por exemplo, vamos calcular o hash do malware usando Powershell:

```powershell
Get-FileHash .\arquivo.exe | Format-List
```

<div align=center>
  <img alt="msg" src="Powershell.PNG">
</div>

O comando pode funcionar com apenas um único parâmetro, que é o nome do arquivo. Por padrão, o cálculo é executado usando a função hash SHA256. Se for necessária uma função hash diferente, o parâmetro **"-Algorithm"** deve ser adicionado. Como uma instância disso, vamos calcular o hash do mesmo arquivo de malware usando a função hash MD5.

```powershell
Get-FileHash .\arquivo.exe  -Algorithm MD5 | Format-List
```

<div align=center>
  <img alt="msg" src="Powershell2.PNG">
</div>

Como na imagem acima, o cálculo de hash para a função hash MD5 foi realizado com sucesso.
## **Informações Reunindo com arquivo Hash**

A seguinte lista de recursos pode ser usada para coletar informações sobre o malware usando o File Hash:

- **VirusTotal** : [https://www.virustotal.com/gui/home/search](https://www.virustotal.com/gui/home/search)
- **AnyRun** : [https://app.any.run/submissions/](https://app.any.run/submissions/)
- **Análise Híbrida** : [https://www.hybrid-analysis.com/](https://www.hybrid-analysis.com/)
- **MetaDefender** : [https://metadefender.opswat.com/](https://metadefender.opswat.com/)
- **FileScan.IO** : [https://www.filescan.io/scan](https://www.filescan.io/scan)
- **Manalyzer** : [https://manalyzer.org/](https://manalyzer.org/)
- **SandboxPikkerEE** : [https://sandbox.pikker.ee/](https://sandbox.pikker.ee/)

### **Virus Total**
O VirusTotal é uma das fontes proeminentes para pesquisar hashes de malware e acessar relatórios de análise disponíveis. A imagem da página é a seguinte:

<div align=center>
  <img alt="msg" src="VirusTotal.PNG">
</div>

O relatório de análise atual pode ser acessado pesquisando o hash na seção de pesquisa vista na imagem acima. Por exemplo, o relatório de análise de um malware é o seguinte:

<div align=center>
  <img alt="msg" src="VirusTotal2.PNG">
</div>