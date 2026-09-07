import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const TOPICS = [
  { icon: "🚀", title: "Aerospace", desc: "Flight, rockets, satellites, and the engineering behind getting things off the ground." },
  { icon: "🧪", title: "Chemistry", desc: "Reactions, materials, and the molecular science behind everyday products." },
  { icon: "⚡", title: "Electricity & EV", desc: "Circuits, power systems, and the technology driving electric vehicles." },
  { icon: "❤️", title: "Heart, Circulatory & Neurological Health", desc: "How the heart, blood vessels, brain, and nervous system keep us alive and thinking." },
  { icon: "🔊", title: "Sound & Speakers", desc: "Acoustics, audio engineering, and how sound is captured, shaped, and amplified." },
  { icon: "💧", title: "Water, Hydro & Infrastructure", desc: "Water systems, dams, treatment, and the infrastructure that keeps communities running." },
  { icon: "🔐", title: "Cybersecurity", desc: "Protecting data, networks, and systems from digital threats." },
  { icon: "🏨", title: "Tourism & Hospitality", desc: "The business and science behind travel, hotels, and guest experience." },
  { icon: "🏭", title: "Manufacturing", desc: "How products are designed, built, and brought to life at scale." },
];

const COLLEGE_DIRECTORY = [
  { topic: "Aerospace", schools: [
    { name: "NC State University — Aerospace Engineering (BS/MS)", state: "NC", url: "https://www.mae.ncsu.edu/" },
    { name: "University of South Carolina — Aerospace Engineering (BS/MS)", state: "SC", url: "https://sc.edu/study/colleges_schools/engineering_and_computing/academics/undergraduate_programs/aerospace_engineering/" },
    { name: "Elizabeth City State University — Aviation Science", state: "NC", url: "https://www.ecsu.edu/" },
  ]},
  { topic: "Chemistry", schools: [
    { name: "NC State University — Department of Chemistry", state: "NC", url: "https://chemistry.sciences.ncsu.edu/" },
    { name: "Clemson University — Department of Chemistry", state: "SC", url: "https://www.clemson.edu/science/departments/chemistry/" },
    { name: "North Carolina A&T State University — Chemistry", state: "NC", url: "https://www.ncat.edu/" },
    { name: "Benedict College — Chemistry Program", state: "SC", url: "https://www.benedict.edu/" },
  ]},
  { topic: "Electricity & EV", schools: [
    { name: "Clemson University — CU-ICAR Automotive Engineering", state: "SC", url: "https://www.clemson.edu/cuicar/" },
    { name: "NC State University — Electrical & Computer Engineering", state: "NC", url: "https://www.ece.ncsu.edu/" },
    { name: "Central Carolina Community College — Electric Vehicle & Battery Tech", state: "NC", url: "https://www.cccc.edu/" },
    { name: "Spartanburg Community College — Mechatronics & EV Technology", state: "SC", url: "https://www.sccsc.edu/" },
  ]},
  { topic: "Heart, Circulatory & Neurological Health", schools: [
    { name: "UNC Chapel Hill — Biomedical Engineering", state: "NC", url: "https://bme.unc.edu/" },
    { name: "Clemson University — Bioengineering", state: "SC", url: "https://www.clemson.edu/cecas/departments/bioe/" },
    { name: "Medical University of South Carolina — Neuroscience", state: "SC", url: "https://medicine.musc.edu/departments/neuroscience" },
    { name: "Duke University — Biomedical Engineering", state: "NC", url: "https://bme.duke.edu/" },
  ]},
  { topic: "Sound & Speakers", schools: [
    { name: "Appalachian State University — Sound Recording Technology", state: "NC", url: "https://sound.appstate.edu/" },
    { name: "Anderson University — Music & Audio Production", state: "SC", url: "https://www.andersonuniversity.edu/" },
  ]},
  { topic: "Water, Hydro & Infrastructure", schools: [
    { name: "NC State University — Civil, Construction & Environmental Engineering", state: "NC", url: "https://www.ccee.ncsu.edu/" },
    { name: "Clemson University — Civil Engineering", state: "SC", url: "https://www.clemson.edu/cecas/departments/cee/" },
    { name: "University of South Carolina — Civil & Environmental Engineering", state: "SC", url: "https://sc.edu/study/colleges_schools/engineering_and_computing/" },
  ]},
  { topic: "Cybersecurity", schools: [
    { name: "UNC Charlotte — Cybersecurity (NSA Center of Academic Excellence)", state: "NC", url: "https://cci.charlotte.edu/" },
    { name: "Fayetteville State University — Cybersecurity Program", state: "NC", url: "https://www.uncfsu.edu/" },
    { name: "University of South Carolina — Integrated Information Technology, Cyber Track", state: "SC", url: "https://sc.edu/study/colleges_schools/engineering_and_computing/" },
    { name: "Clemson University — Cybersecurity Minor & Research", state: "SC", url: "https://www.clemson.edu/cecas/departments/cs/" },
  ]},
  { topic: "Tourism & Hospitality", schools: [
    { name: "University of South Carolina — Hospitality, Retail & Sport Management", state: "SC", url: "https://sc.edu/study/colleges_schools/hrsm/" },
    { name: "East Carolina University — Hospitality Management", state: "NC", url: "https://hrsm.ecu.edu/" },
    { name: "Johnson & Wales University (Charlotte) — Hospitality Management", state: "NC", url: "https://www.jwu.edu/" },
  ]},
  { topic: "Manufacturing", schools: [
    { name: "NC State University — Industrial & Systems Engineering", state: "NC", url: "https://www.ise.ncsu.edu/" },
    { name: "Clemson University — Automotive & Manufacturing Engineering", state: "SC", url: "https://www.clemson.edu/cuicar/" },
    { name: "Central Piedmont Community College — Advanced Manufacturing", state: "NC", url: "https://www.cpcc.edu/" },
    { name: "Greenville Technical College — Mechatronics & Manufacturing", state: "SC", url: "https://www.gvltec.edu/" },
  ]},
];

