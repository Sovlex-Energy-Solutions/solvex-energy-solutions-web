export interface TestimonialItem {
  id: string;
  nameKey: string;
  defaultName: string;
  roleKey: string;
  defaultRole: string;
  quoteKey: string;
  avatarEn: string;
  avatarHi: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "r1",
    nameKey: "testimonials.r1.name",
    defaultName: "MOHAN SHARMA",
    roleKey: "testimonials.r1.role",
    defaultRole: "MASTER DISTRIBUTOR • UP WEST",
    quoteKey: "testimonials.r1.quote",
    avatarEn: "M",
    avatarHi: "मो",
  },
  {
    id: "r2",
    nameKey: "testimonials.r2.name",
    defaultName: "SURAJ PATEL",
    roleKey: "testimonials.r2.role",
    defaultRole: "CHANNEL PARTNER • GUJARAT",
    quoteKey: "testimonials.r2.quote",
    avatarEn: "S",
    avatarHi: "सू",
  },
  {
    id: "r3",
    nameKey: "testimonials.r3.name",
    defaultName: "RAM CHOUDHARY",
    roleKey: "testimonials.r3.role",
    defaultRole: "REGIONAL EPC DIRECTOR • RAJASTHAN",
    quoteKey: "testimonials.r3.quote",
    avatarEn: "R",
    avatarHi: "रा",
  },
];
