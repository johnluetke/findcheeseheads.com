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

$fc = new App();

$app->mount("/", new APIController());

$app->run();
?>
