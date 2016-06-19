angular
    .module("FindCheeseheadsApp", [
        "ngRoute",
        "venueSearch"        
    ])
    .config(["$locationProvider", "$routeProvider",
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix("!");

            $routeProvider
                .when("/search/:country?/:criteria?", {
                    templateUrl: "/src/templates/venue-search.template.html",
                    controller: "venueSearchController"
                })
                .otherwise({
                    templateUrl: "/src/templates/landing-page.template.html",
                    controller: "landingPage"
                });
        }]
    );
