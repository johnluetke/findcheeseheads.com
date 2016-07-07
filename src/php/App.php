<?php
namespace FindCheeseheads;

class App {

    function getVersion() {
        $version = array();

        $version[] = file_exists(".revision") ? substr(file(".revision")[0], 0, 8) : "dev";
        $version[] = file_exists(".branch") ? file(".branch")[0] : "branch";

        return implode("-", $version);
    }
}
?>
