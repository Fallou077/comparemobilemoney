"use client";
import { useState, useEffect } from "react";

// ─── MOBILE HOOK ──────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  dark:"#0D1B2A", dark2:"#1A3A52", green:"#00C853", greenD:"#00A844",
  blue:"#1A8CFF", orange:"#FF6600", red:"#E31E24", purple:"#7C3AED",
  teal:"#0D9488", bg:"#F7F9FC", border:"#E8EDF2", muted:"#6B7A8D",
};

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const T = {
  fr: {
    nav:{ compare:"Comparer", calc:"Calculateur", convert:"Conversion", intl:"International", africa:"Afrique", alerts:"Alertes", lang:"EN" },
    hero:{ badge:"Wave · Orange Money · MTN MoMo · M-Pesa · Sendwave · WorldRemit", title1:"Comparez tous les services", title2:"Mobile Money", title3:"en Afrique", sub:"Frais, conversions, transferts internationaux — trouvez toujours l'option la moins chère.", btn1:"Calculer mes frais →", btn2:"Guide conversion", s1:"Opérateurs couverts", s2:"Services internationaux", s3:"Envoi Wave", s4:"Accès gratuit" },
    calc:{ eyebrow:"⚡ Calculateur instantané", title:"Combien payez-vous vraiment ?", sub:"Entrez un montant et comparez les frais en temps réel", send:"📤 Envoyer", withdraw:"🏧 Retirer", fees:"Frais", net:"Net envoyé", netW:"Net reçu", best:"✓ MEILLEUR PRIX", tip:"En choisissant Wave, vous économisez" },
    compare:{ eyebrow:"🔍 Comparatif complet", title:"Qui est le meilleur opérateur ?", sub:"Fonctionnalités, limites et grilles tarifaires", tabs:["Fonctionnalités","Limites","Tarifs"], daily:"Limite/jour", monthly:"Limite/mois", balance:"Solde max" },
    reviews:{ eyebrow:"⭐ Avis utilisateurs", title:"Ce qu'en pensent les utilisateurs", sub:"Avis vérifiés de la communauté — partagez votre expérience", placeholder:"Partagez votre expérience...", submit:"Publier mon avis", label:"Votre avis :", criteria:["Fiabilité","Vitesse","Service client","Rapport qualité/prix"], verif:"Avis vérifié" },
    africa:{ eyebrow:"🌍 Afrique de l'Ouest & de l'Est", title:"Couverture panafricaine", sub:"MTN MoMo, Moov Money, M-Pesa, Airtel Money — comparez tous les opérateurs du continent", tabs:["Afrique de l'Ouest","Afrique de l'Est"], send:"Envoi", withdraw:"Retrait", limit:"Limite/jour" },
    newsletter:{ eyebrow:"📊 Newsletter Premium", title:"Analyses & tendances Mobile Money", sub:"Chaque semaine : analyse des marchés, nouvelles offres, opportunités d'arbitrage de frais", free:"Gratuit", premium:"Premium", freeFeats:["Alertes changements de tarifs","Comparatif mensuel opérateurs","Nouvelles offres & promotions"], premFeats:["Analyse approfondie des marchés","Tendances & prévisions du secteur","Rapport exclusif diaspora","Opportunités d'arbitrage de frais","Accès prioritaire aux nouvelles données"], freeBtn:"S'abonner gratuitement →", premBtn:"Accès Premium — 2 000 FCFA/mois", placeholder:"votre@email.com", sent:"✓ Inscription confirmée ! Vérifiez votre boîte mail." },
    footer:{ tagline:"Le site de référence pour comparer les services Mobile Money en Afrique.", made:"Fait au Sénégal avec ❤️", legal:"Les tarifs sont indicatifs. Vérifiez auprès des opérateurs officiels." },
  },
  en: {
    nav:{ compare:"Compare", calc:"Calculator", convert:"Convert", intl:"International", africa:"Africa", alerts:"Alerts", lang:"FR" },
    hero:{ badge:"Wave · Orange Money · MTN MoMo · M-Pesa · Sendwave · WorldRemit", title1:"Compare all", title2:"Mobile Money", title3:"services in Africa", sub:"Fees, conversions, international transfers — always find the cheapest option.", btn1:"Calculate my fees →", btn2:"Conversion guide", s1:"Operators covered", s2:"International services", s3:"Wave transfer", s4:"Free access" },
    calc:{ eyebrow:"⚡ Instant calculator", title:"How much do you really pay?", sub:"Enter an amount and compare fees in real time", send:"📤 Send", withdraw:"🏧 Withdraw", fees:"Fees", net:"Net sent", netW:"Net received", best:"✓ BEST PRICE", tip:"By choosing Wave, you save" },
    compare:{ eyebrow:"🔍 Full comparison", title:"Which is the best operator?", sub:"Features, limits and fee schedules", tabs:["Features","Limits","Fees"], daily:"Daily limit", monthly:"Monthly limit", balance:"Max balance" },
    reviews:{ eyebrow:"⭐ User reviews", title:"What users say", sub:"Verified community reviews — share your experience", placeholder:"Share your experience...", submit:"Post my review", label:"Your review:", criteria:["Reliability","Speed","Customer service","Value for money"], verif:"Verified review" },
    africa:{ eyebrow:"🌍 West & East Africa", title:"Pan-African coverage", sub:"MTN MoMo, Moov Money, M-Pesa, Airtel Money — compare all continent operators", tabs:["West Africa","East Africa"], send:"Send", withdraw:"Withdraw", limit:"Daily limit" },
    newsletter:{ eyebrow:"📊 Premium Newsletter", title:"Mobile Money analysis & trends", sub:"Weekly: market analysis, new offers, fee arbitrage opportunities", free:"Free", premium:"Premium", freeFeats:["Rate change alerts","Monthly operator comparison","New offers & promotions"], premFeats:["In-depth market analysis","Sector trends & forecasts","Exclusive diaspora report","Fee arbitrage opportunities","Priority access to new data"], freeBtn:"Subscribe for free →", premBtn:"Premium access — 2,000 FCFA/month", placeholder:"your@email.com", sent:"✓ Confirmed! Check your inbox." },
    footer:{ tagline:"The reference site for comparing Mobile Money services in Africa.", made:"Made in Senegal with ❤️", legal:"Fees are indicative. Always verify with official operators." },
  },
};

// ─── SENEGAL OPERATORS ────────────────────────────────────────────────────────
const OPERATORS = [
  {
    id:"wave", name:"Wave", logo:"W", color:C.blue, light:"#E8F4FF",
    tagline:{ fr:"Zéro frais d'envoi", en:"Zero transfer fees" },
    fees:{ send:0, withdraw:[{max:5000,fee:0},{max:20000,fee:150},{max:50000,fee:300},{max:100000,fee:500},{max:500000,fee:1000}], deposit:0 },
    limits:{ daily:2000000, monthly:10000000, balance:2000000 },
    features:{ "Envoi gratuit":true,"Retrait low-cost":true,"Paiement marchand":true,"Transfert intl":false,"Crédit":false,"Cashback":true },
    rating:4.7, users:"8M+",
    reviews:[
      { author:"Moussa D.", date:"Jan 2026", rating:5, text:"Meilleur service, zéro frais c'est inégalable. Je recommande à tout le monde.", verified:true },
      { author:"Fatou K.", date:"Déc 2025", rating:4, text:"Très pratique mais le réseau plante parfois le week-end.", verified:true },
      { author:"Ibrahim S.", date:"Nov 2025", rating:5, text:"Révolutionnaire pour les envois d'argent au Sénégal.", verified:false },
    ],
  },
  {
    id:"orange", name:"Orange Money", logo:"O", color:C.orange, light:"#FFF0E6",
    tagline:{ fr:"Le plus répandu", en:"Most widespread" },
    fees:{
      send:[{max:5000,fee:50},{max:15000,fee:75},{max:30000,fee:100},{max:70000,fee:200},{max:150000,fee:350},{max:500000,fee:750}],
      withdraw:[{max:5000,fee:100},{max:15000,fee:150},{max:30000,fee:250},{max:70000,fee:400},{max:150000,fee:700},{max:500000,fee:1200}],
      deposit:0,
    },
    limits:{ daily:1500000, monthly:5000000, balance:1500000 },
    features:{ "Envoi gratuit":false,"Retrait low-cost":false,"Paiement marchand":true,"Transfert intl":true,"Crédit":true,"Cashback":false },
    rating:4.2, users:"15M+",
    reviews:[
      { author:"Aminata B.", date:"Jan 2026", rating:4, text:"Très bien pour les transferts internationaux, présent partout.", verified:true },
      { author:"Cheikh M.", date:"Jan 2026", rating:3, text:"Les frais sont élevés mais le réseau d'agents est incomparable.", verified:true },
      { author:"Aïssatou N.", date:"Déc 2025", rating:4, text:"Fiable et disponible même dans les zones rurales.", verified:false },
    ],
  },
  {
    id:"free", name:"Free Money", logo:"F", color:C.red, light:"#FFEAEB",
    tagline:{ fr:"Offres agressives", en:"Aggressive offers" },
    fees:{
      send:[{max:5000,fee:25},{max:15000,fee:50},{max:30000,fee:75},{max:70000,fee:150},{max:150000,fee:300},{max:500000,fee:600}],
      withdraw:[{max:5000,fee:75},{max:15000,fee:125},{max:30000,fee:200},{max:70000,fee:350},{max:150000,fee:600},{max:500000,fee:1000}],
      deposit:0,
    },
    limits:{ daily:1000000, monthly:4000000, balance:1000000 },
    features:{ "Envoi gratuit":false,"Retrait low-cost":true,"Paiement marchand":true,"Transfert intl":false,"Crédit":false,"Cashback":true },
    rating:4.0, users:"3M+",
    reviews:[
      { author:"Oumar F.", date:"Jan 2026", rating:4, text:"Bonne alternative à Orange Money, les frais sont plus bas.", verified:true },
      { author:"Mariama C.", date:"Déc 2025", rating:3, text:"Moins d'agents que Orange mais les tarifs valent le déplacement.", verified:true },
    ],
  },
];

