# LP Decor Pedras (Avaré/SP)

Landing page da Decor Pedras, cliente QH4 Growth. Produto: Método Stones Low Ticket + Social Media Orbia 1.
Contrato de 30/09/2026 a 30/03/2027, renovação automática.

## Contexto do cliente

- Marmoraria familiar em Avaré/SP. Empresa aberta em 21/11/2000 com pedras decorativas; marmoraria montada em 2007.
- Contatos: Amilton Alves (filho, comercial) e Ângela (mãe, comercial e proprietária, respondeu o briefing).
- Instagram: @decorpedras.avare. Site antigo: decorpedrasavare.com.br.
- Objetivo: atrair alto padrão, sair da guerra de preço e preencher a capacidade ociosa.
- Destaques pedidos no briefing: acabamento, rebaixo italiano CNC e jato d'água (aquisição mais recente).
- Posicionamento marcado no briefing: moderno e inovador. Fundo: "o que vocês acharem melhor".

## Identidade visual aplicada

O briefing respondeu "Sim" para paleta, mas sem informar cores. A paleta foi tirada do logo enviado (fundo azul escuro + símbolo dourado).

| Token | Hex | Uso |
|---|---|---|
| Ardósia | `#1A2533` | fundo escuro principal (escuro claro, não preto) |
| Ardósia 2 | `#202D3E` | seção de orçamento |
| Azul Decor | `#22324F` | anos da linha do tempo, bloco da frase final |
| Ouro | `#D7BC8F` | símbolo, botões e detalhes |
| Pedra | `#ECEDEE` | fundo claro frio |
| Grafite | `#2B323C` | texto sobre fundo claro |

- Tipografia: Poppins (títulos) + Inter (corpo), padrão QH4, pois o briefing não pediu fonte. As fontes estão hospedadas na própria LP (`assets/fonts`), sem depender do Google Fonts.
- Logo: o símbolo "D" foi redesenhado em SVG a partir da imagem de 150px enviada (`assets/img/logo-mark.svg`), com o nome "Decor Pedras" em texto. **Se o cliente tiver o logo vetorizado oficial, substituir.**
- Elemento de assinatura: o recorte em degrau (forma de rebaixo) na foto do hero e nas fotos de tecnologia, e a linha dourada de "jato d'água" que atravessa as fotos das máquinas quando elas aparecem na tela.

## O que já está configurado

- WhatsApp principal dos anúncios: (14) 99844-9303 em todos os CTAs e no botão flutuante (canto direito).
- Segundo número (14) 99865-1111 aparece só no rodapé.
- Formulário sem Google Apps Script: monta a mensagem completa com todos os campos e abre o WhatsApp; a aba atual vai para `obrigado.html`. Se o navegador bloquear a nova aba, abre o WhatsApp na mesma aba.
- Botão de envio nasce desabilitado e só libera com todos os campos obrigatórios válidos (checkValidity a cada input/change). Máscara de telefone automática.
- GTM pronto com placeholder `GTM-XXXXXXX` (o script não carrega enquanto o ID não for trocado).

## Trocar antes de subir

1. **GTM**: substituir `GTM-XXXXXXX` em `index.html` (2 lugares) e `obrigado.html` (1 lugar).
2. **Domínio / canonical**: tudo aponta para `https://decorpedrasavare.com.br/`. Se a LP for para outro domínio ou subdomínio, trocar em `index.html` (canonical, og:url, og:image, twitter:image, JSON-LD), `robots.txt` e `sitemap.xml`.
3. **Apps Script (opcional)**: se for usar planilha, trocar o envio em `assets/js/main.js` pelo POST no webhook e manter o redirecionamento para `obrigado.html` + WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações." (a página de obrigado já tem esse botão).

## Pendências de briefing (confirmar com o cliente)

- **Endereço**: "Av. Professor Celso Ferreira da Silva, 990, CEP 18707-150" veio do bloco de dados para domínio/hospedagem (pessoa física). Confirmar se é o endereço comercial da marmoraria antes de publicar (está no rodapé e no JSON-LD).
- **Jato d'água**: no briefing a Ângela diz que estão "terminando de instalar". A LP trata como "nossa mais nova aquisição". Confirmar se já está operando antes de anunciar o serviço.
- **Fotos**: todas vieram de posts do Instagram e foram recortadas para tirar textos e logos. Não há foto da CNC de rebaixo nem do jato d'água; as fotos dessas seções mostram a produção e uma chapa. Pedir fotos das máquinas e de obras prontas para trocar.
- **Fotos de amostras** (seção Materiais, itens Quartzo e Lâminas sinterizadas) são de um mostruário de lâminas. Os textos não citam marca.
- Avaliações do GMN não foram enviadas ("Não sei"), por isso a LP não tem depoimentos.
- FAQ usa só fatos do briefing (prazo médio de 40 dias, materiais, horários, acompanhamento até a instalação). As explicações de rebaixo italiano e jato d'água são descrições gerais do serviço.

## Estrutura da pasta

```
index.html            LP
obrigado.html         página de obrigado (noindex)
404.html              página de erro personalizada
robots.txt
sitemap.xml
site.webmanifest
vercel.json           cache dos assets + headers de segurança
README.md
assets/
  css/style.css
  js/main.js
  fonts/              Poppins e Inter (woff2)
  img/                fotos .webp, logo-mark.svg, favicon.svg, ícones .png, og-decor-pedras.jpg
```

## Como publicar na Vercel

1. Descompactar o zip.
2. Na Vercel: Add New > Project > subir a pasta (ou `vercel --prod` dentro dela). Framework: Other, sem build command, output = raiz.
3. Em Settings > Domains, apontar o domínio. A Vercel usa o `404.html` automaticamente.

## Eventos de rastreamento (dataLayer)

| Evento | Quando | Parâmetros |
|---|---|---|
| `whatsapp_click` | clique em qualquer link de WhatsApp | `local`: topo, hero, orcamento, rodape, rodape-2, flutuante |
| `generate_lead` | envio do formulário | `form`, `ambiente`, `material`, `perfil` |
| `pagina_obrigado` | carregamento de `obrigado.html` | |

## Checklist de entrega

- [x] Headline com "Marmoraria" e "perto de você"
- [x] SEO: title e meta description com cidade e nicho, canonical, H1 único, alt nas imagens
- [x] JSON-LD HomeAndConstructionBusiness/LocalBusiness + FAQPage
- [x] Open Graph completo + Twitter Card (imagem 1200x630)
- [x] robots.txt, sitemap.xml, site.webmanifest, vercel.json
- [x] width/height em todas as imagens (CLS) e preload da imagem do hero e da fonte principal
- [x] Página de obrigado e 404 personalizada
- [x] Formulário com botão desabilitado até validar + mensagem completa no WhatsApp
- [x] Botão flutuante de WhatsApp no canto direito
- [x] Animações: abertura do hero com recorte, parallax leve, scroll reveal, linha de jato d'água nas fotos, troca de imagem nos materiais, microinterações em botões e FAQ
- [x] prefers-reduced-motion respeitado, foco visível no teclado
- [x] Responsivo testado em 390px e 1440px, sem rolagem horizontal e sem erros no console
- [x] Rodapé com "Desenvolvido pro QH4 Growth" linkando @qh4growth
- [ ] Trocar GTM
- [ ] Confirmar endereço e status do jato d'água
