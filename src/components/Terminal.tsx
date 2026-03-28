import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Terminal as TerminalIcon, Command, ChevronRight } from 'lucide-react';
import type { ProjectData } from './SpecimenCard';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajusta o tamanho do canvas para o container pai
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configurações da chuva Matrix
    const characters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%\"'#&_(),.;:?!\\|{}[]<>@";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      // Fundo preto semi-transparente para o efeito de rastro
      ctx.fillStyle = "rgba(11, 14, 20, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00fb40"; // Cor tertiary-container (verde neon)
      ctx.font = `${fontSize}px "Space Grotesk", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 pointer-events-none opacity-10 ${className}`} 
    />
  );
};

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  type: 'command' | 'response' | 'error' | 'system' | 'success';
  content: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  default_branch: string;
  archived: boolean;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  html_url: string;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [history, setHistory] = useState<LogEntry[]>([
    { type: 'system', content: 'LAB_INFINITO [Versão 42.0.26]' },
    { type: 'system', content: '(c) Corporação LAB. Todos os direitos reservados.' },
    { type: 'system', content: 'Digite "help" para ver os comandos disponíveis.' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchGithubData = useCallback(async (isManual = false) => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    if (isManual) {
      setHistory(prev => [...prev, { type: 'system', content: 'INICIANDO SINCRONIZAÇÃO COM REDE NEURAL GITHUB...' }]);
    }

    try {
      const response = await fetch(`https://api.github.com/users/cristian-souza/repos?sort=updated`);
      if (!response.ok) throw new Error('FALHA NA CONEXÃO COM O SERVIDOR GITHUB');

      const data: GithubRepo[] = await response.json();
      
      // Filtra apenas os que tem a tag "portfolio"
      const filteredRepos = data.filter(repo => repo.topics?.includes("portfolio"));

      const mapped: ProjectData[] = filteredRepos.map(repo => ({
        id: repo.name.substring(0, 10).toUpperCase(),
        title: repo.name.replace(/-/g, ' ').toUpperCase(),
        description: repo.description || "SEM DESCRIÇÃO NO PROTOCOLO",
        coords: `ID: ${repo.id} // V.${repo.default_branch.toUpperCase()}`,
        status: repo.archived ? "LEGACY" : "OPERACIONAL",
        progress: 100,
        tags: repo.language ? [repo.language.toUpperCase(), ...(repo.topics || [])] : (repo.topics || []),
        featured: repo.topics?.includes("destaque") || false,
        url: repo.html_url
      }));

      setProjects(mapped);
      
      if (isManual) {
        setHistory(prev => [...prev, { type: 'success', content: `SINCRONIZAÇÃO CONCLUÍDA: ${mapped.length} MÓDULOS CARREGADOS.` }]);
      }
    } catch (err) {
      if (isManual) {
        setHistory(prev => [...prev, { type: 'error', content: `ERRO DE PROTOCOLO: ${err instanceof Error ? err.message : 'FALHA DESCONHECIDA'}` }]);
      }
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing]);

  useEffect(() => {
    if (isOpen) {
      if (projects.length === 0) fetchGithubData();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, projects.length, fetchGithubData]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: LogEntry[] = [...history, { type: 'command', content: `> ${input}` }];

    if (cmd === 'help') {
      newHistory.push({ type: 'response', content: 'COMANDOS DISPONÍVEIS:' });
      newHistory.push({ type: 'response', content: '  SEARCH [termo] - Pesquisa nos repositórios do GitHub' });
      newHistory.push({ type: 'response', content: '  SYNC           - Sincroniza dados com o servidor GitHub' });
      newHistory.push({ type: 'response', content: '  LIST           - Lista módulos operacionais carregados' });
      newHistory.push({ type: 'response', content: '  CLEAR          - Limpa o histórico do terminal' });
      newHistory.push({ type: 'response', content: '  EXIT           - Encerra a sessão do terminal' });
    } else if (cmd === 'sync') {
      fetchGithubData(true);
      setHistory(newHistory);
      setInput('');
      return;
    } else if (cmd === 'clear') {
      setHistory([{ type: 'system', content: 'TERMINAL REINICIADO...' }]);
      setInput('');
      return;
    } else if (cmd === 'exit') {
      onClose();
      return;
    } else if (cmd === 'list') {
      if (projects.length === 0) {
        newHistory.push({ type: 'error', content: 'NENHUM DADO CARREGADO. USE "SYNC" PARA ATUALIZAR.' });
      } else {
        newHistory.push({ type: 'response', content: 'MÓDULOS OPERACIONAIS LOCALIZADOS:' });
        projects.forEach(p => {
          newHistory.push({ type: 'response', content: `  [${p.id}] - ${p.title}` });
        });
      }
    } else if (cmd.startsWith('search ')) {
      const term = cmd.replace('search ', '').trim();
      if (projects.length === 0) {
        newHistory.push({ type: 'error', content: 'DADOS NÃO SINCRONIZADOS. EXECUTE "SYNC" PRIMEIRO.' });
      } else {
        const results = projects.filter(p => 
          p.title.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          p.tags?.some(t => t.toLowerCase().includes(term))
        );

        if (results.length > 0) {
          newHistory.push({ type: 'response', content: `${results.length} MÓDULO(S) IDENTIFICADO(S):` });
          results.forEach(p => {
            newHistory.push({ type: 'response', content: `  >> ${p.title} (${p.id})` });
            newHistory.push({ type: 'response', content: `     STATUS: ${p.status} // URL: ${p.url}` });
          });
        } else {
          newHistory.push({ type: 'error', content: `NENHUMA CORRESPONDÊNCIA PARA: "${term}"` });
        }
      }
    } else {
      newHistory.push({ type: 'error', content: `'${cmd}' NÃO É RECONHECIDO COMO UM COMANDO INTERNO OU EXTERNO.` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="w-full max-w-3xl h-[500px] bg-surface-low border border-tertiary-container/30 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-surface-container-high px-4 py-2 border-b border-outline-variant/30">
          <div className="flex items-center gap-3">
            <TerminalIcon size={14} className="text-tertiary-container" />
            <span className="font-display text-[0.65rem] tracking-[0.15rem] text-on-surface-variant uppercase">
              TERMINAL_GITHUB_V42 {isSyncing && <span className="text-tertiary-container animate-pulse ml-2">[SINCRONIZANDO...]</span>}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Terminal Content */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-2 custom-scrollbar relative"
        >
          <MatrixRain />
          <div className="relative z-10">
            {history.map((entry, i) => (
              <div 
                key={i} 
                className={`
                  ${entry.type === 'command' ? 'text-white font-bold' : ''}
                  ${entry.type === 'response' ? 'text-tertiary-container' : ''}
                  ${entry.type === 'error' ? 'text-secondary-container' : ''}
                  ${entry.type === 'success' ? 'text-primary' : ''}
                  ${entry.type === 'system' ? 'text-on-surface-variant opacity-60' : ''}
                `}
              >
                {entry.content}
              </div>
            ))}
            
            <form onSubmit={handleCommand} className="flex items-center gap-2 pt-2">
              <ChevronRight size={14} className="text-tertiary-container animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white caret-tertiary-container"
                spellCheck={false}
                autoComplete="off"
                disabled={isSyncing}
              />
            </form>
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="px-4 py-1 bg-tertiary-container/5 border-t border-outline-variant/20 flex justify-between items-center">
           <div className="flex gap-4">
              <span className="font-display text-[0.5rem] text-tertiary-container tracking-[0.1rem]">STATUS: {isSyncing ? 'SYNCING' : 'ONLINE'}</span>
              <span className="font-display text-[0.5rem] text-on-surface-variant/50 tracking-[0.1rem]">USER: cristian-souza</span>
           </div>
           <div className="flex items-center gap-2">
              <Command size={10} className="text-on-surface-variant/30" />
              <span className="font-display text-[0.5rem] text-on-surface-variant/30 tracking-[0.1rem]">TYPE "SYNC" TO UPDATE DADOS</span>
           </div>
        </div>
      </div>
    </div>
  );
};
