//===============
// GET LISTINGS |
//===============
var getListings = function() {

    $("#inner-content").html("");
    $.getJSON("http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=9CA9267B737842ACE047EABC7BE0CA50&steamid=" + userID2 + "&include_appinfo=1&format=json", function(result) {

        result.response.games.forEach(function(key) {
            var AppID = key.appid;
            var gameName = key.name;
            var imageUrl = 'http://cdn.akamai.steamstatic.com/steam/apps/' + AppID + '/header.jpg';


            // The "callback" argument is called with either true or false
            // depending on whether the image at "url" exists or not.
            function imageExists(url, callback) {
                var img = new Image();
                img.onload = function() {
                    callback(true);
                };
                img.onerror = function() {
                    callback(false);
                };
                img.src = url;
            }

            // Check if image exists and use thumbnail, otherwise use missing.jpg
            imageExists(imageUrl, function(exists) {
                if (exists === true) {
                    $("#inner-content").append('<a href="steam://run/' + AppID + '" class="clicky" id="' + gameName + '"><img class="img-zoom" src="http://cdn.akamai.steamstatic.com/steam/apps/' + AppID + '/header.jpg"></a>');
                } else {
                    $("#inner-content").append('<a href="steam://run/' + AppID + '" class="clicky" id="' + gameName + '"><div class="missingTile img-zoom" style="width:250px; height:117px; background-image:url(images/missing.jpg); background-size: 250px 117px; background-repeat: no-repeat;"><p class="missingName">' + gameName + '</p></div></a>');
                }
            });

        });

        $(".loader").hide();

    });

};


//===================
// CHECK FOR USER ID |
//===================


$(document).ready(function() {

    if (localStorage.userID == null) {

        $("#inner-content").append('<div class="ask"><p>Enter your STEAM ID</p><input type="text" id="enteredName"><button onclick="enterUsername()">Submit</button><p id="userNotFound">User not found. Try again.</p><p id="userNotPublic">Profile is private</p></div>');

    } else {
        $(".ask").hide();
        $("#inner-content").append('<center><div class="loader" style="width:80px; margin-top:30px"><img src="images/loading.gif" width="80"></div></center>');
        userID2 = localStorage.userID;
        getListings(userID2);

    }

});



//===========================================
// FIND STEAM64 ID AND STORE IN localStorage |
//===========================================

var enterUsername = function() {
    var vanityurl = $("#enteredName").val();

    $.get('http://steamcommunity.com/id/' + vanityurl + '/?xml=1', {
            key: "value"
        })
        .done(function(xml) {
            var responseXML = $(xml).find('steamID64').first().text();
            if (!responseXML.length) {
                $('#userNotFound').css("display", "block");
                setTimeout(function() {
                    $("#userNotFound").fadeOut();
                }, 1500);
            } else {

                if ($(xml).find('privacyState').first().text() === "public") {
                    var clientid = $(xml).find('steamID64').first().text();
                    localStorage.userID = clientid;
                    $(".ask").hide();
                    userID2 = localStorage.userID;
                    getListings(userID2);
                    $("#inner-content").append('<center><div class="loader" style="width:80px; margin-top:30px"><img src="images/loading.gif" width="80"></div></center>');
                } else {
                    $('#userNotPublic').css("display", "block");
                    setTimeout(function() {
                        $("#userNotPublic").fadeOut();
                    }, 1500);
                }


            }
        });


};



//==========================
// MAXIMIZE FUNCTIONALITY   |
//==========================

var maximize = function() {
    var win = gui.Window.get();
    win.maximize();
    win.setShowInTaskbar(false);
    $("#maxi").attr("src", "images/minimize.png");
    $("#maxi").attr("onclick", "unmaximize()");
};

//==========================
// MINIMIZE FUNCTIONALITY   |
//==========================

var unmaximize = function() {
    var win = gui.Window.get();
    win.unmaximize();
    win.setShowInTaskbar(false);
    $("#maxi").attr("src", "images/maximize.png");
    $("#maxi").attr("onclick", "maximize()");
};


//==========================
// SEARCH BOX FUNCTIONALITY |
//==========================

var openSearch = function() {

    $("#changeUserName").slideUp();;
    $("#searchBar").slideToggle();
    $("#filter").focus();
    $("#filter").val("");
    $("#filter").keyup();
};


//==========================
// SETTINGS FUNCTIONALITY  |
//==========================

var settings = function() {
    $("#searchBar").slideUp();
    $("#changeUserName").slideToggle();
    $("#changeUserName").focus();
};


//==========================
// SETTINGS FUNCTIONALITY  |
//==========================

var about = function() {
    var win = gui.Window.open('about.html', {
        position: 'center',
        width: 600,
        height: 600,
        "toolbar": false
    });

};

//==========================================
// FIND STEAM64 ID AND STORE IN CONFIG.JSON |
//==========================================

var saveNewUser = function() {
    var vanityurl = $("#newUsername").val();

    $.get('http://steamcommunity.com/id/' + vanityurl + '/?xml=1', {
            key: "value"
        })
        .done(function(xml) {
            var responseXML = $(xml).find('steamID64').first().text();
            if (!responseXML.length) {
                $('#userNotFound').css("display", "block");
                setTimeout(function() {
                    $("#userNotFound").fadeOut();
                }, 1500);
            } else {
                if ($(xml).find('privacyState').first().text() === "public") {
                    var clientid = $(xml).find('steamID64').first().text();
                    localStorage.userID = clientid;
                    $(".ask").hide();
                    userID2 = localStorage.userID;
                    getListings(userID2);
                    $("#changeUserName").slideToggle();
                    $("#inner-content").append('<center><div class="loader" style="width:80px; margin-top:30px"><img src="images/loading.gif" width="80"></div></center>');
                } else {
                    $('#userNotPublic').css("display", "block");
                    setTimeout(function() {
                        $("#userNotPublic").fadeOut();
                    }, 1500);
                }
            }
        });


};



//==========================
// FRONT-END FUNCTIONALITY  |
//==========================

$(document).ready(function() {


    //================
    // SMOOTH SCROLL  |
    //================
    $(function() {

        var $window = $('#inner-content');
        var scrollTime = 1.2;
        var scrollDistance = 350;

        $window.on("mousewheel DOMMouseScroll", function(event) {

            event.preventDefault();

            var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to($window, scrollTime, {
                scrollTo: {
                    y: finalScroll,
                    autoKill: true
                },
                ease: Power1.easeOut,
                overwrite: 5
            });

        });
    });


    //=============
    // ANIMATIONS  |
    //=============

    $('body').on('click', '.clicky', function(e) {
        var thisItem = $(this);
        thisItem.addClass('animated bounce');
        setTimeout(function() {
            thisItem.removeClass('animated bounce');
        }, 1000);
    });


    //=======================
    // SEARCH FUNCTIONALITY  |
    //=======================
    
    $("#filter").keyup(function() {

        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val();

        // Loop through the comment list
        $(".clicky").each(function() {

            // If the list item does not contain the text phrase fade it out
            if ($(this).attr("id").search(new RegExp(filter, "i")) < 0) {
                $(this).fadeOut();

                // Show the list item if the phrase matches and increase the count by 1
            } else {
                $(this).show();
            }
        });
    });
});