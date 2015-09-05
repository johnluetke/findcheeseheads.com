<?php
include("views/header.twig");

$db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
$r = $db->query("SELECT * FROM Place WHERE pending = 0;");
$results = $r->fetchAll();
?>

<div class="container">
    <?php foreach ($results as $row) { ?>
    <?php include("views/listing.twig"); ?>
    <?php } ?>
</div>

<?php include("views/footer.twig"); ?>
