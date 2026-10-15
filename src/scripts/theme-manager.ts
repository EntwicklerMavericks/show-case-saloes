/**
 * ThemeManager — Gerenciador Central de Temas da Vitrine Theodoro Digital
 * 
 * Implementação Vanilla TypeScript para controle de estado e atualização
 * reativa do DOM sem recarregamento de página.
 */

import {
  type Theme,
  type ThemeId,
  type ServiceIconType,
  type DifferentialIconType,
  THEMES,
  THEME_DEFAULT_ID,
  getTheme,
} from '../data/themes';

// Ícones SVG minimalistas (line art) fiéis à referência visual
const SERVICE_ICONS: Record<ServiceIconType, string> = {
  scissors: `
    <svg class="w-8 h-8 sm:w-9 sm:h-9 stroke-current" viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11.5" cy="8.5" r="2.8" />
      <circle cx="20.5" cy="8.5" r="2.8" />
      <line x1="11.5" y1="11.3" x2="16" y2="16.5" />
      <line x1="20.5" y1="11.3" x2="16" y2="16.5" />
      <circle cx="16" cy="16.5" r="0.6" fill="currentColor" />
      <line x1="16" y1="16.5" x2="11.5" y2="25" />
      <line x1="16" y1="16.5" x2="20.5" y2="25" />
      <line x1="4.5" y1="16.5" x2="8.5" y2="16.5" />
      <line x1="23.5" y1="16.5" x2="27.5" y2="16.5" />
    </svg>
  `,
  brush: `
    <svg class="w-8 h-8 sm:w-9 sm:h-9 stroke-current" viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <g transform="rotate(45, 16, 16)">
        <line x1="16" y1="28.5" x2="16" y2="17.5" stroke-width="1.5" stroke-linecap="round" />
        <rect x="12" y="14.5" width="8" height="3" rx="0.4" />
        <path d="M12.5 14.5 L13 6.5 H19 L19.5 14.5 Z" />
        <line x1="14.5" y1="14.5" x2="14.7" y2="6.5" stroke-width="0.9" />
        <line x1="16" y1="14.5" x2="16" y2="6.5" stroke-width="0.9" />
        <line x1="17.5" y1="14.5" x2="17.3" y2="6.5" stroke-width="0.9" />
      </g>
    </svg>
  `,
  sparkles: `
    <svg class="w-8 h-8 sm:w-9 sm:h-9 stroke-current" viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M 18.5 5.5 C 13.5 9, 12 13, 15.5 16 C 19 19, 17 23, 12 26.5" />
      <path d="M 21.5 5.5 C 16.5 9, 15 13, 18.5 16 C 22 19, 20 23, 15 26.5" />
      <path d="M 24.5 5.5 C 19.5 9, 18 13, 21.5 16 C 25 19, 23 23, 18 26.5" />
    </svg>
  `,
  spa: `
    <svg class="w-8 h-8 sm:w-9 sm:h-9 stroke-current" viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12.5" cy="24" r="2.5" />
      <circle cx="19.5" cy="24" r="2.5" />
      <line x1="12.5" y1="21.5" x2="15.2" y2="17" />
      <line x1="19.5" y1="21.5" x2="16.8" y2="17" />
      <circle cx="16" cy="17" r="0.5" fill="currentColor" />
      <path d="M 15.2 17 C 14.8 12.5, 14.2 9, 16 5.5" />
      <path d="M 16.8 17 C 17.2 12.5, 18 9, 20.2 6" />
    </svg>
  `,
  comb: `
    <svg class="w-8 h-8 sm:w-9 sm:h-9 stroke-current" viewBox="0 0 32 32" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <g transform="rotate(45, 16, 16)">
        <line x1="16" y1="28.5" x2="16" y2="18.5" stroke-width="1.5" stroke-linecap="round" />
        <rect x="12" y="5.5" width="8" height="13" rx="2.8" />
        <line x1="14" y1="7.8" x2="14" y2="16" stroke-width="0.8" stroke-dasharray="1 1.8" />
        <line x1="16" y1="7.2" x2="16" y2="16.8" stroke-width="0.8" stroke-dasharray="1 1.8" />
        <line x1="18" y1="7.8" x2="18" y2="16" stroke-width="0.8" stroke-dasharray="1 1.8" />
      </g>
    </svg>
  `,
};

