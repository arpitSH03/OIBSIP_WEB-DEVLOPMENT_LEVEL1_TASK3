// DOM Elements
const temperatureInput = document.getElementById('temperature');
const unitRadios = document.querySelectorAll('input[name="unit"]');
const convertBtn = document.getElementById('convertBtn');
const errorMessage = document.getElementById('errorMessage');
const resultContainer = document.getElementById('resultContainer');
const resultText = document.getElementById('result');
const celsiusResult = document.getElementById('celsiusResult');
const fahrenheitResult = document.getElementById('fahrenheitResult');
const kelvinResult = document.getElementById('kelvinResult');

// Event listeners
convertBtn.addEventListener('click', handleConvert);
temperatureInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleConvert();
});

// Conversion functions
function celsiusToFahrenheit(c) {
    return (c * 9/5) + 32;
}

function fahrenheitToCelsius(f) {
    return (f - 32) * 5/9;
}

function celsiusToKelvin(c) {
    return c + 273.15;
}

function kelvinToCelsius(k) {
    return k - 273.15;
}

function fahrenheitToKelvin(f) {
    return (f - 32) * 5/9 + 273.15;
}

function kelvinToFahrenheit(k) {
    return (k - 273.15) * 9/5 + 32;
}

// Convert all temperatures to Celsius first, then calculate others
function convertTemperature(value, fromUnit) {
    let celsius;

    // Convert input to Celsius
    if (fromUnit === 'celsius') {
        celsius = value;
    } else if (fromUnit === 'fahrenheit') {
        celsius = fahrenheitToCelsius(value);
    } else if (fromUnit === 'kelvin') {
        celsius = kelvinToCelsius(value);
    }

    // Calculate all units
    return {
        celsius: celsius,
        fahrenheit: celsiusToFahrenheit(celsius),
        kelvin: celsiusToKelvin(celsius)
    };
}

// Main conversion handler
function handleConvert() {
    // Clear previous messages
    errorMessage.textContent = '';
    errorMessage.classList.remove('show');
    resultContainer.classList.remove('show');

    // Get input value
    const inputValue = temperatureInput.value.trim();
    const selectedUnit = document.querySelector('input[name="unit"]:checked').value;

    // Validation
    if (inputValue === '') {
        showError('Please enter a temperature value.');
        return;
    }

    const numValue = parseFloat(inputValue);

    if (isNaN(numValue)) {
        showError('Please enter a valid number.');
        return;
    }

    // Validate Kelvin (cannot be negative)
    if (selectedUnit === 'kelvin' && numValue < 0) {
        showError('Kelvin temperature cannot be negative.');
        return;
    }

    // Validate Celsius and Fahrenheit for physical reasonableness
    if (selectedUnit === 'celsius' && numValue < -273.15) {
        showError('Celsius temperature cannot be below -273.15°C (absolute zero).');
        return;
    }

    if (selectedUnit === 'fahrenheit' && numValue < -459.67) {
        showError('Fahrenheit temperature cannot be below -459.67°F (absolute zero).');
        return;
    }

    // Perform conversion
    const results = convertTemperature(numValue, selectedUnit);

    // Display results
    displayResults(numValue, selectedUnit, results);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Display conversion results
function displayResults(inputValue, fromUnit, results) {
    const unitSymbols = {
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K'
    };

    // Main result display
    const displayValue = results[fromUnit].toFixed(2);
    const displayUnit = unitSymbols[fromUnit];
    resultText.textContent = `${displayValue} ${displayUnit}`;

    // All conversions display
    celsiusResult.textContent = `Celsius: ${results.celsius.toFixed(2)} °C`;
    fahrenheitResult.textContent = `Fahrenheit: ${results.fahrenheit.toFixed(2)} °F`;
    kelvinResult.textContent = `Kelvin: ${results.kelvin.toFixed(2)} K`;

    // Show result container
    resultContainer.classList.add('show');
}

// Allow Enter key to trigger conversion
temperatureInput.addEventListener('focus', function() {
    this.select();
});
