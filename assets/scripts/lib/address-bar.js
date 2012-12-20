
    // https://gist.github.com/1183357
    //scroll to top, hide address bar on mobile devices - 1 for android, 0 for the rest

    define(function() {

        return function() {

            var win = window;
            var doc = win.document;

            // If there's a hash, or addEventListener is undefined, stop here
            if ( !location.hash || !win.addEventListener ){

                //scroll to 1
                window.scrollTo( 0, 1 );
                var scrollTop = 1,
                    getScrollTop = function(){
                        return "scrollTop" in doc.body ? doc.body.scrollTop : 1;
                    },

                    //reset to 0 on bodyready, if needed
                    bodycheck = setInterval(function(){
                        if( doc.body ){
                            clearInterval( bodycheck );
                            scrollTop = getScrollTop();
                            win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                        }
                    }, 15 );

                win.addEventListener( "load", function(){
                    setTimeout(function(){
                        //at load, if user hasn't scrolled more than 20 or so...
                        if( getScrollTop() < 20 ){
                            //reset to hide addr bar at onload
                            win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
                        }
                    }, 0);
                }, false );
            }

        }

    });
