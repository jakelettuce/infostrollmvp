export interface SiteConfig {
  name: string;
  url: string;
  unlocked: boolean;
}

export const sites: SiteConfig[] = [
  { name: 'Google', url: 'https://www.google.com', unlocked: true },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org', unlocked: false },
  { name: 'BBC News', url: 'https://www.bbc.com/news', unlocked: false },
  { name: 'National Geographic', url: 'https://www.nationalgeographic.com', unlocked: false },
  { name: 'Smithsonian', url: 'https://www.si.edu', unlocked: false }
]; 