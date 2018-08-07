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
import Prompt from 'react-native-prompt';

import styles from './styles';

var db = SQLite.openDatabase({name: 'example.db', createFromLocation : "~www/example.db"}, this.openCB, this.errorCB);

export default class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      task: '',
      taskId: -1,
      newDescription: '',
      promptVisible: false
    };
  
    db.transaction((tx) => {
      console.log("TO AQUIIIIII");
      tx.executeSql('CREATE TABLE IF NOT EXISTS Task ' +
      '(' +
        'task_id integer PRIMARY KEY AUTOINCREMENT,' +
        'description text NOT NULL,' +
        'checked integer NOT NULL'
      + ');');

      tx.executeSql('SELECT * FROM Task;', (tx, results) => {
          let len = results.rows.length;
          let tasksDB = [];

          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);

            tasksDB.push(row);
            console.log("rooooooooooooooooow: " + row);
          }
          
          this.setState({tasks: tasksDB});
        });
    });
  }

  errorCB(err) {
    console.log("SQL Error: " + err);
  }

  openCB() {
    console.log("Database OPENED");
  }

  _addTask() {
    let notEmpty = this.state.task.trim().length > 0;

    if (notEmpty) {
      console.log("TO AQUIIIIII2");
      db.transaction((tx) => {
        tx.executeSql('INSERT INTO Task (description, checked) VALUES (?1, ?2);', [this.state.task.trim(), 0]);
      },function(error) {
        console.log('Transaction ERROR: ' + error.message);
      }, function() {
        console.log('Populated database OK');
      });
    }
  };

  deleteTask(id) {
    if (notEmpty) {
      db.transaction((tx) => {
        tx.executeSql('DELETE FROM Task WHERE task_id = ' +id);
      });
    }
  };

  updateCheckBox(id, checkbox) {
    if (notEmpty) {
      db.transaction((tx) => {
        tx.executeSql('UPDATE Task SET checked = ' + !checkbox + ' WHERE task_id = ' +id);
      });
    }
  };

  updateTask(id, newDescription) {
    if (notEmpty) {
      db.transaction((tx) => {
        tx.executeSql('UPDATE Task SET description = '+ description +' WHERE task_id = ' +id);
      });
    }
    this.setState({ newDescription: '', promptVisible: false });
  };

  _getLeftButtons(task) {
    this.setState({ taskId: task.task_id });

    const swiperButtons = [
        {
            onPress: () => this.setState({ promptVisible: true }),
            text: 'Editar',
            backgroundColor: '#f0c87a', 
        },
        {
          onPress: () => {this.deleteTask(task.task_id)},
          text: 'Deletar',
          backgroundColor: '#Eb7575', 
        }
    ];

    return swiperButtons;
  }

  render() {
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
                onPress={() => this._addTask()}
                activeOpacity={0.8}
            >
              <Text style={styles.textButton}>
                  Adicionar
              </Text>
            </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.tasks}
          renderItem={({ item, index }) => (
            <Swipeout
                autoClose
                style={styles.swipe}
                left={this._getLeftButtons(item)}
            >
              <View style={styles.containerHorizontalItem}>
                <Text style={styles.textTask}>{item.description}</Text>
                <CheckBox
                  title='Feita!'
                  style={styles.checkBoxTask}
                  checked={item.checked}
                  onPress={() => this.updateCheckBox(item.task_id, item.checked)}
                />
              </View>
            </Swipeout>
          )}
        />
        <Prompt
          title="Editar Tarefa"
          placeholder="Digite aqui a nova tarefa..."
          visible={ this.state.promptVisible }
          onCancel={ () => this.setState({
            promptVisible: false
          }) }
          onSubmit={ (value) => this.updateTask(taskId, value) }
          submitText="Editar"
          cancelText="Cancelar"  
        />
      </View>
    );
  }
}