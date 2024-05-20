// esimerkit tapahtumista
const tapahtumat = [
    { nimi: "Live-musiikkia", paikka: "Kahvila Espresso", aika: "20.6.2024 klo 18:00" },
    { nimi: "Kirjailijavieraana", paikka: "Kahvila Espresso", aika: "10.7.2024 klo 16:30" },
    { nimi: "Maalausnäyttely", paikka: "Kahvila Espresso", aika: "15.7.2024 klo 12:00" }
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
function initMap() { //Kartan kohdan määrittely
    var keskukatu3 = {lat: 60.405279518307005, lng: 25.101080912752735}; //koordinaatit kartasta Google maps (huom! pieni L-kirjain kohdassa lng)
    var kartta = new google.maps.Map(document.getElementById('kartta'), { //kartan luominen
        zoom: 15,
        center: keskikatu3
    });
    var merkki = new google.maps.Marker({ //merkin luominen karttaan
        position: keskikatu3,
        map: kartta,
        title: 'Keskikatu 3, Kerava'

    });
}