<?php
require_once("config.php");
require_once("vendor/autoload.php");

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use FindCheeseheads\App;
use FindCheeseheads\Controllers\APIController;

$app = new Application();
$app['debug'] = true;
$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app->register(new \Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => "./src/templates"
));

$fc = new App();

$app->get("/", function (Request $request) use ($app, $fc) {
    $response = new Response($app['twig']->render("index.template.html", array(
        "version" => $fc->getVersion()
    )));

    #$response->headers->setCookie(fc_set_api_cookie($request));
    return $response;
});

$app->mount("/api", new APIController());

$app->run();
?>
