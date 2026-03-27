import { Rocket, GitBranch, PenTool, Code, Plus, User, Loader2 } from 'lucide-react';
import { useGithubUser } from '../hooks/useGithubUser';

export default function About() {
  const { user, loading } = useGithubUser('cristian-souza');

  return (
      <div className="p-8 md:p-12 pb-32 flex flex-col max-w-7xl mx-auto w-full">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mb-16">
              {/* AVATAR & DATA_STATUS */}
              <div className="w-full lg:w-72 flex flex-col gap-4 flex-shrink-0">
                  <div className="w-full h-72 md:h-80 bg-surface-low border-[0.5px] border-primary/30 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay z-10" />
                      <div className="w-full h-full bg-gradient-to-b from-[#181f2b] to-[#0c1219] flex items-center justify-center">
                          {loading ? (
                            <Loader2 className="text-primary animate-spin" size={40} />
                          ) : user?.avatar_url ? (
                            <img 
                              src={user.avatar_url} 
                              alt={user.name} 
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 duration-500"
                            />
                          ) : (
                            <User size={80} className="text-primary/10" />
                          )}
                      </div>
                      <div
                          id="cristian-souza"
                          className="absolute bottom-4 left-4 font-display text-[0.55rem] text-primary tracking-[0.1rem] uppercase z-20 font-bold bg-[#0b0e14]/60 px-2 py-1 backdrop-blur-sm"
                      >
                          {user?.name || 'Cristian Souza'}
                      </div>
                  </div>

                  <div className="bg-secondary-container/5 border-[0.5px] border-secondary-container/40 p-4 border-l-[3px] border-l-secondary-container shadow-[0_0_15px_rgba(207,92,255,0.05)]">
                      <span className="font-display text-[0.5rem] text-on-surface-variant tracking-[0.1rem] uppercase block mb-1">
                          DATA_STATUS
                      </span>
                      <p className="font-display text-sm text-secondary-container font-bold leading-relaxed tracking-wide">
                          Nível atual: Desenvolvedor
                          <br />
                          em evolução
                      </p>
                  </div>
              </div>

              {/* PROFILE INFO & CARDS */}
              <div className="flex flex-col flex-1 w-full">
                  <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-[1px] bg-primary/40 block"></div>
                      <span className="font-display text-[0.6rem] text-primary tracking-[0.2rem] uppercase">
                          DOSSIÊ DE PESQUISA
                      </span>
                  </div>

                  <h1 className="font-display text-5xl md:text-7xl text-on-surface font-bold tracking-[-0.03em] leading-none mb-6">
                      Perfil do{" "}
                      <span className="bg-gradient-to-r from-primary to-secondary-container text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                          Cientista.
                      </span>
                  </h1>

                  <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-xl mb-12">
                      {user?.bio || "Sou um desenvolvedor em constante evolução, explorando tecnologias e criando soluções através de experimentos digitais."}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                      {/* Missão Card */}
                      <div className="bg-surface-low border-[0.5px] border-outline-variant/30 p-6 md:p-8 flex flex-col h-full hover:border-primary/30 transition-colors">
                          <h3 className="font-display text-sm text-on-surface tracking-[0.1rem] uppercase font-bold mb-4 flex items-center gap-3">
                              <Rocket size={16} className="text-primary" />{" "}
                              MISSÃO
                          </h3>
                          <p className="font-body text-xs text-on-surface-variant leading-[1.8]">
                              Explorar os limites do desenvolvimento web,
                              navegando por nebulosas de código para entregar
                              interfaces que orbitam a excelência técnica e a
                              experiência humana. Meu objetivo é dominar novos
                              territórios digitais com soluções robustas e
                              performáticas.
                          </p>
                      </div>

                      {/* Coordenadas Card */}
                      <div className="bg-surface-low border-[0.5px] border-outline-variant/30 p-6 md:p-8 flex flex-col h-full hover:border-secondary-container/30 transition-colors">
                          <span className="font-display text-[0.55rem] text-primary tracking-[0.15rem] uppercase mb-6 block">
                              COORDENADAS_ATUAIS
                          </span>
                          <ul className="flex flex-col gap-4 flex-1 justify-center">
                              <li className="flex justify-between items-end border-b-[0.5px] border-outline-variant/20 pb-2">
                                  <span className="font-display text-[0.55rem] text-on-surface-variant tracking-[0.1rem] uppercase">
                                      LOC_SECTOR:
                                  </span>
                                  <span className="font-display text-[0.65rem] text-on-surface tracking-[0.1rem] uppercase font-bold text-right pt-[2px]">
                                      {user?.location || 'BRASIL // MANACAPURU_AM'}
                                  </span>
                              </li>
                              <li className="flex justify-between items-end border-b-[0.5px] border-outline-variant/20 pb-2">
                                  <span className="font-display text-[0.55rem] text-on-surface-variant tracking-[0.1rem] uppercase">
                                      TIME_SYNC:
                                  </span>
                                  <span className="font-display text-[0.65rem] text-on-surface tracking-[0.1rem] uppercase font-bold text-right pt-[2px]">
                                      GMT-04
                                  </span>
                              </li>
                              <li className="flex justify-between items-end border-b-[0.5px] border-outline-variant/20 pb-2">
                                  <span className="font-display text-[0.55rem] text-on-surface-variant tracking-[0.1rem] uppercase">
                                      CORE_PROCESS:
                                  </span>
                                  <span className="font-display text-[0.65rem] text-on-surface tracking-[0.1rem] uppercase font-bold text-right pt-[2px]">
                                      FULL_STACK_DEV
                                  </span>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>

          {/* ESPECIALIDADES SECTION */}
          <section className="mb-16">
              <div className="flex justify-between items-end mb-8 border-b-[0.5px] border-outline-variant/30 pb-4">
                  <h2 className="font-display text-2xl text-on-surface font-bold tracking-[-0.01em]">
                      ESPECIALIDADES
                  </h2>
                  <span className="font-display text-[0.55rem] text-primary tracking-[0.1rem] uppercase">
                      ARRAY: CAPABILITIES.length = 4
                  </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* Skill 1: HTML */}
                  <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                          <span className="font-display text-[0.65rem] text-on-surface uppercase tracking-[0.1rem]">
                              STRUCTURAL_MARKUP (HTML)
                          </span>
                          <span className="font-display text-[0.65rem] text-primary uppercase tracking-[0.1rem]">
                              92%
                          </span>
                      </div>
                      <div className="flex gap-1 h-3 w-full">
                          {[...Array(10)].map((_, i) => (
                              <div
                                  key={i}
                                  className={`flex-1 ${i < 9 ? "bg-primary shadow-[0_0_5px_rgba(0,240,255,0.4)]" : "bg-outline-variant/20"}`}
                              />
                          ))}
                      </div>
                  </div>

                  {/* Skill 2: CSS */}
                  <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                          <span className="font-display text-[0.65rem] text-on-surface uppercase tracking-[0.1rem]">
                              VISUAL_ENGINE (CSS)
                          </span>
                          <span className="font-display text-[0.65rem] text-primary uppercase tracking-[0.1rem]">
                              90%
                          </span>
                      </div>
                      <div className="flex gap-1 h-3 w-full">
                          {[...Array(10)].map((_, i) => (
                              <div
                                  key={i}
                                  className={`flex-1 ${i < 9 ? "bg-primary shadow-[0_0_5px_rgba(0,240,255,0.4)]" : "bg-outline-variant/20"}`}
                              />
                          ))}
                      </div>
                  </div>

                  {/* Skill 3: JS */}
                  <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                          <span className="font-display text-[0.65rem] text-on-surface uppercase tracking-[0.1rem]">
                              LOGIC_NUCLEUS (JAVASCRIPT)
                          </span>
                          <span className="font-display text-[0.65rem] text-secondary-container uppercase tracking-[0.1rem]">
                              85%
                          </span>
                      </div>
                      <div className="flex gap-1 h-3 w-full">
                          {[...Array(10)].map((_, i) => (
                              <div
                                  key={i}
                                  className={`flex-1 ${i < 8 ? "bg-secondary-container shadow-[0_0_5px_rgba(207,92,255,0.4)]" : "bg-outline-variant/20"}`}
                              />
                          ))}
                      </div>
                  </div>

                  {/* Skill 4: React */}
                  <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                          <span className="font-display text-[0.65rem] text-on-surface uppercase tracking-[0.1rem]">
                              DYNAMIC_MODELS (REACT)
                          </span>
                          <span className="font-display text-[0.65rem] text-secondary-container uppercase tracking-[0.1rem]">
                              75%
                          </span>
                      </div>
                      <div className="flex gap-1 h-3 w-full">
                          {[...Array(10)].map((_, i) => (
                              <div
                                  key={i}
                                  className={`flex-1 ${i < 7 ? "bg-secondary-container shadow-[0_0_5px_rgba(207,92,255,0.4)]" : "bg-outline-variant/20"}`}
                              />
                          ))}
                      </div>
                  </div>
              </div>
          </section>

          {/* FERRAMENTAS DE LAB */}
          <section className="mb-20">
              <h2 className="font-display text-2xl text-on-surface font-bold tracking-[-0.01em] mb-8 border-b-[0.5px] border-outline-variant/30 pb-4">
                  FERRAMENTAS DE LAB
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="flex flex-col items-center justify-center gap-4 bg-surface-low border-[0.5px] border-outline-variant/30 py-8 px-4 hover:bg-surface-high hover:border-primary/40 transition-colors group overflow-hidden">
                      <GitBranch
                          size={24}
                          className="text-on-surface-variant group-hover:text-primary transition-colors"
                      />
                      <span className="font-display text-[0.6rem] text-on-surface-variant tracking-[0.15rem] uppercase group-hover:text-primary transition-colors text-center truncate w-full">
                          GIT_VERSION
                      </span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-4 bg-surface-low border-[0.5px] border-outline-variant/30 py-8 px-4 hover:bg-surface-high hover:border-primary/40 transition-colors group overflow-hidden">
                      <PenTool
                          size={24}
                          className="text-on-surface-variant group-hover:text-primary transition-colors"
                      />
                      <span className="font-display text-[0.6rem] text-on-surface-variant tracking-[0.15rem] uppercase group-hover:text-primary transition-colors text-center truncate w-full">
                          FIGMA_INTERFACE
                      </span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-4 bg-surface-low border-[0.5px] border-outline-variant/30 py-8 px-4 hover:bg-surface-high hover:border-primary/40 transition-colors group overflow-hidden">
                      <Code
                          size={24}
                          className="text-on-surface-variant group-hover:text-primary transition-colors"
                      />
                      <span className="font-display text-[0.6rem] text-on-surface-variant tracking-[0.15rem] uppercase group-hover:text-primary transition-colors text-center truncate w-full">
                          VS_CODE_CORE
                      </span>
                  </button>
                  <button className="flex flex-col items-center justify-center gap-4 bg-transparent border-[0.5px] border-dashed border-outline-variant/50 py-8 px-4 hover:bg-primary/5 hover:border-primary/40 transition-colors group text-on-surface-variant hover:text-primary overflow-hidden">
                      <Plus size={24} />
                      <span className="font-display text-[0.6rem] tracking-[0.15rem] uppercase text-center truncate w-full">
                          NEW_UPGRADE
                      </span>
                  </button>
              </div>
          </section>
          {/* LINHA DO TEMPO */}
          <section className="mb-20">
              <h2 className="font-display text-2xl text-on-surface font-bold tracking-[-0.01em] mb-12">
                  LINHA DO TEMPO DE EVOLUÇÃO
              </h2>

              <div className="flex flex-col border-l border-outline-variant/20 ml-2 lg:ml-8 gap-12 relative">
                  {/* Event 1 */}
                  <div className="pl-10 relative">
                      <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] bg-primary rounded-sm shadow-[0_0_8px_rgba(0,240,255,0.6)] rotate-45" />
                      <div className="bg-surface-low border-[0.5px] border-outline-variant/30 p-6 md:p-8 hover:border-primary/40 transition-colors max-w-3xl">
                          <span className="font-display text-[0.55rem] text-primary tracking-[0.1rem] uppercase mb-4 block">
                              PROTOCOLO_INICIAL // 2021
                          </span>
                          <h3 className="font-display text-xl text-on-surface font-bold tracking-[-0.01em] mb-3">
                              Primeiro Código
                          </h3>
                          <p className="font-body text-[0.85rem] text-on-surface-variant leading-relaxed">
                              Execução do script "Hello World" em ambiente
                              local. Descoberta dos fundamentos da estrutura de
                              sistemas web e a lógica primordial de algoritmos.
                          </p>
                      </div>
                  </div>

                  {/* Event 2 */}
                  <div className="pl-10 relative">
                      <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] bg-secondary-container rounded-sm shadow-[0_0_8px_rgba(207,92,255,0.6)] rotate-45" />
                      <div className="bg-surface-low border-[0.5px] border-outline-variant/30 p-6 md:p-8 hover:border-secondary-container/40 transition-colors max-w-3xl ml-0 md:ml-12 lg:ml-24">
                          <span className="font-display text-[0.55rem] text-secondary-container tracking-[0.1rem] uppercase mb-4 block">
                              EXPANSÃO_FRONTEND // 2022
                          </span>
                          <h3 className="font-display text-xl text-on-surface font-bold tracking-[-0.01em] mb-3">
                              Exploração React
                          </h3>
                          <p className="font-body text-[0.85rem] text-on-surface-variant leading-relaxed">
                              Implementação de arquiteturas baseadas em
                              componentes. Início do desenvolvimento de
                              interfaces reativas e integração com APIs de dados
                              externos.
                          </p>
                      </div>
                  </div>

                  {/* Event 3 */}
                  <div className="pl-10 relative">
                      <div className="absolute -left-[5px] top-1 w-[9px] h-[9px] bg-tertiary-container rounded-sm shadow-[0_0_8px_rgba(0,251,64,0.6)] rotate-45" />
                      <div className="bg-surface-low border-[0.5px] border-outline-variant/30 p-6 md:p-8 hover:border-tertiary-container/40 transition-colors max-w-3xl">
                          <span className="font-display text-[0.55rem] text-tertiary-container tracking-[0.1rem] uppercase mb-4 block">
                              ESTADO_ATUAL // 2024
                          </span>
                          <h3 className="font-display text-xl text-on-surface font-bold tracking-[-0.01em] mb-3">
                              Labs & Experimentos
                          </h3>
                          <p className="font-body text-[0.85rem] text-on-surface-variant leading-relaxed">
                              Foco em design systems, performance otimizada e
                              interfaces imersivas (HUD aesthetics). Construindo
                              pontes entre o design avançado e o código limpo.
                          </p>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}
