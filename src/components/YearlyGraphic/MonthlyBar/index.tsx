"use client";

import { usePatrimony } from "@/hooks/usePatrimony";
import styles from "./page.module.scss";

interface MonthlyBarProps {
  eur: number;
  brl: number;
  label: string;
  month: number;
  onClick?: () => void;
}

export default function MonthlyBar({
  eur,
  brl,
  label,
  month,
  onClick,
}: MonthlyBarProps) {
  const { selectedMonth } = usePatrimony();

  return (
    <div
      onClick={onClick && onClick}
      className={`${styles.container} ${
        new Date(selectedMonth).getMonth() === month && styles.selected
      }`}
      style={{ cursor: brl > 0 ? "pointer" : eur > 0 ? "pointer" : undefined }}
    >
      <div className={styles.barWrapper}>
        <div
          className={`${styles.bar} ${brl > 0 && styles.BRL}`}
          style={{
            maxHeight: brl ? `${brl * 100}%` : undefined,
          }}
        />
        <div
          className={`${styles.bar} ${eur > 0 && styles.EUR}`}
          style={{
            maxHeight: eur ? `${eur * 100}%` : undefined,
          }}
        />
      </div>
      <div className={styles.divider} />
      <div className={styles.label}>{label}</div>
    </div>
  );
}
