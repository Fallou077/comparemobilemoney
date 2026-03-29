"use client";
import { useState, useEffect, useCallback } from "react";

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

// ─── PALETTE & FONTS ─────────────────────────────────────────────────────────
const C = {
  dark:    "#0D1B2A",
  dark2:   "#1A3A52",
  green:   "#00C853",
  greenD:  "#00A844",
  blue:    "#1A8CFF",
  orange:  "#FF6600",
  red:     "#E31E24",
  purple:  "#7C3AED",
  teal:    "#0D9488",
  bg:      "#F7F9FC",
  border:  "#E8EDF2",
  muted:   "#6B7A8D",
  text:    "#0D1B2A",
};

// ─── LOCAL OPERATORS DATA ────────────────────────────────────────────────────
const OPERATORS = [
  {
    id: "wave", name: "Wave", logo: "W", color: C.blue, light: "#E8F4FF",
    tagline: "Zéro frais d'envoi",
    fees: {
      send: 0,
      withdraw: [
        { max: 5000, fee: 0 }, { max: 20000, fee: 150 },
        { max: 50000, fee: 300 }, { max: 100000, fee: 500 },
        { max: 500000, fee: 1000 },
      ],
      deposit: 0,
    },
    limits: { daily: 2000000, monthly: 10000000, balance: 2000000 },
    features: {
      "Envoi gratuit": true, "Retrait low-cost": true,
      "Paiement marchand": true, "Transfert international": false,
      "Crédit disponible": false, "Cashback": true,
    },
    rating: 4.7, users: "8M+",
  },
  {
    id: "orange", name: "Orange Money", logo: "O", color: C.orange, light: "#FFF0E6",
    tagline: "Le plus répandu",
    fees: {
      send: [
        { max: 5000, fee: 50 }, { max: 15000, fee: 75 },
        { max: 30000, fee: 100 }, { max: 70000, fee: 200 },
        { max: 150000, fee: 350 }, { max: 500000, fee: 750 },
      ],
      withdraw: [
        { max: 5000, fee: 100 }, { max: 15000, fee: 150 },
        { max: 30000, fee: 250 }, { max: 70000, fee: 400 },
        { max: 150000, fee: 700 }, { max: 500000, fee: 1200 },
      ],
      deposit: 0,
    },
    limits: { daily: 1500000, monthly: 5000000, balance: 1500000 },
    features: {
      "Envoi gratuit": false, "Retrait low-cost": false,
      "Paiement marchand": true, "Transfert international": true,
      "Crédit disponible": true, "Cashback": false,
    },
    rating: 4.2, users: "15M+",
  },
  {
    id: "free", name: "Free Money", logo: "F", color: C.red, light: "#FFEAEB",
    tagline: "Offres agressives",
    fees: {
      send: [
        { max: 5000, fee: 25 }, { max: 15000, fee: 50 },
        { max: 30000, fee: 75 }, { max: 70000, fee: 150 },
        { max: 150000, fee: 300 }, { max: 500000, fee: 600 },
      ],
      withdraw: [
        { max: 5000, fee: 75 }, { max: 15000, fee: 125 },
        { max: 30000, fee: 200 }, { max: 70000, fee: 350 },
        { max: 150000, fee: 600 }, { max: 500000, fee: 1000 },
      ],
      deposit: 0,
    },
    limits: { daily: 1000000, monthly: 4000000, balance: 1000000 },
    features: {
      "Envoi gratuit": false, "Retrait low-cost": true,
      "Paiement marchand": true, "Transfert international": false,
      "Crédit disponible": false, "Cashback": true,
    },
    rating: 4.0, users: "3M+",
  },
];

