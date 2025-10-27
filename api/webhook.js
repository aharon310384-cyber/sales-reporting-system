// api/webhook.js

export default async function handler(req, res) {
  try {
    // ✅ Telegram всегда отправляет POST-запрос с обновлениями
    if (req.method === "POST") {
      const body = req.body;

      console.log("🔹 Получено сообщение от Telegram:", body);

      // Проверяем, есть ли текстовое сообщение
      if (body.message && body.message.text) {
        const chatId = body.message.chat.id;
        const userText = body.message.text.trim();

        let replyText = "";

        // Простая логика команд
        if (userText === "/start") {
          replyText = "👋 Привет! Я бот системы отчетов Sales Reporting System.\nОтправь команду /report, чтобы получить последние данные.";
        } else if (userText === "/help") {
          replyText = "📘 Доступные команды:\n/start — запуск бота\n/report — получить отчёт о продажах\n/help — список команд";
        } else if (userText === "/report") {
          replyText = "📊 Отчёт о продажах пока тестируется, но скоро будет доступен!";
        } else {
          replyText = `Привет! 👋 Вы написали: "${userText}"`;
        }

        // Отправляем ответ пользователю
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: replyText,
          }),
        });
      }

      // Telegram требует, чтобы сервер ответил 200 OK
      return res.status(200).json({ ok: true });
    }

    // Если кто-то просто откроет URL в браузере
    return res.status(200).send("🤖 Telegram Webhook активен и готов принимать сообщения!");
  } catch (error) {
    console.error("❌ Ошибка в обработчике:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
