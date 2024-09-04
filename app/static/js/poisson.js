function validateL() {
    const l = parseInt(document.forms[0].l.value);
    if (l <= 0  || isNaN(l)) {
        alert('Error: El valor de lambda debe ser mayor a 0.');
        document.forms[0].l.value = '';
    } else {
        document.forms[0].l.value = l;
    }
}

function validateX() {
    const x = parseInt(document.forms[0].x.value);
    if (isNaN(x)) {
        alert('Error: El valor de x debe ser un entero.');
        document.forms[0].x.value = '';
    } else {
        document.forms[0].x.value = x;
    }
}

function poissonPmf(l, x) {
    return Math.pow(l, x) * Math.exp(-l) / factorial(x);
}

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function poissonCdf(l, x) {
    let cdf = 0;
    for (let i = 0; i <= x; i++) {
        cdf += poissonPmf(l, i);
    }
    return cdf;
}

function updateProb() {
    const l = parseInt(document.forms[0].l.value);
    const x = parseInt(document.forms[0].x.value);

    if (isNaN(l) || isNaN(x) || l <= 0) {
        return;
    }

    const dropdownValue = document.forms[0].mydropdown.value;

    let prob = 0;
    if (dropdownValue === 'eq') {
        prob = poissonPmf(l, x);
    } else if (dropdownValue === 'le') {
        prob = poissonCdf(l, x);
    } else if (dropdownValue === 'ge') {
        prob = 1 - poissonCdf(l, x - 1);
    }

    document.forms[0].prob.value = prob.toFixed(5);
}