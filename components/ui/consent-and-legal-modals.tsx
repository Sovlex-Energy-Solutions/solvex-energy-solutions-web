"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Cookie,
  FileText,
  Lock,
  Building2,
  Truck,
  RotateCcw,
  Zap,
  PhoneCall,
  Database,
  Sliders,
  Scale,
  Receipt,
  AlertTriangle,
} from "lucide-react";
import ConsentBanner from "@/components/consent/ConsentBanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type LegalTab = "privacy" | "terms";

// Custom event to open legal modal from anywhere (Footer, Contact form, Cookie banner)
export function openLegalModal(tab: LegalTab = "privacy") {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-legal-modal", { detail: { tab } }));
  }
}

/**
 * Enterprise Privacy Policy Content
 * Comprehensive coverage: Data collection, forms, WhatsApp/calls, CRM, analytics, cookies, storage, sharing & rights.
 */
export function PrivacyPolicyContent() {
  return (
    <div className="space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
      {/* Overview Notice */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed">
          <strong>Digital Personal Data Protection (DPDP) Act 2023 Notice:</strong> Solvex Energy Solutions Private Limited is committed to transparent data fiduciary practices. This policy details how we collect, process, store, and safeguard your commercial and personal information.
        </p>
      </div>

      {/* 1. Institutional Commitment & Scope */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
          1. Institutional Commitment & Legal Identity
        </h3>
        <p>
          This Privacy Policy applies to all digital platforms, portal interfaces, and customer interaction channels operated by <strong>Solvex Energy Solutions Private Limited</strong> (CIN: U43219GJ2025PTC168167), having its corporate office at F-5A Shyam Nagar, EX Shiv Sadan, Jaipur 302019, Rajasthan, India (&ldquo;Solvex&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;). We act as a <em>Data Fiduciary</em> under the provisions of the Digital Personal Data Protection Act 2023 (DPDP Act) and the Information Technology Act 2000.
        </p>
      </section>

      {/* 2. User Data Collection */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-700 shrink-0" />
          2. Categories of Data Collected
        </h3>
        <p>
          We collect personal and commercial data through authorized user interactions:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
          <li>
            <strong>Enquiry & Partner Application Forms:</strong> Full name, authorized corporate designation, registered business name, corporate email address, 10-digit mobile number, operating state, district, city, pin code, commercial investment capacity, current electrical/solar trade experience, and Goods and Services Tax Identification Number (GSTIN).
          </li>
          <li>
            <strong>Rooftop Sizing & Calculation Data:</strong> Monthly electricity consumption (units/kWh), estimated sanctioned load, roof surface area, utility provider (DISCOM), and preference for PM Surya Ghar subsidy processing.
          </li>
          <li>
            <strong>Technical & Telemetry Identifiers:</strong> Internet Protocol (IP) address, approximate geographical location (state/city level), browser specification, operating system, session duration, and referrer URL headers.
          </li>
        </ul>
      </section>

      {/* 3. WhatsApp, SMS & Phone Interactions */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
          3. WhatsApp, Telephonic & Multi-Channel Communications
        </h3>
        <p>
          When you submit an inquiry or apply for territorial dealership:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>
            You grant express consent for our authorized regional expansion desk to contact you via telephone, SMS, and the official WhatsApp Business API regarding product pricing, feasibility assessments, and procurement schedules.
          </li>
          <li>
            Telephonic calls may be monitored or recorded strictly for quality assurance, engineering specification verification, and commercial record-keeping.
          </li>
          <li>
            You may revoke communication consent at any time by replying &ldquo;STOP&rdquo; on WhatsApp or emailing <code>Infosolvexenergysoltuion@gmail.com</code>.
          </li>
        </ul>
      </section>

      {/* 4. CRM & Enterprise Workflow Integrations */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-700 shrink-0" />
          4. Enterprise CRM & Lead Pipeline Routing
        </h3>
        <p>
          Prospective dealer dossiers and hardware inquiries are synchronized into our private, access-restricted Customer Relationship Management (CRM) and Enterprise Resource Planning (ERP) systems. Data access is governed by strict Role-Based Access Controls (RBAC), ensuring that only authorized territory managers and technical EPC coordinators access your application.
        </p>
      </section>

      {/* 5. Analytics & Session Metrics */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
          5. Regional Analytics & Telemetry (Google Analytics 4)
        </h3>
        <p>
          We utilize <strong>Google Analytics 4</strong> (operated by Google Ireland Limited / Google LLC) to measure aggregate, district-level clean-energy interest across Indian states, optimize solar inverter allocations, and evaluate demand for government rooftop subsidies under the PM Surya Ghar initiative.
        </p>
        <p className="text-zinc-600">
          <strong>Basic Consent Mode & Privacy by Default:</strong> Under our implementation, Google Analytics scripts and network requests remain <em>completely blocked</em> by default. No cookies are placed and no network requests are sent until you choose to provide affirmative opt-in consent.
        </p>
        <p className="text-zinc-600">
          <strong>Strict Data Minimization:</strong> IP addresses are automatically anonymized. All outbound page URLs and event parameters are scrubbed to ensure that personal data (such as full names, email addresses, phone numbers, quotation inputs, or security tokens) is never transmitted to Google Analytics.
        </p>
      </section>

      {/* 6. Cookies & Consent Mechanisms */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Cookie className="w-4 h-4 text-emerald-700 shrink-0" />
          6. Cookies & Local Storage Management
        </h3>
        <p>
          Our platform utilizes cookies and secure browser storage (`localStorage`) organized into two distinct functional categories:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
          <div className="p-3 rounded-lg border border-black/10 bg-zinc-50">
            <span className="font-semibold text-zinc-900 block text-xs">Strictly Necessary (Essential)</span>
            <span className="text-zinc-500 text-[11px] block mt-1">
              Required for secure browsing, token caching, CSRF defense, and language selection (English/Hindi). Always active. Cannot be disabled.
            </span>
          </div>
          <div className="p-3 rounded-lg border border-black/10 bg-zinc-50">
            <span className="font-semibold text-zinc-900 block text-xs">Optional Regional Analytics (GA4)</span>
            <span className="text-zinc-500 text-[11px] block mt-1">
              Anonymized traffic patterns to scale clean energy supply pipelines across districts. Disabled by default. Requires explicit opt-in.
            </span>
          </div>
        </div>
        <p className="text-xs text-zinc-500 pt-1">
          You can adjust your consent choices or withdraw consent at any time via the persistent &ldquo;Privacy &amp; Cookie Settings&rdquo; link in the website footer.
        </p>
      </section>

      {/* 7. Purpose of Processing */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
          7. Lawful Purpose & Data Utilization
        </h3>
        <p>We process collected information strictly for legitimate commercial purposes:</p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>Evaluating territorial franchise exclusivity and calculating distributor non-compete buffers.</li>
          <li>Generating engineered bill-of-materials (BOM), quotations, and solar yield projections.</li>
          <li>Facilitating DISCOM net-metering synchronization and government DBT subsidy documentation under PM Surya Ghar.</li>
          <li>Fulfilling legal obligations, including tax withholding, GST compliance, and statutory audits.</li>
        </ul>
      </section>

      {/* 8. Data Storage & Security Safeguards */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
          8. Storage Infrastructure & Security Controls
        </h3>
        <p>
          All digital records are encrypted in transit via Transport Layer Security (TLS 1.3) and stored with Advanced Encryption Standard (AES-256) at rest. Servers and databases are hosted in certified Tier-IV enterprise data center facilities physically located within India, adhering to strict data sovereignty standards. Records are retained for the duration of the commercial relationship or up to 24 months post-enquiry for statutory compliance.
        </p>
      </section>

      {/* 9. Data Sharing & Third-Party Disclosures */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          9. Third-Party Sharing & Safeguards
        </h3>
        <p>
          <strong>Solvex strictly enforces a zero-sale policy:</strong> we never sell, lease, or monetize customer or distributor data. Information is disclosed solely to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li><strong>Vetted Logistics & Freight Partners:</strong> For direct factory dispatch and consignment tracking.</li>
          <li><strong>Electric Utilities & DISCOMs:</strong> For bi-directional net-metering clearance and grid synchronizations.</li>
          <li><strong>Accredited Financial Institutions & NBFCs:</strong> Only upon your explicit request for solar rooftop consumer loans or working capital credit lines.</li>
          <li><strong>Statutory & Regulatory Authorities:</strong> In compliance with valid court summons, GST audits, or law enforcement mandates.</li>
        </ul>
      </section>

      {/* 10. User Rights under DPDP Act 2023 */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
          10. Data Principal Rights & Request Procedure
        </h3>
        <p>Under the DPDP Act 2023, you retain the following statutory rights:</p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li><strong>Right to Access:</strong> Request a summary of personal and commercial data processed by Solvex.</li>
          <li><strong>Right to Correction &amp; Erasure:</strong> Request the correction of misleading or outdated details, or deletion of commercial inquiry records where obligations have ceased.</li>
          <li><strong>Right to Grievance Redressal:</strong> Submit complaints regarding data processing directly to our Grievance Officer.</li>
          <li><strong>Right to Withdraw Consent:</strong> Revoke consent for optional analytics at any time via our footer &ldquo;Privacy &amp; Cookie Settings&rdquo; link, which immediately stops all future telemetry collection.</li>
        </ul>
        <div className="p-3 rounded-lg bg-zinc-50 border border-black/10 text-xs text-zinc-600 space-y-1">
          <p className="font-semibold text-zinc-900">How to Submit a Rights Request:</p>
          <p>Email our Legal Desk at <code>Infosolvexenergysoltuion@gmail.com</code> with the subject &ldquo;DPDP Rights Request&rdquo; along with your commercial enquiry reference number (e.g. SLX-PRD-XXXX). We verify identity using the registered email/mobile number to avoid demanding unnecessary identity documents. Requests are processed within 30 days as provided under applicable law.</p>
        </div>
      </section>

      {/* 11. Grievance Redressal Officer */}
      <section className="p-4 rounded-xl bg-zinc-100/80 border border-black/10 space-y-1.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
          Grievance Redressal &amp; Data Protection Officer
        </h4>
        <p className="text-xs text-zinc-600 leading-relaxed font-mono">
          Attention: Grievance Redressal Officer [DPO Designation]<br />
          Solvex Energy Solutions Private Limited<br />
          F-5A Shyam Nagar, EX Shiv Sadan, Jaipur 302019, Rajasthan, India<br />
          Email: Infosolvexenergysoltuion@gmail.com | Direct Line: +91-91251-27755
        </p>
      </section>
    </div>
  );
}

/**
 * Enterprise Terms & Conditions Content
 * Comprehensive coverage: Website usage, enquiries, quotations, pricing, GST, shipping, warranties, refunds, partner terms, liability.
 */
export function TermsOfServiceContent() {
  return (
    <div className="space-y-6 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
      {/* Overview Notice */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-100 border border-black/10 text-zinc-900 flex items-start gap-3">
        <Scale className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed">
          <strong>Commercial Governance & Master Terms:</strong> These Terms of Service govern your access to the Solvex Energy Solutions commercial portal, hardware spec sheets, quotation requests, and commercial partner onboarding agreements.
        </p>
      </div>

      {/* 1. Website Usage & Intellectual Property */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
          1. Authorized Portal Usage & Proprietary Rights
        </h3>
        <p>
          By accessing this website, requesting product specifications, or utilizing our Solar ROI Calculator, you agree to comply with these Terms. All proprietary content, including &ldquo;Solvex&rdquo; trademarks, industrial PCB topologies, rMPPT firmware documentation, high-yield combo configurations, and technical brochures, remain the sole intellectual property of <strong>Solvex Energy Solutions Private Limited</strong>.
        </p>
        <p className="text-zinc-600">
          You agree not to decompile, reverse-engineer, systematically scrape, copy, or distribute our technical assets without express prior written authorization.
        </p>
      </section>

      {/* 2. Product Enquiries & Quotation Validity */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-emerald-700 shrink-0" />
          2. Product Enquiries & Quotation Validity
        </h3>
        <p>
          Technical spec sheets, system sizing simulations, and preliminary savings projections are provided for engineering assessment purposes. Formal commercial quotations generated by Solvex are strictly valid for <strong>15 calendar days</strong> from the date of issuance, after which prices may be adjusted to reflect prevailing silicon wafer, copper, aluminium, and international semiconductor commodity indices.
        </p>
      </section>

      {/* 3. Pricing, Commercial Availability & Batch Runs */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
          3. Wholesale Pricing & Stock Availability
        </h3>
        <p>
          All commercial pricing listed on the portal represents indicative wholesale ex-factory rates in Indian Rupees (INR) for certified partners. Solvex reserves the right to revise catalog specifications, hardware models, and batch minimum order quantities (MOQs) without prior notice. Orders are confirmed only upon receipt of an authorized Purchase Order (PO) and clearance of commercial payment terms.
        </p>
      </section>

      {/* 4. Goods and Services Tax (GST) & Invoicing */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-emerald-700 shrink-0" />
          4. Goods and Services Tax (GST) & Fiscal Compliance
        </h3>
        <p>
          All dispatches are accompanied by tax-compliant GST invoices and electronic waybills (e-Way Bills). Goods and Services Tax (GST) is levied at statutory rates:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>12% on complete Grid-Interactive Solar Photovoltaic Generating Packages (SPGS) and solar modules under statutory concessional notifications.</li>
          <li>18% on standalone inverters, electronic spares, balance-of-system hardware, and consultancy services.</li>
        </ul>
        <p className="text-zinc-600">
          B2B purchasers must furnish a valid, active GSTIN at the time of purchase order submission to ensure eligible Input Tax Credit (ITC) reflection in GSTR-2B.
        </p>
      </section>

      {/* 5. Shipping, Logistics & Transit Insurance */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
          5. Shipping, Logistics & Consignment Inspection
        </h3>
        <p>
          Shipments are executed under Ex-Factory or Freight On Road (FOR) terms as documented in the bilateral sales contract. Solvex ensures transit insurance coverage up to physical handover at the designated delivery terminal.
        </p>
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <strong>Mandatory Unboxing Protocol:</strong> The recipient must inspect crate seals and outer packaging upon delivery. Any visible transit damage, glass fracture, or shortages must be explicitly endorsed on the carrier Proof of Delivery (POD) and reported to Solvex within <strong>48 hours</strong> accompanied by unboxing photographs and video footage.
        </div>
      </section>

      {/* 6. Manufacturer Warranties & MNRE ALMM Standards */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          6. Warranties & MNRE ALMM Compliance
        </h3>
        <p>
          Solvex equipment complies with Ministry of New and Renewable Energy (MNRE) Approved Models and Manufacturers (ALMM) mandates, Bureau of Indian Standards (BIS), and IEC certifications:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li><strong>Bifacial Solar Modules:</strong> 10–12 years limited product workmanship warranty and 25–30 years linear power output degradation warranty (&ge;80% rated yield at Year 25/30).</li>
          <li><strong>Solar Inverters & PCU Units:</strong> 2 to 5 years standard manufacturer warranty covering electronic component replacement or factory repair.</li>
          <li><strong>Exclusions:</strong> Warranties do not cover damage resulting from direct lightning strikes, improper earthing/grounding, grid surge levels beyond rated tolerances, external physical impact, unauthorized firmware flashing, or water ingress exceeding IP ratings.</li>
        </ul>
      </section>

      {/* 7. Cancellations, Returns & Refunds */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-emerald-700 shrink-0" />
          7. Commercial Cancellations, Returns & RMA Process
        </h3>
        <p>
          Due to the custom-engineered nature of high-capacity clean energy equipment:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>B2B wholesale purchase orders cannot be cancelled once manufacturing batch allocation or freight dispatch has commenced.</li>
          <li>Pre-dispatch cancellation requests accepted at Solvex&apos;s sole discretion may incur a restocking and administrative charge of up to 10% of total order value.</li>
          <li>Defective units under warranty must be routed through our Return Merchandise Authorization (RMA) process for testing and certified factory restoration.</li>
        </ul>
      </section>

      {/* 8. Partner Programme Terms */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-emerald-700 shrink-0" />
          8. Channel Partner, Dealer & Distributor Governance
        </h3>
        <p>
          Submitting a partnership application does not confer automatic dealership or territorial rights. Official commercial partnership is finalized exclusively upon execution of a bilateral Master Franchise Agreement. Partners agree to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-zinc-600">
          <li>Maintain authorized technical training standards for rooftop EPC installations.</li>
          <li>Adhere strictly to designated district non-compete geographic boundaries.</li>
          <li>Refrain from dealing in unauthorized, refurbished, or counterfeit components under the Solvex trademark.</li>
        </ul>
      </section>

      {/* 9. Disclaimers & Subsidy Estimates */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-emerald-700 shrink-0" />
          9. Operational Disclaimers & Government Subsidies
        </h3>
        <p className="text-zinc-600">
          Energy yield estimates on this website are modeled based on Standard Test Conditions (STC: 1000 W/m&sup2;, 25&deg;C cell temperature, AM 1.5). Actual daily kilowatt-hour generation fluctuates according to local weather, shading, seasonal irradiation, and DISCOM grid uptime.
        </p>
        <p className="text-zinc-600">
          Government subsidies (including up to ₹78,000 for residential systems under PM Surya Ghar Muft Bijli Yojana) are disbursed directly by central and state nodal authorities via Direct Benefit Transfer (DBT). Solvex acts solely as a certified equipment manufacturer/EPC facilitator and assumes no liability for administrative delays by electricity boards or government treasury departments.
        </p>
      </section>

      {/* 10. Limitation of Liability */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
          10. Limitation of Liability & Force Majeure
        </h3>
        <p className="text-zinc-600">
          To the maximum extent permissible under Indian law, Solvex Energy Solutions Private Limited shall not be liable for any indirect, consequential, punitive, or incidental damages, including loss of power generation revenue, grid tariff credits, or business interruption. Our total aggregate liability under any claim shall not exceed the net purchase price paid for the specific hardware unit giving rise to the claim.
        </p>
        <p className="text-zinc-600">
          Neither party shall be liable for delivery or fulfillment delays caused by Force Majeure events, including natural catastrophes, severe grid failures, statutory embargoes, or raw material supply chain disruptions beyond reasonable control.
        </p>
      </section>

      {/* 11. Governing Law & Dispute Resolution */}
      <section className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-zinc-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
          11. Governing Law & Arbitration
        </h3>
        <p className="text-zinc-600">
          These Terms of Service and all commercial purchase contracts are governed by and construed in accordance with the laws of the Republic of India. Any controversy, dispute, or claim arising out of commercial relationships shall be submitted to binding arbitration in Surat, Gujarat, in accordance with the Arbitration and Conciliation Act, 1996. The competent civil courts situated in <strong>Surat, Gujarat, India</strong> shall possess exclusive jurisdiction.
        </p>
      </section>
    </div>
  );
}

/**
 * Unified shadcn Dialog for Privacy Policy & Terms of Service with Tabbed Navigation
 */
export function LegalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<LegalTab>("privacy");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: LegalTab }>;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
      setIsOpen(true);
    };

    window.addEventListener("open-legal-modal", handleOpen);
    return () => {
      window.removeEventListener("open-legal-modal", handleOpen);
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border-black/10 bg-white shadow-2xl">
        {/* Header with Title and Description */}
        <DialogHeader className="px-6 sm:px-8 py-5 border-b border-black/10 bg-zinc-50/80 text-left">
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                {activeTab === "privacy"
                  ? "Commercial Privacy & Data Protection"
                  : "Commercial Terms of Service"}
              </DialogTitle>
              <DialogDescription className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Solvex Energy Solutions Private Limited • Surat, Gujarat (DPDP Act 2023 Compliant)
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Tab Switcher */}
        <div className="flex border-b border-black/10 bg-zinc-100/50 px-6 sm:px-8 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("privacy")}
            className={cn(
              "py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0",
              activeTab === "privacy"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            )}
          >
            Privacy Policy (DPDP 2023)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={cn(
              "py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0",
              activeTab === "terms"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-xs"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            )}
          >
            Terms of Commercial Service
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-200px)] flex-1">
          {activeTab === "privacy" ? (
            <PrivacyPolicyContent />
          ) : (
            <TermsOfServiceContent />
          )}
        </div>

        {/* Dialog Footer Actions */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-t border-black/10 bg-zinc-50">
          <span className="text-[11px] text-zinc-500 font-mono">
            CIN: U43219GJ2025PTC168167
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              I Understand & Acknowledge
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dedicated Privacy Policy Dialog (shadcn Dialog wrapper)
 */
export function PrivacyPolicyDialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border-black/10 bg-white shadow-2xl">
        <DialogHeader className="px-6 sm:px-8 py-5 border-b border-black/10 bg-zinc-50/80 text-left">
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                Commercial Privacy & Data Protection
              </DialogTitle>
              <DialogDescription className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Solvex Energy Solutions Private Limited (DPDP Act 2023 Compliant)
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-180px)] flex-1">
          <PrivacyPolicyContent />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-t border-black/10 bg-zinc-50">
          <span className="text-[11px] text-zinc-500 font-mono">
            CIN: U43219GJ2025PTC168167
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Close Policy
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dedicated Terms & Conditions Dialog (shadcn Dialog wrapper)
 */
export function TermsDialog({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 flex flex-col overflow-hidden sm:rounded-2xl border-black/10 bg-white shadow-2xl">
        <DialogHeader className="px-6 sm:px-8 py-5 border-b border-black/10 bg-zinc-50/80 text-left">
          <div className="flex items-center gap-3 pr-8">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-base sm:text-lg font-bold text-zinc-900 tracking-tight">
                Commercial Terms of Service
              </DialogTitle>
              <DialogDescription className="text-[11px] text-zinc-500 font-mono mt-0.5">
                Solvex Energy Solutions Private Limited • Legal & Franchise Governance
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-180px)] flex-1">
          <TermsOfServiceContent />
        </div>
        <div className="flex items-center justify-between px-6 sm:px-8 py-3.5 border-t border-black/10 bg-zinc-50">
          <span className="text-[11px] text-zinc-500 font-mono">
            CIN: U43219GJ2025PTC168167
          </span>
          <DialogClose asChild>
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Close Terms
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Enterprise Cookie Consent Banner (Wraps the Privacy-First ConsentBanner)
 */
export function CookieConsentBanner() {
  return <ConsentBanner />;
}
