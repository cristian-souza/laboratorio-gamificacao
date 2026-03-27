import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Loader2 } from 'lucide-react';
import { SpecimenCard } from '../components/SpecimenCard';
import { SpecimenCarousel } from '../components/SpecimenCarousel';
import { useGithubProjects } from '../hooks/useGithubProjects';

export default function Home() {
  const { projects, loading } = useGithubProjects('cristian-souza');
  const featuredProjects = projects.filter(p => p.featured);

  // Estabiliza e calcula as tecnologias para o módulo XP
  const displayTechs = useMemo(() => {
    if (loading || projects.length === 0) {
      return [
        { name: "HTML_CSS", val: 8 },
        { name: "JAVASCRIPT", val: 7 },
        { name: "REACT_JS", val: 6 },
        { name: "TAILWIND", val: 7 }
      ];
    }

    const allTags = projects.flatMap(p => p.tags || [])
      .filter(tag => !["portfolio", "destaque", "PROTOCOLO"].includes(tag));

    const tagCounts: Record<string, number> = {};
    allTags.forEach(tag => {
      const upper = tag.toUpperCase();
      tagCounts[upper] = (tagCounts[upper] || 0) + 1;
    });

    return Object.entries(tagCounts)
      .map(([name, count]) => ({
        name: name.replace('.', '_'),
        val: Math.min(10, Math.floor(6 + (count / projects.length) * 4)) // Escala de 6 a 10
      }))
      .sort((a, b) => b.val - a.val)
      .slice(0, 4);
  }, [projects, loading]);

  return (
    <div className="p-8 md:p-12 pb-32 flex flex-col gap-16 max-w-7xl mx-auto w-full">
      
      {/* HERO SECTION */}
      <section>
        <span className="font-display text-[0.65rem] text-primary uppercase tracking-[0.1rem] border-[0.5px] border-primary/20 px-3 py-1 bg-primary/5 inline-block mb-6">
          PROTOCOLO_INICIAL_ATIVO
        </span>
        <h1 className="font-display text-5xl md:text-[5.5rem] leading-[0.95] text-primary tracking-[-0.03em] font-bold">
          LABORATÓRIO DE <br />
          <span className="bg-gradient-to-r from-primary-container via-purple-400 to-secondary-container text-transparent bg-clip-text">EXPERIMENTOS</span><br />
          <span className="text-secondary-container drop-shadow-[0_0_20px_rgba(207,92,255,0.4)]">DIGITAIS</span>
        </h1>
        <p className="mt-6 text-on-surface-variant font-body text-[0.95rem] max-w-xl leading-relaxed">
          Explorando soluções, testando ideias e evoluindo como desenvolvedor em uma jornada pelo vácuo do desenvolvimento web moderno.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Link to="/projetos" className="bg-gradient-to-br from-primary to-primary-container text-[#006970] font-display font-bold text-xs px-8 py-4 tracking-[0.1rem] hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all flex items-center gap-2">
            INICIAR EXPLORAÇÃO <Zap size={14} />
          </Link>
          <button className="border-[0.5px] border-outline-variant text-primary font-display text-xs px-8 py-4 tracking-[0.1rem] hover:bg-surface-high transition-colors">
            DOCUMENTAÇÃO
          </button>
        </div>
      </section>

      {/* XP MODULE & QUICK LINKS */}
      <section className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-surface-low border-[0.5px] border-outline-variant/30 p-8 flex flex-col gap-6 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="flex justify-between items-end flex-wrap gap-4">
              <div>
                 <span className="font-display text-[0.6rem] text-primary uppercase tracking-[0.1rem] opacity-70">VIRTUS_DO_MACBETH</span>
                 <h3 className="font-display text-xl text-primary mt-1">NÍVEL 3 - DESENVOLVEDOR EM EVOLUÇÃO</h3>
              </div>
              <div className="text-right">
                 <span className="font-display text-2xl text-primary font-bold">320</span>
                 <span className="font-display text-xs text-on-surface-variant">/500</span>
                 <div className="font-display text-[0.55rem] text-primary tracking-[0.1rem] opacity-50 mt-1">XP_TOTAL</div>
              </div>
           </div>
           
           <div className="flex gap-1 h-2 relative w-full">
              {[...Array(10)].map((_, i) => (
                <div key={i} className={`flex-1 ${i < 6 ? 'bg-primary shadow-[0_0_8px_rgba(0,240,255,0.4)]' : 'bg-[#182329]'}`} />
              ))}
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
              {displayTechs.map((tech) => (
                <div key={tech.name} className="border-[0.5px] border-outline-variant/20 bg-surface/40 p-3 flex flex-col gap-2 group/tech hover:border-primary/40 transition-colors">
                   <span className="font-display text-[0.55rem] text-on-surface-variant uppercase tracking-[0.1rem] group-hover/tech:text-primary transition-colors">{tech.name}</span>
                   <h4 className="font-display text-sm text-primary mb-1">{tech.name.replace('_', ' ')}</h4>
                   <div className="flex gap-px h-1 w-full">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 ${i < tech.val ? 'bg-primary/60 group-hover/tech:bg-primary transition-colors' : 'bg-outline-variant/20'}`} />
                      ))}
                   </div>
                </div>
              ))}
           </div>

        </div>
      </section>

      {/* CATÁLOGO DE PESQUISA / EXPERIMENTOS EM DESTAQUE */}
      <section className="flex flex-col gap-8 pb-10">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-[0.5px] border-outline-variant/30 pb-4 gap-4">
            <div className="flex flex-col gap-1">
               <span className="font-display text-[0.6rem] text-on-surface-variant uppercase tracking-[0.2rem]">CATÁLOGO_DE_PESQUISA</span>
               <h2 className="font-display text-2xl md:text-3xl text-primary uppercase tracking-[-0.02em] font-bold">EXPERIMENTOS EM DESTAQUE</h2>
            </div>
            <span className="font-display text-[0.6rem] text-primary uppercase tracking-[0.2rem] hidden lg:block">00{featuredProjects.length} // SINCRONIZADOS</span>
         </div>

         {loading ? (
           <div className="flex flex-col items-center justify-center py-20 gap-4 w-full">
              <Loader2 size={30} className="text-primary animate-spin" />
              <span className="font-display text-[0.6rem] text-primary uppercase tracking-[0.2rem] animate-pulse">Sincronizando com o GitHub...</span>
           </div>
         ) : (
           <>
            {featuredProjects.length > 0 ? (
              <SpecimenCarousel projects={featuredProjects} autoPlayInterval={15000} />
            ) : (
              <p className="font-display text-xs text-on-surface-variant uppercase tracking-widest text-center py-12 border border-dashed border-outline-variant/20 bg-surface-low">
                Nenhum módulo de experimento marcado com estrela no GitHub.
              </p>
            )}
           </>
         )}
         
         <div className="flex justify-center mt-4">
            <Link to="/projetos" className="font-display text-[0.65rem] text-primary tracking-[0.2rem] uppercase hover:text-primary-container transition-colors border-b border-primary/20 pb-1">
               ACESSAR LABORATÓRIO COMPLETO // VER_TODOS
            </Link>
         </div>
      </section>
    </div>
  );
}