// ─── WEST AFRICA OPERATORS ────────────────────────────────────────────────────
const WEST_AFRICA_OPS = [
  { id:"mtn", name:"MTN MoMo", logo:"MTN", color:"#FFC300", light:"#FFFBEB", country:"🇨🇮 🇬🇭 🇳🇬 🇨🇲 🇧🇯", tagline:"Leader en Afrique", send:"0,5–1%", withdraw:"0,5–1,5%", limit:"2 000 000 FCFA", users:"50M+", rating:4.3, features:["Paiement marchand","Microcrédit","Épargne","Transfert UEMOA","App mobile"], tip:"Dominant au Ghana, Côte d'Ivoire et Nigeria. L'opérateur le plus large du continent." },
  { id:"moov", name:"Moov Money", logo:"MOV", color:"#0066CC", light:"#EBF4FF", country:"🇧🇫 🇨🇮 🇹🇬 🇧🇯 🇳🇪", tagline:"Afrique francophone", send:"0,8–1,2%", withdraw:"1–1,5%", limit:"1 500 000 FCFA", users:"12M+", rating:3.9, features:["Paiement marchand","Assurance mobile","Transfert UEMOA","USSD *155#"], tip:"Fort en Burkina Faso et Togo. Bon choix pour les transferts dans la zone UEMOA." },
  { id:"flooz", name:"Flooz (Wari)", logo:"FLZ", color:"#8B5CF6", light:"#F5F3FF", country:"🇸🇳 🇨🇮 🇧🇫 🇲🇱 🇬🇳", tagline:"Sénégalais à l'international", send:"0,5–1%", withdraw:"1%", limit:"1 000 000 FCFA", users:"5M+", rating:3.8, features:["Transfert UEMOA","Paiement en ligne","Compatible Wave","USSD disponible"], tip:"Racheté par Wave. Permet des transferts rapides entre pays UEMOA à faibles frais." },
  { id:"celtiis", name:"CeltisPay", logo:"CEL", color:"#10B981", light:"#ECFDF5", country:"🇧🇯 🇹🇬 🇬🇳", tagline:"Bénin & Togo", send:"1–1,5%", withdraw:"1–2%", limit:"800 000 FCFA", users:"2M+", rating:3.7, features:["Paiement marchand","Transfert local","USSD *144#"], tip:"Solution locale fiable au Bénin et Togo. Moins connu mais très utilisé localement." },
];

// ─── EAST AFRICA OPERATORS ────────────────────────────────────────────────────
const EAST_AFRICA_OPS = [
  { id:"mpesa", name:"M-Pesa", logo:"M-P", color:"#00A651", light:"#E6F9EE", country:"🇰🇪 🇹🇿 🇷🇼 🇺🇬 🇲🇿", tagline:"Le pionnier mondial", send:"0%–1%", withdraw:"0,5–2%", limit:"300 000 KES", users:"51M+", rating:4.8, features:["Épargne M-Shwari","Crédit mobile","Fuliza découvert","API Daraja","Paiements merchants"], tip:"Le service Mobile Money le plus avancé au monde. Inventé au Kenya, intègre crédit, épargne et paiements." },
  { id:"airtel", name:"Airtel Money", logo:"AIR", color:"#ED1C24", light:"#FFF0F0", country:"🇺🇬 🇿🇲 🇿🇼 🇲🇼 🇲🇬", tagline:"Afrique anglophone", send:"0,5–1%", withdraw:"1–2%", limit:"5 000 000 UGX", users:"35M+", rating:4.1, features:["Transfert inter-pays","Paiement marchand","Épargne","Microcrédit"], tip:"Présent dans 14 pays africains. Fort concurrent de MTN en Ouganda, Zambie et Malawi." },
  { id:"ecocash", name:"EcoCash", logo:"ECO", color:"#F97316", light:"#FFF7ED", country:"🇿🇼 🇿🇲", tagline:"Dominant au Zimbabwe", send:"1–2%", withdraw:"1,5–2,5%", limit:"5 000 USD", users:"8M+", rating:3.9, features:["EcoSave épargne","Paiements merchants","Envoi diaspora","USSD *151#"], tip:"Très dominant au Zimbabwe malgré les défis économiques. Clé pour la diaspora zimbabwéenne." },
  { id:"tigo", name:"Tigo Pesa", logo:"TGO", color:"#0066FF", light:"#EBF4FF", country:"🇹🇿 🇷🇼 🇬🇭", tagline:"Tanzanie & Rwanda", send:"0,5–1%", withdraw:"1%", limit:"3 000 000 TZS", users:"10M+", rating:4.0, features:["Tigo Kilimo agri","Paiements scolaires","Transfert inter-réseaux"], tip:"Fort en Tanzanie avec des services spéciaux pour l'agriculture. Bien intégré avec M-Pesa." },
];

// ─── INTERNATIONAL OPERATORS ──────────────────────────────────────────────────
const INTL_OPERATORS = [
  { name:"Sendwave", logo:"SW", color:"#6366F1", light:"#EEF2FF", direction:"Diaspora → Sénégal", countries:["🇫🇷 France","🇺🇸 USA","🇬🇧 UK","🇧🇪 Belgique","🇩🇪 Allemagne"], destCountries:["🇸🇳 Sénégal","🇨🇮 Côte d'Ivoire","🇬🇭 Ghana","🇰🇪 Kenya"], fees:"0% de frais", feesNote:"Taux de change légèrement ajusté", speed:"Instantané", minAmount:"1 €", maxAmount:"2 500 € / jour", delivery:["Orange Money","Wave","Free Money","Bancaire"], rating:4.8, highlight:true, tip:"Meilleur pour la diaspora française vers le Sénégal" },
  { name:"WorldRemit", logo:"WR", color:"#059669", light:"#ECFDF5", direction:"International → Afrique", countries:["🇫🇷 France","🇺🇸 USA","🇬🇧 UK","🇨🇦 Canada","🇦🇺 Australie"], destCountries:["🇸🇳 Sénégal","🇨🇮 Côte d'Ivoire","🇳🇬 Nigeria","🇬🇭 Ghana","🇰🇪 Kenya"], fees:"0,99 € – 3,99 €", feesNote:"Varie selon le montant", speed:"Quelques minutes", minAmount:"1 €", maxAmount:"5 000 € / jour", delivery:["Orange Money","Wave","Virement","Cash pickup"], rating:4.4, highlight:false, tip:"Large couverture pays, bon pour les petits montants" },
  { name:"Lemfi", logo:"LF", color:"#DC2626", light:"#FEF2F2", direction:"Diaspora → Afrique", countries:["🇨🇦 Canada","🇬🇧 UK","🇺🇸 USA"], destCountries:["🇸🇳 Sénégal","🇨🇮 Côte d'Ivoire","🇳🇬 Nigeria","🇬🇭 Ghana"], fees:"0% (certains corridors)", feesNote:"Marges sur le taux de change", speed:"Instantané – 24h", minAmount:"10 $", maxAmount:"10 000 $ / mois", delivery:["Orange Money","Wave","Bancaire"], rating:4.3, highlight:false, tip:"Très populaire au Canada et UK pour la diaspora" },
  { name:"Orange Money Intl", logo:"OM", color:C.orange, light:"#FFF0E6", direction:"UEMOA ↔ UEMOA", countries:["🇸🇳 Sénégal","🇨🇮 Côte d'Ivoire","🇲🇱 Mali","🇧🇫 Burkina"], destCountries:["🇸🇳 Sénégal","🇨🇮 Côte d'Ivoire","🇲🇱 Mali","🇧🇫 Burkina","🇬🇳 Guinée"], fees:"1% – 2%", feesNote:"Minimum 200 FCFA", speed:"Instantané", minAmount:"500 FCFA", maxAmount:"1 500 000 FCFA / jour", delivery:["Orange Money","Cash"], rating:4.1, highlight:false, tip:"Idéal pour les transferts UEMOA entre abonnés Orange" },
  { name:"MoneyGram", logo:"MG", color:"#1D4ED8", light:"#EFF6FF", direction:"Monde → Sénégal", countries:["🇺🇸 USA","🇫🇷 France","🇬🇧 UK","🇮🇹 Italie","🇪🇸 Espagne"], destCountries:["🇸🇳 Sénégal","🌍 Toute l'Afrique"], fees:"3 $ – 15 $", feesNote:"Taux de change compétitif", speed:"Quelques minutes", minAmount:"1 $", maxAmount:"10 000 $ / tx", delivery:["Cash agents","Orange Money","Bancaire"], rating:3.9, highlight:false, tip:"Réseau d'agents physiques très étendu au Sénégal" },
  { name:"Western Union", logo:"WU", color:"#FBBF24", light:"#FFFBEB", direction:"Monde → Afrique", countries:["🌍 200+ pays"], destCountries:["🇸🇳 Sénégal","🌍 Toute l'Afrique"], fees:"5 $ – 20 $", feesNote:"Historiquement cher mais fiable", speed:"Quelques minutes", minAmount:"1 $", maxAmount:"50 000 $ / mois", delivery:["Cash agents","Bancaire"], rating:3.7, highlight:false, tip:"Couvre les destinations les plus reculées" },
];

