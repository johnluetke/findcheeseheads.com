angular.module("FindCheeseheadsApp").controller("landingPage", [
    "$scope",
    "$rootScope",
    "$http",
    function ($scope, $rootScope, $http) {
        self = this;
        self.criteria = "";
        self.country = "";
        $rootScope.hideNavbar = true;

        $scope.search = function(e) {
            e.preventDefault();
            self.criteria = $scope.criteria;
            self.country = $scope.country;
            window.location = "#!/search/" + self.country.code + "/" + self.criteria;
            $rootScope.hideNavbar = false;
        }

        $http.get("/api/country").then(function(response) {
            self.country = response.data.country;
            $scope.country = self.country;
        });
    }
]);
