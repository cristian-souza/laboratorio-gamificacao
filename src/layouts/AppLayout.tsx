import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Settings, Bell, User, BarChart2, Zap, Shield, Terminal as TerminalIcon, Globe, Menu, X } from 'lucide-react';
import { DataScrubber } from '../components/DataScrubber';
import { SystemStatus } from '../components/SystemStatus';
import { Terminal } from '../components/Terminal';

export default function AppLayout() {
  const location = useLocation();
  const path = location.pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const getScrubberCurrent = () => {
    if (path === '/') return 1;
    if (path === '/projetos') return 2;
    if (path === '/sobre') return 3;
    if (path === '/contato') return 4;
    return 1;
  };

  const navLinks = [
    { to: "/", label: "GERAL XP", icon: BarChart2 },
    { to: "/projetos", label: "PROJETOS", icon: Zap },
    { to: "/sobre", label: "HABILIDADES", icon: Shield },
    { to: "/contato", label: "LOGS", icon: TerminalIcon },
  ];

  return (
      <div className="flex h-screen w-full bg-[#0b0e14] overflow-hidden text-on-surface font-body">
          {/* SIDEBAR - DESKTOP */}
          <aside className="hidden md:flex flex-col w-[260px] bg-surface-low border-r-[0.5px] border-outline-variant/30 flex-shrink-0">
              <div className="p-6 border-b-[0.5px] border-outline-variant/30">
                  <h2 className="font-display text-primary font-bold text-lg tracking-[0.1rem]">
                      LAB_DE_DADOS_V1.0
                  </h2>
              </div>

              <div className="p-4 border-b-[0.5px] border-outline-variant/30">
                  <SystemStatus />
              </div>

              <nav className="flex flex-col mt-4 gap-1">
                  {navLinks.map((link) => (
                      <Link
                          key={link.to}
                          to={link.to}
                          className={`flex items-center gap-3 px-6 py-3 transition-colors ${path === link.to ? "bg-primary/10 border-l-2 border-primary text-primary" : "text-on-surface-variant hover:bg-primary/5 hover:text-primary"} `}
                      >
                          <link.icon size={16} />
                          <span className="font-display text-xs tracking-[0.1rem] mt-1">
                              {link.label}
                          </span>
                      </Link>
                  ))}
              </nav>

              <div className="mt-auto p-6 flex flex-col gap-3">
                  <button
                      onClick={() => window.location.reload()}
                      className="border-[0.5px] border-primary/30 text-primary font-display text-xs tracking-[0.1rem] py-3 hover:bg-primary/10 transition-colors"
                  >
                      SINCRONIZAR_DADOS
                  </button>
                  <div className="flex flex-col gap-2 mt-2">
                      <button 
                        onClick={() => setIsTerminalOpen(true)}
                        className="flex items-center gap-2 text-on-surface-variant/50 text-[0.65rem] font-display tracking-[0.1rem] uppercase hover:text-primary transition-colors cursor-pointer"
                      >
                          <TerminalIcon size={10} /> TERMINAL
                      </button>
                      <Link
                        to="/sobre#timeline"
                        className="flex items-center gap-2 text-on-surface-variant/50 text-[0.65rem] font-display tracking-[0.1rem] uppercase hover:text-primary transition-colors cursor-pointer"
                      >
                          <Globe size={10} /> LINHA_TEMPO
                      </Link>                  </div>
              </div>
          </aside>

          {/* MOBILE MENU OVERLAY */}
          {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 bg-[#0b0e14] flex flex-col p-8 md:hidden">
                  <div className="flex justify-between items-center mb-12">
                      <h2 className="font-display text-primary font-bold text-lg tracking-[0.1rem]">
                          MENU_LAB
                      </h2>
                      <button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-primary p-2 border border-primary/20"
                      >
                          <X size={24} />
                      </button>
                  </div>
                  <nav className="flex flex-col gap-6">
                      {navLinks.map((link) => (
                          <Link
                              key={link.to}
                              to={link.to}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`flex items-center gap-4 text-2xl font-display tracking-[0.2rem] ${path === link.to ? "text-primary" : "text-on-surface-variant"}`}
                          >
                              <link.icon size={24} />
                              {link.label}
                          </Link>
                      ))}
                  </nav>
                  <div className="mt-auto pt-8 border-t border-outline-variant/20">
                      <button
                          onClick={() => window.location.reload()}
                          className="w-full border-[0.5px] border-primary/30 text-primary font-display text-sm tracking-[0.1rem] py-4 hover:bg-primary/10 transition-colors"
                      >
                          SINCRONIZAR_DADOS
                      </button>
                  </div>
              </div>
          )}

          <div className="flex-1 flex flex-col relative h-full overflow-hidden">
              {/* TOP NAVBAR */}
              <header className="flex justify-between items-center w-full px-6 md:px-8 py-4 md:py-6 border-b-[0.5px] border-outline-variant/20 bg-[#0b0e14]/80 backdrop-blur-md z-40">
                  <div className="flex items-center gap-4">
                      <button
                          onClick={() => setIsMobileMenuOpen(true)}
                          className="md:hidden text-primary p-1 border border-primary/20"
                      >
                          <Menu size={20} />
                      </button>
                      <div className="hidden md:flex gap-8 text-primary font-display text-[0.65rem] tracking-[0.1rem] uppercase">
                          {navLinks.map((link) => (
                              <Link
                                  key={link.to}
                                  to={link.to}
                                  className={`${path === link.to ? "text-primary border-b border-primary pb-1" : "opacity-50 hover:opacity-100 transition-opacity"}`}
                              >
                                  {link.label}
                              </Link>
                          ))}
                      </div>
                  </div>

                  <div className="flex gap-4 text-primary">
                      <Settings
                          size={18}
                          className="cursor-pointer hover:text-primary-container transition-colors hidden sm:block"
                      />
                      <Bell
                          size={18}
                          className="cursor-pointer hover:text-primary-container transition-colors hidden sm:block"
                      />
                      <div className="w-8 h-8 md:w-5 md:h-5 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer border-[0.5px] border-primary/50">
                          <User size={16} className="md:size-[12px]" />
                      </div>
                  </div>
              </header>

              {/* Dynamic Page Content - Single scrollable container */}
              <main className="flex-1 overflow-y-auto scroll-smooth">
                  <Outlet />

                  {/* STANDARD FOOTER */}
                  <footer className="max-w-7xl mx-auto w-full px-6 md:px-12 mt-auto pb-24 md:pb-16">
                      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t-[0.5px] border-outline-variant/30 font-display text-[0.55rem] text-on-surface-variant tracking-[0.15rem] md:tracking-[0.2rem] uppercase">
                          <div className="text-center md:text-left opacity-70">
                              © 2026 <span className="text-on-surface">LAB_INFINITO</span> // ACESSO_RESTRITO
                          </div>
                          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                              <button 
                                onClick={() => setIsTerminalOpen(true)}
                                className="opacity-50 hover:text-primary hover:opacity-100 transition-colors cursor-pointer uppercase"
                              >
                                TERMINAL
                              </button>
                              <Link
                                  to="/projetos"
                                  className="hover:text-primary transition-colors cursor-pointer"
                              >
                                  REPOSITÓRIO
                              </Link>
                              <Link
                                  to="/contato"
                                  className="hover:text-primary transition-colors cursor-pointer"
                              >
                                  COMUNICAÇÃO
                              </Link>
                              <span className="text-primary hidden lg:inline-block opacity-80">
                                  COORD: 42.06.12 // 000MB_Y: 10.00.04
                              </span>
                          </div>
                      </div>
                  </footer>
              </main>
          </div>

          {/* Global DataScrubber instance */}
          <DataScrubber current={getScrubberCurrent()} total={4} />

          {/* Global Terminal Instance */}
          <Terminal 
            isOpen={isTerminalOpen} 
            onClose={() => setIsTerminalOpen(false)} 
          />
      </div>
  );
}

