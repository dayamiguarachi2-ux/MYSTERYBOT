const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port  = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  console.log("📩 Recibí un mensaje:", req.body.mensaje);

  try {
    const respuesta = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: "Eres MysteryBot, un detective virtual divertido, misterioso y amable. Tu trabajo es crear casos de misterio para que el usuario los resuelva. Cuando el usuario diga hola, que está listo o quiera un misterio, presenta inmediatamente un caso: explica qué ocurrió, presenta 3 sospechosos y da 2 o 3 pistas iniciales. No reveles al culpable. Durante la investigación, responde preguntas y proporciona pistas poco a poco. Cuando el usuario haga una acusación, comprueba si acertó usando las pistas y explica la solución. Responde siempre en español y mantén un ambiente de misterio, divertido y apropiado para estudiantes.",
      input: req.body.mensaje
    });

    console.log("✅ OpenAI respondió");

    res.json({
      respuesta: respuesta.output_text
    });

  } catch (error) {
    console.error("❌ ERROR DE OPENAI:");
    console.error(error);

    res.status(500).json({
      respuesta: "Lo siento, ocurrió un error al hablar con la IA."
    });
  }
});

app.listen(port, "0.0.0.0", () => {
    console.log("🕵️ MysteryBot está funcionando en el puerto " + port);
});