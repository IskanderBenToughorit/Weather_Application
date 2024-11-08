
const weatherData = {
    "Tunis": [
      { weather: "Sunny \u2600", temp: 25, wind: "15 km/h" },
      { weather: "Cloudy \u2601", temp: 22, wind: "10 km/h" },
      { weather: "Rainy 🌧️", temp: 20, wind: "20 km/h" },
      { weather: "Partly Cloudy \u26C5", temp: 23, wind: "8 km/h" },
      { weather: "Sunny \u2600", temp: 26, wind: "12 km/h" }
    ],
    "Paris": [
      { weather: "Cloudy \u2601", temp: 18, wind: "18 km/h" },
      { weather: "Rainy 🌧️", temp: 16, wind: "22 km/h" },
      { weather: "Sunny \u2600", temp: 19, wind: "12 km/h" },
      { weather: "Partly Cloudy \u26C5", temp: 20, wind: "10 km/h" },
      { weather: "Cloudy \u2601", temp: 17, wind: "14 km/h" }
    ],
    "New York": [
      { weather: "Snow \u2744", temp: -2, wind: "25 km/h" },
      { weather: "Sunny \u2600", temp: 1, wind: "10 km/h" },
      { weather: "Cloudy \u2601", temp: 3, wind: "15 km/h" },
      { weather: "Rainy 🌧️", temp: 2, wind: "18 km/h" },
      { weather: "Snow Showers \u2744", temp: -1, wind: "20 km/h" }
    ]
  };
  
  // Function to display the weather
  function showWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.innerHTML = ""; // Clear previous forecasts

  
    if (weatherData[city]) {
      const today = new Date();
  
      weatherData[city].forEach((forecast, index) => {
        const dayDiv = document.createElement("div");
        dayDiv.className = "p-4 border rounded-lg bg-blue-50";
  
        const forecastDate = new Date(today);
        forecastDate.setDate(today.getDate() + index + 1);
        const formattedDate = `${String(forecastDate.getDate()).padStart(2, '0')}/${String(forecastDate.getMonth() + 1).padStart(2, '0')}`;
  
        dayDiv.innerHTML = `<h2 class="text-lg font-semibold text-blue-800">${city} - ${formattedDate}</h2>`;
        ["00:00", "06:00", "12:00", "18:00"].forEach(time => {
          dayDiv.innerHTML += `<p class="text-gray-600">${time} - ${forecast.weather}, ${forecast.temp}°C, Wind: ${forecast.wind}</p>`;
        });
  
        weatherContainer.appendChild(dayDiv);
        document.getElementById("sidebar").classList.remove("hidden")
        document.getElementById("lunar-calendar").classList.remove("hidden");
        document.getElementById("blog").classList.remove("hidden")
        document.getElementById("weatherQuiz").classList.remove("hidden");
        document.getElementById("subscribe").classList.remove("hidden");
        ;
      });
    } else {
      weatherContainer.innerHTML = `<p class="text-red-500 text-center font-semibold">City not found. Please enter Tunis, Paris, or New York.</p>`;
    }
    
    

  }
  
  // Function for subscription button
  function subscribeProduct() {
    alert("Your monthly subscription of 3 TND has been added to the cart. Please proceed to payment to complete the subscription.");
  }
// Fonction pour calculer la phase de la lune (approximation)
function getLunarPhase(date = new Date()) {
  const lunarCycleDays = 29.53; // Durée moyenne du cycle lunaire en jours
  const newMoon = new Date('2024-02-20'); // Date de la dernière nouvelle lune
  const diffDays = (date - newMoon) / (1000 * 60 * 60 * 24);
  const phase = (diffDays % lunarCycleDays) / lunarCycleDays;

  if (phase < 0.03 || phase > 0.97) return 'Nouvelle Lune 🌑';
  if (phase < 0.25) return 'Premier Croissant 🌒';
  if (phase < 0.5) return 'Premier Quartier 🌓';
  if (phase < 0.75) return 'Lune Gibbeuse 🌔';
  if (phase < 0.97) return 'Pleine Lune 🌕';
  return 'Dernier Quartier 🌗';
}

