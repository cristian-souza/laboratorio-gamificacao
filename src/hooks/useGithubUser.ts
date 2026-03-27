import { useState, useEffect } from 'react';

interface GithubUser {
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  login: string;
}

export function useGithubUser(username: string) {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Falha ao buscar usuário');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error('Erro ao buscar usuário do GitHub:', err);
      } finally {
        setLoading(false);
      }
    }
    if (username) fetchUser();
  }, [username]);

  return { user, loading };
}
