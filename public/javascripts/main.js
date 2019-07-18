const mapInit = () => {
  const saoPaulo = { lat: -23.576947, lng: -46.635324 };

  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      }
    ],
    { name: 'Styled Map' });

  // Initialize the map
  const map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: 13,
      center: saoPaulo,
      disableDefaultUI: true,
      zoomControl: true,
    }
  );


  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map with user location
      map.setCenter(user_location);

      // Add a marker for your user location
      const newMarker = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here."
      });

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }

  const getEvents = () => {
    axios.get("/api/events")
      .then(response => {
        placeEvents(response.data.event);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const placeEvents = events => {
    events.forEach(event => {
      if (event.address) {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.address}&key=AIzaSyDoxPEGeVeOvKxqfnt8I8o03oEWgT0-wt0`)
          .then((response) => {
            const center = {
              lat: response.data.results[0].geometry.location.lat,
              lng: response.data.results[0].geometry.location.lng
            };
            const pin = new google.maps.Marker({
              position: center,
              map: map,
              title: event.name
            });
          })
          .catch((error) => console.log(error))
        
      }
    });
  }
  getEvents();
}

mapInit()




