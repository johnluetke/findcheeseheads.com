angular.module("FindCheeseheadsApp").controller("AddPageController", [
    "$scope",
    "$rootScope",
    "$http",
    "$route",
    "$routeParams",
    function ($scope, $rootScope, $http, $route, $routeParams) {
        self = this;
        
        $scope.data = {};
        $scope.data.venue = {};

        // Necessary jQuery for bootstrap
        $('.navbar-collapse').collapse('hide');

        $scope.submitVenue = function(e) {
            e.preventDefault();

            data = {
                name: $scope.data.venue.name,
                address: $scope.data.venue.address,
                location: {
                    lat: $scope.data.venue.lat,
                    lng: $scope.data.venue.lng
                }
            };

            $http.post("/api/venue/add", data).then(function(response) {
                $scope.data.message = response.data.message;
                $scope.data.submission = true;
                console.log(response.data);
            }, function(error) {
                $scope.data.message = "There was an error submitting this venue. Please try again later.";
                $scope.data.submission = false;
                console.log(error.data.message);
            });
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 41.030,
                lng: -30.058
            },
            zoom: 2,
                disableDefaultUI: true,
                zoomControl: true
            }
        );
    }
]);
