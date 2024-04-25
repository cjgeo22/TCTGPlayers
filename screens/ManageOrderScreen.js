import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { StyleSheet, Switch, View, Text } from "react-native";
import Button from "../components/UI/Button";
import { OrdersContext } from "../store/orders-context";
import OrderForm from "../components/ManageOrder/OrderForm";
import { deleteOrder, storeOrder, updateOrder } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageOrderScreen(props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState();

  const ordersCtx = useContext(OrdersContext);

  const editedOrderId = props.route.params?.orderId; // ? Checks for undefined first
  const isEditing = !!editedOrderId; // Converts false-like value to false and true-like value to true

  const selectedOrder = ordersCtx.orders.find(
    (order) => order.id === editedOrderId
  );

  const [orderCompleted, setOrderCompleted] = useState(
    selectedOrder
      ? isEditing
        ? selectedOrder.status === "Open"
          ? false
          : true
        : false
      : false
  );

  function statusChangeHandler() {
    setOrderCompleted(!orderCompleted);
  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      title: isEditing ? "Edit Reservation" : "Add Reservation",
    });
  }, [props.navigation, isEditing]);

  async function deleteOrderHandler() {
    setIsProcessing(true);
    try {
      await deleteOrder(editedOrderId);
      ordersCtx.deleteOrder(editedOrderId);
      props.navigation.goBack();
    } catch (error) {
      setError("Could not delete order, please try again later...");
    }
    setIsProcessing(false);
  }

  function cancelHandler() {
    props.navigation.goBack();
  }

  async function confirmHandler(orderData) {
    setIsProcessing(true);
    try {
      if (isEditing) {
        ordersCtx.updateOrder(editedOrderId, {
          ...orderData,
          status: orderCompleted ? "Completed" : "Open",
        });
        await updateOrder(editedOrderId, {
          ...orderData,
          status: orderCompleted ? "Completed" : "Open",
        });
      } else {
        const id = await storeOrder({
          ...orderData,
          status: "Open",
        });
        ordersCtx.addOrder({
          ...orderData,
          status: "Open",
          id: id,
        });
      }
      props.navigation.goBack();
    } catch (error) {
      setError("Could not save order, please try again later...");
    }
    setIsProcessing(false);
  }

  function errorHandler() {
    setError(null);
  }

  if (isProcessing) {
    return <LoadingOverlay />;
  } else if (error && !isProcessing) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  } else {
    return (
      <View style={styles.container}>
        <OrderForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValues={selectedOrder}
        />
        {isEditing && (
          <View style={styles.rowContainer}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusLabel}>Closed?</Text>
              <Switch
                onValueChange={setOrderCompleted.bind(!orderCompleted)}
                value={orderCompleted}
                thumbColor={
                  orderCompleted
                    ? GlobalStyles.colors.accent700
                    : GlobalStyles.colors.gray500
                }
                trackColor={{
                  false: GlobalStyles.colors.gray700,
                  true: GlobalStyles.colors.primary500,
                }}
              />
            </View>
            <View style={styles.deleteContainer}>
              <IconButton
                icon="delete"
                color={GlobalStyles.colors.error500}
                size={30}
                onPress={deleteOrderHandler}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

export default ManageOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 200,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary100,
  },
});