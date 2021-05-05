/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import PushNotification from 'react-native-push-notification';

class App extends React.Component {
  constructor(props) {
    super(props);
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => this.testPush()}>
          <Text>Push</Text>
        </TouchableOpacity>
      </View>
    );
  }
  testPush = () => {
    PushNotification.localNotification({
      title: 'My Notification Title', // (optional)
      message: 'My Notification Message', // (required)
    });
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lighter,
  },
});

export default App;
