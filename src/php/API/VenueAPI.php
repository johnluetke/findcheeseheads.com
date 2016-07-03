<?php
namespace FindCheeseheads\API;

use FindCheeseheads\API;
use FindCheeseheads\API\SearchAPI;

use Exception;
use PDO;

class VenueAPI extends API {

    public function createVenueReport($venue_id, $reason, $other) {
        error_log(print_r($this, true));
        $stmt = $this->db()->prepare("INSERT INTO Report (place_id, reason, other) VALUES (:place_id, :reason, :other)");
        $stmt->bindParam(":place_id", $venue_id);
        $stmt->bindParam(":reason", $reason);
        $stmt->bindParam(":other", $other);
        $stmt->execute();
    }

    public function getVenue($venue_id) {
        $stmt = $this->db()->prepare("SELECT * FROM Place WHERE id = :place_id AND pending = 0;");
        $stmt->bindParam(":place_id", $venue_id);
        $stmt->execute();
        $venue = $stmt->fetch();
        return $venue;
    }

    public function getVenues() {
        $stmt = $this->db()->prepare("SELECT * FROM Place WHERE pending = 0 ORDER BY name ASC;");
        $stmt->execute();
        $venues = $stmt->fetch();
        return $venues;
    }

    public function searchVenues($country, $criteria) {
        list($zips, $cities) = SearchAPI::zipCodeSearch($country, $criteria, 1);

        if (sizeof($zips) < 1) {
            # not a zip code search
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

        $query = $this->db()->query(sprintf("SELECT * FROM Place WHERE name LIKE '%s' OR address LIKE '%s' %s AND pending = 0;", "%".$criteria."%", "%".$criteria."%", $where));

        $results = $query->fetchAll();

        return array(
            "criteria" => $criteria,
            "country" => isset($country) ? $country : SearchAPI::getCountryFromIP(),
            "cities" => $cities,
            "results" => $results
        );
    }
}
?>
