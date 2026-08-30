import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'THB' | 'MMK';
export const currencies: Currency[] = ['USD','THB','MMK'];
const rates: Record<Currency, number> = { USD: 1, THB: 36.8, MMK: 2100 };
const locales: Record<Currency,string> = { USD:'en-US', THB:'th-TH', MMK:'my-MM' };

type Ctx = { currency: Currency; setCurrency:(c:Currency)=>void; format:(usd:number)=>string; convert:(usd:number)=>number; };
const Ctx = createContext<Ctx>(null as any);

export function CurrencyProvider({children}:{children:React.ReactNode}){
  const [currency,setCurrency] = useState<Currency>('USD');
  const convert = (usd:number) => usd * rates[currency];
  const format = (usd:number) => {
    const v = convert(usd);
    try { return new Intl.NumberFormat(locales[currency], { style:'currency', currency, maximumFractionDigits: currency==='MMK'?0:0 }).format(v); }
    catch { return `${v.toLocaleString()} ${currency}` }
  };
  return <Ctx.Provider value={{currency,setCurrency,format,convert}}>{children}</Ctx.Provider>
}
export const useCurrency = () => useContext(Ctx);
