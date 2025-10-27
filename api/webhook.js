// api/webhook.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    return res.status(200).json({ ok: true });
  }

  res.status(200).send("🤖 Telegram Webhook активен!");
}
