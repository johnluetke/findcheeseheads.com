<?php
include("views/header.twig");

if (isset($_POST)) {
    $data = array();
    foreach ($_POST as $k=>$v) {
        $v = filter_var($v, FILTER_SANITIZE_STRING);
        $data[$k] = $v;
    }

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);

    $stmt = $db->prepare("INSERT INTO Place (name, address) VALUES(?, ?);");
    $r = $stmt->execute(array($data['name'], $data['address']));
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
    <?php if ($r) { ?>
    <div class="alert alert-success" role="alert">Thanks! Your submission will be reviewed shortly.</div>
    <?php } ?>
    <div class="row">
        <div class="col-md-6">
            <form method="post" id="add">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" class="form-control" placeholder="Name"/>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <textarea class="form-control" name="address" id="address" placeholder="Address"></textarea>
                </div>
                <div class="form-group">
                    <img id="map" style="width: 200; height: 200"/>
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-default" value="Submit for Review" />
                </div>
            </form>
        </div>
    </div>
</div>

<?php include("views/footer.twig"); ?>
