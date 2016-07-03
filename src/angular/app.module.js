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
                    controller: "searchPage"
                })
                .otherwise({
                    templateUrl: "/src/templates/landing-page.template.html",
                    controller: "landingPage"
                });
        }]
    )
    // Use this to initialize app state
    .run(["$rootScope",
        function($rootScope) {
            $rootScope.data = {};
        }]
    );
