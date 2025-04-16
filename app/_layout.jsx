import React, { useState } from 'react';
import {View, Text, FlatList, TextInput, Switch, Button, TouchableOpacity} from 'react-native'

export default function App() {
  const [todoList, setTodoList] = useState([])
  const [title, setTitle] = useState("")
  const [ person, setPerson ] = useState("")
  const [ prioority, setPriority ] = useState(0)
  const [ done, setDone ] = useState(false)
  const [ helper, setHelper] = useState(false)
  const [ editHelper, setEditHelper] = useState(false)
  const [indexHelper, setIdexHelper] = useState(false)

  function submit(){
    setTodoList([...todoList,{title, person, prioority, done}])
    setTitle("");setPerson("");setPriority("");setDone(false)
    setHelper(false)
  }

  function submitChanges(){
    todoList[indexHelper]={title, person, prioority, done}
    setIdexHelper(false)
    setHelper(false)
    setEditHelper(false)
    setTitle("");setPerson("");setPriority("");setDone(false)
  }

  function openEntry(Index){
    console.log(Index);
    setEditHelper(true)
    setHelper(true)
    setIdexHelper(Index)
    setTitle(todoList[Index].title)
    setPerson(todoList[Index].person)
    setPriority(todoList[Index].prioority)
    setDone(todoList[Index].done)
  }

  function deleteItem(index){
    setTodoList(todoList.toSpliced(index,1))
  }
  return (
    <View>
      <Text>ToDoItemForm</Text>
      {helper?(<View>
        <TextInput value={title} onChangeText={setTitle} placeholder='title' inputMode='text' />
        <TextInput value={person} onChangeText={setPerson} placeholder='person' inputMode='text' />
        <TextInput value={prioority} onChangeText={setPriority} placeholder='priority' inputMode='decimal' keyboardType='decimal-pad' />
        <Switch value={done} onValueChange={setDone} />
        {!editHelper?(<Button onPress={submit} title='save New' />):(
          <Button onPress={submitChanges} title='Save Changes' />
        )}
      </View>):(
        <Button onPress={()=>(setHelper(!helper))} title="+"/>
      )}
      <FlatList data={todoList} renderItem={({item, index}) => (
        <TouchableOpacity
        onPress={()=>openEntry(index)}
        style={{
          flex:1,
          flexDirection:'row',
          justifyContent:'space-between'
        }
        }>
          <Text>{item.title}</Text>
          <Text>{item.person}</Text>
          <Text>{item.prioority}</Text>
          <Switch value={item.done} editable='false' />
          <Button onPress={()=>deleteItem(index)} title="Remove" />
        </TouchableOpacity>
      )} />
    </View>
  );
}
