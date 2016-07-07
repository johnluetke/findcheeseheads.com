<?php
namespace FindCheeseheads\API;

use FindCheeseheads\API;
use Exception;
use PDO;

class VoteAPI extends API {

    public function getVenueScore($venue_id) {
        $stmt = $this->db()->prepare("SELECT place_id, SUM(vote) `cumulative_score`, COUNT(vote) `total` FROM Vote WHERE place_id = :place_id");
        $stmt->bindParam(":place_id", $venue_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function getVenueVote($venue_id, $user_id) {
        $stmt = $this->db()->prepare("SELECT vote `user_vote` FROM Vote WHERE place_id = :place_id AND user_id = :user_id");
        $stmt->bindParam(":place_id", $venue_id, PDO::PARAM_INT);
        $stmt->bindParam(":user_id",  $user_id,  PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function voteVenueDown($venue_id, $user_id) {
        $vote = -1;
        $stmt = $this->db()->prepare("INSERT INTO Vote (place_id, user_id, vote) VALUES(:place_id, :user_id, :vote) ON DUPLICATE KEY UPDATE vote = :changed_vote");
        $stmt->bindParam(":place_id",     $venue_id, PDO::PARAM_INT);
        $stmt->bindParam(":user_id",      $user_id,  PDO::PARAM_INT);
        $stmt->bindParam(":vote",         $vote,     PDO::PARAM_INT);
        $stmt->bindParam(":changed_vote", $vote,     PDO::PARAM_INT);

        if (!$stmt->execute()) {
            throw new Exception($stmt->errorInfo);
        }
    }

    public function voteVenueUp($venue_id, $user_id) {
        $vote = 1;
        $stmt = $this->db()->prepare("INSERT INTO Vote (place_id, user_id, vote) VALUES(:place_id, :user_id, :vote) ON DUPLICATE KEY UPDATE vote = :changed_vote");
        $stmt->bindParam(":place_id",     $venue_id, PDO::PARAM_INT);
        $stmt->bindParam(":user_id",      $user_id,  PDO::PARAM_INT);
        $stmt->bindParam(":vote",         $vote,     PDO::PARAM_INT);
        $stmt->bindParam(":changed_vote", $vote,     PDO::PARAM_INT);

        if (!$stmt->execute()) {
            throw new Exception($stmt->errorInfo);
        }
    }
}
