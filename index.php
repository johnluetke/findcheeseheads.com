<?php
require_once("config.php");
require_once("vendor/autoload.php");

use Silex\Application;
use FindCheeseheads\App;
use FindCheeseheads\Controllers\APIController;

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

$app->mount("/api", new APIController());

$app->run();
?>
