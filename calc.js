let inp, spans, toggle, elements, sup, rad, helper;

const {
    PI,
    E,
    random,
    max,
    min,
    log2,
    log10,
    log,
    sqrt,
    cbrt,
    pow,
    sin,
    floor,
    cos,
    tan,
    sinh,
    cosh,
    tanh,
    asin,
    acos,
    atan,
    asinh,
    acosh,
    atanh
} = Math;

const infinity = '\u221E';
const minusInfinity = '-\u221E';
const error = 'Error';

const inputIsNaN = () => inp.value = inp.value === 'NaN' ? error : inp.value;
const inputIsInfinity = () => inp.value = inp.value === 'Infinity' ? infinity : inp.value;
const inputIsMinusInfinity = () => inp.value = inp.value === '-Infinity' ? minusInfinity : inp.value;

const insert = str => inp.value[0] === '0' && inp.value.length < 3 ? inp.value = str : inp.value += str;

const clearValue = () => inp.value = '0';

const equal = () => {
    try {
      if (inp.value.includes(error)) {
          inp.value = error;
          return;
      }
        inp.value = inp.value ? eval(inp.value) : inp.value.length > 17 ? inp.value.toFixed(10) : inp.value == 'undefined' ? error : inp.value;

        inputIsNaN();
        inputIsInfinity();
        inputIsMinusInfinity();

    } catch (e) {
        inp.value = error;
    }
}

const showPercent = () => {
    inp.value = eval((inp.value / 100));

    inputIsNaN();
}

const deleteNumber = () => inp.value = inp.value.slice(0, inp.value.length - 1);

const factorial = () => {
    let result = 1;

    if (inp.value < 0) result = error;
    if (inp.value == 0) result = 1;

    for (let i = 1; i <= inp.value; i++) result = result * i;

    if (inp.value.includes('*') || inp.value.includes('/') || inp.value.includes('-') || inp.value.includes('+') || inp.value.includes('.')) result = error;
    if (result == 'Infinity') result = infinity;
    if (inp.value == infinity || inp.value.includes(error) || inp.value.includes('(') || inp.value.includes(')')) result = error;

    inp.value = result;
}

const fib = n => {
    let a = 1,
        b = 1;

    for (let i = 3; i <= n; i++) {
        let c = a + b;
        a = b;
        b = c;
    }

    if (inp.value.includes('*') || inp.value.includes('/') || inp.value.includes('-') || inp.value.includes('+') || inp.value.includes('.')) b = error;
    if (b == 'Infinity') b = infinity;
    if (inp.value == infinity || inp.value.includes(error) || inp.value.includes('(') || inp.value.includes(')')) b = error;

    inp.value = b;

    inputIsInfinity();
}

const showMathPI = () => inp.value = PI;
const showMathE = () => inp.value = E;

const powMathE = () => {
    inp.value = E ** inp.value;

    inputIsInfinity();
    inputIsNaN();
}

const showMathRandom = () => inp.value = random();

const xPowTwo = () => {
    inp.value = inp.value ** 2;

    inputIsInfinity();
    inputIsNaN();
}

const xPowThree = () => {
    inp.value = inp.value ** 3;

    inputIsInfinity();
    inputIsMinusInfinity();
    inputIsNaN();
}

const xPowY = () => {
    if (inp.value.startsWith('-')) inp.value = '(' + inp.value + ')';

    inp.value = inp.value + '**';
}

const tenPowX = () => {
    inp.value = 10 ** inp.value;

    inputIsInfinity();
    inputIsNaN();
}

const twoPowX = () => {
    inp.value = 2 ** inp.value;

    inputIsInfinity();
    inputIsNaN();
}

const threePowX = () => {
    inp.value = 3 ** inp.value;

    inputIsInfinity();
    inputIsNaN();
}

const oneDivByX = () => {
    inp.value = 1 / inp.value;

    inputIsInfinity();
    inputIsMinusInfinity();
    inputIsNaN();
}

const showInteger = (func) => {
    try {
        let counter = 0;
        let strArr = inp.value.split('.');
        let maxOrMinInt = eval(`func(${strArr})`);
        let result = '';
        strArr.forEach(str => {
            let resStr = eval(str);
            if (resStr == maxOrMinInt) {
                counter++;
                result = `${str}(${maxOrMinInt})`
            };
        });

        if (counter === strArr.length) result = `=(${maxOrMinInt})`
        inp.value = result;
        inputIsMinusInfinity();
    } catch (e) {
        inp.value = error;
    }
}

const showMaxInteger = () => showInteger(max);
const showMinInteger = () => showInteger(min);

const showLog2 = () => {
    inp.value = log2(inp.value);

    inputIsMinusInfinity();
    inputIsNaN();
}

const showLog10 = () => {
    inp.value = log10(inp.value);

    inputIsMinusInfinity();
    inputIsNaN();
}

const showLn = () => {
    inp.value = log(inp.value);

    inputIsMinusInfinity();
    inputIsNaN();
}

