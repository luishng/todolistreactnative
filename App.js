import React, { Component } from 'react';
import { View, Text, TextInput, TouchableHighlight, Button, FlatList, Platform } from 'react-native';

import styles from './styles';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Todo List</Text>
        <View>
          <TextInput></TextInput>
          <Button 
            onPress={() => {}}
            title="Adicionar"
            color="#1E88E5"
          />
        </View>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item, index}) => (
            <TouchableHighlight
              onPress={() => {}}>
              <View style={{backgroundColor: 'white'}}>
                <Text>{item.key}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}