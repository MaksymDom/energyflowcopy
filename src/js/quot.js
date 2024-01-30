// import { getQuote } from "./api";

// document.addEventListener("DOMContentLoaded", function () {
//   const storedQuote = localStorage.getItem("quote");
//   const storedDate = localStorage.getItem("quoteDate");

//   if (storedQuote && storedDate && new Date().toISOString().split('T')[0] === storedDate) {
//     displayQuote(JSON.parse(storedQuote));
//   } else {
//     fetchQuoteFromBackend();
//   }
// });

// function fetchQuoteFromBackend() {
//   getQuote()
//     .then(({ author, quote }) => {
//       displayQuote({ author, quote });
//       localStorage.setItem("quote", JSON.stringify({ author, quote }));
//       localStorage.setItem("quoteDate", new Date().toISOString().split('T')[0]);
//     })
//     .catch(error => {
//       console.error("Error fetching quote:", error);
//     });
// }

// function displayQuote(quoteData) {
//   const quoteTextElement = document.querySelector(".quot-text");
//   const quoteAuthorElement = document.querySelector(".quot-author");
//     quoteTextElement.textContent = quoteData.quote;
//     quoteAuthorElement.textContent = quoteData.author;
  
// }


document.addEventListener("DOMContentLoaded", async function () {
  try {
    const storedQuote = localStorage.getItem("quote");
    const storedDate = localStorage.getItem("quoteDate");

    if (storedQuote && storedDate && new Date().toISOString().split('T')[0] === storedDate) {
      displayQuote(JSON.parse(storedQuote));
    } else {
      const quoteData = await fetchQuoteFromBackend();
      displayQuote(quoteData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function fetchQuoteFromBackend() {
  try {
    const { author, quote } = await getQuote(); 
    localStorage.setItem("quote", JSON.stringify({ author, quote }));
    localStorage.setItem("quoteDate", new Date().toISOString().split('T')[0]);
    return { author, quote };
  } catch (error) {
    throw error; 
  }
}

function displayQuote(quoteData) {
  const quoteTextElement = document.querySelector(".quot-text");
  const quoteAuthorElement = document.querySelector(".quot-author");
  quoteTextElement.textContent = quoteData.quote;
  quoteAuthorElement.textContent = quoteData.author;
}


async function getQuote() {
  try {
    const response = await fetch("https://energyflow.b.goit.study/api/quote");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching quote:", error);
    throw error;
  }
}