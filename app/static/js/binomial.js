function validateN() {
    validateField('n', Number.parseInt, value => !Number.isNaN(value) && value >= 1,
        'Error: El valor de n debe ser un entero mayor a 0.');
}

function validateP() {
    validateField('p', Number.parseFloat, value => !Number.isNaN(value) && value >= 0 && value <= 1,
        'Error: La probabilidad debe estar entre 0 y 1');
}

function validateX() {
    const n = Number.parseInt(document.forms[0].n.value, 10);
    validateField('x', value => Number.parseInt(value, 10),
        value => !Number.isNaN(value) && value >= 0 && value <= n,
        'Error: El valor de x debe ser un entero entre 0 y n.');
}

function binomialCoefficient(n, x) {
    let result = 1;
    for (let i = 0; i < x; i++) {
        result *= (n - i) / (i + 1);
    }
    return result;
}

function binomialPmf(n, x, p) {
    return binomialCoefficient(n, x) * p ** x * (1 - p) ** (n - x);
}

function binomialCdf(n, x, p) {
    let cdf = 0;
    for (let i = 0; i <= x; i++) {
        cdf += binomialPmf(n, i, p);
    }
    return cdf;
}

function binomialInputs() {
    return {
        n: Number.parseInt(document.forms[0].n.value, 10),
        p: Number.parseFloat(document.forms[0].p.value),
        x: Number.parseInt(document.forms[0].x.value, 10)
    };
}

function areValidInputs(values, requireX) {
    return !Number.isNaN(values.n) && !Number.isNaN(values.p) && values.n >= 1
        && values.p >= 0 && values.p <= 1
        && (!requireX || !Number.isNaN(values.x) && values.x >= 0 && values.x <= values.n);
}

function updateProb() {
    const values = binomialInputs();
    if (!areValidInputs(values, true)) {
        return;
    }

    const comparison = document.forms[0].mydropdown.value;
    let probability = 0;
    if (comparison === 'eq') probability = binomialPmf(values.n, values.x, values.p);
    else if (comparison === 'le') probability = binomialCdf(values.n, values.x, values.p);
    else if (comparison === 'ge') probability = 1 - binomialCdf(values.n, values.x - 1, values.p);
    document.forms[0].prob.value = probability.toFixed(5);
}

function updatePlot() {
    const values = binomialInputs();
    if (!areValidInputs(values, false)) {
        return;
    }

    const mean = values.n * values.p;
    const sd = Math.sqrt(values.n * values.p * (1 - values.p));
    const min = values.n > 10 ? Math.max(0, mean - 6 * sd) : 0;
    const max = values.n > 10 ? Math.min(values.n + 0.5, mean + 6 * sd) : values.n + 0.5;
    drawDiscreteDistribution({
        start: 0, end: values.n, min: min, max: max, selectedX: values.x,
        comparison: document.forms[0].mydropdown.value,
        probabilityFor: x => binomialPmf(values.n, x, values.p)
    });
    renderMoments(mean, sd);
    updateTable();
}

function updateTable() {
    const values = binomialInputs();
    if (!areValidInputs(values, false)) {
        return;
    }
    populateProbabilityTable(0, values.n, x => binomialPmf(values.n, x, values.p));
}
