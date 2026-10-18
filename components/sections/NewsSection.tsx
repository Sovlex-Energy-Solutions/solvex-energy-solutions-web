"use client";

import { ArrowRight, Newspaper } from "lucide-react";
import { MotionReveal, MotionStagger, MotionItem } from "@/components/ui/motion-reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsSection() {
  const { t } = useLanguage();

  const newsItems = [
    {
      category: t("news.n1.category", "CENTRAL DIRECTIVE"),
      tag: t("news.n1.tag", "PM SURYA GHAR MANDATE"),
      readTime: t("news.n1.readTime", "3 MIN READ"),
      title: t("news.n1.title", "National Rooftop Solar Capital Subsidy Acceleration"),
      desc: t("news.n1.desc", "Strategic framework delivering up to ₹78,000 direct benefit transfers for residential installations, paired with concessional 7% collateral-free bank financing."),
      slug: "#partner-form",
    },
    {
      category: t("news.n2.category", "DOMESTIC SUPPLY CHAIN"),
      tag: t("news.n2.tag", "ALMM & PLI INITIATIVE"),
      readTime: t("news.n2.readTime", "5 MIN READ"),
      title: t("news.n2.title", "Mandatory ALMM Domestic Content Enforcement"),
      desc: t("news.n2.desc", "Stringent regulatory provisions enforcing DCR compliance across subsidized residential and state tenders, driving domestic TOPCon solar cell production."),
      slug: "#partner-form",
    },
    {
      category: t("news.n3.category", "CLEAN TECH INTEGRATION"),
      tag: t("news.n3.tag", "DECARBONIZATION CORRIDOR"),
      readTime: t("news.n3.readTime", "4 MIN READ"),
      title: t("news.n3.title", "Commercial C&I Open Access & Peak Power Shaving"),
      desc: t("news.n3.desc", "State regulatory revisions simplifying green open-access permits for commercial facilities exceeding 100 kW, lowering demand-charge industrial tariffs."),
      slug: "#partner-form",
    },
  ];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-gradient-to-b from-white via-[#FAFAFA] to-white overflow-hidden" id="news">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-black/10">
            <div className="flex flex-col gap-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-normal tracking-[-0.1px] w-fit">
                <Newspaper className="w-3.5 h-3.5 text-white" />
                <span>{t("news.badge", "STATUTORY & REGULATORY INTELLIGENCE")}</span>
              </div>
              <h2 className="headline-md text-3xl lg:text-4xl font-normal tracking-[-1.08px] text-[#18181B]">
                {t("news.title", "Clean Energy Directives & Policy Bulletins")}
              </h2>
              <p className="body-md text-base text-[#71717A] font-normal leading-relaxed tracking-[-0.2px]">
                {t("news.description", "Curated briefings on central MNRE notifications, DISCOM net-metering amendments, and macro renewable capital subsidies.")}
              </p>
            </div>

            <a
              href="#partner-form"
              className="group btn-secondary h-[46px] px-6 rounded-full text-xs font-normal text-[#18181B] flex items-center gap-2 shadow-xs cursor-pointer w-fit"
            >
              <span>{t("news.archiveBtn", "REGULATORY ARCHIVE")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#18181B] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </MotionReveal>

        {/* News Cards Grid - Superpower Cards 8px */}
        <MotionStagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news, i) => (
            <MotionItem key={i} className="h-full">
              <article
                className="card-superpower h-full p-6 sm:p-8 flex flex-col justify-between gap-6 group hover:border-black/30 transition-all duration-300 shadow-xs"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between pb-3 border-b border-black/10 font-sans text-xs">
                    <span className="font-normal text-white bg-primary px-3 py-1 rounded-full text-[11px]">
                      {news.category}
                    </span>
                    <span className="text-[#71717A] text-[11px]">{news.readTime}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[11px] uppercase tracking-wider text-[#71717A]">
                      {t("news.tagLabel", "TAG:")} {news.tag}
                    </span>
                    <h3 className="text-lg font-normal text-[#18181B] group-hover:text-black transition-colors tracking-[-0.4px]">
                      {news.title}
                    </h3>
                    <p className="body-sm text-xs text-[#71717A] leading-relaxed">
                      {news.desc}
                    </p>
                  </div>
                </div>

                <a
                  href={news.slug}
                  className="inline-flex items-center justify-between font-sans text-xs uppercase tracking-wider text-[#18181B] hover:text-primary pt-4 border-t border-black/10 transition-all font-normal"
                >
                  <span>{t("news.readDispatch", "Review Full Directive")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </article>
            </MotionItem>
          ))}
        </MotionStagger>
      </div>
    </section>
  );
}
