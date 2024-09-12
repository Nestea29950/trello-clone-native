import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NotificationsScreen = () => {
  // Notifications simulées
  const notifications = [
    { id: 1, message: 'You have a new message from John Doe.', time: '5 mins ago' },
    { id: 2, message: 'Your project "App Redesign" was updated.', time: '30 mins ago' },
    { id: 3, message: 'You were mentioned in a comment by Jane Smith.', time: '1 hour ago' },
    { id: 4, message: 'The deadline for "UI Fixes" is tomorrow.', time: '2 hours ago' },
    { id: 5, message: 'New member added to your team: David Brown.', time: '1 day ago' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      {notifications.map((notification) => (
        <View key={notification.id} style={styles.notificationCard}>
          <Text style={styles.message}>{notification.message}</Text>
          <Text style={styles.time}>{notification.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6f7', // Couleur de fond similaire à Trello
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  notificationCard: {
    backgroundColor: '#fff', // Fond blanc pour les notifications, comme les cartes Trello
    padding: 16,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Ombre pour Android
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});

export default NotificationsScreen;
