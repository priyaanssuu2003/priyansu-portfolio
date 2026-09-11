import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";

const LINKS = [
  { icon: Mail, label: "Email Me", sub: "choudhurypriyansu@gmail.com", href: "mailto:choudhurypriyansu@gmail.com", accent: "cyan", external: false },
  { icon: Linkedin, label: "LinkedIn", sub: "linkedin.com/in/priyansu-choudhury", href: "https://www.linkedin.com/in/priyansu-choudhury/", accent: "cyan", external: true },
  { icon: Github, label: "GitHub", sub: "github.com/priyaanssuu2003", href: "https://github.com/priyaanssuu2003", accent: "amber", external: true },
  { icon: FileText, label: "Download Resume", sub: "PDF | Latest version", href: "/PriyansuChoudhury_DA.pdf", accent: "amber", external: true },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};

function ContactCard({ link, index }) {
  const Icon = link.icon;
  const isCyan = link.accent === "cyan";
  return (
    <motion.a custom={index} variants={fadeUp} initial="hidden" whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      href={link.href} target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="card-hover group flex items-center gap-5 p-5 bg-surface border border-border rounded-2xl hover:border-cyan/25 relative overflow-hidden"
      aria-label={`${link.label} ? ${link.sub}`}>
      <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true"
        style={{ background: isCyan
          ? "linear-gradient(90deg, transparent, #5eead4, transparent)"
          : "linear-gradient(90deg, transparent, #f5b942, transparent)" }} />
      <div className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
        isCyan ? "bg-cyan/10 text-cyan" : "bg-amber/10 text-amber"}`}>
        <Icon size={22} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">{link.label}</div>
        <div className="font-mono text-muted-2 truncate mt-0.5" style={{ fontSize: "12px" }}>{link.sub}</div>
      </div>
      <ArrowUpRight size={16}
        className={`flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
          isCyan ? "text-cyan/40 group-hover:text-cyan" : "text-amber/40 group-hover:text-amber"}`}
        aria-hidden="true" />
    </motion.a>
  );
}

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="contact" ref={ref} className="py-28 relative overflow-hidden" aria-labelledby="contact-heading">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-600px h-64 pointer-events-none"
        style={{ width: "600px", background: "radial-gradient(ellipse, rgba(94,234,212,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-6">
          <span className="font-mono text-xs text-cyan/70 tracking-widest uppercase mb-3 block">05 — Contact</span>
          <h2 id="contact-heading" className="font-grotesk font-bold text-slate-100" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.05 }}>
            Let&apos;s talk<br /><span className="text-gradient-cyan">data.</span>
          </h2>
        </motion.div>
        <motion.p custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-muted text-lg max-w-xl leading-relaxed mb-14">
          Open to{" "}<span className="text-slate-200">Data Analyst</span>,{" "}
          <span className="text-slate-200">BI Analyst</span>, and{" "}
          <span className="text-slate-200">Analytics Associate</span>{" "}
          roles in Bengaluru and remote. If you have a problem that data can solve, let&apos;s talk.
        </motion.p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          {LINKS.map((link, i) => <ContactCard key={link.label} link={link} index={i + 2} />)}
        </div>
        <motion.p custom={7} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="mt-12 font-mono text-xs text-muted-2">
          Avg. response time: <span className="text-cyan/70">&lt; 24 hours</span>{" "}
          &middot; Timezone: <span className="text-amber/70">IST (UTC+5:30)</span>
        </motion.p>
      </div>
    </section>
  );
}