angular
    .module("FindCheeseheadsApp", [
        "ngRoute",
        "ngSanitize"
    ])
    .config(["$locationProvider", "$routeProvider",
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix("!");

            $routeProvider
                .when("/search/:country?/:criteria?", {
                    templateUrl: "/src/templates/search.template.html",
                    controller: "SearchPageController"
                })
                .when("/add", {
                    templateUrl: "/src/templates/add.template.html",
                    controller: "AddPageController"
                })
                .when("/browse", {
                    templateUrl: "/src/templates/browse.template.html",
                    controller: "BrowsePageController"
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
