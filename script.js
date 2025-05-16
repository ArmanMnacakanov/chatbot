let userName = ""; // "память" для имени

document.getElementById("send_btn").addEventListener("click", handleMessage);

function handleMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  const chat = document.querySelector(".chat");
  const help = document.querySelector(".help");

  if (!text) return;
  input.value = "";

  // Отображаем сообщение пользователя
  addMessage(text, "usermessage");

  // Автоскролл
  scrollToBottom();

  // Показать "бот печатает..."
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.textContent = "Bot is typing...";
  chat.appendChild(typing);
  scrollToBottom();

  setTimeout(() => {
    chat.removeChild(typing); // убрать "печатает..."
    const lower = text
    let reply = "";

    // Обработка имени
    const nameMatch = lower.match(/my name is (.+)/i);
    if (nameMatch) {
      userName = nameMatch[1];
      reply = `Nice to meet you, ${userName}!`;
    }

    // Ответ на "кто я"
    else if (lower.includes("who am i")) {
      reply = userName ? `You are ${userName}.` : "I don't know yet. What's your name?";
    }

    // Приветствие
    else if (/(hello|hi|hey)/.test(lower)) {
      reply = "Hello! How can I help you?";
    }

    // Погода (заглушка)
    else if (/weather in (.+)/.test(lower)) {
      const city = lower.match(/weather in (.+)/)[1];
      reply = `I can't check weather for ${city} yet, but maybe it's sunny! ☀️`;
    }

    // Разработчик
    else if (lower.includes("i'm a developer")) {
      reply = "That's awesome! Keep coding! 💻";
    }

    // Стандартный ответ
    else {
      reply = "I'm not sure how to respond to that. Try asking something else.";
    }

    // Добавить ответ бота
    addMessage(reply, "botmessage");
    scrollToBottom();
  }, 700);
}

function addMessage(text, className) {
  const chat = document.querySelector(".chat");
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  chat.appendChild(span);
}

function scrollToBottom() {
  const chat = document.querySelector(".chat");
  chat.scrollTop = chat.scrollHeight;
}
