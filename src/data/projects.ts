import type { ProjectData } from "../components/SpecimenCard";

export const projectsData: ProjectData[] = [
  {
    id: "042_ALFA",
    title: "PROTOCOLO NEURAL",
    description: "Otimização da latência em sistemas de controle distribuído através de redes neurais sintéticas aplicadas a hardware legado.",
    details: "Implementação de uma camada de tradução binária executada via WASM para processamento paralelo de 1.4 tera-instruções.",
    coords: "COORD: 45.2 // 98.7",
    status: "OPERACIONAL",
    featured: true,
    progress: 100,
    tags: ["REACT.JS", "THREE.JS", "GSAP"]
  },
  {
    id: "087_BETA",
    title: "BIOSFERA DIGITAL",
    description: "Criação de ecossistemas auto-gerenciáveis que reagem à presença do usuário, simulando evolução orgânica em código.",
    details: "Desenvolvimento de shaders procedurais para renderização volumétrica de formas de vida baseadas em fractais de Mandelbrot.",
    coords: "COORD: 12.8 // 34.2",
    status: "CLASSIFICADO",
    featured: true,
    progress: 100,
    tags: ["NODE.JS", "WEBCRYPTO", "REDIS"]
  },
  {
    id: "009_NEBULA",
    title: "PROJETO_NEBULA",
    description: "Integração de dados massivos em ambiente de nuvem distribuída com redundância bio-sintética.",
    coords: "COORD: 88.1 // 12.4",
    status: "INTEGRAÇÃO DE DADOS",
    progress: 62,
    eta: "48H",
    tags: ["CLOUD", "DISTRIBUTED"]
  },
  {
    id: "012_CORE",
    title: "CORE_SYNC",
    description: "Compilação de núcleos de processamento reativos para interfaces de ultra-alta definição.",
    coords: "COORD: 33.5 // 67.9",
    status: "COMPILAÇÃO BIO-SINTÉTICA",
    progress: 87,
    eta: "12H",
    tags: ["CORE", "HD_UI"]
  },
  {
    id: "001_ECO",
    title: "ECO_LOG",
    description: "Sistema de monitoramento ambiental e log de eventos biológicos em tempo real.",
    coords: "COORD: 01.2 // 99.9",
    status: "ESTÁVEL",
    progress: 100,
    tags: ["LOGGING", "ECO_SYSTEM"]
  }
];
