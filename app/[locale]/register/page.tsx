"use client"
import {useState}  from 'react'
import { useAppContext } from '../AppContext'
import React from 'react'
import Image from 'next/image'
import Bank from "../assets/Bank.png"
import classes from "./register.module.css"
import hsoublogo from "../assets/hsoub-logo.ico"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '../libs/request'
import { useTranslations, useLocale } from 'next-intl'
import { User, Lock ,  Mail, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast"


type Props = {}

export default function RegisterPage({}: Props){
  const [username , setUsername] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [showPassword, setShowPassword]=useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword ]=useState<boolean>(false)
  const [loading, setLoading]=useState<boolean>(false)

  const globaleState = useAppContext()
  const router = useRouter()
  const t = useTranslations("Register");
  const locale = useLocale()



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (loading) return;


  if (password !== confirmPassword) {
    toast.error("Password and confirm password do not match");
    return;
  }

  setLoading(true);
  try {
    const response = await register(username, email, password, confirmPassword);

    if ((response as any)?.error) {
      console.error("Registration failed:", (response as any).error);
      toast.error("Registration failed, please check your details and try again");
    } else {
      globaleState?.authenticate({
        user: response.user,
        token: response.token,
      });
      toast.success("Register successfully");
      router.push(`/${locale}/home`);
    }
  } catch (error) {
    console.error("An error occurred during registration:", error);
    toast.error("Something went wrong, please try again");
  } finally {
    setLoading(false);
  }
};

  return(
    <div className={classes["login-container"]}>
      <div className={classes["image-login"]}>
        <Image alt="login" src={Bank} />
      </div>
       <div className={classes["form-container"]}>
        <div className={classes["image-container"]}>
          <Image width={140} height={44} alt='login image' src={hsoublogo} />
        </div>

        <h1 className={classes["form-title"]}>{t("title")} </h1>
        <p className={classes["form-subtitle"]}>{t("description")} </p>

        <form className={classes["form"]} onSubmit={handleSubmit}>
        <div className={classes["form-group"]}>
         <p className={classes["form-subtitle"]}>
         {t("alreadyHaveAccount")}
         <Link href={`/${locale}`} className={classes["form-link"]}>
          {t("login")}
         </Link>
         </p>
        </div>

        <div className={classes["form-group"]}>
          <label htmlFor="username">{t("username")}</label>
          <div className={classes["input-icon-wrapper"]}>
            <User size={20} className={classes["input-icon"]} />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className={classes["form-group"]}>
          <label htmlFor="email">{t("email")}</label>
          <div className={classes["input-icon-wrapper"]}>
            <Mail size={20} className={classes["input-icon"]} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
          <label htmlFor="confirmPassword">{t("confirmPassword")}</label>
          <div className={classes["input-icon-wrapper"]}>
            <Lock size={20} className={classes["input-icon"]} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className={classes["eye-button"]}
              onClick={() => setShowConfirmPassword((i) => !i)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
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
                      t("register")
                     )}
            </button>
          </div>
        </form>
       </div>
    </div>
  )




}


