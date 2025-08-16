import { REGISTRATION_PROGRESS, REGISTRATION_STYLES } from '../../utils/constants';

export default function ProgressIndicator({ currentStep }) {
  const progressPercentage = (currentStep / REGISTRATION_PROGRESS.totalSteps) * 100;

  return (
    <div className={REGISTRATION_STYLES.progressContainer}>
      <div className={REGISTRATION_STYLES.stepIndicator}>
        {REGISTRATION_PROGRESS.stepLabels.map((label, index) => (
          <span
            key={index}
            className={index + 1 === currentStep ? REGISTRATION_STYLES.currentStep : ''}
          >
            {label}
          </span>
        ))}
      </div>
      <div className={REGISTRATION_STYLES.progressBar}>
        <div
          className={REGISTRATION_STYLES.progressFill}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
