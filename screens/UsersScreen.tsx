import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { DataStore } from 'aws-amplify';

import UserItem from '../components/UsersItem';
import { User } from '../src/models';

export default function UsersScreen() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		// query users
		// async function fetchUsers() {
		// 	const fetchedUsers = await DataStore.query(User);
		// 	setUsers(fetchedUsers);
		// }

		// fetchUsers();

		DataStore.query(User).then(setUsers);
	}, []);

	return (
		<View style={styles.page}>
			<FlatList
				data={users}
				renderItem={({ item }) => <UserItem user={item} />}
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
	logout: {
		backgroundColor: 'red',
		height: 50,
		margin: 10,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

// 2:28:41
