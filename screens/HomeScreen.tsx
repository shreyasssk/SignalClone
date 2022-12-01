import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable, Text } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { ChatRoom, ChatRoomUser } from '../src/models';

import ChatRoomItem from '../components/ChatRoomItem';

export default function HomeScreen() {
	const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

	useEffect(() => {
		const fetchChatRooms = async () => {
			const userData = await Auth.currentAuthenticatedUser();

			const chatRooms = (await DataStore.query(ChatRoomUser)).filter(
				(chatRoomUser) => chatRoomUser.id === userData.attributes.sub
			);
			console.warn(chatRooms);
			// setChatRooms(chatRooms);
		};

		fetchChatRooms();
	}, []);

	// function onLogOut() {
	// 	Auth.signOut();
	// }

	return (
		<View style={styles.page}>
			{/* <FlatList
				data={chatRooms}
				renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
				showsVerticalScrollIndicator={false}
			/> */}

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