// ─── CONVERSION METHODS ───────────────────────────────────────────────────────
const CONVERSION_METHODS = [
  { id:"interop", icon:"📱", title:"Via l'interopérabilité GIM-UEMOA", subtitle:"Transfert direct — GRATUIT", color:C.blue, light:"#E8F4FF", difficulty:"Facile", speed:"Instantané", cost:"0 FCFA via Wave", steps:["Ouvrez l'app Wave ou composez *878#","Sélectionnez 'Envoyer de l'argent'","Entrez le numéro Orange Money du destinataire","Confirmez — envoi Wave = 0 FCFA","✓ L'argent arrive directement sur Orange Money"], tips:"Meilleure méthode ! Wave → Orange Money est GRATUIT grâce à l'interopérabilité GIM-UEMOA.", warning:"Vérifiez que votre opérateur participe au système GIM-UEMOA." },
  { id:"agent", icon:"🏪", title:"Via un agent agréé", subtitle:"Simple et universel", color:C.green, light:"#E8FFF1", difficulty:"Facile", speed:"5–15 min", cost:"200–500 FCFA", steps:["Trouvez un agent qui propose les deux services (Wave ET Orange Money)","Retirez votre argent en cash depuis Wave","Déposez le cash sur votre compte Orange Money (dépôt GRATUIT)","✓ L'argent est maintenant sur Orange Money"], tips:"Certains agents spécialisés font la conversion directement sans que vous touchiez le cash.", warning:null },
  { id:"cash", icon:"💵", title:"Retrait cash puis re-dépôt", subtitle:"Méthode universelle", color:C.orange, light:"#FFF0E6", difficulty:"Très facile", speed:"15–30 min", cost:"Frais de retrait Wave", steps:["Retirez votre argent en cash depuis Wave","Allez chez un agent Orange Money","Déposez le cash (dépôt GRATUIT)","✓ Conversion effectuée"], tips:"Fonctionne partout même sans connexion internet.", warning:"Les frais de retrait Wave s'appliquent." },
  { id:"tierce", icon:"🤝", title:"Via une tierce personne", subtitle:"Entre proches — Zéro frais", color:C.purple, light:"#F5F3FF", difficulty:"Facile", speed:"Instantané", cost:"0 FCFA si via Wave", steps:["Trouvez un ami qui a l'opérateur opposé","Il vous envoie depuis Orange Money","Vous lui envoyez l'équivalent depuis Wave (0 FCFA)","✓ Échange mutuel sans frais"], tips:"Zéro frais si vous utilisez Wave pour l'envoi.", warning:"Uniquement avec quelqu'un de confiance." },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
function getFee(schedule, amount) {
  if (typeof schedule === "number") return schedule;
  for (const t of schedule) { if (amount <= t.max) return t.fee; }
  return schedule[schedule.length - 1].fee;
}
function fmt(n) { return n.toLocaleString("fr-FR") + " FCFA"; }
function stars(r) { return "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(r)); }

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign:"center", marginBottom:40 }}>
      <div style={{ fontSize:12, fontWeight:700, color:C.greenD, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>{eyebrow}</div>
      <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:"clamp(22px,4vw,34px)", color:C.dark, margin:"0 0 12px", lineHeight:1.2 }}>{title}</h2>
      {subtitle && <p style={{ color:C.muted, fontSize:14, maxWidth:560, margin:"0 auto", lineHeight:1.65 }}>{subtitle}</p>}
    </div>
  );
}

