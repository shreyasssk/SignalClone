import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';

import chartRoomsData from '../assets/dummy-data/ChatRooms';
import { Auth } from 'aws-amplify';

const chatRoom1 = chartRoomsData[0];
const chatRoom2 = chartRoomsData[1];

export default function TabOneScreen() {
	// function onLogOut() {
	// 	Auth.signOut();
	// }

	return (
		<View style={styles.page}>
			<FlatList
				data={chartRoomsData}
				renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
				showsVerticalScrollIndicator={false}
			/>

			{/* <Pressable onPress={onLogOut} style={styles.logout}>
				<Text>Logout</Text>
			</Pressable> */}
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: 'white',
		flex: 1,
	},
	logout: {
		backgroundColor: 'red',
		height: 50,
		margin: 10,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

// 1:27:33
