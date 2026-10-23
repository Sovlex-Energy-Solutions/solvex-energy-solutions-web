"use client";

import {
  MapPin,
  Building,
  Truck,
  PhoneCall,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function NationalReachSection() {
  const { isHindi } = useLanguage();

  const hubs = [
    {
      state: "Gujarat",
      city: "Surat & Ahmedabad",
      role: isHindi ? "कॉर्पोरेट मुख्यालय व विनिर्माण परिसर" : "Corporate HQ & Manufacturing Campus",
      desc: isHindi
        ? "1 GW स्वचालित उत्पादन लाइनें, आरएंडडी प्रयोगशालाएं और केंद्रीय लॉजिस्टिक्स वेयरहाउस।"
        : "1+ GW multi-line automated production facility, advanced testing laboratory, and central distribution hub.",
      status: "Operational HQ",
    },
    {
      state: "Rajasthan",
      city: "Jaipur & Jodhpur",
      role: isHindi ? "यूटिलिटी और ओपन-एक्सेस हब" : "Utility Scale & Open-Access Hub",
      desc: isHindi
        ? "उच्च-विकिरण क्षेत्रों में टर्नकी मेगावाट-स्केल परियोजनाएं और औद्योगिक कैप्टिव सोलर प्लांट्स।"
        : "High-irradiance utility park engineering, commercial open-access generation, and ground-mount arrays.",
      status: "Regional EPC Center",
    },
    {
      state: "Maharashtra",
      city: "Mumbai & Pune Corridor",
      role: isHindi ? "सी एंड आई औद्योगिक डीकार्बोनाइजेशन" : "Commercial & Industrial Decarbonization",
      desc: isHindi
        ? "औद्योगिक कारखानों, गोदामों और कॉरपोरेट परिसरों के लिए उच्च-दक्षता रूफटॉप सौर समाधान।"
        : "Turnkey rooftop PV arrays for corporate manufacturing plants, logistics hubs, and industrial estates.",
      status: "C&I Hub",
    },
    {
      state: "North & Central India",
      city: "Indore, Lucknow & Delhi NCR",
      role: isHindi ? "पीएम सूर्य घर आवासीय विस्तार" : "PM Surya Ghar Consumer Expansion",
      desc: isHindi
        ? "500+ फ्रेंचाइज पार्टनर्स के साथ तीव्र आवासीय रूफटॉप इंस्टॉलेशन और डिस्कॉम नेट-मीटरिंग।"
        : "Expansive franchise partner network executing fast-track consumer rooftop installations and net-metering.",
      status: "Franchise Corridor",
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="national-presence">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-14">
        {/* Header */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary w-fit text-xs font-medium tracking-[-0.1px]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isHindi ? "अखिल भारतीय उपस्थिति" : "Pan-India Reach"}</span>
            </div>
            <h2 className="headline-md text-3xl sm:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {isHindi
                ? "देश के हर कोने में तकनीकी उत्कृष्टता और त्वरित सेवा"
                : "A Nationally Distributed Network Backed by On-Ground Engineers"}
            </h2>
          </div>
          <p className="body-md text-base text-[#71717A] max-w-md font-normal leading-relaxed tracking-[-0.2px]">
            {isHindi
              ? "सूरत स्थित मुख्यालय से लेकर राजस्थान, महाराष्ट्र, मध्य प्रदेश और उत्तर प्रदेश तक, हमारी टीमें स्थानीय स्तर पर तैनात हैं।"
              : "From our Surat headquarters to regional hubs across key states, Solvex ensures reliable hardware supply and prompt engineering support."}
          </p>
        </MotionReveal>

        {/* Regional Hubs Bento Grid */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, idx) => (
            <MotionItem
              key={idx}
              className="p-6 rounded-2xl border border-black/10 bg-[#FAFAFA] flex flex-col justify-between gap-6 hover:border-emerald-500/40 hover:bg-white hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">
                    {hub.status}
                  </span>
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    {hub.state}
                  </span>
                  <h3 className="text-xl font-normal tracking-tight text-[#18181B] mt-0.5">
                    {hub.city}
                  </h3>
                </div>

                <span className="text-xs font-semibold text-emerald-700">
                  {hub.role}
                </span>

                <p className="text-xs text-[#71717A] leading-relaxed font-normal">
                  {hub.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs text-[#18181B] font-medium">
                <span>Active Network</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Solar Care 360 Feature Callout */}
        <MotionReveal className="rounded-2xl p-6 sm:p-8 bg-[#0B0F17] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-emerald-500/15 to-transparent pointer-events-none" />

          <div className="flex flex-col gap-2 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-400 uppercase">
              <Clock className="w-3.5 h-3.5" />
              <span>Solar Care 360 Guaranteed Support</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-normal text-white tracking-tight">
              {isHindi
                ? "समर्पित 24-घंटे क्षेत्रीय फील्ड सेवा एवं टेलीमेट्री निगरानी"
                : "Dedicated Regional Service Fleet & Continuous Yield Telemetry"}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
              {isHindi
                ? "हम केवल उत्पाद नहीं बेचते — हम 25 वर्षों के निर्बाध विद्युत उत्पादन के लिए समर्पित तकनीकी टीमें और स्पेयर पार्ट्स बैकअप प्रदान करते हैं।"
                : "Every Solvex installation is backed by dedicated on-ground field service vans, regional spare depots, and rapid inverter replacement protocols."}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10">
            <a
              href="tel:+919125127755"
              className="px-6 py-3.5 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-sm font-medium inline-flex items-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>+91 91251 27755</span>
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
