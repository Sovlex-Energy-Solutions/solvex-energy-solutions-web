"use client";

import {
  Compass,
  CheckCircle2,
  Calendar,
  Sparkles,
  Shield,
  Layers,
} from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function CompanyStorySection() {
  const { isHindi } = useLanguage();

  const milestones = [
    {
      year: "2019",
      title: isHindi ? "सूरत में स्थापना" : "Genesis in Surat",
      desc: isHindi
        ? "गुजरात के औद्योगिक केंद्र सूरत में उच्च-दक्षता पावर इलेक्ट्रॉनिक्स और इनवर्टर तकनीक के विनिर्माण के साथ नींव रखी गई।"
        : "Founded in the industrial powerhouse of Surat, Gujarat, pioneering high-efficiency power electronics and inverter conversion topologies.",
    },
    {
      year: "2021",
      title: isHindi ? "स्मार्ट rMPPT और PCU विस्तार" : "Smart rMPPT & PCU Expansion",
      desc: isHindi
        ? "औद्योगिक और भारी भार के लिए भारत की पहली शुद्ध साइन-वेव डिजिटल rMPPT सोलर पीसीयू श्रृंखला का शुभारंभ।"
        : "Launched heavy-duty pure sine wave digital rMPPT solar PCUs engineered specifically for Indian grid fluctuations and harsh climates.",
    },
    {
      year: "2023",
      title: isHindi ? "ALMM टियर-1 और डिस्कॉम प्रमाणीकरण" : "ALMM Tier-1 & Grid Integration",
      desc: isHindi
        ? "एमएनआरई की एएलएमएम सूची में स्थान प्राप्त किया तथा सभी प्रमुख राज्य डिस्कॉम में द्विदिशी नेट-मीटरिंग अनुमोदन हासिल किए।"
        : "Secured full ALMM Tier-1 enlistment from MNRE and turnkey bi-directional net-metering approvals across major state electricity boards.",
    },
    {
      year: "2024",
      title: isHindi ? "1 GW क्षमता और पीएम सूर्य घर" : "1 GW Scale & PM Surya Ghar",
      desc: isHindi
        ? "1 GW वार्षिक फोटोवोल्टाइक उत्पादन क्षमता का उद्घाटन और 500+ फ्रेंचाइज पार्टनर्स के साथ राष्ट्रीय अभियान का विस्तार।"
        : "Inaugurated a multi-line automated manufacturing line scaling toward 1+ GW output, powering the nationwide PM Surya Ghar mission.",
    },
    {
      year: "2025+",
      title: isHindi ? "हाइब्रिड ऊर्जा और बैटरी स्टोरेज" : "Next-Gen Multi-Tech Ecosystem",
      desc: isHindi
        ? "सोलर, पवन, और कंटेनराइज्ड बैटरी ऊर्जा भंडारण (BESS) के साथ वाणिज्यिक एवं औद्योगिक ग्राहकों के लिए शून्य-कार्बन भविष्य।"
        : "Expanding into utility-scale solar-wind hybrid parks and containerized BESS storage, driving 100% renewable corporate transitions.",
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden" id="our-story">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-16">
        {/* Section Header */}
        <MotionReveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-black/10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary w-fit text-xs font-medium tracking-[-0.1px]">
              <Compass className="w-3.5 h-3.5" />
              <span>{isHindi ? "हमारी कहानी और दृष्टिकोण" : "Our Genesis & Trajectory"}</span>
            </div>
            <h2 className="headline-md text-3xl sm:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
              {isHindi
                ? "गुजरात के विनिर्माण हब से अखिल भारतीय क्लीन एनर्जी क्रांति तक"
                : "From Gujarat’s Industrial Heartland to a Pan-India Clean Energy Force"}
            </h2>
          </div>
          <p className="body-md text-base text-[#71717A] max-w-md font-normal leading-relaxed tracking-[-0.2px]">
            {isHindi
              ? "Solvex की स्थापना एक स्पष्ट उद्देश्य के साथ हुई: आयातित व असंबद्ध हार्डवेयर के स्थान पर भारत की जलवायु के अनुरूप प्रमाणित, विश्वसनीय और अत्यधिक टिकाऊ सोलर अवसंरचना प्रदान करना।"
              : "Solvex was born with a singular objective: replace disjointed clean tech supply chains with indigenously engineered, climate-hardened solar hardware backed by airtight compliance."}
          </p>
        </MotionReveal>

        {/* Narrative Split: Visual Gallery + Detailed Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Dual Visual Showcase Card */}
          <MotionReveal className="lg:col-span-6 flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden border border-black/10 shadow-md group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/slider/slide1_1gw_inauguration.jpeg"
                alt="Solvex 1 GW Manufacturing Inauguration"
                className="w-full h-72 sm:h-80 object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  {isHindi ? "अत्याधुनिक विनिर्माण" : "Industrial Manufacturing Plant"}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-white mt-0.5">
                  {isHindi ? "1 GW वार्षिक फोटोवोल्टाइक उत्पादन क्षमता" : "1 GW Automated Photovoltaic Production Line"}
                </h3>
              </div>
            </div>

            {/* Sub-cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-black/10 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/slider/slide7_manufacturing.jpg"
                  alt="Precision Robotic Assembly"
                  className="w-full h-36 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-xs font-medium text-white">
                  {isHindi ? "रोबोटिक स्ट्रिंगिंग व असेंबली" : "Robotic Stringing Precision"}
                </span>
              </div>

              <div className="rounded-xl overflow-hidden border border-black/10 relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/solar_team_1.jpeg"
                  alt="Solvex Field Engineers"
                  className="w-full h-36 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3 text-xs font-medium text-white">
                  {isHindi ? "टर्नकी फील्ड इंजीनियरिंग टीम" : "Turnkey Field Engineering"}
                </span>
              </div>
            </div>
          </MotionReveal>

          {/* Right: Editorial Narrative + Credo */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <MotionReveal className="flex flex-col gap-4">
              <span className="text-xs uppercase font-mono tracking-widest text-[#059669]">
                {isHindi ? "गुणवत्ता और अखंडता का संकल्प" : "Our Engineering Philosophy"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-[#18181B] tracking-tight leading-snug">
                {isHindi
                  ? "सोलर तकनीक केवल पैनल जोड़ने का नाम नहीं है — यह 25 वर्षों के निर्बाध विद्युत उत्पादन का वादा है।"
                  : "Solar is not merely assembling panels — it is an unconditional 25-year promise of relentless generation."}
              </h3>
              <p className="body-md text-base text-[#71717A] leading-relaxed font-normal">
                {isHindi
                  ? "भारत के अधिकांश हिस्सों में सौर ऊर्जा संयंत्रों को 48°C से अधिक तापमान, धूल, और तटीय चक्रवातों का सामना करना पड़ता है। इसीलिए Solvex अपने प्रत्येक बाइफेशियल मॉड्यूल और इन्वर्टर को कठोर एंटी-PID कोटिंग्स, रोबोटिक सोल्डरिंग और 150 किमी/घंटा तक की विंड शीयर सुरक्षा के साथ निर्मित करता है।"
                  : "Indian geographic environments subject solar arrays to 48°C+ peak temperatures, corrosive industrial particulate, and violent monsoon wind shear. Solvex counters these harsh dynamics with proprietary low-thermal-coefficient TOPCon silicon, multi-stage electroluminescence diagnostics, and marine-grade anodized aluminum frames."}
              </p>
            </MotionReveal>

            {/* Highlights Checkmark List */}
            <MotionStagger className="flex flex-col gap-3 pt-2">
              {[
                {
                  title: isHindi ? "शून्य माइक्रो-क्रैक सहनशीलता" : "Zero Micro-Crack Tolerance",
                  desc: isHindi
                    ? "प्रत्येक सेल का बहु-स्तरीय इलेक्ट्रो-ल्यूमिनेसेंस (EL) स्कैनिंग परीक्षण।"
                    : "Multi-stage automated optical and EL scanning before vacuum lamination.",
                },
                {
                  title: isHindi ? "संपूर्ण डिस्कॉम द्विदिशी स्वीकृति" : "DISCOM Bi-Directional Synchronization",
                  desc: isHindi
                    ? "राज्य विद्युत मंडलों से सहज नेट-मीटरिंग और लोड स्वीकृति प्रक्रिया।"
                    : "Streamlined liaison ensuring consumer meters synchronize without red tape.",
                },
                {
                  title: isHindi ? "उद्यमी समृद्धि मॉडल" : "Franchise Wealth Creation Ecosystem",
                  desc: isHindi
                    ? "क्षेत्रीय ऊर्जा उद्यमियों को सीधा फ़ैक्टरी मूल्य, तकनीकी प्रशिक्षण व सहायता।"
                    : "Empowering regional partners with direct factory tier-1 pricing and turnkey lead dispatch.",
                },
              ].map((item, i) => (
                <MotionItem
                  key={i}
                  className="p-3.5 rounded-xl border border-black/5 bg-[#FAFAFA] flex items-start gap-3 transition-colors hover:bg-zinc-100/70"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#18181B]">{item.title}</span>
                    <span className="text-xs text-[#71717A] leading-relaxed">{item.desc}</span>
                  </div>
                </MotionItem>
              ))}
            </MotionStagger>
          </div>
        </div>

        {/* Chronological Milestones Timeline */}
        <div className="pt-8 flex flex-col gap-8">
          <MotionReveal className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#059669]">
              {isHindi ? "विकास यात्रा" : "Strategic Milestones"}
            </span>
            <h3 className="text-2xl font-normal tracking-tight text-[#18181B]">
              {isHindi ? "निरंतर तकनीकी प्रगति के प्रमुख पड़ाव" : "Key Chapters in Our Ongoing Growth"}
            </h3>
          </MotionReveal>

          <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {milestones.map((m, idx) => (
              <MotionItem
                key={idx}
                className="p-5 rounded-2xl border border-black/10 bg-[#FAFAFA] flex flex-col gap-3 hover:border-emerald-500/40 hover:bg-white hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                  <span className="text-2xl font-bold font-mono text-[#059669] tracking-tight">
                    {m.year}
                  </span>
                  <Calendar className="w-4 h-4 text-zinc-400" />
                </div>
                <h4 className="text-sm font-medium text-[#18181B] tracking-tight">{m.title}</h4>
                <p className="text-xs text-[#71717A] leading-relaxed font-normal">{m.desc}</p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>
      </div>
    </section>
  );
}
