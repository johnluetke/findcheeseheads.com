<?php
include("views/header.twig");
include("views/navbar.twig");

if (isset($_POST)) {
    $data = array();
    foreach ($_POST as $k=>$v) {
        $v = filter_var($v, FILTER_SANITIZE_ENCODED);
        $data[$k] = $v;
    }

    $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER_W, DATABASE_PASS);

    $stmt = $db->prepare("INSERT INTO Place (name, address, lat, lng) VALUES(?, ?, ? ,?);");
    $r = $stmt->execute(array($data['name'], $data['address'], $data['lat'], $data['lng']));
}
?>

<div class="container">
    <h2 class="page-header">Add a Venue</h2>
    <p><strong>Find Cheeseheads</strong> is a community-driven resource. As such, we rely on the community to share Packer bars and gathering spots throughout the world.</p>
    <p>All venues found here have been submitted <strong>by Cheeseheads, for Cheeseheads</strong>. Please feel free to share your local Packer bar with others by adding it to our directory.</p>
</div>

<div class="container">
    <?php if ($r) { ?>
    <div class="alert alert-success" role="alert">Thanks! Your submission will be reviewed by our staff before being published.</div>
    <?php } ?>
    <form id="add-place" method="post" class="form-horizontal" autocomplete="off">
        <div class="form-group">
            <div class="col-sm-2">
                <label for="place-name" class="control-label">Venue Name</label>
            </div>
            <div class="col-sm-8">
                <input type="text" id="place-name" name="name" class="form-control" placeholder="Bart's Bar and Grill" required/>
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-2">
                <label for="place-address" class="control-label">Address</label>
            </div>
            <div class="col-sm-8">
                <textarea class="form-control" name="address" id="place-address" placeholder="1265 Lombardi Ave
Green Bay, WI 54304" rows="3" required></textarea>
                <input type="hidden" name="lat" />
                <input type="hidden" name="lng" />
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-2"></div>
            <div class="col-sm-8">
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

<script>
$(document).ready(function() {
    placeMap = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 41.030,
            lng: -30.058
        },
        zoom: 2,
        disableDefaultUI: true,
        zoomControl: true
    });
});

$('#add-place').validate({
    onkeyup: false,
    rules: {
        name: {
            required: true,
            minlength: 3
        },
        address: {
            required: true,
            validateAddress: true
        }
    },
    messages: {
        name: {
            required: "Please enter the name of this venue.",
            minlength: "We ask that venue names have at least 3 characters"
        },
        address: {
            required: "Please enter the address of this venue.",
            validateAddress: "Google could not validate this address."
        }
    },
    errorPlacement: function(label, element) {
        element.parent().parent().addClass("has-error has-feedback");
        element.after(label.addClass("text-danger"));
        element.after($("<span/>").addClass("glyphicon glyphicon-remove form-control-feedback"));
    },
    success: function(label) {
        label.parent().parent().removeClass("has-error has-feedback");
        label.parent().find(".glyphicon").remove();
    } 
});

$('#add-place').on("submit", function(event) {
    if (!$("#add-place").valid()) {
        event.preventDefault();
    }
    else if ($("#place-address").data("isValidating") == true) {
        event.preventDefault();
    }
});
</script>

<?php include("views/footer.twig"); ?>
