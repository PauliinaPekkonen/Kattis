let tuotteet=null;
function lueOstoskori() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ostoskori=JSON.parse(this.responseText);
            tulostaOstoskori(ostoskori)
            }
        };
    xmlhttp.open("GET", "../PHP/ostoskori/ostoskori.php", true);
    xmlhttp.send();
}
function tulostaOstoskori(ostoskori) {
    let text = "";
    let valisumma = 0;
    let vat = 0;
    let shipping = 0;
    let grandTotal = 0;
    for (x in ostoskori) {
        let yhteensa = ostoskori[x].maara * ostoskori[x].hinta;
        valisumma += yhteensa;

        text += "<tr>";
        text += "<td style='text-align:left'>" + "<button onclick='poista("+ostoskori[x].id+");'>poista</button>";
        text += "<td data-label='tuote' style='text-align:left'>" + ostoskori[x].tuotenimi + "</td>";
        text += "<td class='maara' data-label='määrä'>" + "<button onclick='vahenna("+ostoskori[x].id+");'>-</button>" + ostoskori[x].maara + "<button onclick='lisaa("+ostoskori[x].id+");'>+</button>" + "</td>";
        text += "<td data-label='hinta'>" + ostoskori[x].hinta + " €</td>";
        text += "<td data-label='yhteensä'>" + yhteensa.toFixed(2) + " €</td>";
        text += "</tr>";
        }
    
    if (valisumma < 55) {
        shipping = 7.50;
    } else {
        shipping = 0;
    }
    
    
    grandTotal = valisumma + shipping;
    vat = grandTotal - (grandTotal / 1.255);
    
    text += "<tr>";
    text += "<td colspan='4' style='text-align:right'>Välisumma</td>";
    text += "<td>" + valisumma.toFixed(2) + " €</td>";
    text += "</tr>";

    text += "<tr>";
    text += "<td colspan='4' style='text-align:right'>Toimituskulut</td>";
    text += "<td>" + shipping.toFixed(2) + " €</td>";
    text += "</tr>";

    text += "<tr>";
    text += "<td colspan='4' style='text-align:right'>ALV (25.5%)</td>";
    text += "<td>" + vat.toFixed(2) + " €</td>";
    text += "</tr>";

    text += "<tr style='font-weight:bold'>";
    text += "<td colspan='4' style='text-align:right'>Kaikki yhteensä</td>";
    text += "<td>" + grandTotal.toFixed(2) + " €</td>";
    text += "</tr>";

    document.getElementById("ostoskori").innerHTML = text;
}
function poista(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lueOstoskori();
            }
        };
    xmlhttp.open("GET", "../PHP/ostoskori/poistakorista.php?id=" + id, true);
    xmlhttp.send();
}
function vahenna(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lueOstoskori();
            }
        };
    xmlhttp.open("GET", "../PHP/ostoskori/vahenna.php?id=" + id, true);
    xmlhttp.send();
}
function lisaa(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lueOstoskori();
            }
        };
    xmlhttp.open("GET", "../PHP/ostoskori/lisaa.php?id=" + id, true);
    xmlhttp.send();
}