import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import {
	SimpleLineIcons,
	Feather,
	MaterialCommunityIcons,
	AntDesign,
	Ionicons,
} from '@expo/vector-icons';

export default function MessageInput() {
	const [message, setMessage] = useState('');

	function sendMessage() {
		// send message
		console.warn('sending...', message);

		setMessage('');
	}

	function onPlusClicked() {
		console.warn('triggered plus button!');
	}

	function onPress() {
		// console.warn('I am pressed!');
		if (message) {
			sendMessage();
		} else {
			onPlusClicked();
		}
	}

	return (
		<View style={styles.root}>
			<View style={styles.inputContainer}>
				<SimpleLineIcons
					name="emotsmile"
					size={24}
					color="grey"
					style={styles.icon}
				/>

				<TextInput
					style={styles.input}
					placeholder="Signal message"
					value={message}
					onChangeText={setMessage}
				/>

				<Feather name="camera" size={24} style={styles.icon} />
				<MaterialCommunityIcons
					name="microphone-outline"
					size={24}
					style={styles.icon}
				/>
			</View>
			<Pressable onPress={onPress} style={styles.buttonContainer}>
				{message ? (
					<Ionicons name="send" size={18} color="white" />
				) : (
					<AntDesign name="plus" size={24} color="white" />
				)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
	},
	inputContainer: {
		backgroundColor: '#f2f2f2',
		flex: 1,
		marginRight: 10,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#dedede',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 5,
	},
	input: {
		flex: 1,
		marginHorizontal: 5,
	},
	icon: {
		color: '#595959',
		marginHorizontal: 5,
	},
	buttonContainer: {
		width: 50,
		height: 50,
		backgroundColor: '#3777f0',
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		color: 'black',
		fontSize: 35,
	},
});
