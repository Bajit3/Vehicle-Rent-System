import client from "./api";

const baseurl = '/api/vehicles';

export async function getVehicleByWheels(wheels) {
    return client.get(`${baseurl}/types?wheels=${wheels}`);
}

export async function getVehicleById(id) {
    return client.get(`${baseurl}/${id}`);
}

export default {
    getVehicleByWheels,
    getVehicleById
};