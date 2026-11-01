# confirma-presenca

Site de confirmação de presença para os 60 anos de Socorro.

Arquivos:
- `index.html`, `style.css`, `script.js` — o site
- `config.js` — onde vai a URL que salva as respostas
- `google-apps-script.js` — código para colar na planilha do Google
- `img/convite.jpg` — o convite

## 1. Salvar as respostas numa planilha do Google (recomendado, grátis)

1. Crie uma planilha nova em https://sheets.new
2. Menu **Extensões → Apps Script**.
3. Apague o que estiver lá e cole o conteúdo de `google-apps-script.js`. Salve.
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso quando pedir (em "Avançado → Acessar projeto").
6. Copie a URL que termina em `/exec` e cole em `config.js`:
   ```js
   window.RSVP_URL = "https://script.google.com/macros/s/XXXX/exec";
   ```

Cada confirmação vira uma linha na planilha: data, nome, se vai, nº de pessoas e recado.

> Se mudar o código do Apps Script depois, faça **Implantar → Gerenciar implantações → editar → Nova versão**, senão a mudança não vale.

## 2. Publicar no GitHub Pages

```bash
git add .
git commit -m "Site de confirmação"
git push
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Testar no computador

Abra o `index.html` no navegador. Com `RSVP_URL` vazia, o envio é só simulado.
