// Mobile stuffs
require(['lib/mobile/orientation-fix', 'lib/mobile/address-bar'], function(orientationFix, addressBar) {
    if (/mobile/i.test(navigator.userAgent)) {
        addressBar();
    }
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        orientationFix();
    }
});
