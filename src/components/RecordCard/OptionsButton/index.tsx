"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";

import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useController } from "@/hooks/useController";
import { usePatrimony } from "@/hooks/usePatrimony";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";

interface OptionsButtonProps {
  id: string;
}

export default function OptionsButton({ id }: OptionsButtonProps) {
  const { deleteById, getRecordById, editRecordById } = useController();
  const { allBanks } = usePatrimony();
  const session = useSession();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [bank, setBank] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");

  function handleDelete() {
    deleteById(id);
  }

  async function openModal() {
    const recordToUpdate = await getRecordById(id);

    if (recordToUpdate.success) {
      const { bank, date, value } = recordToUpdate.data;

      setModalIsOpen(false);
      setBank(bank);
      setDate(
        new Intl.DateTimeFormat("fr-CA", {
          year: "numeric",
          month: "2-digit",
        }).format(new Date(date))
      );
      setValue(value);
      setEditModalIsOpen(true);
    }
  }

  function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    const updatedRecord = {
      bank: Number(bank),
      value: Number(value),
      date: new Date(date),
      user: session.data!.user!.email as string,
    };

    editRecordById(id, updatedRecord);
    setIsSaving(false);
    setEditModalIsOpen(false);
  }

  return (
    <>
      <Modal setModalIsOpen={setEditModalIsOpen} modalIsOpen={editModalIsOpen}>
        <form className={styles.containerModal} onSubmit={(e) => handleEdit(e)}>
          Edit Record
          <select disabled value={bank}>
            {allBanks.map((b) => {
              return (
                <option key={b._id} value={b.id}>
                  {b.name}
                </option>
              );
            })}
          </select>
          <input type="month" disabled value={date} />
          <input
            type="number"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <button disabled={isSaving}>{isSaving ? "Saving..." : "Add"}</button>
        </form>
      </Modal>
      <div className={styles.wrapper}>
        {modalIsOpen && (
          <div className={styles.modalWrapper}>
            <div className={styles.modalContainer}>
              <button onClick={openModal}>
                <FaEdit fontSize={"0.7rem"} />
                <div>Edit</div>
              </button>
              <button onClick={handleDelete}>
                <FaTrash fontSize={"0.7rem"} /> <div>Delete</div>
              </button>
            </div>
            <div className={styles.modalSpeach} />
          </div>
        )}
        <button
          onClick={() => setModalIsOpen(true)}
          className={styles.container}
        >
          <BsThreeDotsVertical />
        </button>
      </div>
    </>
  );
}
