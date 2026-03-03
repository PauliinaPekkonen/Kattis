//maksajan nimen automaattinen täydennys, silloin kun checkbox "sama kuin tilaaja" valitaan. Jos valita klikataan pois, kentät tyhjennetään.
function autofillPayer() {
  //alustetaan muuttujat
  const form = document.getElementById('tilauslomake');
  const checkBox = form.querySelector('#same_as_orderer');
  const firstName = form.querySelector('#orderer_first_name').value;
  const lastName = form.querySelector('#orderer_last_name').value;

  //jos checkbox on valittuna, asetetaan maksajan kenttiin tilaajan arvot. Jos checkbox ei ole valittuna, tyhjätään kentät.
  if (checkBox.checked) {
    form.querySelector('#payer_first_name').value = firstName;
    form.querySelector('#payer_last_name').value = lastName;
  } else {
    form.querySelector('#payer_first_name').value = '';
    form.querySelector('#payer_last_name').value = '';
  }
}

//laskutusosoitteen automaattinen täydennys, silloin kun checkbox "sama kuin toimitusosoite" valitaan. Jos valita klikataan pois, kentät tyhjennetään.
function autofillInvoicingAddress() {
  //alustetaan muuttujat
  const form = document.getElementById('tilauslomake');
  const checkBox = form.querySelector('#same_as_delivery');
  const address = form.querySelector('#delivery_address').value;
  const address2 = form.querySelector('#delivery_address2').value;
  const postCode = form.querySelector('#delivery_post_code').value;
  const postArea = form.querySelector('#delivery_post_area').value;

  //jos checkbox on valittuna, asetetaan laskutusosoitteen kenttiin toimitusosoitteen arvot. Jos checkbox ei ole valittuna, tyhjätään kentät.
  if (checkBox.checked) {
    form.querySelector('#invoicing_address').value = address;
    form.querySelector('#invoicing_address2').value = address2;
    form.querySelector('#invoicing_post_code').value = postCode;
    form.querySelector('#invoicing_post_area').value = postArea;
  } else {
    form.querySelector('#invoicing_address').value = '';
    form.querySelector('#invoicing_address2').value = '';
    form.querySelector('#invoicing_post_code').value = '';
    form.querySelector('#invoicing_post_area').value = '';
  }
}

//päivitetään tuotteen hinta ja rivin summa, kun tuotetta tai määrää muutetaan
function setPrice(rowId) {
  //hinnasto
  const prices = {
    hihna: 19.90,
    hiekkalaatikko: 100.00,
    kissan_herkku: 3.99,
    kissan_joulupanta: 9.90,
    kissan_valjaat: 19.90,
    kissanminttuhiiri: 9.90,
    kissan_puu: 29.90,
    koiran_kuivaruoka: 29.90,
    koiran_koysilelu: 5.99,
  };

  //muotoillaan hinta suomalaisittain ja kahden desimaalin tarkkuudelle
  const formatted = new Intl.NumberFormat('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  //päivitetään rivin hinta ja summa tuotevalinnan ja lukumäärän perusteella
  const product = document.getElementById(`product${rowId}`);
  const quantity = document.getElementById(`quantity${rowId}`);
  const price = document.getElementById(`price${rowId}`);
  const sum = document.getElementById(`sum${rowId}`);

  //asetetaan muuttujalle productKey tuotevalinnan arvo
  const productKey = product.value;
  // jos ei valintaa, hinta 0
  const unitPrice = prices[productKey] ?? 0;
  //parsitaan joko muuttujan quantity arvo tai 0, mikäli arvo ei ole numeraalinen. 10 lopussa tarkoittaa, että käytetään desimaalijärjestelmää.
  const qty = parseInt(quantity.value || '0', 10);

  //päivitetään yksikköhinta
  price.textContent = formatted.format(unitPrice);

  //päivitetään rivin yhteissumma (hinta * määrä) 
  //isNaN(qty): Tarkistaa onko muuttuja qty “Not-a-Number”. Jos ehto on tosi (eli muutuja ei ole numero), asetetaan arvoksi 0. Muussa tapauksessa käytetään muuttujan qty arvoa.
  const lineTotal = unitPrice * (isNaN(qty) ? 0 : qty);
  sum.textContent = formatted.format(lineTotal);
  //kutsutaan funktiota, joka päivittää yhteissumman
  updateGrandTotal();
}

//nollataan tilauslomake (reset-painike nollaa input-fieldit automaattisesti, mutta tällä nollataan myös lomakkeen lasketut arvot.)
function resetTotals() {
  //käsiteltävien rivien määrä = 5
  const rows = [1, 2, 3, 4, 5];
  const zero = '0,00';

  //käydään jokainen rivi läpi ja asetetaan niille "lähtötilanteen" arvo
  rows.forEach(i => {
    //alustetaan muuttujat
    const product = document.getElementById(`product${i}`);
    const quantity = document.getElementById(`quantity${i}`);
    const price = document.getElementById(`price${i}`);
    const sum = document.getElementById(`sum${i}`);

    //asetetaan "uudet" (alkuperäiset) arvot
    if (product) product.selectedIndex = 0;
    if (quantity) quantity.value = 1;
    if (price) price.textContent = zero;
    if (sum) sum.textContent = zero;
  });

  //alustetaan muuttujat
  const vat = document.getElementById('vat');
  const total = document.getElementById('grand_total');

  //asetetaan vielä alv-, toimitus-, ja yhteensä riveille niiden lähtöarvot
  if (vat) vat.textContent = zero;
  if (shipping) shipping.textContent = "7,50";
  if (total) total.textContent = "7,50";
}

//päivitetään yhteensä-rivin summa ja lasketaan alv. Samalla lasketaan, ylittääkö tilauksen summa tarjouksessa mainitun 55e, jolloin toimituskulut ovat 0
function updateGrandTotal() {
  //alustetaan muuttujat
  let total = 0;
  let vat = 0;
  let shipping = 0;
  let grandTotal = 0;

  for (let i = 1; i <= 5; i++) {
    //käydään läpi rivien summat ja asetetaan ne muuttujaan
    const sum = document.getElementById(`sum${i}`);
    if (!sum) continue;
    const sumText = sum.textContent;
    //parsitaan arvo ja korvataan pilkku pisteellä laskennan mahdollistamiseksi
    const value = parseFloat(sumText.replace(',', '.'));
    //isNaN(value): Tarkistaa onko muuttuja value “Not-a-Number”. Jos ehto on tosi (eli muutuja ei ole numero), otetaan arvoksi nolla, muussa tapauksessa muuttujan arvo. += lisää muuttujan value arvon muuttujaan total
    total += isNaN(value) ? 0 : value;
  }

  //jos yhteensä-summa on yli 55e, asetetaan toimituskulut nollaksi
  if (total < 55) {
    shipping = 7.50;
  } else {
    shipping = 0;
  }

  //lasketaan lopullinen yhteissumma sisältäen toimituksen ja lasketaan samalla alv kääntäen loppusummasta.
  grandTotal = total + shipping;
  vat = total - (total / 1.255);

  //muotoillaan hinta suomalaisittain ja kahden desimaalin tarkkuudelle
  const formatted = new Intl.NumberFormat('fi-FI', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  //asetetaan lasketut tiedot paikoilleen lomakkeelle
  document.getElementById('grand_total').textContent = formatted.format(grandTotal);
  document.getElementById('vat').textContent = formatted.format(vat);
  document.getElementById('shipping').textContent = formatted.format(shipping);
}
