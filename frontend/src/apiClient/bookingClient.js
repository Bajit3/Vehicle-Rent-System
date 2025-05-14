import client from "./api";

const baseurl = '/api';

export async function bookVehicle(payload) {
    return client.post(`${baseurl}/bookings`, payload);
}

export default {
    bookVehicle,
};