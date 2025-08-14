mapboxgl.accessToken = mapToken;

// Check if coordinates exist
const coordinates = listing.geometry && listing.geometry.coordinates 
    ? listing.geometry.coordinates 
    : [77.2090, 28.6139]; // fallback: Delhi coordinates

const map = new mapboxgl.Map({
    container: "map", // div id
    style: "mapbox://styles/mapbox/streets-v12", // correct style
    center: coordinates, 
    zoom: 9,
});

// Add navigation controls (zoom in/out)
map.addControl(new mapboxgl.NavigationControl());

// Add a marker
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${listing.title}</h3><p>Exact location will be provided after booking.</p>`)
    )
    .addTo(map);

// Optional: Open popup by default
marker.togglePopup();
