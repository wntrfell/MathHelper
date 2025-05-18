document.addEventListener('DOMContentLoaded', function() {
    // Навігація між секціями
    const navLinks = document.querySelectorAll('.nav-link');
    const taskSections = document.querySelectorAll('.task-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            navLinks.forEach(navLink => navLink.classList.remove('active'));

            this.classList.add('active');

            taskSections.forEach(section => section.classList.remove('active'));

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
        });
    });

    // 1. Суми прописом
    const numberInput = document.getElementById('number-input');
    const convertBtn = document.getElementById('convert-btn');
    const sumResult = document.getElementById('sum-result');

    convertBtn.addEventListener('click', convertNumberToWords);

    function convertNumberToWords() {
        const numStr = numberInput.value.trim();
        
        if (!numStr) {
            sumResult.innerHTML = '<p class="error">Будь ласка, введіть число</p>';
            return;
        }

        if (!/^-?\d+(\.\d{1,2})?$/.test(numStr)) {
            sumResult.innerHTML = '<p class="error">Некоректний формат числа. Введіть ціле або десяткове число (напр. 123 або 45.67)</p>';
            return;
        }
        
        const num = parseFloat(numStr);
        const words = numberToWordsUa(num);
        
        sumResult.innerHTML = `
            <p><strong>Число:</strong> ${num.toLocaleString('uk-UA')}</p>
            <p><strong>Прописом:</strong> ${words}</p>
        `;
    }

