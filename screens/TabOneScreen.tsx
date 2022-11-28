import { StyleSheet, View, FlatList } from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';

import chartRoomsData from '../assets/dummy-data/ChatRooms';

const chatRoom1 = chartRoomsData[0];
const chatRoom2 = chartRoomsData[1];

export default function TabOneScreen() {
	return (
		<View style={styles.page}>
			<FlatList
				data={chartRoomsData}
				renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		backgroundColor: 'white',
		flex: 1,
	},
});

// 1:27:33
