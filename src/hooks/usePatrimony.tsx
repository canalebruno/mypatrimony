"use client";

import { CompareDates, YearMonthString } from "@/utils/Formatting";
import { Bank, Exchange, Record } from "@/utils/Types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PatrimonyProviderProps {
  children: ReactNode;
}

interface PatrimonyContextData {
  setAllRecords: (records: Record[]) => void;
  allRecords: Record[];
  setAllBanks: (banks: Bank[]) => void;
  allBanks: Bank[];
  setAllExchange: (Exchange: Exchange[]) => void;
  allExchange: Exchange[];
  selectedMonth: string;
  setSelectedMonth: (s: string) => void;
  recordsByMonth: Record[];
  setRecordsByMonth: (records: Record[]) => void;
}

const PatrimonyContext = createContext<PatrimonyContextData>(
  {} as PatrimonyContextData
);

export function PatrimonyProvider({ children }: PatrimonyProviderProps) {
  const [allBanks, setAllBanks] = useState<Bank[]>([] as Bank[]);
  const [allRecords, setAllRecords] = useState<Record[]>([] as Record[]);
  const [allExchange, setAllExchange] = useState<Exchange[]>([] as Exchange[]);
  const [selectedMonth, setSelectedMonth] = useState(String(new Date()));
  const [recordsByMonth, setRecordsByMonth] = useState<Record[]>(
    [] as Record[]
  );

  useEffect(() => {
    setRecordsByMonth(
      allRecords.filter((record) => {
        return CompareDates(record.date, new Date(selectedMonth));
      })
    );
  }, [selectedMonth, allRecords]);

  return (
    <PatrimonyContext.Provider
      value={{
        allBanks,
        setAllBanks,
        allRecords,
        setAllRecords,
        allExchange,
        setAllExchange,
        recordsByMonth,
        setRecordsByMonth,
        selectedMonth,
        setSelectedMonth,
      }}
    >
      {children}
    </PatrimonyContext.Provider>
  );
}

export function usePatrimony(): PatrimonyContextData {
  const context = useContext(PatrimonyContext);

  return context;
}
