var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span id="headerRole">%data%</span><hr/>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLlinkedIn = '<li class="flex-item iconbox"><span class="orange-text">linkedIn</span><a class ="iconlink" href="%link%" target="_blank"><img class="iconpic" src="%data%"></a></li>';
var HTMLgithub = '<li class="flex-item iconbox"><span class="orange-text">github</span><a class ="iconlink" href="%link%" target="_blank"><img class="iconpic" src="%data%"></a></li>';
var HTMLfb = '<li class="flex-item iconbox"><span class="orange-text">facebook</span><a class ="iconlink" href="%link%" target="_blank"><img class="iconpic" src="%data%"></a></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLcontactIcon1 = '<li class="flex-item social-icon"><a class ="iconlink" href="%link%" target="_blank"><img class="iconpic" src="%data%"></a></li>';
var HTMLcontactIcon2 = '<li class="flex-item social-icon"><a class ="iconlink" href="%link%" target="_blank"><img class="iconpic" src="%data%"></a></li>';
var HTMLcontactIcon3 = '<li class="flex-item social-icon"><a class ="iconlink" href="%link%" target="_blank"><img class="iconpic" src="%data%"></a></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployer = '<div class="flex-item"><span><p id ="a">%data%';
var HTMLworkTitle = ' - %data%</p></span>';
var HTMLworkIcon = '<span><img class="workicon" src="%data%" alt ="IBM logo"></span></div>';
var HTMLworkClient = '<div class="flex-item"><span>Client :</span>';
var HTMLworkClientIcon = '<span><img class="workicon" src="%data%" alt ="ATT logo"></span></div>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';
var HTMLrolesStart = '<div class="roles"><span>Roles and Responsibilities</span><ul id="rolesList"></ul></div>';
var HTMLtechStart = '<div class="tech"><span>Technical Skills</span><ul id="techList"></ul></div>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitle = '<p id ="a">%data%</p>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImageStart = '<div class="slider-wrapper futurico-theme"><div id="slider" class="nivoSlider"></div></div>';
var HTMLprojectImage = '<img src="%data%">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolName = '<p id ="a">%data%';
var HTMLschoolDegree = ' -- %data%</p>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3>Online Classes</h3>';
var HTMLonlineStart = '<div class="education-entry"></div>';
var HTMLonlineTitle = '<p id ="a">%data%';
var HTMLonlineSchool = ' - %data%</p>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';
var HTMLonlineURL = '<br><a href="%link%" target="_blank">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';




$(window).load(function() {
    /* Code to make the social bar appear highlighted when mouse is hovered*/

    $('.social').mouseenter(function() {
        $(this).css('opacity', '1.0');
    }).mouseleave(function() {
        $(this).css('opacity', '0.6');
    });


    /* Code to make mapDiv appear highlighted when mouse is hovered */
    $('#mapDiv').mouseenter(function() {
        $(this).css('opacity', '1.0');
    }).mouseleave(function() {
        $(this).css('opacity', '0.8');
    });

    /* Code to make roles and responsibilities and Technical skills disappear on click*/

    $('#rolesList').hide();
    $('#techList').hide();
    $('.roles').click(function() {
        $('#rolesList').toggle(600);
    });

    $('.tech').click(function() {
        $('#techList').toggle(600);
    });

    $('#rolesList').mouseenter(function() {
        $(this).css('opacity', '1.0');
    }).mouseleave(function() {
        $(this).css('opacity', '0.8');
    });

    $('#techList').mouseenter(function() {
        $(this).css('opacity', '1.0');
    }).mouseleave(function() {
        $(this).css('opacity', '0.8');
    });

/*   
Slider

    $('#slider').nivoSlider({
            directionNavHide: false,
            captionOpacity: 1,
            prevText: '<',
            nextText: '>'
    });*/
});


/*
Here's where we generate the custom Google Map for the website.
*/
var map; // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

    var locations;

    var mapOptions = {
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    };

    /* 
    For the map to be displayed, the googleMap var must be
    appended to #mapDiv in resumeBuilder.js. 
    */
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);


    /*
    locationFinder() returns an array of every location string from the JSONs
    written for bio, education, and work.
    */
    function locationFinder() {

        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        locations.push(bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array
        for (var school in education.schools) {
            locations.push(education.schools[school].location);
        }

        // iterates through work locations and appends each location to
        // the locations array
        for (var job in work.jobs) {
            locations.push(work.jobs[job].location);
        }

        return locations;
    }

    /*
    createMapMarker(placeData) reads Google Places search results to create map pins.
    placeData is the object returned from search results containing information
    about a single location.
    */
    function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name
        });

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: name
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map, marker);
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
    callback(results, status) makes sure the search returned results for a location.
    If so, it creates a new map marker for that location.
    */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    /*
    pinPoster(locations) takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
        for (var place in locations) {

            // the search request object
            var request = {
                query: locations[place]
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        }
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);

}

//google.maps.event.addDomListener(window, "load", initializeMap);

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});
