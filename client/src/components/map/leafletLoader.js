import { get } from 'scriptjs';

export default new Promise((resolve) => {
  get('https://unpkg.com/leaflet@1.6.0/dist/leaflet.js', () => {
    resolve(L);
  });
});