import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/20 relative overflow-hidden" role="contentinfo">
      <div className="absolute top-0 inset-x-0 h-px" aria-hidden="true"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(94,234,212,0.3) 40%, rgba(245,185,66,0.2) 60%, transparent 100%)" }} />
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <span className="font-mono text-xs text-muted-2">
            &copy; 2026{" "}<span className="text-muted">Priyansu</span>{" "}&mdash;{" "}
            built with{" "}<span className="text-cyan/70">React</span>,{" "}
            <span className="text-cyan/70">Vite</span>{" "}&amp;{" "}
            <span className="text-cyan/70">Tailwind</span>
          </span>
        </div>
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
          <a href="https://github.com/priyaanssuu2003" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-md text-muted-2 hover:text-cyan hover:bg-cyan/5 transition-all duration-200"
            aria-label="GitHub profile">
            <Github size={16} aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/priyansu-choudhury/" target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-md text-muted-2 hover:text-cyan hover:bg-cyan/5 transition-all duration-200"
            aria-label="LinkedIn profile">
            <Linkedin size={16} aria-hidden="true" />
          </a>
          <a href="mailto:choudhurypriyansu@gmail.com"
            className="p-2 rounded-md text-muted-2 hover:text-cyan hover:bg-cyan/5 transition-all duration-200"
            aria-label="Send email">
            <Mail size={16} aria-hidden="true" />
          </a>
          <div className="w-px h-4 bg-border" aria-hidden="true" />
          <span className="font-mono text-muted-2 tracking-widest" style={{ fontSize: "10px" }}>priyansu.dev</span>
        </motion.div>
      </div>
    </footer>
  );
}