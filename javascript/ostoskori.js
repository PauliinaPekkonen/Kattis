let tuotteet=null;
function lueOstoskori() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            ostoskori=JSON.parse(this.responseText);
            tulostaOstoskori(ostoskori)
            }
        };
    xmlhttp.open("GET", "../ostoskori/ostoskori.php", true);
    xmlhttp.send();
}
function tulostaOstoskori(ostoskori) {
    let text = "";
    for (x in ostoskori) {
        let yhteensa = ostoskori[x].maara * ostoskori[x].hinta;
        text += "<tr>";
        text += "<td>" + "<button onclick='poista("+ostoskori[x].id+");'>poista</button>";
        text += "<td data-label='tuote'>" + ostoskori[x].tuotenimi + "</td>";
        text += "<td data-label='määrä'>" + "<button onclick='vahenna("+ostoskori[x].id+");'>-</button>" + ostoskori[x].maara + "<button onclick='lisaa("+ostoskori[x].id+");'>+</button>" + "</td>";
        text += "<td data-label='hinta'>" + ostoskori[x].hinta + "</td>";
        text += "<td data-label='yhteensä'>" + yhteensa + "</td>";
        text += "</tr>";
        }
    document.getElementById("ostoskori").innerHTML = text;
}
function poista(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lueOstoskori();
            }
        };
    xmlhttp.open("GET", "../ostoskori/poistakorista.php?id=" + id, true);
    xmlhttp.send();
}
function vahenna(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lueOstoskori();
            }
        };
    xmlhttp.open("GET", "../ostoskori/vahenna.php?id=" + id, true);
    xmlhttp.send();
}
function lisaa(id) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            lueOstoskori();
            }
        };
    xmlhttp.open("GET", "../ostoskori/lisaa.php?id=" + id, true);
    xmlhttp.send();
}