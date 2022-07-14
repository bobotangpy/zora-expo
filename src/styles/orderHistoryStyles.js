import {Dimensions, StyleSheet} from 'react-native';

const orderHistoryStyles = StyleSheet.create({
  title: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 30,
    marginLeft: 20,
    color: '#fef9ef',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
    width: Dimensions.get('window').width - 20,
  },
  card: {
    width: Dimensions.get('window').width - 30,
    padding: 15,
    borderColor: '#fff',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  innerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    maxWidth: Dimensions.get('window').width - 80,
    marginBottom: 15,
    marginHorizontal: 8,
  },
  imgPrice: {
    maxWidth: 150,
    marginHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#fef9ef',
  },
});

export default orderHistoryStyles;
