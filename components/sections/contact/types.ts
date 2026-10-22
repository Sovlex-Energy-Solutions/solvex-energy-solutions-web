export interface BuyerFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  productInterest: string;
  monthlyBill: string;
  capacityKw: string;
  notes: string;
  consentAgreed: boolean;
}

export interface PartnerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  partnershipType: string;
  investmentCapacity: string;
  experience: string;
  consentAgreed: boolean;
}
