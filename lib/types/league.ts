export interface League {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  region: string;
  game: string;
  tier: 'international' | 'regional' | 'challenger' | 'academy';
  logo?: string;
}
