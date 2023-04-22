import React from 'react';
import {Pressable} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  navigation: any;
  backButton: boolean;
};

function Header({navigation, backButton}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      {backButton && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="angle-left" size={30} color={'white'} />
        </Pressable>
      )}
      <Text style={styles.text}>Postcards</Text>
      <View style={styles.shoppingCartContainer}>
        <Icon name="shopping-cart" size={30} color={'white'} />
        <Text style={styles.shoppingCartText}>1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  shoppingCartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shoppingCartText: {
    fontSize: 12,
    backgroundColor: 'red',
    height: 20,
    width: 20,
    borderRadius: 10,
    paddingTop: 1.5,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    position: 'absolute',
    right: -10,
    top: -5,
  },
});

export default Header;
