import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      done: false, // por padrão uma task digitada não pode estar concluída inicialmente, não tem lógica
      title: newTaskTitle
    }

    setTasks(oldTasks => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => ({...task}))

    const foundItem = updateTasks.find(item => item.id === id)

    if (!foundItem)
      return;
    
    foundItem.done = !foundItem.done;
    setTasks(updateTasks)
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    const updateTasks = tasks.filter(task => task.id !== id); // Aqui vai ser feito um filtro onde o retorno vai ser uma lista com todos as tasks diferentes daquela que foi selecionada
    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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