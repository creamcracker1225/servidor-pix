import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

app.post("/criar-pix", async (req, res) => {
  try {
    const { item } = req.body;

    let valor = 0;
    let descricao = "";

    // 🔹 9 itens de R$2,00
    if (item >= 1 && item <= 9) {
      valor = 2.00;
      descricao = `Consulta ${item}`;
    }

    // 🔹 Leitura completa
    if (item === 99) {
      valor = 16.00;
      descricao = "Leitura Completa";
    }

    const pagamento = await mercadopago.payment.create({
      transaction_amount: valor,
      description: descricao,
      payment_method_id: "pix",
      payer: {
        email: "cliente@email.com"
      }
    });

    res.json({
      qr_code: pagamento.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        pagamento.body.point_of_interaction.transaction_data.qr_code_base64
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: "Erro ao criar pagamento" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
