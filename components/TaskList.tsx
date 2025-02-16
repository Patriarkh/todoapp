import { useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';


interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskList({ tasks, onRemoveTask, onToggleComplete }: TaskListProps) {
  const listRef = useRef<FlatList<Task>>(null);

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
          
            <TouchableOpacity onPress={() => onToggleComplete(item.id)} style={styles.circle}>
              {item.completed && <Text style={styles.checkmark}>✔</Text>}
            </TouchableOpacity>

           
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.text}
            </Text>

           
            <Button title="Удалить" onPress={() => onRemoveTask(item.id)} color="red" />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        ListFooterComponent={<View style={{ height: 100 }} />}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmark: {
    fontSize: 16,
    color: '#555',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'black',
  },
  listContent: {
    paddingBottom: 50,
  },
});
