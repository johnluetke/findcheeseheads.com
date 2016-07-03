angular
    .module("FindCheeseheadsApp", [
        "ngRoute"
    ])
    .config(["$locationProvider", "$routeProvider",
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix("!");

            $routeProvider
                .when("/search/:country?/:criteria?", {
                    templateUrl: "/src/templates/search.template.html",
                    controller: "SearchPageController"
                })
                .otherwise({
                    templateUrl: "/src/templates/landing-page.template.html",
                    controller: "LandingPageController"
                });
        }]
    )
    // Use this to initialize app state
    .run(["$rootScope",
        function($rootScope) {
            $rootScope.data = {};
        }]
    );
