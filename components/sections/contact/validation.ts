import type { BuyerFormData, PartnerFormData } from "./types";

export function validateBuyerField(
  field: keyof BuyerFormData,
  value: unknown,
  isHindi: boolean
): string {
  switch (field) {
    case "fullName": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "नाम दर्ज करना आवश्यक है" : "Full name is required.";
      if (str.length < 2) return isHindi ? "कम से कम 2 अक्षर होने चाहिए" : "Must be at least 2 characters.";
      return "";
    }
    case "phone": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "मोबाइल नंबर आवश्यक है" : "Mobile number is required.";
      const clean = str.replace(/[\s\-\(\)]/g, "");
      if (!/^(?:\+?91)?[6-9]\d{9}$/.test(clean)) {
        return isHindi ? "मान्य 10-अंकीय मोबाइल नंबर (+91) दर्ज करें" : "Enter a valid 10-digit mobile number (+91).";
      }
      return "";
    }
    case "city": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "शहर या जिला आवश्यक है" : "City / District is required.";
      return "";
    }
    case "consentAgreed": {
      if (!value) return isHindi ? "डेटा प्रोसेसिंग के लिए सहमति आवश्यक है" : "Consent is required to proceed.";
      return "";
    }
    default:
      return "";
  }
}

export function validatePartnerField(
  field: keyof PartnerFormData,
  value: unknown,
  isHindi: boolean
): string {
  switch (field) {
    case "firstName": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "पहला नाम दर्ज करें" : "First name is required.";
      if (str.length < 2) return isHindi ? "कम से कम 2 अक्षर होने चाहिए" : "Must be at least 2 characters.";
      return "";
    }
    case "lastName": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "अंतिम नाम दर्ज करें" : "Last name is required.";
      return "";
    }
    case "email": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "ईमेल पता आवश्यक है" : "Business email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
        return isHindi ? "मान्य ईमेल पता दर्ज करें" : "Enter a valid business email.";
      }
      return "";
    }
    case "phone": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "मोबाइल नंबर आवश्यक है" : "Mobile number is required.";
      const clean = str.replace(/[\s\-\(\)]/g, "");
      if (!/^(?:\+?91)?[6-9]\d{9}$/.test(clean)) {
        return isHindi ? "मान्य 10-अंकीय मोबाइल नंबर दर्ज करें" : "Enter a valid 10-digit mobile number.";
      }
      return "";
    }
    case "city": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "लक्षित जिला/शहर आवश्यक है" : "Target city/district is required.";
      return "";
    }
    case "partnershipType": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "साझेदारी का प्रकार चुनें" : "Select partnership tier.";
      return "";
    }
    case "investmentCapacity": {
      const str = typeof value === "string" ? value.trim() : "";
      if (!str) return isHindi ? "निवेश क्षमता चुनें" : "Select investment band.";
      return "";
    }
    case "consentAgreed": {
      if (!value) return isHindi ? "सहमति आवश्यक है" : "Consent is required to proceed.";
      return "";
    }
    default:
      return "";
  }
}
