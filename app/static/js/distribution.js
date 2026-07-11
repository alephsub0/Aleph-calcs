function validateField(name, parser, isValid, message) {
    const field = document.forms[0][name];
    const value = parser(field.value);
    if (!isValid(value)) {
        alert(message);
        field.value = '';
        return;
    }
    field.value = value;
}

function validateL() {
    validateField('l', Number.parseFloat, value => !Number.isNaN(value) && value > 0,
        'Error: El valor de lambda debe ser mayor a 0.');
}

function populateProbabilityTable(start, end, probabilityFor) {
    const rows = [];
    for (let x = start; x <= end; x++) {
        rows.push(`<tr><td>${x}</td><td> ${probabilityFor(x).toFixed(5)} </td></tr>`);
    }
    document.getElementById('probabilities-body').innerHTML = rows.join('');
}

function drawDiscreteDistribution(config) {
    const data = new google.visualization.DataTable();
    data.addColumn('number', 'x');
    data.addColumn('number', 'P(X=x)');
    data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    data.addColumn('number', 'P(X=x)');
    data.addRows(config.end + 1);

    for (let i = config.start; i <= config.end; i++) {
        const probability = config.probabilityFor(i);
        data.setCell(i, 0, i);
        data.setCell(i, 1, probability);
        data.setCell(i, 2, `P(X=${i}) = ${probability.toFixed(5)}`);
        const selected = config.comparison === 'eq' && i === config.selectedX
            || config.comparison === 'le' && i <= config.selectedX
            || config.comparison === 'ge' && i >= config.selectedX;
        if (selected) {
            data.setCell(i, 1, 0);
            data.setCell(i, 3, probability);
        }
    }

    const options = {
        backgroundColor: 'transparent',
        hAxis: {
            title: 'x', titleTextStyle: { color: '#2a4861' },
            gridlines: { color: 'transparent' },
            viewWindow: { min: config.min - 0.5, max: config.max },
            baselineColor: 'transparent'
        },
        vAxis: {
            title: 'P(X=x)', titleTextStyle: { color: '#2a4861' },
            gridlines: { count: 5, color: 'transparent' },
            viewWindow: { min: 0 }, viewWindowMode: 'explicit'
        },
        legend: { position: 'none' }, seriesType: 'bars', isStacked: true,
        colors: ['#2a4861', '#419693']
    };
    new google.visualization.ComboChart(document.getElementById('Plot')).draw(data, options);
}

function renderMoments(mean, standardDeviation) {
    const text = String.raw`\( \mu = E(X) = ${mean.toFixed(3)};\hspace{0.5cm}\)
        \( \sigma = ${standardDeviation.toFixed(3)};\hspace{0.5cm}\)
        \( \sigma^2 = \text{Var}(X) = ${(standardDeviation ** 2).toFixed(3)}.\)`;
    document.getElementById('moments').innerHTML = text;
    MathJax.typesetPromise(['#moments']);
}