const showSQRT = () => {
    inp.value = sqrt(inp.value);
    inputIsNaN();
}

const showCBRT = () => {
    inp.value = cbrt(inp.value);
    inputIsNaN();
}

const showRoot = () => {
    let result = inp.value.split('.').filter(el => el != '');
    inp.value = pow(result[0], 1 / result[1]);

    if (result.length > 2) inp.value = error;
    inputIsNaN();
    inputIsInfinity();
}

const showSinDeg = () => {
    let deg = inp.value / (180 / PI);
    let res = sin(deg);
    let str = (deg / PI).toString();
    if (isNaN(deg)) res = error;
    if (deg % PI == 0) res = 0;

    if (str.includes('.16666') && deg > 0 && floor((deg / PI)) % 2 == 0 || str.includes('.833333') && deg > 0 && floor((deg / PI)) % 2 == 0 || str.includes('.16666') && deg < 0 && floor(-(deg / PI)) % 2 == 1 || str.includes('.833333') && deg < 0 && floor(-(deg / PI)) % 2 == 1) {
        res = 0.5;
    }

    if (str.includes('.16666') && deg < 0 && floor((-deg / PI)) % 2 == 0 || str.includes('.833333') && deg < 0 && floor(-(deg / PI)) % 2 == 0 || str.includes('.16666') && deg > 0 && floor((deg / PI)) % 2 == 1 || str.includes('.833333') && deg > 0 && floor((deg / PI)) % 2 == 1) {
        res = -0.5;
    }

    inp.value = res;
}

const showCosDeg = () => {
    let deg = inp.value / (180 / PI);
    let res = cos(deg);
    let str = (deg / PI).toString();

    if (isNaN(deg)) res = error;

    if (str.includes('.33333') && deg > 0 && floor((deg / PI)) % 2 == 0 || str.includes('.66666') && deg > 0 && floor((deg / PI)) % 2 == 1 || str.includes('.33333') && deg < 0 && floor(-(deg / PI)) % 2 == 0 || str.includes('.66666') && deg < 0 && floor(-(deg / PI)) % 2 == 1) {
        res = 0.5;
    }

    if (str.includes('.33333') && deg > 0 && floor((deg / PI)) % 2 == 1 || str.includes('.66666') && deg > 0 && floor((deg / PI)) % 2 == 0 || str.includes('.66666') && deg < 0 && floor(-(deg / PI)) % 2 == 0 || str.includes('.33333') && deg < 0 && floor(-(deg / PI)) % 2 == 1) {
        res = -0.5;
    }

    if (str.slice(str.indexOf('.')) === '.5') {
        res = 0;
    }

    inp.value = res;
}

const showTanDeg = () => {
    let deg = inp.value / (180 / PI);
    let res = tan(deg);

    if (isNaN(deg)) res = error;

    if (deg % PI == 0) res = 0;

    if ((deg / PI).toFixed(5).toString().includes('.25000') && deg > 0 || -(deg / PI).toFixed(5).toString().includes('.75000') && deg < 0) {
        res = 1;
    }

    if ((deg / PI).toFixed(5).toString().includes('.25000') && deg < 0 || (deg / PI).toFixed(5).toString().includes('.75000') && deg > 0) {
        res = -1;
    }

    if ((deg / PI).toFixed(5).toString().includes('.50000') && deg > 0) {
        res = infinity;
    }

    if (-(deg / PI).toFixed(5).toString().includes('.50000') && deg < 0) {
        res = minusInfinity;
    }

    inp.value = res;
}

const showCtgDeg = () => {
    let deg = inp.value / (180 / PI);
    let res = tan(deg);
    let ctg = 1 / res;

    if (isNaN(deg)) ctg = error;

    if (-(deg) % PI == 0 && deg < 0 || ctg == '-Infinity') {
        ctg = minusInfinity;
    }

    if (deg % PI == 0 && deg > 0 || ctg == 'Infinity') {
        ctg = infinity;
    }

    if ((deg / PI).toFixed(5).toString().includes('.25000') && deg > 0 || -(deg / PI).toFixed(5).toString().includes('.75000') && deg < 0) {
        ctg = 1;
    }

    if (-(deg / PI).toFixed(5).toString().includes('.25000') && deg < 0 || (deg / PI).toFixed(5).toString().includes('.75000') && deg > 0) {
        ctg = -1;
    }

    if (-(deg / PI).toFixed(5).toString().includes('.50000')) {
        ctg = 0;
    }

    inp.value = ctg;
}

const showSinh = () => {
    inp.value = sinh(inp.value);

    inputIsNaN();
    inputIsInfinity();
    inputIsMinusInfinity();
}

const showCosh = () => {
    inp.value = cosh(inp.value);

    inputIsNaN();
    inputIsInfinity();
}

const showTanh = () => {
    inp.value = tanh(inp.value);

    inputIsNaN();
}

