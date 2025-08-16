import { FEATURES_CONTENT, FEATURES_STYLES } from '../utils/constants.js';

// Icon components
const LightningIcon = () => (
  <svg className={FEATURES_STYLES.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg className={FEATURES_STYLES.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const HeartIcon = () => (
  <svg className={FEATURES_STYLES.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  </svg>
);

const ChartIcon = () => (
  <svg className={FEATURES_STYLES.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
  </svg>
);

const GlobeIcon = () => (
  <svg className={FEATURES_STYLES.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const PackageIcon = () => (
  <svg className={FEATURES_STYLES.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
  </svg>
);

// Icon mapping
const iconMap = {
  lightning: LightningIcon,
  check: CheckIcon,
  heart: HeartIcon,
  chart: ChartIcon,
  globe: GlobeIcon,
  package: PackageIcon,
};

// Brand color mapping for icon containers using primary (#241331) and secondary (#C3AF6C)
const colorMap = {
  blue: 'bg-[#241331]/10 text-[#241331] group-hover:bg-[#241331] group-hover:text-white',
  green: 'bg-[#C3AF6C]/10 text-[#C3AF6C] group-hover:bg-[#C3AF6C] group-hover:text-white',
  purple: 'bg-[#241331]/15 text-[#241331] group-hover:bg-[#241331] group-hover:text-white',
  indigo: 'bg-[#C3AF6C]/15 text-[#C3AF6C] group-hover:bg-[#C3AF6C] group-hover:text-white',
  teal: 'bg-[#241331]/20 text-[#241331] group-hover:bg-[#241331] group-hover:text-white',
  orange: 'bg-[#C3AF6C]/20 text-[#C3AF6C] group-hover:bg-[#C3AF6C] group-hover:text-white',
};

export default function Features() {
  return (
    <section className={FEATURES_STYLES.container}>
      {/* Section Header */}
      <div className={FEATURES_STYLES.header}>
        <h2 className={FEATURES_STYLES.headerTitle}>
          Everything You Need to Succeed
        </h2>
        <p className={FEATURES_STYLES.headerSubtitle}>
          Our comprehensive platform provides all the tools and support you need to launch, manage, and grow your brand successfully.
        </p>
      </div>

      {/* Features Grid */}
      <div className={FEATURES_STYLES.grid}>
        {FEATURES_CONTENT.map((feature) => {
          const IconComponent = iconMap[feature.icon];
          const iconColorClass = colorMap[feature.iconColor];
          
          return (
            <div key={feature.id} className={FEATURES_STYLES.featureCard}>
              <div className={`${FEATURES_STYLES.iconContainer} ${iconColorClass}`}>
                <IconComponent />
              </div>
              <h3 className={FEATURES_STYLES.title}>{feature.title}</h3>
              <p className={FEATURES_STYLES.description}>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
