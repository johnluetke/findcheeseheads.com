$(function() {
    $(".actions .report a").on('click', function() {
        venue = $(this).data('venue-id');
        report_div = "div.report[data-venue-id='" + venue + "']";
        $(report_div).find("select[name='report_reason']").on('change', function() {
               if ($(this).val() == "other_reason") {
                    $(report_div).find("input[name='other']").removeClass('hidden');
               }
               else {
                   $(report_div).find("input[name='other']").addClass('hidden');
               }
        });
        $(report_div).removeClass('hidden');
        
    });

    $(".action.report form").submit(function(event) {
        var data = {};
        $(this).serializeArray().forEach(function(e,i,a) {
            data[e.name] = e.value;
        });
        console.log(data);

        $.ajax("/api/venue/" + data.venue_id + "/report", {
            method: 'post',
            data: data,
            error: function(jqxhr, status, error) {
                console.log(jqxhr);
                console.error(error);
            },
            success: function(json, status, jqxhr) {
                $("div.action.message[data-venue-id='" + data.venue_id + "']").html(json.message).addClass("alert alert-info");
            },
            complete: function(jqxhr) {
                $("div.action.report[data-venue-id='" + data.venue_id + "']").addClass('hidden');
                $("div.action.message[data-venue-id='" + data.venue_id + "']").removeClass("hidden");
            }
        });

        event.preventDefault();
    });
});
