"use client";

import {
  CompareDates,
  CurrencyFormat,
  YearMonthString,
} from "@/utils/Formatting";
import { Record } from "@/utils/Types";
import styles from "./styles.module.scss";
import VariationTag from "../VariationTag";
import { usePatrimony } from "@/hooks/usePatrimony";

interface CurrencyTotalCardProps {
  currency: string;
  records: Record[];
  currentMonth: Date;
}

export default function CurrencyTotalCard({
  currency,
  records,
  currentMonth,
}: CurrencyTotalCardProps) {
  const { allExchange } = usePatrimony();

  const currentRecords = records.filter((record) => {
    return CompareDates(record.date, currentMonth);
  });

  const currentMonthExchangeRate = allExchange.find((rate) => {
    return CompareDates(rate.date, currentMonth);
  });

  const previousRecords = records
    .filter((record) => {
      return CompareDates(
        record.date,
        new Date(
          new Date(currentMonth).setMonth(new Date(currentMonth).getMonth() - 1)
        )
      );
    })
    .filter((record) => {
      if (currency === "EUR") {
        return record.bank <= 2;
      } else {
        return record.bank > 2;
      }
    });

  const recordsByCurrency = currentRecords.filter((record) => {
    if (currency === "EUR") {
      return record.bank <= 2;
    } else {
      return record.bank > 2;
    }
  });

  const recordsByOtherCurrency = currentRecords.filter((record) => {
    if (currency === "BRL") {
      return record.bank <= 2;
    } else {
      return record.bank > 2;
    }
  });

  const total = recordsByCurrency.reduce((acc, cur) => acc + cur.value, 0);

  const totalOtherCurrencyConverted = recordsByOtherCurrency.reduce(
    (acc, cur) => acc + cur.value,
    0
  );

  function totalConverted(): number {
    if (currentMonthExchangeRate) {
      if (currency === "EUR") {
        return (
          totalOtherCurrencyConverted * currentMonthExchangeRate.value + total
        );
      } else {
        return (
          totalOtherCurrencyConverted / currentMonthExchangeRate.value + total
        );
      }
    }
    return 0;
  }

  const previousTotal = previousRecords.reduce(
    (acc, cur) => acc + cur.value,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>{currency}</div>
        <VariationTag currentValue={total} previousValue={previousTotal} />
      </div>
      <div className={styles.currencyDisplay}>
        {CurrencyFormat(total, currency)}
        {currentMonthExchangeRate && (
          <div className={styles.totalConverted}>
            BRL + EUR = {CurrencyFormat(totalConverted(), currency)}
          </div>
        )}
      </div>
    </div>
  );
}
