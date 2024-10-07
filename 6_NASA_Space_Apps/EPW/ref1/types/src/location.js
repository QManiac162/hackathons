import { log } from './log';
import * as secrets from '../secrets.json';
export async function getIPLocation() {
    let res = await fetch('https://api.ipify.org?format=json');
    const json = await res.json();
    const ip = json.ip;
    res = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${secrets.ipgeo}&ip=${ip}`, {
        method: 'POST',
        body: JSON.stringify({ considerIp: true }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    const latR = data.location.lat * Math.PI / 180;
    const lonR = data.location.lng * Math.PI / 180;
    const x = Math.sin(Math.PI / 2 - latR) * Math.cos(lonR);
    const y = Math.sin(Math.PI / 2 - latR) * Math.sin(lonR);
    const z = Math.cos(Math.PI / 2 - latR);
    const rec = { ip, accuracy: data.accuracy, degrees: [data.location.lat, data.location.lng], radians: [latR, lonR], position: [x, y, z] };
    log('getIPLocation', rec);
    return rec;
}
//# sourceMappingURL=location.js.map