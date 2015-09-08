<?php
include("views/header.twig");
include("views/navbar.twig");

if (isset($_GET['q'])) {
    $q = filter_input(INPUT_GET, "q", FILTER_SANITIZE_ENCODED);

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
    $r = $db->query(sprintf("SELECT * FROM Place WHERE name LIKE '%s' OR address LIKE '%s' AND pending = 0;", "%".$q."%", "%".$q."%"));
    $results = $r->fetchAll();
}
?>

<div class="container">
    <h2 class="page-header">Search</h2>
</div>

<div class="container">
    <form id="search" action="search.php" method="get">
        <div class="form-group has-feedback">
            <input type="text" class="form-control" name="q" placeholder="Search by name or address" value="<?php echo $_GET['q']; ?>" />
            <i class="glyphicon glyphicon-search form-control-feedback"></i>
         </div>
    </form>
</div>

<div class="container">
    <?php if (!isset($_GET['q'])) { ?>
    <?php } else if (sizeof($results) == 0) { ?>
    <h2>No bars were found :-(</h2>
    <div class="center-block text-center">
        <a href="/add.php">
            <button type="button" class="btn btn-default">Why not add one?</button>
        </a>
    </div>
    <?php } else { ?>
    <?php foreach ($results as $row) { ?>
    <?php include("views/listing.twig"); ?>
    <?php } ?>
    <div class="center-block text-center">
        <a href="/add.php">
            <button type="button" class="btn btn-default">Know of another? Add it!</button>
        </a>
    </div>
    <?php } ?>
</div>

<?php include("views/footer.twig"); ?>
