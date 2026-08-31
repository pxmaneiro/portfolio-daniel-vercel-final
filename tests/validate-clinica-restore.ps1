$root = Join-Path $PSScriptRoot '..' | Resolve-Path
$base = Join-Path $root 'projects/clinica-restore'
$required = @('index.html','README.md','favicon.svg','css/style.css','js/config.js','js/script.js')
foreach ($file in $required) { if (-not (Test-Path (Join-Path $base $file))) { throw "Arquivo ausente: $file" } }
$config = Get-Content (Join-Path $base 'js/config.js') -Raw
$html = Get-Content (Join-Path $base 'index.html') -Raw
if ($config -notmatch '5511995293817' -or $html -notmatch 'instagram.com/clinica_restore') { throw 'Dados de contato incompletos' }
foreach ($name in @('Fisioterapia','Pilates','Acupuntura','RPG','Massagem','Drenagem Linfática')) { if ($config -notmatch [regex]::Escape($name)) { throw "Serviço ausente: $name" } }
if ($html -notmatch '<h1') { throw 'SEO/conteúdo inválido' }
Get-ChildItem (Join-Path $base 'assets') -Filter *.jpg | ForEach-Object { if ($_.Length -lt 1000) { throw "Imagem inválida: $($_.Name)" } }
Write-Output 'Clínica Restore: validação estrutural OK.'