function numberToWordsUa(num) {
    const units = ['', 'один', 'два', 'три', 'чотири', 'п\'ять', 
                  'шість', 'сім', 'вісім', 'дев\'ять'];
    const teens = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 
                  'чотирнадцять', 'п\'ятнадцять', 'шістнадцять', 
                  'сімнадцять', 'вісімнадцять', 'дев\'ятнадцять'];
    const tens = ['', 'десять', 'двадцять', 'тридцять', 'сорок', 
                 'п\'ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 
                 'дев\'яносто'];
    const hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', 
                     'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 
                     'дев\'ятсот'];
    
    const thousandForms = ['тисяча', 'тисячі', 'тисяч'];
    const millionForms = ['мільйон', 'мільйони', 'мільйонів'];
    const billionForms = ['мільярд', 'мільярди', 'мільярдів'];
    
    const hryvniaForms = ['гривня', 'гривні', 'гривень'];
    const kopiykaForms = ['копійка', 'копійки', 'копійок'];
    
    function getForm(n, forms) {
        if (n % 10 === 1 && n % 100 !== 11) return forms[0];
        if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return forms[1];
        return forms[2];
    }
    
    function convertLessThanOneThousand(n, isFemale = false) {
        if (n === 0) return '';
        
        let result = '';
        
        if (n >= 100) {
            result += hundreds[Math.floor(n / 100)] + ' ';
            n %= 100;
        }
        
        if (n >= 20) {
            result += tens[Math.floor(n / 10)] + ' ';
            n %= 10;
        } else if (n >= 10) {
            result += teens[n - 10] + ' ';
            n = 0;
        }
        
        if (n > 0) {
            if (isFemale) {
                if (n === 1) result += 'одна ';
                else if (n === 2) result += 'дві ';
                else result += units[n] + ' ';
            } else {
                result += units[n] + ' ';
            }
        }
        
        return result.trim();
    }
    
    let integerPart = Math.floor(Math.abs(num));
    let fractionalPart = Math.round((Math.abs(num) - integerPart) * 100);
    
    if (fractionalPart >= 100) {
        fractionalPart = 0;
    }
    
    if (integerPart === 0 && fractionalPart === 0) {
        return 'нуль гривень 00 копійок';
    }
    
    let result = '';
    
    if (integerPart === 0) {
        result = 'нуль ';
    } else {
        if (integerPart >= 1000000000) {
            const billions = Math.floor(integerPart / 1000000000);
            result += convertLessThanOneThousand(billions) + ' ' + getForm(billions, billionForms) + ' ';
            integerPart %= 1000000000;
        }
        
        if (integerPart >= 1000000) {
            const millions = Math.floor(integerPart / 1000000);
            result += convertLessThanOneThousand(millions) + ' ' + getForm(millions, millionForms) + ' ';
            integerPart %= 1000000;
        }
        
        if (integerPart >= 1000) {
            const thousands = Math.floor(integerPart / 1000);
            result += convertLessThanOneThousand(thousands) + ' ' + getForm(thousands, thousandForms) + ' ';
            integerPart %= 1000;
        }
        
        if (integerPart > 0) {
            result += convertLessThanOneThousand(integerPart) + ' ';
        }
    }
    
    result += getForm(integerPart, hryvniaForms) + ' ';
    
    if (fractionalPart > 0) {
        const kopiykaWords = convertLessThanOneThousand(fractionalPart, true);
        result += kopiykaWords + ' ' + getForm(fractionalPart, kopiykaForms);
    } else {
        result += '00 копійок';
    }
    
    return result.trim();
}
    // 2. Квадратні рівняння
    const solveBtn = document.getElementById('solve-btn');
    const equationResult = document.getElementById('equation-result');

    solveBtn.addEventListener('click', solveQuadraticEquation);

    function solveQuadraticEquation() {
        const a = parseFloat(document.getElementById('a-coeff').value);
        const b = parseFloat(document.getElementById('b-coeff').value);
        const c = parseFloat(document.getElementById('c-coeff').value);
        
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
            equationResult.innerHTML = '<p class="error">Будь ласка, введіть коефіцієнти a, b та c</p>';
            return;
        }
        
        if (a === 0) {
            equationResult.innerHTML = '<p class="error">Коефіцієнт "a" не може дорівнювати нулю (це не квадратне рівняння)</p>';
            return;
        }
        
        const discriminant = b * b - 4 * a * c;
        let solution;
        
        if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            solution = `
                <p>Дискримінант D = ${discriminant} > 0</p>
                <p>Рівняння має два дійсних корені:</p>
                <p>x₁ = ${x1.toFixed(4)}</p>
                <p>x₂ = ${x2.toFixed(4)}</p>
            `;
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            solution = `
                <p>Дискримінант D = 0</p>
                <p>Рівняння має один дійсний корінь (подвійний корінь):</p>
                <p>x = ${x.toFixed(4)}</p>
            `;
        } else {
            const realPart = -b / (2 * a);
            const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
            solution = `
                <p>Дискримінант D = ${discriminant} < 0</p>
                <p>Рівняння має два комплексних корені:</p>
                <p>x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i</p>
                <p>x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i</p>
            `;
        }
        
        equationResult.innerHTML = `
            <p><strong>Рівняння:</strong> ${a}x² + ${b}x + ${c} = 0</p>
            ${solution}
        `;
    }

    // 3. Прогресії
    const analyzeBtn = document.getElementById('analyze-btn');
    const progressionResult = document.getElementById('progression-result');

    analyzeBtn.addEventListener('click', analyzeProgression);

    function analyzeProgression() {
        const sequenceInput = document.getElementById('sequence-input').value.trim();
        
        if (!sequenceInput) {
            progressionResult.innerHTML = '<p class="error">Будь ласка, введіть послідовність чисел</p>';
            return;
        }
        
        const numbers = sequenceInput.split(',')
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));
        
        if (numbers.length < 2) {
            progressionResult.innerHTML = '<p class="error">Послідовність повинна містити принаймні 2 числа</p>';
            return;
        }
        
        const isArithmetic = checkArithmeticProgression(numbers);
        const isGeometric = checkGeometricProgression(numbers);
        
        let progressionType = 'Немає прогресії';
        let sum = 0;
        let formula = '';
        
        if (isArithmetic) {
            const d = numbers[1] - numbers[0];
            progressionType = 'Арифметична прогресія';
            sum = (numbers.length / 2) * (2 * numbers[0] + (numbers.length - 1) * d);
            formula = `Sₙ = n/2 * (2a₁ + (n-1)d) = ${numbers.length}/2 * (2*${numbers[0]} + ${numbers.length-1}*${d})`;
        } else if (isGeometric) {
            const r = numbers[1] / numbers[0];
            progressionType = 'Геометрична прогресія';
            if (r === 1) {
                sum = numbers[0] * numbers.length;
                formula = `Sₙ = a₁ * n = ${numbers[0]} * ${numbers.length}`;
            } else {
                sum = numbers[0] * (Math.pow(r, numbers.length) - 1) / (r - 1);
                formula = `Sₙ = a₁(rⁿ-1)/(r-1) = ${numbers[0]}(${r}^${numbers.length}-1)/(${r}-1)`;
            }
        } else {
            sum = numbers.reduce((acc, val) => acc + val, 0);
            progressionType = 'Це не прогресія';
            formula = `Sₙ = просто сума всіх елементів`;
        }
        
        progressionResult.innerHTML = `
            <p><strong>Послідовність:</strong> ${numbers.join(', ')}</p>
            <p><strong>Тип:</strong> ${progressionType}</p>
            <p><strong>Сума:</strong> ${sum.toFixed(4)}</p>
            <p><strong>Формула:</strong> ${formula}</p>
        `;
    }

    function checkArithmeticProgression(arr) {
        if (arr.length < 2) return false;
        
        const d = arr[1] - arr[0];
        for (let i = 2; i < arr.length; i++) {
            if (arr[i] - arr[i - 1] !== d) {
                return false;
            }
        }
        return true;
    }

    function checkGeometricProgression(arr) {
        if (arr.length < 2) return false;
        
        const r = arr[1] / arr[0];
        for (let i = 2; i < arr.length; i++) {
            if (arr[i] / arr[i - 1] !== r) {
                return false;
            }
        }
        return true;
    }
});