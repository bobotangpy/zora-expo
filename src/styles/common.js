import {Dimensions, StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69,85,117,0.3)',
  },
  noEffectTxt: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderColor: 'white',
    elevation: 0,
  },
  centerContent: {
    width: Dimensions.get('window').width - 20,
    marginHorizontal: 10,
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  borderBtn: {
    height: 45,
    backgroundColor: 'transparent',
    borderRadius: 4,
    borderColor: '#fef9ef',
    color: '#00296b',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockBtn: {
    height: 45,
    backgroundColor: '#fff',
    color: '#00296b',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkTxt: {
    color: '#00296b',
  },
  lightTxt: {
    color: '#fef9ef',
  },
  label: {
    color: '#00296b',
  },
  input: {
    color: '#fef9ef',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 40,
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomColor: '#c8c8c8',
    borderBottomWidth: 1.5,
    width: Dimensions.get('window').width - 80,
  },
  inputErrTxt: {
    marginTop: -30,
    marginBottom: 30,
    color: '#f44336',
  },
});

export default commonStyles;
