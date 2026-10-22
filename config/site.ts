/**
 * Site-wide enterprise configuration for Solvex Energy Solutions.
 * Centralizes company identity, contact points, DISCOM territory coverage, and SEO constants.
 */
export const SITE_CONFIG = {
  name: "Solvex Energy Solutions",
  legalName: "Solvex Energy Solutions Private Limited",
  cin: "CIN: U43219GJ2025PTC168167",
  url: "https://solvexenergysolutions.in",
  phone: "+91-91251-27755",
  phoneDisplay: "+91 91251 27755",
  whatsappNumber: "919125127755",
  email: "infosolvexenergysoltuion@gmail.com",
  address: {
    street: "F-5A Shyam Nagar , EX Shiv Sadan",
    city: "Jaipur",
    state: "Rajasthan",
    postalCode: "302019",
    country: "IN",
  },
  geo: {
    latitude: 26.8928,
    longitude: 75.7683,
  },
  operatingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/company/solvex-energy",
    twitter: "https://twitter.com/solvexenergy",
  },
  certifications: [
    "MNRE ALMM Tier-1 Certified",
    "PM Surya Ghar Approved Channel Partner",
    "BIS IS-16170 Certified",
    "ISO 9001:2015 Quality Certified",
  ],
} as const;
