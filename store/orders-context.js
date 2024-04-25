import { createContext, useReducer } from "react";

export const OrdersContext = createContext({
  orders: [],
  addOrder: ({ name, date, time, size }) => {},
  setOrders: (orders) => {},
  deleteOrder: (id) => {},
  updateOrder: (id, { name, date, time, status }) => {},
});

function ordersReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return action.payload;
    case "UPDATE":
      const updateTargetIndex = state.findIndex(
        (order) => order.id === action.payload.id
      );
      const updateTargetOrder = state[updateTargetIndex];
      const updatedOrder = { ...updateTargetOrder, ...action.payload.data };
      const updatedOrders = [...state];
      updatedOrders[updateTargetIndex] = updatedOrder;
      return updatedOrders;
    case "DELETE":
      return state.filter((order) => {
        return order.id !== action.payload;
      });
    default:
      return state;
  }
}

function OrdersContextProvider({ children }) {
  const [ordersState, dispatch] = useReducer(ordersReducer, []);

  function addOrder(orderData) {
    dispatch({ type: "ADD", payload: orderData });
  }
  function setOrders(orders) {
    dispatch({ type: "SET", payload: orders });
  }
  function deleteOrder(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateOrder(id, orderData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: orderData } });
  }

  const value = {
    orders: ordersState,
    addOrder: addOrder,
    setOrders: setOrders,
    deleteOrder: deleteOrder,
    updateOrder: updateOrder,
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export default OrdersContextProvider;