function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <div style={{ width:36, height:36, borderRadius:10, background:"linear-gradient(135deg,#00C853,#1A8CFF)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:18, color:"#fff" }}>₣</div>
      <div>
        <div style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:16, fontWeight:700, color:C.dark, lineHeight:1 }}>CompareMoney</div>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:"0.08em", textTransform:"uppercase" }}>Africa</div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const t = T[lang].nav;
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };
  const links = [{ label:t.compare,id:"comparateur" },{ label:t.calc,id:"calculator" },{ label:t.convert,id:"conversion" },{ label:t.intl,id:"international" },{ label:t.africa,id:"africa" }];
  return (
    <>
      <nav className="nav-inner" style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.96)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${C.border}`, padding:"0 24px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Logo />
        <div className="nav-links" style={{ display:"flex", gap:4 }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ border:"none", background:"none", fontSize:13, color:C.muted, fontWeight:500, cursor:"pointer", padding:"6px 10px", borderRadius:8 }}
              onMouseEnter={e => { e.target.style.background=C.bg; e.target.style.color=C.dark; }}
              onMouseLeave={e => { e.target.style.background="none"; e.target.style.color=C.muted; }}>{l.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={() => setLang(lang==="fr"?"en":"fr")} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:700, cursor:"pointer", color:C.dark }}>{t.lang}</button>
          {isMobile && <button onClick={() => setMenuOpen(!menuOpen)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8, padding:"7px 10px", fontSize:18, cursor:"pointer", color:C.dark, lineHeight:1 }}>{menuOpen?"✕":"☰"}</button>}
          <button className="nav-cta" onClick={() => scrollTo("newsletter")} style={{ background:C.dark, color:"#fff", border:"none", borderRadius:8, padding:"9px 16px", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>🔔 {t.alerts}</button>
        </div>
      </nav>
      {menuOpen && (
        <div style={{ position:"fixed", top:64, left:0, right:0, zIndex:99, background:"#fff", borderBottom:`1px solid ${C.border}`, boxShadow:"0 8px 24px rgba(0,0,0,0.12)" }}>
          {links.map(l => <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display:"block", width:"100%", textAlign:"left", padding:"13px 24px", border:"none", background:"none", fontSize:15, fontWeight:500, color:C.dark, cursor:"pointer", borderBottom:`1px solid ${C.bg}` }}>{l.label}</button>)}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ lang }) {
  const t = T[lang].hero;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  return (
    <section className="hero-section" style={{ background:`linear-gradient(135deg,${C.dark} 0%,${C.dark2} 50%,#0A2E1A 100%)`, padding:"72px 24px 80px", position:"relative", overflow:"hidden" }}>
      {[{ s:400,x:"-10%",y:"-30%" },{ s:300,x:"70%",y:"20%" },{ s:200,x:"40%",y:"60%" }].map((c,i) => (
        <div key={i} style={{ position:"absolute", width:c.s, height:c.s, borderRadius:"50%", border:"1px solid rgba(0,200,83,0.2)", left:c.x, top:c.y, background:"radial-gradient(circle,rgba(0,200,83,0.08) 0%,transparent 70%)" }} />
      ))}
      <div style={{ maxWidth:860, margin:"0 auto", position:"relative", textAlign:"center" }}>
        <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(0,200,83,0.15)", color:"#00C853", border:"1px solid rgba(0,200,83,0.3)", borderRadius:20, padding:"5px 14px", fontSize:11, fontWeight:600, marginBottom:24 }}>✦ {t.badge}</span>
        <h1 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:"clamp(26px,5vw,52px)", fontWeight:700, color:"#fff", margin:"0 0 16px", lineHeight:1.15 }}>
          {t.title1}<br /><span style={{ color:C.green }}>{t.title2}</span> {t.title3}
        </h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.6)", maxWidth:540, margin:"0 auto 36px", lineHeight:1.65 }}>{t.sub}</p>
        <div className="hero-btns" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => scrollTo("calculator")} style={{ background:C.green, color:"#fff", border:"none", borderRadius:10, padding:"14px 28px", fontSize:15, fontWeight:700, cursor:"pointer" }}>{t.btn1}</button>
          <button onClick={() => scrollTo("conversion")} style={{ background:"transparent", color:"#fff", border:"1px solid rgba(255,255,255,0.3)", borderRadius:10, padding:"14px 28px", fontSize:15, fontWeight:600, cursor:"pointer" }}>{t.btn2}</button>
        </div>
        <div className="hero-stats" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:12, marginTop:48 }}>
          {[["13+",t.s1],["6+",t.s2],["0 FCFA",t.s3],["Free",t.s4]].map(([v,l]) => (
            <div key={l} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, padding:"14px 16px", textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:700, color:"#fff", fontFamily:"'DM Serif Display',Georgia,serif" }}>{v}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR ───────────────────────────────────────────────────────────────
function Calculator({ lang }) {
  const t = T[lang].calc;
  const [amount, setAmount] = useState(10000);
  const [input, setInput] = useState("10000");
  const [type, setType] = useState("send");
  const handleInput = (v) => { setInput(v); setAmount(parseInt(v.replace(/\D/g,""))||0); };
  const results = OPERATORS.map(op => ({ ...op, fee:getFee(op.fees[type],amount) })).sort((a,b) => a.fee-b.fee);
  const bestFee = results[0]?.fee ?? 0;
  return (
    <section id="calculator" className="section-pad" style={{ background:C.bg, padding:"64px 24px" }}>
      <div style={{ maxWidth:860, margin:"0 auto" }}>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.sub} />
        <div style={{ background:"#fff", borderRadius:20, padding:"24px", boxShadow:"0 4px 24px rgba(13,27,42,0.07)", marginBottom:20, border:`1px solid ${C.border}` }}>
          <div style={{ display:"flex", gap:8, marginBottom:20, background:C.bg, borderRadius:10, padding:4 }}>
            {[{ k:"send",l:t.send },{ k:"withdraw",l:t.withdraw }].map(({ k,l }) => (
              <button key={k} onClick={() => setType(k)} style={{ flex:1, padding:"10px 0", border:"none", borderRadius:8, background:type===k?"#fff":"transparent", color:type===k?C.dark:C.muted, fontWeight:type===k?700:500, fontSize:14, cursor:"pointer", boxShadow:type===k?"0 2px 8px rgba(0,0,0,0.08)":"none", transition:"all .2s" }}>{l}</button>
            ))}
          </div>
          <label style={{ display:"block", fontSize:11, fontWeight:700, color:C.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.07em" }}>Montant / Amount</label>
          <div style={{ display:"flex", alignItems:"center", gap:12, background:C.bg, borderRadius:12, padding:"4px 16px", border:`2px solid ${C.border}`, marginBottom:16 }}>
            <span style={{ fontSize:22, fontWeight:700, color:C.dark }}>₣</span>
            <input type="text" value={input} onChange={e => handleInput(e.target.value)} style={{ flex:1, border:"none", background:"transparent", fontSize:26, fontWeight:700, color:C.dark, outline:"none", fontFamily:"'DM Serif Display',Georgia,serif", padding:"10px 0" }} />
            <span style={{ fontSize:13, color:C.muted, fontWeight:600 }}>FCFA</span>
          </div>
          <div className="quick-amounts" style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {[5000,10000,25000,50000,100000,200000].map(q => (
              <button key={q} onClick={() => { setAmount(q); setInput(q.toString()); }} style={{ padding:"6px 14px", borderRadius:8, border:`1px solid ${C.border}`, background:amount===q?C.dark:"#fff", color:amount===q?"#fff":"#4A5568", fontSize:12, fontWeight:600, cursor:"pointer" }}>{q/1000}k</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {results.map((op,i) => {
            const isBest = i===0;
            const savings = op.fee-bestFee;
            return (
              <div key={op.id} style={{ background:"#fff", borderRadius:16, padding:"16px 20px", border:isBest?`2px solid ${op.color}`:`1px solid ${C.border}`, boxShadow:isBest?`0 4px 20px ${op.color}22`:"none", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap", position:"relative", overflow:"hidden" }}>
                {isBest && <div style={{ position:"absolute", top:0, right:0, background:op.color, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 12px", borderBottomLeftRadius:10 }}>{t.best}</div>}
                <div style={{ width:48, height:48, borderRadius:12, background:op.light, color:op.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, flexShrink:0, fontFamily:"'DM Serif Display',Georgia,serif" }}>{op.logo}</div>
                <div style={{ minWidth:110 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:C.dark }}>{op.name}</div>
                  <div style={{ fontSize:11, color:C.muted }}>{op.tagline[lang]}</div>
                </div>
                <div style={{ flex:1, textAlign:"center" }}>
                  <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>{t.fees}</div>
                  <div style={{ fontSize:22, fontWeight:800, color:isBest?op.color:C.dark, fontFamily:"'DM Serif Display',Georgia,serif" }}>{fmt(op.fee)}</div>
                  {savings>0 && <div style={{ fontSize:11, color:"#E53E3E", fontWeight:600 }}>+{fmt(savings)}</div>}
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10, color:C.muted, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>{type==="send"?t.net:t.netW}</div>
                  <div style={{ fontSize:17, fontWeight:700, color:C.dark }}>{fmt(amount-op.fee)}</div>
                </div>
                <div style={{ width:"100%", marginTop:4 }}>
                  <div style={{ background:C.bg, borderRadius:4, height:5, overflow:"hidden" }}>
                    <div style={{ height:"100%", borderRadius:4, background:op.color, width:`${100-(op.fee/Math.max(amount,1))*100}%`, transition:"width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {amount>0 && (
          <div style={{ marginTop:14, background:"#E8FFF1", border:"1px solid #A3E6BE", borderRadius:12, padding:"12px 20px", display:"flex", alignItems:"center", gap:10, fontSize:13 }}>
            <span style={{ fontSize:18 }}>💡</span>
            <span style={{ color:"#0A6E36" }}>{t.tip} <strong>Wave</strong> : <strong>{fmt(results[results.length-1].fee-results[0].fee)}</strong></span>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────
function ComparisonTable({ lang }) {
  const t = T[lang].compare;
  const [view, setView] = useState("features");
  const featureKeys = Object.keys(OPERATORS[0].features);
  return (
    <section id="comparateur" className="section-pad" style={{ background:"#fff", padding:"64px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.sub} />
        <div className="view-switcher" style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:32, flexWrap:"wrap" }}>
          {[{ k:"features",l:t.tabs[0] },{ k:"limits",l:t.tabs[1] },{ k:"fees",l:t.tabs[2] }].map(({ k,l }) => (
            <button className="view-btn" key={k} onClick={() => setView(k)} style={{ padding:"9px 20px", borderRadius:8, border:view===k?"none":`1px solid ${C.border}`, background:view===k?C.dark:"#fff", color:view===k?"#fff":"#4A5568", fontSize:13, fontWeight:600, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        <div className="compare-header" style={{ background:C.bg, borderRadius:"16px 16px 0 0", padding:"20px 24px", display:"grid", gridTemplateColumns:"1fr repeat(3,1fr)", gap:12, alignItems:"center" }}>
          <div style={{ fontSize:12, color:C.muted, fontWeight:600 }}>Critère</div>
          {OPERATORS.map(op => (
            <div key={op.id} style={{ textAlign:"center" }}>
              <div className="op-logo" style={{ width:44, height:44, borderRadius:12, background:op.light, color:op.color, fontSize:16, fontWeight:800, margin:"0 auto 6px", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Serif Display',Georgia,serif" }}>{op.logo}</div>
              <div className="op-name" style={{ fontWeight:700, fontSize:13, color:C.dark }}>{op.name}</div>
              <div className="op-users" style={{ fontSize:11, color:C.muted }}>{op.users}</div>
              <div style={{ fontSize:12, marginTop:3 }}><span style={{ color:"#F6A623" }}>{stars(op.rating).slice(0,5)}</span><span style={{ color:C.muted, marginLeft:4 }}>{op.rating}</span></div>
            </div>
          ))}
        </div>
        <div style={{ border:`1px solid ${C.border}`, borderTop:"none", borderRadius:"0 0 16px 16px", overflow:"hidden" }}>
          {view==="features" && featureKeys.map((feat,i) => (
            <div className="compare-row" key={feat} style={{ display:"grid", gridTemplateColumns:"1fr repeat(3,1fr)", gap:12, alignItems:"center", padding:"13px 24px", background:i%2===0?"#fff":"#FAFBFC", borderBottom:i<featureKeys.length-1?`1px solid ${C.bg}`:"none" }}>
              <div className="row-label" style={{ fontSize:12, color:"#4A5568", fontWeight:500 }}>{feat}</div>
              {OPERATORS.map(op => <div key={op.id} style={{ textAlign:"center" }}>{op.features[feat]?<span style={{ fontSize:18, color:C.green }}>✓</span>:<span style={{ fontSize:18, color:"#CBD5E0" }}>✗</span>}</div>)}
            </div>
          ))}
          {view==="limits" && [{ key:"daily",label:t.daily },{ key:"monthly",label:t.monthly },{ key:"balance",label:t.balance }].map(({ key,label },i) => (
            <div className="compare-row" key={key} style={{ display:"grid", gridTemplateColumns:"1fr repeat(3,1fr)", gap:12, alignItems:"center", padding:"16px 24px", background:i%2===0?"#fff":"#FAFBFC", borderBottom:i<2?`1px solid ${C.bg}`:"none" }}>
              <div className="row-label" style={{ fontSize:12, color:"#4A5568", fontWeight:500 }}>{label}</div>
              {OPERATORS.map(op => {
                const val=op.limits[key]; const maxVal=Math.max(...OPERATORS.map(o => o.limits[key]));
                return <div key={op.id} style={{ textAlign:"center" }}><div className="row-val" style={{ fontWeight:700, fontSize:12, color:val===maxVal?C.greenD:C.dark }}>{fmt(val)}</div><div style={{ height:4, background:C.bg, borderRadius:2, marginTop:6, overflow:"hidden" }}><div style={{ height:"100%", background:op.color, borderRadius:2, width:`${(val/maxVal)*100}%` }} /></div></div>;
              })}
            </div>
          ))}
          {view==="fees" && [5000,10000,25000,50000,100000,200000,500000].map((amt,i) => {
            const fees=OPERATORS.map(op => ({ id:op.id,color:op.color,fee:getFee(op.fees.send,amt) }));
            const minFee=Math.min(...fees.map(f => f.fee));
            return (
              <div className="compare-row" key={amt} style={{ display:"grid", gridTemplateColumns:"1fr repeat(3,1fr)", gap:4, alignItems:"center", padding:"12px 24px", background:i%2===0?"#fff":"#FAFBFC", borderBottom:i<6?`1px solid ${C.bg}`:"none" }}>
                <div className="row-label" style={{ fontSize:12, color:"#4A5568", fontWeight:500 }}>{amt/1000}k FCFA</div>
                {fees.map(f => <div key={f.id} style={{ textAlign:"center" }}><span className="fee-badge" style={{ fontWeight:700, fontSize:11, color:f.fee===minFee?C.greenD:"#E53E3E", background:f.fee===minFee?"#E8FFF1":"#FFF5F5", padding:"3px 7px", borderRadius:6, display:"inline-block" }}>{fmt(f.fee)}</span></div>)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
function ReviewsSection({ lang }) {
  const t = T[lang].reviews;
  const [activeOp, setActiveOp] = useState("wave");
  const [newReview, setNewReview] = useState({ text:"", rating:5 });
  const [submitted, setSubmitted] = useState(false);
  const [allReviews, setAllReviews] = useState(Object.fromEntries(OPERATORS.map(op => [op.id,[...op.reviews]])));
  const op = OPERATORS.find(o => o.id===activeOp);
  const reviews = allReviews[activeOp]||[];
  const avgRating = reviews.length ? (reviews.reduce((s,r) => s+r.rating,0)/reviews.length).toFixed(1) : "0.0";

  const handleSubmit = () => {
    if (!newReview.text.trim()) return;
    const review = { author:lang==="fr"?"Vous":"You", date:lang==="fr"?"Maintenant":"Now", rating:newReview.rating, text:newReview.text, verified:false };
    setAllReviews(prev => ({ ...prev, [activeOp]:[review,...prev[activeOp]] }));
    setNewReview({ text:"", rating:5 });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="reviews" className="section-pad" style={{ background:"#fff", padding:"64px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.sub} />
        <div style={{ display:"flex", gap:10, marginBottom:28, flexWrap:"wrap", justifyContent:"center" }}>
          {OPERATORS.map(o => (
            <button key={o.id} onClick={() => setActiveOp(o.id)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 18px", borderRadius:12, border:activeOp===o.id?`2px solid ${o.color}`:`1px solid ${C.border}`, background:activeOp===o.id?o.light:"#fff", color:activeOp===o.id?o.color:C.muted, fontWeight:600, fontSize:13, cursor:"pointer" }}>
              <span style={{ width:28, height:28, borderRadius:8, background:activeOp===o.id?"#fff":o.light, color:o.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>{o.logo}</span>
              {o.name}
            </button>
          ))}
        </div>

        {/* Rating summary */}
        <div style={{ background:op.light, borderRadius:16, padding:"20px 24px", marginBottom:24, display:"flex", alignItems:"center", gap:24, flexWrap:"wrap", border:`1px solid ${op.color}33` }}>
          <div style={{ textAlign:"center", minWidth:90 }}>
            <div style={{ fontSize:48, fontWeight:800, color:op.color, fontFamily:"'DM Serif Display',Georgia,serif", lineHeight:1 }}>{avgRating}</div>
            <div style={{ fontSize:18, color:"#F6A623", margin:"4px 0" }}>{stars(parseFloat(avgRating)).slice(0,5)}</div>
            <div style={{ fontSize:12, color:C.muted }}>{reviews.length} {lang==="fr"?"avis":"reviews"}</div>
          </div>
          <div style={{ flex:1, minWidth:180 }}>
            {[5,4,3,2,1].map(s => {
              const count=reviews.filter(r => r.rating===s).length;
              const pct=reviews.length?(count/reviews.length)*100:0;
              return (
                <div key={s} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                  <span style={{ fontSize:12, color:C.muted, width:16 }}>{s}</span>
                  <span style={{ color:"#F6A623", fontSize:12 }}>★</span>
                  <div style={{ flex:1, height:8, background:"rgba(0,0,0,0.08)", borderRadius:4, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:op.color, borderRadius:4, width:`${pct}%`, transition:"width 0.4s" }} />
                  </div>
                  <span style={{ fontSize:12, color:C.muted, width:18 }}>{count}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, minWidth:180 }}>
            {t.criteria.map((crit,i) => (
              <div key={crit} style={{ background:"#fff", borderRadius:10, padding:"8px 10px", textAlign:"center" }}>
                <div style={{ fontSize:13, fontWeight:700, color:op.color }}>{Math.max(3.5,(parseFloat(avgRating)-(i*0.15))).toFixed(1)}</div>
                <div style={{ fontSize:10, color:C.muted }}>{crit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Write review */}
        <div style={{ background:C.bg, borderRadius:16, padding:"20px 24px", marginBottom:24, border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:13, fontWeight:600, color:C.dark, marginBottom:12 }}>{t.label}</div>
          <div style={{ display:"flex", gap:6, marginBottom:12 }}>
            {[1,2,3,4,5].map(s => (
              <button key={s} onClick={() => setNewReview(r => ({ ...r,rating:s }))} style={{ fontSize:24, background:"none", border:"none", cursor:"pointer", color:s<=newReview.rating?"#F6A623":"#CBD5E0" }}>★</button>
            ))}
          </div>
          <textarea value={newReview.text} onChange={e => setNewReview(r => ({ ...r,text:e.target.value }))} placeholder={t.placeholder} rows={3} style={{ width:"100%", borderRadius:10, border:`1px solid ${C.border}`, padding:"12px 14px", fontSize:13, outline:"none", resize:"vertical", fontFamily:"inherit", boxSizing:"border-box" }} />
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:10 }}>
            {submitted ? <span style={{ color:C.greenD, fontWeight:600, fontSize:13 }}>✓ {lang==="fr"?"Publié !":"Posted!"}</span>
              : <button onClick={handleSubmit} style={{ background:C.dark, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>{t.submit}</button>}
          </div>
        </div>

        {/* Reviews list */}
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {reviews.map((r,i) => (
            <div key={i} style={{ background:"#fff", borderRadius:14, padding:"16px 20px", border:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, flexWrap:"wrap", gap:8 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:op.light, color:op.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700 }}>{r.author[0]}</div>
                  <div><div style={{ fontWeight:600, fontSize:13, color:C.dark }}>{r.author}</div><div style={{ fontSize:11, color:C.muted }}>{r.date}</div></div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ color:"#F6A623", fontSize:14 }}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</span>
                  {r.verified && <span style={{ fontSize:10, background:"#E8FFF1", color:C.greenD, padding:"2px 8px", borderRadius:10, fontWeight:600 }}>✓ {t.verif}</span>}
                </div>
              </div>
              <p style={{ fontSize:13, color:"#4A5568", lineHeight:1.65, margin:0 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONVERSION ───────────────────────────────────────────────────────────────
function ConversionSection({ lang }) {
  const [activeMethod, setActiveMethod] = useState(0);
  const [fromOp, setFromOp] = useState("wave");
  const [toOp, setToOp] = useState("orange");
  const m = CONVERSION_METHODS[activeMethod];
  return (
    <section id="conversion" className="section-pad" style={{ background:C.bg, padding:"64px 24px" }}>
      <div style={{ maxWidth:960, margin:"0 auto" }}>
        <SectionHeader eyebrow="🔄 Guide de conversion" title={lang==="fr"?"Convertir Wave ↔ Orange Money":"Convert Wave ↔ Orange Money"} subtitle={lang==="fr"?"4 méthodes détaillées — de la plus rapide à la plus simple":"4 methods explained — from fastest to simplest"} />
        <div className="conv-from-to" style={{ background:"#fff", borderRadius:16, padding:"20px 24px", marginBottom:24, border:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:160 }}>
            <label style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", display:"block", marginBottom:8 }}>{lang==="fr"?"De":"From"}</label>
            <div style={{ display:"flex", gap:8 }}>
              {OPERATORS.map(op => <button key={op.id} onClick={() => { setFromOp(op.id); if(op.id===toOp) setToOp(OPERATORS.find(o=>o.id!==op.id).id); }} style={{ flex:1, padding:"8px 4px", borderRadius:10, border:fromOp===op.id?`2px solid ${op.color}`:`1px solid ${C.border}`, background:fromOp===op.id?op.light:"#fff", color:fromOp===op.id?op.color:C.muted, fontWeight:700, fontSize:11, cursor:"pointer" }}>{op.logo}</button>)}
            </div>
          </div>
          <div className="conv-arrow" style={{ fontSize:24, color:C.muted }}>→</div>
          <div style={{ flex:1, minWidth:160 }}>
            <label style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", display:"block", marginBottom:8 }}>{lang==="fr"?"Vers":"To"}</label>
            <div style={{ display:"flex", gap:8 }}>
              {OPERATORS.map(op => <button key={op.id} onClick={() => { setToOp(op.id); if(op.id===fromOp) setFromOp(OPERATORS.find(o=>o.id!==op.id).id); }} style={{ flex:1, padding:"8px 4px", borderRadius:10, border:toOp===op.id?`2px solid ${op.color}`:`1px solid ${C.border}`, background:toOp===op.id?op.light:"#fff", color:toOp===op.id?op.color:C.muted, fontWeight:700, fontSize:11, cursor:"pointer" }}>{op.logo}</button>)}
            </div>
          </div>
          <div className="conv-best" style={{ background:"#E8FFF1", borderRadius:12, padding:"12px 16px", minWidth:180 }}>
            <div style={{ fontSize:11, color:C.greenD, fontWeight:700, marginBottom:4 }}>💡 {lang==="fr"?"Meilleure méthode":"Best method"}</div>
            <div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{fromOp==="wave"?"GIM-UEMOA (0 FCFA)":(lang==="fr"?"Via un agent":"Via agent")}</div>
            <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>{fromOp==="wave"?(lang==="fr"?"Gratuit · Instantané":"Free · Instant"):"5–15 min"}</div>
          </div>
        </div>
        <div className="conv-tabs" style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
          {CONVERSION_METHODS.map((method,i) => (
            <button key={method.id} onClick={() => setActiveMethod(i)} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:12, border:activeMethod===i?`2px solid ${method.color}`:`1px solid ${C.border}`, background:activeMethod===i?method.light:"#fff", color:activeMethod===i?method.color:C.muted, fontWeight:activeMethod===i?700:500, fontSize:12, cursor:"pointer" }}>
              <span>{method.icon}</span><span>{method.title.split(" ").slice(0,3).join(" ")}</span>
            </button>
          ))}
        </div>
        <div style={{ background:"#fff", borderRadius:20, border:`1px solid ${C.border}`, overflow:"hidden" }}>
          <div style={{ background:m.light, padding:"20px 24px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
            <span style={{ fontSize:30 }}>{m.icon}</span>
            <div style={{ flex:1 }}>
              <h3 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:18, color:C.dark, margin:"0 0 6px" }}>{m.title}</h3>
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                {[["⏱",lang==="fr"?"Vitesse":"Speed",m.speed],["💰",lang==="fr"?"Coût":"Cost",m.cost],["📶",lang==="fr"?"Difficulté":"Difficulty",m.difficulty]].map(([ico,lab,val]) => (
                  <div key={lab} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12 }}><span>{ico}</span><span style={{ color:C.muted }}>{lab}:</span><span style={{ fontWeight:600, color:C.dark }}>{val}</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="conv-steps" style={{ padding:"24px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>{lang==="fr"?"Étapes":"Steps"}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {m.steps.map((step,i) => (
                <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:step.startsWith("✓")?"#E8FFF1":m.color, color:step.startsWith("✓")?C.greenD:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>{step.startsWith("✓")?"✓":(i+1)}</div>
                  <div style={{ fontSize:13, color:step.startsWith("✓")?C.greenD:"#4A5568", lineHeight:1.6, paddingTop:3, fontWeight:step.startsWith("✓")?600:400 }}>{step.replace("✓ ","")}</div>
                </div>
              ))}
            </div>
            <div style={{ background:"#FFFBEB", border:"1px solid #FCD34D", borderRadius:12, padding:"12px 16px", marginBottom:m.warning?12:0 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#92400E", marginBottom:4 }}>💡 {lang==="fr"?"Conseil":"Tip"}</div>
              <div style={{ fontSize:13, color:"#78350F", lineHeight:1.6 }}>{m.tips}</div>
            </div>
            {m.warning && <div style={{ background:"#FFF5F5", border:"1px solid #FCA5A5", borderRadius:12, padding:"12px 16px" }}><div style={{ fontSize:11, fontWeight:700, color:"#7F1D1D", marginBottom:4 }}>⚠️ {lang==="fr"?"Attention":"Warning"}</div><div style={{ fontSize:13, color:"#7F1D1D", lineHeight:1.6 }}>{m.warning}</div></div>}
          </div>
        </div>
        <div className="conv-cards" style={{ marginTop:20, display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:12 }}>
          {CONVERSION_METHODS.map((method,i) => (
            <div key={method.id} onClick={() => setActiveMethod(i)} style={{ background:"#fff", borderRadius:14, padding:"14px", border:activeMethod===i?`2px solid ${method.color}`:`1px solid ${C.border}`, cursor:"pointer" }}>
              <div style={{ fontSize:22, marginBottom:6 }}>{method.icon}</div>
              <div style={{ fontSize:12, fontWeight:600, color:C.dark, marginBottom:4 }}>{method.title}</div>
              <span style={{ background:method.light, color:method.color, borderRadius:20, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{method.speed}</span>
              <div style={{ fontSize:11, color:C.muted, marginTop:4 }}>{method.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTERNATIONAL ────────────────────────────────────────────────────────────
function InternationalSection({ lang }) {
  const [selected, setSelected] = useState(null);
  const [filterDir, setFilterDir] = useState("all");
  const filtered = INTL_OPERATORS.filter(op => {
    if (filterDir==="all") return true;
    if (filterDir==="in") return op.direction.includes("→ Sénégal")||op.direction.includes("→ Afrique");
    if (filterDir==="region") return op.direction.includes("UEMOA");
    return true;
  });
  return (
    <section id="international" className="section-pad" style={{ background:"#fff", padding:"64px 24px" }}>
      <div style={{ maxWidth:980, margin:"0 auto" }}>
        <SectionHeader eyebrow="🌍 Transferts internationaux" title={lang==="fr"?"Envoyez de l'argent partout dans le monde":"Send money anywhere in the world"} subtitle={lang==="fr"?"Comparez Sendwave, WorldRemit, Lemfi, MoneyGram et Western Union":"Compare Sendwave, WorldRemit, Lemfi, MoneyGram and Western Union"} />
        <div className="filter-row" style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:28, flexWrap:"wrap" }}>
          {[{ k:"all",l:lang==="fr"?"🌐 Tous":"🌐 All" },{ k:"in",l:lang==="fr"?"📥 Vers Sénégal":"📥 To Senegal" },{ k:"region",l:"🌍 UEMOA" }].map(({ k,l }) => (
            <button className="filter-btn" key={k} onClick={() => setFilterDir(k)} style={{ padding:"9px 18px", borderRadius:8, border:filterDir===k?"none":`1px solid ${C.border}`, background:filterDir===k?C.dark:"#fff", color:filterDir===k?"#fff":"#4A5568", fontSize:13, fontWeight:600, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        <div className="intl-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, marginBottom:20 }}>
          {filtered.map(op => {
            const realIdx=INTL_OPERATORS.indexOf(op); const isSel=selected===realIdx;
            return (
              <div key={op.name} onClick={() => setSelected(isSel?null:realIdx)} style={{ background:"#fff", borderRadius:16, border:isSel?`2px solid ${op.color}`:`1px solid ${C.border}`, padding:"18px", cursor:"pointer", transition:"all .2s", boxShadow:isSel?`0 6px 24px ${op.color}22`:"none", position:"relative" }}>
                {op.highlight && <div style={{ position:"absolute", top:-1, right:14, background:C.green, color:"#fff", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:"0 0 8px 8px" }}>⭐ TOP</div>}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:op.light, color:op.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>{op.logo}</div>
                  <div><div style={{ fontWeight:700, fontSize:14, color:C.dark }}>{op.name}</div><div style={{ fontSize:11, color:C.muted }}>{op.direction}</div></div>
                </div>
                <div className="intl-stat-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                  {[["💰 Frais",op.fees],["⚡ Vitesse",op.speed],["📤 Min",op.minAmount],["📊 Max",op.maxAmount]].map(([lab,val]) => (
                    <div key={lab} style={{ background:C.bg, borderRadius:8, padding:"7px 10px" }}><div style={{ fontSize:10, color:C.muted, marginBottom:2 }}>{lab}</div><div style={{ fontSize:12, fontWeight:600, color:C.dark }}>{val}</div></div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
                  {op.delivery.map(d => <span key={d} style={{ background:op.light, color:op.color, borderRadius:6, padding:"2px 7px", fontSize:10, fontWeight:600 }}>{d}</span>)}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div><span style={{ color:"#F6A623" }}>{stars(op.rating).slice(0,5)}</span><span style={{ fontSize:12, color:C.muted, marginLeft:4 }}>{op.rating}</span></div>
                  <span style={{ fontSize:12, color:op.color, fontWeight:600 }}>{isSel?"▲":"▼"} {lang==="fr"?"Détails":"Details"}</span>
                </div>
                {isSel && (
                  <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:12, color:"#4A5568", lineHeight:1.65, background:op.light, borderRadius:10, padding:"10px 12px", marginBottom:12 }}>💡 {op.tip}</div>
                    <div className="intl-detail-cols" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                      <div><div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", marginBottom:6 }}>{lang==="fr"?"Depuis":"From"}</div><div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{op.countries.map(c => <span key={c} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:6, padding:"3px 7px", fontSize:11 }}>{c}</span>)}</div></div>
                      <div><div style={{ fontSize:10, fontWeight:700, color:C.muted, textTransform:"uppercase", marginBottom:6 }}>{lang==="fr"?"Vers":"To"}</div><div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>{op.destCountries.map(c => <span key={c} style={{ background:"#fff", border:`1px solid ${C.border}`, borderRadius:6, padding:"3px 7px", fontSize:11 }}>{c}</span>)}</div></div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ background:C.bg, borderRadius:16, padding:"20px 24px", border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:14, fontWeight:700, color:C.dark, marginBottom:14 }}>📊 {lang==="fr"?"Comparatif 100 € → Sénégal":"Comparison 100 € → Senegal"}</div>
          <div className="intl-table-wrap" style={{ overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            <table className="intl-summary-table" style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:480 }}>
              <thead><tr style={{ background:C.dark }}>{["Service","Frais","Vitesse","Réception","Note"].map(h => <th key={h} style={{ padding:"10px 12px", textAlign:"left", color:"#fff", fontWeight:600, fontSize:11, textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
              <tbody>
                {[{ name:"Sendwave",fee:"0 €",speed:"Instantané",method:"Wave / OM / Free",rating:"⭐ 4.8",best:true },{ name:"Lemfi",fee:"0 – 2 €",speed:"Instantané",method:"Wave / OM / Bancaire",rating:"4.3",best:false },{ name:"WorldRemit",fee:"0,99 – 2,99 €",speed:"Quelques min",method:"OM / Wave / Cash",rating:"4.4",best:false },{ name:"MoneyGram",fee:"3 – 8 €",speed:"Quelques min",method:"Cash / OM",rating:"3.9",best:false },{ name:"Western Union",fee:"5 – 12 €",speed:"Quelques min",method:"Cash / Bancaire",rating:"3.7",best:false }].map((row,i) => (
                  <tr key={row.name} style={{ background:row.best?"#E8FFF1":i%2===0?"#fff":"#FAFBFC", borderBottom:`1px solid ${C.border}` }}>
                    <td style={{ padding:"11px 12px", fontWeight:600, color:row.best?C.greenD:C.dark }}>{row.best?"✓ ":""}{row.name}</td>
                    <td style={{ padding:"11px 12px", fontWeight:row.best?700:400, color:row.best?C.greenD:"#4A5568" }}>{row.fee}</td>
                    <td style={{ padding:"11px 12px", color:"#4A5568" }}>{row.speed}</td>
                    <td style={{ padding:"11px 12px", color:"#4A5568" }}>{row.method}</td>
                    <td style={{ padding:"11px 12px", color:"#F6A623" }}>{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AFRICA SECTION ───────────────────────────────────────────────────────────
function AfricaSection({ lang }) {
  const t = T[lang].africa;
  const [region, setRegion] = useState("west");
  const ops = region==="west" ? WEST_AFRICA_OPS : EAST_AFRICA_OPS;
  return (
    <section id="africa" className="section-pad" style={{ background:C.bg, padding:"64px 24px" }}>
      <div style={{ maxWidth:980, margin:"0 auto" }}>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.sub} />
        <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:32, flexWrap:"wrap" }}>
          {[{ k:"west",l:t.tabs[0] },{ k:"east",l:t.tabs[1] }].map(({ k,l }) => (
            <button key={k} onClick={() => setRegion(k)} style={{ padding:"11px 28px", borderRadius:10, border:region===k?"none":`1px solid ${C.border}`, background:region===k?C.dark:"#fff", color:region===k?"#fff":"#4A5568", fontSize:14, fontWeight:600, cursor:"pointer" }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:14 }}>
          {ops.map(op => (
            <div key={op.id} style={{ background:"#fff", borderRadius:16, padding:"20px", border:`1px solid ${C.border}`, transition:"transform .2s, box-shadow .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 24px ${op.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ width:50, height:50, borderRadius:13, background:op.light, color:op.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>{op.logo}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:15, color:C.dark }}>{op.name}</div>
                  <div style={{ fontSize:12, color:C.muted }}>{op.country}</div>
                </div>
                <div style={{ background:op.light, color:op.color, borderRadius:8, padding:"3px 8px", fontSize:11, fontWeight:700 }}>{op.users}</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:12 }}>
                {[[t.send,op.send],[t.withdraw,op.withdraw],[t.limit,op.limit]].map(([lab,val]) => (
                  <div key={lab} style={{ background:C.bg, borderRadius:8, padding:"7px 8px", textAlign:"center" }}>
                    <div style={{ fontSize:9, color:C.muted, marginBottom:2 }}>{lab}</div>
                    <div style={{ fontSize:10, fontWeight:700, color:C.dark }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
                {op.features.map(f => <span key={f} style={{ background:op.light, color:op.color, borderRadius:6, padding:"3px 7px", fontSize:10, fontWeight:600 }}>{f}</span>)}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div><span style={{ color:"#F6A623" }}>{stars(op.rating).slice(0,5)}</span><span style={{ fontSize:11, color:C.muted, marginLeft:4 }}>{op.rating}/5</span></div>
              </div>
              <div style={{ background:op.light, borderRadius:8, padding:"8px 10px" }}>
                <div style={{ fontSize:11, color:op.color, lineHeight:1.5 }}>💡 {op.tip}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:24, background:"#fff", borderRadius:16, padding:"18px 24px", border:`1px solid ${C.border}` }}>
          <div style={{ fontSize:13, fontWeight:700, color:C.dark, marginBottom:12 }}>🗺️ {lang==="fr"?"Zones géographiques couvertes":"Geographic coverage"}</div>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {ops.map(op => (
              <div key={op.id} style={{ display:"flex", alignItems:"center", gap:8, background:op.light, borderRadius:10, padding:"7px 12px" }}>
                <span style={{ fontWeight:800, fontSize:12, color:op.color }}>{op.logo}</span>
                <span style={{ fontSize:12, color:C.dark }}>{op.country}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
function NewsletterSection({ lang }) {
  const t = T[lang].newsletter;
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("free");
  const [sent, setSent] = useState(false);
  return (
    <section id="newsletter" className="section-pad" style={{ background:`linear-gradient(135deg,${C.dark},${C.dark2})`, padding:"64px 24px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.sub} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16, marginBottom:28 }}>
          <div onClick={() => setPlan("free")} style={{ background:plan==="free"?"rgba(0,200,83,0.12)":"rgba(255,255,255,0.06)", border:plan==="free"?`2px solid ${C.green}`:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"24px", cursor:"pointer" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div><div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>📬 {t.free}</div><div style={{ fontSize:26, fontWeight:800, color:C.green, fontFamily:"'DM Serif Display',Georgia,serif", marginTop:4 }}>0 FCFA</div></div>
              {plan==="free" && <span style={{ background:C.green, color:"#fff", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>✓</span>}
            </div>
            <ul style={{ listStyle:"none", padding:0, margin:0 }}>
              {t.freeFeats.map(f => <li key={f} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"rgba(255,255,255,0.75)" }}><span style={{ color:C.green }}>✓</span>{f}</li>)}
            </ul>
          </div>
          <div onClick={() => setPlan("premium")} style={{ background:plan==="premium"?"rgba(124,58,237,0.2)":"rgba(255,255,255,0.06)", border:plan==="premium"?`2px solid ${C.purple}`:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:"24px", cursor:"pointer", position:"relative" }}>
            <div style={{ position:"absolute", top:-1, right:16, background:C.purple, color:"#fff", fontSize:10, fontWeight:800, padding:"3px 12px", borderRadius:"0 0 8px 8px" }}>⭐ PREMIUM</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div><div style={{ fontSize:17, fontWeight:700, color:"#fff" }}>💎 {t.premium}</div><div style={{ fontSize:26, fontWeight:800, color:C.purple, fontFamily:"'DM Serif Display',Georgia,serif", marginTop:4 }}>2 000 FCFA<span style={{ fontSize:13, fontWeight:400, color:"rgba(255,255,255,0.5)" }}>/mois</span></div></div>
              {plan==="premium" && <span style={{ background:C.purple, color:"#fff", borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700 }}>✓</span>}
            </div>
            <ul style={{ listStyle:"none", padding:0, margin:0 }}>
              {t.premFeats.map(f => <li key={f} style={{ display:"flex", gap:8, marginBottom:8, fontSize:13, color:"rgba(255,255,255,0.75)" }}><span style={{ color:C.purple }}>✓</span>{f}</li>)}
            </ul>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:16, padding:"20px 24px", border:"1px solid rgba(255,255,255,0.1)", marginBottom:24 }}>
          <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>📋 {lang==="fr"?"Aperçu dernière édition":"Last edition preview"}</div>
          <div style={{ fontSize:14, fontWeight:600, color:"#fff", marginBottom:12 }}>🗓️ {lang==="fr"?"Semaine du 24 mars 2026 — Édition #42":"Week of March 24, 2026 — Edition #42"}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { tag:"ALERTE", text:lang==="fr"?"Wave augmente ses frais de retrait pour les montants < 1 000 FCFA":"Wave increases withdrawal fees for amounts < 1,000 FCFA", color:"#EF4444" },
              { tag:"ANALYSE", text:lang==="fr"?"MTN MoMo s'implante au Sénégal — impact sur la concurrence":"MTN MoMo expands to Senegal — competitive impact", color:C.blue },
              { tag:"TENDANCE", text:lang==="fr"?"+23% de transferts diaspora France→Sénégal ce trimestre":"23% increase in France→Senegal diaspora transfers", color:C.green },
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ background:item.color, color:"#fff", borderRadius:6, padding:"2px 8px", fontSize:10, fontWeight:800, flexShrink:0 }}>{item.tag}</span>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.5 }}>{item.text}</span>
              </div>
            ))}
            {plan==="free" && <div style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:4, fontStyle:"italic" }}>🔒 {lang==="fr"?"2 analyses supplémentaires réservées Premium":"2 additional analyses for Premium subscribers"}</div>}
          </div>
        </div>

        {sent ? (
          <div style={{ background:"rgba(0,200,83,0.15)", border:"1px solid rgba(0,200,83,0.4)", borderRadius:12, padding:"18px 24px", textAlign:"center", color:C.green, fontWeight:600, fontSize:15 }}>{t.sent}</div>
        ) : (
          <div>
            <div className="alert-row" style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginBottom:12 }}>
              <input type="email" placeholder={t.placeholder} value={email} onChange={e => setEmail(e.target.value)} style={{ flex:1, minWidth:220, padding:"14px 20px", borderRadius:10, border:"none", fontSize:15, outline:"none", background:"rgba(255,255,255,0.1)", color:"#fff" }} />
              <button onClick={() => { if(email) setSent(true); }} style={{ background:plan==="premium"?C.purple:C.green, color:"#fff", border:"none", borderRadius:10, padding:"14px 24px", fontSize:14, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                {plan==="free"?t.freeBtn:t.premBtn}
              </button>
            </div>
            <p style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textAlign:"center", margin:0 }}>{lang==="fr"?"Pas de spam · Désabonnement en 1 clic":"No spam · Unsubscribe anytime"}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ lang }) {
  const [open, setOpen] = useState(null);
  const items = lang==="fr" ? [
    { q:"Wave est-il vraiment gratuit pour les envois ?", a:"Oui, Wave ne prend aucun frais pour les envois entre utilisateurs Wave au Sénégal. Des frais s'appliquent uniquement pour les retraits en cash." },
    { q:"Comment fonctionne l'interopérabilité GIM-UEMOA ?", a:"Le système GIM-UEMOA permet aux utilisateurs de différents opérateurs Mobile Money de s'envoyer directement de l'argent. Wave peut envoyer vers Orange Money en quelques secondes sans frais d'envoi." },
    { q:"Sendwave est-il vraiment sans frais ?", a:"Sendwave ne prend pas de commission visible mais gagne une marge sur le taux de change. C'est souvent le service le moins cher pour envoyer depuis l'Europe." },
    { q:"MTN MoMo est-il disponible au Sénégal ?", a:"MTN MoMo est principalement disponible en Côte d'Ivoire, Ghana, Nigeria et Cameroun. Son expansion vers le Sénégal est en cours." },
    { q:"Quelle est la différence entre M-Pesa et Orange Money ?", a:"M-Pesa est dominant en Afrique de l'Est et offre des services très avancés (crédit, épargne mobiles). Orange Money est plus fort en Afrique de l'Ouest et dans la zone UEMOA." },
  ] : [
    { q:"Is Wave really free for transfers?", a:"Yes, Wave charges no fees for transfers between Wave users in Senegal. Fees only apply for cash withdrawals." },
    { q:"How does GIM-UEMOA interoperability work?", a:"The GIM-UEMOA system allows users of different Mobile Money operators to send money directly. Wave can send to Orange Money in seconds with no transfer fee." },
    { q:"Is Sendwave really fee-free?", a:"Sendwave charges no visible commission but earns a margin on the exchange rate. It's often the cheapest service for sending money from Europe." },
    { q:"Is MTN MoMo available in Senegal?", a:"MTN MoMo is mainly in Côte d'Ivoire, Ghana, Nigeria and Cameroon. Expansion to Senegal is underway." },
    { q:"What's the difference between M-Pesa and Orange Money?", a:"M-Pesa dominates East Africa with advanced services like mobile credit and savings. Orange Money is stronger in West Africa and the UEMOA zone." },
  ];
  return (
    <section style={{ background:"#fff", padding:"48px 24px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <h2 style={{ fontFamily:"'DM Serif Display',Georgia,serif", fontSize:26, color:C.dark, textAlign:"center", marginBottom:28 }}>{lang==="fr"?"Questions fréquentes":"Frequently asked questions"}</h2>
        {items.map((item,i) => (
          <div key={i} style={{ background:C.bg, borderRadius:12, marginBottom:8, border:`1px solid ${C.border}`, overflow:"hidden" }}>
            <button onClick={() => setOpen(open===i?null:i)} style={{ width:"100%", padding:"16px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
              <span style={{ fontWeight:600, fontSize:14, color:C.dark }}>{item.q}</span>
              <span style={{ fontSize:18, color:C.muted, transform:open===i?"rotate(45deg)":"none", transition:"transform .2s", flexShrink:0 }}>+</span>
            </button>
            {open===i && <div style={{ padding:"0 20px 16px", fontSize:13, color:"#4A5568", lineHeight:1.7 }}>{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ lang }) {
  const t = T[lang].footer;
  const cols = [
    { title:lang==="fr"?"Sénégal":"Senegal",      links:["Wave","Orange Money","Free Money"] },
    { title:lang==="fr"?"Afrique Ouest":"West Africa", links:["MTN MoMo","Moov Money","Flooz","CeltisPay"] },
    { title:lang==="fr"?"Afrique Est":"East Africa",   links:["M-Pesa","Airtel Money","EcoCash","Tigo Pesa"] },
    { title:lang==="fr"?"International":"International", links:["Sendwave","WorldRemit","Lemfi","MoneyGram"] },
  ];
  return (
    <footer style={{ background:C.dark, padding:"40px 24px 28px" }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div className="footer-cols" style={{ display:"flex", gap:28, flexWrap:"wrap", marginBottom:28 }}>

          {/* Brand + description + contact */}
          <div style={{ flex:2, minWidth:200 }}>
            <Logo />
            <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, marginTop:12, lineHeight:1.65, maxWidth:280 }}>{t.tagline}</p>
            {/* Contact link */}
            <a
              href="mailto:lfalloudiouf@gmail.com"
              style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:16, background:"rgba(0,200,83,0.12)", border:"1px solid rgba(0,200,83,0.25)", borderRadius:10, padding:"10px 16px", textDecoration:"none", color:C.green, fontSize:13, fontWeight:600, transition:"background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background="rgba(0,200,83,0.22)"}
              onMouseLeave={e => e.currentTarget.style.background="rgba(0,200,83,0.12)"}
            >
              ✉️ {lang==="fr"?"Nous contacter":"Contact us"}
            </a>
          </div>

          {/* Operator columns */}
          {cols.map(col => (
            <div key={col.title} style={{ flex:1, minWidth:100 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:12 }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:8, cursor:"default" }}
                  onMouseEnter={e => e.target.style.color=C.green}
                  onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.5)"}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>© 2026 CompareMobileMoney Africa. {t.legal}</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>🇸🇳 {t.made}</span>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState("fr");

  useEffect(() => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const vp = document.createElement("meta");
      vp.name = "viewport"; vp.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(vp);
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { overflow-x: hidden; width: 100%; }
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #0D1B2A; }
      button, input, textarea { font-family: inherit; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-thumb { background: #CBD5E0; border-radius: 3px; }
      @keyframes fadeUp { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
      @media (max-width: 767px) {
        .nav-links { display: none !important; }
        .nav-cta { font-size: 11px !important; padding: 7px 10px !important; }
        .hero-section { padding: 44px 16px 52px !important; }
        .hero-stats { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        .hero-btns { flex-direction: column !important; }
        .hero-btns button { width: 100% !important; }
        .section-pad { padding: 44px 16px !important; }
        .view-switcher { gap: 6px !important; }
        .view-btn { padding: 7px 10px !important; font-size: 11px !important; }
        .compare-header { grid-template-columns: 72px repeat(3,1fr) !important; padding: 14px 12px !important; gap: 6px !important; }
        .op-logo { width: 32px !important; height: 32px !important; font-size: 12px !important; }
        .op-name { font-size: 11px !important; }
        .op-users { display: none; }
        .compare-row { grid-template-columns: 72px repeat(3,1fr) !important; padding: 10px 12px !important; gap: 6px !important; }
        .row-label { font-size: 10px !important; }
        .row-val { font-size: 11px !important; }
        .fee-badge { font-size: 10px !important; padding: 2px 5px !important; }
        .conv-from-to { flex-direction: column !important; }
        .conv-arrow { display: none !important; }
        .conv-best { width: 100% !important; }
        .conv-tabs { gap: 6px !important; }
        .conv-steps { padding: 16px !important; }
        .conv-cards { grid-template-columns: 1fr 1fr !important; }
        .intl-grid { grid-template-columns: 1fr !important; }
        .intl-detail-cols { grid-template-columns: 1fr !important; gap: 10px !important; }
        .intl-table-wrap { overflow-x: auto; }
        .filter-row { gap: 6px !important; }
        .filter-btn { padding: 7px 10px !important; font-size: 11px !important; }
        .intl-stat-grid { grid-template-columns: 1fr 1fr !important; }
        .alert-row { flex-direction: column !important; }
        .alert-row input, .alert-row button { width: 100% !important; }
        .footer-cols { flex-direction: column !important; gap: 20px !important; }
        .quick-amounts { gap: 6px !important; }
      }
      @media (max-width: 480px) {
        .compare-header { grid-template-columns: 62px repeat(3,1fr) !important; }
        .compare-row { grid-template-columns: 62px repeat(3,1fr) !important; }
        .conv-cards { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <Nav lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Calculator lang={lang} />
      <ComparisonTable lang={lang} />
      <ReviewsSection lang={lang} />
      <ConversionSection lang={lang} />
      <InternationalSection lang={lang} />
      <AfricaSection lang={lang} />
      <NewsletterSection lang={lang} />
      <FAQ lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
