# Deploy Checklist — VicentBOX Site

## Pré-Deploy (Local)

- [ ] `npm run build` → exit code 0
- [ ] `dist/` gerado com as páginas do site + assets
- [ ] `npm run preview` → todas as rotas HTTP 200
- [ ] TypeScript strict: `npx astro check` → 0 erros
- [ ] CTAs de WhatsApp testados (todas as páginas):
  - [ ] Treinamento → WhatsApp abre com mensagem pré-preenchida
  - [ ] Corrida → WhatsApp abre com mensagem pré-preenchida
  - [ ] Consultoria → WhatsApp abre com mensagem pré-preenchida
  - [ ] Contato → WhatsApp abre com mensagem pré-preenchida
- [ ] WhatsApp Float (mobile) abre conversa correta
- [ ] Header/WhatsApp links abrem `wa.me/5544999218147`
- [ ] Tracking console logs aparecem em dev (`[Tracking] event params`)
- [ ] JSON-LD válido (Google Rich Results Test)
- [ ] Sitemap.xml gerado em `dist/sitemap-index.xml`
- [ ] Robots.txt permite tudo
- [ ] Lighthouse CI: Performance ≥90, A11y ≥95, Best Practices ≥90, SEO ≥90

---

## Assets Necessários (Antes do Deploy)

- [ ] `public/og-default.jpg` (1200x630) — Open Graph default
- [ ] `public/favicon.svg` — Favicon
- [ ] `public/app-mockup.jpg` — Hero Consultoria Online
- [ ] 12 fotos do studio → `/studio` (substituir placeholders)
- [ ] Foto do Fernando → `/sobre`
- [ ] 6-8 avatars de depoimentos + conteúdo real
- [ ] Logotipo Vetor (SVG) para header/footer

---

## Configuração de Produção

### Variáveis de Ambiente (`.env`)

| Variável | Obrigatória | Exemplo | Onde configurar |
|---|---|---|---|
| `GA4_MEASUREMENT_ID` | Sim | `G-XXXXXXXXXX` | GA4 > Admin > Data Streams |
| `GTM_CONTAINER_ID` | Sim | `GTM-XXXXXXX` | GTM > Container ID |
| `META_PIXEL_ID` | Sim | `1234567890` | Meta Events Manager |
| `GOOGLE_ADS_CONVERSION_ID` | Sim | `987654321` | Google Ads > Conversions |
| `GOOGLE_ADS_CONVERSION_LABEL` | Sim | `abcDEF123` | Google Ads > Conversion Action |

### Google Business Profile (GBP)

- [ ] Criar/reivindicar perfil: "VicentBOX"
- [ ] Endereço: Rua Néo Alves Martins, 2447 - Centro, Maringá - PR
- [ ] Telefone: (44) 99921-8147
- [ ] Site: https://vicentbox.com.br
- [ ] Categoria: "Personal trainer" / "Academia"
- [ ] Horários: Seg-Sex 6h-21h, Sáb 7h-12h
- [ ] Adicionar fotos do studio
- [ ] Configurar posts semanais (3x/semana)

### Google Search Console

- [ ] Adicionar propriedade: `https://vicentbox.com.br`
- [ ] Verificar via DNS (TXT) ou HTML tag
- [ ] Enviar sitemap: `https://vicentbox.com.br/sitemap-index.xml`
- [ ] Verificar cobertura de indexação semanal

### Google Ads

- [ ] Configurar conversões: `generate_lead` (form_submit)
- [ ] Importar de GA4 ou configurar via GTM
- [ ] Testar com Tag Assistant / Preview Mode
- [ ] Configurar campanhas: Search (marca + genéricas), Performance Max

### Meta (Facebook/Instagram)

- [ ] Pixel instalado via GTM
- [ ] Eventos: `Lead`, `Contact`, `ViewContent`, `PageView`
- [ ] Configurar API de Conversões (CAPI) via GTM server-side (opcional)
- [ ] Criar públicos: visitantes 180d, leads 90d, engajados

---

## Deploy por Provedor

### Hostinger

- [ ] Acessar painel > File Manager
- [ ] Limpar `public_html/` (backup se houver site antigo)
- [ ] Upload conteúdo de `dist/` para `public_html/`
- [ ] Verificar SSL ativo (Let's Encrypt)
- [ ] Testar: https://vicentbox.com.br
- [ ] Configurar redirecionamento www → non-www (ou vice-versa)

### Cloudflare Pages

- [ ] Conectar repositório GitHub
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables: adicionar todas do `.env`
- [ ] Custom domain: `vicentbox.com.br`
- [ ] DNS: apontar para Cloudflare (nameservers)
- [ ] SSL/TLS: Full (Strict)
- [ ] Cache Rules: Cache Everything para assets estáticos

### GitHub Pages (deploy atual)

- [ ] Workflow `.github/workflows/deploy.yml` builda `vicentbox-site/`
- [ ] Habilitar Pages no repo: Settings → Pages → Source: "GitHub Actions"
- [ ] Descomentar o job `deploy` no workflow
- [ ] Apontar DNS do `vicentbox.com.br` para o GitHub Pages (quando for publicar)
- [ ] Site migrado para GitHub — projeto Netlify encerrado

---

## Pós-Deploy (Validação em Produção)

- [ ] Home carrega < 2s (3G)
- [ ] LPs carregam < 2.5s
- [ ] Todos os CTAs abrem o WhatsApp com mensagem pré-preenchida
- [ ] GA4 DebugView: eventos `page_view`, `generate_lead`, `contact`
- [ ] GTM Preview: tags disparando
- [ ] Meta Pixel Helper: eventos OK
- [ ] Google Ads Tag Assistant: conversões OK
- [ ] Rich Results Test: todas as páginas válidas
- [ ] Search Console: sitemap processado, 0 erros
- [ ] GBP: verificado, posts ativos
- [ ] Velocidade: PageSpeed Insights ≥ 90 mobile/desktop
- [ ] Acessibilidade: axe-core 0 violações críticas
- [ ] Mobile: sem overflow horizontal, CTAs sticky funcionam

---

## Monitoramento Contínuo

| Frequência | Ação |
|---|---|
| Diária | Verificar leads no WhatsApp |
| Semanal | GA4: tráfego, conversões, origem |
| Semanal | GSC: impressões, cliques, posição média |
| Semanal | GBP: reviews, posts, fotos |
| Mensal | Lighthouse CI regression check |
| Mensal | Atualizar depoimentos/fotos |
| Trimestral | Revisar copy/preços/serviços |

---

## Rollback Plan

Se algo der errado no deploy:

1. **Hostinger:** Restaurar backup anterior do `public_html/` via File Manager > Backups
2. **Cloudflare Pages:** Deploy anterior → "Rollback to this deployment"
3. **GitHub Pages:** reverter o commit em `main` (o workflow republica) ou "Re-run" do último deploy OK

---

## Contatos de Emergência

- **Dev:** Vitorio — [contato]
- **Hospedagem:** Hostinger Support / Cloudflare Support
- **Domínio:** Registro.br / Cloudflare Registrar
- **E-mail:** vicentbox71@gmail.com

---

**Última atualização:** $(date +%Y-%m-%d)
**Versão:** 1.0.0