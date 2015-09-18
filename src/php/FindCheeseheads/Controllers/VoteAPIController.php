<?php
namespace FindCheeseheads\Controllers;

use Silex\Application;
use Silex\ControllerCollection;
use Silex\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

use PDO;

class VoteAPIController extends ControllerCollection {

    public function __construct() {
        parent::__construct(new Route());

        $this->get("/", array($this, "defaultAction"));
        $this->get("/{venue}/up", array($this, "voteVenueUp"));

        // TODO: Does this need to be set explicitly?
        $this->before(__NAMESPACE__ . "\APIController::authenticate");
    }

    public function defaultAction() {
        return "vote 403";
        
    }   

    public function voteVenueUp(Request $request, $venue) {
        return new JsonResponse("vote $venue up");
    }
}
?>
