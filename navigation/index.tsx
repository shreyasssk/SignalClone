/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather } from '@expo/vector-icons';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
	useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
	ColorSchemeName,
	Image,
	Pressable,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';

import ModalScreen from '../screens/ModalScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';
import UsersScreen from '../screens/UsersScreen';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

function HomeHeader() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();

	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				width,
				padding: 10,
				alignItems: 'center',
			}}
		>
			<Image
				source={{
					uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg',
				}}
				style={{ width: 30, height: 30, borderRadius: 30 }}
			/>
			<Text
				style={{
					flex: 1,
					textAlign: 'center',
					marginLeft: 30,
					fontWeight: 'bold',
				}}
			>
				Signal
			</Text>
			<Feather
				name="camera"
				size={24}
				color="black"
				style={{ marginHorizontal: 10 }}
			/>
			<Pressable onPress={() => navigation.navigate('UsersScreen')}>
				<Feather
					name="edit-2"
					size={24}
					color="black"
					style={{ marginHorizontal: 10 }}
				/>
			</Pressable>
		</View>
	);
}

function ChatRoomHeader({ children }) {
	const { width } = useWindowDimensions();

	return (
		<View
			style={{
				// backgroundColor: 'red',
				flexDirection: 'row',
				justifyContent: 'space-between',
				width: width - 70,
				marginLeft: 0,
				padding: 10,
				alignItems: 'center',
			}}
		>
			<Image
				source={{
					uri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/zuck.jpeg',
				}}
				style={{ width: 30, height: 30, borderRadius: 30 }}
			/>
			<Text
				style={{
					flex: 1,
					marginLeft: 10,
					fontWeight: 'bold',
				}}
			>
				{children}
			</Text>
			<Feather
				name="camera"
				size={24}
				color="black"
				style={{ marginHorizontal: 10 }}
			/>
			<Feather
				name="edit-2"
				size={24}
				color="black"
				style={{ marginHorizontal: 10 }}
			/>
		</View>
	);
}

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={{ headerTitle: HomeHeader }}
			/>
			<Stack.Screen
				name="ChatRoom"
				component={ChatRoomScreen}
				options={{
					headerTitle: ChatRoomHeader,
					headerBackTitleVisible: false,
				}}
			/>
			<Stack.Screen
				name="UsersScreen"
				component={UsersScreen}
				options={{
					title: 'Users',
				}}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}
