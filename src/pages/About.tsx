import { useMemo } from 'react';
import { Rocket, GitBranch, PenTool, Code, Plus, User, Loader2 } from 'lucide-react';
import { useGithubUser } from '../hooks/useGithubUser';
import { useGithubProjects } from '../hooks/useGithubProjects';

export default function About() {
  const { user, loading: userLoading } = useGithubUser('cristian-souza');
  const { projects, loading: projectsLoading } = useGithubProjects('cristian-souza');

  const loading = userLoading || projectsLoading;
  
  // Filtra apenas projetos que tem a tag 'PORTFOLIO' para as especialidades
  const portfolioProjects = useMemo(() => {
    return projects.filter(p => p.tags?.includes("PORTFOLIO"));
  }, [projects]);

  // Cálculos estáveis e dinâmicos para especialidades
  const specialties = useMemo(() => {
    if (projectsLoading || portfolioProjects.length === 0) return [];

    const techSystemNames: Record<string, string> = {
      'HTML': 'STRUCTURAL_MARKUP',
      'CSS': 'VISUAL_ENGINE',
      'JAVASCRIPT': 'LOGIC_NUCLEUS',
      'TYPESCRIPT': 'TYPED_CORE',
      'REACT': 'DYNAMIC_MODELS',
      'TAILWIND': 'STYLE_ACCELERATOR',
      'NODE.JS': 'BACKEND_SYNCHRONIZER',
      'VITE': 'COMPILATION_PROTOCOL',
    };

    // 1. Coletar todas as tags (ignorando as de controle)
    const allTags = portfolioProjects.flatMap(p => p.tags || [])
      .filter(tag => !["PORTFOLIO", "DESTAQUE", "PROTOCOLO"].includes(tag));

    // 2. Contar frequência de cada tag
    const tagCounts: Record<string, number> = {};
    allTags.forEach(tag => {
      const upper = tag.toUpperCase();
      tagCounts[upper] = (tagCounts[upper] || 0) + 1;
    });

    // 3. Transformar em array e calcular porcentagem
    return Object.entries(tagCounts)
      .map(([label, count]) => {
        const frequencyRatio = count / portfolioProjects.length;
        const percentage = Math.min(98, Math.round(75 + (frequencyRatio * 23)));

        return {
          name: techSystemNames[label] || `${label}_PROTOCOL`,
          label,
          val: percentage,
          count
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [portfolioProjects, projectsLoading]);

  // Gera cronologia de evolução agrupada por ano
  const timelineEvents = useMemo(() => {
    if (loading || !user || projects.length === 0) return [];

    const startYear = new Date(user.created_at).getFullYear();
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = startYear; year <= currentYear; year++) {
      const yearProjects = projects.filter(p => p.createdAt && new Date(p.createdAt).getFullYear() === year);
      
      let title = "";
      let description = "";

      if (year === startYear) {
        title = "INICIALIZAÇÃO_DO_SISTEMA";
        description = `Criação do perfil na rede neural do GitHub. Início da jornada de exploração em desenvolvimento de software e primeiros commits realizados.`;
      } else if (yearProjects.length > 0) {
        // Pega as tecnologias mais usadas no ano e garante que estejam em MAIÚSCULAS
        const yearTechs = [...new Set(yearProjects.flatMap(p => p.tags || []))]
          .filter(t => t !== "PROTOCOLO")
          .map(t => t.toUpperCase())
          .slice(0, 3);
          
        title = `EXPANSÃO_SETOR_${year}`;
        description = `Fase de aprimoramento técnico focada em ${yearTechs.join(', ')}. Desenvolvimento de ${yearProjects.length} ${yearProjects.length === 1 ? 'módulo de experimento' : 'módulos de experimentos'} sincronizados no laboratório.`;
      } else {
        title = `OTIMIZAÇÃO_DE_NÚCLEO_${year}`;
        description = `Período dedicado à pesquisa teórica, manutenção de sistemas existentes e refinamento de processos internos de desenvolvimento.`;
      }

      years.push({
        id: `year-${year}`,
        year: year.toString(),
        title,
        description,
        projectsCount: yearProjects.length
      });
    }

    // Ordena do mais recente para o mais antigo para a visualização
    return years.reverse();
  }, [projects, loading, user]);


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
                      ARRAY: CAPABILITIES.length = {specialties.length || 4}
                  </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {specialties.length > 0 ? (
                      specialties.map((spec, idx) => {
                          const colors = [
                              { text: 'text-primary', bg: 'bg-primary', shadow: 'shadow-[0_0_5px_rgba(0,240,255,0.4)]' },
                              { text: 'text-secondary-container', bg: 'bg-secondary-container', shadow: 'shadow-[0_0_5px_rgba(207,92,255,0.4)]' },
                              { text: 'text-tertiary-container', bg: 'bg-tertiary-container', shadow: 'shadow-[0_0_5px_rgba(0,251,64,0.4)]' }
                          ];
                          const theme = colors[idx % colors.length];

                          return (
                              <div key={spec.name} className="flex flex-col gap-3 group">
                                  <div className="flex justify-between items-center">
                                      <span className={`font-display text-[0.65rem] text-on-surface uppercase tracking-[0.1rem] group-hover:${theme.text} transition-colors`}>
                                          {spec.name} ({spec.label})
                                      </span>
                                      <span className={`font-display text-[0.65rem] ${theme.text} uppercase tracking-[0.1rem]`}>
                                          {spec.val}%
                                      </span>
                                  </div>
                                  <div className="flex gap-1 h-3 w-full">
                                      {[...Array(10)].map((_, i) => (
                                          <div
                                              key={i}
                                              className={`flex-1 transition-all duration-500 ${i < Math.round(spec.val / 10) ? `${theme.bg} ${theme.shadow}` : "bg-outline-variant/20"}`}
                                              style={{ transitionDelay: `${i * 50}ms` }}
                                          />
                                      ))}
                                  </div>
                              </div>
                          );
                      })
                  ) : (
                      // Fallback estático enquanto carrega ou se não houver dados
                      [
                          { name: 'STRUCTURAL_MARKUP', label: 'HTML', val: 92 },
                          { name: 'VISUAL_ENGINE', label: 'CSS', val: 90 },
                          { name: 'LOGIC_NUCLEUS', label: 'JAVASCRIPT', val: 85 },
                          { name: 'DYNAMIC_MODELS', label: 'REACT', val: 80 }
                      ].map((spec, idx) => {
                          const theme = [
                              { text: 'text-primary', bg: 'bg-primary', shadow: 'shadow-[0_0_5px_rgba(0,240,255,0.4)]' },
                              { text: 'text-secondary-container', bg: 'bg-secondary-container', shadow: 'shadow-[0_0_5px_rgba(207,92,255,0.4)]' },
                              { text: 'text-tertiary-container', bg: 'bg-tertiary-container', shadow: 'shadow-[0_0_5px_rgba(0,251,64,0.4)]' }
                          ][idx % 3];

                          return (
                              <div key={spec.name} className="flex flex-col gap-3">
                                  <div className="flex justify-between items-center opacity-40">
                                      <span className="font-display text-[0.65rem] text-on-surface uppercase tracking-[0.1rem]">
                                          {spec.name} ({spec.label})
                                      </span>
                                      <span className={`font-display text-[0.65rem] ${theme.text} uppercase tracking-[0.1rem]`}>
                                          {spec.val}%
                                      </span>
                                  </div>
                                  <div className="flex gap-1 h-3 w-full">
                                      {[...Array(10)].map((_, i) => (
                                          <div
                                              key={i}
                                              className={`flex-1 ${i < Math.round(spec.val / 10) ? `${theme.bg} opacity-20` : "bg-outline-variant/10"}`}
                                          />
                                      ))}
                                  </div>
                              </div>
                          )
                      })
                  )}
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
          <section id="timeline" className="mb-20">
              <h2 className="font-display text-2xl text-on-surface font-bold tracking-[-0.01em] mb-12">
                  LINHA DO TEMPO DE EVOLUÇÃO
              </h2>

              <div className="flex flex-col border-l border-outline-variant/20 ml-2 lg:ml-8 gap-12 relative">
                  {timelineEvents.length > 0 ? (
                    timelineEvents.map((event, idx) => {
                      const themes = [
                        { text: 'text-primary', bg: 'bg-primary', shadow: 'shadow-[0_0_8px_rgba(0,240,255,0.6)]', border: 'hover:border-primary/40' },
                        { text: 'text-secondary-container', bg: 'bg-secondary-container', shadow: 'shadow-[0_0_8px_rgba(207,92,255,0.6)]', border: 'hover:border-secondary-container/40' },
                        { text: 'text-tertiary-container', bg: 'bg-tertiary-container', shadow: 'shadow-[0_0_8px_rgba(0,251,64,0.6)]', border: 'hover:border-tertiary-container/40' }
                      ];
                      const theme = themes[idx % themes.length];
                      
                      // Alterna o recuo (margin-left) para criar um efeito visual dinâmico
                      const indentClasses = [
                        "ml-0",
                        "ml-0 md:ml-12 lg:ml-24",
                        "ml-0 md:ml-6 lg:ml-12"
                      ][idx % 3];

                      return (
                        <div key={event.id} className="pl-10 relative">
                            <div className={`absolute -left-[5px] top-1 w-[9px] h-[9px] ${theme.bg} rounded-sm ${theme.shadow} rotate-45`} />
                            <div className={`bg-surface-low border-[0.5px] border-outline-variant/30 p-6 md:p-8 ${theme.border} transition-colors max-w-3xl ${indentClasses}`}>
                                <span className={`font-display text-[0.55rem] ${theme.text} tracking-[0.1rem] uppercase mb-4 block`}>
                                    MARCO_TEMPORAL // {event.year}
                                </span>
                                <h3 className="font-display text-xl text-on-surface font-bold tracking-[-0.01em] mb-3">
                                    {event.title}
                                </h3>
                                <p className="font-body text-[0.85rem] text-on-surface-variant leading-relaxed">
                                    {event.description}
                                </p>
                                {event.projectsCount > 0 && (
                                  <div className="mt-4 pt-4 border-t border-outline-variant/10 flex items-center gap-2">
                                    <div className={`w-1 h-1 rounded-full ${theme.bg}`} />
                                    <span className="font-display text-[0.5rem] text-on-surface-variant tracking-[0.1rem] uppercase">
                                      {event.projectsCount} {event.projectsCount === 1 ? 'PROJETO_SINCRONIZADO' : 'PROJETOS_SINCRONIZADOS'}
                                    </span>
                                  </div>
                                )}
                            </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="pl-10 text-on-surface-variant font-display text-xs uppercase tracking-widest animate-pulse">
                      {loading ? "Sincronizando cronologia..." : "Nenhum marco de evolução detectado no servidor."}
                    </div>
                  )}
              </div>
          </section>
      </div>
  );
}
