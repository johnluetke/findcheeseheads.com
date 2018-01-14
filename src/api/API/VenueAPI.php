<?php
namespace FindCheeseheads\API;

use FindCheeseheads\API;
use FindCheeseheads\API\SearchAPI;

use Exception;
use PDO;

class VenueAPI extends API {

    public function createVenue($name, $address, $location) {
        $stmt = $this->db()->prepare("INSERT INTO Place (`name`, `address`, `lat`, `lng`, `pending`) VALUES (:name, :address, :lat, :lng, 1);");
        $stmt->bindParam("name", $name);
        $stmt->bindParam("address", $address);
        $stmt->bindParam("lat", $location['lat']);
        $stmt->bindParam("lng", $location['lng']);

        $stmt->execute();

        return $stmt->errorCode() == 0;
    }

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
        $stmt = $this->db()->prepare("SELECT id, name, address, lat, lng FROM Place WHERE pending = 0 ORDER BY name ASC;");
        $stmt->execute();
    
        while ($row = $stmt->fetch()) {
            $venues[] = array(
                "id" => $row['id'],
                "name" => $row['name'],
                "address" => $row['address'],
                "location" => array(
                    "lat" => $row['lat'],
                    "lng" => $row['lng']
                )
            );
        }

        return $venues;
    }

    public function getVenueReports($venue_id) {
        $stmt = $this->db()->prepare("SELECT COUNT(*) num, reason FROM Report WHERE place_id = :place_id GROUP BY reason");
        $stmt->bindParam(":place_id", $venue_id);
        $stmt->execute();

        $reports = [];
        $total = 0;
        while ($row = $stmt->fetch()) {
            $total += intval($row['num']);
            $reports[$row['reason']] = $row['num'];
        }

        return array(
            "count" => $total,
            "reports" => $reports
        );

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
            foreach ($zips as $zip) {
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
