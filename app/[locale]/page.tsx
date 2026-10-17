"use client";
import classes from "./login.module.css";
import Talk from "../[locale]/assets/talk.png";
import hsoublogo from "../[locale]/assets/hsoub-logo.ico"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import React from "react";
import { login } from "./libs/request";
import { useRouter } from "next/navigation";
import { useAppContext } from "./AppContext";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast"



export default function LoginPage() {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword]=useState<boolean>(false)
  const [loading, setLoading]=useState<boolean>(false)

  const router = useRouter();
  const globaleState = useAppContext();
  const t = useTranslations("Login");
  const locale = useLocale()

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  

  

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (loading) return;
  setLoading(true);

  try {
    const response = await login(email, password);

    if (response && response.token) {
      globaleState?.authenticate({
        user: response?.user,
        token: response.token,
      });
      toast.success("Login successfully");
      router.push(`/${locale}/home`);
    } else {
      
      console.error("Login failed:", response);   
      toast.error("Login failed, please check your details and try again");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    toast.error("Something went wrong, please try again");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className={classes["login-container"]}>
      <div className={classes["image-login"]}>
        <Image alt="Login Image" src={Talk} priority />
      </div>

      <div className={classes["form-container"]}>
        <div className={classes["logo-container"]}>
          <Image width={200} height={62} alt="Logo" src={hsoublogo} />
        </div>
        <h1 className={classes["form-title"]}>{t("title")}</h1>
        <p className={classes["form-subtitle"]}>{t("description")}</p>

        <form className={classes["form"]} onSubmit={handleSubmit}>
          <div className={classes["form-group"]}>
            <p className={classes["form-subtitle"]}>
              {t("dontHaveAccount")}
              <Link href={`/${locale}/register`} className={classes["form-link"]}>
                {t("register")}
              </Link>
            </p>
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="email">{t("email")}</label>
            <div className={classes["input-icon-wrapper"]}>
              <Mail size={20} className={classes["input-icon"]} />
            
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              
            /> 
            </div>
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="password">{t("password")}</label>

            <div className={classes["input-icon-wrapper"]}>
             <Lock size={20} className={classes["input-icon"]} />
             

            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className={classes["eye-button"]}
              onClick={() => setShowPassword((i) => !i)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
               {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}

            </button>

          </div>
          </div>

          <div className={classes["form-group"]}>
            <button 
            type="submit"
            className={classes["form-button"]}
            disabled={loading}
            >
               {loading ? (
                <span className={classes["spinner"]} aria-label="Loading" />
                    ) : (
                   t("login")
                     )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


