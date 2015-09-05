<?php
include("views/header.twig");

$db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
$r = $db->query("SELECT * FROM Place WHERE pending = 0;");
$results = $r->fetchAll();
?>

<div class="jumbotron" style="background-image: url('images/banner.jpg');">
    <div class="container">
        <h1 style="color: #FFB612;">Find Packer Bars Near You</h1>
        <p><form action="search.php" method="get">
        <input type="Search" class="form-control" name="q" value="<?php echo $_GET['q'];?>" placeholder="Search"></form></p>
    </div>
</div>

<div class="container">
    <?php foreach ($results as $row) { ?>
    <?php include("views/listing.twig"); ?>
    <?php } ?>
</div>

<?php include("views/footer.twig"); ?>
