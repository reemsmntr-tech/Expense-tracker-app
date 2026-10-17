"use client";
import React, { useState } from 'react'
import classes from "../styles/add-transaction.module.css"
import { useAppContext } from '@/app/[locale]/AppContext'
import { useTranslations } from 'next-intl';
 import toast from "react-hot-toast";  

type Props = {}

export default function Addtransaction({}: Props) {
  
  const [name, setName] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  )
  const golobaleState = useAppContext()
  const t = useTranslations("Home")


  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const handleChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };


 

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (name === "" || amount === "" || startDate === "") {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    const token = golobaleState?.auth?.token;

    const newTransactionResponse = await fetch(
      "http://localhost:3000/api/transaction",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, amount: Number(amount), startDate }),
      }
    );

    const newTransaction = await newTransactionResponse.json();

    if (!newTransactionResponse.ok) {
      toast.error(newTransaction?.error || newTransaction?.message || "Failed to add the transaction");
      return;
    }

    golobaleState?.addTransaction(newTransaction);
    setName("");
    setAmount("");
    toast.success("Transaction added successfully");
  } catch (error: any) {
    console.error("An error occurred while adding the transaction:", error);
    toast.error(error?.message || "Something went wrong, please try again");
  }
};





  return (
    <form className={classes["transaction-form"]} onSubmit={onSubmit}>
      <div>
        <label htmlFor="text" className={classes["form-label"]}>
          {t("name")}
        </label>
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          id="text"
          placeholder={t("enterName")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {t("amount")}
        </label>
        <input
          value={amount}
          onChange={handleChangeAmount}
          type="text"
          id="amount"
          placeholder={t("enterAmount")}
          className={classes["form-input"]}
        />
      </div>
      <div>
        <label htmlFor="amount" className={classes["form-label"]}>
          {t("startDate")}
        </label>
        <input
          value={startDate}
          onChange={handleChangeStartDate}
          type="date"
          id="start-date"
          className={classes["form-input"]}
        />
      </div>

      <button>{t("addTransaction")}</button>
    </form>
  );
};