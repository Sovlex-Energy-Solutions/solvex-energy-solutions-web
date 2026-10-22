import React from "react";
import {
  ShieldCheck,
  Building2,
  Database,
  PhoneCall,
  Sliders,
  Zap,
  Cookie,
  FileText,
  Lock,
  Truck,
  Scale,
} from "lucide-react";

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
