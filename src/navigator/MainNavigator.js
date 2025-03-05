// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import WishlistScreen from '../screens/WishlistScreen';
// import {Text, Icon} from 'react-native-elements';
// import BookListScreen from '../screens/BookListScreen';
// import DetailBookScreen from '../screens/DetailBookScreen';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Home"
//       component={HomeScreen}
//       options={{
//         headerShown: false,
//       }}
//     />

//     <Stack.Screen
//       name="BookList"
//       component={BookListScreen}
//       options={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: 'darkblue',
//         },
//       }}
//     />

//     <Stack.Screen
//       name="DetailScreen"
//       component={DetailBookScreen}
//       options={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: 'darkblue',
//         },
//       }}
//     />
//   </Stack.Navigator>
// );

// const CustomTabButton = ({label, onPress, isActive}) => (
//   <TouchableOpacity
//     style={[styles.tabButton, isActive && styles.activeTab]}
//     onPress={onPress()}>
//     {/* <Icon
//       name="home"
//       type="material-community"
//       // color={focused ? 'white' : 'lightblue'}
//       size={24}
//     /> */}
//     <Text>{label}</Text>
//   </TouchableOpacity>
// );

// const MainNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         tabBar={({navigation, state}) => (
//           <View>
//             <CustomTabButton
//               label="Home"
//               onPress={() => navigation.navigate('Home')}
//               isActive={state.index === 0}
//             />

//             <CustomTabButton
//               label="Wishlist"
//               onPress={() => navigation.navigate('Wislist')}
//               isActive={state.index === 1}
//             />
//           </View>
//         )}>
//         <Tab.Screen name="Home" component={HomeStack} />

//         <Tab.Screen name="Wishlist" component={WishlistScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//   },
//   activeTab: {
//     backgroundColor: 'darkblue',
//     borderRadius: 10,
//   },
// });

// export default MainNavigator;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import DetailBookScreen from '../screens/DetailBookScreen';
import WishlistScreen from '../screens/WishlistScreen';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon library

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="BookList"
      component={BookListScreen}
      options={{title: 'Book List', headerShown: false}}
    />
    <Stack.Screen
      name="BookDetail"
      component={DetailBookScreen}
      options={{
        title: 'Book Details',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const WishlistStack = () => {
  <Stack.Navigator>
    <Stack.Screen
      name="WishlistScreen"
      component={WishlistScreen}
      options={{
        title: 'Wishlist',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="BookDetail"
      component={DetailBookScreen}
      options={{
        title: 'Book Details',
        headerShown: false,
      }}
    />
  </Stack.Navigator>;
};

const CustomTabButton = ({label, iconName, onPress, isActive}) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTab]}
    onPress={onPress}>
    <Icon name={iconName} size={20} color="white" />
    <Text style={styles.tabText}>{label}</Text>
  </TouchableOpacity>
);

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        tabBar={({navigation, state}) => {
          const isOnHomeScreen =
            state.routes[state.index]?.state?.routes?.[
              state.routes[state.index]?.state?.index
            ]?.name === 'HomeScreen';

          return (
            <View style={styles.tabContainer}>
              <CustomTabButton
                label="Home"
                iconName="home"
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
                }}
                isActive={isOnHomeScreen}
              />
              <CustomTabButton
                label="Wishlist"
                iconName="book"
                onPress={() => navigation.navigate('Wishlist')}
                isActive={state.routes[state.index].name === 'Wishlist'}
              />
            </View>
          );
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Wishlist" component={WishlistStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Styles
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'navy',
    paddingVertical: 12,
  },
  tabButton: {
    alignItems: 'center',
    // paddingVertical: 10,
    // paddingHorizontal: 30,
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: 'blue',
    borderRadius: 5,
    // paddingVertical: 10,
  },
  tabText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'SourGummy-SemiBold',
  },
});

export default MainNavigator;
