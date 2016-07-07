<?php
namespace FindCheeseheads\Controllers;

use FindCheeseheads\API\VenueAPI;
use FindCheeseheads\API\VoteAPI;
use Silex\ControllerCollection;
use Silex\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;

class VenueAPIController extends ControllerCollection {

    private $api;
    private $api_controller;
    private $vote_api;

    public function __construct(APIController $controller) {
        parent::__construct(new Route());
        $this->api = new VenueAPI();
        $this->api_controller = $controller;
        $this->vote_api = new VoteAPI();

        $this->get("/", array($this, "defaultAction"));
        $this->get("/{venue_id}/", array($this, "getVenue"));

        $this->post("/{venue_id}/report", array($this, "reportVenue"));

        // TODO: Does this need to be set explicitly?
        $this->before(array($controller, "authenticate"));
    }

    public function defaultAction() {
        return $this->api_controller->abort(403);
    }

    public function getVenue($venue_id) {
        $result = $this->api->getVenue($venue_id);
        $score = $this->vote_api->getVenueScore($venue_id);

        $result['score'] = $score;

        return new JsonResponse(array(
            "id" => $result['id'],
            "name" => $result['name'],
            "location" => array(
                "address" => $result['address'],
                "lat" => $result['lat'],
                "lng" => $result['lng']
            ),
            "last_updated" => $result['last_updated'],
            "pending" => $result['pending'],
            "score" => $score
        ));
    }

    public function reportVenue($venue_id, Request $request) {
        if ($request->request->get("venue_id") != $venue_id) {
            return new JsonResponse(array(
                "message" => "Invalid Request: Venue mismatch"
            ), 400);
        }
        else {
            $reason = filter_var($request->request->get("report_reason"), FILTER_SANITIZE_SPECIAL_CHARS);
            $other = filter_var($request->request->get("other"), FILTER_SANITIZE_SPECIAL_CHARS);

            if (empty($reason)) {
                return new JsonResponse(array(
                    "message" => "Invalid Request: 'reason' must be specified"
                ), 400);
            }
            else {
                $this->api->createVenueReport($venue_id, $request->get("report_reason"), $request->get("other"));
                return new JsonResponse(array("message" => "Your report has been submitted."));
            }
        }
    }

    private function generateModel($venue, $vote) {

    }
}
?>