const LINKS_LOVE_HBCUS_URL = "https://pnc-links-lovehbc-us-b1jx.vercel.app/";

const NAV_ITEMS = [
  { id: "home",         label: "Home" },
  { id: "about",        label: "About Us" },
  { id: "programs",     label: "Our Programs" },
  { id: "topics",       label: "STEM Topics" },
  { id: "signup",       label: "Sign Up" },
  { id: "calendar",     label: "Calendar" },
  { id: "gallery",      label: "Gallery" },
  { id: "sponsorship",  label: "Sponsorship" },
  { id: "colleges",     label: "Colleges" },
];

export default function StemsReady() {
  const [currentPage, setCurrentPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'Inter', sans-serif; background: #F0FDF4; color: #014421; }
      .display { font-family: 'Poppins', sans-serif; }

      @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

      .a1 { animation: fadeUp 0.8s ease forwards; }
      .a2 { animation: fadeUp 0.8s ease 0.15s forwards; opacity: 0; }
      .a3 { animation: fadeUp 0.8s ease 0.30s forwards; opacity: 0; }
      .a4 { animation: fadeUp 0.8s ease 0.45s forwards; opacity: 0; }

      .btn-primary { background:#FFFFFF; color:#014421; border:none; cursor:pointer; font-weight:600; transition: all 0.25s ease; }
      .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(255,255,255,0.35); background: #E0F7EC; }
      .btn-ghost { background: rgba(255,255,255,0.1); color:white; border:1px solid rgba(255,255,255,0.3); cursor:pointer; backdrop-filter: blur(8px); transition: all 0.25s ease; }
      .btn-ghost:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }

      .nav-item { position:relative; background:none; border:none; cursor:pointer; font-family:'Inter',sans-serif; transition:color 0.2s; }
      .nav-item::after { content:''; position:absolute; bottom:-5px; left:0; width:0; height:2px; background:#FFFFFF; border-radius:2px; transition:width 0.3s; }
      .nav-item:hover::after, .nav-item.active::after { width:100%; }

      .card-lift { transition: transform 0.28s ease, box-shadow 0.28s ease; cursor:pointer; }
      .card-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 44px rgba(11,30,61,0.14); }

      .divider { width:72px; height:3px; background: linear-gradient(90deg,#014421,#025C2C); border-radius:2px; }

      .input-field { width:100%; padding:13px 18px; border-radius:10px; border:1.5px solid rgba(11,30,61,0.2); font-size:15px; font-family:'Inter',sans-serif; background:white; color:#014421; outline:none; transition: all 0.2s; }
      .input-field:focus { border-color:#014421; box-shadow: 0 0 0 3px rgba(11,30,61,0.1); }
      .field-label { font-size:12px; font-weight:600; letter-spacing:0.5px; color:#374151; display:block; margin-bottom:6px; text-transform:uppercase; }

      .marquee-track { display:flex; gap:60px; animation: marquee 24s linear infinite; width: max-content; }

      .footer-root { background: linear-gradient(180deg, #014421 0%, #010F09 100%); }
      .footer-link { color: rgba(255,255,255,0.55); font-size:14px; text-decoration:none; transition:color 0.2s; display:block; margin-bottom:10px; }
      .footer-link:hover { color:#FFFFFF; }

      .geo-bg { background: linear-gradient(135deg, #014421 0%, #025C2C 55%, #014421 100%); }

      @media (max-width: 768px) {
        .hide-mobile { display:none !important; }
        .grid-2 { grid-template-columns: 1fr !important; }
        .grid-3 { grid-template-columns: 1fr 1fr !important; }
        .grid-4 { grid-template-columns: 1fr 1fr !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(link); document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "10px 0" : "20px 0",
        background: scrolled ? "rgba(11,30,61,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => navigate("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, background: "linear-gradient(135deg,#014421,#025C2C)", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🔬</div>
            <div>
              <div className="display" style={{ fontSize: 17, fontWeight: 800, color: "white", lineHeight: 1.1 }}>STEM<span style={{ color: "#A7F3D0" }}>READY</span></div>
              <div style={{ fontSize: 9, color: "#A7F3D0", letterSpacing: "3px", fontWeight: 600 }}>PNC CHAPTER · THE LINKS, INC.</div>
            </div>
          </div>
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 26 }}>
            {NAV_ITEMS.filter(n => n.id !== "home").map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                className={`nav-item ${currentPage === n.id ? "active" : ""}`}
                style={{ color: currentPage === n.id ? "#FFFFFF" : "rgba(255,255,255,0.85)", fontSize: 13.5, fontWeight: 500 }}>
                {n.label}
              </button>
            ))}
            <button onClick={() => navigate("signup")} className="btn-primary" style={{ padding: "10px 22px", borderRadius: 9, fontSize: 13.5 }}>
              Sign Up →
            </button>
          </div>
        </div>
      </nav>

      {currentPage === "home"        && <HomePage navigate={navigate} />}
      {currentPage === "about"       && <AboutPage navigate={navigate} />}
      {currentPage === "programs"    && <ProgramsPage navigate={navigate} />}
      {currentPage === "topics"      && <TopicsPage navigate={navigate} />}
      {currentPage === "signup"      && <SignUpPage navigate={navigate} />}
      {currentPage === "calendar"    && <CalendarPage navigate={navigate} />}
      {currentPage === "gallery"     && <GalleryPage navigate={navigate} />}
      {currentPage === "sponsorship" && <SponsorshipPage navigate={navigate} />}
      {currentPage === "colleges"    && <CollegesPage navigate={navigate} />}

      <footer className="footer-root" style={{ padding: "64px 0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }} className="grid-4">
            <div>
              <div className="display" style={{ fontSize: 16, fontWeight: 800, color: "white", marginBottom: 14 }}>STEM<span style={{ color: "#A7F3D0" }}>READY</span></div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
                Bringing hands-on STEM experiences to 1st–12th grade students, presented by the PNC Chapter of The Links, Incorporated.
              </p>
            </div>
            {[
              { title: "Program", links: [["Home","home"],["About Us","about"],["STEM Topics","topics"],["Colleges","colleges"]] },
              { title: "Get Involved", links: [["Sign Up","signup"],["Calendar","calendar"],["Gallery","gallery"],["Sponsorship","sponsorship"]] },
            ].map((col, ci) => (
              <div key={ci}>
                <h4 style={{ color: "#A7F3D0", fontSize: 10, fontWeight: 700, letterSpacing: "2px", marginBottom: 16, textTransform: "uppercase" }}>{col.title}</h4>
                {col.links.map(([label, page], li) => (
                  <a key={li} href="#" className="footer-link" onClick={e => { e.preventDefault(); navigate(page); }}>{label}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>© 2026 STEMREADY · PNC Chapter of The Links, Incorporated · All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PageShell({ title, subtitle, icon, children }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <div className="geo-bg" style={{ padding: "84px 0 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
          <h1 className="display" style={{ fontSize: "clamp(34px,5vw,58px)", color: "white", fontWeight: 800, marginBottom: 14 }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, maxWidth: 580, lineHeight: 1.7 }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 28px" }}>{children}</div>
    </div>
  );
}

/* HOME */
function HomePage({ navigate }) {
  return (
    <>
      <section className="geo-bg" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "130px 28px 80px" }}>
          <div style={{ maxWidth: 720 }}>
            <div className="a1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(1,68,33,0.15)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 100, padding: "7px 18px", marginBottom: 28 }}>
              <span style={{ color: "#A7F3D0", fontSize: 11, fontWeight: 700, letterSpacing: "2px" }}>PNC CHAPTER · THE LINKS, INCORPORATED</span>
            </div>
            <h1 className="display a2" style={{ fontSize: "clamp(44px,7vw,80px)", fontWeight: 800, color: "white", lineHeight: 1.06, marginBottom: 24 }}>
              Get Your Student <span style={{ color: "#A7F3D0" }}>STEM</span> Ready.
            </h1>
            <p className="a3" style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 38, maxWidth: 540 }}>
              Hands-on science, technology, engineering, and math experiences for 1st–12th grade students — from aerospace to cybersecurity to manufacturing.
            </p>
            <div className="a4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => navigate("signup")} className="btn-primary" style={{ padding: "16px 36px", borderRadius: 10, fontSize: 16 }}>Sign Up for Events →</button>
              <button onClick={() => navigate("topics")} className="btn-ghost" style={{ padding: "16px 36px", borderRadius: 10, fontSize: 16 }}>Explore STEM Topics</button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div className="divider" style={{ margin: "0 auto 22px" }} />
            <h2 className="display" style={{ fontSize: "clamp(28px,4vw,44px)", color: "#014421", fontWeight: 800, marginBottom: 14 }}>Nine Fields. One Mission.</h2>
            <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 560, margin: "0 auto" }}>From the sky to the sea to the cloud — our topics span the real-world STEM careers shaping tomorrow.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="grid-3">
            {TOPICS.map((t, i) => (
              <div key={i} className="card-lift" onClick={() => navigate("topics")} style={{ background: "#F0FDF4", borderRadius: 16, padding: 26, border: "1px solid rgba(11,30,61,0.08)" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{t.icon}</div>
                <h3 className="display" style={{ fontSize: 16, color: "#014421", fontWeight: 700, marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="geo-bg" style={{ padding: "100px 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 28px", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "clamp(32px,5vw,54px)", color: "white", fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Ready to Get <span style={{ color: "#A7F3D0" }}>STEM Ready?</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            Sign up your student for the 2026–27 program year, running October through April.
          </p>
          <button onClick={() => navigate("signup")} className="btn-primary" style={{ padding: "17px 40px", borderRadius: 11, fontSize: 16 }}>Sign Up Today →</button>
        </div>
      </section>
    </>
  );
}

/* ABOUT */
function AboutPage({ navigate }) {
  return (
    <PageShell icon="🔗" title="About Us & What Is STEMREADY?" subtitle="Presented by the PNC Chapter of The Links, Incorporated — Services to Youth Facet.">
      <div style={{ background: "linear-gradient(135deg,#014421,#025C2C)", borderRadius: 20, padding: "48px 46px", marginBottom: 48 }}>
        <h2 className="display" style={{ fontSize: "clamp(26px,3.5vw,40px)", color: "white", fontWeight: 800, marginBottom: 20 }}>What Is STEMREADY?</h2>
        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, lineHeight: 1.8, maxWidth: 780, marginBottom: 18 }}>
          STEMREADY is a hands-on science, technology, engineering, and math enrichment program for students in 1st through 12th grade. Each session introduces students to a real-world STEM field — from aerospace to cybersecurity — through interactive activities, guest professionals, and age-appropriate projects.
        </p>
        <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 16, lineHeight: 1.8, maxWidth: 780 }}>
          The program is presented by the PNC Chapter of The Links, Incorporated, and is designed to build early exposure, curiosity, and confidence in STEM fields — particularly among students who may not otherwise encounter these careers up close.
        </p>
      </div>

      <div style={{ marginBottom: 48 }}>
        <div className="divider" style={{ marginBottom: 22 }} />
        <h2 className="display" style={{ fontSize: "clamp(26px,3.5vw,38px)", color: "#014421", fontWeight: 800, marginBottom: 14 }}>Our Mission</h2>
        <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.8, maxWidth: 760 }}>
          To expose students in grades 1–12 to a broad range of STEM career pathways through direct, hands-on learning experiences — building the awareness and confidence needed to pursue STEM fields in high school, college, and beyond.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="grid-3">
        {[
          { icon: "🎯", title: "Early Exposure", desc: "Introduce STEM careers as early as 1st grade, when curiosity is highest." },
          { icon: "🤝", title: "Real Professionals", desc: "Connect students with working professionals in each STEM field." },
          { icon: "👨‍👩‍👧", title: "Family Involvement", desc: "Keep parents informed and engaged at every step." },
        ].map((p, i) => (
          <div key={i} className="card-lift" style={{ background: "white", borderRadius: 16, padding: 26, border: "1px solid rgba(11,30,61,0.1)" }}>
            <div style={{ fontSize: 30, marginBottom: 12 }}>{p.icon}</div>
            <h3 className="display" style={{ fontSize: 17, color: "#014421", fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
            <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.65 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* PROGRAMS — umbrella page tying STEMREADY and Links Love HBCUs together
   under the PNC Chapter's Services to Youth Committee, for donors who want
   to support "all kids" across both initiatives. */
function ProgramsPage({ navigate }) {
  return (
    <PageShell icon="🔗" title="Our Programs" subtitle="Two initiatives, one mission: the PNC Chapter of The Links, Incorporated's Services to Youth Committee.">
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.8, maxWidth: 780 }}>
          STEMREADY and Links Love HBCUs are both run by the same Services to Youth Committee, reaching students at different stages of their journey — from early hands-on STEM exposure in elementary school through HBCU enrollment support in high school. A gift to either program supports the same shared mission: preparing our young people for what's next.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="grid-2">
        <div className="card-lift" style={{ background: "white", borderRadius: 20, padding: "36px 32px", border: "2px solid #025C2C" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔬</div>
          <h3 className="display" style={{ fontSize: 22, color: "#014421", fontWeight: 800, marginBottom: 4 }}>STEM<span style={{ color: "#025C2C" }}>READY</span></h3>
          <p style={{ fontSize: 12.5, color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 16, textTransform: "uppercase" }}>Grades 1–12 · Oct 2026 – Apr 2027</p>
          <p style={{ fontSize: 14.5, color: "#4B5563", lineHeight: 1.7, marginBottom: 22 }}>
            Hands-on STEM enrichment — aerospace, cybersecurity, EV technology, manufacturing, and more — introducing students to real-world STEM careers early.
          </p>
          <button onClick={() => navigate("about")} className="btn-primary" style={{ padding: "12px 26px", borderRadius: 9, fontSize: 14 }}>Learn More About STEMREADY →</button>
        </div>

        <div className="card-lift" style={{ background: "white", borderRadius: 20, padding: "36px 32px", border: "2px solid #014421" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔗</div>
          <h3 className="display" style={{ fontSize: 22, color: "#014421", fontWeight: 800, marginBottom: 4 }}>Links Love <span style={{ color: "#014421" }}>HBCUs</span></h3>
          <p style={{ fontSize: 12.5, color: "#9CA3AF", fontWeight: 600, letterSpacing: "0.5px", marginBottom: 16, textTransform: "uppercase" }}>Grades 9–12 · Fall 2026–27 Program Year</p>
          <p style={{ fontSize: 14.5, color: "#4B5563", lineHeight: 1.7, marginBottom: 22 }}>
            Guiding high school students through HBCU discovery, campus tours, financial aid, and the application process — connecting them to the legacy of Historically Black Colleges and Universities.
          </p>
          <a href={LINKS_LOVE_HBCUS_URL} target="_blank" rel="noopener noreferrer">
            <button style={{ background: "#014421", color: "white", border: "none", cursor: "pointer", fontWeight: 600, padding: "12px 26px", borderRadius: 9, fontSize: 14 }}>Visit Links Love HBCUs →</button>
          </a>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#014421,#025C2C)", borderRadius: 20, padding: "44px 44px", color: "white", textAlign: "center", marginTop: 48 }}>
        <h2 className="display" style={{ fontSize: 28, marginBottom: 14 }}>Support All Our Kids</h2>
        <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: 26, fontSize: 15, maxWidth: 560, margin: "0 auto 26px" }}>
          One gift can support both programs — STEM enrichment for younger students and HBCU access for our seniors-to-be. Every dollar stays within our chapter's Services to Youth Committee.
        </p>
        <button onClick={() => navigate("sponsorship")} className="btn-primary" style={{ padding: "13px 30px", borderRadius: 9, fontSize: 15 }}>See Sponsorship Options →</button>
      </div>
    </PageShell>
  );
}

/* TOPICS */
function TopicsPage({ navigate }) {
  return (
    <PageShell icon="🧬" title="STEM Topics" subtitle="Every session dives into a different real-world STEM field.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="grid-3">
        {TOPICS.map((t, i) => (
          <div key={i} className="card-lift" style={{ background: "white", borderRadius: 18, padding: 30, border: "1px solid rgba(11,30,61,0.1)" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,rgba(11,30,61,0.08),rgba(1,68,33,0.12))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 16 }}>{t.icon}</div>
            <h3 className="display" style={{ fontSize: 19, color: "#014421", fontWeight: 700, marginBottom: 10 }}>{t.title}</h3>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{t.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* SIGN UP — event registration + parent consent / media release, saved to Supabase */
function SignUpPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    sFirst: "", sLast: "", sGrade: "", sSchool: "",
    pFirst: "", pLast: "", pEmail: "", pPhone: "",
    interests: [], consentParticipate: false, consentMedia: false, signature: "",
  });
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleInterest = t => u("interests", form.interests.includes(t) ? form.interests.filter(x => x !== t) : [...form.interests, t]);

  const IS = { width: "100%", padding: "13px 18px", borderRadius: 10, border: "1.5px solid rgba(11,30,61,0.2)", fontSize: 15, fontFamily: "'Inter',sans-serif", background: "white", color: "#014421", outline: "none" };
  const LS = { fontSize: 12, fontWeight: 600, letterSpacing: "0.5px", color: "#374151", display: "block", marginBottom: 6, textTransform: "uppercase" };

  const handleSubmit = async () => {
    setError(null);
    if (!form.sFirst || !form.sLast || !form.sGrade || !form.pFirst || !form.pEmail || !form.consentParticipate || !form.consentMedia || !form.signature) {
      setError("Please complete all required fields and both consent checkboxes before submitting.");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("event_signups").insert([{
      student_first: form.sFirst, student_last: form.sLast, student_grade: form.sGrade, student_school: form.sSchool,
      parent_first: form.pFirst, parent_last: form.pLast, parent_email: form.pEmail, parent_phone: form.pPhone,
      interests: form.interests, consent_participate: form.consentParticipate, consent_media: form.consentMedia,
      signature: form.signature,
    }]);
    setSubmitting(false);
    if (dbError) {
      setError("Something went wrong submitting your form: " + dbError.message);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) return (
    <PageShell icon="🎉" title="You're Signed Up!" subtitle="">
      <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto", padding: "30px 0" }}>
        <div style={{ fontSize: 80, marginBottom: 20 }}>🧑‍🚀</div>
        <h2 className="display" style={{ fontSize: 38, color: "#014421", marginBottom: 14 }}>Registration Received</h2>
        <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 30 }}>
          Thank you for registering for STEMREADY. Our team will follow up by email with event details and next steps.
        </p>
        <button onClick={() => navigate("calendar")} className="btn-primary" style={{ padding: "13px 30px", borderRadius: 9, fontSize: 15 }}>View the Calendar →</button>
      </div>
    </PageShell>
  );

  return (
    <PageShell icon="✍️" title="Sign Up for STEMREADY" subtitle="Open to students in grades 1–12. A parent or guardian must complete the consent section.">
      <div style={{ maxWidth: 680, margin: "0 auto", background: "white", borderRadius: 22, padding: "44px 40px", boxShadow: "0 6px 32px rgba(11,30,61,0.1)" }}>
        <h3 className="display" style={{ fontSize: 24, color: "#014421", marginBottom: 20 }}>Student Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
          <div><label style={LS}>Student First Name *</label><input style={IS} value={form.sFirst} onChange={e => u("sFirst", e.target.value)} /></div>
          <div><label style={LS}>Student Last Name *</label><input style={IS} value={form.sLast} onChange={e => u("sLast", e.target.value)} /></div>
          <div>
            <label style={LS}>Grade *</label>
            <select style={IS} value={form.sGrade} onChange={e => u("sGrade", e.target.value)}>
              <option value="">Select grade</option>
              {["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th","12th"].map(g => <option key={g}>{g} Grade</option>)}
            </select>
          </div>
          <div><label style={LS}>School</label><input style={IS} value={form.sSchool} onChange={e => u("sSchool", e.target.value)} /></div>
        </div>

        <h3 className="display" style={{ fontSize: 24, color: "#014421", marginBottom: 20 }}>Parent / Guardian Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
          <div><label style={LS}>Parent First Name *</label><input style={IS} value={form.pFirst} onChange={e => u("pFirst", e.target.value)} /></div>
          <div><label style={LS}>Parent Last Name</label><input style={IS} value={form.pLast} onChange={e => u("pLast", e.target.value)} /></div>
          <div><label style={LS}>Email *</label><input style={IS} type="email" value={form.pEmail} onChange={e => u("pEmail", e.target.value)} /></div>
          <div><label style={LS}>Phone</label><input style={IS} type="tel" value={form.pPhone} onChange={e => u("pPhone", e.target.value)} /></div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={LS}>STEM Topics of Interest</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {TOPICS.map(t => (
              <button key={t.title} type="button" onClick={() => toggleInterest(t.title)}
                style={{ padding: "8px 14px", borderRadius: 100, border: "1.5px solid", borderColor: form.interests.includes(t.title) ? "#014421" : "#E5E7EB", background: form.interests.includes(t.title) ? "rgba(11,30,61,0.08)" : "white", color: form.interests.includes(t.title) ? "#014421" : "#6B7280", fontSize: 12.5, fontWeight: 500, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
                {t.icon} {t.title}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: "#F0FDF4", borderRadius: 14, padding: "22px 22px", marginBottom: 22, border: "1px solid rgba(11,30,61,0.1)" }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#014421", marginBottom: 14 }}>📋 Parent/Guardian Consent & Media Release</h4>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 14, cursor: "pointer" }}>
            <input type="checkbox" checked={form.consentParticipate} onChange={e => u("consentParticipate", e.target.checked)} style={{ marginTop: 3, accentColor: "#014421", width: 17, height: 17, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>
              I am the parent or legal guardian of the student named above, and I give permission for my student to participate in STEMREADY activities presented by the PNC Chapter of The Links, Incorporated. *
            </span>
          </label>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
            <input type="checkbox" checked={form.consentMedia} onChange={e => u("consentMedia", e.target.checked)} style={{ marginTop: 3, accentColor: "#014421", width: 17, height: 17, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.65 }}>
              I consent to my student's name, image, and likeness (photo and/or video) being used by the PNC Chapter of The Links, Incorporated in program materials, social media, and promotional content related to STEMREADY. *
            </span>
          </label>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={LS}>Parent/Guardian Signature (type full name) *</label>
          <input style={IS} value={form.signature} onChange={e => u("signature", e.target.value)} placeholder="Type your full legal name as your signature" />
        </div>

        {error && <p style={{ color: "#B91C1C", fontSize: 13.5, marginBottom: 18 }}>{error}</p>}

        <button onClick={handleSubmit} disabled={submitting} className="btn-primary"
          style={{ width: "100%", padding: "15px 0", borderRadius: 10, fontSize: 15, opacity: submitting ? 0.7 : 1 }}>
          {submitting ? "Submitting…" : "Submit Registration ✓"}
        </button>
      </div>
    </PageShell>
  );
}

/* CALENDAR */
function CalendarPage({ navigate }) {
  const events = [
    { date: "Oct 3, 2026",  title: "Kickoff: Aerospace Day",            type: "In-Person", color: "#3B82F6" },
    { date: "Oct 24, 2026", title: "Chemistry Lab Workshop",             type: "In-Person", color: "#10B981" },
    { date: "Nov 14, 2026", title: "Electricity & EV Showcase",          type: "In-Person", color: "#025C2C" },
    { date: "Dec 5, 2026",  title: "Heart, Circulatory & Brain Health",  type: "In-Person", color: "#EF4444" },
    { date: "Jan 16, 2027", title: "Sound & Speakers Studio Day",        type: "In-Person", color: "#8B5CF6" },
    { date: "Feb 6, 2027",  title: "Water, Hydro & Infrastructure Tour", type: "Field Trip", color: "#0EA5E9" },
    { date: "Feb 27, 2027", title: "Cybersecurity Challenge",            type: "In-Person", color: "#014421" },
    { date: "Mar 20, 2027", title: "Tourism & Hospitality Career Day",   type: "In-Person", color: "#EC4899" },
    { date: "Apr 10, 2027", title: "Manufacturing Plant Tour",           type: "Field Trip", color: "#F59E0B" },
    { date: "Apr 24, 2027", title: "Closing Celebration & Showcase",     type: "In-Person", color: "#10B981" },
  ];
  return (
    <PageShell icon="📅" title="Events Calendar" subtitle="STEMREADY 2026–27 program year: October 1, 2026 – April 30, 2027.">
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {events.map((ev, i) => (
          <div key={i} className="card-lift" style={{ background: "white", borderRadius: 16, padding: "22px 26px", display: "flex", gap: 20, alignItems: "center", border: "1px solid rgba(11,30,61,0.1)" }}>
            <div style={{ background: `${ev.color}18`, border: `2px solid ${ev.color}30`, borderRadius: 12, padding: "10px 16px", textAlign: "center", flexShrink: 0, minWidth: 100 }}>
              <div style={{ fontSize: 12.5, color: ev.color, fontWeight: 700 }}>{ev.date}</div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: 16.5, fontWeight: 700, color: "#014421" }}>{ev.title}</h3>
              <span style={{ fontSize: 11, fontWeight: 600, color: ev.color, background: `${ev.color}18`, padding: "3px 11px", borderRadius: 100 }}>{ev.type}</span>
            </div>
            <button onClick={() => navigate("signup")} style={{ background: "none", border: "1.5px solid rgba(11,30,61,0.25)", color: "#014421", padding: "9px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
              Sign Up →
            </button>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 24 }}>Dates are preliminary and subject to committee confirmation.</p>
    </PageShell>
  );
}

/* GALLERY — photo & video, with graceful fallback like Links Love HBCUs */
function GalleryTile({ p }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showMedia = p.src && !imgFailed;
  return (
    <div className="card-lift" style={{ background: showMedia ? "#F0FDF4" : p.bg, borderRadius: 16, aspectRatio: "4/3", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {showMedia ? (
        p.type === "video" ? (
          <video src={p.src} controls onError={() => setImgFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <img src={p.src} alt={p.title} onError={() => setImgFailed(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        )
      ) : (
        <>
          <div style={{ fontSize: 46, marginBottom: 12 }}>{p.icon}</div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 13.5, fontWeight: 600, textAlign: "center", padding: "0 16px" }}>{p.title}</div>
        </>
      )}
    </div>
  );
}

function GalleryPage({ navigate }) {
  // Drop real photos/videos into /public/images/stemsready-gallery/ and set "src" below
  // e.g. src: "/images/stemsready-gallery/aerospace-day.jpg". Until a file exists there,
  // each tile safely shows its icon placeholder.
  const photos = [
    { title: "Aerospace Kickoff 2026", icon: "🚀", bg: "linear-gradient(135deg,#014421,#025C2C)", type: "image", src: "/images/stemsready-gallery/aerospace-day.jpg" },
    { title: "Chemistry Lab Day",      icon: "🧪", bg: "linear-gradient(135deg,#10B981,#059669)", type: "image", src: "/images/stemsready-gallery/chemistry-lab.jpg" },
    { title: "EV Showcase",            icon: "⚡", bg: "linear-gradient(135deg,#025C2C,#014421)", type: "image", src: "/images/stemsready-gallery/ev-showcase.jpg" },
    { title: "Studio Sound Day",       icon: "🔊", bg: "linear-gradient(135deg,#8B5CF6,#5B21B6)", type: "image", src: "/images/stemsready-gallery/sound-day.jpg" },
    { title: "Cyber Challenge Recap",  icon: "🔐", bg: "linear-gradient(135deg,#014421,#025C2C)", type: "video", src: "/images/stemsready-gallery/cyber-challenge.mp4" },
    { title: "Manufacturing Tour",     icon: "🏭", bg: "linear-gradient(135deg,#F59E0B,#D97706)", type: "image", src: "/images/stemsready-gallery/manufacturing-tour.jpg" },
  ];
  return (
    <PageShell icon="🖼️" title="Photo & Video Gallery" subtitle="Moments from STEMREADY events, tours, and student showcases.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="grid-3">
        {photos.map((p, i) => <GalleryTile key={i} p={p} />)}
      </div>
    </PageShell>
  );
}

/* SPONSORSHIP */
function SponsorshipPage({ navigate }) {
  const tiers = [
    { name: "Community Partner", price: "$250+", perks: ["Logo on website partner strip", "Recognition at one event"] },
    { name: "Innovator Sponsor", price: "$1,000+", perks: ["Logo on website + printed materials", "Recognition at all events", "Social media shoutout"] },
    { name: "Presenting Sponsor", price: "$5,000+", perks: ["Top logo placement site-wide", "Named recognition on event banners", "Speaking opportunity at kickoff", "Feature in year-end impact report"] },
  ];
  // Add real partner logos here once secured — e.g. { name: "Acme Corp", logo: "/images/sponsors/acme.png" }
  const partners = [
    { name: "Your Company Here" }, { name: "Your Company Here" }, { name: "Your Company Here" },
    { name: "Your Company Here" }, { name: "Your Company Here" }, { name: "Your Company Here" },
  ];
  return (
    <PageShell icon="🤝" title="Sponsorship" subtitle="Partner with the PNC Chapter's Services to Youth Committee — your gift supports STEMREADY and our sister initiative, Links Love HBCUs.">
      <div style={{ background: "#F0FDF4", borderRadius: 16, padding: "24px 28px", marginBottom: 40, border: "1px solid rgba(11,30,61,0.1)", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <span style={{ fontSize: 22 }}>💛</span>
        <p style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.7 }}>
          Sponsorship dollars raised here support <strong>both</strong> Services to Youth programs: STEMREADY (grades 1–12 STEM enrichment) and <strong>Links Love HBCUs</strong> (grades 9–12 HBCU access). <span onClick={() => navigate("programs")} style={{ color: "#014421", fontWeight: 600, cursor: "pointer" }}>See both programs →</span>
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22, marginBottom: 60 }} className="grid-3">
        {tiers.map((t, i) => (
          <div key={i} className="card-lift" style={{ background: "white", borderRadius: 18, padding: 30, border: i === 1 ? "2px solid #014421" : "1px solid rgba(11,30,61,0.1)" }}>
            <h3 className="display" style={{ fontSize: 20, color: "#014421", fontWeight: 700, marginBottom: 6 }}>{t.name}</h3>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#014421", marginBottom: 18 }}>{t.price}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {t.perks.map((p, pi) => (
                <div key={pi} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: "#374151" }}>
                  <span style={{ color: "#10B981", flexShrink: 0 }}>✓</span> {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 50 }}>
        <div className="divider" style={{ marginBottom: 20 }} />
        <h2 className="display" style={{ fontSize: 26, color: "#014421", fontWeight: 800, marginBottom: 20 }}>Our Partners</h2>
        <div style={{ background: "white", borderRadius: 16, padding: "30px 0", border: "1px solid rgba(11,30,61,0.1)", overflow: "hidden" }}>
          <div className="marquee-track">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: 180, height: 60, border: "1.5px dashed rgba(11,30,61,0.2)", borderRadius: 10, color: "#9CA3AF", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 14 }}>Placeholder logos shown — replace with confirmed partner logos as sponsorships are secured.</p>
      </div>

      <div style={{ background: "linear-gradient(135deg,#014421,#025C2C)", borderRadius: 20, padding: "44px 44px", color: "white", textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: 30, marginBottom: 14 }}>Interested in Sponsoring?</h2>
        <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: 26, fontSize: 15 }}>Contact the PNC Chapter of The Links, Incorporated to discuss sponsorship opportunities.</p>
        <button className="btn-primary" style={{ padding: "13px 30px", borderRadius: 9, fontSize: 15 }}>Request Sponsorship Info</button>
      </div>
    </PageShell>
  );
}

/* COLLEGES */
function CollegesPage({ navigate }) {
  const [stateFilter, setStateFilter] = useState("All");
  return (
    <PageShell icon="🎓" title="Colleges & Programs" subtitle="North and South Carolina colleges offering programs in STEMREADY topic areas.">
      <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
        {["All", "NC", "SC"].map(s => (
          <button key={s} onClick={() => setStateFilter(s)}
            style={{ padding: "10px 20px", borderRadius: 9, border: "1.5px solid", borderColor: stateFilter === s ? "#014421" : "rgba(11,30,61,0.2)", background: stateFilter === s ? "#014421" : "white", color: stateFilter === s ? "white" : "#6B7280", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter',sans-serif" }}>
            {s === "All" ? "All States" : s}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 22 }} className="grid-2">
        {COLLEGE_DIRECTORY.map((group, gi) => {
          const schools = group.schools.filter(s => stateFilter === "All" || s.state === stateFilter);
          if (schools.length === 0) return null;
          return (
            <div key={gi} style={{ background: "white", borderRadius: 16, padding: "26px 28px", border: "1px solid rgba(11,30,61,0.1)" }}>
              <h3 className="display" style={{ fontSize: 17, color: "#014421", fontWeight: 700, marginBottom: 14 }}>{group.topic}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {schools.map((s, si) => (
                  <a key={si} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 13.5, color: "#374151", textDecoration: "none", lineHeight: 1.55, display: "flex", justifyContent: "space-between", gap: 10 }}
                    onMouseEnter={e => e.currentTarget.style.color = "#014421"}
                    onMouseLeave={e => e.currentTarget.style.color = "#374151"}>
                    <span>{s.name} →</span>
                    <span style={{ fontSize: 11, color: "#9CA3AF", flexShrink: 0, fontWeight: 700 }}>{s.state}</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 32, lineHeight: 1.7, maxWidth: 700 }}>
        This is a starting list based on well-established programs at NC and SC institutions. Program names, availability, and accreditation can change — verify current details directly with each school before including in printed materials.
      </p>
    </PageShell>
  );
}
