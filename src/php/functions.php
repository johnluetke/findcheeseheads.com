<?php
if (!function_exists("array_limit")) {
    function array_limit($iterable, $array_limit) {
        foreach ($iterable as $key => $value) {
            if (!$array_limit--) break;
                yield $key => $value;
        }
    }
}

if (!function_exists("cidr_match")) {
    function cidr_match($ip, $range) {
        list($subnet, $bits) = explode("/", $range);
        $ip = ip2long($ip);
        $subnet = ip2long($subnet);
        $mask = -1 << (32 - $bits);
        $subnet &= $mask;
        return ($ip & $mask) == $subnet;
    }
}

if (!function_exists("implode_list")) {
    function implode_list($delim, $array) {
        $last = array_pop($array);
        return sizeof($array) ? implode($delim, $array) . " and " . $last : $last;
    }
}
?>
