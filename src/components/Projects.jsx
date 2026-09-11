import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, BarChart2, Brain, Route, ShoppingBag, Mic } from "lucide-react";

const PROJECTS = [
  {
    id: "sentiment-studio", title: "Sentiment Analysis & Client Feedback Analytics", accent: "cyan", icon: Brain,
    tagline: "Decode the emotional pulse of any text corpus at scale.",
    description: "Developed an NLP application using Scikit-learn to parse and classify 50,000+ customer feedback records into sentiment categories with 89% accuracy. Built an interactive Streamlit application to visualize real-time feedback drivers, enabling operations teams to respond quickly to service degradation risks.",
    tags: ["NLP", "Streamlit", "Plotly", "Python", "Scikit-learn"],
    link: "https://sentiment-analysis-cbpmuzj85m4jvlp8ypwpo7.streamlit.app/",
  },
  {
    id: "loanscope", title: "LoanScope Financial Analytics & Verification Web Platform", accent: "amber", icon: BarChart2,
    tagline: "Bank loan analytics — from raw ledgers to risk dashboards.",
    description: "Designed a normalized SQL database schema to manage loan, credit, and customer portfolio data, accelerating query performance speed by 30%. Automated financial data verification and compliance rules for structured and unstructured customer documentation, reducing data ingestion errors by 25%. Built automated risk-assessment algorithms to monitor credit quality metrics and track portfolio financial health for early risk intervention.",
    tags: ["SQL", "Python", "Data Modeling", "Pandas", "Analytics"],
    link: "https://bank-loan-analytics.vercel.app/",
  },
  {
    id: "voice-translation", title: "Indian Voice Translation", accent: "cyan", icon: Mic,
    tagline: "Seamless voice-to-voice translation across Indian languages.",
    description: "A voice translation model bridging language barriers with real-time audio processing and translation for regional Indian languages.",
    tags: ["Python", "Machine Learning", "NLP", "Audio Processing"],
    link: "https://indian-voice-translator.vercel.app/",
  },
  {
    id: "pathfinder", title: "PathFinder", accent: "amber", icon: Route,
    tagline: "Dijkstra's algorithm, brought to visual life.",
    description: "An interactive graph visualizer that animates shortest-path computation in real time. Users can add nodes, draw weighted edges, pick source/target, and watch the algorithm traverse the graph step by step.",
    tags: ["Python", "Algorithms", "Visualization", "Graph Theory"],
    link: "https://dijkstra-algorithm-visualizer-tan.vercel.app/",
  },
  {
    id: "sales-analytics", title: "Superstore Operational & Commercial Analytics", accent: "cyan", icon: ShoppingBag,
    tagline: "BI dashboards that turn sales chaos into clarity.",
    description: "Processed and modeled 25,000+ commercial transactional records using Power Query to establish a centralized relational star-schema data structure. Formulated 15+ complex DAX measures to calculate regional profitability, monthly growth trends, and inventory turnover efficiency metrics. Built automated executive reporting dashboards that streamlined regional review cycles across 4 enterprise business divisions.",
    tags: ["Power BI", "Power Query", "DAX", "BI"],
    link: "https://github.com/priyaanssuu2003/superstore-analysis-powerbi",
  },
];

const TAG_COLORS = {
  NLP: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  Streamlit: "bg-red-400/10 text-red-300 border-red-400/20",
  Plotly: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  Python: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
  "Scikit-learn": "bg-orange-400/10 text-orange-300 border-orange-400/20",
  SQL: "bg-cyan/10 text-cyan border-cyan/20",
  "Power BI": "bg-amber/10 text-amber border-amber/20",
  Pandas: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Analytics: "bg-slate-400/10 text-slate-300 border-slate-400/20",
  Algorithms: "bg-green-400/10 text-green-300 border-green-400/20",
  Visualization: "bg-indigo-400/10 text-indigo-300 border-indigo-400/20",
  "Graph Theory": "bg-pink-400/10 text-pink-300 border-pink-400/20",
  Tableau: "bg-blue-600/10 text-blue-300 border-blue-600/20",
  Excel: "bg-green-500/10 text-green-300 border-green-500/20",
  DAX: "bg-amber/10 text-amber border-amber/20",
  BI: "bg-violet-400/10 text-violet-300 border-violet-400/20",
  "Machine Learning": "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "Audio Processing": "bg-teal-500/10 text-teal-300 border-teal-500/20",
};

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const Icon = project.icon;
  const isCyan = project.accent === "cyan";

  return (
    <motion.article ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="card-hover w-full group bg-surface border border-border rounded-2xl overflow-hidden relative flex flex-col">
      <div className="h-px w-full" aria-hidden="true"
        style={{ background: isCyan
          ? "linear-gradient(90deg, transparent, #5eead4 40%, #a5f3fc 60%, transparent)"
          : "linear-gradient(90deg, transparent, #f5b942 40%, #fde68a 60%, transparent)" }} />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
            isCyan ? "bg-cyan/10 text-cyan" : "bg-amber/10 text-amber"}`}>
            <Icon size={18} aria-hidden="true" />
          </div>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            className="text-muted-2 hover:text-cyan transition-colors duration-200 p-1 rounded-md hover:bg-surface-2"
            aria-label={`Open ${project.title}`}>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <h3 className="font-grotesk text-xl font-bold text-slate-100 mb-1.5 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className={`font-mono text-xs mb-3 leading-relaxed ${isCyan ? "text-cyan/70" : "text-amber/70"}`}>
          {project.tagline}
        </p>
        <p className="text-muted text-sm leading-relaxed flex-1 mb-6">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className={`px-2 py-0.5 font-mono rounded border ${
              TAG_COLORS[tag] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}
              style={{ fontSize: "10px" }}>
              {tag}
            </span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 w-full justify-center py-2.5 text-sm font-semibold rounded-lg border transition-all duration-200 ${
            isCyan
              ? "border-cyan/30 text-cyan hover:bg-cyan hover:text-bg hover:border-cyan hover:shadow-lg hover:shadow-cyan/20"
              : "border-amber/30 text-amber hover:bg-amber hover:text-bg hover:border-amber hover:shadow-lg hover:shadow-amber/20"
          }`}
          aria-label={`View ${project.title} project`}>
          View Project <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" ref={ref} className="py-28 relative overflow-hidden" aria-labelledby="projects-heading">
      <div className="absolute inset-0 grid-bg-full opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mb-16">
          <span className="font-mono text-xs text-cyan/70 tracking-widest uppercase mb-3 block">03 — Projects</span>
          <h2 id="projects-heading" className="font-grotesk text-4xl lg:text-5xl font-bold text-slate-100">
            Things I&apos;ve<br /><span className="text-gradient-cyan">built and shipped.</span>
          </h2>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-6">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="w-full md:w-[calc(50%-12px)] flex">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}