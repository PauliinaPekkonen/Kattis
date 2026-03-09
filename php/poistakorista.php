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

$sql = "delete from ostoskori where id = ?";
$stmt = mysqli_prepare($yhteys, $sql);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

mysqli_close($yhteys);
exit;
?>