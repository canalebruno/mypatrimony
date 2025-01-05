import styles from "./styles.module.scss";

interface VariationTagProps {
  currentValue: number;
  previousValue: number;
}

export default function VariationTag({
  currentValue,
  previousValue,
}: VariationTagProps) {
  const variation = currentValue / previousValue;

  if (variation === Infinity || isNaN(variation)) {
    return <></>;
  }

  const variationFormatted = new Intl.NumberFormat("pt-BR", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(variation > 1 ? variation - 1 : 1 - variation);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: `var(--${variation > 1 ? "green" : "red"})` }}
    >{`${variation > 1 ? "+" : "-"} ${variationFormatted}`}</div>
  );
}
