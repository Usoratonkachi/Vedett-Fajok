// Számológép osztály
class Calculator {
    constructor() {}

    // Összeadás
    add(a, b) {
        return a + b;
    }

    // Kivonás
    subtract(a, b) {
        return a - b;
    }

    // Számítás végrehajtása
    calculate(a, b, operation) {
        switch (operation) {
            case 'add':
                return this.add(a, b);
            case 'subtract':
                return this.subtract(a, b);
            default:
                return null;
        }
    }
}

// Számológép példány létrehozása
const calculator = new Calculator();

// Eseménykezelő a form submit eseményre
document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const number1 = parseFloat(document.getElementById('number1').value);
    const number2 = parseFloat(document.getElementById('number2').value);
    const operation = document.getElementById('operation').value;

    // Számítás végrehajtása
    const result = calculator.calculate(number1, number2, operation);

    // Eredmény megjelenítése
    document.getElementById('result').textContent = `Eredmény: ${result}`;
});
