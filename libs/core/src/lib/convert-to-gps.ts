// Als erstes teilen wir die Latitude in zwei Teile ( Teil 1: 52 und Teil 2: 5200066 ), wobei der erste Teil dem Grad-Wert 1:1 entspricht und nicht verändert werden muss.
// Nun setzen wir eine Null vor 5200066 und multiplizieren diese Zahl mit 60 (0.5200066 * 60 = 31.20396) und erhalten die Ganzzahl 31
// Im nächsten Schritt setzen wir erneut eine Null vor 20396 und multiplizieren die Zahl ebenfalls mit 60 (0.20396 * 60 = 12.2376).
// Als letzten Schritt schauen wir, ob die Latitude eine positive oder negative Zahl ist. Ist die Zahl positiv befindet sich der Standort im Norden, ansonsten im Süden
// Das Ergebnis der GPS Koordinate lautet nach der Formel 52° 31´12.2376 N

const convertToGPS = (value: number, type: 'lat' | 'lon'): string => {
  const absolute = Math.abs(value);
  const deg = Math.floor(absolute);
  const minRaw = (absolute - deg) * 60;
  const min = Math.floor(minRaw);
  const sec = ((minRaw - min) * 60).toFixed(2);

  let dir: string;
  if (type === 'lat') {
    dir = value > 0 ? 'N' : 'S';
  } else {
    dir = value > 0 ? 'E' : 'W';
  }
  return `${deg}°${min}'${sec}"${dir}`;
};

export const convertLatToGPS = (lat: number): string =>
  convertToGPS(lat, 'lat');

export const convertLonToGPS = (lon: number): string =>
  convertToGPS(lon, 'lon');
