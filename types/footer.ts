interface SocialMediaLinks {
  id: string;
  icon: string;
  platformUrl: string;
}

export type FooterType = {
  id: string;
  headingTitle: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  copyRightsText: string;
  location: string | null;
  logoImage: string;
  socialMedia: SocialMediaLinks[] | null;
};
