# 🧪 Laboratório de Experimentos Digitais

Este projeto é um **portfólio gamificado** com estética futurista/cyberpunk, desenvolvido para explorar as fronteiras do desenvolvimento web moderno. Mais do que uma vitrine de projetos, é um ambiente de experimentação de UI/UX inspirado em interfaces táticas e sistemas operacionais avançados.

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite)

## 📡 Características do Protocolo

- **Interface Tática (UI/UX):** Design baseado em Material Design 3, adaptado para uma estética de "Laboratório Digital" com animações de pulso, barras de progresso dinâmicas e tipografia display impactante.
- **Sincronização Neural (GitHub API):** Consumo dinâmico de repositórios via API do GitHub, filtrando automaticamente projetos marcados com o tópico `portfolio`.
- **Módulo de Gamificação:** Sistema visual de XP (Experience Points) e níveis para representar proficiência técnica em diferentes tecnologias.
- **Central de Comunicação Segura:** Formulário de contato integrado com **Netlify Functions** e **Resend** para processamento de mensagens em tempo real.
- **Status do Sistema:** Componentes de monitoramento simulado que reforçam a imersão na temática tecnológica.

## 🛠️ Pilha Tecnológica

- **Core:** React 19 + TypeScript
- **Estilização:** Tailwind CSS (com configurações customizadas de cores e fontes)
- **Ícones:** Lucide React
- **Roteamento:** React Router DOM
- **Backend/Serverless:** Netlify Functions
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
├── components/   # Módulos de interface (SystemStatus, SpecimenCard, etc.)
├── hooks/        # Lógica de conexão (GitHub API, DataScrubber)
├── pages/        # Setores do laboratório (Home, Projects, Contact)
├── layouts/      # Estrutura base da aplicação
└── data/         # Protocolos e dados estáticos
```

---
**Status:** Operacional // **Desenvolvido por:** [Cristian Souza](https://github.com/cristian-souza)