// ─── INTERNATIONAL OPERATORS DATA ────────────────────────────────────────────
const INTL_OPERATORS = [
  {
    name: "Sendwave",
    logo: "SW",
    color: "#6366F1",
    light: "#EEF2FF",
    direction: "Envoi diaspora → Sénégal",
    countries: ["🇫🇷 France", "🇺🇸 USA", "🇬🇧 UK", "🇧🇪 Belgique", "🇩🇪 Allemagne"],
    destCountries: ["🇸🇳 Sénégal", "🇨🇮 Côte d'Ivoire", "🇬🇭 Ghana", "🇰🇪 Kenya"],
    fees: "0% de frais d'envoi",
    feesNote: "Taux de change légèrement ajusté",
    speed: "Instantané",
    minAmount: "1 €",
    maxAmount: "2 500 € / jour",
    delivery: ["Orange Money", "Wave", "Free Money", "Compte bancaire"],
    rating: 4.8,
    highlight: true,
    tip: "Meilleur pour la diaspora française vers le Sénégal",
  },
  {
    name: "WorldRemit",
    logo: "WR",
    color: "#059669",
    light: "#ECFDF5",
    direction: "International → Afrique",
    countries: ["🇫🇷 France", "🇺🇸 USA", "🇬🇧 UK", "🇨🇦 Canada", "🇦🇺 Australie"],
    destCountries: ["🇸🇳 Sénégal", "🇨🇮 Côte d'Ivoire", "🇳🇬 Nigeria", "🇬🇭 Ghana", "🇰🇪 Kenya"],
    fees: "0,99 € – 3,99 € par envoi",
    feesNote: "Varie selon le montant et le pays",
    speed: "Quelques minutes",
    minAmount: "1 €",
    maxAmount: "5 000 € / jour",
    delivery: ["Orange Money", "Wave", "Virement bancaire", "Cash pickup"],
    rating: 4.4,
    highlight: false,
    tip: "Large couverture pays, bon pour les petits montants",
  },
  {
    name: "Lemfi",
    logo: "LF",
    color: "#DC2626",
    light: "#FEF2F2",
    direction: "Diaspora → Afrique",
    countries: ["🇨🇦 Canada", "🇬🇧 UK", "🇺🇸 USA"],
    destCountries: ["🇸🇳 Sénégal", "🇨🇮 Côte d'Ivoire", "🇳🇬 Nigeria", "🇬🇭 Ghana"],
    fees: "0% de frais (certains corridors)",
    feesNote: "Marges sur le taux de change",
    speed: "Instantané – 24h",
    minAmount: "10 $",
    maxAmount: "10 000 $ / mois",
    delivery: ["Orange Money", "Wave", "Compte bancaire"],
    rating: 4.3,
    highlight: false,
    tip: "Très populaire au Canada et UK pour la diaspora",
  },
  {
    name: "Orange Money International",
    logo: "OM",
    color: C.orange,
    light: "#FFF0E6",
    direction: "Sénégal ↔ Zone UEMOA",
    countries: ["🇸🇳 Sénégal", "🇨🇮 Côte d'Ivoire", "🇲🇱 Mali", "🇧🇫 Burkina Faso"],
    destCountries: ["🇸🇳 Sénégal", "🇨🇮 Côte d'Ivoire", "🇲🇱 Mali", "🇧🇫 Burkina Faso", "🇬🇳 Guinée"],
    fees: "1% – 2% du montant",
    feesNote: "Minimum 200 FCFA",
    speed: "Instantané",
    minAmount: "500 FCFA",
    maxAmount: "1 500 000 FCFA / jour",
    delivery: ["Orange Money", "Retrait cash"],
    rating: 4.1,
    highlight: false,
    tip: "Idéal pour les transferts UEMOA entre abonnés Orange",
  },
  {
    name: "MoneyGram",
    logo: "MG",
    color: "#1D4ED8",
    light: "#EFF6FF",
    direction: "Monde → Sénégal (cash)",
    countries: ["🇺🇸 USA", "🇫🇷 France", "🇬🇧 UK", "🇮🇹 Italie", "🇪🇸 Espagne"],
    destCountries: ["🇸🇳 Sénégal (retrait cash)", "Toute l'Afrique"],
    fees: "3 $ – 15 $ selon montant",
    feesNote: "Taux de change compétitif",
    speed: "Quelques minutes",
    minAmount: "1 $",
    maxAmount: "10 000 $ / transaction",
    delivery: ["Retrait cash (agents)", "Orange Money", "Compte bancaire"],
    rating: 3.9,
    highlight: false,
    tip: "Réseau d'agents physiques très étendu au Sénégal",
  },
  {
    name: "Western Union",
    logo: "WU",
    color: "#FBBF24",
    light: "#FFFBEB",
    direction: "Monde → Sénégal (cash)",
    countries: ["🌍 200+ pays"],
    destCountries: ["🇸🇳 Sénégal (retrait cash)","🌍 Toute l'Afrique"],
    fees: "5 $ – 20 $ selon montant",
    feesNote: "Historiquement cher mais fiable",
    speed: "Quelques minutes",
    minAmount: "1 $",
    maxAmount: "50 000 $ / mois",
    delivery: ["Retrait cash (agents)", "Compte bancaire"],
    rating: 3.7,
    highlight: false,
    tip: "Couvre les destinations les plus reculées, mais cher",
  },
];

