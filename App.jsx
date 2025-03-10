import {
  StatusBar,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {deviceHeight, deviceWidth} from './src/Dimensions';

const App = () => {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
      setShowInput(false);
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const deleteTask = (index) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedTasks = [...tasks];
            updatedTasks.splice(index, 1);
            setTasks(updatedTasks);
          },
          style: 'destructive',
        },
      ]
    );
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(tasks[index]);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = editText;
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditText('');
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditText('');
  };
 
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require('./src/assetss/todo.jpg')}
        style={styles.backgroundImage}
        blurRadius={50}
      />
      
      <View style={styles.contentContainer}>
        <Text style={[styles.greetingText, {fontStyle: 'italic'}]}>
          Hello, Welcome User!
        </Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowInput(!showInput)}>
          <Text style={styles.headerText}>
            {showInput ? "Cancel" : "Add Task"}
          </Text>
        </TouchableOpacity>
        
        {showInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter task"
              value={task}
              onChangeText={(text) => setTask(text)}
              placeholderTextColor="gray"
            />
            
            <TouchableOpacity style={styles.addTaskButton} onPress={addTask}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.tasksContainer}>
          {tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={({item, index}) => (
                <View style={styles.taskItem}>
                  {editIndex === index ? (
                    // Edit mode
                    <>
                      <TextInput
                        style={styles.editInput}
                        value={editText}
                        onChangeText={setEditText}
                        autoFocus
                      />
                      <View style={styles.editActions}>
                        <TouchableOpacity onPress={saveEdit} style={styles.saveButton}>
                          <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
                          <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    // View mode
                    <>
                      <Text style={styles.taskText}>{item}</Text>
                      <View style={styles.taskActions}>
                        <TouchableOpacity onPress={() => startEdit(index)} style={styles.editButton}>
                          <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteButton}>
                          <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No tasks yet. Add a task to get started!</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  greetingText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  addButton: {
    backgroundColor: '#2a9d8f',
    borderRadius: 12,
    margin: 10,
    elevation: 3,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,
  },
  inputContainer: {
    marginVertical: 15,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    elevation: 2,
  },
  addTaskButton: {
    backgroundColor: '#264653',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  tasksContainer: {
    flex: 1,
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#e9c46a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#e76f51',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#2a9d8f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
});