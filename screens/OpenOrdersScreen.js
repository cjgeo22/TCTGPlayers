import { useContext, useEffect, useState } from "react";
import OrdersOutput from "../components/OrdersOutput/OrdersOutput";
import { OrdersContext } from "../store/orders-context";
import { fetchOrders } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function OpenOrdersScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const ordersCtx = useContext(OrdersContext);

  useEffect(() => {
    async function getOrders() {
      setIsLoading(true);
      try {
        const orders = await fetchOrders();
        ordersCtx.setOrders(orders);
      } catch (error) {
        setError('Could not fetch reservations!');
      }
      setIsLoading(false);
    }

    getOrders();
  }, []);

  const openOrders = ordersCtx.orders.filter((order) => {
    return order.status === "Open" && order.name === "Fulp";
  });

  function errorHandler() {
    setError(null);
  }

  if (isLoading) {
    return <LoadingOverlay />;
  } else if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  } else {
    return (
      <OrdersOutput
        summaryName="Open Reservations"
        orders={openOrders}
        noOrdersText="No Open Reservations Yet!"
      />
    );
  }
}

export default OpenOrdersScreen;