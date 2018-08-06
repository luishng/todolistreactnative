import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  AsyncStorage 
} from 'react-native';
import { CheckBox, Header } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import SQLite from 'react-native-sqlite-storage';

import styles from './styles';

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: ''
    };
  }

  _getLeftButtons() {
    const swiperButtons = [
        {
            onPress: () => {},
            text: 'Editar',
            backgroundColor: '#f0c87a', 
        },
        {
          onPress: () => {},
          text: 'Deletar',
          backgroundColor: '#Eb7575', 
        }
    ];

    return swiperButtons;
  }

  render() {
    var tasks = [
      {key: "a", checkBox: false}, 
      {key: "b", checkBox: true}
    ];
    
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'To Do List', style: styles.title }}
        />

        <View style={styles.containerHorizontal}>
          <TextInput
            placeholder={"Digite sua tarefa aqui..."}
            onChangeText={text => {
              this.setState({ task: text });
            }}
            style={styles.textInput}
            value={this.state.task}
            multiline={false}
          />
          <TouchableOpacity
                style={this.props.button}
                onPress={() => {}}
                activeOpacity={0.8}
            >
              <Text style={styles.textButton}>
                  Adicionar
              </Text>
            </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <Swipeout
                autoClose
                style={styles.swipe}
                left={this._getLeftButtons()}
            >
              <View style={styles.containerHorizontalItem}>
                <Text style={styles.textTask}>{item.key}</Text>
                <CheckBox
                  title='Feita!'
                  style={styles.checkBoxTask}
                  checked={item.checkBox}
                />
              </View>
            </Swipeout>
          )}
        />
      </View>
    );
  }
}