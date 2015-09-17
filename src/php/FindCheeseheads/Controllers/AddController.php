<?php
namespace FindCheeseheads\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;

use PDO;

class AddController implements ControllerProviderInterface {

    private $app;

    public function connect(Application $app) {
        $this->app = $app;
        $controllers = $app['controllers_factory'];
        $controllers->match("/", array($this, "defaultAction"));

        return $controllers;
    }

    public function defaultAction(Request $request) {

        if (isset($_POST)) {
            $data = array();
            foreach ($_POST as $k=>$v) {
                $v = filter_var($v, FILTER_SANITIZE_STRING);
                $data[$k] = $v;
            }

            $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER_W, DATABASE_PASS);
            $stmt = $db->prepare("INSERT INTO Place (name, address, lat, lng) VALUES(?, ?, ? ,?);");
            $r = $stmt->execute(array($data['name'], $data['address'], $data['lat'], $data['lng']));
        }

        return $this->app['twig']->render("add.twig", array(
        ));
    }
}
?>
