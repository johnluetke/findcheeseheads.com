angular.module("FindCheeseheadsApp").directive("formatAddress", [
    function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, elem, attrs, ctrl) {
                parent = this;
                parent.$scope = scope;
                elem.bind("blur", function() {
                    console.log("blur");
                    inputAddress = ctrl.$viewValue;

                    geocoder = new google.maps.Geocoder();
                    geocoder.geocode({ 'address': inputAddress }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            address = results[0].formatted_address;
                            coordinates = results[0].geometry.location;

                            parent.$scope.data.venue.lat = coordinates.lat();
                            parent.$scope.data.venue.lng = coordinates.lng()

                            if (marker == undefined) {
                                marker = new google.maps.Marker({
                                    position: {
                                        lat: coordinates.lat(),
                                        lng: coordinates.lng()
                                    },
                                    map: parent.$scope.map
                                });
                            }
                            else {
                                marker.setPosition(coordinates);
                            }

                            parent.$scope.map.setCenter(marker.getPosition());
                            parent.$scope.map.setZoom(10);

                            numCommas = address.match(/,/g).length;

                            if (numCommas >= 3) {
                                address = address.replace(/, /, "\n");
                                address = address.replace(/, USA$/, "");
                                parent.$scope.data.venue.address = address;

                                ctrl.$setValidity("format-address", true);
                            }
                            else {
                                ctrl.$setValidity("format-address", false);
                            }
                        }
                        else {
                            ctrl.$setValidity("format-address", false);
                        }
                    });
                });
            }
        }
    }
]);
