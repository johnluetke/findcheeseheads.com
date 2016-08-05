angular.module("FindCheeseheadsApp").controller("SearchPageController", [
    "$scope",
    "$rootScope",
    "$http",
    "$route",
    "$routeParams",
    "$sce",
    function ($scope, $rootScope, $http, $route, $routeParams, $sce) {
        self = this;
        self.isSearching = false;

        $scope.data = {};
        $scope.data.search = {};
        $scope.data.report = {};

        // Necessary jQuery for bootstrap
        $(".navbar-collapse").collapse("hide");

        if ($rootScope.data.countryList == undefined) {
            $http.get("/api/countries").then(function(response) {
                $rootScope.data.countryList = response.data.countries;
                $scope.data.countries = response.data.countries;
                console.log("Loaded countries into $rootScope");
            });
        }
        else {
            // Template could not access $rootScope.data.countries
            $scope.data.countries = $rootScope.data.countryList;
        }

        if ($rootScope.data.county == undefined) {
            $http.get("/api/country").then(function(response) {
                $rootScope.data.country = response.data.country;
                $scope.data.search.country = $rootScope.data.country;
                console.log("User country is " + $scope.data.search.country.code);
            });
        }
        else {
            $scope.data.search.country = $rootScope.data.country;
        }

        $scope.search = function(e) {
            if (e != undefined)
                e.preventDefault();

            $scope.search.results = [];
            $scope.isSearching = true;
            
            $rootScope.$broadcast("venueSearch.startSearch", $scope.data.search);

            country = $scope.data.search.country;
            criteria = $scope.data.search.criteria;

            if (e != undefined) {
                $route.updateParams({country: country.code, criteria: criteria});
            }

            $http.get("/api/venue/search/" + country.code + "/" + criteria).then(function(response) {
                $scope.data.search.criteria = response.data.criteria;
                $scope.data.search.country.code = response.data.country;

                $scope.data.search.results = {};
                $scope.data.search.results.cities = response.data.cities;
                $scope.data.search.results.venues = response.data.results;

                angular.forEach($scope.data.search.results.venues, function(value, key) {
                    venue = $scope.data.search.results.venues[key]
                    $http.get("/api/venue/" + venue.id + "/report").then(function(reports) {
                        $scope.data.search.results.venues[key].report = {
                            count: reports.data.count,
                            types: reports.data.reports
                        };
                    });
                });

                $scope.isSearching = false;
                $rootScope.$broadcast('venueSearch.hasResults', response.data);
                $rootScope.$broadcast("venueSearch.endSearch", $scope.search);
            });
        };

        $scope.tooltipHtml = $sce.trustAsHtml('foo');

        // TODO: Can this be templated?
        $scope.displayReports = function(venue_id) {
            reports = undefined;
            angular.forEach($scope.data.search.results.venues, function(value, key) {
                if (value.id == venue_id)
                    reports = value.report;
                    return;
            });
            message = "There are " + reports.count + " open reports for this venue.<br/>";
            for (type in reports.types) {
                if (reports.types.hasOwnProperty(type)) {
                    message += "<br/>" + $scope.getFriendlyReportType(type) + ": " + reports.types[type]
                }
            }

            return message;
        }

        $scope.getFriendlyReportType = function(type) {
            switch (type) {
                case "closed": return "Permanently Closed"; break;
                case "not_packer_bar": return "Not Cheesehead Friendly"; break;
                default: return type;
            }
        }

        $scope.reportVenue = function(e, id) {
            e.preventDefault();
            $scope.data.report.id = id;
        }

        $scope.sendVenueReport = function() {
            data = {
                venue_id: $scope.data.report.report.id,
                report_reason: $scope.data.report.report.reason,
                other: $scope.data.report.other
            };

            $http.post("/api/venue/" + $scope.data.report.id + "/report", data).then(
                function(response) {
                    console.log(response);
                }
            );

            $scope.data.report.id = 0;
            $scope.data.report.submitted = true;
            return false;
        }

        if ($routeParams.country != undefined && $routeParams.criteria != undefined) {
            $scope.data.search.criteria = $routeParams.criteria;
            $scope.data.search.country = { code: $routeParams.country };
            $scope.hasSearchCriteria = true;
            $scope.search();
        }
    }
]);
