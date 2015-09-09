<?php include("views/header.twig"); ?>

<div class="cover">
    <div class="jumbotron vertical-center">
        <div class="container">
            <h1 class="text-nowrap">Find Cheeseheads<span class="hidden-sm hidden-xs"> Near You</span></h1>
            <form id="search" action="search.php" method="get">
                <div class="form-group has-feedback">
                    <input type="text" class="form-control input-lg" name="q" placeholder="Search by ZIP code, city or country" value="<?php echo $_GET['q']; ?>" />
                    <i class="glyphicon glyphicon-search form-control-feedback"></i>
                </div>
            </form>
            <p class="lead text-center">Not sure which local watering holes will welcome you on gameday? Find out above.</p>
        </div>
    </div>
</div>

<footer class="sticky-footer">
    <div class="container small">
        <p class="pull-left">&copy; 2015 FindCheeseheads.com</p>
        <p class="pull-right">A product of <a href="http://www.reddit.com/r/GreenBayPackers" target="_blank">/r/GreenBayPackers</a> and <a href="http://www.reddit.com/r/FindCheeseheads" target="_blank">/r/FindCheeseheads</a></p>
        <p class="pull-right" style="clear: right;">Image Credit AP/Mike Roemer</p>
    </div>
</footer>

<script>
$(document).ready(function() {
    $(".cover .jumbotron h1").fitText(1.2);
});
</script>
