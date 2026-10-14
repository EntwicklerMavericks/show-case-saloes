# Showcase de Alta Conversão para Salões de Beleza — Theodoro Digital

> **Vitrine Interativa com Theme Switcher em Tempo Real** desenvolvida em **Astro.js (SSG)**, **Tailwind CSS** e **TypeScript** estrito, utilizando **Vanilla JavaScript** para manipulação segura e performática do DOM no cliente.

---

## 🌟 Visão Geral do Projeto

Este projeto foi construído para a **Theodoro Digital** apresentar a donos e gestores de salões de beleza o poder de uma Landing Page de alta conversão, responsiva e personalizada.

O grande diferencial técnico e comercial é o **Theme Switcher Flutuante**, que permite ao cliente alternar instantaneamente entre **três identidades visuais completas** sem recarregar a página, sem frameworks de estado pesados (sem React, Vue ou Nano Stores) e mantendo a renderização estática inicial (SSG) impecável.

---

## 🎨 As Três Identidades Visuais

| Identidade | Nome Conceitual | Paleta & Atmosfera | Tipografia & Estilo |
| :--- | :--- | :--- | :--- |
| **Tema 1 (Padrão SSG)** | **Aura Haute Coiffure** | Preto profundo (`#0A0A0A`), grafite e ouro champanhe (`#D4AF37`) | *Playfair Display* + *Inter*, acabamento editorial, linhas retas e exclusividade VIP |
| **Tema 2** | **Lumina Studio & Glow** | Off-white (`#FDFBF9`), tons quentes de terracota (`#C86D56`) e rosa queimado | Moderno, feminino, acolhedor, botões em pílula (*rounded-full*) e bordas suaves |
| **Tema 3** | **Botânica Concept Salon** | Creme linho (`#F6F5F1`), verde-oliva sálvia (`#4A5D45`) e argila | Orgânico, eco-chic, cantos arredondados naturais, foco em terapias capilares limpas |

---

## 🏛️ Arquitetura e Engenharia de Interatividade

```
show-case-saloes/
├── public/
│   └── favicon.svg                    # Monograma vetorial dourado
├── src/
│   ├── components/
│   │   ├── ShowcaseHeaderBanner.astro # Faixa superior de identificação da vitrine
│   │   ├── Header.astro               # Topo fixo com logo adaptável, nav e menu mobile
│   │   ├── Hero.astro                 # Dobra principal com imagem e chamada de impacto
│   │   ├── Services.astro             # Grade com 4 serviços e ícones SVG dinâmicos
│   │   ├── About.astro                # Layout dividido (imagem + diferenciais numerados)
│   │   ├── Gallery.astro              # Curadoria visual vertical com hover zoom
│   │   ├── Testimonials.astro         # 3 avaliações com 5 estrelas e disclaimer ético
│   │   ├── Footer.astro               # Contatos, horários, localização e links sociais
│   │   └── ThemeSwitcher.astro        # Gaveta modal flutuante com a11y por teclado
│   ├── data/
│   │   └── themes.ts                  # Contrato de dados estrito e catálogo dos 3 temas
│   ├── layouts/
│   │   └── Layout.astro               # Layout base com SSR das variáveis CSS e SEO
│   ├── pages/
│   │   └── index.astro                # Página estática que integra todas as seções
│   ├── scripts/
│   │   └── theme-manager.ts           # Gerenciador Vanilla TS de atualização reativa do DOM
│   └── styles/
│       └── global.css                 # Diretivas Tailwind, variáveis CSS e resets acessíveis
├── tests/
│   └── verify-theme-manager.mjs       # Suíte automatizada de testes headless (JSDOM)
├── astro.config.mjs                   # Configuração Astro (output: 'static')
├── tailwind.config.cjs                # Mapeamento dos tokens CSS para utilitários Tailwind
├── tsconfig.json                      # TypeScript strict mode
└── package.json
```

### Mecanismo de Associação: `data-theme-field` & `data-theme-collection`

