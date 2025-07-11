// document.addEventListener('DOMContentLoaded', function() {
//     // Example cart data, replace with your actual cart/order info
//     const paymentData = {
//         version: 1,
//         publicId: 'YOUR_YANDEX_PAY_PUBLIC_ID', // Replace with your public ID
//         merchant: {
//             id: 'YOUR_MERCHANT_ID', // Replace with your merchant ID
//             name: 'Samin Shop'
//         },
//         order: {
//             number: 'ORDER_ID', // Generate/order number
//             amount: 1000, // Amount in kopecks (e.g., 1000 = 10 RUB)
//             currency: 'RUB',
//             items: [
//                 {
//                     label: 'Product Name',
//                     price: 1000,
//                     quantity: 1,
//                     amount: 1000
//                 }
//             ]
//         },
//         paymentMethods: ['CARD'],
//         confirmation: {
//             type: 'redirect',
//             returnUrl: 'http://127.0.0.1:5000/payment-success'
//         }
//     };

//     const checkout = window.YandexPay.createCheckout(paymentData);

//     checkout.render('yandex-pay-container');

//     checkout.on('success', function(event) {
//         // Send payment info to backend for processing
//         fetch('/yandex-pay-callback', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(event.detail)
//         }).then(res => res.json())
//           .then(data => {
//               if (data.status === 'ok') {
//                   window.location.href = '/payment-success';
//               } else {
//                   alert('Ошибка при обработке платежа');
//               }
//           });
//     });
// });
window.addEventListener("load", () => {
  const buttonContainer = document.getElementById("yandex-pay-button");

  if (!window.YaPay || !buttonContainer) {
    console.warn("YaPay или контейнер не загружен");
    return;
  }

  const checkout = YaPay.Checkout({
    publicId: "54281716-0b74-4b0e-bf61-bc6c45b67f5c",
    amount: {
      value: "990.00",
      currency: "RUB"
    },
    title: "Оплата товара",
    description: "Ваш заказ на сайте Samin",
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
});
