import Link from 'next/link';
import { HERO_CONTENT, HERO_STYLES } from '../utils/constants.js';

export default function Hero() {
  return (
    <section className={HERO_STYLES.container}>
      {/* Background Pattern */}
      <div className={HERO_STYLES.backgroundPattern}></div>
      
      {/* Decorative Elements */}
      <div className={HERO_STYLES.decorativeElements}></div>
      <div className={HERO_STYLES.decorativeElements2}></div>
      
      <div className={HERO_STYLES.content}>
        <div className={HERO_STYLES.innerContent}>
          <h1 className={HERO_STYLES.title}>
            {HERO_CONTENT.title}
          </h1>
          <p className={HERO_STYLES.subtitle}>
            {HERO_CONTENT.subtitle}
          </p>
          
          {/* Stats Section */}
          <div className={HERO_STYLES.statsContainer}>
            {HERO_CONTENT.stats.map((stat, index) => (
              <div key={index} className={HERO_STYLES.statItem}>
                <div className={HERO_STYLES.statValue}>{stat.value}</div>
                <div className={HERO_STYLES.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className={HERO_STYLES.buttonContainer}>
            <Link 
              href={HERO_CONTENT.buttons.primary.href}
              className={HERO_STYLES.primaryButton}
            >
              <span className="flex items-center gap-2">
                {HERO_CONTENT.buttons.primary.label}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link 
              href={HERO_CONTENT.buttons.secondary.href}
              className={HERO_STYLES.secondaryButton}
            >
              {HERO_CONTENT.buttons.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
