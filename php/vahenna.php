<?php
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try{
$yhteys = mysqli_connect("localhost", "trtkm25b3_5", "LoOcNj7g", "trtkm25b3_5");
}
catch(Exception $e){
    header("Location:../html/yhteysvirhe.html");
    exit;
}
$id=isset($_GET["id"]) ? $_GET["id"] : 0;
$maara = $_GET["maara"];

$sql = "update ostoskori set maara = maara - 1 where id = ? and maara > 0";
$stmt = mysqli_prepare($yhteys, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

/* poistetaan rivi jos määrä on 0 */
$sql2 = "delete from ostoskori where id = ? AND maara = 0";
$stmt2 = mysqli_prepare($yhteys, $sql2);
mysqli_stmt_bind_param($stmt2, "i", $id);
mysqli_stmt_execute($stmt2);

mysqli_close($yhteys);
exit;
?>