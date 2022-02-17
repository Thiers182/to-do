import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
} // criação de uma tipagem!

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskSameTittle = tasks.find(task => task.title === newTaskTitle);
    if (taskSameTittle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome') // esse return serve para assimq ue achar uma igualdade de tarefas parar o fluxo
    }

    const newTask = {
      id: new Date().getTime(),
      done: false, // por padrão uma task digitada não pode estar concluída inicialmente, não tem lógica
      title: newTaskTitle
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({...task}))

    const foundItem = updateTasks.find(task => task.id === id) //na resolução do professor tem "item" ao invés de 'task'

    if (!foundItem) 
      return;
    
    foundItem.done = !foundItem.done;
    setTasks(updateTasks)
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updateTasks = tasks.filter(task => task.id !== id); // Aqui vai ser feito um filtro onde o retorno vai ser uma lista com todos as tasks diferentes daquela que foi selecionada
        setTasks(updateTasks);
        }
      }
    ] )
    
  }

  function handleEditTask({taskId, taskNewTitle}:EditTaskArgs){
    const updateTasks = tasks.map(task => ({...task})) // copiamos o array de objetos
    const taskToBeUpdated = updateTasks.find(task=> task.id === taskId) // buscamos se a task existe

    if (!taskToBeUpdated) // Como se lê: se ele não encontrar, ou seja for vazio a tentativa de encontrar,  ele retorna!!Ou outra leitura que podemos fazer é que se a tasak.id for igual ao takId ele vai ter que editar, ou seja enquanto não seja igual (task.id === taskId) vai ser feito testes até encontrar o que o usuário quer editar.
    return;

    taskToBeUpdated.title = taskNewTitle;
    setTasks(updateTasks)
   
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})