import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

mercadopago.configurations.setAccessToken(APP_USR-8792764793047739-021523-d3f366e01d1f05bdab52560161304b9d-98956509);

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando 🚀");
});
