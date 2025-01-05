"use client";

import { Exchange, Record, ResponseData } from "@/utils/Types";
import { createContext, ReactNode, useContext } from "react";
import { usePatrimony } from "./usePatrimony";

interface ControllerProviderProps {
  children: ReactNode;
}

interface ControllerContextData {
  getExchange: () => void;
  getBanks: () => void;
  getRecords: () => void;
  deleteById: (id: string) => void;
  addNewRecord: (record: Omit<Record, "_id">) => void;
  addNewExchange: (exchange: Exchange) => void;
  getRecordById: (id: string) => Promise<ResponseData>;
  editRecordById: (id: string, updatedRecord: Omit<Record, "_id">) => void;
}

const ControllerContext = createContext<ControllerContextData>(
  {} as ControllerContextData
);

export function ControllerProvider({ children }: ControllerProviderProps) {
  const { setAllBanks, setAllExchange, setAllRecords } = usePatrimony();

  async function getRecords() {
    const response = await fetch(`/api/records`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (data.success) {
      setAllRecords(
        data.data.map((r: Record) => {
          return {
            ...r,
            date: new Date(r.date),
          };
        })
      );
    }
  }

  async function getBanks() {
    const response = await fetch(`/api/banks`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (data.success) {
      setAllBanks(data.data);
    }
  }

  async function getExchange() {
    const response = await fetch(`/api/exchange`, {
      cache: "no-store",
    });

    const data = await response.json();

    if (data.success) {
      setAllExchange(
        data.data.map((r: Exchange) => {
          return {
            ...r,
            date: new Date(r.date),
          };
        })
      );
    }
  }

  async function getRecordById(id: string) {
    const response = await fetch(`/api/records/${id}`, {
      cache: "no-store",
    });

    const data: ResponseData = await response.json();

    return data;
  }

  async function editRecordById(
    id: string,
    updatedRecord: Omit<Record, "_id">
  ) {
    const response = await fetch(`/api/records/${id}`, {
      cache: "no-store",
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecord),
    });
    const data = await response.json();

    if (data.success) {
      getRecords();
    }
  }

  async function addNewRecord(record: Omit<Record, "_id">) {
    const response = await fetch("/api/records/", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    const data = await response.json();

    if (data.success) {
      getRecords();
    }
  }

  async function addNewExchange(exchange: Exchange) {
    const response = await fetch("/api/exchange/", {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exchange),
    });

    const data = await response.json();

    if (data.success) {
      getExchange();
    }
  }

  async function deleteById(id: string) {
    const response = await fetch(`api/records/${id}`, {
      cache: "no-store",
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      getRecords();
    }
  }

  return (
    <ControllerContext.Provider
      value={{
        getBanks,
        getExchange,
        getRecords,
        deleteById,
        addNewExchange,
        addNewRecord,
        getRecordById,
        editRecordById,
      }}
    >
      {children}
    </ControllerContext.Provider>
  );
}

export function useController(): ControllerContextData {
  const context = useContext(ControllerContext);

  return context;
}
