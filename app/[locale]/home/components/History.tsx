
import HistoryItem from './HistoryItem';
import classes from "../styles/history.module.css";
import React from 'react'
import { Transaction } from '@/app/[locale]/libs/request';
import { useTranslations } from 'next-intl';


type Props = {
  transactions: Transaction[]
}

export default function History(props: Props) {
  
  const t = useTranslations("Home")
  const sortTransaction = props.transactions.sort(
    (a,b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )
  return (
    <div className={classes["history-container"]}>
      {sortTransaction.length > 0 &&
        sortTransaction?.map((transaction) => (
          <HistoryItem key={transaction._id} {...transaction} />
        ))}
      {sortTransaction?.length === 0 && (
        <div className={classes["history-item"]}>{t("noTransactionsYet")}</div>
      )}
    </div>
  );
}