const DIFFERENTIAL_ICONS: Record<DifferentialIconType, string> = {
  diamond: `
    <svg class="w-9 h-9 sm:w-10 sm:h-10 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M6 3h12l4 6-10 12L2 9l4-6z"></path>
      <path d="M2 9h20"></path>
      <path d="M10 3l-2 6 4 12 4-12-2-6"></path>
    </svg>
  `,
  heart: `
    <svg class="w-9 h-9 sm:w-10 sm:h-10 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  `,
  star: `
    <svg class="w-9 h-9 sm:w-10 sm:h-10 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `,
  'map-pin': `
    <svg class="w-9 h-9 sm:w-10 sm:h-10 stroke-current" viewBox="0 0 24 24" fill="none" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  `,
};

export class ThemeManager {
  private static instance: ThemeManager | null = null;
  private currentThemeId: ThemeId = THEME_DEFAULT_ID;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.setupA11yLiveRegion();

    try {
      const savedTheme = localStorage.getItem('theodoro_showcase_theme') as ThemeId | null;
      if (savedTheme && savedTheme in THEMES) {
        this.setTheme(savedTheme, false);
      } else {
        this.applyTheme(THEMES[this.currentThemeId], false);
      }
    } catch {
      this.applyTheme(THEMES[this.currentThemeId], false);
    }

