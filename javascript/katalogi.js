document.addEventListener('DOMContentLoaded', () => {

//Haetaan kategoriapainikkeet ja tuotekortit//
const kategoriat = document.querySelectorAll('.kategoria-linkki');
const tuotteet = document.querySelectorAll('.tuote-kortti');
const ostaNappi = document.getElementById("MinunNappiOsta");


//ForEach varmistaa, että jokainen nappi toimii//
kategoriat.forEach(nappi => {
  nappi.addEventListener('click', e => {
    // TÄRKEÄÄ: Estetään oletustoiminto vain kategorialinkeiltä,
    // jotta sivu ei hyppää ylös suodatuksen aikana.


    //Haetaan napin data-filter arvo, eli mihin kategoriaan suodatetaan. Script lukee arvot data-ominaisuuden kautta.//
    //data-attribuutti on tapa tallentaa lisätietoja HTML-elementteihin, se on tarkoitettu logiikkaa varten eikä tyylittelyyn.//
    const filter = nappi.dataset.filter; 


    //Käydään kaikki tuotekortit läpi ja asetetaan niiden näkyvyys suodattimen mukaan, eli näytetään vain valitun kategorian tuotteet. Ns kysytään jokaiselta tuotteelta, kuuluuko se valittuun kategoriaan.//
    tuotteet.forEach(tuote => {
      //Jos filter on 'kaikki' tai tuotteen kategoria vastaa filtteriä, näytetään vain ne tuotteet joiden data-kategoria vastaa valittua filtteriä, muut piilotetaan.//
      tuote.style.display = filter === 'kaikki' || tuote.dataset.kategoria === filter ? '' : 'none';
      //display:none piilottaa elementin näkyvistä, display:'' palauttaa sen oletusnäkyvyyteen.

    });
  });
});
window.onclick = function(e) {
    if (e.target.closest('.tuote-kortti')) {
        window.location.href = "tuote100002.html";
    }
};
});


 