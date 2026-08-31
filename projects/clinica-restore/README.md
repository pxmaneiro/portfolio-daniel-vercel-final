# Clínica Restore

Landing page independente em HTML, CSS e JavaScript puros.

## Abrir localmente

Na raiz do repositório:

```powershell
& 'C:\Users\Daniel\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' -m http.server 8000
```

Abra `http://localhost:8000/projects/clinica-restore/`.

## Configuração

Edite `js/config.js` para alterar WhatsApp, Instagram, e-mail, telefone, horários, endereço, mapa, profissionais, serviços, galeria e avaliações. As imagens temporárias ficam em `assets/`; substitua os arquivos mantendo os mesmos nomes ou atualize os caminhos na configuração.

O formulário não usa backend: ele monta a mensagem e abre o WhatsApp. Antes do deploy, confirme os dados editáveis e substitua os placeholders de equipe, localização e avaliações por informações autorizadas.
