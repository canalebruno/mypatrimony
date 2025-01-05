import styles from "./page.module.scss";

interface MonthlyBarProps {
  eur: number;
  brl: number;
  label: string;
  onClick?: () => void;
}

export default function MonthlyBar({
  eur,
  brl,
  label,
  onClick,
}: MonthlyBarProps) {
  return (
    <div
      onClick={onClick && onClick}
      className={styles.container}
      style={{ cursor: brl > 0 ? "pointer" : eur > 0 ? "pointer" : undefined }}
    >
      <div className={styles.barWrapper}>
        <div
          className={`${styles.bar} ${brl > 0 && styles.BRL}`}
          style={{
            maxHeight: `${brl * 100}%`,
          }}
        />
        <div
          className={`${styles.bar} ${eur > 0 && styles.EUR}`}
          style={{
            maxHeight: `${eur * 100}%`,
          }}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.label}>{label}</div>
    </div>
  );
}
