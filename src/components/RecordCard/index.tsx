import { Record } from "@/utils/Types";
import { CurrencyFormat } from "@/utils/Formatting";
import styles from "./styles.module.scss";
import VariationTag from "../VariationTag";
import { usePatrimony } from "@/hooks/usePatrimony";
import Image from "next/image";
import { useState } from "react";
import OptionsButton from "./OptionsButton";

interface RecordCardProps {
  record: Record;
}

export default function RecordCard({ record }: RecordCardProps) {
  const { allRecords, allBanks } = usePatrimony();

  const [isHovered, setIsHovered] = useState(false);

  const { _id, date, bank, value } = record;

  const bankData = allBanks.find((b) => {
    return bank === b.id;
  });

  function getAvatar() {
    switch (bank) {
      case 1:
        return "/wise.png";
      case 2:
        return "/activo.png";
      case 3:
        return "/nu.png";
      case 4:
        return "/nuInvest.jpg";
      case 5:
        return "/xp.png";
      case 6:
        return "/okx.png";
      default:
        return "/favicon.ico";
    }
  }

  const pastData = allRecords.find((r) => {
    return (
      r.bank === bank &&
      r.date.getMonth() === date.getMonth() - 1 &&
      r.date.getFullYear() === date.getFullYear()
    );
  });

  return (
    bankData && (
      <div
        className={`${styles.container}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.description}>
          <Image src={getAvatar()} alt={bankData.name} width={25} height={25} />
          <div>{bankData.name}</div>
        </div>
        <div className={styles.valueBox}>
          <div>{CurrencyFormat(value, bankData.currency)}</div>
          {pastData && (
            <VariationTag currentValue={value} previousValue={pastData.value} />
          )}
          {isHovered && <OptionsButton id={_id} />}
        </div>
      </div>
    )
  );
}
