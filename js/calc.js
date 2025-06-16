// Continue making the fucking industry

const calcButton = document.getElementById('show__btn1');
document.querySelector('.calc__result').style.display = 'none'; // Скрываем блок с результатом при загрузке страницы

calcButton.addEventListener('click', function() {
    console.log('Button clicked');
    const name = document.getElementById('name').value.trim();
    const gender = document.getElementById('male').checked ? 'male' : (document.getElementById('female').checked ? 'female' : null);
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const productName = document.getElementById('product__name').value.trim().toLowerCase();
    const errorMessage = document.getElementById('error__calc-result');
    const resultCalcDiv = document.getElementById('result__calc-div');


    if (!name || !gender || !age || !weight || !height || !productName) {
    errorMessage.innerHTML = '<p class="calc__error" style="text-align:center; color:red;">Пожалуйста, заполните все поля.</p>';
    return;
    };

    fetch('productsCalc.json').then(response => response.json()).then(products => {
    const product = products.find(p => p.name.toLowerCase().includes(productName));

    if (!product) {
        resultCalcDiv.innerHTML = `<p style="text-align:center; color:red;">Продукт "${productName}" не найден в базе данных.</p>`;
        return;
      }

    let recommendedCalories = gender === 'male' ? 30 : 25;
    
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
    .catch(error => {
      resultCalcDiv.innerHTML = `<p style="color:red;">Ошибка загрузки данных: ${error.message}</p>`;
    });
    // успешный ввод — запускаем анимацию
    document.querySelector('.calc__result').style.display = 'block'; // Показываем блок с результатом
    // document.querySelector('.calc').style.margin = 'auto';
    document.getElementById('calc__wrapper').classList.add('calc__wrapper');
    document.querySelector('.calc__wrapper').classList.add('active');
});

