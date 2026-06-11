const MARQUEE_ITEMS = [
  'Java',
  'Kotlin',
  'Spring Boot',
  'Kafka',
  'Apache Flink',
  'AWS',
  'Kubernetes',
  'Quarkus',
];

export default function Marquee() {
  const sequence = MARQUEE_ITEMS.map((item) => `${item} ✦ `).join('');

  return (
    <div
      className="relative z-10 -rotate-1 overflow-hidden border-y border-foreground bg-flame py-3 sm:py-4"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap font-display text-xl uppercase tracking-wide text-background sm:text-3xl">
        <span className="pr-2">{sequence}</span>
        <span className="pr-2">{sequence}</span>
      </div>
    </div>
  );
}
