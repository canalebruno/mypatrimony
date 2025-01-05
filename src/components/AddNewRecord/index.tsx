"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { usePatrimony } from "@/hooks/usePatrimony";
import { Exchange, Record } from "@/utils/Types";
import { useController } from "@/hooks/useController";
import Modal from "../Modal";
import { useSession } from "next-auth/react";

export default function AddNewRecord() {
  const { allBanks } = usePatrimony();
  const { addNewExchange, addNewRecord } = useController();
  const { data } = useSession();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [bank, setBank] = useState("1");
  const [date, setDate] = useState(
    new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
    }).format(new Date())
  );
  const [value, setValue] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (Number(bank) < 100) {
        const newRecord: Omit<Record, "_id"> = {
          bank: Number(bank),
          date: new Date(date),
          value: Number(value),
          user: data?.user?.email as string,
        };

        addNewRecord(newRecord);
      } else {
        const newRecord: Exchange = {
          date: new Date(date),
          value: Number(value),
        };

        addNewExchange(newRecord);
      }
      setValue("");
    } catch (error) {
      alert(`Could not save at the moment. Try again later. Error: ${error}`);
    }
    setIsSaving(false);
  }

  return (
    <>
      <button onClick={() => setModalIsOpen(true)}>Add New Record</button>
      <Modal setModalIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen}>
        <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
          Add New Record
          <select onChange={(e) => setBank(e.target.value)} value={bank}>
            {allBanks.map((b) => {
              return (
                <option key={b._id} value={b.id}>
                  {b.name}
                </option>
              );
            })}
          </select>
          <input
            type="month"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <input
            type="number"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button disabled={isSaving}>{isSaving ? "Saving..." : "Add"}</button>
        </form>
      </Modal>
      {/* {modalIsOpen && (
        <div className={styles.modalWrapper}>
          <div
            className={styles.modalBackground}
            onClick={() => setModalIsOpen(false)}
          />
          <form className={styles.container} onSubmit={(e) => handleSubmit(e)}>
            Add New Record
            <select onChange={(e) => setBank(e.target.value)} value={bank}>
              {allBanks.map((b) => {
                return (
                  <option key={b._id} value={b.id}>
                    {b.name}
                  </option>
                );
              })}
            </select>
            <input
              type="month"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            <input
              type="number"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <button disabled={isSaving}>
              {isSaving ? "Saving..." : "Add"}
            </button>
          </form>
        </div>
      )} */}
    </>
  );
}
