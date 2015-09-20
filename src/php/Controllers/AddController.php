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
        $controllers->get ("/", array($this, "defaultAction"));
        $controllers->post("/", array($this, "submitNewVenue"));

        return $controllers;
    }

    public function defaultAction(Request $request) {
        return $this->app['twig']->render("add.twig");
    }

    public function submitNewVenue(Request $request) {
        if ($request->request->has("lat") &&
            $request->request->has("lng")) {

            $data = array();
            foreach ($request->request->all() as $k=>$v) {
                $v = filter_var($v, FILTER_SANITIZE_STRING);
                $data[$k] = $v;
            }

            $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER_W, DATABASE_PASS);
            $stmt = $db->prepare("INSERT INTO Place (name, address, lat, lng) VALUES(?, ?, ? ,?);");
            $r = $stmt->execute(array($data['name'], $data['address'], $data['lat'], $data['lng']));

            if ($r) $request->request->add(array("msg" => "Thanks! Your submission will be reviewed by our staff before being published."));

            return $this->defaultAction($request);
        }
    }
}
?>
