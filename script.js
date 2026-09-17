const questions = [
  {
    text: "K, L, M ve N bölgeleri dikkate alındığında, yeşil alan oranı arttıkça AQI değerinin düşmesi güçlü ve negatif yönlü bir ilişkiye işaret eder.",
    answer: true,
    solution: "Doğru. Yeşil alan oranı %5'ten %32'ye çıkarken AQI 155'ten 45'e düşmektedir. Değişkenler ters yönde ve düzenli değiştiği için güçlü negatif ilişki vardır."
  },
  {
    text: "P bölgesinde yeşil alan oranı yüksek olmasına rağmen AQI değerinin de yüksek olması, yeşil alanın hava kirliliğinin tek nedeni olduğu yorumunu sorgulatır.",
    answer: true,
    solution: "Doğru. P bölgesi genel eğilimin dışındadır. Ağır sanayi gibi farklı değişkenler hava kalitesini etkiliyor olabilir."
  },
  {
    text: "Grafik, bütün çevre yatırımlarının yalnızca ağaçlandırmaya ayrılması gerektiğini kesin olarak kanıtlar.",
    answer: false,
    solution: "Yanlış. Grafik iki değişken arasında ilişki gösterir; ancak tek başına neden-sonuç ilişkisi kanıtlamaz. P bölgesi başka etkenlerin de dikkate alınması gerektiğini gösterir."
  }
];

let correctCount = 0;
let answeredCount = 0;

const questionsArea = document.getElementById("questions");

questions.forEach(function (question, index) {
  const card = document.createElement("article");
  card.className = "question-card";

  card.innerHTML = `
    <p class="question-text">
      <span class="question-number">${index + 1}</span>
      ${question.text}
    </p>

    <div class="answer-buttons">
      <button class="true-button" type="button">✓ Doğru</button>
      <button class="false-button" type="button">✕ Yanlış</button>
    </div>

    <p class="result"></p>

    <button class="solution-button" type="button">
      Çözümü Göster
    </button>

    <div class="solution">
      <strong>Çözüm:</strong> ${question.solution}
    </div>
  `;

  const trueButton = card.querySelector(".true-button");
  const falseButton = card.querySelector(".false-button");
  const result = card.querySelector(".result");
  const solutionButton = card.querySelector(".solution-button");
  const solution = card.querySelector(".solution");

  function checkAnswer(selectedAnswer) {
    if (card.dataset.answered === "true") {
      return;
    }

    card.dataset.answered = "true";
    answeredCount++;

    trueButton.disabled = true;
    falseButton.disabled = true;

    if (selectedAnswer === question.answer) {
      correctCount++;
      result.textContent = "Harika! Doğru karar verdin.";
      result.classList.add("correct");
    } else {
      result.textContent = "Bu ifade için doğru karar diğer seçenekteydi.";
      result.classList.add("wrong");
    }

    solutionButton.style.display = "inline-block";

    if (answeredCount === questions.length) {
      document.getElementById("scoreText").textContent =
        correctCount + " / " + questions.length;

      document.getElementById("finishBox").style.display = "block";
    }
  }

  trueButton.addEventListener("click", function () {
    checkAnswer(true);
  });

  falseButton.addEventListener("click", function () {
    checkAnswer(false);
  });

  solutionButton.addEventListener("click", function () {
    if (solution.style.display === "block") {
      solution.style.display = "none";
      solutionButton.textContent = "Çözümü Göster";
    } else {
      solution.style.display = "block";
      solutionButton.textContent = "Çözümü Gizle";
    }
  });

  questionsArea.appendChild(card);
});

document.getElementById("themeButton").addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    this.textContent = "☀️ Gündüz Modu";
  } else {
    this.textContent = "🌙 Gece Modu";
  }
});

document.getElementById("restartButton").addEventListener("click", function () {
  window.location.reload();
});