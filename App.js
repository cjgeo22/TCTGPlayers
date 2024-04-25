import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ManageOrderScreen from "./screens/ManageOrderScreen";
import OpenOrdersScreen from "./screens/OpenOrdersScreen";
import AllOrdersScreen from "./screens/AllOrdersScreen";
import CompletedOrderScreen from "./screens/CompletedOrdersScreen";
import IconButton from "./components/UI/IconButton";
import { GlobalStyles } from "./constants/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import OrdersContextProvider from "./store/orders-context";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import RewardsScreen from "./screens/RewardsScreen";
import { useFonts } from "expo-font";
import SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

//build drawer nav
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="News"
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTitleStyle: {
          fontFamily: "chom",
          fontSize: 30,
          color: GlobalStyles.colors.primary100,
        },
        drawerIcon: ({ color, size }) => (
          <Ionicons name="menu-sharp" size={size} color={color} />
        ),

        sceneContainerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        drawerContentStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        drawerInactiveTintColor: GlobalStyles.colors.accent500,
        drawerActiveTintColor: GlobalStyles.colors.primary800,
        drawerActiveBackgroundColor: GlobalStyles.colors.accent500,
      }}
    >
      <Drawer.Screen
        name="Return"
        component={TabsNavigator}
        options={{
          title: "",
          drawerLabel: "Return",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="return-up-back-sharp" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ManageReservations"
        component={ManageOrderScreen}
        options={{
          title: "Book a Reservation!",
          drawerLabel: "Book Reservation",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="golf-sharp" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="OpenReservations"
        component={OpenOrdersScreen}
        options={{
          title: "Open Tee Times",
          drawerLabel: "Open Reservations",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-sharp" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ClosedReservations"
        component={CompletedOrderScreen}
        options={{
          title: "Past Tee Times",
          drawerLabel: "Past Reservations",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="arrow-undo-sharp" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: GlobalStyles.colors.accent500,
        tabBarActiveTintColor: GlobalStyles.colors.primary800,
        tabBarInactiveBackgroundColor: GlobalStyles.colors.primary800,
        tabBarInactiveTintColor: GlobalStyles.colors.accent500,
        tabBarLabel: {
          fontSize: 14,
          fontFamily: "rakreg",
        },
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary800,
        },
      }}
    >
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
          tabBarLabel: "Profile",
        }}
      />
      <Tabs.Screen
        name="Main"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      {/* tabs screen for game news */}
      <Tabs.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ribbon-sharp" size={size} color={color} />
          ),
          tabBarLabel: "Rewards",
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    chom: require("./assets/fonts/Aubrey.ttf"),
    bbnr: require("./assets/fonts/BebasNeue-Regular.ttf"),
    robreg: require("./assets/fonts/Roboto-Bold.ttf"),
    headers: require("./assets/fonts/Roboto-BoldItalic.ttf"),
    rakbold: require("./assets/fonts/BebasNeue-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  } else {
    return (
      <>
        <StatusBar style="light" />
        <OrdersContextProvider>
          <NavigationContainer style={styles.container}>
            <Stack.Navigator
              //default screen DrawerScreen
              initialRouteName="DrawerScreen"
              screenOptions={{
                headerTintColor: GlobalStyles.colors.primary500,
                headerStyle: {
                  backgroundColor: GlobalStyles.colors.primary800,
                },
                contentStyle: {
                  backgroundColor: GlobalStyles.colors.primary100,
                },
              }}
            >
              {/* drawer screen for drawer nav */}
              <Stack.Screen
                name="DrawerScreen"
                component={DrawerNavigator}
                options={{
                  headerShown: false,
                }}
              />
              {/* news detail screen */}
              <Stack.Screen
                name="ManageOrders"
                component={ManageOrderScreen}
                options={{
                  presentation: "modal",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrdersContextProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({});
