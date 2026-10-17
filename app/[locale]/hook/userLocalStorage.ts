"use client";



import { useEffect, useState } from "react";
import { IAuth } from "../libs/request";

export default function useLocalStorage() {
  const [auth, setAuth] = useState<IAuth | null>();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const jsonAuth = localStorage.getItem("auth");
      const auth = JSON.parse(jsonAuth || "{}");
      setAuth(auth);
    }
  }, []);

  function handleSaveStorage(auth?: IAuth) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }

  function handleRemoveAuth() {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setAuth({} as IAuth)
  }
}

  return { auth, setAuth, handleSaveStorage, handleRemoveAuth };
}