// Affiche les phases du cycle lunaire pour un mois
function showLunarCycle() {
  const moonPhasesList = document.getElementById("moonPhasesList");
  moonPhasesList.innerHTML = '';

  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const phase = getLunarPhase(date);
    const listItem = document.createElement("li");
    listItem.textContent = `${date.toLocaleDateString()} - ${phase}`;
    moonPhasesList.appendChild(listItem);
  }
}

// Affiche la prochaine éclipse (statique)
function showNextEclipse() {
  const eclipseInfo = document.getElementById("eclipseInfo");
  eclipseInfo.textContent = 'Prochaine éclipse lunaire le 18 septembre 2024.';
}

// Initialiser les informations du calendrier lunaire
function initLunarCalendar() {
  const lunarPhaseElement = document.getElementById("lunarPhase");
  lunarPhaseElement.textContent = `Phase actuelle de la lune : ${getLunarPhase()}`;

  showLunarCycle();
  showNextEclipse();
}

// Appel de la fonction à l'ouverture de la page
window.onload = initLunarCalendar;

function checkQuiz() {
  const answers = {
    q1: "b",  // La réponse correcte pour la question 1
    q2: "b",  // La réponse correcte pour la question 2
    q3: "b",  // La réponse correcte pour la question 3
    q4: "a"   // La réponse correcte pour la question 4
  };

  let score = 0;

  // Vérifier les réponses
  for (let i = 1; i <= 4; i++) {
    const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
    if (selectedAnswer && selectedAnswer.value === answers[`q${i}`]) {
      score++;
    }
  }

  // Affichage des résultats
  const resultText = document.getElementById("resultText");
  const quizResult = document.getElementById("quizResult");

  if (score === 4) {
    resultText.textContent = "Bravo ! Vous avez toutes les bonnes réponses.";
  } else if (score >= 2) {
    resultText.textContent = `Bien joué ! Vous avez ${score} bonnes réponses.`;
  } else {
    resultText.textContent = `Vous avez ${score} bonnes réponses. Continuez à apprendre !`;
  }

  // Afficher le résultat
  quizResult.classList.remove("hidden");
}



//// Function to show the Sign In form
function showSignInForm() {
  document.getElementById("openingModal").style.display = "none";
  document.getElementById("signInForm").style.display = "flex";
}

// Function to show the Log In form
function showLogInForm() {
  document.getElementById("openingModal").style.display = "none";
  document.getElementById("logInForm").style.display = "flex";
}

// Function to handle "Continue as Guest"
function continueAsGuest() {
  alert("Continuing as Guest");
  closeOpeningModal();
}

// Function to validate Sign In form
function validateSignIn() {
  const firstName = document.getElementById("signInFirstName").value;
  const lastName = document.getElementById("signInLastName").value;
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;
  
  if (!firstName || !lastName || !email || !password) {
    alert("Please fill in all required fields.");
  } else {
    alert(`Welcome, ${firstName} ${lastName}!`);
    closeForm("signInForm");
  }
}

// Function to validate Log In form
function validateLogIn() {
  const email = document.getElementById("logInEmail").value;
  const password = document.getElementById("logInPassword").value;
  
  if (!email || !password) {
    alert("Please enter both email and password.");
  } else {
    alert("Logged in successfully!");
    closeForm("logInForm");
  }
}

// Function to cancel the form and return to the opening modal
function cancelForm(formId) {
  document.getElementById(formId).style.display = "none";
  document.getElementById("openingModal").style.display = "flex";
}

// Function to close the opening modal and show main content
function closeOpeningModal() {
  document.getElementById("openingModal").style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
}

// Function to close the form and show main content
function closeForm(formId) {
  document.getElementById(formId).style.display = "none";
  document.getElementById("mainContent").classList.remove("hidden");
}






