import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface TaskInputProps {
    onAddTask: (task: string) => void;
  }

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [task, setTask] = useState<string>('');

  const handleAddTask = () => {
    if (task.trim()) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите задачу..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Добавить" onPress={handleAddTask} color='black'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
