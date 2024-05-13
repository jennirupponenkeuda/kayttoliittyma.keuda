// esimerkit tapahtumista
const tapahtumat = [
    { nimi: "Live-musiikkia", paikka: "Kahvila Espresso", aika: "2024-05-20 18:00" },
    { nimi: "Kirjailijavieraana", paikka: "Kahvila Espresso", aika: "2024-06-10 16:00" },
    { nimi: "Maalausnäyttely", paikka: "Kahvila Espresso", aika: "2024-07-05 12:00" }
];

const tapahtumakalenteri = document.getElementById('tapahtumakalenteri');

// Funktio, joka luo tapahtuma-elementin ja lisää sen sivulle
function lisaaTapahtuma(tapahtuma) {
    const tapahtumaDiv = document.createElement('div');
    tapahtumaDiv.classList.add('tapahtuma');

    const tapahtumaInfo = document.createElement('p');
    tapahtumaInfo.textContent = `${tapahtuma.nimi} - ${tapahtuma.paikka}, ${tapahtuma.aika}`;

    const ilmoittauduButton = document.createElement('button');
    ilmoittauduButton.textContent = "Ilmoittaudu";
    ilmoittauduButton.classList.add('ilmoittaudu-button');

    tapahtumaDiv.appendChild(tapahtumaInfo);
    tapahtumaDiv.appendChild(ilmoittauduButton);
    tapahtumakalenteri.appendChild(tapahtumaDiv);

    // Lisää tapahtumakohtainen toiminnallisuus
    ilmoittauduButton.addEventListener('click', () => {
        alert(`Ilmoittauduttu tapahtumaan: ${tapahtuma.nimi}`);
    });
}

// Lisää kaikki tapahtumat kalenteriin
tapahtumat.forEach(tapahtuma => {
    lisaaTapahtuma(tapahtuma);
});
