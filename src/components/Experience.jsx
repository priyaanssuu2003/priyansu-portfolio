import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";

const TIMELINE = [
  {
    type: "work", icon: Briefcase, accent: "cyan",
    title: "Data Analyst Intern",
    org: "Digisnare Technologies", orgLink: "#",
    period: "April 2025 - May 2025", location: "Bengaluru, Karnataka",
    points: [
      "Designed and maintained ETL pipelines to clean and transform raw business data for downstream analysis.",
      "Built interactive Power BI dashboards adopted by the operations team for weekly reporting.",
      "Wrote optimized SQL queries to answer ad-hoc business questions across multi-table relational schemas.",
      "Collaborated with cross-functional stakeholders to translate vague requirements into structured data specs.",
    ],
    tags: ["SQL", "Power BI", "Python", "ETL", "Data Analysis"],
  },
  {
    type: "education", icon: GraduationCap, accent: "amber",
    title: "B.Sc. Computer Science & Mathematics",
    org: "CHRIST (Deemed to be University)", orgLink: "https://christuniversity.in",
    period: "June 2024 - April 2027", location: "Bengaluru, Karnataka",
    points: [
      "Dual specialization combining theoretical computer science with rigorous mathematical foundations.",
      "Relevant coursework: Probability & Statistics, Linear Algebra, Database Systems, Machine Learning, Data Structures & Algorithms.",
      "Developed capstone projects applying ML algorithms to real-world datasets.",
    ],
    tags: ["Statistics", "Machine Learning", "Algorithms", "Databases"],
  },
];

function TimelineItem({ item, index }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });
  const Icon = item.icon;
  const isCyan = item.accent === "cyan";

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative">
      <div className="bg-surface border border-border rounded-2xl p-6 hover:border-cyan/20 transition-colors duration-300 relative overflow-hidden group">
        <div className="absolute top-0 inset-x-0 h-px" aria-hidden="true"
          style={{ background: isCyan
            ? "linear-gradient(90deg, transparent, #5eead4, transparent)"
            : "linear-gradient(90deg, transparent, #f5b942, transparent)" }} />

        <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg text-xs font-mono ${
          isCyan ? "bg-cyan/10 text-cyan border border-cyan/20" : "bg-amber/10 text-amber border border-amber/20"}`}>
          <Icon size={12} aria-hidden="true" />
          {item.type === "work" ? "Work Experience" : "Education"}
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-grotesk text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <a href={item.orgLink} className={`text-sm font-medium hover:underline ${isCyan ? "text-cyan" : "text-amber"}`}
                target="_blank" rel="noopener noreferrer">
                {item.org}
              </a>
              <ExternalLink size={12} className="text-muted-2" aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-2">
              <Calendar size={12} aria-hidden="true" />{item.period}
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-2">
              <MapPin size={12} aria-hidden="true" />{item.location}
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-5" role="list">
          {item.points.map((point, pi) => (
            <li key={pi} className="flex gap-3 text-sm text-muted leading-relaxed">
              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${isCyan ? "bg-cyan" : "bg-amber"}`} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span key={tag} className={`px-2.5 py-1 font-mono rounded-md border ${
              isCyan ? "border-cyan/20 bg-cyan/5 text-cyan/80" : "border-amber/20 bg-amber/5 text-amber/80"}`}
              style={{ fontSize: "10px" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="experience" ref={ref} className="py-28 bg-surface/30 relative overflow-hidden" aria-labelledby="experience-heading">
      <div className="absolute inset-0 grid-bg-full opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <span className="font-mono text-xs text-cyan/70 tracking-widest uppercase mb-3 block">04 — Experience</span>
          <h2 id="experience-heading" className="font-grotesk text-4xl lg:text-5xl font-bold text-slate-100">
            Where I&apos;ve<br /><span className="text-gradient-amber">worked and learned.</span>
          </h2>
        </motion.div>
        <div className="flex flex-col gap-6">
          {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}