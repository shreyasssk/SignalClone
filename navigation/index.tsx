/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Feather, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
	ColorSchemeName,
	Image,
	Pressable,
	SafeAreaView,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import HomeScreen from '../screens/HomeScreen';
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
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
			<Feather
				name="edit-2"
				size={24}
				color="black"
				style={{ marginHorizontal: 10 }}
			/>
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
				component={TabOneScreen}
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
			{/* <Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/> */}
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="TabOne"
				component={TabOneScreen}
				options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
					title: 'Tab One',
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate('Modal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome
								name="info-circle"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={TabTwoScreen}
				options={{
					title: 'Tab Two',
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
