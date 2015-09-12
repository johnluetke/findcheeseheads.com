<?php
namespace FindCheeseheads\API;

use Zend\Http\Client;
use Zend\Http\Headers;
use Zend\Json\Json;
use Zippopotamus\Service\Zippopotamus;

class Search {

    public static function getCountries() {
        $http = new Client();
        $http->setOptions(array('sslverifypeer' => false));
        $headers = new Headers();
        $headers->addHeaderLine('X-Mashape-Key', MASHAPE_API_KEY);
        $http->setHeaders($headers);
        $http->setUri("https://restcountries-v1.p.mashape.com/all");
        $http->setMethod('GET');
        $response = $http->send();
        $json     = Json::decode($response->getBody());
        $data     = array();

        foreach ($json as $country) {
            $data[$country->alpha2Code] = $country->name;
        }

        return $data;
    }

    public static function zipCodeSearch($country, $zip_code, $depth = 0) {
        $nearby_zip_codes = Zippopotamus::nearby($country, $zip_code);
        $zip_codes = array(); $cities = array();
        foreach (array_limit($nearby_zip_codes->nearby, 10) as $zip_code) {
            $zip_codes[] = $zip_code->{'post code'};
            $cities[] = $zip_code->{'place name'};
        }
    
        if ($depth > 0) {
            foreach ($zip_codes as $zip_code) {
                list($z, $c) = self::zipCodeSearch($country, $zip_code, $depth - 1);
                $zip_codes = array_merge($zip_codes, $z);
                $cities = array_merge($cities, $c);
            }
        }
    
        $zip_codes = array_values(array_unique($zip_codes));
        $cities = array_values(array_unique($cities));

        return array($zip_codes, $cities);
    }
}
