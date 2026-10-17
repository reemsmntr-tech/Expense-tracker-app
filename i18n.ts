import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // نضع لغة احتياطية في حال كانت فارغة لأي سبب
  const currentLocale = locale || 'en'; 

  return {
    // خطوة أساسية لحل المشكلة الحالية: يجب إرجاع الـ locale هنا
    locale: currentLocale, 
    messages: (await import(`./messages/${currentLocale}.json`)).default
  };
});
