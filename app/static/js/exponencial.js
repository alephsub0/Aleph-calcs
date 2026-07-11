
function validateX() {
    const x = Number.parseFloat(document.forms[0].x.value);
    if (x <= 0 || Number.isNaN(x)) {
        alert('Error: El valor de x debe ser mayor a 0.');
        document.forms[0].x.value = '';
    } else {
        document.forms[0].x.value = x;
    }
}

function exponencialDcf(l, x) {
    return 1 - Math.exp(-l * x);
}

function updateProb() {
    const l = Number.parseFloat(document.forms[0].l.value);
    const x = Number.parseFloat(document.forms[0].x.value);

    if (Number.isNaN(l) || Number.isNaN(x) || l <= 0 || x <= 0) {
        return;
    }

    const dropdownValue = document.forms[0].mydropdown.value;

    let prob = 0;
    if (dropdownValue === 'le') {
        prob = exponencialDcf(l, x);
    } else if (dropdownValue === 'ge') {
        prob = 1 - exponencialDcf(l, x);
    }

    document.forms[0].prob.value = prob.toFixed(5);
}
