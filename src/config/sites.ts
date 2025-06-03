export interface SiteConfig {
  name: string;
  url: string;
  unlocked: boolean;
}

export const sites: SiteConfig[] = [
  { name: 'Way to Go', url: 'http://a-way-to-go.com/', unlocked: false },
  { name: 'Patatap', url: 'https://patatap.com/', unlocked: true },
  { name: 'Stimulation Clicker', url: 'https://neal.fun/stimulation-clicker', unlocked: false },
  { name: 'Superbad', url: 'https://www.superbad.com/', unlocked: false },
  { name: 'WNDR', url: 'https://www.sandrinewij.be/WNDR/', unlocked: false },
  { name: 'ECSpace', url: 'https://www.erdong-chen.com/', unlocked: false },
];
