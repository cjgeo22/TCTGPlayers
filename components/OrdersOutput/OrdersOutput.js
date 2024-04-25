import { StyleSheet, View, Text } from "react-native";
import OrdersSummary from "./OrdersSummary";
import OrdersList from "./OrdersList";
import { GlobalStyles } from "../../constants/styles";

function OrdersOutput(props) {
  //if there are no orders, display no orders text

  let content = <Text style={styles.text}>{props.noOrdersText}</Text>

  //if there are orders, display the orders list
  if (props.orders.length > 0){
    content = <OrdersList orders={props.orders} />
  }

  //return the orders output component
  return (
    <View style={styles.container}>
      <OrdersSummary summaryName={props.summaryName} orders={props.orders} />  
      {content}
    </View>
  );
}

export default OrdersOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  }
});