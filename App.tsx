import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MainPage from "./pages/MainPage/MainPage";
import LaunchPage from "./pages/LauchPage/LaunchPage";

const App: React.FC = () => {

  const Stack: any = createStackNavigator();

  return <NavigationContainer>
    <Stack.Navigator
      initialRouteName="homepage"
    >
      <Stack.Screen
        name={"homepage"}
        component={MainPage}
        options={{
          header: () => null,
        }
        }
      />
      <Stack.Screen
        name={"stackpage"}
        component={LaunchPage}
        options={{
          title: "Launchpad Details",
        }
        }
      />
    </Stack.Navigator>
  </NavigationContainer>;
};
export default App;
