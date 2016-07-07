angular.module("FindCheeseheadsApp").controller("BrowsePageController", [
    "$scope",
    "$rootScope",
    "$http",
    "$route",
    "$routeParams",
    function ($scope, $rootScope, $http, $route, $routeParams) {
        self = this;
        
        $scope.data = {};
        $scope.data.report = {};
        $scope.data.venues = [];

        // Necessary jQuery for bootstrap
        $('.navbar-collapse').collapse('hide');

        $http.get("/api/venue").then(function(response) {
            $scope.data.venues = response.data;
        });

        $scope.reportVenue = function(e, id) {
            e.preventDefault();
            if ($scope.data.report.id == id) {
                $scope.data.report.id = undefined;
            }
            else {
                $scope.data.report.id = id;
            }
        }

        $scope.sendVenueReport = function() {
            data = {
                venue_id: $scope.data.report.id,
                report_reason: $scope.data.report.reason,
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


    }
]);
