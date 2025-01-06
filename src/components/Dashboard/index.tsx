"use client";

import AddNewRecord from "../AddNewRecord";
import CurrencyTotalCard from "../CurrencyTotalCard";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import RecordCard from "../RecordCard";
import { usePatrimony } from "@/hooks/usePatrimony";
import YearlyGraphic from "../YearlyGraphic";
import { useController } from "@/hooks/useController";
import { InputMonthFormat } from "@/utils/Formatting";

export default function Dashboard() {
  const { allRecords, selectedMonth, setSelectedMonth, recordsByMonth } =
    usePatrimony();

  const { getBanks, getExchange, getRecords } = useController();

  const [minMonth, setMinMonth] = useState(InputMonthFormat(new Date()));

  useEffect(() => {
    getRecords();
    getBanks();
    getExchange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function getMinMonth() {
      const sortedArray = allRecords.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        } else if (a.date > b.date) {
          return 1;
        } else {
          return 0;
        }
      });

      return InputMonthFormat(sortedArray[0].date);
    }

    if (allRecords.length > 0) {
      setMinMonth(getMinMonth());
    }
  }, [allRecords]);

  return (
    <>
      <div className={styles.controller}>
        <input
          type="month"
          value={InputMonthFormat(new Date(selectedMonth))}
          onChange={(e) => setSelectedMonth(String(new Date(e.target.value)))}
          max={InputMonthFormat(new Date())}
          min={minMonth}
        />
        <AddNewRecord />
      </div>

      {allRecords && (
        <div className={styles.totalHeader}>
          <CurrencyTotalCard
            currency={"BRL"}
            records={allRecords}
            currentMonth={new Date(selectedMonth)}
          />
          <CurrencyTotalCard
            currency={"EUR"}
            records={allRecords}
            currentMonth={new Date(selectedMonth)}
          />
        </div>
      )}

      <YearlyGraphic />

      <div className={styles.recordsList}>
        {recordsByMonth &&
          recordsByMonth.map((record) => {
            return <RecordCard key={record._id} record={record} />;
          })}
      </div>
    </>
  );
}
