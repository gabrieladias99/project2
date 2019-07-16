function startMap() {
  const saoPaulo = { lat: -23.576947, lng: -46.635324 };

  // Initialize the map
  const map = new google.maps.Map(document.getElementById('map'),
    {
      zoom: 12,
      center: saoPaulo
    }
  );

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
    console.log('Ola')
    axios.get("/api/events")
      .then(response => {
        console.log(response)
        placeEvents(response.data.event);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const placeEvents = events => {
    events.forEach(event => {
      console.log(event.location);
      if (event.location) {
        const center = {
          lat: event.location.coordinates[1],
          lng: event.location.coordinates[0]
        };
        const pin = new google.maps.Marker({
          position: center,
          map: map,
          title: event.name
        });
      }
    });
  }
  getEvents();
}

startMap();

