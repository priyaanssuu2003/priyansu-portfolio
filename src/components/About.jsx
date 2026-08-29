import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, GraduationCap, Briefcase, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const infoItems = [
  { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka", accent: "cyan" },
  { icon: GraduationCap, label: "Education", value: "B.Sc. CS & Mathematics\nCHRIST (Deemed to be University)", accent: "amber" },
  { icon: Briefcase, label: "Experience", value: "Data Analyst Intern\nDigisnare Technologies", accent: "cyan" },
  { icon: Sparkles, label: "Status", value: "Open to opportunities", accent: "amber" },
];

const TAGS = ["SQL","Python","Power BI","Tableau","Streamlit","Scikit-learn","NumPy","Pandas","Git"];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-28 relative overflow-hidden" aria-labelledby="about-heading">
      <div className="absolute inset-0 grid-bg-full opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-16">
          <span className="font-mono text-xs text-cyan/70 tracking-widest uppercase mb-3 block">01 — About</span>
          <h2 id="about-heading" className="font-grotesk text-4xl lg:text-5xl font-bold text-slate-100">
            The analyst<br /><span className="text-gradient-amber">behind the data.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
          <div className="space-y-6">
            {[
              <>I&apos;m a Computer Science and Mathematics student at{" "}
                <span className="text-slate-200 font-medium">CHRIST (Deemed to be University), Bengaluru</span>,
                where I&apos;ve developed a rigorous foundation in both the mathematical theory and practical
                engineering that underpins modern data work.</>,
              <>During my internship at{" "}
                <span className="text-slate-200 font-medium">Digisnare Technologies</span>, I worked on
                real-world data pipelines and visualization dashboards, sharpening my ability to translate
                ambiguous business questions into structured analyses that stakeholders can act on.</>,
              <>My work sits at the crossroads of{" "}
                <span className="text-cyan font-medium">data analysis</span>,{" "}
                <span className="text-cyan font-medium">visualization</span>, and{" "}
                <span className="text-cyan font-medium">machine learning</span>. I care deeply about
                communicating complexity clearly &mdash; because a model no one can interpret is a model
                that changes nothing.</>
            ].map((text, i) => (
              <motion.p key={i} custom={i + 1} variants={fadeUp} initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="text-muted text-lg leading-relaxed">
                {text}
              </motion.p>
            ))}

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
              className="pt-2 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span key={tag}
                  className="px-3 py-1 font-mono text-xs text-cyan/80 border border-cyan/20 bg-cyan/5 rounded-md hover:border-cyan/40 hover:text-cyan transition-colors duration-200">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
            className="bg-surface border border-border rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #5eead4, transparent)" }}
              aria-hidden="true" />
            <div className="text-xs font-mono text-muted-2 tracking-widest uppercase mb-5 pt-1">Quick info</div>
            <div className="space-y-4">
              {infoItems.map(({ icon: Icon, label, value, accent }, i) => (
                <motion.div key={label} custom={i + 3} variants={fadeUp} initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="flex gap-4 items-start p-3 rounded-xl hover:bg-surface-2 transition-colors duration-200 group">
                  <div className={`mt-0.5 p-2 rounded-lg group-hover:scale-110 transition-transform duration-200 ${
                    accent === "cyan" ? "bg-cyan/10 text-cyan" : "bg-amber/10 text-amber"}`}>
                    <Icon size={14} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-muted-2 uppercase tracking-widest mb-0.5 font-mono" style={{ fontSize: "10px" }}>{label}</div>
                    <div className="text-sm text-slate-300 leading-snug whitespace-pre-line">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="pt-4 mt-4 border-t border-border">
              <div className="font-mono text-muted-2 flex items-center gap-2" style={{ fontSize: "10px" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" aria-hidden="true" />
                Open to Data Analyst &middot; BI Analyst &middot; Analytics Associate roles
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}