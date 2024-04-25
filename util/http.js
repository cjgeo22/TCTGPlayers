import axios from "axios";

const BACKEND_URL =
  "https://tctg-players-default-rtdb.firebaseio.com/";

export async function storeOrder(orderData) {
  const response = await axios.post(BACKEND_URL + "/orders.json", orderData);
  const id = response.data.name;
  return id;
}

export async function fetchOrders() {
  const response = await axios.get(BACKEND_URL + "/orders.json");

  const orders = [];

  for (const key in response.data) {
    const orderObj = {
      id: key,
      name: "Fulp",
      date: new Date(response.data[key].date),
      time: response.data[key].time,
      size: response.data[key].size,
      status: response.data[key].status,
    };
    orders.push(orderObj);
  }

  return orders;
}

export function updateOrder(id, orderData) {
  return axios.put(BACKEND_URL + `/orders/${id}.json`, orderData);
}

export function deleteOrder(id) {
  return axios.delete(BACKEND_URL + `/orders/${id}.json`);
}