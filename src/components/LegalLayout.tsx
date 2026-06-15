export type LegalSection = { heading: string; paragraphs: string[] };

export default function LegalLayout({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-32 pt-40">
      <p className="eyebrow mb-6">Legal</p>
      <h1 className="font-display display-lg font-light text-paper">{title}</h1>
      <p className="mt-5 text-xs uppercase tracking-[0.2em] text-paper-dim">
        Last updated · {lastUpdated}
      </p>
      <p className="mt-8 text-lg text-paper-dim">{intro}</p>

      <div className="mt-14 space-y-12">
        {sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-display text-2xl text-paper md:text-3xl">
              {s.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {s.paragraphs.map((p, i) => (
                <p key={i} className="text-paper-dim">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
