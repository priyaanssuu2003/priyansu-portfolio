import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SKILL_GROUPS = [
  {
    category: "Data & Databases", color: "cyan",
    skills: [
      { name: "SQL", level: 90, label: "PostgreSQL | MySQL | BigQuery" },
      { name: "Excel / Google Sheets", level: 85, label: "Pivot Tables | Power Query | Advanced Formulas" },
    ],
  },
  {
    category: "Programming & ML", color: "amber",
    skills: [
      { name: "Python", level: 88, label: "Pandas | NumPy | Scikit-learn" },
      { name: "Matplotlib / Plotly / Streamlit", level: 82, label: "Data Visualization | Web Apps" },
    ],
  },
  {
    category: "Business Intelligence", color: "cyan",
    skills: [
      { name: "Power BI / Tableau", level: 80, label: "DAX | Data Modeling | Dashboard Design" },
    ],
  },

];

function SkillBar({ name, level, label, color, delay, animate: shouldAnimate }) {
  const shouldReduceMotion = useReducedMotion();
  const isCyan = color === "cyan";
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{name}</span>
          <div className="font-mono text-muted-2 mt-0.5" style={{ fontSize: "11px" }}>{label}</div>
        </div>
        <motion.span className={`font-mono text-sm font-semibold tabular-nums ${isCyan ? "text-cyan" : "text-amber"}`}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.3 }}>
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full"
          style={{
            background: isCyan ? "linear-gradient(90deg, #5eead4, #a5f3fc)" : "linear-gradient(90deg, #f5b942, #fde68a)",
            boxShadow: isCyan ? "0 0 12px rgba(94,234,212,0.5)" : "0 0 12px rgba(245,185,66,0.5)",
          }}
          initial={{ width: "0%" }}
          animate={shouldAnimate ? { width: level + "%" } : { width: "0%" }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="skills" ref={ref} className="py-28 bg-surface/40 relative overflow-hidden" aria-labelledby="skills-heading">
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(94,234,212,0.04) 0%, transparent 70%)" }}
        aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-16">
          <span className="font-mono text-xs text-cyan/70 tracking-widest uppercase mb-3 block">02 — Skills</span>
          <h2 id="skills-heading" className="font-grotesk text-4xl lg:text-5xl font-bold text-slate-100">
            Tools I think<br /><span className="text-gradient-cyan">in and with.</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div key={group.category} custom={gi + 1} variants={fadeUp} initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(50%-20px)] bg-surface border border-border rounded-2xl p-6 relative overflow-hidden hover:border-cyan/30 transition-colors duration-300">
              <div className="absolute top-0 inset-x-0 h-px" aria-hidden="true"
                style={{ background: group.color === "cyan"
                  ? "linear-gradient(90deg, transparent, #5eead4, transparent)"
                  : "linear-gradient(90deg, transparent, #f5b942, transparent)" }} />
              <div className={`font-mono tracking-widest uppercase mb-6 ${group.color === "cyan" ? "text-cyan/60" : "text-amber/60"}`}
                style={{ fontSize: "10px" }}>
                {group.category}
              </div>
              <div className="space-y-7">
                {group.skills.map((skill, si) => (
                  <SkillBar key={skill.name} {...skill} color={group.color}
                    delay={si * 0.15 + gi * 0.1 + 0.2} animate={inView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p custom={5} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="mt-12 text-center text-muted-2 text-sm font-mono">
          + always learning &middot; currently exploring{" "}
          <span className="text-cyan/70">dbt</span> &amp;{" "}
          <span className="text-amber/70">LangChain</span>
        </motion.p>
      </div>
    </section>
  );
}