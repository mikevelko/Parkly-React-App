import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		backgroundColor: '#b0e0e6',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		borderRadius: 15,
	},
	title: {
		fontSize: 24,
	},
	lowerText: {
		fontSize: 16,
	},
	flag: {
		height: 64,
		width: 64,
	},
	horizontalView: {
		flex: 0, 
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	button1: {
		alignItems: "center",
		backgroundColor: "#98fb98",
		padding: 10,
	  },
	  button11: {
		alignItems: "center",
		backgroundColor: "#ccff66",
		padding: 10,
		marginLeft: 16
	  },
	  button2: {
		alignItems: "center",
		backgroundColor: "#ff4d4d",
		padding: 10
	  },
	  button3: {
		alignItems: "center",
		backgroundColor: "#87cefa",
		padding: 10,
		marginRight: 16
	  },
	  button4: {
		alignItems: "center",
		backgroundColor: "grey",
		padding: 10
	  },
	countContainer: {
	  alignItems: "center",
	  padding: 10
	}
});
export default styles;
