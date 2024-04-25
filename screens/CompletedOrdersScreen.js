import { useContext, useEffect, useState } from "react";
import OrdersOutput from "../components/OrdersOutput/OrdersOutput";
import { OrdersContext } from "../store/orders-context";
import { fetchOrders } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function CompletedOrderScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const ordersCtx = useContext(OrdersContext);

  // Fetch reservations from the server
  useEffect(() => {
    async function getOrders() {
      setIsLoading(true);
      try {
        const orders = await fetchOrders();
        ordersCtx.setOrders(orders);
      } catch (error) {
        setError("Could not fetch orders!");
      }
      setIsLoading(false);
    }

    getOrders();
  }, []);

  // filter out completed orders
  const completedOrders = ordersCtx.orders.filter((order) => {
    return order.status === "Completed";
  });

  function errorHandler() {
    setError(null);
  }

  if (isLoading) {
    return <LoadingOverlay />;
  } else if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  } else {
    return (
      <OrdersOutput
        summaryName="Past Reservations"
        orders={completedOrders}
        noOrdersText="No Past Reservations Yet!"
      />
    );
  }
}

export default CompletedOrderScreen;