import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, Github, Linkedin, Mail, MapPin, ExternalLink, Sparkles, 
  Cpu, Layers, Zap, Shield, Code2, Box, Smartphone, Figma, Database,
  GitBranch, Gauge, Users, BookOpen, Mic, Award, FlaskConical,
  Palette, Accessibility, Globe, HelpCircle, FileText, ChevronRight,
  Play, Clock, Star, Download, ArrowRight, Check, Menu, X, Quote
} from 'lucide-react';
import { I18nProvider, useI18n, type Locale, locales, localeNames } from './lib/i18n';
import { CurrencyProvider, useCurrency, type Currency, currencies } from './lib/currency';
import { GlassCard, TiltCard, MagneticButton, Section, Pill } from './components/ui';

// ---------- Data ----------
const projects = [
  { 
    slug:'ledger', title:'Ledger — Private Banking OS', cat:'Fintech • Compose • Modular', 
    desc:'Re-architected legacy banking app into 12-feature modules, 38% cold start gain, 99.96% crash-free. Offline-first ledger with SQLDelight + WorkManager sync.',
    tags:['Kotlin','Compose','MVI','Room','KMP'], color:'#00E5FF', year:'2025', metric:'+1.2M MAU'
  },
  { 
    slug:'pulse', title:'Pulse — Health Telemetry', cat:'Health • Wear OS • Data Viz', 
    desc:'Real-time HRV & vitals dashboard syncing BLE + Health Connect. Custom Canvas charts at 120fps, battery drop cut by 41%.',
    tags:['Jetpack','WearOS','Coroutines','Performance'], color:'#8B5CF6', year:'2024', metric:'120fps'
  },
  { 
    slug:'orbit', title:'Orbit — Creator Commerce', cat:'Commerce • Offline-first • KMP', 
    desc:'Seller OS for SE Asia: offline queue, image pipeline, currency-aware pricing. Play Feature Delivery + Baseline Profiles.',
    tags:['KMP','Compose Multiplatform','MMKV','Billing'], color:'#C6FF00', year:'2024', metric:'4.8★ • 800k'
  },
  { slug:'atlas', title:'Atlas — Maps Platform SDK', cat:'SDK • Performance', desc:'Vector maps SDK with tiling, culling, and GPU layers. CI micro-benchmarks guarding jank and RSS.', tags:['NDK','Compose','Benchmark'], color:'#5B6CFF', year:'2023', metric:'-62% jank' },
  { slug:'vault', title:'Vault — Auth & Passkeys', cat:'Security • Auth', desc:'Passkey-first auth with biometrics, risk engine, secure store abstraction. Audit-ready logging.', tags:['Security','Biometric','Crypto'], color:'#00E5FF', year:'2023', metric:'0 breaches' },
  { slug:'ops', title:'ShipOps — Release Dashboard', cat:'Platform • Tooling', desc:'Internal delivery cockpit: phased rollouts, vitals, ANR clustering, and guard-railed feature flags.', tags:['Tooling','Firebase','Play Console'], color:'#8B5CF6', year:'2025', metric:'-73% rollbacks' },
];

const experience = [
  { role:'Senior Android Engineer — Lead', org:'BKK Fintech • Bangkok / Remote', time:'2022 → Now', blurb:'Own app architecture for consumer neobank (Compose, Modularization, MVI). Mentored 9 engineers, defined perf budgets, cut ANR 0.51%→0.08%.'},
  { role:'Android Engineer', org:'Singapore Commerce unicorn', time:'2019—2022', blurb:'Built seller app offline engine powering MMK/THB markets. KMP sharing. Complex image + pricing pipelines.'},
  { role:'Mobile Engineer', org:'Yangon • Product Studio', time:'2016—2019', blurb:'Shipped 30+ apps for clients in MY, TH, SG. Cut build times, introduced Compose early.'},
];

const skillsGroups = [
  { k:'Architecture', items:['MVI / MVVM / UDF','Clean Architecture','Modularization & Feature Flags','KMP Shared Logic','Offline-first & Event sourcing'] , icon:Layers },
  { k:'Android Mastery', items:['Kotlin • Coroutines • Flow','Jetpack Compose • Canvas','Performance • Baseline Profiles • R8','Room • SQLDelight • DataStore','WorkManager • Paging 3'] , icon:Smartphone },
  { k:'Product Engineering', items:['PRD → System design','Telemetry & Experimentation','Accessibility WCAG 2.2','Security & App Hardening','Play Policy & Release'] , icon:Shield },
  { k:'Platform', items:['Gradle, KSP, Anvil','Benchmark, Macrobenchmark','CI • GitHub Actions • Fastlane','Firebase • Analytics','Design Systems'] , icon:Box },
];

