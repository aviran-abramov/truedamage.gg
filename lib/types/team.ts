export interface Team {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  logo?: string;
  region?: string;
  game: string;
  primaryColor?: string;
  secondaryColor?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
  };
  isActive: boolean;
  foundedYear?: number;
}
