$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$portfolio = Get-Content -Raw (Join-Path $root 'index.html')
$sabor = Get-Content -Raw (Join-Path $root 'projects/sabor-em-familia/index.html')
$saborBundle = Get-Content -Raw (Join-Path $root 'projects/sabor-em-familia/assets/index-DCKFwOLb.js')
$saborStyles = Get-Content -Raw (Join-Path $root 'projects/sabor-em-familia/assets/index-UAV1JKvO.css')

$failures = [System.Collections.Generic.List[string]]::new()

function Assert-PortfolioCondition {
    param(
        [bool]$Condition,
        [string]$Message
    )

    if (-not $Condition) {
        $script:failures.Add($Message)
    }
}

$saborPreview = 'projects/sabor-em-familia/portfolio-preview.png'
$florPreview = 'projects/flor-e-ambar/portfolio-preview.png'

Assert-PortfolioCondition ($portfolio.Contains("src=`"$saborPreview`"")) 'A capa do Sabor em Familia deve usar a imagem 1 em PNG.'
Assert-PortfolioCondition (Test-Path (Join-Path $root $saborPreview)) 'O arquivo da imagem 1 deve existir no projeto.'
Assert-PortfolioCondition ($portfolio.Contains("src=`"$florPreview`"")) 'A capa do Flor & Ambar deve usar a imagem 2 em PNG.'
Assert-PortfolioCondition (Test-Path (Join-Path $root $florPreview)) 'O arquivo da imagem 2 deve existir no projeto.'

Assert-PortfolioCondition (-not ($sabor -match '(?:src|href)="/(?:assets|images)/')) 'Os assets do Sabor em Familia devem ser relativos ao subdiretorio.'
Assert-PortfolioCondition (-not $saborBundle.Contains('"/images/')) 'As imagens do bundle do Sabor em Familia devem ser relativas ao subdiretorio.'
Assert-PortfolioCondition ($saborBundle.Contains('Zl=/^images\/')) 'O validador de imagens do Sabor em Familia deve aceitar os caminhos relativos do bundle.'
Assert-PortfolioCondition (-not $saborStyles.Contains('url(/assets/')) 'As fontes do Sabor em Familia devem ser relativas ao diretorio do CSS.'

Assert-PortfolioCondition ($portfolio.Contains('href="https://lanchoneteaugusts.ola.click/"')) "O card do August's deve abrir diretamente o site oficial."

Assert-PortfolioCondition ($portfolio.Contains('Landing pages que transformam ideias em oportunidades.')) 'O hero deve comunicar a proposta de valor aprovada.'
Assert-PortfolioCondition ($portfolio.Contains('class="cta-button cta-button--primary" href="https://wa.link/95i54k"')) 'O hero deve oferecer o WhatsApp como CTA principal.'
Assert-PortfolioCondition ($portfolio.Contains('class="cta-button cta-button--secondary" href="#projects"')) 'O hero deve oferecer projetos como CTA secundario.'
Assert-PortfolioCondition ($portfolio.Contains('Tem uma ideia ou negócio que precisa ganhar forma na internet?')) 'A secao de contato deve abrir com a pergunta aprovada.'
Assert-PortfolioCondition ($portfolio.Contains('Conversar pelo WhatsApp')) 'A secao de contato deve ter um CTA explicito para WhatsApp.'
Assert-PortfolioCondition ($portfolio.Contains('Enviar um e-mail')) 'A secao de contato deve ter um CTA explicito para email.'
Assert-PortfolioCondition ($portfolio.Contains('Resposta direta, sem formulário e sem compromisso.')) 'A secao de contato deve reduzir a friccao com o microtexto aprovado.'
Assert-PortfolioCondition (-not ($portfolio -match '<[a-z][^>]*\sclass="[^"]+"[^>]*\sclass=')) 'O portfolio principal nao deve conter atributos class duplicados.'

Get-ChildItem (Join-Path $root 'projects') -Recurse -Filter '*.html' | ForEach-Object {
    $html = Get-Content -Raw $_.FullName
    Assert-PortfolioCondition (-not ($html -match '<[a-z][^>]*\sclass="[^"]+"[^>]*\sclass=')) "O arquivo $($_.FullName) nao deve conter atributos class duplicados."
}

if ($failures.Count -gt 0) {
    $failures | ForEach-Object { Write-Error $_ }
    exit 1
}

Write-Host 'Portfolio validado com sucesso.'
