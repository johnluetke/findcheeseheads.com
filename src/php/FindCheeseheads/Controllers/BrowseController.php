<?php
namespace FindCheeseheads\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;

use FindCheeseheads\API\Search;

use PDO;

class BrowseController implements ControllerProviderInterface {

    private $app;

    public function connect(Application $app) {
        $this->app = $app;
        $controllers = $app['controllers_factory'];
        $controllers->get("/", array($this, "defaultAction"));

        return $controllers;
    }

    public function defaultAction(Request $request) {
        $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
        $r = $db->query("SELECT * FROM Place WHERE pending = 0 ORDER BY name ASC;");
        $results = $r->fetchAll();

        return $this->app['twig']->render("browse.twig", array(
            "results" => $results
        ));
    }
}
?>
