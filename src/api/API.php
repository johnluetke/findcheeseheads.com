<?php
namespace FindCheeseheads;

use PDO;

class API {

    private $db;
    private $db_writeable = false;

    private $defaults = array(
        "writeable" => false
    );

    protected function db(array $options = array()) {
        if (!($this->db instanceof PDO) || $options['writeable'] != $this->db_writeable) {
            $this->db = new PDO(sprintf("mysql:host=%s;dbname=%s", DATABASE_HOST, DATABASE_NAME), DATABASE_USER, DATABASE_PASS, array(
                PDO::ATTR_EMULATE_PREPARES   => false
              , PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION
              , PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ));
        }

        return $this->db;
    }

}
