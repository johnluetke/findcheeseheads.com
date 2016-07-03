<?php
require_once("config.php");
require_once("vendor/autoload.php");

use Silex\Application;
use FindCheeseheads\App;
use FindCheeseheads\Controllers\AddController;
use FindCheeseheads\Controllers\APIController;
use FindCheeseheads\Controllers\BrowseController;
use FindCheeseheads\Controllers\SearchController;

$app = new Application();
$app['debug'] = true;
$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app->register(new \Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => "./src/templates"
));

$fc = new App();

$app->get("/", function () use ($app, $fc) {
    return $app['twig']->render("index.template.html", array(
        "version" => $fc->getVersion()
    ));
});

$app->mount("/add", new AddController());
$app->mount("/api", new APIController());
$app->mount("/browse", new BrowseController());
$app->mount("/search", new SearchController());

$app->run();
?>
