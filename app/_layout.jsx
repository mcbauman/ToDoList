import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Switch,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [prioority, setPriority] = useState(0);
  const [done, setDone] = useState(false);
  const [helper, setHelper] = useState(false);
  const [editHelper, setEditHelper] = useState(false);
  const [indexHelper, setIdexHelper] = useState(false);

  function submit() {
    setTodoList([...todoList, { title, person, prioority, done }]);
    setTitle("");
    setPerson("");
    setPriority("");
    setDone(false);
    setHelper(false);
  }

  function submitChanges() {
    todoList[indexHelper] = { title, person, prioority, done };
    setIdexHelper(false);
    setHelper(false);
    setEditHelper(false);
    setTitle("");
    setPerson("");
    setPriority("");
    setDone(false);
  }

  function openEntry(Index) {
    console.log(Index);
    setEditHelper(true);
    setHelper(true);
    setIdexHelper(Index);
    setTitle(todoList[Index].title);
    setPerson(todoList[Index].person);
    setPriority(todoList[Index].prioority);
    setDone(todoList[Index].done);
  }

  function deleteItem(index) {
    setTodoList(todoList.toSpliced(index, 1));
  }
  return (
    <View
      style={{
        backgroundColor: "rgb(50, 50, 50)",
        height: "100vh",
        padding:10,
      }}
    >
      <Text style={{ color: "white", fontSize:'x-large' }}>ToDoItemForm</Text>
      {helper ? (
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="title"
            inputMode="text"
          />
          <TextInput
            style={styles.input}
            value={person}
            onChangeText={setPerson}
            placeholder="person"
            inputMode="text"
          />
          <TextInput
            style={styles.input}
            value={prioority}
            onChangeText={setPriority}
            placeholder="priority"
            inputMode="decimal"
            keyboardType="decimal-pad"
          />
          <Switch style={{margin:10}} value={done} onValueChange={setDone} />
          <View style={{flex:1,flexDirection:'row', justifyContent:'center'}}>
            {!editHelper ? (
              <Button color="green" onPress={submit} title="save New" />
            ) : (
              <Button
                color="green"
                onPress={submitChanges}
                title="Save Changes"
              />
            )}
            <Button color="red" onPress={() => setHelper(!helper)} title="X" />
          </View>
        </View>
      ) : (
        <Button color="green" onPress={() => setHelper(!helper)} title="+" />
      )}
      <FlatList
        data={todoList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => openEntry(index)}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems:'center',
              margin:10,
              padding:10,
              backgroundColor:'black',
              borderRadius:10,
            }}
          >
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.text}>{item.person}</Text>
            <Text style={styles.text}>{item.prioority}</Text>
            <Switch value={item.done} editable="false" />
            <Button
              color="red"
              style={styles.button}
              onPress={() => deleteItem(index)}
              title="Remove"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize:'larger'
  },
  input: {
    backgroundColor: "rgb(200,200,200)",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {},
  inputArea:{
    backgroundColor:'rgb(70,70,70)',
    margin:10,
    padding:10,
    borderRadius:10
  }
});
