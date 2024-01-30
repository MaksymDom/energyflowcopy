import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

const form = document.querySelector(".footer-form");
const emailInput = document.querySelector(".footer-form-input");

const emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

form.addEventListener("submit", async function (e) {
  e.preventDefault(); 

  const email = emailInput.value.trim();

  if (!emailPattern.test(email)) {
    showError("Invalid email address");
    form.reset();
    return;
  }
  try {
    const subscribe = await fetch("https://energyflow.b.goit.study/api/subscription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (subscribe.ok) {
      form.reset();
      showSend();
    } else {
      showError();
    }
  } catch (error) {
    showError();
  }
});

function showSend() {
  iziToast.info({
    title: "Info",
    message:
      "We're excited to have you on board! 🎉 Thank you for subscribing to new exercises on Energy Flow. You've just taken a significant step towards improving your fitness and well-being.",
  });
}

function showError() {
  iziToast.error({
    title: "Error",
    message:
      "Sorry, there was an error sending your address. Please try again!",
  });
}