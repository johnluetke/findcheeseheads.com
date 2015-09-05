<?php
include("views/header.twig");

if (isset($_GET['q'])) {
    $q = filter_var($_GET['q'], FILTER_SANITIZE_STRING);

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
    $r = $db->query(sprintf("SELECT * FROM Place WHERE name LIKE '%s' OR address LIKE '%s' AND pending = 0;", "%".$q."%", "%".$q."%"));
    $results = $r->fetchAll();
}
?>

<div class="container">
    <?php if (!isset($_GET['q'])) { ?>
    <div class="row">
        <h2>Use the field above to search</h2>
    </div>
    <?php } else if (sizeof($results) == 0) { ?>
    <div class="row">
        <h2>No bars were found :-(</h2>
        <div class="row align-center">
            <a href="/add.php">
                <button type="button" class="btn btn-default">Why not add one?</button>
            </a>
        </div>
    </div>
    <?php } else { ?>
    <?php foreach ($results as $row) { ?>
    <?php include("views/listing.twig"); ?>
    <?php } ?>
    <?php } ?>
</div>

<?php include("views/footer.twig"); ?>
