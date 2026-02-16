import express from "express";
import mercadopago from "mercadopago";

const app = express();
app.use(express.json());

mercadopago.configurations.setAccessToken("TEST-8792764793047739-021521-2c4119148632c498853bdd52b6582929-98956509");

app.post("/criar-pix", async (req, res) => {
  try {
    const pagamento = await mercadopago.payment.create({
      transaction_amount: 10,
      description: "Leitura Espiritual",
      payment_method_id: "pix",
      payer: {
        email: "cliente@email.com"
      }
    });

    res.json({
      qr_code: pagamento.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: pagamento.body.point_of_interaction.transaction_data.qr_code_base64
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});



