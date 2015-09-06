jQuery.fn.exists = function () { return jQuery(this).length > 0; }

var address;
var cordinate;
var form;
var geocoder;
var inputAddress;
var marker;
var marker;

function AddressValidator(value, element, paras) {
    inputAddress = value;
    if (value.length == 0) {
        return true;
    }

    if ($(element).data("lastAddressValidated") == inputAddress) {
        return $(element).data("isValid");
    }

    $(element).data("isValidating", true);
    $(element).data("lastAddressValidated", inputAddress);

    inputAddress = inputAddress.replace(/\n/g, "");

    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': inputAddress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            address = results[0].formatted_address;
            coordinates = results[0].geometry.location;

            $("input[name='lat']").val(coordinates.lat());
            $("input[name='lng']").val(coordinates.lng());

            if (marker == undefined) {
                marker = new google.maps.Marker({
                    position: {
                        lat: coordinates.lat(),
                        lng: coordinates.lng()
                    },
                    map: placeMap
                });
            }
            else {
                marker.setPosition(coordinates);
            }

            placeMap.setCenter(marker.getPosition());
            placeMap.setZoom(10);

            numCommas = address.match(/,/g).length;

            if (numCommas >= 3) {
                address = address.replace(/, /, "\n");
                address = address.replace(/, USA$/, "");
                $(element).val(address);

                $(element).data("lastAddressValidated", address);

                $(element).data("isValid", true);
            }
            else {
                $(element).data("isValid", false);
            }
        }
        else {
            $(element).data("isValid", false);
        }

        $(element).data("isValidating", false);

        form = $(element).parents('form:first');
    });

    return true;
}

$.validator.addMethod("validateAddress", AddressValidator);
