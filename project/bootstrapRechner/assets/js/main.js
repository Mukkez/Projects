let radioNzB = document.getElementById('nettoZuBrutto');
let mwst7 = document.getElementById('mwst7');
let label = document.getElementById('userEingabeLabel');
let eingabe = document.getElementById('userEingabe');
let mwstBetrag = document.getElementById('mwstBetrag');
let endpreis = document.getElementById('endpreis');

function eingabeLabel(a, b) {
	label.innerHTML = a + 'betrag (Preis ' + b + ' Mehrwertsteuer) in Euro';
}

function mwstCheck() {
	if (mwst7.checked) {
		return 7;
	} else {
		return 19;
	}
}

function runden(eingabe) {
	return Math.round(eingabe * 100) / 100;
}

function nettoZuBrutto(eingabe) {
	let mwst = (eingabe * mwstCheck()) / 100;
	ausgabeMwst(mwst);
	return runden(eingabe + mwst);
}

function bruttoZuNetto(eingabe) {
	let mwst = (eingabe / (100 + mwstCheck())) * mwstCheck();
	ausgabeMwst(mwst);
	return runden(eingabe - mwst);
}

function ausgabeMwst(eingabe) {
	mwstBetrag.innerHTML = runden(eingabe) + ' €';
}

function ausgabeEndpreis() {
	if (radioNzB.checked) {
		endpreis.innerHTML = nettoZuBrutto(Number(eingabe.value)) + ' €';
	} else {
		endpreis.innerHTML = bruttoZuNetto(Number(eingabe.value)) + ' €';
	}
}
