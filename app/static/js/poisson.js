function validateX() {
    validateField('x', parseInt, value => !isNaN(value) && value >= 0,
        'Error: El valor de x debe ser un entero mayor o igual a 0.');
}

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

function poissonPmf(l, x) {
    return Math.pow(l, x) * Math.exp(-l) / factorial(x);
}

function poissonCdf(l, x) {
    let cdf = 0;
    for (let i = 0; i <= x; i++) cdf += poissonPmf(l, i);
    return cdf;
}

function poissonRange(l) {
    const sd = Math.sqrt(l);
    let end;
    if (l < 0.5) end = 4;
    else if (l < 1) end = 6;
    else if (l < 20) end = Math.floor(l + 5 * sd);
    else end = Math.floor(l + 4 * sd);
    return { start: Math.max(0, Math.floor(l - 4 * sd)), end: end };
}

function updateProb() {
    const l = parseFloat(document.forms[0].l.value);
    const x = parseInt(document.forms[0].x.value);
    if (isNaN(l) || isNaN(x) || l <= 0 || x < 0) return;

    const comparison = document.forms[0].mydropdown.value;
    let probability = 0;
    if (comparison === 'eq') probability = poissonPmf(l, x);
    else if (comparison === 'le') probability = poissonCdf(l, x);
    else if (comparison === 'ge') probability = 1 - poissonCdf(l, x - 1);
    document.forms[0].prob.value = probability.toFixed(5);
}

function updatePlot() {
    const l = parseFloat(document.forms[0].l.value);
    const x = parseInt(document.forms[0].x.value);
    if (isNaN(l) || l <= 0) return;

    const range = poissonRange(l);
    drawDiscreteDistribution({
        start: 0, end: range.end, min: range.start, max: range.end,
        selectedX: x, comparison: document.forms[0].mydropdown.value,
        probabilityFor: value => poissonPmf(l, value)
    });
    renderMoments(l, Math.sqrt(l));
    updateTable();
}

function updateTable() {
    const l = parseFloat(document.forms[0].l.value);
    if (isNaN(l) || l <= 0) return;

    const range = poissonRange(l);
    populateProbabilityTable(range.start, range.end, x => poissonPmf(l, x));
}
