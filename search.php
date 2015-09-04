<?php
include("views/header.twig");

if (isset($_GET['q'])) {
    $q = filter_var($_GET['q'], FILTER_SANITIZE_STRING);

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
    $r = $db->query(sprintf("SELECT * FROM Place WHERE name LIKE '%s' OR address LIKE '%s' AND pending = 0;", "%".$q."%", "%".$q."%"));
    $results = $r->fetchAll();
}
?>

<div class="jumbotron" style="background-image: url('images/banner.jpg');">
    <div class="container">
        <h1 style="color: #FFB612;">Find Packer Bars Near You</h1>
        <p><form action="search.php" method="get">
        <input type="Search" class="form-control" name="q" value="<?php echo $_GET['q'];?>" placeholder="Search"></form></p>
    </div>
</div>

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
    <div class="row">
        <div class="vote"></div>
        <div class="info">
            <h2><?php echo $row['name'];?></h2>
            <p><?php echo $row['address'];?></p>
        </div>
        <ul class-"small">
            <li>Edit</li>
            <li>Report Issue</li>
        </ul>
    </div>
    <?php } ?>
    <?php } ?>
</div>

<?php include("views/footer.twig"); ?>
