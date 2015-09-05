// The following code show execute only after the page is fully loaded
$(document).ready(function () {
    if ($('#add').exists()) {
        $('#add').validate();
        $("#address").rules("add", {
            fulladdress: true,
            required: true,
            messages: {
                fulladdress: "Google cannot locate this address."
            }
        });

    // This function will be executed when the form is submitted
    function FormSubmit() {
      $.submitForm = true;
      if (!$('#add').valid()) {
        return false;
      } else {
        if ($("#address").data("isValidating") == true) {
          $("#address").data("SubmitForm", true);
          return false;
        }

        return true;   // Uncomment to submit the form.
      }
    }

    // Attach the FormSubmit function to the Submit button
    if ($('#submit').exists()) {
      $("#submit").click(FormSubmit);
    }

    // Execute the ForumSubmit function when the form is submitted
    $('#add').submit(FormSubmit);
  }
});

jQuery.fn.exists = function () { return jQuery(this).length > 0; }

function AddressValidator(value, element, paras) {
    var inputAddress = value;
    if (value.length == 0) {
        return true;
    }

    if ($(element).data("lastAddressValidated") == inputAddress) {
        return $(element).data("isValid");
    }

    $(element).data("isValidating", true);
    $(element).data("lastAddressValidated", inputAddress);

    inputAddress = inputAddress.replace(/\n/g, "");

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': inputAddress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var address = results[0].formatted_address;
            var coordinates = results[0].geometry.location;

            $("input[name='lat']").val( coordinates.lat());
            $("input[name='lng']").val( coordinates.lng());
            mapImage = "https://maps.googleapis.com/maps/api/staticmap?zoom=16";
            mapImage += "&center=" + coordinates.lat() + "," + coordinates.lng();
            mapImage += "&size=200x200";
            mapImage += "&markers=color:red%7Clabel:.%7C" + coordinates.lat() + "," + coordinates.lng();

            $(element).parent().after($("<div id='map' class='form-group' />"));
            $("div#map").append($("<img/>").attr("src", mapImage));

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

        var form = $(element).parents('form:first');

        if ($(element).data("SubmitForm") == true) {
            form.submit();
        }
        else {
            form.validate().element(element);
        }
    });

    return true;
}

$.validator.addMethod("fulladdress", AddressValidator);
