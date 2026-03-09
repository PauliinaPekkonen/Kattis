<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try{
$yhteys = mysqli_connect("localhost", "trtkm25b3_5", "LoOcNj7g", "trtkm25b3_5");
}
catch(Exception $e){
    header("Location:../../html/yhteysvirhe.html");
    exit;
}

$tulos = mysqli_query($yhteys, "select * from tuote");
while ($rivi=mysqli_fetch_object($tulos)) {
    $tuote = new class{};
    $tuote->tuotenro=$rivi->tuotenro;
    $tuote->tuotenimi=$rivi->tuotenimi;
    $tuote->hinta=$rivi->hinta;
    $tuotteet[]=$tuote;
}
mysqli_close($yhteys);
print json_encode($tuotteet);
exit;
?>