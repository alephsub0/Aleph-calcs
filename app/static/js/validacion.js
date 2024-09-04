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
