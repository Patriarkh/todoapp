import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';



const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString('ru-RU', {  month: 'long', day: 'numeric' });
};

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: string) => {
    setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompleteTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      return [
        ...updatedTasks.filter(task => !task.completed), 
        ...updatedTasks.filter(task => task.completed), 
      ];
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Задачи на {getCurrentDate()}</Text>
      </View>

      <View style={styles.taskContainer}>
        <TaskInput onAddTask={addTask} />
        <TaskList tasks={tasks} onRemoveTask={removeTask} onToggleComplete={toggleCompleteTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  titleText: {
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  },
  taskContainer: {
    flex: 1,
    padding: 20,
  },
});
