"use client";

import React from "react";
import { useAppContext } from "../AppContext";
import IncomeExpense from "../home/components/IncomeExpense";
import History from "../home/components/History";
import Addtransaction from "./components/Addtransaction";
import { Transaction } from "../libs/request";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "./home.module.css";
import HomeSkeleton from "./components/HomeSkeleton"
import toast from "react-hot-toast"



type Props = {};

async function getTransactions(token?: string) {
  const response = await fetch("http://localhost:3000/api/transaction", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
  
}

export default function HomePage({}: Props) {

  const [isLoading, setIsLoading] = React.useState(true)


 
  const globaleState = useAppContext();
  const auth = globaleState?.auth;
  const router = useRouter();
  const locale = useLocale();

  React.useEffect(() => {
  const fetchTransactions = async () => {
    if (!globaleState?.auth?.token) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getTransactions(globaleState.auth.token);
      if (response && !response.message) {
        globaleState.setTransactions(response);
      }
    } finally {
      setIsLoading(false);
    }
  };
  fetchTransactions();
}, []);


React.useEffect(() => {
    if (!globaleState.auth?.token) router.replace(`/${locale}`);
  }, [globaleState.auth, router, locale]);

  const logout = () => {
    globaleState.logout(); 
    toast.success("Logout successfully");
  };



  if (isLoading) {
  return <HomeSkeleton />;
}

  return (
    <div className={styles["dashboard-layout"]}>
      <header className={styles["dashboard__header"]}>
        <h1 className={styles["dashboard__title"]}>
          Expense Tracker - {auth?.user?.username}
        </h1>
        <button className={styles["logout"]} onClick={logout}>
          Logout
        </button>
      </header>

      <div className={styles["dashboard-body"]}>
        <div className={styles["dashboard__balance-container"]}>
          <h2 className={styles["dashboard__balance-title"]}>Your Balance</h2>
          <h1 className={styles["dashboard__balance-price"]}>
            {globaleState?.transactions?.reduce((acc, t) => acc + t.amount, 0) || 0}
          </h1>
          <IncomeExpense />
        </div>

        <div className={styles["dashboard__history-transaction-container"]}>
          <div className={styles["dashboard__history-container"]}>
            <h3 className={styles["dashboard__history-title"]}>Transactions</h3>
            <History transactions={globaleState?.transactions as Transaction[]} />
          </div>

          <div className={styles["dashboard__transaction-container"]}>
            <h3 className={styles["dashboard__transaction-title"]}>
              Add new transaction
            </h3>
            <Addtransaction />
          </div>
        </div>
      </div>
    </div>
  );
}
