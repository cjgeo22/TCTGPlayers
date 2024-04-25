import { FlatList, Text } from "react-native";
import OrderItem from "./OrderItem";

function renderOrderItem(itemData) {
  return <OrderItem {...itemData.item}/>;
}

function OrdersList(props) {
  return (
    // renders the list of reservations for the different screens
    <FlatList
      data={props.orders}
      renderItem={renderOrderItem}
      keyExtractor={(item) => {
        return item.id;
      }}
    />
  );
}

export default OrdersList;