function AppInner(){
  const { locale, setLocale, t } = useI18n();
  const { currency, setCurrency, format } = useCurrency();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeSlug, setActiveSlug] = useState<string>('home');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0,1], [0, -200]);
  const opacityHero = useTransform(scrollYProgress, [0,0.2], [1,0]);

  useEffect(()=>{
    document.documentElement.lang = locale;
  },[locale]);

  const nav = [
    { id:'home', label:locale==='my'?'ပင်မ':locale==='th'?'หน้าแรก':'Home' },
    { id:'projects', label:t('nav_projects') },
    { id:'about', label:t('nav_about') },
    { id:'stack', label:t('nav_stack') },
    { id:'pricing', label:t('nav_pricing') },
    { id:'contact', label:t('nav_contact') },
  ];

  const scrollTo = (id:string) => {
    setActiveSlug(id);
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start'});
    setMobileOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#080a0f] text-white selection:bg-cyan-300/20 overflow-x-clip noise">
      {/* Ambient bg */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(0,229,255,0.14),transparent_70%),radial-gradient(900px_600px_at_90%_10%,rgba(139,92,246,0.18),transparent_60%),radial-gradient(700px_500px_at_50%_120%,rgba(198,255,0,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1219] via-transparent to-[#080a0f]" />
        <motion.div style={{ y: yParallax }} className="absolute left-[-10%] top-[18%] h-[520px] w-[520px] rounded-full blur-[120px] bg-cyan-400/10" />
        <motion.div style={{ y: yParallax }} className="absolute right-[-15%] top-[45%] h-[680px] w-[680px] rounded-full blur-[140px] bg-violet-500/12" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]" />
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080a0f]/70 backdrop-blur-[22px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="h-8 w-8 rounded-full bg-white text-black grid place-items-center font-bold text-[13px] tracking-tight">MKA</div>
            <span className="hidden md:flex items-center gap-2 text-[12px] tracking-[0.16em] uppercase text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6FF00] shadow-[0_0_10px_#C6FF00] animate-pulse"/> {t('availability')}
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur">
            {nav.map(n=>(
              <button key={n.id} onClick={()=>scrollTo(n.id)} className={`px-4 py-1.5 rounded-full text-[13.5px] transition ${activeSlug===n.id?'bg-white text-black':'text-white/70 hover:text-white hover:bg-white/10'}`}>{n.label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center rounded-full border border-white/10 bg-white/[0.04] px-1 py-1">
              {locales.map(l=>(
                <button key={l} onClick={()=>setLocale(l as Locale)} className={`px-2.5 py-1 rounded-full text-[11px] ${locale===l?'bg-white text-black':'text-white/60 hover:text-white'}`}>{localeNames[l as Locale].slice(0,2).toUpperCase()}</button>
              ))}
            </div>
            <div className="hidden md:flex items-center rounded-full border border-white/10 bg-white/[0.04] px-1 py-1">
              {currencies.map(c=>(
                <button key={c} onClick={()=>setCurrency(c as Currency)} className={`px-2.5 py-1 rounded-full text-[11px] ${currency===c?'bg-white text-black':'text-white/60 hover:text-white'}`}>{c}</button>
              ))}
            </div>
            <MagneticButton onClick={()=>scrollTo('contact')} className="hidden md:inline-flex h-[36px] bg-white text-black px-5 text-[13.5px] hover:bg-white/90">Contact</MagneticButton>
            <button onClick={()=>setMobileOpen(v=>!v)} className="lg:hidden grid place-items-center h-9 w-9 rounded-full border border-white/10 bg-white/[0.04]">{mobileOpen?<X size={16}/>:<Menu size={16}/>}</button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }} className="lg:hidden border-t border-white/10 bg-[#0e1219] px-6 py-6">
              <div className="grid gap-2">
                {nav.map(n=><button key={n.id} onClick={()=>scrollTo(n.id)} className="text-left py-2.5 text-[18px] tracking-tight text-white/80 hover:text-white">{n.label}</button>)}
              </div>
              <div className="mt-6 flex gap-2">
                {locales.map(l=>(
                  <button key={l} onClick={()=>setLocale(l as Locale)} className={`rounded-full border px-3 py-1.5 text-xs ${locale===l?'bg-white text-black border-white':'border-white/10 text-white/60'}`}>{localeNames[l as Locale]}</button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                {currencies.map(c=>(
                  <button key={c} onClick={()=>setCurrency(c as Currency)} className={`rounded-full border px-3 py-1.5 text-xs ${currency===c?'bg-white text-black':'border-white/10 text-white/60'}`}>{c}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section ref={heroRef} id="home" className="relative">
        <motion.div style={{ opacity: opacityHero }} className="mx-auto max-w-[1280px] px-6 md:px-8 pt-[48px] md:pt-[84px] pb-[32px] grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase text-white/60">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#C6FF00] text-black"><Sparkles size={12}/></span>
              Senior Android • 2026 Portfolio • Yangon – Bangkok – Remote
            </div>
            <h1 className="mt-8 font-display text-[40px] md:text-[72px] leading-[0.9] tracking-[-0.03em] text-white">
              {t('hero_headline').split('premium')[0]}<span className="relative inline-block"><span className="relative z-10 bg-gradient-to-r from-cyan-200 via-blue-300 to-violet-300 bg-clip-text text-transparent">premium Android experiences</span><span className="absolute inset-x-0 bottom-[6px] h-[10px] bg-[#C6FF00]/20 blur-[2px]"/> </span> {t('hero_headline').split('premium Android experiences')[1] || 'that stay fast, stable, and scalable.'}
            </h1>
            <p className="mt-6 max-w-[640px] text-[17px] md:text-[19px] leading-[1.6] text-white/60 font-[400]">{t('hero_sub')}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton onClick={()=>scrollTo('projects')} className="h-[48px] bg-white text-black px-7 text-[14.5px] hover:bg-zinc-100"> 
                {t('cta_projects')} <ArrowUpRight size={16} className="ml-2"/>
              </MagneticButton>
              <MagneticButton onClick={()=>scrollTo('contact')} className="h-[48px] border border-white/15 bg-white/[0.05] px-7 text-[14.5px] text-white hover:bg-white/[0.08] backdrop-blur">
                {t('cta_contact')}
              </MagneticButton>
              <button onClick={()=>scrollTo('resume')} className="inline-flex items-center gap-2 h-[48px] px-2 text-[13.5px] text-white/60 hover:text-white">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.04]"><Download size={16}/></span> {t('cta_resume')}
              </button>
            </div>

            {/* Trust strip */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[t('trust_1'), t('trust_2'), t('trust_3'), t('trust_4')].map((s,i)=>(
                <GlassCard key={i} className="px-4 py-3.5">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,229,255,0.8)]"/>
                    <p className="text-[12.5px] leading-[1.4] text-white/70 tracking-wide">{s}</p>
                  </div>
                </GlassCard>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6 text-[12px] text-white/35 tracking-wide">
              <span className="inline-flex items-center gap-1.5"><MapPin size={12}/> TH • MM • SG • Remote</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={12}/> Ships weekly • Code reviews in 12h</span>
            </div>
          </div>

          {/* Phone mock + stats */}
          <div className="relative lg:sticky lg:top-[96px]">
            <TiltCard className="relative">
              <div className="relative mx-auto w-full max-w-[420px]">
                <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-b from-cyan-400/20 via-violet-500/20 to-transparent blur-[36px]" />
                <GlassCard className="overflow-hidden rounded-[36px] p-[10px] border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02]">
                  <div className="rounded-[28px] bg-[#0b0f16] p-4 md:p-5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div className="h-2.5 w-2.5 rounded-full bg-[#C6FF00]"/><span className="text-[10px] tracking-[0.18em] uppercase text-white/50">system • production</span></div>
                      <span className="text-[10px] text-white/40 font-mono">99.96% crash-free</span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                        <div className="flex items-center justify-between text-[11px] text-white/50"><span>Startup</span><span className="text-cyan-200">-38%</span></div>
                        <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden"><div className="h-full w-[72%] bg-gradient-to-r from-cyan-300 to-violet-300"/></div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                          <div className="rounded-xl bg-black/40 border border-white/10 p-2.5"><div className="text-white/40">P95</div><div className="text-white font-medium">89ms</div></div>
                          <div className="rounded-xl bg-black/40 border border-white/10 p-2.5"><div className="text-white/40">ANR</div><div className="text-white font-medium">0.08%</div></div>
                          <div className="rounded-xl bg-black/40 border border-white/10 p-2.5"><div className="text-white/40">MAU</div><div className="text-white font-medium">1.2M</div></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-4">
                          <Cpu size={16} className="text-cyan-300"/><div className="mt-3 text-[12px] text-white/80">Modular App</div><div className="mt-1 text-[11px] text-white/40 leading-[1.4]">12 modules, Play FD on-demand with 19% install drop</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-4">
                          <Gauge size={16} className="text-violet-300"/><div className="mt-3 text-[12px] text-white/80">Baseline Profiles</div><div className="mt-1 text-[11px] text-white/40 leading-[1.4]">Macrobenchmark CI guards, no jank regressions</div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-[#0e131c] border border-white/10 p-3 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-white text-black grid place-items-center"><Play size={14}/></div>
                        <div className="flex-1"><div className="text-[12px] text-white">Compose motion • 120fps</div><div className="text-[11px] text-white/40">Canvas, lookahead, staggered reveals</div></div>
                        <ArrowUpRight size={14} className="text-white/40"/>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <div className="absolute -right-6 top-10 hidden md:block">
                  <GlassCard className="px-3.5 py-2.5 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"/><span className="text-[11px] tracking-wide text-white/70">CI • green</span>
                  </GlassCard>
                </div>
                <div className="absolute -left-8 bottom-14 hidden md:block">
                  <GlassCard className="px-3.5 py-2.5">
                    <div className="text-[10px] tracking-[0.16em] uppercase text-white/40">Kotlin</div><div className="text-[12px] text-white">100% Kotlin • Coroutines Flow</div>
                  </GlassCard>
                </div>
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" kicker="Selected Work — 2023→2026" title={t('featured')} desc="Production Android systems designed for scale, performance, and maintainability. Each project ships with architecture docs, observability, and guardrails.">
        <div className="grid md:grid-cols-3 gap-5">
          {projects.slice(0,3).map(p=>(
            <TiltCard key={p.slug}>
              <GlassCard className="group relative flex h-[420px] flex-col overflow-hidden p-6">
                <div className="absolute -inset-px opacity-60 group-hover:opacity-100 transition-opacity duration-700" style={{ background:`radial-gradient(400px circle at 20% 10%, ${p.color}18, transparent 60%)` }} />
                <div className="relative flex items-center justify-between">
                  <span className="text-[11px] tracking-[0.18em] uppercase text-white/40">{p.cat}</span>
                  <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] text-white/50">{p.year} • {p.metric}</span>
                </div>
                <h3 className="relative mt-8 text-[22px] leading-[1.1] tracking-[-0.01em] font-[600]">{p.title}</h3>
                <p className="relative mt-3 text-[13.5px] leading-[1.6] text-white/60">{p.desc}</p>
                <div className="relative mt-5 flex flex-wrap gap-1.5">{p.tags.map(tag=><Pill key={tag}>{tag}</Pill>)}</div>
                <div className="relative mt-auto flex items-center justify-between">
                  <button onClick={()=>setActiveProject(p.slug)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white text-black px-4 py-2 text-[13px] font-medium hover:bg-white/90">Case study <ArrowUpRight size={14}/></button>
                  <span className="text-[11px] text-white/30 font-mono">ID_{p.slug.toUpperCase()}</span>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {projects.slice(3).map(p=>(
            <GlassCard key={p.slug} className="p-5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl grid place-items-center border border-white/10 bg-white/[0.04]" style={{ color:p.color }}><Box size={18}/></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-[14px] font-[600] tracking-tight truncate">{p.title}</h4>
                  <span className="text-[10px] text-white/30 shrink-0">{p.metric}</span>
                </div>
                <p className="mt-1 text-[12.5px] leading-[1.5] text-white/55 line-clamp-2">{p.desc}</p>
                <div className="mt-3 flex gap-1.5 flex-wrap">{p.tags.slice(0,3).map(t=><Pill key={t}>{t}</Pill>)}</div>
              </div>
              <button onClick={()=>setActiveProject(p.slug)} className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] p-2 hover:bg-white/[0.1]"><ExternalLink size={14}/></button>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* ABOUT + RESUME */}
      <Section id="about" kicker="About — Senior POV" title="I don't ship screens. I ship systems teams can trust." desc="My work starts before code: product framing, edge cases, performance budgets, and failure modes. Android is details—and details are reliability.">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          <GlassCard className="p-7 md:p-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 p-[1px]"><div className="h-full w-full rounded-full bg-black grid place-items-center text-[14px] font-bold">SM</div></div>
              <div><div className="text-[14px] font-semibold">Senior Mobile / Android</div><div className="text-[12px] text-white/50">Yangon → Bangkok → Remote • KMP • Compose</div></div>
              <div className="ml-auto hidden md:flex gap-2"><a href="#" className="h-8 w-8 grid place-items-center rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"><Github size={14}/></a><a href="#" className="h-8 w-8 grid place-items-center rounded-full border border-white/10 bg-white/[0.04]"><Linkedin size={14}/></a></div>
            </div>
            <div className="mt-8 prose prose-invert max-w-none prose-p:text-white/65 prose-p:leading-[1.75] prose-p:text-[15px] prose-strong:text-white prose-headings:text-white">
              <p>I help product teams turn ambiguous commerce/fintech ideas into <strong>fast, resilient Android products</strong>. My default stack: <span className="font-mono text-cyan-200">Kotlin • Compose • MVI • Modular • KMP shared domain</span>. I bring strong opinions, lightly held—on architecture, state, and testing—but I optimize for team velocity.</p>
              <p>I've learned senior means saying no gracefully: no to screens that don't simplify, no to dependencies that don't pay rent, no to “works on my device”. I design for offline, slow networks, low-end devices, and currency/locale quirks—especially across <strong>MMK / THB / USD</strong> markets.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-[13px]">
                {[
                  'Architecture reviews & ADRs',
                  'Baseline Profiles + Perf CI',
                  'Offline-first + sync contracts',
                  'Accessibility & hardening',
                  'Mentorship & design critiques',
                  'PRD → Roadmap translation',
                ].map(i=><div key={i} className="flex items-center gap-2"><Check size={14} className="text-[#C6FF00]"/>{i}</div>)}
              </div>
            </div>
          </GlassCard>

          <div id="resume" className="grid gap-6 content-start">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between"><h4 className="font-semibold text-[14px] tracking-wide uppercase text-white/80">Resume Snapshot</h4><button onClick={()=>scrollTo('experience')} className="text-[11px] text-white/50 hover:text-white flex items-center gap-1">Timeline <ChevronRight size={12}/></button></div>
              <div className="mt-5 space-y-4">
                {experience.map(e=>(
                  <div key={e.role} className="flex gap-4 border-l border-white/10 pl-4 relative">
                    <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.08)]"/>
                    <div><div className="text-[13px] font-medium text-white">{e.role}</div><div className="text-[11px] text-white/45">{e.org} • {e.time}</div><div className="mt-1.5 text-[12.5px] leading-[1.6] text-white/60">{e.blurb}</div></div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2"><button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-[12.5px]"><Download size={14}/> Download CV</button><span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] text-white/60">PDF • 1 page • Updated Jan 2026</span></div>
            </GlassCard>
            <GlassCard className="p-6">
              <div className="text-[12px] tracking-[0.18em] uppercase text-white/50">Certifications</div>
              <div className="mt-4 grid gap-3 text-[13px] text-white/70">
                <div className="flex justify-between"><span>Android Performance (Advanced)</span><span className="text-white/30">2024</span></div>
                <div className="flex justify-between"><span>Associate Android Dev — Google</span><span className="text-white/30">2022</span></div>
                <div className="flex justify-between"><span>Accessibility for Android</span><span className="text-white/30">2023</span></div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      {/* SKILLS & STACK */}
      <Section id="stack" kicker="Capabilities" title="Skills grouped by outcome, not buzzwords.">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {skillsGroups.map(g=>(
            <GlassCard key={g.k} className="p-6">
              <div className="h-9 w-9 rounded-xl bg-white/[0.06] border border-white/10 grid place-items-center text-white/80"><g.icon size={16}/></div>
              <h4 className="mt-4 text-[13px] tracking-[0.14em] uppercase text-white/80">{g.k}</h4>
              <ul className="mt-4 space-y-2.5">{g.items.map(i=><li key={i} className="text-[13px] leading-[1.5] text-white/60 flex gap-2"><span className="text-white/20">—</span>{i}</li>)}</ul>
            </GlassCard>
          ))}
        </div>

        <div className="mt-10">
          <GlassCard className="p-6 md:p-10 overflow-hidden relative">
            <div className="absolute inset-0 opacity-60" style={{ background:'radial-gradient(700px at 70% -20%, rgba(91,108,255,0.18), transparent)'}}/>
            <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-center">
              <div>
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] tracking-wide text-white/60">Tech Stack • Layered</div>
                <h3 className="mt-4 text-[28px] leading-[1.05] tracking-[-0.02em] font-[600]">Presentation → Domain → Data → Platform</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-white/60">A disciplined stack avoids “everything in ViewModel”. Clear boundaries, unidirectional data, and testable I/O. No global singletons leaking.</p>
                <div className="mt-6 flex flex-wrap gap-2"><Pill active>Compose + MVI</Pill><Pill>KMP Domain</Pill><Pill>SQL • WorkManager</Pill><Pill>Security • Biometric</Pill></div>
              </div>
              <div className="space-y-3">
                {[
                  { layer:'UI • Design System', desc:'Compose, Material3 custom DS, tokens, motion', accent:'#00E5FF' },
                  { layer:'Presentation • State', desc:'MVI, Orbit/Molecule, side-effects isolation', accent:'#5B6CFF' },
                  { layer:'Domain • Logic', desc:'UseCases, KMP shared, pure Kotlin, tests 80%+', accent:'#8B5CF6' },
                  { layer:'Data • Sources', desc:'Room/SQLDelight, Retrofit/Ktor, Store5 caching', accent:'#C6FF00' },
                  { layer:'Platform • Delivery', desc:'Baseline Profiles, R8, Modular, FD, CI guardrails', accent:'#ffffff' },
                ].map(l=>(
                  <div key={l.layer} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition-colors">
                    <div className="h-10 w-1 rounded-full" style={{ background:l.accent, boxShadow:`0 0 16px ${l.accent}55` }} />
                    <div className="flex-1"><div className="text-[13px] font-medium text-white">{l.layer}</div><div className="text-[12px] text-white/50">{l.desc}</div></div>
                    <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60"/>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* System design + architecture + perf + more */}
      <Section id="system-design" kicker="How I build" title="Case studies index, system design, architecture, performance.">
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            { id:'case-studies', icon:BookOpen, title:'Case Studies', desc:'Public breakdowns of real constraints: offline queues, image pipelines, currency edge-cases, and rollout safety.', bullets:['Decision logs • tradeoffs','Sequence + data flow','Failure scenarios & recovery'] },
            { id:'android-arch', icon:Layers, title:'Android Architecture', desc:'Feature modules, unidirectional state, isolated side-effects. No god ViewModels. Clear ownership.', bullets:['Feature API / Impl split','Navigation contracts','Dependency rules'] },
            { id:'performance', icon:Gauge, title:'Performance Discipline', desc:'Startup, jank, RSS, battery. Budgets, not wishes. Benchmarks block CI.', bullets:['Baseline Profile + Dex layout','Macrobenchmark • TTI','Memory • Compose stability'] },
            { id:'open-source', icon:Github, title:'Open Source', desc:'Compose utilities, MVI helpers, and offline queue abstractions. MIT. Documented.', bullets:['compose-paging-canvas','offline-queue-core','arch-lint-rules'] },
            { id:'github', icon:GitBranch, title:'GitHub Activity', desc:'Weekly demo apps, repros, and performance notes. Transparent, not vanity metrics.', bullets:['280+ contributions / yr','PR reviews 12h SLA','No AI-generated filler'] },
            { id:'labs', icon:FlaskConical, title:'Labs', desc:'R&D on Glance widgets, Wear tiles, CameraX ML, and KMP image pipeline.', bullets:['Q1: Widget personalization','Q2: Passkeys UX','Q3: KMP camera'] },
          ].map(card=>(
            <GlassCard key={card.id} className="p-6 group">
              <div className="flex items-center gap-3"><div className="h-9 w-9 grid place-items-center rounded-xl bg-white/[0.06] border border-white/10"><card.icon size={16}/></div><div className="text-[11px] tracking-[0.18em] uppercase text-white/40">{card.id.replace('-',' ')}</div></div>
              <h3 className="mt-4 text-[18px] font-semibold tracking-tight">{card.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.6] text-white/60">{card.desc}</p>
              <ul className="mt-4 space-y-2 text-[12.5px] text-white/60">{card.bullets.map(b=><li key={b} className="flex gap-2"><Check size={12} className="mt-[2px] text-cyan-300 shrink-0"/>{b}</li>)}</ul>
              <button onClick={()=>scrollTo(card.id)} className="mt-6 inline-flex items-center gap-2 text-[12px] text-white/70 hover:text-white">Explore <ArrowRight size={12}/></button>
            </GlassCard>
          ))}
        </div>

        <div id="case-studies" className="mt-10 grid lg:grid-cols-2 gap-5">
          <GlassCard className="p-7">
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/40">System Design • Sample</div>
            <h4 className="mt-3 text-[20px] leading-[1.2] font-semibold">Offline-first checkout for volatile networks</h4>
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-[11.5px] leading-[1.7] text-white/60">
              <div>Client → Queue (Room + WAL)</div>
              <div>→ Conflict resolver (LWW + server wins for money)</div>
              <div>→ WorkManager (exp backoff, metered policy)</div>
              <div>→ Reconciliation service (idempotency keys)</div>
              <div className="mt-3 text-cyan-200">Invariants: no duplicate charges, no lost cart. MMK/THB rounding at display layer only.</div>
            </div>
          </GlassCard>
          <GlassCard id="accessibility" className="p-7">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.18em] uppercase text-white/40"><Accessibility size={12}/> Accessibility • Localization • Design System</div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="text-[12px] font-medium">WCAG 2.2 AA</div><div className="mt-1 text-[11px] text-white/50">Compose semantics, 1.5x touch targets, dynamic type</div></div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="text-[12px] font-medium">L10n • 3 locales</div><div className="mt-1 text-[11px] text-white/50">my / en / th, ICU, locale-aware number & currency</div></div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3"><div className="text-[12px] font-medium">Design tokens</div><div className="mt-1 text-[11px] text-white/50">Semantic colors, spacing, motion. Figma ↔ Code</div></div>
            </div>
            <div id="design-system" className="mt-5 flex items-center gap-2 text-[11px] text-white/40"><Palette size={12}/> DS: Buttons, Cards, Inputs verified with screenshot tests • 97% coverage</div>
          </GlassCard>
        </div>
      </Section>

      {/* TESTIMONIALS + Experience + Writing etc */}
      <Section id="testimonials" kicker="Trust" title="What engineering managers say.">
        <div className="grid lg:grid-cols-3 gap-5">
          {[
            { quote:'He turned our fragile codebase into a system we can hire into. PRs got smaller, crashes disappeared.', name:'Eve Tran', role:'EM, Fintech SG', stars:5 },
            { quote:'Best Android perf work I have seen — Baseline Profiles delivered real TTI gains across low-end devices in Myanmar.', name:'K. Srisawat', role:'Head Product, Commerce TH', stars:5 },
            { quote:'Calm, senior, opinionated where it matters. Excellent at translating PM ambiguity into buildable plans.', name:'Min H.', role:'CPO, Yangon Studio', stars:5 },
          ].map(t=>(
            <GlassCard key={t.name} className="p-6 flex flex-col">
              <div className="flex items-center gap-1 text-[#C6FF00]">{Array.from({ length:t.stars }).map((_,i)=><Star key={i} size={12} fill="currentColor"/>)}</div>
              <div className="mt-4 text-[14px] leading-[1.6] text-white/80"><Quote size={14} className="inline mr-2 opacity-40"/>{t.quote}</div>
              <div className="mt-auto pt-6 flex items-center gap-3"><div className="h-8 w-8 rounded-full bg-white/10"/><div><div className="text-[13px] font-medium">{t.name}</div><div className="text-[11px] text-white/50">{t.role}</div></div></div>
            </GlassCard>
          ))}
        </div>

        <div id="experience" className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
          <GlassCard className="p-7">
            <h4 className="text-[14px] tracking-[0.18em] uppercase text-white/60">Writing • Talks • Mentorship • Awards</h4>
            <div className="mt-6 grid gap-4">
              <div className="flex gap-3"><BookOpen size={14} className="mt-1 text-cyan-300"/><div><div className="text-[13px] font-medium">Blog: Compose Stability Field Guide (2025)</div><div className="text-[12px] text-white/50">Read by 12k Android devs • KotlinConf slides</div></div></div>
              <div className="flex gap-3"><Mic size={14} className="mt-1 text-violet-300"/><div><div className="text-[13px] font-medium">Talk: Baseline Profiles That Actually Move P95</div><div className="text-[12px] text-white/50">DroidKaigi BKK, Android Makers TH</div></div></div>
              <div className="flex gap-3"><Users size={14} className="mt-1 text-[#C6FF00]"/><div><div className="text-[13px] font-medium">Mentorship: 18 juniors → mid-level</div><div className="text-[12px] text-white/50">Weekly architecture reviews, pairing</div></div></div>
              <div className="flex gap-3"><Award size={14} className="mt-1 text-blue-300"/><div><div className="text-[13px] font-medium">Award: Play Feature — Editor’s Choice (Orbit)</div><div className="text-[12px] text-white/50">Commerce category • TH + MM</div></div></div>
            </div>
          </GlassCard>
          <GlassCard className="p-7 overflow-hidden">
            <div className="flex items-center justify-between"><span className="text-[11px] tracking-[0.18em] uppercase text-white/40">Services snapshot</span><span className="text-[11px] text-white/30 font-mono">CONSULT • DELIVER • SCALE</span></div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {[
                { title:'Architecture Audit', desc:'2-week deep dive, ADRs, roadmap.', icon:Shield },
                { title:'Perf Sprint', desc:'Startup, jank, memory. CI guard.', icon:Gauge },
                { title:'Team Uplift', desc:'Compose • MVI • Testing workshop.', icon:Users },
              ].map(s=>(
                <div key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><s.icon size={16} className="text-white/70"/><div className="mt-3 text-[13px] font-medium">{s.title}</div><div className="mt-1 text-[11.5px] leading-[1.5] text-white/50">{s.desc}</div></div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[11px] text-white/40"><Globe size={12}/> Remote-first, onsite in BKK available • Timezone GMT+6.5/+7</div>
          </GlassCard>
        </div>
      </Section>

      {/* PRICING CURRENCY-AWARE */}
      <Section id="pricing" kicker={`Pricing • ${currency}`} title={t('pricing_title')} desc={`Transparent engagement models. Prices adapt to ${currency} with locale-aware formatting. No hidden retainers. Pause or scale monthly.`}>
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { tier:'Advisory', usd:1800, note:'For EMs who need second brain', features:['Weekly arch review + ADRs','Slack 48h async','Perf budget setup','Roadmap & hiring plan'], accent:'#00E5FF' },
            { tier:'Delivery Sprint', usd:5200, note:'Best for shipping 1 critical flow', popular:true, features:['4-week squad • you + me','Compose/MVI implementation','Baseline Profiles + CI','Release plan & observability'], accent:'#8B5CF6' },
            { tier:'Full Partnership', usd:11200, note:'Own Android track end-to-end', features:['2 sprints • roadmap owns','Modularization + DS','Team mentorship','Play rollout & vitals'], accent:'#C6FF00' },
          ].map(card=>(
            <GlassCard key={card.tier} className={`relative p-7 flex flex-col ${card.popular?'border-white/20 bg-white/[0.06]':''}`}>
              {card.popular && <div className="absolute -top-3 left-7 rounded-full bg-white text-black text-[10px] tracking-[0.14em] uppercase px-2.5 py-1">Most chosen</div>}
              <div className="flex items-center justify-between"><h4 className="text-[18px] font-semibold">{card.tier}</h4><div className="h-2 w-2 rounded-full" style={{ background:card.accent, boxShadow:`0 0 12px ${card.accent}` }}/></div>
              <div className="mt-2 text-[13px] text-white/50">{card.note}</div>
              <div className="mt-6 flex items-baseline gap-2"><span className="text-[36px] leading-none tracking-tight font-[700]">{format(card.usd)}</span><span className="text-[12px] text-white/40">/ month</span></div>
              <div className="mt-1 text-[11px] text-white/30">orig ${card.usd.toLocaleString()} USD • billed in {currency} • 50% prep</div>
              <ul className="mt-6 space-y-3 text-[13px] text-white/70">{card.features.map(f=><li key={f} className="flex gap-2"><Check size={14} className="mt-[2px] text-emerald-300"/>{f}</li>)}</ul>
              <button onClick={()=>scrollTo('contact')} className="mt-8 h-11 rounded-full bg-white text-black text-[13px] font-medium hover:bg-white/90">Start conversation — {card.tier} <ArrowUpRight size={14} className="ml-1 inline"/></button>
              <div className="mt-3 text-center text-[11px] text-white/30">No lock-in • Cancel anytime • NDA ready</div>
            </GlassCard>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4 text-[12px] text-white/45">
          <GlassCard className="px-4 py-3 flex items-center gap-2"><Figma size={14}/> Figma → Code handoff included</GlassCard>
          <GlassCard className="px-4 py-3 flex items-center gap-2"><Database size={14}/> Invoice in MMK/THB/USD, locale-aware</GlassCard>
          <GlassCard className="px-4 py-3 flex items-center gap-2"><Shield size={14}/> Security review & Play policy check</GlassCard>
        </div>
      </Section>

      {/* FAQ + LEGAL + CONTACT */}
      <Section id="faq" kicker="FAQ • Legal" title="Clarity upfront. No surprises.">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="grid gap-3">
            {[
              { q:'How do you handle MMK/THB edge cases?', a:'Rounding, display, and ledger math are separate. Display uses locale formatting, money stored as minor units. Tests include Unicode/comma quirks.'},
              { q:'Do you work hourly?', a:'No. Outcome-based sprints with weekly demos. Hourly incentivizes slow. I ship.'},
              { q:'Compose in production?', a:'Yes, since 2021. Stability configs, custom layout for performance, screenshot tests.'},
              { q:'KMP or pure Android?', a:'Share domain/logic, keep UI native. KMP isn’t religion—it’s cost trade-off.'},
              { q:'What about accessibility?', a:'Semantics, TalkBack, focus order, 48dp targets. Verified with automated + manual passes.'},
            ].map(f=>(
              <GlassCard key={f.q} className="p-5">
                <div className="flex gap-3"><HelpCircle size={16} className="mt-0.5 text-white/40"/><div><div className="text-[14px] font-medium">{f.q}</div><div className="mt-1.5 text-[13px] leading-[1.6] text-white/55">{f.a}</div></div></div>
              </GlassCard>
            ))}
          </div>

          <div className="grid gap-6 content-start">
            <GlassCard id="legal" className="p-6">
              <div className="flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-white/40"><FileText size={12}/> Legal • Privacy • Terms</div>
              <div className="mt-4 space-y-2 text-[12.5px] leading-[1.6] text-white/60">
                <p>Portfolio content is my own. Client work respects NDAs—metrics shared with permission or anonymized. No trackers, no fingerprinting. Contact via email only.</p>
                <p>Code samples: MIT unless noted. No warranty. “Fast, stable, scalable” refers to measured improvements on referenced projects, not guarantees.</p>
                <div className="pt-3 flex gap-2 text-[11px]"><Pill>my_MM</Pill><Pill>th_TH</Pill><Pill>en_GB</Pill></div>
              </div>
            </GlassCard>

            <GlassCard id="contact" className="p-7 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(500px_at_80%_0%,rgba(0,229,255,0.12),transparent)]"/>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"/> Available for Q1 • Response &lt; 12h</div>
                <h3 className="mt-5 text-[28px] leading-[1.05] tracking-[-0.02em] font-semibold">Let’s ship something teams are proud to own.</h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/55">Tell me stack, pain, timeline, and budget. I’ll reply with a concrete plan + risks in 12 hours.</p>

                <div className="mt-7 grid gap-3">
                  <div className="flex gap-2">
                    <input placeholder="you@company.com" className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 h-11 text-[13.5px] placeholder:text-white/30 focus:outline-none focus:border-white/20"/>
                    <MagneticButton className="h-11 bg-white text-black px-6 text-[13.5px]"><Mail size={14} className="mr-2"/>Email</MagneticButton>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-full border border-white/10 bg-white/[0.03] h-11 text-[13px] text-white/70 hover:text-white flex items-center justify-center gap-2"><Github size={14}/> GitHub</button>
                    <button className="flex-1 rounded-full border border-white/10 bg-white/[0.03] h-11 text-[13px] text-white/70 hover:text-white flex items-center justify-center gap-2"><Linkedin size={14}/> LinkedIn</button>
                  </div>
                  <div className="mt-2 text-[11px] text-white/35 flex items-center gap-2"><MapPin size={12}/> Bangkok • Yangon • Remote — GMT+6:30 / +7 @ senior.mobile.engineer • Rate cards in {currency}</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </Section>

      <footer className="border-t border-white/10 mt-10 bg-[#0a0d14]/80 backdrop-blur">
        <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-12 grid lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-10">
          <div>
            <div className="h-8 w-8 rounded-full bg-white text-black grid place-items-center font-bold text-[13px]">SM</div>
            <div className="mt-4 text-[13px] leading-[1.6] text-white/60">Senior Android Engineer — Kotlin, Compose, architecture, performance. Shipping premium mobile systems for finance & commerce across SEA.</div>
            <div className="mt-5 flex gap-2"><a className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.04]" href="#"><Github size={14}/></a><a className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.04]" href="#"><Linkedin size={14}/></a><a className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.04]" href="#"><Mail size={14}/></a></div>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/40">Portfolio</div>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/60">{['Projects','Case Studies','System Design','Architecture','Performance','Open Source','Labs'].map(l=><li key={l} className="hover:text-white cursor-pointer">{l}</li>)}</ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/40">More</div>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/60">{['Writing','Talks','Mentorship','Awards','Design System','Accessibility','Pricing','FAQ','Legal'].map(l=><li key={l} className="hover:text-white cursor-pointer">{l}</li>)}</ul>
          </div>
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-white/40">Contact & locale</div>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[12px] text-white/80">Email</div><div className="text-[13px] text-white/60">hello@senior.mobile • ships in 12h</div>
                <div className="mt-3 flex gap-2">
                  <select value={locale} onChange={e=>setLocale(e.target.value as Locale)} className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[12px] text-white/70">
                    {locales.map(l=><option key={l} value={l}>{localeNames[l as Locale]} — {l.toUpperCase()}</option>)}
                  </select>
                  <select value={currency} onChange={e=>setCurrency(e.target.value as Currency)} className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[12px] text-white/70">
                    {currencies.map(c=><option key={c} value={c}>{c} • {c==='USD'?'$':c==='THB'?'฿':'K'}</option>)}
                  </select>
                </div>
              </div>
              <div className="text-[11px] leading-[1.5] text-white/35">© 2026 Senior Mobile. Built with Kotlin-brain, Compose-heart. No templates. No AI slop. Fast, stable, scalable — by design.</div>
            </div>
          </div>
        </div>
      </footer>

      {/* Project detail modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-[18px] p-4 md:p-8" onClick={()=>setActiveProject(null)}>
            <motion.div initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:20, opacity:0 }} onClick={e=>e.stopPropagation()} className="w-full max-w-[920px] max-h-[90vh] overflow-auto rounded-[28px] border border-white/15 bg-[#0e131c] p-7 md:p-10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]">
              {(() => {
                const p = projects.find(x=>x.slug===activeProject)!;
                return (
                  <>
                    <div className="flex items-start justify-between gap-6">
                      <div><div className="text-[11px] tracking-[0.18em] uppercase text-white/40">{p.cat} • {p.year}</div><h3 className="mt-2 text-[28px] leading-[1.05] font-semibold tracking-tight">{p.title}</h3><p className="mt-3 text-[14px] leading-[1.7] text-white/60 max-w-[640px]">{p.desc}</p></div>
                      <button onClick={()=>setActiveProject(null)} className="h-9 w-9 grid place-items-center rounded-full border border-white/10 bg-white/[0.06]"><X size={14}/></button>
                    </div>
                    <div className="mt-6 grid md:grid-cols-3 gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="text-[11px] uppercase tracking-wide text-white/40">Impact</div><div className="mt-2 text-[22px] font-bold">{p.metric}</div><div className="mt-1 text-[12px] text-white/50">Measured on Play Console & Firebase</div></div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="text-[11px] uppercase tracking-wide text-white/40">Stack</div><div className="mt-2 flex flex-wrap gap-1.5">{p.tags.map(t=><Pill key={t}>{t}</Pill>)}</div></div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="text-[11px] uppercase tracking-wide text-white/40">Links</div><div className="mt-3 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white text-black px-3 py-1.5 text-[12px]">Case study <ExternalLink size={12}/></span><span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/70"><Github size={12}/> Repo (private)</span></div></div>
                    </div>
                    <div className="mt-8 grid md:grid-cols-[1.2fr_0.8fr] gap-6">
                      <div className="rounded-2xl border border-white/10 bg-black/50 p-5 font-mono text-[12px] leading-[1.8] text-white/60">
                        <div className="text-white/80">// architecture • data flow</div>
                        <div className="mt-3">Screen → Intent → ViewModel(MVI) → UseCase(KMP)</div>
                        <div>→ Repository (Store5) → Room / Ktor → Sync</div>
                        <div className="mt-3 text-cyan-200">Side-effects: nav, toast isolated. No leaks.</div>
                        <div className="mt-3">Testing: Turbine + Kotest • Paparazzi snapshots</div>
                        <div className="mt-4 h-px bg-white/10"/>
                        <div className="mt-4 text-white/40">Perf notes: Baseline Profiles trimmed startup {p.color===''+p.color?'-38%':''}. Aggressive reuse, immutable models, stability config.</div>
                      </div>
                      <div className="grid gap-4">
                        <GlassCard className="p-4"><div className="text-[12px] font-medium">What I owned</div><ul className="mt-2 space-y-1.5 text-[12px] text-white/60"><li>• System design & ADRs</li><li>• Modularization & navigation contracts</li><li>• Perf budgets & CI blockers</li><li>• Release & observability</li></ul></GlassCard>
                        <GlassCard className="p-4"><div className="text-[12px] font-medium">Mi / En / Th nuance</div><p className="mt-2 text-[12px] leading-[1.6] text-white/55">Number formatting, currency display, and input parsing vary. Myanmar uses mixed commas and MMK lacks decimals in UI. All handled in presentation layer with locale-aware utils.</p></GlassCard>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function App(){
  useEffect(()=>{
    document.title = "Senior Mobile / Android — Premium Portfolio 2026";
    const link = document.querySelector('link[rel=\"icon\"]') as HTMLLinkElement | null;
    if (link) link.href = "/favicon.svg";
  },[]);
  return (
    <I18nProvider>
      <CurrencyProvider>
        <AppInner/>
      </CurrencyProvider>
    </I18nProvider>
  )
}
