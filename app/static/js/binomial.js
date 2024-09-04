function validateN() {
    const n = parseInt(document.forms[0].n.value);
    if (n < 1  || isNaN(n)) {
        alert('Error: El valor de n debe ser un entero mayor a 0.');
        document.forms[0].n.value = '';
    } else {
        document.forms[0].n.value = n;
    }
}

function validateP() {
    const p = parseFloat(document.forms[0].p.value);
    if (p < 0 || p > 1  || isNaN(p)) {
        alert('Error: La probabilidad debe estar entre 0 y 1');
        document.forms[0].p.value = '';
    } else {
        document.forms[0].p.value = p;
    }
}

function validateX() {
    const x = parseInt(document.forms[0].x.value);
    const n = parseInt(document.forms[0].n.value);
    if (x < 0 || x > n  || isNaN(x)) {
        alert('Error: El valor de x debe ser un entero entre 0 y n.');
        document.forms[0].x.value = '';
    } else {
        document.forms[0].x.value = x;
    }
}

function binomialCoefficient(n, x) {
    let result = 1;
    for (let i = 0; i < x; i++) {
        result *= (n - i) / (i + 1);
    }
    return result;
}

function binomialPmf(n, x, p) {
    const coeff = binomialCoefficient(n, x);
    return coeff * Math.pow(p, x) * Math.pow(1 - p, n - x);
}

function binomialCdf(n, x, p) {
    let cdf = 0;
    for (let i = 0; i <= x; i++) {
        cdf += binomialPmf(n, i, p);
    }
    return cdf;
}

function updateProb() {
    const n = parseInt(document.forms[0].n.value);
    const p = parseFloat(document.forms[0].p.value);
    const x = parseInt(document.forms[0].x.value);

    if (isNaN(n) || isNaN(p) || isNaN(x) || n < 1 || x < 0 || x > n || p < 0 || p > 1) {
        return;
    }

    const dropdownValue = document.forms[0].mydropdown.value;

    let prob = 0;
    if (dropdownValue === 'eq') {
        prob = binomialPmf(n, x, p);
    } else if (dropdownValue === 'le') {
        prob = binomialCdf(n, x, p);
    } else if (dropdownValue === 'ge') {
        prob = 1 - binomialCdf(n, x - 1, p);
    }

    document.forms[0].prob.value = prob.toFixed(5);
}
