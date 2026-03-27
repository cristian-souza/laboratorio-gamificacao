import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  // Apenas aceita requisições POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método não permitido" }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body || "{}");

    // Validação básica dos campos
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Todos os campos são obrigatórios" }),
      };
    }

    const { data, error } = await resend.emails.send({
        from: "Laboratorio Gamificacao <onboarding@resend.dev>", // Ou seu domínio verificado
        to: "cristiansouza_dev@outlook.com", // Seu e-mail de destino
        subject: `[Contato Site] ${subject}`,
        replyTo: email,
        html: `
        <h2>Nova mensagem recebida do site</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      console.error("Erro no Resend:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Erro ao enviar e-mail via Resend" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mail enviado com sucesso!", id: data?.id }),
    };
  } catch (error) {
    console.error("Erro na função:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno no servidor" }),
    };
  }
};
