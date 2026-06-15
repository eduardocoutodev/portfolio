const MARQUEE_ITEMS = [
  'Java',
  'Kotlin',
  'Spring Boot',
  'Kafka',
  'Apache Flink',
  'AWS ×3',
  'Kubernetes',
  'Terraform',
  'Grafana',
];

export default function Marquee() {
  const sequence = MARQUEE_ITEMS.map((item) => item).join('   —   ');

  return (
    <div
      className="relative z-[1] overflow-hidden border-y border-foreground bg-background py-3"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] text-foreground sm:text-sm">
        <span className="pr-[3ch]">{sequence}&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;</span>
        <span className="pr-[3ch]">{sequence}&nbsp;&nbsp;&nbsp;—&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}
