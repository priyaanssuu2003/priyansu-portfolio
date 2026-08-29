import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: "-30% 0px -65% 0px" }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-border/60 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Main navigation">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="font-mono text-sm font-semibold tracking-widest group" aria-label="Priyansu home">
          <span className="text-muted group-hover:text-cyan transition-colors duration-300">priyansu</span>
          <span className="text-cyan">.dev</span>
        </a>

        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <li key={href}>
                <a href={href} onClick={(e) => go(e, href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${
                    isActive ? "text-cyan" : "text-muted hover:text-slate-200"
                  }`}
                  aria-current={isActive ? "page" : undefined}>
                  {isActive && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 bg-cyan/8 rounded-md border border-cyan/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </a>
              </li>
            );
          })}
          
        </ul>

        <button onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-muted hover:text-cyan transition-colors rounded-md"
          aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-xl border-b border-border">
            <ul className="flex flex-col px-6 py-4 gap-1" role="list">
              {navLinks.map(({ label, href }, i) => (
                <motion.li key={href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <a href={href} onClick={(e) => go(e, href)}
                    className="block px-3 py-2.5 text-sm font-medium text-muted hover:text-cyan transition-colors rounded-md hover:bg-cyan/5">
                    {label}
                  </a>
                </motion.li>
              ))}
              
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}