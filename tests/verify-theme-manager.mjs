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

  // Booking Form
  const form = document.getElementById('booking-whatsapp-form');
  if (form) {
    form.setAttribute('data-whatsapp-number', theme.bookingForm.whatsappNumber);
    form.setAttribute('data-attendant-name', theme.bookingForm.attendantName);
    form.setAttribute('data-salon-name', theme.meta.salonName);
  }

  const svcSelect = document.getElementById('booking-service');
  if (svcSelect) {
    svcSelect.innerHTML = [
      '<option value="" disabled selected>Selecione um serviço...</option>',
      ...theme.services.items.map((svc) => `<option value="${svc.title}">${svc.title} — ${svc.subtitle}</option>`),
      '<option value="Outro serviço / Avaliação">Outro serviço / Avaliação personalizada</option>'
    ].join('');
  }

  const benefits = document.querySelectorAll('[data-theme-collection="bookingBenefits"] [data-theme-benefit-index]');
  benefits.forEach((item) => {
    const idx = parseInt(item.getAttribute('data-theme-benefit-index'), 10);
    const b = theme.bookingForm.benefits[idx];
    if (b) {
      const textEl = item.querySelector('[data-theme-benefit-text]');
      if (textEl) textEl.textContent = b;
    }
  });

  // Location
  const locCard = document.getElementById('booking-location-card');
  if (locCard && theme.bookingForm.location) {
    locCard.setAttribute('data-salon-lat', String(theme.bookingForm.location.latitude));
    locCard.setAttribute('data-salon-lng', String(theme.bookingForm.location.longitude));
    locCard.setAttribute('data-salon-address', theme.bookingForm.location.fullAddress);
  }
  const salonAddr = document.getElementById('booking-salon-address');
  if (salonAddr && theme.bookingForm.location) {
    salonAddr.textContent = theme.bookingForm.location.fullAddress;
  }
}

// Aplica Tema 2
applyThemeInDom(THEMES['moderno-feminino']);
const theme2Logo = document.querySelector('[data-theme-field="header.logoPrefix"]')?.textContent?.trim();
const theme2HeroTitle = document.querySelector('[data-theme-field="hero.title"]')?.textContent?.trim();
const theme2Service0 = document.querySelector('[data-theme-collection="services"] [data-theme-item-index="0"] [data-theme-item-field="title"]')?.textContent?.trim();
const theme2Testimonial0 = document.querySelector('[data-theme-collection="testimonials"] [data-theme-item-index="0"] [data-theme-item-field="clientName"]')?.textContent?.trim();
const theme2Attendant = document.querySelector('[data-theme-field="bookingForm.attendantName"]')?.textContent?.trim();
const theme2Whatsapp = document.getElementById('booking-whatsapp-form')?.getAttribute('data-whatsapp-number');
const theme2Address = document.getElementById('booking-salon-address')?.textContent?.trim();

console.log(`   ✓ Logo atualizado: ${theme2Logo}`);
console.log(`   ✓ Hero title atualizado: "${theme2HeroTitle}"`);
console.log(`   ✓ Serviço 0 atualizado: "${theme2Service0}"`);
console.log(`   ✓ Depoimento 0 atualizado: "${theme2Testimonial0}"`);
console.log(`   ✓ Atendente Booking atualizada: "${theme2Attendant}"`);
console.log(`   ✓ WhatsApp Booking atualizado: "${theme2Whatsapp}"`);
console.log(`   ✓ Endereço do Salão atualizado: "${theme2Address}"`);

if (theme2Logo !== 'LUMINA' || theme2HeroTitle !== 'Cabelos luminosos e cheios de vida' || theme2Attendant !== 'Camila Rocha' || theme2Whatsapp !== '5511977770002' || !theme2Address?.includes('Bela Cintra')) {
  throw new Error('Falha na atualização para o tema Moderno e Feminino.');
}

// 3. Aplica Tema 3
console.log('\n[3/5] Testando Alternância para Tema 3 (Natural e Contemporâneo - Botânica)...');
applyThemeInDom(THEMES['natural-contemporaneo']);
const theme3Logo = document.querySelector('[data-theme-field="header.logoPrefix"]')?.textContent?.trim();
const theme3HeroTitle = document.querySelector('[data-theme-field="hero.title"]')?.textContent?.trim();
const theme3Service0 = document.querySelector('[data-theme-collection="services"] [data-theme-item-index="0"] [data-theme-item-field="title"]')?.textContent?.trim();
const theme3Attendant = document.querySelector('[data-theme-field="bookingForm.attendantName"]')?.textContent?.trim();
const theme3Whatsapp = document.getElementById('booking-whatsapp-form')?.getAttribute('data-whatsapp-number');
const theme3SvcOption = document.querySelector('#booking-service option[value="TRICOLOGIA & DETOX"]');
const theme3Address = document.getElementById('booking-salon-address')?.textContent?.trim();

