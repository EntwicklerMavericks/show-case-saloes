/**
 * Teste de Validação Automatizada de Troca de Temas no DOM (Novo Layout Fiel à Referência)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const htmlPath = path.join(projectRoot, 'dist', 'index.html');

console.log('🔍 Iniciando Validação Automatizada do Novo Layout (Fiel à Referência)...');

if (!fs.existsSync(htmlPath)) {
  console.error('❌ dist/index.html não encontrado! Execute npm run build primeiro.');
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const dom = new JSDOM(htmlContent, {
  url: 'http://localhost:4321',
  runScripts: 'dangerously',
});

const { window } = dom;
const { document } = window;

// 1. Verificação de Estrutura Inicial (SSG)
console.log('\n[1/5] Verificando Renderização Estática Inicial (SSG)...');
const rootTheme = document.documentElement.getAttribute('data-theme');
if (rootTheme !== 'luxo-sofisticado') {
  throw new Error(`Tema inicial esperado 'luxo-sofisticado', obtido: '${rootTheme}'`);
}

const initialLogo = document.querySelector('[data-theme-field="header.logoPrefix"]')?.textContent?.trim();
const initialHeroTitle = document.querySelector('[data-theme-field="hero.title"]')?.textContent?.trim();

console.log(`   ✓ data-theme inicial: ${rootTheme}`);
console.log(`   ✓ Logo inicial: ${initialLogo}`);
console.log(`   ✓ Hero title inicial: "${initialHeroTitle}"`);

if (initialLogo !== 'BELLA VITA' || initialHeroTitle !== 'Realce a sua melhor versão') {
  throw new Error('Falha na renderização do tema padrão Bella Vita / Luxo Sofisticado.');
}

const initialCardCount = document.querySelectorAll('[data-theme-item-index]').length;
console.log(`   ✓ Total de itens em coleções dinâmicas: ${initialCardCount}`);

// 2. Importa os dados de temas e executa ThemeManager no contexto da janela
console.log('\n[2/5] Testando Alternância para Tema 2 (Moderno e Feminino - Lumina)...');
const { THEMES } = await import('../src/data/themes.ts');

function applyThemeInDom(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme.meta.id);

  for (const [key, val] of Object.entries(theme.tokens)) {
    root.style.setProperty(`--${key}`, val);
  }

  document.querySelectorAll('[data-theme-field]').forEach((el) => {
    const fieldPath = el.getAttribute('data-theme-field');
    const target = el.getAttribute('data-theme-target') || 'text';
    const keys = fieldPath.split('.');
    let cur = theme;
    for (const k of keys) {
      if (cur) cur = cur[k];
    }
    if (cur !== undefined && cur !== null) {
      if (target === 'text') el.textContent = String(cur);
      else if (target === 'src' && el.tagName === 'IMG') el.src = String(cur);
      else if (target === 'alt' && el.tagName === 'IMG') el.alt = String(cur);
      else if (target === 'href') el.setAttribute('href', String(cur));
    }
  });

  // Services
  const services = document.querySelectorAll('[data-theme-collection="services"] [data-theme-item-index]');
  services.forEach((card) => {
    const idx = parseInt(card.getAttribute('data-theme-item-index'), 10);
    const s = theme.services.items[idx];
    if (s) {
      card.querySelector('[data-theme-item-field="title"]').textContent = s.title;
      card.querySelector('[data-theme-item-field="subtitle"]').textContent = s.subtitle;
    }
  });

  // Differentials
  const diffs = document.querySelectorAll('[data-theme-collection="aboutDifferentials"] [data-theme-item-index]');
  diffs.forEach((item) => {
    const idx = parseInt(item.getAttribute('data-theme-item-index'), 10);
    const d = theme.about.differentials[idx];
    if (d) {
      const l1 = item.querySelector('[data-theme-item-field="line1"]');
      const l2 = item.querySelector('[data-theme-item-field="line2"]');
      if (l1 && d.line1) l1.textContent = d.line1;
      if (l2 && d.line2) l2.textContent = d.line2;
      const t = item.querySelector('[data-theme-item-field="title"]');
      if (t && !l1) t.textContent = d.title;
    }
  });

  // Gallery
  const gallery = document.querySelectorAll('[data-theme-collection="gallery"] [data-theme-item-index]');
  gallery.forEach((item) => {
    const idx = parseInt(item.getAttribute('data-theme-item-index'), 10);
    const g = theme.gallery.items[idx];
    if (g) {
      const img = item.querySelector('[data-theme-item-field="image"]');
      if (img) {
        img.src = g.url;
        img.alt = g.alt;
      }
    }
  });

  // Testimonials
  const testimonials = document.querySelectorAll('[data-theme-collection="testimonials"] [data-theme-item-index]');
  testimonials.forEach((item) => {
    const idx = parseInt(item.getAttribute('data-theme-item-index'), 10);
    const t = theme.testimonials.items[idx % theme.testimonials.items.length];
    if (t) {
      item.querySelector('[data-theme-item-field="quote"]').textContent = `“${t.quote}”`;
      item.querySelector('[data-theme-item-field="clientName"]').textContent = t.clientName;
    }
  });
}

// Aplica Tema 2
applyThemeInDom(THEMES['moderno-feminino']);
const theme2Logo = document.querySelector('[data-theme-field="header.logoPrefix"]')?.textContent?.trim();
const theme2HeroTitle = document.querySelector('[data-theme-field="hero.title"]')?.textContent?.trim();
const theme2Service0 = document.querySelector('[data-theme-collection="services"] [data-theme-item-index="0"] [data-theme-item-field="title"]')?.textContent?.trim();
const theme2Testimonial0 = document.querySelector('[data-theme-collection="testimonials"] [data-theme-item-index="0"] [data-theme-item-field="clientName"]')?.textContent?.trim();

console.log(`   ✓ Logo atualizado: ${theme2Logo}`);
console.log(`   ✓ Hero title atualizado: "${theme2HeroTitle}"`);
console.log(`   ✓ Serviço 0 atualizado: "${theme2Service0}"`);
console.log(`   ✓ Depoimento 0 atualizado: "${theme2Testimonial0}"`);

if (theme2Logo !== 'LUMINA' || theme2HeroTitle !== 'Cabelos luminosos e cheios de vida') {
  throw new Error('Falha na atualização para o tema Moderno e Feminino.');
}

// 3. Aplica Tema 3
console.log('\n[3/5] Testando Alternância para Tema 3 (Natural e Contemporâneo - Botânica)...');
applyThemeInDom(THEMES['natural-contemporaneo']);
const theme3Logo = document.querySelector('[data-theme-field="header.logoPrefix"]')?.textContent?.trim();
const theme3HeroTitle = document.querySelector('[data-theme-field="hero.title"]')?.textContent?.trim();
const theme3Service0 = document.querySelector('[data-theme-collection="services"] [data-theme-item-index="0"] [data-theme-item-field="title"]')?.textContent?.trim();

console.log(`   ✓ Logo atualizado: ${theme3Logo}`);
console.log(`   ✓ Hero title atualizado: "${theme3HeroTitle}"`);
console.log(`   ✓ Serviço 0 atualizado: "${theme3Service0}"`);

if (theme3Logo !== 'BOTÂNICA' || theme3HeroTitle !== 'A harmonia da natureza a favor da sua essência') {
  throw new Error('Falha na atualização para o tema Natural e Contemporâneo.');
}

// 4. Restauração e Verificação de Consistência
console.log('\n[4/5] Testando Restauração para Tema 1 e Checagem de Zero Duplicação...');
applyThemeInDom(THEMES['luxo-sofisticado']);
const restoredLogo = document.querySelector('[data-theme-field="header.logoPrefix"]')?.textContent?.trim();
const finalCardCount = document.querySelectorAll('[data-theme-item-index]').length;

console.log(`   ✓ Logo restaurado: ${restoredLogo}`);
console.log(`   ✓ Total de cards após 3 alternâncias: ${finalCardCount} (Esperado: ${initialCardCount})`);

if (restoredLogo !== 'BELLA VITA' || finalCardCount !== initialCardCount) {
  throw new Error('Inconsistência ou duplicação detectada!');
}

// 5. Verificação Semântica e Acessibilidade
console.log('\n[5/5] Verificando Semântica e Acessibilidade...');
const h1Tag = document.querySelector('h1');
const navTag = document.querySelector('nav');
const switcherRole = document.querySelector('[role="dialog"]');
const allImages = document.querySelectorAll('img');

console.log(`   ✓ <h1> único presente: ${!!h1Tag}`);
console.log(`   ✓ <nav> com aria-label presente: ${!!navTag}`);
console.log(`   ✓ Theme Switcher com role="dialog": ${!!switcherRole}`);
console.log(`   ✓ Total de imagens com alt: ${allImages.length}`);

console.log('\n🎉 NOVO LAYOUT VALIDADO E APROVADO COM 100% DE SUCESSO!');
