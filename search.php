<?php
include("views/header.twig");
include("views/navbar.twig");

require("vendor/autoload.php");

use \FindCheeseheads\API\Search;

if (isset($_GET['q'])) {
    $q = filter_input(INPUT_GET, "q", FILTER_SANITIZE_STRING);
    $c = filter_input(INPUT_GET, "c", FILTER_SANITIZE_STRING);
    $c = strlen($c) == 0 ? DEFAULT_COUNTRY : $c;

    list($codes, $cities) = Search::zipCodeSearch($c, $q, 1);
    if (sizeof($codes) < 1) {
        unset($codes);
        unset($cities);
    }
    else {
        $where = "";
        foreach ($codes as $code) {
            $where = sprintf("%s OR %s LIKE '%%%s%%'", $where, "address", $code);
        }

        foreach ($cities as $city) {
            $where = sprintf("%s OR %s LIKE '%%%s%%'", $where, "address", $city);
        }
    }

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
    $r = $db->query(sprintf("SELECT * FROM Place WHERE name LIKE '%s' OR address LIKE '%s' %s AND pending = 0;", "%".$q."%", "%".$q."%", $where));
    $results = $r->fetchAll();
}

function getZipCodeCoords($zip_code) {
    $data = \Zippopotamus\Service\Zippopotamus::code(DEFAULT_COUNTRY, $zip_code);
    $result = $data->places[0];
    return array(
        "city" => $result->{'place name'},
        "lat"  => $result->latitude,
        "lng"  => $result->longitude
    );
}
?>

<div class="container">
    <h2 class="page-header">Search</h2>
</div>

<div class="container">
    <form id="search" action="search.php" method="get" class="form-horizontal">
        <div class="form-group has-feedback">
            <div class="col-sm-8">
                <input type="text" class="form-control" name="q" placeholder="Search by name or address" value="<?php echo $_GET['q']; ?>" />
                <i class="glyphicon glyphicon-search form-control-feedback"></i>
            </div>
            <div class="col-sm-3">
                <select class="form-control" name="c">
                    <?php
                    foreach (Search::getCountries() as $code=>$name) {
                    ?>
                        <option value="<?php echo $code;?>" <?php echo ($code == (isset($c) ? $c : DEFAULT_COUNTRY)) ? "selected" : "";?>><?php echo $name;?></option>
                    <?php
                        }
                    ?>
                </select>
            </div>
            <div class="col-sm-1">
                <input type="submit" class="btn btn-primary form-control" value="Search"/a>
            </div>
         </div>
    </form>
    <?php if (isset($cities) && sizeof($cities) > 1) { ?>
    <div class="container">
        <p>Results include venues in <?php echo implode_list(", ", $cities);?>.</p>
    </div>
    <?php } ?>
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