const showCtgh = () => {
    inp.value = cosh(inp.value) / sinh(inp.value);

    inputIsNaN();
    inputIsInfinity();
    inputIsMinusInfinity();
}

const showArcsinDeg = () => {
    let sin = inp.value;
    let arcsin = asin(sin) * (180 / PI);

    if (isNaN(arcsin)) arcsin = error;

    if (sin == 0.5) arcsin = 30;
    if (sin == -0.5) arcsin = -30;

    inp.value = arcsin;
}

const showArccosDeg = () => {
    let cos = inp.value;
    let arccos = acos(cos) * (180 / PI);

    if (isNaN(arccos)) arccos = error;

    if (cos == 0.5) arccos = 60;
    if (cos == -0.5) arccos = -60;

    inp.value = arccos;
}

const showArctanDeg = () => {
    let tan = inp.value;
    let arctan = atan(tan) * (180 / PI);

    if (isNaN(arctan)) arctan = error;

    inp.value = arctan;
}

const showArcctgDeg = () => {
    let ctg = inp.value;
    let arcctg = atan(1 / ctg) * (180 / PI);

    if (isNaN(arcctg)) arcctg = error;

    inp.value = arcctg;
}

const showAsinh = () => {
    inp.value = asinh(inp.value);

    inputIsNaN();
}

const showAcosh = () => {
    inp.value = acosh(inp.value);

    inputIsNaN();
}

const showAtanh = () => {
    inp.value = atanh(inp.value);

    inputIsNaN();
    inputIsInfinity();
    inputIsMinusInfinity();
}

const showActgh = () => {
    inp.value = atanh(1 / inp.value);

    inputIsNaN();
    inputIsInfinity();
    inputIsMinusInfinity();
}
inp = document.querySelector('input');
	  spans = document.querySelectorAll('#leftBr, #rightBr, #factorial, #fibonacci, #xPow2, #twoPowX, #log2, #PI, #E, #min, #xPowY, #tenPowX, #powE, #oneDiv, #max, #sqrt, #cbrt, #root, #ln, #random');
	  toggle = document.querySelector('#toggle');
	  elements = document.querySelectorAll('#sin, #cos, #tan, #ctg, #xPow3, #threePowX, #log10, #sinh, #cosh, #tanh, #ctgh, #arcsin, #arccos, #arctan, #arcctg, #asinh, #acosh, #atanh, #actgh, #rad');
	  sup = document.querySelector('#sup');
	  rad = document.querySelector('#rad');
	  helper = document.getElementById('helper');

	  rad.style.display = 'none';
	  elements.forEach(el => el.style.display = 'none');

	  toggle.addEventListener('click', function(e) {
	  	helper.style.opacity = helper.style.opacity === '0' || helper.style.opacity === '' ? '1' : '0';
	  	spans.forEach(span => span.style.display = span.style.display === 'none' ? 'inline-block' : 'none');
	  	elements.forEach(el => el.style.display = el.style.display === 'none' ? 'inline-block' : 'none');

	  	this.style.background = this.style.background === 'gray' ? '' : 'gray';
	  	this.style.color = this.style.color === 'black' ? '' : 'black'
	  });

	  rad.addEventListener('click', function(e) {
	  	rad.textContent = rad.textContent === 'Rad' ? 'Deg' : 'Rad';
	  	helper.textContent = helper.textContent === 'Rad' ? 'Deg' : 'Rad';

	  	const onElemClicked = (action, ...funcs) => {
	  		inp.value = action;
	  		funcs.forEach(func => func());
	  	}

	  	if (rad.innerHTML == 'Deg') {
	  		elements[0].onclick = e => onElemClicked(sin(inp.value), inputIsNaN);
	  		elements[1].onclick = e => onElemClicked(cos(inp.value), inputIsNaN);
	  		elements[2].onclick = e => onElemClicked(tan(inp.value), inputIsNaN);
	  		elements[3].onclick = e => onElemClicked(cos(inp.value) / sin(inp.value), inputIsNaN, inputIsInfinity);
	  		elements[7].onclick = e => onElemClicked(asin(inp.value), inputIsNaN);
	  		elements[8].onclick = e => onElemClicked(acos(inp.value), inputIsNaN);
	  		elements[9].onclick = e => onElemClicked(atan(inp.value), inputIsNaN);
	  		elements[10].onclick = e => onElemClicked(1 / atan(inp.value), inputIsNaN);
	  	}

	  	if (rad.innerHTML == 'Rad') {
	  		elements[0].onclick = showSinDeg;
	  		elements[1].onclick = showCosDeg;
	  		elements[2].onclick = showTanDeg;
	  		elements[3].onclick = showCtgDeg;
	  		elements[7].onclick = showArcsinDeg;
	  		elements[8].onclick = showArccosDeg;
	  		elements[9].onclick = showArctanDeg;
	  		elements[10].onclick = showArcctgDeg;
	  	}
	  });