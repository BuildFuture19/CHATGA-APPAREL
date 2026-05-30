import SiteHeader from './components/SiteHeader.tsx';
import SiteFooter from './components/SiteFooter.tsx';

const PRINCIPLES = [
  { index: '01', label: 'Responsible Sourcing' },
  { index: '02', label: 'Exceptional Quality' },
  { index: '03', label: 'Transparent Production' },
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full bg-[#FAFAF9] font-['Inter'] text-[#1C1917]">
      <SiteHeader />

      <main className="mx-auto w-full">
        {/* Editorial hero */}
        <section className="px-[clamp(1rem,4vw,3rem)] pb-[clamp(2.5rem,7vw,5rem)] pt-[clamp(2.5rem,7vw,5rem)]">
          <p className="mb-6 font-medium text-[11px] uppercase tracking-[0.14em] text-[#A8A29E]">About</p>
          <h1 className="max-w-[20ch] font-serif text-[clamp(2.25rem,6vw,3.75rem)] font-normal leading-[1.12] tracking-tight text-[#1C1917]">
            Our Story — Crafting the Modern Uniform
          </h1>
          <div
            className="mt-[clamp(2rem,6vw,4rem)] aspect-[21/9] w-full border border-[#E7E5E4] bg-[#F5F5F4]"
            role="img"
            aria-label="Dramatic narrative photography placeholder"
          />
        </section>

        {/* Brand manifesto */}
        <section className="border-t border-[#E7E5E4]/80 px-[clamp(1rem,4vw,3rem)] py-[clamp(3rem,8vw,6rem)]">
          <div className="grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-2 lg:gap-x-[clamp(2rem,8vw,6rem)]">
            <div className="lg:pt-1">
              <p className="font-bold text-[10px] uppercase tracking-[0.16em] text-[#1C1917]">
                The Chatga Manifesto
              </p>
            </div>
            <div className="space-y-[clamp(1.25rem,3vw,1.75rem)]">
              <p className="text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-normal leading-[1.75] text-[#57534E]">
                Chatga was founded on a simple conviction: the modern wardrobe deserves fewer pieces, made with
                greater intention. We design for continuity — silhouettes that feel current season after season,
                without surrendering to disposability.
              </p>
              <p className="text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-normal leading-[1.75] text-[#57534E]">
                Our Chatga practice slow fashion as a discipline, not a slogan. Each garment is cut from
                responsibly sourced natural fibers, constructed with sustainable tailoring methods, and finished by
                artisans who measure quality in decades, not quarters.
              </p>
              <p className="text-[clamp(0.9375rem,1.6vw,1.0625rem)] font-normal leading-[1.75] text-[#57534E]">
                We believe transparency is the new luxury. From fiber origin to final stitch, we share how every piece
                is made — so you can invest in clothing that aligns with your values and endures beyond the trend cycle.
              </p>
            </div>
          </div>
        </section>

        {/* Core principles */}
        <section className="border-t border-[#E7E5E4]/80 px-[clamp(1rem,4vw,3rem)] py-[clamp(2.5rem,6vw,4rem)]">
          <ul className="flex flex-col divide-y divide-[#E7E5E4] md:flex-row md:divide-x md:divide-y-0">
            {PRINCIPLES.map((principle) => (
              <li
                key={principle.index}
                className="flex flex-1 flex-col gap-3 py-[clamp(1.5rem,4vw,2rem)] md:px-[clamp(1rem,4vw,2.5rem)] md:first:pl-0 md:last:pr-0"
              >
                <span className="font-serif text-[clamp(1.5rem,3vw,2rem)] font-normal leading-none text-[#A8A29E]">
                  {principle.index}
                </span>
                <span className="text-[13px] font-medium uppercase tracking-[0.1em] text-[#1C1917]">
                  {principle.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
