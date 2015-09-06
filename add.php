<?php
include("views/header.twig");

if (isset($_POST)) {
    $data = array();
    foreach ($_POST as $k=>$v) {
        $v = filter_var($v, FILTER_SANITIZE_STRING);
        $data[$k] = $v;
    }

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);

    $stmt = $db->prepare("INSERT INTO Place (name, address, lat, lng) VALUES(?, ?, ? ,?);");
    $r = $stmt->execute(array($data['name'], $data['address'], $data['lat'], $data['lng']));
}
?>

<div class="container">
    <?php if ($r) { ?>
    <div class="alert alert-success" role="alert">Thanks! Your submission will be reviewed shortly.</div>
    <?php } ?>
    <form id="add-place" method="post" class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-2">
                <label for="place-name" class="control-label">Venue Name</label>
            </div>
            <div class="col-sm-8">
                <input type="text" id="place-name" name="name" class="form-control" placeholder="Bart's Bar and Grill"/>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-2">
                <label for="place-address" class="control-label">Address</label>
            </div>
            <div class="col-sm-8">
                <textarea class="form-control" name="address" id="place-address" placeholder="1265 Lombardi Ave
Green Bay, WI 54304" rows="3"></textarea>
                <input type="hidden" name="lat" />
                <input type="hidden" name="lng" />
            </div>
            <div class="col-sm-2 col-xs-12">
                <div id="map"></div>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
                <input type="submit" class="btn btn-primary" value="Submit for Review" />
                <div id="review-text">
                    <em class="small">Our staff will approve your submission after review. Reviews may take up to two days.</em>
                </div>
            </div>
        </div>
    </form>
</div>

<?php include("views/footer.twig"); ?>
