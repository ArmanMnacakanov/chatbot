let userName = ""; // "память" для имени


document.getElementById("send_btn").addEventListener("click", handleMessage);
function handleMessage() {
  const input = document.getElementById("message");
  const text = input.value.trim();
  const chat = document.querySelector(".chat");
  const help = document.querySelector(".help");
  
const input = document.querySelector('input');
input.addEventListener('focus', () => {
  setTimeout(() => {
    scrollToBottom();
  }, 100); // Небольшая задержка помогает на мобильных
});
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
    const nameMatch = lower.match(/My name is (.+)/i);
    if (nameMatch) {
      userName = nameMatch[1];
      reply = `Nice to meet you, ${userName}!`;
    }

    // Ответ на "кто я"
    else if (lower.includes("Who am i")) {
      reply = userName ? `You are ${userName}.` : "I don't know yet. What's your name?";
    }

    // Приветствие
    else if (/(Hello|Hi|Hey)/.test(lower)) {
      reply = "Hello! How can I help you?";
    }

    // Погода (заглушка)
    else if (/Weather in (.+)/.test(lower)) {
      const city = lower.match(/weather in (.+)/)[1];
      reply = `I can't check weather for ${city} yet, but maybe it's sunny! ☀️`;
    }

    // Разработчик
    else if (lower.includes("I'm a developer")) {
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

window.addEventListener('resize', () => {
  // при изменении размеров (в том числе из-за клавиатуры)
  scrollToBottom();
});
