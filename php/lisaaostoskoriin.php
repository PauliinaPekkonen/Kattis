<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try{
$yhteys = mysqli_connect("localhost", "trtkm25b_5", "LoOcNj7g", "wp_trtkm25b_5");
}
catch(Exception $e){
    header("Location:../html/yhteysvirhe.html");
    exit;
}
?>

<?php
$tuotenro = $_POST["tuotenro"];
$maara = $_POST["maara"];
$sql = "select hinta, tuotenimi from tuote where tuotenro = ?";
$stmt = mysqli_prepare($yhteys, $sql);
mysqli_stmt_bind_param($stmt, "s", $tuotenro);
mysqli_stmt_execute($stmt);
$tulos = mysqli_stmt_get_result($stmt);
$hinta = null;
if ($rivi = mysqli_fetch_assoc($tulos)) {
    $tuotenimi = $rivi["tuotenimi"];
    $hinta = (float)$rivi["hinta"];

    $sql2 = "insert into ostoskori (tuotenro, tuotenimi, hinta, maara) values (?, ?, ?, ?)";
    $stmt2 = mysqli_prepare($yhteys, $sql2);
    mysqli_stmt_bind_param($stmt2, 'ssdi', $tuotenro, $tuotenimi, $hinta, $maara);
    mysqli_stmt_execute($stmt2);
}
mysqli_close($yhteys);
?>