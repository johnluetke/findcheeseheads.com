<?php
require_once("config.php");
require_once("vendor/autoload.php");

use Silex\Application;
use FindCheeseheads\App;
use FindCheeseheads\Controllers\AddController;
use FindCheeseheads\Controllers\BrowseController;
use FindCheeseheads\Controllers\SearchController;

$app = new Application();
$app['debug'] = true;
$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app->register(new \Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => "./views"
));

$fc = new App();

$app->get("/", function () use ($app, $fc) {
    return $app['twig']->render("landing_page.twig", array(
        "fc" => $fc
    ));
});

$app->mount("/add", new AddController());
$app->mount("/browse", new BrowseController());
$app->mount("/search", new SearchController());

$app->run();
?>
