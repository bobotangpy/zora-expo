import {Dimensions, StyleSheet} from 'react-native';

const productInfoStyles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fef9ef',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    marginLeft: 5,
    color: '#fef9ef',
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    marginRight: 15,
    color: '#fef9ef',
  },
  input: {
    fontSize: 16,
    width: 100,
    textAlign: 'center',
    borderBottomColor: '#fef9ef',
    borderBottomWidth: 1,
    color: '#fef9ef',
  },
  button: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#00296b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default productInfoStyles;
