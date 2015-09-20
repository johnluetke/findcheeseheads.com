<?php
namespace FindCheeseheads;

class App {

    function getVersion() {
        $version = array();
        if (file_exists(".revision")) {
            $version[] = substr(file(".revision")[0], 0, 8);
        }
        if (file_exists(".branch")) {
            $version[] = file(".branch")[0];
        }

        if (sizeof($version) == 0) {
            $version = array("dev", "master");
        }

        return implode("-", $version);
    }
}
?>
