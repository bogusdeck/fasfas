import { REGISTRATION_STYLES } from '../../utils/constants';

export default function StepHeader({ title, subtitle }) {
  return (
    <div className={REGISTRATION_STYLES.header}>
      <h2 className={REGISTRATION_STYLES.title}>
        {title}
      </h2>
      <p className={REGISTRATION_STYLES.subtitle}>
        {subtitle}
      </p>
    </div>
  );
}
