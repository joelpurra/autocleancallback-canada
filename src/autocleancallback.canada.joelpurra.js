/*!
 * @license AutoCleanCallback-Canada
 * Copyright (c) 2012, 2013 Joel Purra <https://joelpurra.com/>
 * Released under MIT, BSD and GPL license. Comply with at least one.
 *
 * https://github.com/joelpurra/autocleancallback-canada
 *
 * Canadian extensions to AutoCleanCallback (required).
 */

/*jslint white:true, todo: true */
/*global jQuery:true, JoelPurra:true, debug:true*/

(function($) {
    "use strict";

    (function(namespace) {

        // Calling https://gist.github.com/2254354
        namespace.autoCleanNorthAmericanPhoneNumber = function($input) {

            debug.log(".autoCleanNorthAmericanPhoneNumber($input)", $input);

            // From https://blog.stevenlevithan.com/archives/validate-phone-number
            var phoneNumberUnformatted = /^\(?([0-9]{3})\)?[\-. ]?([0-9]{3})[\-. ]?([0-9]{4})$/,
                replaceWithFormatted = "($1) $2-$3";

            namespace.autoCleanReplace($input, phoneNumberUnformatted, replaceWithFormatted);
        };
    }(JoelPurra));

    (function() {

        // TODO: patch JoelPurra.autoClean() to accept multiple elements
        var $telephoneInputs = $("[type=tel]");

        $telephoneInputs.each(function() {
            var $this = $(this);

            JoelPurra.autoCleanTrimLeft($this);
            JoelPurra.autoCleanNormalizeWhitespace($this);
            JoelPurra.autoCleanNorthAmericanPhoneNumber($this);
        });

    }());

    (function(namespace) {

        // Calling https://gist.github.com/2254354
        namespace.autoCleanCanadianPostalCode = function($input) {

            debug.log(".autoCleanCanadianPostalCode($input)", $input);

            var postalCodeUnformatted = /^([a-z]\d[a-z])\s*(\d[a-z]\d)$/i,
                replaceWithFormatted = "$1 $2";

            namespace.autoCleanReplace($input, postalCodeUnformatted, replaceWithFormatted);
        };
    }(JoelPurra));

    (function() {

        // A fragile way of matching postal code inputs, but works locally
        var $postalCodeInputs = $("[placeholder=A\\#A\\ \\#A\\#]");

        $postalCodeInputs.each(function() {
            var $this = $(this);

            JoelPurra.autoCleanTrim($this);
            JoelPurra.autoCleanNormalizeWhitespace($this);
            JoelPurra.autoCleanUpperCase($this);
            JoelPurra.autoCleanCanadianPostalCode($this);
        });

    }());
}(jQuery));