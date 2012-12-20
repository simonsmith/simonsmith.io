    // Mobile stuffs
    require(['lib/orientation-fix', 'lib/address-bar'], function(orientationFix, addressBar) {
        if (/mobile/i.test(navigator.userAgent)) {
            addressBar();
        }
        if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
            orientationFix();
        }
    });
