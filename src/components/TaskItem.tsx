import React, { useEffect, useRef, useState } from 'react';
import {Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import { EditTaskArgs } from '../pages/Home';

interface TasksItemProps {
  task: Task; // Mudamos de 'tasks: Task[];' para task: Task pois estaremos recebendo apenas uma task
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({taskId, taskNewTitle}: EditTaskArgs)=>void;
}

export function TaskItem({task, editTask, removeTask, toggleTaskDone}:TasksItemProps){
const [isEditing, setIsEditing] = useState(false);
const [taskNewTitleValue, setTaskNewTitleValue] = useState(task.title)
const textInputRef = useRef<TextInput>(null) // o "Ref" é utilizado para manipular o item que está sendo editado!

function handleStartEditing(){
  setIsEditing(true); //função que será utilizada para quando o usuário começar a editar
}

function handleCancelEditing(){
  setTaskNewTitleValue(task.title); //seta o valor original(task.title) no estado que armazena o valor editado do item
  setIsEditing(false);//função que será utilizada para quando o usuário termina a editção
}

function handleSubmtEditing(){
  editTask({taskId: task.id, taskNewTitle: taskNewTitleValue}); //Função que passa as alterações
  setIsEditing(false);//função que será utilizada para quando o usuário termina a edição
}

useEffect(() => { // useEfect u monitorar a alteração do estado que indica se está ocorrendo alteração ou não
  if (textInputRef.current) {
    if (isEditing) {
      textInputRef.current.focus();
    } else {
      textInputRef.current.blur();
    }
  }
}, [isEditing])


  return (
    <View style={styles.container}> 
      <View style = {styles.infoContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing} //meu item vai editável quando eu estiver "editando" representado pela função isEditing
            onSubmitEditing={handleSubmtEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

          
          <View style = {styles.iconsContainer}>
               {isEditing ? (
                 <TouchableOpacity
                    onPress={handleCancelEditing}
                  >
                     <Icon name="x" size={24} color="#b2b2b2" />
                  </TouchableOpacity>

                ) : (
                  
                  <TouchableOpacity
                    onPress={handleStartEditing}
                  >
                      <Image source={editIcon} />
                  </TouchableOpacity>
                )}
                  
                  <View style = {styles.iconsDivider}/>

                    <TouchableOpacity
                      onPress={() => removeTask(task.id)}
                      disabled={isEditing}
                    >
                      <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/> 
                    </TouchableOpacity>
                  

          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  infoContainer: {
    flex: 1,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider:{
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})