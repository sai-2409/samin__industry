// Continue making the fucking industry

const calcButton = document.getElementById("show__btn1");
document.querySelector(".calc__result").style.display = "none"; // Скрываем блок с результатом при загрузке страницы

calcButton.addEventListener("click", function () {
  console.log("Button clicked");
  const name = document.getElementById("name").value.trim();
  const gender = document.getElementById("male").checked
    ? "male"
    : document.getElementById("female").checked
    ? "female"
    : null;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const productName = document
    .getElementById("product__name")
    .value.trim()
    .toLowerCase();
  const errorMessage = document.getElementById("error__calc-result");
  const resultCalcDiv = document.getElementById("result__calc-div");

  if (!name || !gender || !age || !weight || !height || !productName) {
    errorMessage.innerHTML =
      '<p class="calc__error" style="text-align:center; color:red;">Пожалуйста, заполните все поля.</p>';
    return;
  }

  fetch("productsCalc.json")
    .then((response) => response.json())
    .then((products) => {
      const product = products.find((p) =>
        p.name.toLowerCase().includes(productName)
      );

      if (!product) {
        resultCalcDiv.innerHTML = `<p style="text-align:center; color:red;">Продукт "${productName}" не найден в базе данных.</p>`;
        return;
      }

      let recommendedCalories = gender === "male" ? 30 : 25;

      // Дополнительные корректировки
      if (weight < 50) recommendedCalories -= 5;
      if (age < 18) recommendedCalories -= 5;
      if (age > 60) recommendedCalories -= 5;
      recommendedCalories = Math.max(15, recommendedCalories);

      // Вывод
      resultCalcDiv.innerHTML = `
        <p><strong>${name}</strong>, ваша рекомендуемая норма потребления продукта <strong>${product.name}</strong>:</p>
        <p class="recommended-calories">${recommendedCalories} ккал в день</p>
        <hr>
        <p><strong>КБЖУ (на 100 г):</strong></p>
        <ul>
          <li>Калорийность: ${product.calories} ккал</li>
          <li>Белки: ${product.protein} г</li>
          <li>Жиры: ${product.fat} г</li>
          <li>Углеводы: ${product.carbs} г</li>
        </ul>
        <p><strong>Страна происхождения:</strong> ${product.origin}</p>
      `;
    })
    .catch((error) => {
      resultCalcDiv.innerHTML = `<p style="color:red;">Ошибка загрузки данных: ${error.message}</p>`;
    });
  // успешный ввод — запускаем анимацию
  document.querySelector(".calc__result").style.display = "block"; // Показываем блок с результатом
  // document.querySelector('.calc').style.margin = 'auto';
  document.getElementById("calc__wrapper").classList.add("calc__wrapper");
  document.querySelector(".calc__wrapper").classList.add("active");

  // Beautiful page-turning animation for results
  animateCalculatorResults();
});

// Beautiful page-turning animation function
function animateCalculatorResults() {
  const resultContainer = document.querySelector('.calc__result');
  const resultContent = document.getElementById('result__calc-div');
  
  if (!resultContainer || !resultContent) return;
  
  // Set initial state for page-turning effect
  resultContainer.style.transform = 'rotateY(-90deg)';
  resultContainer.style.transformOrigin = 'left center';
  resultContainer.style.opacity = '0';
  resultContainer.style.perspective = '1000px';
  
  // Create a beautiful page-turning animation
  gsap.to(resultContainer, {
    rotateY: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power2.out",
    onComplete: () => {
      // Animate the content inside the result
      animateResultContent(resultContent);
    }
  });
}

// Animate the content inside the result container
function animateResultContent(content) {
  // Get all text elements
  const textElements = content.querySelectorAll('p, ul, li, strong');
  
  // Set initial state
  gsap.set(textElements, {
    opacity: 0,
    x: -30,
    rotationY: -15
  });
  
  // Animate each element with stagger
  gsap.to(textElements, {
    opacity: 1,
    x: 0,
    rotationY: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  });
  
  // Special animation for the recommended calories
  const recommendedCalories = content.querySelector('.recommended-calories');
  if (recommendedCalories) {
    gsap.fromTo(recommendedCalories, 
      { 
        scale: 0.5, 
        color: '#FFC338',
        textShadow: '0 0 20px rgba(255, 195, 56, 0.8)'
      },
      { 
        scale: 1, 
        color: 'inherit',
        textShadow: 'none',
        duration: 0.8,
        ease: "back.out(1.7)"
      }
    );
  }
}
