// esimerkit tapahtumista
const tapahtumat = [
    { nimi: "Live-musiikkia", paikka: "Kahvila Espresso", aika: "20.5.2024 klo 18:00" },
    { nimi: "Kirjailijavieraana Elli Esimerkki", paikka: "Kahvila Espresso", aika: "10.6.2024 klo 16:30" },
    { nimi: "Maalausnäyttely: Kesän taikaa", paikka: "Kahvila Espresso", aika: "15.6.2024 klo 12:00" }
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
        // Lisää ilmoittautumislomake
        naytaIlmoittautumisLomake(tapahtuma);
    });
}

// Funktio, joka näyttää ilmoittautumislomakkeen
function naytaIlmoittautumisLomake(tapahtuma) {
    const lomakeDiv = document.createElement('div');
    lomakeDiv.classList.add('ilmoittautumis-lomake');

    lomakeDiv.innerHTML = `
        <h3>Ilmoittaudu tapahtumaan: ${tapahtuma.nimi}</h3>
        <form id="ilmoittautumisForm">
            <label for="etunimi">Etunimi:</label>
            <input type="text" id="etunimi" name="etunimi" required><br>
            <label for="sukunimi">Sukunimi:</label>
            <input type="text" id="sukunimi" name="sukunimi" required><br>
            <label for="email">Sähköpostiosoite:</label>
            <input type="email" id="email" name="email" required><br>
            <button type="submit" class="laheta-button">Lähetä</button>
        </form>
    `;


    document.body.appendChild(lomakeDiv);

    const ilmoittautumisForm = document.getElementById('ilmoittautumisForm');
    ilmoittautumisForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const etunimi = document.getElementById('etunimi').value;
        const sukunimi = document.getElementById('sukunimi').value;
        const email = document.getElementById('email').value;

        // Tallenna ilmoittautumistiedot Local Storageen
        tallennaIlmoittautuminen({ etunimi, sukunimi, email, tapahtuma: tapahtuma.nimi });
        
        // Näytä Peruuta ilmoittautuminen -nappi
        naytaPeruutaIlmoittautuminenNappi(tapahtuma, lomakeDiv);
    });
}

// Funktio, joka luo ilmoittautumisen peruuttamisnapin
function naytaPeruutaIlmoittautuminenNappi(tapahtuma, lomakeDiv) {
    lomakeDiv.innerHTML = `
        <p>Olet ilmoittautunut tapahtumaan: ${tapahtuma.nimi}</p>
        <button class="peruuta-button">Peruuta ilmoittautuminen</button>
    `;

    const peruutaButton = lomakeDiv.querySelector('.peruuta-button');
    peruutaButton.addEventListener('click', () => {
        lomakeDiv.remove();
        alert(`Ilmoittautuminen peruttu tapahtumaan: ${tapahtuma.nimi}`);
        // Poista ilmoittautumistiedot Local Storagesta
        poistaIlmoittautuminen(tapahtuma.nimi);
    });
}

// Funktio, joka tallentaa ilmoittautumistiedot Local Storageen
function tallennaIlmoittautuminen(ilmoittautuja) {
    let ilmoittautumiset = localStorage.getItem('ilmoittautumiset');
    if (ilmoittautumiset) {
        ilmoittautumiset = JSON.parse(ilmoittautumiset);
    } else {
        ilmoittautumiset = [];
    }
    ilmoittautumiset.push(ilmoittautuja);
    localStorage.setItem('ilmoittautumiset', JSON.stringify(ilmoittautumiset));
}

// Funktio, joka poistaa ilmoittautumistiedot Local Storagesta
function poistaIlmoittautuminen(tapahtumaNimi) {
    let ilmoittautumiset = localStorage.getItem('ilmoittautumiset');
    if (ilmoittautumiset) {
        ilmoittautumiset = JSON.parse(ilmoittautumiset);
        ilmoittautumiset = ilmoittautumiset.filter(ilmoittautuja => ilmoittautuja.tapahtuma !== tapahtumaNimi);
        localStorage.setItem('ilmoittautumiset', JSON.stringify(ilmoittautumiset));
    }
}

// Lisää kaikki tapahtumat kalenteriin
tapahtumat.forEach(tapahtuma => {
    lisaaTapahtuma(tapahtuma);
});
function initMap() {
    const keskikatu3 = { lat: 60.405279518307005, lng: 25.101080912752735 }; // koordinaatit kartasta Google maps (huom! pieni L-kirjain kohdassa lng)
    const kartta = new google.maps.Map(document.getElementById('kartta'), { // kartan luominen
        zoom: 15,
        center: keskikatu3
    });
    const merkki = new google.maps.Marker({ // merkin luominen karttaan
        position: keskikatu3,
        map: kartta,
        title: 'Keskikatu 3, Kerava'
    });
}