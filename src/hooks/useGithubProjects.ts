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
  created_at: string;
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

        const mappedProjects: ProjectData[] = data.map((repo: GithubRepo) => {
          // Mantemos os tópicos originais para filtragem interna, mas preparamos a exibição
          const allTags = [
            ...(repo.language ? [repo.language.toUpperCase()] : []),
            ...(repo.topics?.map(t => t.toUpperCase()) || [])
          ];
          return {
            id: repo.name.substring(0, 10).toUpperCase(),
            title: repo.name.replace(/-/g, ' ').toUpperCase(),
            description: repo.description || "Módulo de experimento sem descrição definida no protocolo.",
            coords: `ID: ${repo.id} // V.${repo.default_branch.toUpperCase()}`,
            status: repo.archived ? "LEGACY" : "OPERACIONAL",
            progress: 100,
            tags: allTags, // Passamos todas para poder filtrar nas páginas
            featured: repo.topics?.includes("destaque") || false,
            url: repo.html_url,
            createdAt: repo.created_at
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

