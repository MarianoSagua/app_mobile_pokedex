import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation/Navigation';
import DataContext from './src/context/DataContext';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <DataContext>
      <NavigationContainer>
        <Navigation/>
        <FlashMessage position="top" style={styles.flashMessage} />
      </NavigationContainer>
    </DataContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashMessage:{
    marginTop: 30
  }
});