    this.setupImageErrorHandlers();
    this.isInitialized = true;
  }

  public getCurrentThemeId(): ThemeId {
    return this.currentThemeId;
  }

  public getCurrentTheme(): Theme {
    return getTheme(this.currentThemeId);
  }

  public setTheme(themeId: ThemeId, persist = true): void {
    if (!(themeId in THEMES)) {
      console.warn(`[ThemeManager] Tema desconhecido: "${themeId}".`);
      return;
    }

    const theme = THEMES[themeId];
    this.currentThemeId = themeId;

    if (persist) {
      try {
        localStorage.setItem('theodoro_showcase_theme', themeId);
      } catch {
        // Fallback silencioso
      }
    }

    this.applyTheme(theme, true);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('theodoro:theme-changed', {
          detail: { themeId, theme },
        })
      );
    }
  }

  private applyTheme(theme: Theme, announceA11y: boolean): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.setAttribute('data-theme', theme.meta.id);

    // 1. Atualiza variáveis CSS no :root
    this.updateCssVariables(root, theme);

    // 2. Atualiza campos singulares
    this.updateSingularFields(theme);

    // 3. Atualiza coleções dinâmicas
    this.updateServicesCollection(theme);
    this.updateAboutDifferentials(theme);
    this.updateGalleryCollection(theme);
    this.updateTestimonialsCollection(theme);
    this.updateBookingForm(theme);

    // 4. Atualiza estado visual do Theme Switcher
    this.updateSwitcherControls(theme.meta.id);

    // 5. Título do Documento
    document.title = `${theme.meta.salonName} ${theme.meta.salonSubtitle} | Theodoro Digital`;

    // 6. Anúncio acessível
    if (announceA11y) {
      const live = document.getElementById('a11y-theme-announcer');
      if (live) {
        live.textContent = `Tema alterado para ${theme.meta.name}: ${theme.meta.salonName}.`;
      }
    }
  }

  private updateCssVariables(root: HTMLElement, theme: Theme): void {
    const { tokens } = theme;
    const style = root.style;

    style.setProperty('--color-bg-dark', tokens.colorBgDark);
    style.setProperty('--color-bg-light', tokens.colorBgLight);
    style.setProperty('--color-card-light', tokens.colorCardLight);
    style.setProperty('--color-card-dark', tokens.colorCardDark);

    style.setProperty('--color-text-on-dark', tokens.colorTextOnDark);
    style.setProperty('--color-text-on-dark-muted', tokens.colorTextOnDarkMuted);
    style.setProperty('--color-text-on-light', tokens.colorTextOnLight);
    style.setProperty('--color-text-on-light-muted', tokens.colorTextOnLightMuted);

    style.setProperty('--color-accent', tokens.colorAccent);
    style.setProperty('--color-accent-hover', tokens.colorAccentHover);
    style.setProperty('--color-accent-text', tokens.colorAccentText);

    style.setProperty('--color-border-dark', tokens.colorBorderDark);
    style.setProperty('--color-border-light', tokens.colorBorderLight);

    style.setProperty('--font-heading', tokens.fontHeading);
    style.setProperty('--font-body', tokens.fontBody);
    style.setProperty('--radius-btn', tokens.radiusBtn);
    style.setProperty('--radius-card', tokens.radiusCard);
  }

  private updateSingularFields(theme: Theme): void {
    const fields = document.querySelectorAll<HTMLElement>('[data-theme-field]');

    fields.forEach((el) => {
      const fieldPath = el.getAttribute('data-theme-field');
      if (!fieldPath) return;

      const value = this.resolveFieldPath(theme, fieldPath);
      if (value === undefined || value === null) return;

      const targetAttr = el.getAttribute('data-theme-target') || 'text';

      switch (targetAttr) {
        case 'text':
          el.textContent = String(value);
          break;
        case 'href':
          el.setAttribute('href', String(value));
          break;
        case 'src':
          if (el instanceof HTMLImageElement) {
            el.src = String(value);
          }
          break;
        case 'alt':
          if (el instanceof HTMLImageElement) {
            el.alt = String(value);
          }
          break;
        default:
          el.setAttribute(targetAttr, String(value));
          break;
      }
    });
  }

  private updateServicesCollection(theme: Theme): void {
    const container = document.querySelector('[data-theme-collection="services"]');
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('[data-theme-item-index]');
    const services = theme.services.items;

    items.forEach((item) => {
      const idxStr = item.getAttribute('data-theme-item-index');
      if (idxStr === null) return;
      const idx = parseInt(idxStr, 10);
      const s = services[idx];
      if (!s) return;

      const iconEl = item.querySelector('[data-theme-item-field="icon"]');
      if (iconEl && SERVICE_ICONS[s.icon]) {
        iconEl.innerHTML = SERVICE_ICONS[s.icon];
      }

      const titleEl = item.querySelector('[data-theme-item-field="title"]');
      if (titleEl) titleEl.textContent = s.title;

      const line1El = item.querySelector('[data-theme-item-field="line1"]');
      if (line1El && s.line1) {
        line1El.textContent = s.line1;
      }

      const line2El = item.querySelector('[data-theme-item-field="line2"]');
      if (line2El && s.line2) {
        line2El.textContent = s.line2;
      }

      const subEl = item.querySelector('[data-theme-item-field="subtitle"]');
      if (subEl && !line1El) subEl.textContent = s.subtitle;
    });
  }

  private updateAboutDifferentials(theme: Theme): void {
    const container = document.querySelector('[data-theme-collection="aboutDifferentials"]');
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('[data-theme-item-index]');
    const diffs = theme.about.differentials;

    items.forEach((item) => {
      const idxStr = item.getAttribute('data-theme-item-index');
      if (idxStr === null) return;
      const idx = parseInt(idxStr, 10);
      const d = diffs[idx];
      if (!d) return;

      const iconEl = item.querySelector('[data-theme-item-field="icon"]');
      if (iconEl && DIFFERENTIAL_ICONS[d.icon]) {
        iconEl.innerHTML = DIFFERENTIAL_ICONS[d.icon];
      }

      const line1El = item.querySelector('[data-theme-item-field="line1"]');
      if (line1El && d.line1) line1El.textContent = d.line1;

      const line2El = item.querySelector('[data-theme-item-field="line2"]');
      if (line2El && d.line2) line2El.textContent = d.line2;

      const titleEl = item.querySelector('[data-theme-item-field="title"]');
      if (titleEl && !line1El) titleEl.textContent = d.title;
    });
  }

  private updateGalleryCollection(theme: Theme): void {
    const container = document.querySelector('[data-theme-collection="gallery"]');
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('[data-theme-item-index]');
    const galleryItems = theme.gallery.items;

    items.forEach((item) => {
      const idxStr = item.getAttribute('data-theme-item-index');
      if (idxStr === null) return;
      const idx = parseInt(idxStr, 10);
      const g = galleryItems[idx];
      if (!g) return;

      const imgEl = item.querySelector<HTMLImageElement>('[data-theme-item-field="image"]');
      if (imgEl) {
        imgEl.src = g.url;
        imgEl.alt = g.alt;
      }
    });
  }

  private updateTestimonialsCollection(theme: Theme): void {
    const container = document.querySelector('[data-theme-collection="testimonials"]');
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>('[data-theme-item-index]');
    const testimonials = theme.testimonials.items;

    items.forEach((item) => {
      const idxStr = item.getAttribute('data-theme-item-index');
      if (idxStr === null) return;
      const idx = parseInt(idxStr, 10);
      const t = testimonials[idx % testimonials.length];
      if (!t) return;

      const quoteEl = item.querySelector('[data-theme-item-field="quote"]');
      if (quoteEl) quoteEl.textContent = `“${t.quote}”`;

      const clientEl = item.querySelector('[data-theme-item-field="clientName"]');
      if (clientEl) clientEl.textContent = t.clientName;
    });
  }

  private updateBookingForm(theme: Theme): void {
    const form = document.getElementById('booking-whatsapp-form');
    if (form) {
      form.setAttribute('data-whatsapp-number', theme.bookingForm.whatsappNumber);
      form.setAttribute('data-attendant-name', theme.bookingForm.attendantName);
      form.setAttribute('data-salon-name', theme.meta.salonName);
    }

    const serviceSelect = document.getElementById('booking-service') as HTMLSelectElement | null;
    if (serviceSelect) {
      const selectedValue = serviceSelect.value;
      const optionsHtml = [
        '<option value="" disabled' + (!selectedValue ? ' selected' : '') + '>Selecione um serviço...</option>',
        ...theme.services.items.map((svc) => `<option value="${svc.title}">${svc.title} — ${svc.subtitle}</option>`),
        '<option value="Outro serviço / Avaliação">Outro serviço / Avaliação personalizada</option>',
      ].join('');
      serviceSelect.innerHTML = optionsHtml;
    }

    const benefitsContainer = document.querySelector('[data-theme-collection="bookingBenefits"]');
    if (benefitsContainer) {
      const items = benefitsContainer.querySelectorAll('[data-theme-benefit-index]');
      items.forEach((item) => {
        const idxStr = item.getAttribute('data-theme-benefit-index');
        if (idxStr === null) return;
        const idx = parseInt(idxStr, 10);
        const text = theme.bookingForm.benefits[idx];
        if (text) {
          const textEl = item.querySelector('[data-theme-benefit-text]');
          if (textEl) textEl.textContent = text;
        }
      });
    }

    // Atualiza dados de localização geográfica do salão
    const locationCard = document.getElementById('booking-location-card');
    if (locationCard && theme.bookingForm.location) {
      locationCard.setAttribute('data-salon-lat', String(theme.bookingForm.location.latitude));
      locationCard.setAttribute('data-salon-lng', String(theme.bookingForm.location.longitude));
      locationCard.setAttribute('data-salon-address', theme.bookingForm.location.fullAddress);
    }

    const salonAddressEl = document.getElementById('booking-salon-address');
    if (salonAddressEl && theme.bookingForm.location) {
      salonAddressEl.textContent = theme.bookingForm.location.fullAddress;
    }

    const directMapsLink = document.getElementById('geo-maps-direct-link') as HTMLAnchorElement | null;
    if (directMapsLink && theme.bookingForm.location) {
      directMapsLink.href = theme.bookingForm.location.mapsUrl;
    }
  }

  private updateSwitcherControls(activeId: ThemeId): void {
    const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-select]');
    buttons.forEach((btn) => {
      const btnTheme = btn.getAttribute('data-theme-select');
      const isActive = btnTheme === activeId;

      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      btn.setAttribute('aria-checked', isActive ? 'true' : 'false');

      const indicator = btn.querySelector('[data-theme-active-indicator]');
      if (indicator) {
        if (isActive) {
          indicator.classList.remove('hidden');
          indicator.classList.add('flex');
        } else {
          indicator.classList.remove('flex');
          indicator.classList.add('hidden');
        }
      }

      if (isActive) {
        btn.classList.add('ring-2', 'ring-amber-400');
      } else {
        btn.classList.remove('ring-2', 'ring-amber-400');
      }
    });
  }

  private resolveFieldPath(obj: unknown, path: string): unknown {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return current;
  }

  private setupA11yLiveRegion(): void {
    if (document.getElementById('a11y-theme-announcer')) return;

    const live = document.createElement('div');
    live.id = 'a11y-theme-announcer';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    live.className = 'sr-only';
    document.body.appendChild(live);
  }

  private setupImageErrorHandlers(): void {
    const images = document.querySelectorAll<HTMLImageElement>('img');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        img.classList.add('img-fallback');
      });
    });
  }
}

if (typeof window !== 'undefined') {
  const initThemeManager = () => {
    ThemeManager.getInstance().init();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeManager);
  } else {
    initThemeManager();
  }

  (window as unknown as { TheodoroThemeManager: ThemeManager }).TheodoroThemeManager = ThemeManager.getInstance();
}
