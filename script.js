let userName = ""; // "память" для имени
const input = document.getElementById("message");
input.addEventListener("focus", () => {
  setTimeout(() => {
    scrollToBottom();
  }, 300);
});

window.addEventListener("resize", () => {
  setTimeout(() => {
    scrollToBottom();
  }, 300);
});

document.getElementById("send_btn").addEventListener("click", handleMessage);
function handleMessage() {
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
    const nameMatch = lower.match(/My name is (.+)/i);
    if (nameMatch) {
      userName = nameMatch[1];
      reply = `Nice to meet you, ${userName}!`;
    }

    // Ответ на "кто я"
    else if (lower.includes("Who am I")) {
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
    else if (lower.includes("Russian")) {
      reply = "Отлично, продолжаем на русском!";
    }
    else if (lower.includes("Что ты умеешь ?")) {
      reply = "В данный момент я умею только отвечать на вопросы";
    }
    else if (lower.includes("Как ты ?")) {
      reply = "Норм а ты как? как прощел день?";
    }
    else if (lower.includes("Норм немного устал просто")) {
      reply = "Понимяю ты устал, советую пить чай и отдохнуть, у тебя был сложный день";
    }
    else if (lower.includes("Я создаю сайты ")) {
      reply = "О это круто!! а какие сайты ты розработаешь ?";
    }
    else if (lower.includes("Разные, например лендинг или полноценный")) {
      reply = "О ты крут!! а на чем пишешь ?";
    }
    else if (lower.includes("HTML,Css,Js или PHP,MySql")) {
      reply = "Это Отлично!! Ты Молодец";
    }
    else if (lower.includes("По Армянский")) {
      reply = "Շատ լավ կշբվենք Հայերեն";
    }
    else if (lower.includes("Ին՞չ խորհուրդ ունես սկսնակների համր")) {
      reply = ՝Սկսնակ ծրագրավորողներին ես միշտ կտայի հետևյալ խորհուրդները ՝
        1․ Մի վախեցիր սխալվելուց  
          Սխալվելը սովորելու մի մասն են։
            
        2․ Մի ամաչիր օգնություն խնդրելուց
          Խնդիրներ ունենալը նորմալ է։
        3․ երբեք մի հանձնվիր 
          հանձնվելը քեզ կթուլացնի, ավելի խորացիր ու կկարողանաս՝;
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
  span.className == 'botmessage' ? document.querySelector('.botmp3').play() : document.querySelector('.usermp3').play()
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
