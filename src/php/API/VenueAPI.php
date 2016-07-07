<?php
namespace FindCheeseheads\API;

use FindCheeseheads\API;
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



}
?>
