import React from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./appNavigator/Navigator";
import Updateprice from "./components/Updateprice";


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Navigator />
        <Updateprice />
      </NavigationContainer>
    );
  }
}

registerRootComponent(App);
