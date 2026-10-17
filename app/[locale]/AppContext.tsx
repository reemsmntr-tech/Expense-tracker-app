"use client";
import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { IAuth } from "../[locale]/libs/request";
import { Transaction } from "../[locale]/libs/createToken";
import useLocalStorage from "../[locale]/hook/userLocalStorage";

type Props = {
  children: ReactNode;
};

type AppContextType = {
  auth?: IAuth;
  transactions: Transaction[];
  authenticate: (auth?: IAuth) => void;
  addTransaction: (transaction: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
  removeTransaction: (id: string) => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType>({
  auth: undefined,
  transactions: [],
  authenticate: () => {},
  addTransaction: () => {},
  setTransactions: () => {},
  removeTransaction: () => {},
  logout: () => {},
});

export const AppProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { auth, setAuth, handleSaveStorage, handleRemoveAuth } = useLocalStorage();
  if (auth)
    return (
      <AppContext.Provider
        value={{
          auth,
          transactions,
          authenticate: (auth?: IAuth) => {
            setAuth(auth);
            handleSaveStorage(auth);
          },
          addTransaction: (transaction: Transaction) => {
            setTransactions([...transactions, transaction]);
          },
          setTransactions: (transactions: Transaction[]) => {
            setTransactions(transactions);
          },
          removeTransaction: (id: string) => {
            setTransactions((transactions) =>
              transactions.filter((t) => t._id !== id)
            );
          },
          logout: () => {
            handleRemoveAuth();
            setTransactions([]);
          },
        }}
      >
        {children}
      </AppContext.Provider>
    );
  return null;
};
export const useAppContext = () => useContext(AppContext);