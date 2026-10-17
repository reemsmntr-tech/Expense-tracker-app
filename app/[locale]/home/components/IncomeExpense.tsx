import { useAppContext } from '@/app/[locale]/AppContext'
import React from 'react'
import classes from "../styles/income-expense.module.css"

type Props = {}


const priceClass = (value: number) =>
  value === 0 ? `${classes["price"]} ${classes["price_zero"]}` : classes["price"]

export default function IncomeExpense({}: Props) {
  const globaleState = useAppContext()
  const transactions = globaleState?.transactions ?? []

  const positiveIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((a, b) => a + b.amount, 0)

  const negativeExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((a, b) => a + b.amount, 0)

  return (
    <div className={classes["income-expense__container"]}>
      <div className={classes["income-expense__child"]}>
        <h4 className={classes["title"]}>Income</h4>
        <p className={priceClass(positiveIncome)}>${positiveIncome}</p>
      </div>

      <div className={classes["income-expense__child"]}>
        <h4 className={classes["title"]}>Expense</h4>
        <p className={priceClass(negativeExpense)}>${negativeExpense}</p>
      </div>

    </div>
  )
}
