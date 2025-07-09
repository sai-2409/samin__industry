window.addEventListener("load", () => {
  const waitForYaPay = setInterval(() => {
    const myButton = document.getElementById("my-custom-pay-btn");
    const yandexPayContainer = document.getElementById("yandex-pay-button");

    if (!myButton || !yandexPayContainer) return;

    if (typeof window.YaPay === "undefined" || typeof YaPay.Checkout !== "function") {
      console.log("Ждём SDK...");
      return;
    }

    clearInterval(waitForYaPay); // всё есть → продолжаем

    const checkout = new YaPay.Checkout({
      publicId: "54281716-0b74-4b0e-bf61-bc6c45b67f5c",
      amount: {
        value: "657.00",
        currency: "RUB"
      },
      title: "Оплата заказа в SAMIN",
      description: "Орехи и сухофрукты от Samin",
      confirmation: {
        type: "redirect",
        return_url: "https://samin.ru/payment-success"
      },
      customer: {
        email: "test@example.com"
      }
    });

    checkout.renderButton({
      container: "#yandex-pay-button",
      type: "pay",
      theme: "black"
    });

    myButton.addEventListener("click", () => {
      const sdkButton = yandexPayContainer.querySelector("button");
      if (sdkButton) sdkButton.click();
      else console.error("SDK-кнопка не отрендерилась");
    });
  }, 300);
});
