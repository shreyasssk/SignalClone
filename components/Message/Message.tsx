import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const BLUE = '#3777f0';
const GREY = 'lightgray';

const myID = 'u1';

export default function Message({ message }) {
	const isMe = message.user.id == myID;

	return (
		<View
			style={[
				styles.container,
				isMe ? styles.rightContainer : styles.leftContainer,
			]}
		>
			<Text style={{ color: isMe ? 'black' : 'white' }}>{message.content}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		margin: 10,
		borderRadius: 10,
		maxWidth: '75%',
	},
	leftContainer: {
		backgroundColor: '#3777f0',
		marginLeft: 10,
		marginRight: 'auto',
	},
	rightContainer: {
		backgroundColor: 'lightgray',
		marginLeft: 'auto',
		marginRight: 10,
	},
});
