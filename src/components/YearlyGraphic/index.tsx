"use client";

import { usePatrimony } from "@/hooks/usePatrimony";
import MonthlyBar from "./MonthlyBar";
import styles from "./page.module.scss";
import { CompareDates } from "@/utils/Formatting";

export default function YearlyGraphic() {
  const { allRecords, selectedMonth, setSelectedMonth } = usePatrimony();

  function filterRecords(month: number, currency: "BRL" | "EUR") {
    return allRecords
      .filter((r) => {
        return (
          CompareDates(
            r.date,
            new Date(
              new Date().setFullYear(
                new Date(selectedMonth).getFullYear(),
                month
              )
            )
          ) && (currency === "BRL" ? r.bank > 2 : r.bank <= 2)
        );
      })
      .reduce((acc, cur) => acc + cur.value, 0);
  }

  const monthlyOverview = [
    {
      label: "Jan",
      month: 0,
      brlTotal: filterRecords(0, "BRL"),
      eurTotal: filterRecords(0, "EUR"),
    },
    {
      label: "Fev",
      month: 1,
      brlTotal: filterRecords(1, "BRL"),
      eurTotal: filterRecords(1, "EUR"),
    },
    {
      label: "Mar",
      month: 2,
      brlTotal: filterRecords(2, "BRL"),
      eurTotal: filterRecords(2, "EUR"),
    },
    {
      label: "Abr",
      month: 3,
      brlTotal: filterRecords(3, "BRL"),
      eurTotal: filterRecords(3, "EUR"),
    },
    {
      label: "Mai",
      month: 4,
      brlTotal: filterRecords(4, "BRL"),
      eurTotal: filterRecords(4, "EUR"),
    },
    {
      label: "Jun",
      month: 5,
      brlTotal: filterRecords(5, "BRL"),
      eurTotal: filterRecords(5, "EUR"),
    },
    {
      label: "Jul",
      month: 6,
      brlTotal: filterRecords(6, "BRL"),
      eurTotal: filterRecords(6, "EUR"),
    },
    {
      label: "Ago",
      month: 7,
      brlTotal: filterRecords(7, "BRL"),
      eurTotal: filterRecords(7, "EUR"),
    },
    {
      label: "Set",
      month: 8,
      brlTotal: filterRecords(8, "BRL"),
      eurTotal: filterRecords(8, "EUR"),
    },
    {
      label: "Out",
      month: 9,
      brlTotal: filterRecords(9, "BRL"),
      eurTotal: filterRecords(9, "EUR"),
    },
    {
      label: "Nov",
      month: 10,
      brlTotal: filterRecords(10, "BRL"),
      eurTotal: filterRecords(10, "EUR"),
    },
    {
      label: "Dez",
      month: 11,
      brlTotal: filterRecords(11, "BRL"),
      eurTotal: filterRecords(11, "EUR"),
    },
  ];

  function findMax(currency: "BRL" | "EUR") {
    return monthlyOverview.reduce((acc, cur) => {
      return Math.max(acc, currency === "BRL" ? cur.brlTotal : cur.eurTotal);
    }, 0);
  }

  function handleClick(month: number) {
    const newSelection = new Date(new Date(selectedMonth).setMonth(month));

    setSelectedMonth(String(newSelection));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {monthlyOverview.map((m) => {
          return (
            <MonthlyBar
              onClick={
                m.brlTotal > 0
                  ? () => {
                      handleClick(m.month);
                    }
                  : m.eurTotal > 0
                  ? () => {
                      handleClick(m.month);
                    }
                  : undefined
              }
              month={m.month}
              key={m.label}
              label={m.label}
              brl={m.brlTotal / findMax("BRL")}
              eur={m.eurTotal / findMax("EUR")}
            />
          );
        })}
      </div>
    </div>
  );
}
