document.getElementById("ask-button").addEventListener("click", function() {
    const question = document.getElementById("question").value.trim();
    
    if (question === "") {
        alert("Пожалуйста, введи свой вопрос.");
        return;
    }

    // Запускаем звук
    const magicSound = document.getElementById("magic-sound");
    magicSound.play();

    // Запускаем анимацию вращения
    const ball = document.querySelector(".ball");
    ball.classList.add("spin");

    // Удаляем класс spin через 2 секунды, чтобы анимация могла перезапускаться
    setTimeout(() => {
        ball.classList.remove("spin");
    }, 2000);

    // Список ответов: 50% положительных, 25% нейтральных, 25% отрицательных
    const positiveAnswers = [
        "Ты на верном пути!", "Без сомнений!", "Определенно стоит попробовать.", 
        "Твоя интуиция тебя не подводит.", "Это принесет успех!", "Смело двигайся вперёд!",
        "Это твой шанс.", "Всё сложится так, как нужно.", "Скоро всё станет понятно.", 
        "Тебя ждёт удача!", "Да, и это будет весело!", "Ты точно готов к этому.", 
        "Абсолютно!", "Идея просто отличная!", "Непременно!", "Риск оправдан!", 
        "Жизнь поддерживает тебя в этом.", "Время действовать!", "Положительно.", 
        "Да, и успех не за горами!"
    ];

    const neutralAnswers = [
        "Ответ пока туманен. Попробуй позже.", "Не торопись, время покажет.",
        "Пока не могу сказать, слишком рано.", "Задай этот вопрос завтра.",
        "Скорее всего, но нужно больше времени.", "Подумай ещё раз перед принятием решения.",
        "Это будет зависеть от обстоятельств.", "Неопределенно. Будь готов к сюрпризам.",
        "Ответ где-то на грани.", "Лучше переспросить позже."
    ];

    const negativeAnswers = [
        "Нет, не лучший момент.", "Не стоит тратить на это время.",
        "Твои ожидания могут не оправдаться.", "Лучше избегать этого сейчас.",
        "Не рассчитывай на это.", "Сомневаюсь, что это удачная идея.",
        "Планы могут пойти не так, как задумано.", "Риски слишком велики.",
        "Скорее всего, это не приведет к успеху.", "Ответ – нет, найди другой путь."
    ];

    // Выбираем тип ответа
    let answerType;
    const randomNumber = Math.random();
    if (randomNumber < 0.5) {
        answerType = positiveAnswers;
    } else if (randomNumber < 0.75) {
        answerType = neutralAnswers;
    } else {
        answerType = negativeAnswers;
    }

    // Выбираем случайный ответ из выбранного типа
    const answer = answerType[Math.floor(Math.random() * answerType.length)];

    // Обновляем текст на экране шара
    setTimeout(() => {
        document.getElementById("answer").textContent = answer; // Обновление текста на экране

        // Сохраняем вопрос и ответ в истории
        addToHistory(question, answer);
    }, 1000);
});

// Функция для добавления вопроса и ответа в историю
function addToHistory(question, answer) {
    const historyList = document.getElementById("history-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Вопрос:</strong> ${question} <br> <strong>Ответ:</strong> ${answer}`;
    historyList.appendChild(listItem);
}

// Регистрация Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('Service Worker зарегистрирован:', registration);
        })
        .catch(function(error) {
          console.log('Ошибка регистрации Service Worker:', error);
        });
    });
  }
  