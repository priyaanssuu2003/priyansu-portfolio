import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

// ??? PROFILE PHOTO ??????????????????????????????????????????????????????????
// Place profile photo at: src/assets/profile.png
import profilePhoto from "../assets/profile.png";
// ????????????????????????????????????????????????????????????????????????????

const SQL_QUERY = `SELECT skill, proficiency
FROM analyst_skills
WHERE analyst = 'priyansu'
ORDER BY proficiency DESC;`;

const SKILLS_RESULT = [
  { skill: "SQL", proficiency: 90, color: "#5eead4" },
  { skill: "Python", proficiency: 88, color: "#5eead4" },
  { skill: "Excel", proficiency: 85, color: "#f5b942" },
  { skill: "Power BI", proficiency: 80, color: "#5eead4" },
  ];

const KW = ["SELECT", "FROM", "WHERE", "ORDER BY", "DESC", "AND", "OR", "LIMIT"];

function renderLine(line) {
  const strParts = line.split(/('[^']*')/g);
  return strParts.map((part, i) => {
    if (part.startsWith("'") && part.endsWith("'")) {
      return <span key={i} style={{ color: "#f5b942cc" }}>{part}</span>;
    }
    const wParts = part.split(/(SELECT|FROM|WHERE|ORDER BY|DESC|AND|OR|LIMIT)/g);
    return wParts.map((wp, j) =>
      KW.includes(wp.trim()) ? (
        <span key={i + "-" + j} style={{ color: "#5eead4", fontWeight: 600 }}>{wp}</span>
      ) : (
        <span key={i + "-" + j} style={{ color: "#cbd5e1" }}>{wp}</span>
      )
    );
  });
}

function SQLTerminal() {
  const shouldReduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultRows, setResultRows] = useState([]);
  const [barWidths, setBarWidths] = useState({});
  const [phase, setPhase] = useState("typing");
  const iRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayed(SQL_QUERY);
      setShowResult(true);
      setResultRows(SKILLS_RESULT);
      const w = {};
      SKILLS_RESULT.forEach((r) => { w[r.skill] = r.proficiency; });
      setBarWidths(w);
      return;
    }
    let i = 0;
    iRef.current = setInterval(() => {
      i++;
      setDisplayed(SQL_QUERY.slice(0, i));
      if (i >= SQL_QUERY.length) {
        clearInterval(iRef.current);
        setPhase("executing");
        setTimeout(() => {
          setPhase("results");
          setShowResult(true);
          SKILLS_RESULT.forEach((row, idx) => {
            setTimeout(() => {
              setResultRows((prev) => [...prev, row]);
              setTimeout(() => setBarWidths((prev) => ({ ...prev, [row.skill]: row.proficiency })), 100);
            }, idx * 160);
          });
        }, 700);
      }
    }, 28);
    return () => clearInterval(iRef.current);
  }, [shouldReduceMotion]);

  return (
    <div className="w-full font-mono text-xs rounded-xl overflow-hidden border border-border bg-surface"
      role="region" aria-label="SQL terminal showing skill proficiencies">
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-2 border-b border-border">
        <span className="w-3 h-3 rounded-full" style={{ background: "rgba(239,68,68,0.7)" }} aria-hidden="true" />
        <span className="w-3 h-3 rounded-full" style={{ background: "rgba(245,185,66,0.7)" }} aria-hidden="true" />
        <span className="w-3 h-3 rounded-full" style={{ background: "rgba(94,234,212,0.7)" }} aria-hidden="true" />
        <span className="ml-3 text-muted-2 tracking-widest uppercase" style={{ fontSize: "10px" }}>analyst_skills.sql</span>
      </div>

      <div className="p-5">
        <div className="mb-2" style={{ fontSize: "10px", color: "#5a6478" }}>
          <span style={{ color: "rgba(94,234,212,0.6)" }}>&rsaquo;</span>{" "}
          <span style={{ color: "rgba(245,185,66,0.6)" }}>~</span>{" "}
          <span>psql priyansu_db</span>
        </div>

        <pre className="leading-relaxed whitespace-pre-wrap break-all" style={{ color: "#cbd5e1" }}>
          {displayed.split("\n").map((line, i) => (
            <div key={i}>
              <span style={{ color: "rgba(94,234,212,0.3)", userSelect: "none", marginRight: "8px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {renderLine(line)}
            </div>
          ))}
          {phase === "typing" && <span className="terminal-cursor" aria-hidden="true" />}
        </pre>

        {phase === "executing" && (
          <div className="mt-3 animate-pulse" style={{ color: "rgba(245,185,66,0.8)", fontSize: "11px", letterSpacing: "0.05em" }}>
            Executing query...
          </div>
        )}

        {showResult && (
          <div className="mt-4 border-t border-border pt-4">
            <div className="mb-3 tracking-wider" style={{ fontSize: "10px", color: "#5a6478" }}>
              {resultRows.length} row{resultRows.length !== 1 ? "s" : ""} returned
            </div>
            <div className="grid mb-2 pb-2 border-b border-border uppercase tracking-widest"
              style={{ gridTemplateColumns: "100px 1fr", gap: "12px", fontSize: "10px", color: "#5a6478" }}>
              <span>skill</span><span>proficiency</span>
            </div>
            <div className="space-y-2.5">
              {resultRows.map((row) => (
                <div key={row.skill} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "12px", alignItems: "center" }}>
                  <span style={{ color: "rgba(245,185,66,0.9)", fontSize: "11px", fontWeight: 500 }}>{row.skill}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ flex: 1, height: "6px", background: "#161c28", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: "9999px",
                        width: (barWidths[row.skill] || 0) + "%",
                        background: row.color,
                        boxShadow: "0 0 8px " + row.color + "60",
                        transition: "width 0.7s cubic-bezier(0.22,1,0.36,1)"
                      }} />
                    </div>
                    <span style={{ fontSize: "10px", width: "32px", textAlign: "right", color: row.color }}>
                      {row.proficiency}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {phase === "results" && resultRows.length === SKILLS_RESULT.length && (
              <div className="mt-4 flex items-center gap-2" style={{ color: "rgba(94,234,212,0.5)", fontSize: "10px" }}>
                <span className="terminal-cursor" aria-hidden="true" style={{ width: "6px", height: "0.9em" }} />
                <span>Query complete &mdash; 0.032ms</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } };
const item = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden" aria-label="Hero">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(94,234,212,0.07) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(245,185,66,0.05) 0%, transparent 70%)", filter: "blur(40px)" }}
        aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          <motion.div variants={container} initial={shouldReduceMotion ? "visible" : "hidden"} animate="visible">
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan/20 bg-cyan/5 font-mono text-xs text-cyan tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" aria-hidden="true" />
                Available for work &middot; Bengaluru &amp; Remote
              </span>
            </motion.div>

            <motion.h1 variants={item}
              className="font-grotesk text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
              Turning<br />
              <span className="text-gradient-cyan">raw data</span><br />
              into decisions.
            </motion.h1>

            <motion.p variants={item} className="text-muted text-lg leading-relaxed max-w-md mb-3">
              I&apos;m <span className="text-slate-200 font-medium">Priyansu Choudhury</span> &mdash; a data analyst who lives
              at the intersection of statistics, storytelling, and code. I build dashboards that spark decisions,
              models that surface patterns, and pipelines that make the messy, clean.
            </motion.p>

            <motion.p variants={item} className="text-muted-2 text-sm font-mono mb-10">
              B.Sc. CS &amp; Math &middot; CHRIST University, Bengaluru
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-bg font-semibold text-sm rounded-lg hover:bg-cyan/90 transition-all duration-200 hover:shadow-lg hover:shadow-cyan/25 hover:-translate-y-0.5">
                View Projects <ChevronRight size={16} aria-hidden="true" />
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-surface/60 text-slate-200 font-semibold text-sm rounded-lg hover:border-cyan/40 hover:text-cyan hover:bg-cyan/5 transition-all duration-200 hover:-translate-y-0.5">
                Get In Touch
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-16 flex items-center gap-3 text-muted-2 text-xs font-mono">
              <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
              <span>scroll to explore</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative">
              <div className="profile-ring absolute -inset-0.5 rounded-full" aria-hidden="true" />
              <div className="absolute -inset-4 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(94,234,212,0.12) 0%, transparent 70%)", animation: "pulseGlow 3s ease-in-out infinite" }}
                aria-hidden="true" />
              <div className="relative w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-bg z-10">
                <img src={profilePhoto} alt="Priyansu Choudhury ? Data Analyst"
                  className="w-full h-full object-cover object-top" loading="eager" />
              </div>
              
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md">
              <SQLTerminal />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}