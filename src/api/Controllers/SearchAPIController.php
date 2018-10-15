<?php
namespace FindCheeseheads\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;
use Symfony\Component\HttpFoundation\Request;

use FindCheeseheads\API\Search;

use PDO;

class SearchAPIController implements ControllerProviderInterface {

    private $app;

    public function connect(Application $app) {
        $this->app = $app;
        $controllers = $app['controllers_factory'];
        $controllers->get("/", array($this, "defaultAction"));
        $controllers->get("/{criteria}", array($this, "searchAction"))
            ->assert("criteria", ".+");

        return $controllers;
    }

    public function defaultAction(Request $request) {
        if (sizeof($request->query->all()) > 0) {
            $country = $request->query->has("c") ?
                       $request->query->get("c") :
                       Search::getCountryFromIP();

            $criteria = $request->query->has("q") ?
                        $request->query->get("q") :
                        "";

            return $this->app->redirect(sprintf("/search/%s/%s", $country, $criteria));
        }

        return $this->app['twig']->render("search.twig", array(
            "criteria" => "",
            "country" => Search::getCountryFromIP(),
            "countries" => Search::getCountries()
        ));
    }

    public function searchAction($criteria) {
        list($country, $criteria) = explode("/", $criteria);
        list($zips, $cities) = Search::zipCodeSearch($country, $criteria, 1);

        if (sizeof($zips) < 1) {
            unset($zips);
            unset($cities);
        }
        else {
            $where = "";
            foreach ($zip as $zip) {
                $where = sprintf("%s OR %s LIKE '%%%s%%'", $where, "address", $zip);
            }

            foreach ($cities as $city) {
                $where = sprintf("%s OR %s LIKE '%%%s%%'", $where, "address", $city);
            }
        }

        $db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS);
        $r = $db->query(sprintf("SELECT * FROM Place WHERE name LIKE '%s' OR address LIKE '%s' %s AND pending = 0;", "%".$criteria."%", "%".$criteria."%", $where));

        $results = $r->fetchAll();

        return $this->app['twig']->render("search.twig", array(
            "cities" => $cities,
            "country" => isset($country) ? $country : Search::getCountryFromIP(),
            "countries" => Search::getCountries(),
            "criteria" => $criteria,
            "results" => $results
        ));
    }
}
?>