A sincronização entre o catálogo TypeScript e os elementos HTML ocorre através de atributos explícitos, evitando seletores frágeis baseados em estrutura:

1. **Campos Singulares (`data-theme-field`):**
   - Textos simples: `data-theme-field="hero.title"` (atualizado via `el.textContent`)
   - Links: `data-theme-field="hero.ctaPrimaryHref"` com `data-theme-target="href"`
   - Imagens: `data-theme-field="hero.bgImageUrl"` com `data-theme-target="src"` e `alt`
2. **Coleções Dinâmicas (`data-theme-collection`):**
   - `services`: 4 cards indexados com `data-theme-item-index="0..3"` e campos `data-theme-item-field="icon | tag | title | description | priceRange"`
   - `aboutTopics`: 3 diferenciais com `data-theme-item-field="title | description"`
   - `gallery`: 4 imagens com `data-theme-item-field="image | category | caption"`
   - `testimonials`: 3 avaliações com `data-theme-item-field="highlight | quote | clientName | role | avatar"`
3. **Variáveis CSS em `:root`:**
   - As cores, fontes, bordas e sombras são mapeadas diretamente pelo Tailwind:
     `bg-theme-bg-primary`, `text-theme-accent`, `rounded-theme-card`, etc. Ao mudar as variáveis CSS no elemento raiz `<html>`, toda a página atualiza seus estilos instantaneamente.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** 20+ ou 22+
- **npm** 10+

### Instalação das Dependências

Entre na pasta do projeto:
```bash
cd show-case-saloes
npm install
```
*(Ou, a partir da pasta raiz `saloes`, basta executar `npm install --prefix show-case-saloes`)*

### Executar em Modo de Desenvolvimento
```bash
npm run dev
```
O servidor iniciará em `http://localhost:4321`.

### Gerar Build Estático de Produção (SSG)
```bash
npm run build
```
O build estático será compilado na pasta `dist/` em menos de 2 segundos.

### Visualizar o Build Localmente
```bash
npm run preview
```

### Executar a Validação de Tipos e a Suíte de Testes
```bash
# Verificação estrita de tipos do Astro e TypeScript
npm run check

# Suíte de testes automatizados headless (JSDOM)
npm run test
```

---

## 🛠️ Guia de Manutenção e Customização

### Como Adicionar ou Modificar um Tema
1. Abra `src/data/themes.ts`.
2. Todos os temas são regidos pela interface estrita `Theme`.
3. Para alterar textos, paleta de cores ou serviços de um tema existente, edite o objeto correspondente (`THEMES['luxo-sofisticado']`, `THEMES['moderno-feminino']` ou `THEMES['natural-contemporaneo']`).
4. Para alterar os tokens de estilo (como cores e fontes), modifique as propriedades em `tokens` (`colorBgPrimary`, `colorAccentPrimary`, etc.).

### Como Substituir Imagens
- Todas as imagens possuem URLs de alta resolução com parâmetros de dimensão do Unsplash (`auto=format&fit=crop&w=...&q=80`).
- Para usar imagens locais de clientes reais, adicione os arquivos em `public/images/` e atualize os campos `url` e `alt` no arquivo `src/data/themes.ts`.
- Todas as imagens possuem tratamento resiliente: caso a imagem falhe ao carregar na rede, um placeholder SVG vetorial padronizado da vitrine é acionado automaticamente.

---

## 🛡️ Acessibilidade e Boas Práticas

- **Navegação por Teclado:** O Theme Switcher pode ser aberto e navegado via teclado, com fechamento pela tecla `Escape` e retorno de foco ao botão de abertura.
- **Leitores de Tela:** Implementada região oculta `aria-live="polite"` (`#a11y-theme-announcer`) que notifica deficientes visuais a cada troca de identidade visual.
- **Respeito ao `prefers-reduced-motion`:** Usuários com preferências de redução de movimento têm transições e animações suavizadas automaticamente.
- **Segurança:** Manipulação de strings puramente via `textContent`, prevenindo injeções de conteúdo ou HTML malicioso.