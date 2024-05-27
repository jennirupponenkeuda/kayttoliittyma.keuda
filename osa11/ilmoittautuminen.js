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
        // Lisää ilmoittautumislomake tapahtuman alle
        naytaIlmoittautumisLomake(tapahtuma, tapahtumaDiv);
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

// Funktio, joka näyttää ilmoittautumislomakkeen
function naytaIlmoittautumisLomake(tapahtuma, parentDiv) {
    // Poista olemassa oleva lomake, jos sellainen on
    const existingForm = parentDiv.querySelector('.ilmoittautumis-lomake');
    if (existingForm) {
        existingForm.remove();
    }

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

    // Lisää lomake suoraan tapahtumaDiv elementin jälkeen
    parentDiv.parentNode.insertBefore(lomakeDiv, parentDiv.nextSibling);

    const ilmoittautumisForm = lomakeDiv.querySelector('#ilmoittautumisForm');
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

// Lisää kaikki tapahtumat kalenteriin
tapahtumat.forEach(tapahtuma => {
    lisaaTapahtuma(tapahtuma);
});

