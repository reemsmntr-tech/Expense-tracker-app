 

import "./globals.css";
import { AppProvider } from "./AppContext";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Footer from "./components/Footer";
import ToastProvider from "./components/ToastProvider"

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

type StaticParams = {
  locale: string;
};
export function generateStaticParams(): StaticParams[] {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function RootLayout({
  children,
  params ,
}: Props) {
  const {locale} = await params; 
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProvider>
            <>
              {children}
              <Footer />
              <ToastProvider />
            </>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
