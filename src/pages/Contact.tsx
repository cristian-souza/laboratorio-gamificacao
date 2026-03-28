import { useState } from 'react';
import { Mail, Briefcase, ArrowRight, Zap, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Falha na transmissão');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
      <div className="p-8 md:p-12 pb-32 flex flex-col max-w-7xl mx-auto w-full relative">
          <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-tertiary-container rounded-sm animate-pulse"></div>
                  <span className="font-display text-[0.55rem] text-tertiary-container uppercase tracking-[0.2rem]">
                      ACESSO_AUTORIZADO // SETOR 7
                  </span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl text-on-surface font-bold tracking-[-0.02em] leading-tight">
                  Central de <br />
                  <span className="bg-gradient-to-r from-tertiary-container to-tertiary text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(0,251,64,0.3)]">
                      Comunicação
                  </span>
              </h1>
          </header>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">
              <section className="flex-1 flex flex-col gap-6 order-2 lg:order-1">
                  <div className="border-b-[0.5px] border-outline-variant/30 pb-4 mb-2">
                      <h2 className="font-display text-lg text-primary uppercase tracking-[0.1rem] flex items-center gap-3">
                          <Mail size={18} /> INICIAR TRANSMISSÃO SEGURA
                      </h2>
                  </div>

                  <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-2">
                          <label className="font-display text-[0.55rem] text-on-surface-variant uppercase tracking-[0.15rem]">
                              IDENTIFICAÇÃO
                          </label>
                          <input
                              type="text"
                              placeholder="NOME_OU_CODINOME"
                              required
                              disabled={status === "sending"}
                              value={formData.name}
                              onChange={(e) =>
                                  setFormData({
                                      ...formData,
                                      name: e.target.value,
                                  })
                              }
                              className="bg-surface-low border-[0.5px] border-outline-variant/50 p-4 font-body text-sm text-on-surface focus:outline-none focus:border-tertiary-container transition-colors placeholder:font-display placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-on-surface-variant/40 disabled:opacity-50"
                          />
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="font-display text-[0.55rem] text-on-surface-variant uppercase tracking-[0.15rem]">
                              SINAL_DE_RETORNO (E-MAIL)
                          </label>
                          <input
                              type="email"
                              placeholder="ENDEREÇO_PARA_RESPOSTA"
                              required
                              disabled={status === "sending"}
                              value={formData.email}
                              onChange={(e) =>
                                  setFormData({
                                      ...formData,
                                      email: e.target.value,
                                  })
                              }
                              className="bg-surface-low border-[0.5px] border-outline-variant/50 p-4 font-body text-sm text-on-surface focus:outline-none focus:border-tertiary-container transition-colors placeholder:font-display placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-on-surface-variant/40 disabled:opacity-50"
                          />
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="font-display text-[0.55rem] text-on-surface-variant uppercase tracking-[0.15rem]">
                              FREQUÊNCIA DO SINAL (ASSUNTO)
                          </label>
                          <input
                              type="text"
                              placeholder="OBJETIVO_DA_CONEXÃO"
                              required
                              disabled={status === "sending"}
                              value={formData.subject}
                              onChange={(e) =>
                                  setFormData({
                                      ...formData,
                                      subject: e.target.value,
                                  })
                              }
                              className="bg-surface-low border-[0.5px] border-outline-variant/50 p-4 font-body text-sm text-on-surface focus:outline-none focus:border-tertiary-container transition-colors placeholder:font-display placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-on-surface-variant/40 disabled:opacity-50"
                          />
                      </div>

                      <div className="flex flex-col gap-2">
                          <label className="font-display text-[0.55rem] text-on-surface-variant uppercase tracking-[0.15rem]">
                              DADOS DA MENSAGEM
                          </label>
                          <textarea
                              rows={5}
                              placeholder="CONTEÚDO_CRIPTOGRAFADO..."
                              required
                              disabled={status === "sending"}
                              value={formData.message}
                              onChange={(e) =>
                                  setFormData({
                                      ...formData,
                                      message: e.target.value,
                                  })
                              }
                              className="bg-surface-low border-[0.5px] border-outline-variant/50 p-4 font-body text-sm text-on-surface focus:outline-none focus:border-tertiary-container transition-colors resize-none placeholder:font-display placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-on-surface-variant/40 disabled:opacity-50"
                          />
                      </div>

                      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
                          <div className="flex-1">
                              {status === "success" && (
                                  <div className="flex items-center gap-2 text-tertiary-container animate-in fade-in slide-in-from-left-2">
                                      <CheckCircle2 size={18} />
                                      <span className="font-display text-[0.65rem] uppercase tracking-[0.1rem]">
                                          Transmissão concluída com sucesso!
                                      </span>
                                  </div>
                              )}
                              {status === "error" && (
                                  <div className="flex items-center gap-2 text-secondary-container animate-in fade-in slide-in-from-left-2">
                                      <AlertTriangle size={18} />
                                      <span className="font-display text-[0.65rem] uppercase tracking-[0.1rem]">
                                          Falha na transmissão. Tente novamente.
                                      </span>
                                  </div>
                              )}
                          </div>

                          <button
                              type="submit"
                              disabled={status === "sending"}
                              className={`flex items-center justify-between border-[0.5px] p-4 transition-all group w-full md:w-[240px] ${
                                  status === "sending"
                                      ? "border-outline-variant text-on-surface-variant cursor-not-allowed"
                                      : "border-tertiary-container text-tertiary-container hover:bg-tertiary-container/10"
                              }`}
                          >
                              <span className="font-display text-xs tracking-[0.1rem] font-bold">
                                  {status === "sending"
                                      ? "TRANSMITINDO..."
                                      : "TRANSMITIR DADOS"}
                              </span>
                              {status === "sending" ? (
                                  <Loader2 size={16} className="animate-spin" />
                              ) : (
                                  <ArrowRight
                                      size={16}
                                      className="group-hover:translate-x-1 transition-transform"
                                  />
                              )}
                          </button>
                      </div>
                  </form>
              </section>

              <section className="w-full lg:w-[320px] flex flex-col gap-8 order-1 lg:order-2">
                  <div className="border-[0.5px] border-outline-variant/30 p-8 flex flex-col gap-6 bg-surface-low/50 relative overflow-hidden">
                      <div className="absolute -top-4 -right-4 w-24 h-24 border border-tertiary-container/10 rounded-full" />
                      <div className="absolute -top-8 -right-8 w-40 h-40 border border-tertiary-container/5 rounded-full" />

                      <h3 className="font-display text-sm text-on-surface uppercase tracking-[0.15rem] border-b-[0.5px] border-outline-variant/30 pb-3">
                          REDES DE CONTATO
                      </h3>

                      <ul className="flex flex-col gap-4">
                          <li>
                              <a
                                  href="https://github.com/cristian-souza"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 group"
                              >
                                  <div className="w-10 h-10 border-[0.5px] border-outline-variant/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                                      <Zap
                                          size={16}
                                          className="text-on-surface-variant group-hover:text-primary transition-colors"
                                      />
                                  </div>
                                  <span className="font-display text-[0.65rem] tracking-[0.15rem] text-on-surface-variant group-hover:text-primary transition-colors">
                                      TERMINAL_GITHUB
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://www.linkedin.com/in/cristian-mm-souza"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 group"
                              >
                                  <div className="w-10 h-10 border-[0.5px] border-outline-variant/50 flex items-center justify-center group-hover:border-[#0A66C2] group-hover:bg-[#0A66C2]/5 transition-colors">
                                      <Briefcase
                                          size={16}
                                          className="text-on-surface-variant group-hover:text-[#0A66C2] transition-colors"
                                      />
                                  </div>
                                  <span className="font-display text-[0.65rem] tracking-[0.15rem] text-on-surface-variant group-hover:text-white transition-colors">
                                      REDE_LINKEDIN
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://www.instagram.com/cristianmsouza/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 group"
                              >
                                  <div className="w-10 h-10 border-[0.5px] border-outline-variant/50 flex items-center justify-center group-hover:border-secondary-container group-hover:bg-secondary-container/5 transition-colors">
                                      <FaInstagram
                                          size={16}
                                          className="text-on-surface-variant group-hover:text-secondary-container transition-colors"
                                      />
                                  </div>
                                  <span className="font-display text-[0.65rem] tracking-[0.15rem] text-on-surface-variant group-hover:text-secondary-container transition-colors">
                                      REDE_INSTAGRAM
                                  </span>
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://wa.me/5592993039924"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-4 group"
                              >
                                  <div className="w-10 h-10 border-[0.5px] border-outline-variant/50 flex items-center justify-center group-hover:border-tertiary-container group-hover:bg-tertiary-container/5 transition-colors">
                                      <FaWhatsapp
                                          size={16}
                                          className="text-on-surface-variant group-hover:text-tertiary-container transition-colors"
                                      />
                                  </div>
                                  <span className="font-display text-[0.65rem] tracking-[0.15rem] text-on-surface-variant group-hover:text-tertiary-container transition-colors">
                                      SINAL_WHATSAPP
                                  </span>
                              </a>
                          </li>
                      </ul>
                  </div>

                  <div className="border-l-[2px] border-tertiary-container p-4 bg-tertiary-container/10">
                      <span className="font-display text-[0.55rem] text-tertiary-container uppercase tracking-[0.1rem] block mb-1">
                          PROTOCOLO_RECEPÇÃO:
                      </span>
                      <p className="font-display text-[0.65rem] text-white tracking-[0.1rem] leading-relaxed">
                          TEMPO DE RESPOSTA ESTIMADO: <br />
                          <span className="text-tertiary-container font-bold">
                              &lt; 24 HORAS CICLO TERRESTRE
                          </span>
                      </p>
                  </div>
              </section>
          </div>
      </div>
  );
}
