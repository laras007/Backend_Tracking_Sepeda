// Fungsi Haversine untuk menghitung jarak antara dua titik berdasarkan koordinat lat, long
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000; // radius bumi dalam meter
  const φ1 = lat1 * (Math.PI / 180);
  const φ2 = lat2 * (Math.PI / 180);
  const Δφ = (lat2 - lat1) * (Math.PI / 180);
  const Δλ = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // dalam meter
}

// Fungsi untuk menghitung total jarak berdasarkan data GPS
function calculateTotalDistance(gpsData) {
  let totalDistance = 0;
  for (let i = 0; i < gpsData.length - 1; i++) {
    const p1 = gpsData[i];
    const p2 = gpsData[i + 1];
    totalDistance += haversine(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
  }
  return totalDistance/1000;
}

module.exports = { calculateTotalDistance };