// ─── CONVERSION METHODS DATA ──────────────────────────────────────────────────
const CONVERSION_METHODS = [
  {
    id: "agent",
    icon: "🏪",
    title: "Via un agent agréé",
    subtitle: "Méthode la plus simple",
    color: C.green,
    light: "#E8FFF1",
    difficulty: "Facile",
    speed: "5–15 min",
    cost: "Frais agent (200–500 FCFA)",
    steps: [
      "Trouvez un agent qui propose les deux services (Wave ET Orange Money)",
      "Retirez votre argent en cash depuis Wave (frais de retrait Wave applicables)",
      "Déposez immédiatement le cash sur votre compte Orange Money (dépôt gratuit)",
      "✓ L'argent est maintenant sur Orange Money",
    ],
    tips: "Demandez à l'agent s'il peut faire la conversion directement — certains agents spécialisés font l'opération sans que vous touchiez le cash.",
    warning: null,
  },
  {
    id: "interop",
    icon: "📱",
    title: "Via l'interopérabilité GIM-UEMOA",
    subtitle: "Transfert direct entre opérateurs",
    color: C.blue,
    light: "#E8F4FF",
    difficulty: "Facile",
    speed: "Instantané",
    cost: "Frais d'envoi de l'opérateur source",
    steps: [
      "Ouvrez votre application Wave ou composez *878#",
      "Sélectionnez 'Envoyer de l'argent'",
      "Entrez le numéro de téléphone Orange Money du destinataire (votre propre numéro OM si vous avez les deux)",
      "Confirmez le montant — les frais Wave s'appliquent (0 FCFA pour Wave → autres)",
      "✓ L'argent arrive directement sur Orange Money",
    ],
    tips: "C'est la méthode la plus recommandée ! Wave ne prend aucun frais d'envoi, donc le transfert Wave → Orange Money est GRATUIT grâce à l'interopérabilité.",
    warning: "Vérifiez que votre opérateur source participe bien au système d'interopérabilité GIM-UEMOA.",
  },
  {
    id: "cash",
    icon: "💵",
    title: "Retrait cash puis re-dépôt",
    subtitle: "Méthode universelle",
    color: C.orange,
    light: "#FFF0E6",
    difficulty: "Très facile",
    speed: "15–30 min",
    cost: "Frais de retrait + trajet",
    steps: [
      "Retirez votre argent en cash depuis votre compte Wave (frais selon grille Wave)",
      "Déplacez-vous vers un agent Orange Money (peut être le même agent)",
      "Déposez le cash sur votre compte Orange Money (dépôt GRATUIT)",
      "✓ Conversion effectuée",
    ],
    tips: "Moins pratique car vous devez avoir du cash, mais fonctionne à 100% partout.",
    warning: "Attention aux frais de retrait Wave qui s'appliquent à la première étape.",
  },
  {
    id: "tierce",
    icon: "🤝",
    title: "Via une tierce personne",
    subtitle: "Échange entre proches",
    color: C.purple,
    light: "#F5F3FF",
    difficulty: "Facile",
    speed: "Instantané",
    cost: "Zéro frais si bien fait",
    steps: [
      "Trouvez un ami/proche qui a l'opérateur opposé (il a Orange Money, vous avez Wave)",
      "Il vous envoie le montant souhaité depuis Orange Money",
      "Vous lui envoyez l'équivalent depuis Wave (envoi Wave = 0 FCFA)",
      "✓ Échange mutuel sans frais",
    ],
    tips: "La méthode la moins chère : zéro frais si vous utilisez Wave pour l'envoi. Parfait entre collègues ou amis.",
    warning: "Uniquement faisable avec quelqu'un de confiance.",
  },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
function getFee(schedule, amount) {
  if (typeof schedule === "number") return schedule;
  for (const tier of schedule) { if (amount <= tier.max) return tier.fee; }
  return schedule[schedule.length - 1].fee;
}
function fmt(n) { return n.toLocaleString("fr-FR") + " FCFA"; }
function stars(r) { return "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "") + "☆".repeat(5 - Math.ceil(r)); }

// ─── SHARED UI ────────────────────────────────────────────────────────────────
const pill = (bg, col, txt) => (
  <span style={{ background: bg, color: col, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{txt}</span>
);

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 44 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.greenD, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(24px, 4vw, 34px)", color: C.dark, margin: "0 0 12px", lineHeight: 1.2 }}>{title}</h2>
      {subtitle && <p style={{ color: C.muted, fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.65 }}>{subtitle}</p>}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #00C853, #1A8CFF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, color: "#fff" }}>₣</div>
      <div>
        <div style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: C.dark, lineHeight: 1 }}>CompareMoney</div>
        <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Africa</div>
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { label: "Comparer", id: "comparateur" },
  { label: "Calculateur", id: "calculator" },
  { label: "Conversion", id: "conversion" },
  { label: "International", id: "international" },
];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return (
    <>
      <nav className="nav-inner" style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.border}`, padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Logo />
        <div className="nav-links" style={{ display: "flex", gap: 6 }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ border: "none", background: "none", fontSize: 13, color: C.muted, fontWeight: 500, cursor: "pointer", padding: "6px 12px", borderRadius: 8 }}
              onMouseEnter={e => { e.target.style.background = C.bg; e.target.style.color = C.dark; }}
              onMouseLeave={e => { e.target.style.background = "none"; e.target.style.color = C.muted; }}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 10px", fontSize: 18, cursor: "pointer", color: C.dark, lineHeight: 1 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
          <button className="nav-cta" onClick={() => scrollTo("alertes")} style={{ background: C.dark, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            🔔 Alertes
          </button>
        </div>
      </nav>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "#fff", borderBottom: `1px solid ${C.border}`, padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
          {NAV_LINKS.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 16px", border: "none", background: "none", fontSize: 15, fontWeight: 500, color: C.dark, cursor: "pointer", borderBottom: `1px solid ${C.bg}` }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const isMobile = useIsMobile();
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="hero-section" style={{ background: `linear-gradient(135deg, ${C.dark} 0%, ${C.dark2} 50%, #0A2E1A 100%)`, padding: "72px 24px 80px", position: "relative", overflow: "hidden" }}>
      {[{ s: 400, x: "-10%", y: "-30%" }, { s: 300, x: "70%", y: "20%" }, { s: 200, x: "40%", y: "60%" }].map((c, i) => (
        <div key={i} style={{ position: "absolute", width: c.s, height: c.s, borderRadius: "50%", border: "1px solid rgba(0,200,83,0.2)", left: c.x, top: c.y, background: "radial-gradient(circle, rgba(0,200,83,0.08) 0%, transparent 70%)" }} />
      ))}
      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,200,83,0.15)", color: "#00C853", border: "1px solid rgba(0,200,83,0.3)", borderRadius: 20, padding: "5px 14px", fontSize: 12, fontWeight: 600, marginBottom: 24 }}>
          ✦ Wave · Orange Money · Free Money · Sendwave · WorldRemit
        </span>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
          Comparez tous les services<br /><span style={{ color: C.green }}>Mobile Money</span> en Afrique
        </h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Frais, conversions, transferts internationaux — tout ce qu'il faut savoir pour ne jamais payer trop cher.
        </p>
        <div className="hero-btns" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("calculator")} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "auto" }}>Calculer mes frais →</button>
          <button onClick={() => scrollTo("conversion")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Guide conversion</button>
        </div>
        <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 12, marginTop: 48 }}>
          {[["3", "Opérateurs locaux"], ["6+", "Services internationaux"], ["0 FCFA", "Envoi Wave"], ["Gratuit", "Accès total"]].map(([v, l]) => (
            <div key={l} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", fontFamily: "'DM Serif Display', Georgia, serif" }}>{v}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CALCULATOR ──────────────────────────────────────────────────────────────
function Calculator() {
  const [amount, setAmount] = useState(10000);
  const [input, setInput] = useState("10000");
  const [type, setType] = useState("send");

  const handleInput = (v) => { setInput(v); setAmount(parseInt(v.replace(/\D/g, "")) || 0); };
  const results = OPERATORS.map(op => ({ ...op, fee: getFee(op.fees[type], amount) })).sort((a, b) => a.fee - b.fee);
  const bestFee = results[0]?.fee ?? 0;
  const quickAmounts = [5000, 10000, 25000, 50000, 100000, 200000];

  return (
    <section id="calculator" className="section-pad" style={{ background: C.bg, padding: "64px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <SectionHeader eyebrow="⚡ Calculateur instantané" title="Combien payez-vous vraiment ?" subtitle="Entrez un montant et comparez les frais des 3 opérateurs en temps réel" />

        <div style={{ background: "#fff", borderRadius: 20, padding: "28px", boxShadow: "0 4px 24px rgba(13,27,42,0.07)", marginBottom: 20, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 24, background: C.bg, borderRadius: 10, padding: 4 }}>
            {[{ k: "send", l: "📤 Envoyer" }, { k: "withdraw", l: "🏧 Retirer" }].map(({ k, l }) => (
              <button key={k} onClick={() => setType(k)} style={{ flex: 1, padding: "10px 0", border: "none", borderRadius: 8, background: type === k ? "#fff" : "transparent", color: type === k ? C.dark : C.muted, fontWeight: type === k ? 700 : 500, fontSize: 14, cursor: "pointer", boxShadow: type === k ? "0 2px 8px rgba(0,0,0,0.08)" : "none", transition: "all .2s" }}>{l}</button>
            ))}
          </div>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.07em" }}>Montant</label>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: C.bg, borderRadius: 12, padding: "4px 16px", border: `2px solid ${C.border}`, marginBottom: 16 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: C.dark }}>₣</span>
            <input type="text" value={input} onChange={e => handleInput(e.target.value)} style={{ flex: 1, border: "none", background: "transparent", fontSize: 28, fontWeight: 700, color: C.dark, outline: "none", fontFamily: "'DM Serif Display', Georgia, serif", padding: "10px 0" }} />
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 600 }}>FCFA</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {quickAmounts.map(q => (
              <button key={q} onClick={() => { setAmount(q); setInput(q.toString()); }} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${C.border}`, background: amount === q ? C.dark : "#fff", color: amount === q ? "#fff" : "#4A5568", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>{q / 1000}k</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {results.map((op, i) => {
            const isBest = i === 0;
            const savings = op.fee - bestFee;
            return (
              <div key={op.id} style={{ background: "#fff", borderRadius: 16, padding: "16px 20px", border: isBest ? `2px solid ${op.color}` : `1px solid ${C.border}`, boxShadow: isBest ? `0 4px 20px ${op.color}22` : "none", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", position: "relative", overflow: "hidden", transition: "transform .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                {isBest && <div style={{ position: "absolute", top: 0, right: 0, background: op.color, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 14px", borderBottomLeftRadius: 10, letterSpacing: "0.06em" }}>✓ MEILLEUR PRIX</div>}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: op.light, color: op.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, flexShrink: 0, fontFamily: "'DM Serif Display', Georgia, serif" }}>{op.logo}</div>
                <div style={{ minWidth: 120 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: C.dark }}>{op.name}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{op.tagline}</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Frais</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: isBest ? op.color : C.dark, fontFamily: "'DM Serif Display', Georgia, serif" }}>{fmt(op.fee)}</div>
                  {savings > 0 && <div style={{ fontSize: 11, color: "#E53E3E", fontWeight: 600 }}>+{fmt(savings)} de plus</div>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Net {type === "send" ? "envoyé" : "reçu"}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.dark }}>{fmt(amount - op.fee)}</div>
                </div>
                <div style={{ width: "100%", marginTop: 4 }}>
                  <div style={{ background: C.bg, borderRadius: 4, height: 5, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 4, background: op.color, width: `${100 - (op.fee / Math.max(amount, 1)) * 100}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {amount > 0 && (
          <div style={{ marginTop: 14, background: "#E8FFF1", border: "1px solid #A3E6BE", borderRadius: 12, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <span style={{ color: "#0A6E36" }}>En choisissant <strong>Wave</strong>, vous économisez <strong>{fmt(results[results.length - 1].fee - results[0].fee)}</strong> par rapport à l'option la plus chère.</span>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── COMPARISON TABLE ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const [view, setView] = useState("features");
  const featureKeys = Object.keys(OPERATORS[0].features);

  return (
    <section id="comparateur" className="section-pad" style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader eyebrow="🔍 Comparatif complet" title="Qui est le meilleur opérateur ?" subtitle="Comparez fonctionnalités, limites et grilles tarifaires" />

        <div className="view-switcher" style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
          {[{ k: "features", l: "Fonctionnalités" }, { k: "limits", l: "Limites" }, { k: "fees", l: "Tarifs" }].map(({ k, l }) => (
            <button className="view-btn" key={k} onClick={() => setView(k)} style={{ padding: "9px 20px", borderRadius: 8, border: view === k ? "none" : `1px solid ${C.border}`, background: view === k ? C.dark : "#fff", color: view === k ? "#fff" : "#4A5568", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{l}</button>
          ))}
        </div>

        <div className="compare-header" style={{ background: C.bg, borderRadius: "16px 16px 0 0", padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr repeat(3, 1fr)", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>Critère</div>
          {OPERATORS.map(op => (
            <div key={op.id} style={{ textAlign: "center" }}>
              <div className="op-logo" style={{ width: 44, height: 44, borderRadius: 12, background: op.light, color: op.color, fontSize: 18, fontWeight: 800, margin: "0 auto 6px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display', Georgia, serif" }}>{op.logo}</div>
              <div className="op-name" style={{ fontWeight: 700, fontSize: 14, color: C.dark }}>{op.name}</div>
              <div className="op-users" style={{ fontSize: 11, color: C.muted }}>{op.users}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                <span style={{ color: "#F6A623" }}>{stars(op.rating).slice(0, 5)}</span>
                <span style={{ color: C.muted, marginLeft: 4 }}>{op.rating}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
          {view === "features" && featureKeys.map((feat, i) => (
            <div className="compare-row" key={feat} style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, 1fr)", gap: 12, alignItems: "center", padding: "14px 24px", background: i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: i < featureKeys.length - 1 ? `1px solid ${C.bg}` : "none" }}>
              <div className="row-label" style={{ fontSize: 13, color: "#4A5568", fontWeight: 500 }}>{feat}</div>
              {OPERATORS.map(op => (
                <div key={op.id} style={{ textAlign: "center" }}>
                  {op.features[feat] ? <span style={{ fontSize: 18, color: C.green }}>✓</span> : <span style={{ fontSize: 18, color: "#CBD5E0" }}>✗</span>}
                </div>
              ))}
            </div>
          ))}
          {view === "limits" && [
            { key: "daily", label: "Limite/jour" },
            { key: "monthly", label: "Limite/mois" },
            { key: "balance", label: "Solde max" },
          ].map(({ key, label }, i) => (
            <div className="compare-row" key={key} style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, 1fr)", gap: 12, alignItems: "center", padding: "16px 24px", background: i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: i < 2 ? `1px solid ${C.bg}` : "none" }}>
              <div className="row-label" style={{ fontSize: 13, color: "#4A5568", fontWeight: 500 }}>{label}</div>
              {OPERATORS.map(op => {
                const val = op.limits[key];
                const maxVal = Math.max(...OPERATORS.map(o => o.limits[key]));
                const isBest = val === maxVal;
                return (
                  <div key={op.id} style={{ textAlign: "center" }}>
                    <div className="row-val" style={{ fontWeight: 700, fontSize: 12, color: isBest ? C.greenD : C.dark }}>{fmt(val)}</div>
                    <div style={{ height: 4, background: C.bg, borderRadius: 2, marginTop: 6, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: op.color, borderRadius: 2, width: `${(val / maxVal) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {view === "fees" && [5000, 10000, 25000, 50000, 100000, 200000, 500000].map((amt, i) => {
            const fees = OPERATORS.map(op => ({ id: op.id, color: op.color, fee: getFee(op.fees.send, amt) }));
            const minFee = Math.min(...fees.map(f => f.fee));
            return (
              <div className="compare-row" key={amt} style={{ display: "grid", gridTemplateColumns: "1fr repeat(3, 1fr)", gap: 4, alignItems: "center", padding: "12px 24px", background: i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: i < 6 ? `1px solid ${C.bg}` : "none" }}>
                <div className="row-label" style={{ fontSize: 12, color: "#4A5568", fontWeight: 500 }}>{(amt / 1000)}k FCFA</div>
                {fees.map(f => (
                  <div key={f.id} style={{ textAlign: "center" }}>
                    <span className="fee-badge" style={{ fontWeight: 700, fontSize: 12, color: f.fee === minFee ? C.greenD : "#E53E3E", background: f.fee === minFee ? "#E8FFF1" : "#FFF5F5", padding: "3px 8px", borderRadius: 6, display: "inline-block" }}>{fmt(f.fee)}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CONVERSION SECTION ───────────────────────────────────────────────────────
function ConversionSection() {
  const [activeMethod, setActiveMethod] = useState(0);
  const [fromOp, setFromOp] = useState("wave");
  const [toOp, setToOp] = useState("orange");

  const m = CONVERSION_METHODS[activeMethod];

  const diffColor = { "Facile": C.green, "Très facile": C.blue };

  return (
    <section id="conversion" className="section-pad" style={{ background: C.bg, padding: "64px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="🔄 Guide de conversion"
          title="Comment convertir Wave ↔ Orange Money ?"
          subtitle="4 méthodes expliquées étape par étape — choisissez celle qui correspond à votre situation"
        />

        {/* From / To switcher */}
        <div className="conv-from-to" style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", marginBottom: 28, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>De</label>
            <div style={{ display: "flex", gap: 8 }}>
              {OPERATORS.map(op => (
                <button key={op.id} onClick={() => { setFromOp(op.id); if (op.id === toOp) setToOp(OPERATORS.find(o => o.id !== op.id).id); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: fromOp === op.id ? `2px solid ${op.color}` : `1px solid ${C.border}`, background: fromOp === op.id ? op.light : "#fff", color: fromOp === op.id ? op.color : C.muted, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  {op.logo} {op.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="conv-arrow" style={{ fontSize: 28, color: C.muted }}>→</div>
          <div style={{ flex: 1, minWidth: 160 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 8 }}>Vers</label>
            <div style={{ display: "flex", gap: 8 }}>
              {OPERATORS.map(op => (
                <button key={op.id} onClick={() => { setToOp(op.id); if (op.id === fromOp) setFromOp(OPERATORS.find(o => o.id !== op.id).id); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: toOp === op.id ? `2px solid ${op.color}` : `1px solid ${C.border}`, background: toOp === op.id ? op.light : "#fff", color: toOp === op.id ? op.color : C.muted, fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  {op.logo} {op.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="conv-best" style={{ background: "#E8FFF1", borderRadius: 12, padding: "12px 16px", minWidth: 200 }}>
            <div style={{ fontSize: 11, color: C.greenD, fontWeight: 700, marginBottom: 4 }}>💡 Meilleure méthode</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.dark }}>
              {fromOp === "wave" ? "Interopérabilité GIM-UEMOA" : "Via un agent agréé"}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              {fromOp === "wave" ? "Gratuit · Instantané" : "Simple · 5–15 min"}
            </div>
          </div>
        </div>

        {/* Method tabs */}
        <div className="conv-tabs" style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {CONVERSION_METHODS.map((method, i) => (
            <button key={method.id} onClick={() => setActiveMethod(i)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 12, border: activeMethod === i ? `2px solid ${method.color}` : `1px solid ${C.border}`, background: activeMethod === i ? method.light : "#fff", color: activeMethod === i ? method.color : C.muted, fontWeight: activeMethod === i ? 700 : 500, fontSize: 13, cursor: "pointer", transition: "all .15s" }}>
              <span>{method.icon}</span>
              <span>{method.title.split(" ").slice(0, 3).join(" ")}</span>
            </button>
          ))}
        </div>

        {/* Active method detail */}
        <div style={{ background: "#fff", borderRadius: 20, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 4px 24px rgba(13,27,42,0.06)" }}>
          {/* Header */}
          <div style={{ background: m.light, padding: "24px 28px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ fontSize: 36 }}>{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: C.dark, margin: 0 }}>{m.title}</h3>
                {pill(m.light, m.color, m.subtitle)}
              </div>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 8 }}>
                {[["⏱", "Vitesse", m.speed], ["💰", "Coût", m.cost], ["📶", "Difficulté", m.difficulty]].map(([ico, lab, val]) => (
                  <div key={lab} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                    <span>{ico}</span>
                    <span style={{ color: C.muted }}>{lab} :</span>
                    <span style={{ fontWeight: 600, color: C.dark }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div style={{ padding: "28px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Étapes à suivre</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {m.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  {!step.startsWith("✓") && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                  )}
                  {step.startsWith("✓") && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E8FFF1", color: C.greenD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>✓</div>
                  )}
                  <div style={{ fontSize: 14, color: step.startsWith("✓") ? C.greenD : "#4A5568", lineHeight: 1.6, paddingTop: 4, fontWeight: step.startsWith("✓") ? 600 : 400 }}>{step.replace("✓ ", "")}</div>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: 12, padding: "14px 18px", marginBottom: m.warning ? 12 : 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>💡 Conseil pro</div>
              <div style={{ fontSize: 13, color: "#78350F", lineHeight: 1.6 }}>{m.tips}</div>
            </div>

            {m.warning && (
              <div style={{ background: "#FFF5F5", border: "1px solid #FCA5A5", borderRadius: 12, padding: "14px 18px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#7F1D1D", marginBottom: 4 }}>⚠️ Attention</div>
                <div style={{ fontSize: 13, color: "#7F1D1D", lineHeight: 1.6 }}>{m.warning}</div>
              </div>
            )}
          </div>
        </div>

        {/* Quick comparison of methods */}
        <div className="conv-cards" style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {CONVERSION_METHODS.map((method, i) => (
            <div key={method.id} onClick={() => setActiveMethod(i)} style={{ background: "#fff", borderRadius: 14, padding: "16px", border: activeMethod === i ? `2px solid ${method.color}` : `1px solid ${C.border}`, cursor: "pointer", transition: "all .15s" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{method.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 4 }}>{method.title}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {pill(method.light, method.color, method.speed)}
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{method.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── INTERNATIONAL SECTION ────────────────────────────────────────────────────
function InternationalSection() {
  const [selected, setSelected] = useState(null);
  const [filterDir, setFilterDir] = useState("all");

  const filtered = INTL_OPERATORS.filter(op => {
    if (filterDir === "all") return true;
    if (filterDir === "in") return op.direction.includes("→ Sénégal") || op.direction.includes("→ Afrique");
    if (filterDir === "region") return op.direction.includes("UEMOA") || op.direction.includes("↔");
    return true;
  });

  const selOp = selected !== null ? INTL_OPERATORS[selected] : null;

  return (
    <section id="international" className="section-pad" style={{ background: "#fff", padding: "64px 24px" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="🌍 Transferts internationaux"
          title="Envoyez et recevez de l'argent partout dans le monde"
          subtitle="Comparez les services pour envoyer de l'argent depuis l'étranger vers l'Afrique, ou entre pays africains"
        />

        {/* Filter */}
        <div className="filter-row" style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32, flexWrap: "wrap" }}>
          {[{ k: "all", l: "🌐 Tous" }, { k: "in", l: "📥 Recevoir au Sénégal" }, { k: "region", l: "🌍 Zone UEMOA" }].map(({ k, l }) => (
            <button className="filter-btn" key={k} onClick={() => setFilterDir(k)} style={{ padding: "9px 20px", borderRadius: 8, border: filterDir === k ? "none" : `1px solid ${C.border}`, background: filterDir === k ? C.dark : "#fff", color: filterDir === k ? "#fff" : "#4A5568", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{l}</button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="intl-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
          {filtered.map((op, i) => {
            const realIdx = INTL_OPERATORS.indexOf(op);
            const isSelected = selected === realIdx;
            return (
              <div key={op.name} onClick={() => setSelected(isSelected ? null : realIdx)} style={{ background: "#fff", borderRadius: 16, border: isSelected ? `2px solid ${op.color}` : `1px solid ${C.border}`, padding: "20px", cursor: "pointer", transition: "all .2s", boxShadow: isSelected ? `0 6px 24px ${op.color}22` : "none", position: "relative" }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.boxShadow = "none"; }}>

                {op.highlight && (
                  <div style={{ position: "absolute", top: -1, right: 16, background: C.green, color: "#fff", fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: "0 0 8px 8px", letterSpacing: "0.05em" }}>⭐ RECOMMANDÉ</div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: op.light, color: op.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>{op.logo}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.dark }}>{op.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{op.direction}</div>
                  </div>
                </div>

                <div className="intl-stat-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {[["💰 Frais", op.fees], ["⚡ Vitesse", op.speed], ["📤 Minimum", op.minAmount], ["📊 Maximum", op.maxAmount]].map(([lab, val]) => (
                    <div key={lab} style={{ background: C.bg, borderRadius: 8, padding: "8px 10px" }}>
                      <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{lab}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.dark }}>{val}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>Réception possible via :</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {op.delivery.map(d => (
                      <span key={d} style={{ background: op.light, color: op.color, borderRadius: 6, padding: "3px 8px", fontSize: 11, fontWeight: 600 }}>{d}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: "#F6A623" }}>{stars(op.rating).slice(0, 5)}</span>
                    <span style={{ fontSize: 12, color: C.muted, marginLeft: 4 }}>{op.rating}/5</span>
                  </div>
                  <span style={{ fontSize: 12, color: op.color, fontWeight: 600 }}>{isSelected ? "▲ Fermer" : "▼ Détails"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selOp && (
          <div className="intl-detail-panel" style={{ background: selOp.light, border: `1px solid ${selOp.color}44`, borderRadius: 20, padding: "28px", animation: "fadeUp .3s ease" }}>
            <div className="intl-detail-header" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "#fff", color: selOp.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800 }}>{selOp.logo}</div>
              <div>
                <h3 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 22, color: C.dark, margin: "0 0 4px" }}>{selOp.name}</h3>
                <div style={{ fontSize: 13, color: C.muted }}>{selOp.direction}</div>
              </div>
              <div style={{ marginLeft: "auto", background: "#fff", borderRadius: 12, padding: "12px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: selOp.color }}>{selOp.fees}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{selOp.feesNote}</div>
              </div>
            </div>

            <div className="intl-detail-cols" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>🌍 Pays d'envoi</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selOp.countries.map(c => <span key={c} style={{ background: "#fff", borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 500, color: C.dark }}>{c}</span>)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>📍 Pays de réception</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {selOp.destCountries.map(c => <span key={c} style={{ background: "#fff", borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 500, color: C.dark }}>{c}</span>)}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 20, background: "#fff", borderRadius: 12, padding: "14px 18px", display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20 }}>💡</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginBottom: 2 }}>Notre avis</div>
                <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.65 }}>{selOp.tip}</div>
              </div>
            </div>
          </div>
        )}

        {/* Comparison mini-table */}
        <div style={{ marginTop: 32, background: C.bg, borderRadius: 16, padding: "24px", border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 16 }}>📊 Résumé comparatif — Envoi de 100 € vers le Sénégal</div>
          <div className="intl-table-wrap" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table className="intl-summary-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 480 }}>
              <thead>
                <tr style={{ background: C.dark }}>
                  {["Service", "Frais estimés", "Vitesse", "Méthode réception", "Note"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#fff", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Sendwave", fee: "0 €", speed: "Instantané", method: "Wave / OM / Free", rating: "⭐ 4.8", best: true },
                  { name: "Lemfi", fee: "0 – 2 €", speed: "Instantané", method: "Wave / OM / Bancaire", rating: "4.3", best: false },
                  { name: "WorldRemit", fee: "0,99 – 2,99 €", speed: "Quelques min", method: "OM / Wave / Cash", rating: "4.4", best: false },
                  { name: "MoneyGram", fee: "3 – 8 €", speed: "Quelques min", method: "Cash / OM", rating: "3.9", best: false },
                  { name: "Western Union", fee: "5 – 12 €", speed: "Quelques min", method: "Cash / Bancaire", rating: "3.7", best: false },
                ].map((row, i) => (
                  <tr key={row.name} style={{ background: row.best ? "#E8FFF1" : i % 2 === 0 ? "#fff" : "#FAFBFC", borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "12px 14px", fontWeight: 600, color: row.best ? C.greenD : C.dark }}>{row.best ? "✓ " : ""}{row.name}</td>
                    <td style={{ padding: "12px 14px", fontWeight: row.best ? 700 : 400, color: row.best ? C.greenD : "#4A5568" }}>{row.fee}</td>
                    <td style={{ padding: "12px 14px", color: "#4A5568" }}>{row.speed}</td>
                    <td style={{ padding: "12px 14px", color: "#4A5568" }}>{row.method}</td>
                    <td style={{ padding: "12px 14px", color: "#F6A623" }}>{row.rating}</td>
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

// ─── ALERT SECTION ────────────────────────────────────────────────────────────
function AlertSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section id="alertes" style={{ background: `linear-gradient(135deg, ${C.dark}, ${C.dark2})`, padding: "64px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔔</div>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 28, color: "#fff", margin: "0 0 12px" }}>Alertes tarifs en temps réel</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>Recevez une notification dès qu'un opérateur change ses frais. Ne payez plus jamais trop cher.</p>
        {sent ? (
          <div style={{ background: "#E8FFF1", border: "1px solid #A3E6BE", borderRadius: 12, padding: "16px 24px", color: "#0A6E36", fontWeight: 600 }}>✓ Inscription confirmée ! Vous recevrez les alertes par email.</div>
        ) : (
          <div className="alert-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <input type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, minWidth: 220, padding: "14px 20px", borderRadius: 10, border: "none", fontSize: 15, outline: "none", background: "rgba(255,255,255,0.1)", color: "#fff", backdropFilter: "blur(8px)" }} />
            <button onClick={() => { if (email) setSent(true); }} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>M'alerter →</button>
          </div>
        )}
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 16 }}>Gratuit · Pas de spam · Désabonnement en 1 clic</p>
      </div>
    </section>
  );
}




// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "Wave est-il vraiment gratuit pour les envois ?", a: "Oui, Wave ne prend aucun frais pour les envois entre utilisateurs Wave au Sénégal. Des frais s'appliquent uniquement pour les retraits en cash." },
    { q: "Comment fonctionne l'interopérabilité GIM-UEMOA ?", a: "Le système GIM-UEMOA permet aux utilisateurs de différents opérateurs Mobile Money de s'envoyer de l'argent directement, sans passer par le cash. Wave peut envoyer vers Orange Money, et vice-versa, en quelques secondes." },
    { q: "Sendwave est-il vraiment sans frais ?", a: "Sendwave ne prend pas de commission visible, mais gagne une marge sur le taux de change. Dans l'ensemble, c'est souvent le service le moins cher pour envoyer de l'argent vers le Sénégal depuis l'Europe." },
    { q: "Ces données sont-elles mises à jour régulièrement ?", a: "Nous mettons à jour les tarifs dès qu'un opérateur annonce un changement. Inscrivez-vous aux alertes pour être notifié en temps réel. La date de dernière mise à jour est visible en bas de chaque tableau." },
  ];

  return (
    <section style={{ background: "#fff", padding: "48px 24px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 26, color: C.dark, textAlign: "center", marginBottom: 28 }}>Questions fréquentes</h2>
        {items.map((item, i) => (
          <div key={i} style={{ background: C.bg, borderRadius: 12, marginBottom: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: C.dark }}>{item.q}</span>
              <span style={{ fontSize: 18, color: C.muted, transform: open === i ? "rotate(45deg)" : "none", transition: "transform .2s", flexShrink: 0 }}>+</span>
            </button>
            {open === i && <div style={{ padding: "0 20px 16px", fontSize: 13, color: "#4A5568", lineHeight: 1.7 }}>{item.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.dark, padding: "40px 24px 28px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="footer-cols" style={{ display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 28 }}>
          <div style={{ flex: 2, minWidth: 200 }}>
            <Logo />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 12, lineHeight: 1.65, maxWidth: 280 }}>Le site de référence pour comparer les services Mobile Money en Afrique de l'Ouest.</p>
          </div>
          {[
            { title: "Opérateurs", links: ["Wave", "Orange Money", "Free Money", "Sendwave", "WorldRemit"] },
            { title: "Guides", links: ["Conversion Wave → OM", "Envoyer depuis l'étranger", "Calculateur de frais", "Alertes tarifs"] },
            { title: "Légal", links: ["Mentions légales", "Confidentialité", "CGU", "Contact"] },
          ].map(col => (
            <div key={col.title} style={{ flex: 1, minWidth: 120 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>{col.title}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 8, cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = C.green}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2026 CompareMobileMoney Africa. Les tarifs sont indicatifs, vérifiez auprès des opérateurs officiels.</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>🇸🇳 Fait au Sénégal avec ❤️</span>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap";
    document.head.appendChild(link);

    // Viewport meta — critical for mobile
    if (!document.querySelector('meta[name="viewport"]')) {
      const vp = document.createElement("meta");
      vp.name = "viewport";
      vp.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0";
      document.head.appendChild(vp);
    }

    const style = document.createElement("style");
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { overflow-x: hidden; }
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #0D1B2A; overflow-x: hidden; width: 100%; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #F7F9FC; }
      ::-webkit-scrollbar-thumb { background: #CBD5E0; border-radius: 3px; }
      button, input { font-family: inherit; }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ── MOBILE RESPONSIVE ── */
      @media (max-width: 767px) {

        /* Nav */
        .nav-links { display: none !important; }
        .nav-cta { font-size: 11px !important; padding: 7px 12px !important; }
        .nav-inner { padding: 0 16px !important; }

        /* Hero */
        .hero-section { padding: 48px 16px 56px !important; }
        .hero-stats { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        .hero-btns { flex-direction: column !important; gap: 10px !important; }
        .hero-btns button { width: 100% !important; }

        /* Sections */
        .section-pad { padding: 44px 16px !important; }

        /* Calculator */
        .calc-result-row { flex-direction: column !important; gap: 12px !important; }
        .calc-result-fee { text-align: left !important; }
        .calc-result-net { text-align: left !important; }
        .quick-amounts { gap: 6px !important; }

        /* Comparison table */
        .compare-header { grid-template-columns: 80px repeat(3, 1fr) !important; gap: 4px !important; padding: 14px 12px !important; }
        .compare-header .op-logo { width: 32px !important; height: 32px !important; font-size: 13px !important; }
        .compare-header .op-name { font-size: 11px !important; }
        .compare-header .op-users { display: none; }
        .compare-row { grid-template-columns: 80px repeat(3, 1fr) !important; gap: 4px !important; padding: 10px 12px !important; }
        .compare-row .row-label { font-size: 11px !important; }
        .compare-row .row-val { font-size: 11px !important; }
        .compare-row .fee-badge { font-size: 10px !important; padding: 2px 6px !important; }
        .view-switcher { gap: 6px !important; }
        .view-btn { padding: 7px 12px !important; font-size: 11px !important; }

        /* Conversion */
        .conv-from-to { flex-direction: column !important; gap: 12px !important; }
        .conv-arrow { display: none !important; }
        .conv-best { width: 100% !important; }
        .conv-tabs { gap: 6px !important; }
        .conv-tab { padding: 8px 10px !important; font-size: 11px !important; }
        .conv-detail-header { flex-direction: column !important; gap: 10px !important; }
        .conv-meta { flex-wrap: wrap !important; gap: 8px !important; }
        .conv-cards { grid-template-columns: 1fr 1fr !important; }
        .conv-steps { padding: 16px !important; }

        /* International */
        .intl-grid { grid-template-columns: 1fr !important; }
        .intl-detail-cols { grid-template-columns: 1fr !important; gap: 14px !important; }
        .intl-detail-panel { padding: 18px 16px !important; }
        .intl-detail-header { flex-wrap: wrap !important; gap: 10px !important; }
        .intl-summary-table { font-size: 11px !important; }
        .intl-summary-table th,
        .intl-summary-table td { padding: 8px 8px !important; }

        /* Alert section */
        .alert-row { flex-direction: column !important; }
        .alert-row input { width: 100% !important; }
        .alert-row button { width: 100% !important; }

        /* Gestion */
        .gestion-grid { grid-template-columns: 1fr !important; }
        .timeline-row { gap: 10px !important; }

        /* Footer */
        .footer-cols { flex-direction: column !important; gap: 24px !important; }
        .footer-col { min-width: unset !important; }

        /* Intl filter */
        .filter-row { gap: 6px !important; }
        .filter-btn { padding: 7px 12px !important; font-size: 11px !important; }

        /* Intl stat grid */
        .intl-stat-grid { grid-template-columns: 1fr 1fr !important; }

        /* Summary table scroll */
        .intl-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      }

      @media (max-width: 480px) {
        .compare-header { grid-template-columns: 70px repeat(3, 1fr) !important; }
        .compare-row { grid-template-columns: 70px repeat(3, 1fr) !important; }
        .compare-row .row-label { font-size: 10px !important; }
        .hero-stats { grid-template-columns: 1fr 1fr !important; }
        .conv-cards { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <Nav />
      <Hero />
      <Calculator />
      <ComparisonTable />
      <ConversionSection />
      <InternationalSection />
      <AlertSection />
      
      <FAQ />
      <Footer />
    </div>
  );
}
