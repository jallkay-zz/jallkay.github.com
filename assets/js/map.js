var App = App || {};

App.Map = (function()
{
    //variables
    var map;
    var mapOptions;
    var zoomLevel = 10;
    var markers = [];
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var bounds = new google.maps.LatLngBounds();
    var infoWindow = new google.maps.InfoWindow({content: "holding..."});

    //display containers
    var mapContainer = $(".js-map")[0];

    var	main_color = '#ff0000',
		saturation_value= 10,
		brightness_value= 10;

    var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		//style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ color: "#404040" },
				{ visibility: "on" }, 
			]
		}
	];

    /**
     * Setup map
     */
    function init()
    {
        mapOptions = {
            Zoom: zoomLevel,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: style,
      	    panControl: false,
      	    zoomControl: false,
      	    mapTypeControl: false,
      	    streetViewControl: false,
            scrollwheel: true,
        };
        directionsDisplay = new google.maps.DirectionsRenderer();
        map = new google.maps.Map(mapContainer, mapOptions);
        
        map.setCenter({lat: 53.80076, lng: -1.54908});
    }





    /**
     * Add a marker
     *
     * payload = {
     * 		lat: float
     * 		lng: float
     * 		title: string
     * 		info: html string
     * 		timeout: int,
     * 		showOnMap: boolean 		
     * }
     */
    var waypoints = [];
    var counter = 0;
    var lastDest;
    function calculateWaypoints(mondoLocation)
    {
        var lat = mondoLocation.lat;
        //console.log(lat);
        var lng = mondoLocation.lng;
        var latlng = lat + ', ' + lng;
        //console.log(lng);
        waypoints[counter] = {location: latlng, stopover: false};
        console.log(waypoints[counter].location);
        console.log(waypoints);
        counter++;
        lastDest = latlng;
    }
    function calculateRoute()  
    { 
        directionsDisplay.setMap(map);
        console.log("TEST");
        var dest = waypoints[waypoints.length - 1];
        var request = {
        origin: '53.415796, -0.316259',
        destination: dest,
        waypoints: waypoints, 
        travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
            }
        });
        //document.getElementById("distance").innerHTML = directionsService.route.distance.text;
  
    }
    function addMarker(payload)
    {
        //App.Helpers.debugMessage(payload);
        // create location object
        var location = new google.maps.LatLng({lat: payload.lat, lng: payload.lng}); 
        var mondoLocation = ({lat: payload.lat, lng: payload.lng});
        // hide marker unless asked for
        var mapRef = null;
        
        if(payload.showOnMap) {
            mapRef = map;
            
            // extand map bouns to include marker
            bounds.extend(location);
            
            // fit map to bounds
            map.fitBounds(bounds);
        }
        
        photo = 'assets/js/anvil.jpg'
        // set timout to drop markers at differnt points
            
            App.Helpers.debugMessage(payload);
            // create maker
            var marker = new google.maps.Marker({
                position: location,
                map: mapRef,
                icon: photo,
                animation: google.maps.Animation.DROP,
                title: payload.title
            });
            App.Helpers.debugMessage("marker");
            App.Helpers.debugMessage(marker);

            // event listener for info window
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(payload.info);
                infoWindow.open(map, marker);
            });
            
            // add marker to array
            markers.push(marker);
    }    
    
    /**
     * Delete all markers
     */
    function deleteMarkers()
    {
        // set each marker to have no map
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
  
        // remove markers from the array
        markers = [];
        
        //empty map bounds
        bounds = new google.maps.LatLngBounds();
    }
    
    
    
    
    
    /**
     * Show info window for marker
     */
    function showInfoWindow(marker)
    {
        google.maps.event.trigger(markers[marker], 'click');
    }





    /**
     * Functions available to the public
     */
    return {
        init: init,
        addMarker: addMarker,
        deleteMarkers: deleteMarkers,
        showInfoWindow: showInfoWindow
    };
})();
