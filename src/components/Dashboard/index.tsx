"use client";

import AddNewRecord from "../AddNewRecord";
import CurrencyTotalCard from "../CurrencyTotalCard";
import { useEffect } from "react";
import styles from "./page.module.scss";
import RecordCard from "../RecordCard";
import { usePatrimony } from "@/hooks/usePatrimony";
import YearlyGraphic from "../YearlyGraphic";
import { useController } from "@/hooks/useController";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { allRecords, selectedMonth, setSelectedMonth, recordsByMonth } =
    usePatrimony();

  const { getBanks, getExchange, getRecords } = useController();

  const session = useSession();

  console.log(session);

  useEffect(() => {
    getRecords();
    getBanks();
    getExchange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.controller}>
        <select
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
        >
          <option value="2024-5">Maio</option>
          <option value="2024-6">Junho</option>
          <option value="2024-7">Julho</option>
          <option value="2024-8">Agosto</option>
          <option value="2024-9">Setembro</option>
          <option value="2024-10">Outubro</option>
          <option value="2024-11">Novembro</option>
          <option value="2024-12">Dezembro</option>
        </select>
        <AddNewRecord />
      </div>

      {allRecords && (
        <div className={styles.totalHeader}>
          <CurrencyTotalCard
            currency={"BRL"}
            records={allRecords}
            currentMonth={selectedMonth}
          />
          <CurrencyTotalCard
            currency={"EUR"}
            records={allRecords}
            currentMonth={selectedMonth}
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
