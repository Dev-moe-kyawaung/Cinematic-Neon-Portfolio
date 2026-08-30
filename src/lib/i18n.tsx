import React, { createContext, useContext, useState } from 'react';

export type Locale = 'en' | 'my' | 'th';
export const locales: Locale[] = ['en','my','th'];
export const localeNames: Record<Locale,string> = { en: 'English', my: 'မြန်မာ', th: 'ไทย' };

type Dict = Record<string, Record<Locale,string>>;

export const tdict: Dict = {
  nav_home: { en:'Home', my:'ပင်မ', th:'หน้าแรก' },
  nav_projects: { en:'Projects', my:'ပရောဂျက်များ', th:'โปรเจกต์' },
  nav_about: { en:'About', my:'အကြောင်း', th:'เกี่ยวกับ' },
  nav_stack: { en:'Stack', my:'နည်းပညာ', th:'เทคโนโลยี' },
  nav_pricing: { en:'Pricing', my:'စျေးနှုန်း', th:'ราคา' },
  nav_contact: { en:'Contact', my:'ဆက်သွယ်ရန်', th:'ติดต่อ' },
  cta_projects: { en:'View Projects', my:'ပရောဂျက်များကြည့်ရန်', th:'ดูโปรเจกต์' },
  cta_contact: { en:'Contact Me', my:'ဆက်သွယ်ပါ', th:'ติดต่อฉัน' },
  cta_resume: { en:'Download Resume', my:'CV ဒေါင်းရန်', th:'ดาวน์โหลดเรซูเม่' },
  hero_headline: { en:'I build premium Android experiences that stay fast, stable, and scalable.', my:'မြန်ဆန်၊ တည်ငြိမ်၊ ချဲ့နိုင်သော ပရီမီယံ Android အတွေ့အကြုံများကို ကျွန်တော်တည်ဆောက်သည်။', th:'ผมสร้างประสบการณ์ Android ระดับพรีเมียมที่เร็ว เสถียร และสเกลได้' },
  hero_sub: { en:'Senior Mobile/Android Developer focused on Kotlin, Jetpack Compose, architecture, performance, and production delivery. I turn complex product ideas into mobile systems teams can confidently ship, maintain, and evolve.', my:'Kotlin, Jetpack Compose, architecture, performance နှင့် production delivery ကိုအဓိကထားသော Senior Mobile/Android Developer။ ရှုပ်ထွေးသော product စိတ်ကူးများကို အဖွဲ့များယုံကြည်စွာ ပို့၊ ထိန်းသိမ်း၊ တိုးတက်နိုင်သော mobile system များအဖြစ်ပြောင်းလဲပေးသည်။', th:'Senior Mobile/Android Developer ที่โฟกัส Kotlin, Jetpack Compose, สถาปัตยกรรม, ประสิทธิภาพ และการส่งมอบระดับโปรดักชัน ผมเปลี่ยนไอเดียที่ซับซ้อนให้เป็นระบบมือถือที่ทีมมั่นใจได้' },
  trust_1: { en:'10+ years shipping mobile products', my:'10+ နှစ် mobile ထုတ်ကုန်များ ပို့ဆောင်ခြင်း', th:'10+ ปี ส่งมอบโปรดักต์โมบายล์' },
  trust_2: { en:'Production Android experience', my:'Production Android အတွေ့အကြုံ', th:'ประสบการณ์ Android ระดับโปรดักชัน' },
  trust_3: { en:'Architecture and performance focus', my:'Architecture နှင့် performance ကိုအလေးပေး', th:'โฟกัสสถาปัตยกรรมและประสิทธิภาพ' },
  trust_4: { en:'Strong cross-functional collaboration', my:'အပြန်အလှန်ပူးပေါင်းလုပ်ဆောင်မှုအားကောင်း', th:'ร่วมงานข้ามสายแข็งแกร่ง' },
  availability: { en:'Available for consulting • Q1 2026', my:'အတိုင်ပင်ခံအတွက် ရရှိနိုင် • Q1 2026', th:'พร้อมให้คำปรึกษา • Q1 2026' },
  featured: { en:'Featured Projects', my:'ထူးခြားသည့်ပရောဂျက်များ', th:'โปรเจกต์เด่น' },
  pricing_title: { en:'Engagement Models', my:'ပူးပေါင်းဆောင်ရွက်မှုပုံစံများ', th:'รูปแบบการจ้างงาน' },
};

type I18nCtx = { locale: Locale; setLocale: (l:Locale)=>void; t: (k:string)=>string; };
const I18nContext = createContext<I18nCtx>(null as any);

export function I18nProvider({ children }: { children: React.ReactNode }){
  const [locale, setLocale] = useState<Locale>('en');
  const t = (k:string) => tdict[k]?.[locale] ?? k;
  return <I18nContext.Provider value={{locale,setLocale,t}}>{children}</I18nContext.Provider>
}
export const useI18n = () => useContext(I18nContext);
