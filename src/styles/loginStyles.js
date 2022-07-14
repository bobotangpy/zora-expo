import {Dimensions, StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    // flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    alignContent: 'center',
    width: Dimensions.get('window').width - 80,
    height: Dimensions.get('window').height - 50,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  label: {
    color: '#cacaca',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default loginStyles;
