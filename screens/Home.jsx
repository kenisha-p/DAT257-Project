import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Electricprice from '../components/Electricprice';
import Add_laundry from '../components/Add_laundry';
import Remove_laundry from '../components/Remove_laundry';
import Usage from '../components/Usage';
import Settings from '../components/Settings_bottom';
import * as Font from 'expo-font';

export default class Home extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Imbue-Regular': require('../assets/fonts/Imbue-Regular.otf'),
      'Bitstream': require('../assets/fonts/bitstream_iowan_old_style_bt.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  handleAddLaundryPress = () => {
    this.props.navigation.navigate('Calendar');
  }

  handleRemoveLaundryPress = () => {
    this.props.navigation.navigate('Overview');
  }
  render() {
    if (!this.state.fontLoaded) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LaundryBuddy</Text>
        </View>
        <View style={styles.picture}>
          <Image source={require('../assets/Picture.png')} />
        </View>
        <View style={styles.contentContainer}>
          <Electricprice />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Add_laundry onPress={this.handleAddLaundryPress} />
            </View>
            <View style={styles.button}>
              <Remove_laundry onPress={this.handleRemoveLaundryPress}/>
            </View>
            <View style={styles.button}>
              <Usage />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: 'white'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  button: {
    marginTop: 10,
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 48,
  },
  picture: {
    marginTop: 90,
    left: 30,
  },
});
