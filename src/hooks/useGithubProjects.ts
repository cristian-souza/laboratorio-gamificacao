import { useState, useEffect } from 'react';
import type { ProjectData } from '../components/SpecimenCard';

// Definimos o que o GitHub nos envia para o TypeScript entender
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

export function useGithubProjects(username: string) {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);

        if (!response.ok) throw new Error('Falha ao buscar repositórios');

        const data: GithubRepo[] = await response.json();

        // FILTRO: Apenas repositórios com o tópico "portfolio"
        const filteredRepos = data.filter(repo => 
          repo.topics?.includes("portfolio")
        );

        const mappedProjects: ProjectData[] = filteredRepos.map((repo: GithubRepo) => {
          // Removemos os tópicos de controle "portfolio" e "destaque" da lista de tags para não aparecer no card
          const cleanTopics = repo.topics?.filter(topic => topic !== "portfolio" && topic !== "destaque") || [];
          
          return {
            id: repo.name.substring(0, 10).toUpperCase(),
            title: repo.name.replace(/-/g, ' ').toUpperCase(),
            description: repo.description || "Módulo de experimento sem descrição definida no protocolo.",
            coords: `ID: ${repo.id} // V.${repo.default_branch.toUpperCase()}`,
            status: repo.archived ? "LEGACY" : "OPERACIONAL",
            progress: 100,
            tags: repo.language ? [repo.language.toUpperCase(), ...cleanTopics] : cleanTopics.length > 0 ? cleanTopics : ["PROTOCOLO"],
            featured: repo.topics?.includes("destaque") || false,
            url: repo.html_url
          };
        });

        setProjects(mappedProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao conectar com a rede neural do GitHub');
      } finally {
        setLoading(false);
      }
    }

    if (username) fetchRepos();
  }, [username]);

  return { projects, loading, error };
}