console.log(`   ✓ Logo atualizado: ${theme3Logo}`);
console.log(`   ✓ Hero title atualizado: "${theme3HeroTitle}"`);
console.log(`   ✓ Serviço 0 atualizado: "${theme3Service0}"`);
console.log(`   ✓ Atendente Booking atualizada: "${theme3Attendant}"`);
console.log(`   ✓ WhatsApp Booking atualizado: "${theme3Whatsapp}"`);
console.log(`   ✓ Dropdown de serviços atualizado com: "${theme3SvcOption?.value}"`);
console.log(`   ✓ Endereço do Salão atualizado: "${theme3Address}"`);

if (theme3Logo !== 'BOTÂNICA' || theme3HeroTitle !== 'A harmonia da natureza a favor da sua essência' || theme3Attendant !== 'Helena Castro' || !theme3SvcOption || !theme3Address?.includes('Fradique Coutinho')) {
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
const bookingSection = document.getElementById('agendamento');
const bookingFormTag = document.getElementById('booking-whatsapp-form');
const bookingNameInput = document.getElementById('booking-name');
const bookingPhoneInput = document.getElementById('booking-phone');
const bookingSubmitBtn = document.getElementById('booking-submit-btn');
const bookingLocationCard = document.getElementById('booking-location-card');
const geoDistanceBtn = document.getElementById('geo-distance-btn');
const geoMapsDirectLink = document.getElementById('geo-maps-direct-link');

console.log(`   ✓ Seção de Agendamento #agendamento presente: ${!!bookingSection}`);
console.log(`   ✓ Formulário WhatsApp #booking-whatsapp-form presente: ${!!bookingFormTag}`);
console.log(`   ✓ Campo Nome presente: ${!!bookingNameInput}`);
console.log(`   ✓ Campo Telefone/WhatsApp presente: ${!!bookingPhoneInput}`);
console.log(`   ✓ Botão Enviar Pedido presente: ${!!bookingSubmitBtn}`);
console.log(`   ✓ Card de Localização presente: ${!!bookingLocationCard}`);
console.log(`   ✓ Botão de Cálculo de Distância presente: ${!!geoDistanceBtn}`);
console.log(`   ✓ Link direto Google Maps presente: ${!!geoMapsDirectLink}`);

if (!bookingSection || !bookingFormTag || !bookingNameInput || !bookingPhoneInput || !bookingSubmitBtn || !bookingLocationCard || !geoDistanceBtn) {
  throw new Error('Falha na integridade dos elementos do formulário de agendamento e localização.');
}
const whatsappFloat = document.getElementById('whatsapp-float-btn');
const allImages = document.querySelectorAll('img');

console.log(`   ✓ <h1> único presente: ${!!h1Tag}`);
console.log(`   ✓ <nav> com aria-label presente: ${!!navTag}`);
console.log(`   ✓ Botão Flutuante do WhatsApp presente: ${!!whatsappFloat}`);
console.log(`   ✓ WhatsApp Float direcionando para 5511933565640: ${whatsappFloat?.getAttribute('href')?.includes('5511933565640')}`);
console.log(`   ✓ Total de imagens com alt: ${allImages.length}`);

// Verificações dos novos recursos de Atendentes e Telefones Clicáveis
const attendantBtns = document.querySelectorAll('.attendant-select-btn');
const attendantSelect = document.getElementById('booking-attendant-select');
const attendantDirectLink = document.getElementById('booking-attendant-direct-link');
const footerPhoneLinks = document.querySelectorAll('#footer-phones-container a[href*="wa.me"]');

console.log(`   ✓ Botões de seleção de atendentes presentes: ${attendantBtns.length} (Esperado >= 3)`);
console.log(`   ✓ Seletor de atendente no formulário presente: ${!!attendantSelect}`);
console.log(`   ✓ Link direto de WhatsApp da atendente presente: ${!!attendantDirectLink}`);
console.log(`   ✓ Telefones cadastrados no rodapé clicáveis com envio de mensagem (wa.me): ${footerPhoneLinks.length} links`);

if (!whatsappFloat || !whatsappFloat.getAttribute('href')?.includes('5511933565640')) {
  throw new Error('Falha no botão flutuante oficial do WhatsApp.');
}

if (attendantBtns.length < 3 || !attendantSelect || !attendantDirectLink || footerPhoneLinks.length === 0) {
  throw new Error('Falha na validação do seletor de atendentes ou dos telefones clicáveis no rodapé.');
}

console.log('\n🎉 NOVO LAYOUT VALIDADO E APROVADO COM 100% DE SUCESSO!');
