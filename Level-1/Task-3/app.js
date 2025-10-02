document.addEventListener("DOMContentLoaded", function () {
  const temperatureInput = document.getElementById("temperature");
  const convertBtn = document.getElementById("convert-btn");
  const fromDisplay = document.getElementById("from-display");
  const toDisplay = document.getElementById("to-display");
  const errorDiv = document.getElementById("temperature-error");

  // Get all unit options
  const fromOptions = document.querySelectorAll(".from-section .unit-option");
  const toOptions = document.querySelectorAll(".to-section .unit-option");

  // Initialize with default values
  updateFromDisplay();
  convertTemperature();

  // Add event listeners to from unit options
  fromOptions.forEach((option) => {
    const radio = option.querySelector("input");
    option.addEventListener("click", function () {
      // Update radio button
      radio.checked = true;

      // Update visual selection
      fromOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      // Update display and convert
      updateFromDisplay();
      convertTemperature();
    });

    // Initialize selected state
    if (radio.checked) {
      option.classList.add("selected");
    }
  });

  // Add event listeners to to unit options
  toOptions.forEach((option) => {
    const radio = option.querySelector("input");
    option.addEventListener("click", function () {
      // Update radio button
      radio.checked = true;

      // Update visual selection
      toOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      // Convert temperature
      convertTemperature();
    });

    // Initialize selected state
    if (radio.checked) {
      option.classList.add("selected");
    }
  });

  // Update from display based on input
  function updateFromDisplay() {
    fromDisplay.textContent = temperatureInput.value;
  }

  // Conversion function
  function convertTemperature() {
    const temperature = parseFloat(temperatureInput.value);

    // Validate input
    if (isNaN(temperature)) {
      errorDiv.style.display = "block";
      toDisplay.textContent = "Invalid";
      return;
    } else {
      errorDiv.style.display = "none";
    }

    const fromUnit = document.querySelector(
      'input[name="from-unit"]:checked'
    ).value;
    const toUnit = document.querySelector(
      'input[name="to-unit"]:checked'
    ).value;

    let convertedTemp;

    // If same units selected
    if (fromUnit === toUnit) {
      convertedTemp = temperature;
      toDisplay.textContent = convertedTemp.toFixed(2);
      return;
    }

    // Convert to Celsius first (as an intermediate step)
    let tempInCelsius;

    switch (fromUnit) {
      case "fahrenheit":
        tempInCelsius = ((temperature - 32) * 5) / 9;
        break;
      case "celsius":
        tempInCelsius = temperature;
        break;
      case "kelvin":
        tempInCelsius = temperature - 273.15;
        break;
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
      case "fahrenheit":
        convertedTemp = (tempInCelsius * 9) / 5 + 32;
        break;
      case "celsius":
        convertedTemp = tempInCelsius;
        break;
      case "kelvin":
        convertedTemp = tempInCelsius + 273.15;
        break;
    }

    // Display result with 2 decimal places
    toDisplay.textContent = convertedTemp.toFixed(2);
  }

  // Event listeners
  convertBtn.addEventListener("click", function () {
    updateFromDisplay();
    convertTemperature();
  });

  // Update from display when input changes
  temperatureInput.addEventListener("input", updateFromDisplay);

  // Convert on Enter key
  temperatureInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      convertTemperature();
    }
  });
});
