<?php
namespace FindCheeseheads\Controllers;

use FindCheeseheads\API\VoteAPI;
use Silex\ControllerCollection;
use Silex\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class VoteAPIController extends ControllerCollection {

    private $api;
    private $api_controller;

    public function __construct(APIController $controller) {
        parent::__construct(new Route());
        $this->api = new VoteAPI();
        $this->api_controller = $controller;

        $this->get("/", array($this, "defaultAction"));
        $this->get("/{venue_id}/", array($this, "getVenueScore"));
        $this->post("/{venue_id}/up", array($this, "voteVenueUp"));
        $this->post("/{venue_id}/down", array($this, "voteVenueDown"));


        // TODO: Does this need to be set explicitly?
        $this->before(array($controller, "authenticate"));
    }

    public function defaultAction() {
        return $this->api->abort(403);
    }

    public function getVenueScore($venue_id) {
        $user_id = -1;

        $results = $this->api->getVenueScore($venue_id);
        $vote = $this->api->getVenueVote($venue_id, $user_id);

        return new JsonResponse(array(
            "venue_id"   => (int) $results['place_id'],
            "cumulative" => (int) $results['cumulative_score'],
            "total"      => (int) $results['total'],
            "user_vote"  => (int) $vote['user_vote']
        ));
    }

   public function voteVenueDown(Request $request, $venue_id) {
        $user_id = -1;
        $this->api->voteVenueDown($venue_id, $user_id);
        return $this->getVenueScore($venue_id);
    }

    public function voteVenueUp(Request $request, $venue_id) {
        $user_id = -1;
        $this->api->voteVenueUp($venue_id, $user_id);
        return $this->getVenueScore($venue_id);
    }
}
?>
