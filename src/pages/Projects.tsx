import { Activity, Loader2, AlertCircle } from 'lucide-react';
import { SpecimenCard } from '../components/SpecimenCard';
import { useGithubProjects } from '../hooks/useGithubProjects';

export default function Projects() {
  const { projects, loading, error } = useGithubProjects('cristian-souza');

  const featuredProjects = projects.filter(p => p.featured);
  const ongoingProjects = projects.filter(p => !p.featured && p.progress !== undefined && p.progress < 100);
  const stableProjects = projects.filter(p => !p.featured && (p.progress === 100 || p.progress === undefined));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={40} className="text-primary animate-spin" />
        <span className="font-display text-xs text-primary uppercase tracking-[0.2rem] animate-pulse">
          CONECTANDO À REDE NEURAL DO GITHUB...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
        <AlertCircle size={40} className="text-secondary-container" />
        <span className="font-display text-sm text-secondary-container uppercase tracking-[0.1rem]">
          FALHA NA SINCRONIZAÇÃO DE DADOS
        </span>
        <p className="font-body text-xs text-on-surface-variant max-w-xs uppercase">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 pb-32 flex flex-col max-w-7xl mx-auto w-full relative">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 border-b-[0.5px] border-outline-variant/30 pb-10">
        <div>
           <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 bg-on-surface-variant"></div>
              <span className="font-display text-[0.55rem] text-on-surface-variant uppercase tracking-[0.2rem]">SETOR: ALPHA_09</span>
           </div>
           <h1 className="font-display text-5xl md:text-6xl text-primary font-bold tracking-[-0.02em] drop-shadow-[0_0_15px_rgba(0,240,255,0.2)]">
             MÓDULOS DE <br /> EXPERIMENTO
           </h1>
        </div>
        <p className="font-body text-xs text-on-surface-variant max-w-xs leading-relaxed md:text-right border-l-[0.5px] md:border-l-0 md:border-r-[0.5px] border-primary/30 pl-4 md:pl-0 md:pr-4">
           Visualização em tempo real das cápsulas de desenvolvimento sincronizadas via API GitHub.
        </p>
      </header>

      {/* ESPÉCIME_EM_DESTAQUE */}
      {featuredProjects.length > 0 && (
        <section className="mb-16">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-secondary-container rounded-full animate-pulse" />
              <h3 className="font-display text-lg text-on-surface font-bold tracking-[0.1rem] uppercase">
                 ESPÉCIME_EM_DESTAQUE
              </h3>
           </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map(project => (
                <SpecimenCard key={project.id} {...project} />
              ))}
           </div>
        </section>
      )}

      {/* EXPERIMENTOS EM ANDAMENTO */}
      {ongoingProjects.length > 0 && (
        <section className="mb-16">
           <div className="flex justify-between items-end mb-8 border-b-[0.5px] border-outline-variant/30 pb-4">
              <h3 className="font-display text-lg text-on-surface font-bold tracking-[0.1rem] uppercase flex items-center gap-3">
                 <Activity size={18} className="text-on-surface-variant" /> EXPERIMENTOS EM ANDAMENTO
              </h3>
              <span className="font-display text-[0.55rem] text-on-surface-variant tracking-[0.1rem]">SCAN ATIVO</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingProjects.map(project => (
                <SpecimenCard key={project.id} {...project} className="!p-6" />
              ))}
           </div>
        </section>
      )}

      {/* CATÁLOGO DE PESQUISA (Estáveis) */}
      <section className="mb-24">
         <div className="flex justify-between items-end mb-8 border-b-[0.5px] border-outline-variant/30 pb-4">
            <h3 className="font-display text-lg text-on-surface font-bold tracking-[0.1rem] uppercase">
               CATÁLOGO_DE_REPOS_GITHUB
            </h3>
            <span className="font-display text-[0.55rem] text-on-surface-variant tracking-[0.1rem]">DADOS_SINCRONIZADOS</span>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stableProjects.map(project => (
              <SpecimenCard key={project.id} {...project} />
            ))}
         </div>
         {projects.length === 0 && (
           <p className="font-display text-xs text-on-surface-variant uppercase tracking-widest text-center py-12">
             Nenhum módulo de experimento encontrado no servidor.
           </p>
         )}
      </section>
    </div>
  );
}
