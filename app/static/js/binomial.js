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
