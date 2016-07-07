angular.module("FindCheeseheadsApp").filter("nl2br", function($sce) {
    return function(msg) { 
        msg = msg.replace(/\r\n|\r|\n/g, "<br />");
        return $sce.trustAsHtml(msg);
    }
});
