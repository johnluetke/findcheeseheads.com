<?php
namespace FindCheeseheads\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use FindCheeseheads\Controllers\VoteAPIController;

use PDO;

class APIController implements ControllerProviderInterface {

    public function connect(Application $app) {
        $controllers = $app['controllers_factory'];
        $controllers->get("/", array($this, "defaultAction"));

        $controllers->mount("/vote", new VoteAPIController());

        // This *should* apply to all /api/ requests
        $controllers->before(array($this, "authenticate"));

        return $controllers;
    }

    public static function authenticate(Request $request) {
        if ($request->headers->has("X-API-Key")) {

        }
        else if ($request->server->has("REMOTE_ADDR") &&
                 $request->server->get("REMOTE_ADDR") == "50.135.250.160") {

        }
        else {
            return  new Response($request->server->get("REMOTE_ADDR") . " Unauthorized", 401);
        }
    }

    public function defaultAction() {
        return 403;
    }
}
?>