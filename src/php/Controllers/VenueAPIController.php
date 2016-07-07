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

        $this->get("/", array($this, "getVenues"));
        $this->post("/add", array($this, "addVenue"));
        $this->get("/search/{criteria}", array($this, "searchVenues"))
            ->assert("criteria", ".+");
        $this->get("/{venue_id}/", array($this, "getVenue"));

        $this->post("/{venue_id}/report", array($this, "reportVenue"));

        // TODO: Does this need to be set explicitly?
        $this->before(array($controller, "authenticate"));
    }

    public function defaultAction() {
        return $this->api_controller->abort(403);
    }

    public function addVenue(Request $request) {
        $json = json_decode($request->getContent());

        $name = filter_var($json->name, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW & FILTER_FLAG_ENCODE_HIGH & FILTER_FLAG_ENCODE_AMP);
        $address = filter_var($json->address, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW & FILTER_FLAG_ENCODE_HIGH & FILTER_FLAG_ENCODE_AMP);
        $location = array(
            "lat" => filter_var($json->location->lat, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION),
            "lng" => filter_var($json->location->lng, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION)
        );

        if ($location['lat'] == 0 || $location['lng'] == 0) {
            return new JsonResponse(array(
                "message" => "Invalid Request: Bad Address"
            ), 400);
        }

        $result = $this->api->createVenue($name, $address, $location);
        $message =($result) ?
            "Your submission was received, but must be approved by our staff before being listed. This could take up to two days." :
            "There was an error processing your submission. Please try again later.";

        return new JsonResponse(array("message" => $message));
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

    public function getVenues() {
        return new JsonResponse($this->api->getVenues());
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

    public function searchVenues($criteria, Request $request) {
        list($country, $criteria) = explode("/", $criteria);
        return new JsonResponse($this->api->searchVenues($country, $criteria));

    }

    private function generateModel($venue, $vote) {

    }
}
?>
