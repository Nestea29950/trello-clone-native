# 📱 React Native App - Trello-Inspired Notifications & Dark Mode

## Description

This React Native project is a Trello-inspired mobile application featuring a Dark Mode toggle, a user account management system, and a notifications screen with a clean, card-based design. It simulates key functionalities such as real-time notifications and smooth UI transitions, focusing on responsive design and user experience. Whether you're learning React Native or building the foundation for a larger project, this app serves as a practical starting point.

## Features

- 🌑 **Dark Mode**: Seamless dark/light mode toggle for better user experience
- 🔔 **Notifications**: Trello-style card notifications with shadow effects for a clean design
- 👤 **User Authentication**: Integrated with Firebase for login/logout functionality
- 🛠️ **Modular Components**: Reusable UI components (Icons, Screens) for better scalability

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (v16+)
- Expo CLI
- Firebase account for authentication setup

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/react-native-trello-notifications.git
cd react-native-trello-notifications
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project and add it to your app
   - Create a `firebase.js` file in the `functions/` folder and configure Firebase:

```javascript
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
```

4. Run the app:

```bash
expo start
```

## Usage

### Dark Mode
Toggle between light and dark mode on the Account Screen by simply switching the toggle.

### Notifications
View a list of fake notifications presented in a card format on the Notifications screen. These cards mimic Trello's card style, with shadow effects and smooth scrolling.

### Authentication
Log in and log out using Firebase Authentication. On logout, the user is redirected to the login screen.

## Technologies Used

- **React Native**: Framework for building native mobile apps using JavaScript and React
- **Expo**: A platform for developing universal React applications
- **Firebase**: Backend-as-a-Service (BaaS) for user authentication and more
- **JavaScript/ES6**: Core language for logic and components
- **Styled Components**: Modular and reusable styles for building a clean UI

## Contributing

Feel free to open issues or submit pull requests if you want to contribute to the project.

### How to contribute

1. Fork the project
2. Create a new branch (`git checkout -b feature-branch-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-branch-name`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

Citations:
- [1] https://www.atlassian.com/blog/atlassian-engineering/colorful-and-accessible-theming-in-trello
- [2] https://reactnative.dev/docs/appearance
- [3] https://github.com/marconunnari/trello-clone
- [4] https://github.com/rcdexta/react-trello
- [5] https://www.youtube.com/watch?v=GZdTP3EQ7ug
- [6] https://configcat.com/blog/2022/10/07/using-feature-flags-in-react-native/
- [7] https://www.youtube.com/watch?v=WiXs0JbA3_k
- [8] https://callstack.github.io/react-native-paper/docs/guides/icons/
