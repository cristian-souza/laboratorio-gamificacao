1# 🧪 Laboratório de Experimentos Digitais

Este projeto é um **portfólio gamificado** com estética futurista/cyberpunk, desenvolvido para explorar as fronteiras do desenvolvimento web moderno. Mais do que uma vitrine de projetos, é um ambiente de experimentação de UI/UX inspirado em interfaces táticas e sistemas operacionais avançados.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)

## 📡 Características do Protocolo

- **Interface Tática (UI/UX):** Design baseado em Material Design 3, adaptado para uma estética de "Laboratório Digital" com animações de pulso, barras de progresso dinâmicas e tipografia display impactante.
- **Fundo Atômico Dinâmico:** Sistema de partículas de **Prótons** que cruzam a tela suavemente, criando um ambiente imersivo e energético por trás de todas as páginas.
- **Sincronização Neural (GitHub API):** Consumo dinâmico de repositórios via API do GitHub, filtrando automaticamente projetos e exibindo-os em carrosséis interativos.
- **Central de Comunicação Segura:** Formulário de contato integrado com **Netlify Functions** e **Resend** para processamento de mensagens em tempo real.
- **Status do Sistema:** Módulos de monitoramento em tempo real (CPU, Firewall, Encrypt) que reforçam a imersão na temática tecnológica.

## 🛠️ Pilha Tecnológica

- **Core:** React 19 + TypeScript
- **Estilização:** Tailwind CSS (com configurações customizadas de animações `proton-drift` e `proton-pulse`)
- **Ícones:** Lucide React & React Icons (Font Awesome)
- **Roteamento:** React Router DOM
- **Backend/Serverless:** Netlify Functions (Netlify v5)
- **Build Tool:** Vite

## 🚀 Inicialização do Laboratório

Para rodar o projeto localmente, siga os passos:

1. **Clonagem do sinal:**
   ```bash
   git clone https://github.com/cristian-souza/laboratorio-gamificacao.git
   ```

2. **Instalação de dependências:**
   ```bash
   npm install
   ```

3. **Iniciar transmissão (Modo Dev):**
   ```bash
   npm run dev
   ```

4. **Compilação de produção:**
   ```bash
   npm run build
   ```

## 📁 Estrutura de Arquivos

```text
src/
├── assets/       # Ativos estáticos (SVG, Ícones, Imagens)
├── components/   # Módulos de interface (LaboratoryBackground, SpecimenCard, Terminal, etc.)
├── hooks/        # Lógica de conexão (GitHub API, MouseTilt, etc.)
├── layouts/      # Estrutura base da aplicação (AppLayout)
└── pages/        # Setores do laboratório (Home, Projects, About, Contact)
```

---
**Status:** Operacional // **Desenvolvido por:** [Cristian Souza](https://github.com/cristian-souza)
