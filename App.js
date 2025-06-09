// // ... keep your imports same
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Button,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function App() {
//   const [taskText, setTaskText] = useState("");
//   const [tasks, setTasks] = useState([]);
//   const [priority, setPriority] = useState("Medium");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     const data = await AsyncStorage.getItem("tasks");
//     if (data) setTasks(JSON.parse(data));
//   };

//   const saveTasks = async (newTasks) => {
//     await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
//   };

//   const addTask = () => {
//     if (taskText.trim() === "") return;

//     const newTask = {
//     id: Date.now().toString(), // unique id
//     text: taskText,
//     completed: false,
//     priority,
//   };

//     const newTasks = [...tasks, newTask];
//     setTasks(newTasks);
//     saveTasks(newTasks);
//     setTaskText("");
//     setPriority("Medium");
//   };

//   const updateTask = () => {
//     const updatedTasks = [...tasks];
//     updatedTasks[editingIndex].text = taskText;
//     updatedTasks[editingIndex].priority = priority;
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//     setTaskText("");
//     setPriority("Medium");
//     setIsEditing(false);
//     setEditingIndex(null);
//   };

//   const startEditing = (id) => {
//     const index = tasks.findIndex((t) => t.id === id);
//     if (index !== -1) {
//       setTaskText(tasks[index].text);
//       setPriority(tasks[index].priority);
//       setIsEditing(true);
//       setEditingIndex(index);
//     }
//   };

//   const toggleComplete = (id) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//   };

//   const deleteTask = (id) => {
//     const updatedTasks = tasks.filter((task) => task.id !== id);
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//     if (isEditing && tasks[editingIndex]?.id === id) {
//       setIsEditing(false);
//       setTaskText("");
//     }
//   };

//   const getSortedTasks = () => {
//     const priorityMap = { High: 0, Medium: 1, Low: 2 };
//     return [...tasks].sort(
//       (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
//     );
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case "High":
//         return "#ffcccc"; // light red
//       case "Medium":
//         return "#fff9c4"; // light yellow
//       case "Low":
//         return "#d0f0c0"; // light green
//       default:
//         return "#f9f9f9"; // default background
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter task..."
//         value={taskText}
//         onChangeText={setTaskText}
//       />
//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={priority}
//           onValueChange={(itemValue) => setPriority(itemValue)}
//         >
//           <Picker.Item label="High Priority" value="High" />
//           <Picker.Item label="Medium Priority" value="Medium" />
//           <Picker.Item label="Low Priority" value="Low" />
//         </Picker>
//       </View>

//       <Button
//         title={isEditing ? "Update Task" : "Add Task"}
//         onPress={isEditing ? updateTask : addTask}
//       />

//       <FlatList
//         data={getSortedTasks()}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.taskItem,
//               { backgroundColor: getPriorityColor(item.priority) },
//               item.completed && styles.completed,
//             ]}
//           >
//             <TouchableOpacity onPress={() => toggleComplete(item.id)}>
//               <Text style={styles.checkbox}>
//                 {item.completed ? "✅" : "⬜"}
//               </Text>
//             </TouchableOpacity>
//             <View style={styles.taskContent}>
//               <Text style={styles.taskText}>{item.text}</Text>
//               <Text style={styles.priority}>{item.priority}</Text>
//             </View>
//             <TouchableOpacity onPress={() => startEditing(item.id)}>
//               <Text style={styles.edit}>✏️</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => deleteTask(item.id)}>
//               <Text style={styles.delete}>🗑️</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, paddingTop: 50, flex: 1, backgroundColor: "#fff" },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   pickerWrapper: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   taskItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     marginBottom: 8,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//   },
//   taskContent: { flex: 1, marginLeft: 10 },
//   taskText: { fontSize: 16 },
//   priority: { fontSize: 12, color: "#555" },
//   completed: { backgroundColor: "#e0ffe0" },
//   checkbox: { fontSize: 20 },
//   edit: { fontSize: 18, marginHorizontal: 8 },
//   delete: { fontSize: 18 },
// });

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("Medium");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const notificationTimers = useRef({});

  useEffect(() => {
    loadTasks();
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for notifications!");
      }
    }
  };

  const scheduleNotification = async (taskId, text, priority) => {
    let seconds;
    if (priority === "High") seconds = 30 * 60;
    else if (priority === "Medium") seconds = 2 * 60 * 60;
    else seconds = 5 * 60 * 60;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Task Reminder",
        body: text,
        data: { taskId },
      },
      trigger: { seconds, channelId: "default" },
    });

    notificationTimers.current[taskId] = id;
  };

  const cancelNotification = async (taskId) => {
    const notifId = notificationTimers.current[taskId];
    if (notifId) {
      await Notifications.cancelScheduledNotificationAsync(notifId);
      delete notificationTimers.current[taskId];
    }
  };

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  };

  const saveTasks = async (newTasks) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = async () => {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      text: taskText,
      completed: false,
      priority,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    await saveTasks(newTasks);
    await scheduleNotification(newTask.id, newTask.text, newTask.priority);
    setTaskText("");
    setPriority("Medium");
  };

  const updateTask = async () => {
    const updatedTasks = [...tasks];
    const task = updatedTasks[editingIndex];
    task.text = taskText;
    task.priority = priority;

    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    await cancelNotification(task.id);
    await scheduleNotification(task.id, task.text, task.priority);

    setTaskText("");
    setPriority("Medium");
    setIsEditing(false);
    setEditingIndex(null);
  };

  const startEditing = (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      setTaskText(tasks[index].text);
      setPriority(tasks[index].priority);
      setIsEditing(true);
      setEditingIndex(index);
    }
  };

  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);

    const toggled = updatedTasks.find((t) => t.id === id);
    if (toggled.completed) await cancelNotification(id);
    else await scheduleNotification(id, toggled.text, toggled.priority);
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
    await cancelNotification(id);
    if (isEditing && tasks[editingIndex]?.id === id) {
      setIsEditing(false);
      setTaskText("");
    }
  };

  const getSortedTasks = () => {
    const priorityMap = { High: 0, Medium: 1, Low: 2 };
    return [...tasks].sort(
      (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#ffcccc";
      case "Medium":
        return "#fff9c4";
      case "Low":
        return "#d0f0c0";
      default:
        return "#f9f9f9";
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={taskText}
        onChangeText={setTaskText}
      />
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
        >
          <Picker.Item label="High Priority" value="High" />
          <Picker.Item label="Medium Priority" value="Medium" />
          <Picker.Item label="Low Priority" value="Low" />
        </Picker>
      </View>
      <Button
        title={isEditing ? "Update Task" : "Add Task"}
        onPress={isEditing ? updateTask : addTask}
      />
      <FlatList
        data={getSortedTasks()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskItem,
              { backgroundColor: getPriorityColor(item.priority) },
              item.completed && styles.completed,
            ]}
          >
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={styles.checkbox}>
                {item.completed ? "✅" : "⬜"}
              </Text>
            </TouchableOpacity>
            <View style={styles.taskContent}>
              <Text style={styles.taskText}>{item.text}</Text>
              <Text style={styles.priority}>{item.priority}</Text>
            </View>
            <TouchableOpacity onPress={() => startEditing(item.id)}>
              <Text style={styles.edit}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50, flex: 1, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
  },
  taskContent: { flex: 1, marginLeft: 10 },
  taskText: { fontSize: 16 },
  priority: { fontSize: 12, color: "#555" },
  completed: { backgroundColor: "#e0ffe0" },
  checkbox: { fontSize: 20 },
  edit: { fontSize: 18, marginHorizontal: 8 },
  delete: { fontSize: 18 },
});
