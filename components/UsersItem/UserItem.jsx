import React from "react";
import { Image, Text, View, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User } from "../../src/models";

export default function UserItem({ user }) {
	const navigation = useNavigation();

	async function onPress() {
		// Create a chat room
		const newChatRoom = await DataStore.save(new ChatRoom({ newMessages: 0 }));

		// connect authenticated user with the chat room
		const authUser = await Auth.currentAuthenticatedUser();
		const dbUser = await DataStore.query(User, authUser.attributes.sub);

		await DataStore.save(new ChatRoomUser({
			user: dbUser,
			chatRoom: newChatRoom
		}));

		// console.warn(authUser.attributes);

		// connect clicked user with the chat room
		const { chatRoom } = await DataStore.save(new ChatRoomUser({
			user,
			chatRoom: newChatRoom
		}));

		console.info(`dbUser: ${JSON.stringify(dbUser)}, user: ${JSON.stringify(user)}`);
		console.warn(`dbUser: ${JSON.stringify(dbUser)}, user: ${JSON.stringify(user)}, chatRoom: ${JSON.stringify(chatRoom)}`);

		navigation.navigate('ChatRoom', { id: newChatRoom.id } );
	}

  return (
    <Pressable onPress={onPress} style={styles.container}>
				<Image
					source={{
						uri: user.imageUri,
					}}
					style={styles.image}
				/>


				<View style={styles.rightContainer}>
					<View style={styles.row}>
						<Text style={styles.name}>{user.name}</Text>
					</View>
				</View>
			</Pressable>
  );
}