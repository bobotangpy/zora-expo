import _ from 'lodash';

export const calculateHoroscope = (month, day) => {
  let horoscope;

  if (month && day) {
    // Calculate user's horoscope using DoB selected in signup
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
      horoscope = 'Aquarius';
    }

    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
      horoscope = 'Pisces';
    }

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
      horoscope = 'Aries';
    }

    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
      horoscope = 'Taurus';
    }

    if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
      horoscope = 'Gemini';
    }

    if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
      horoscope = 'Cancer';
    }

    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
      horoscope = 'Leo';
    }

    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
      horoscope = 'Virgo';
    }

    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
      horoscope = 'Libra';
    }

    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
      horoscope = 'Scorpio';
    }

    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
      horoscope = 'Sagittarius';
    }

    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
      horoscope = 'Capricorn';
    }

    return horoscope;
  }
};

export const addToBag = (newItem, cartItems) => {
  let items = cartItems;
  let duplicate, newArr;

  if (cartItems.length > 0) {
    /* Check if same product exists in cart */
    _.find(cartItems, item => {
      /* Check if size is the same => update qty || add to cart as new item */
      if (item.id == newItem.id && item.size === newItem.size) {
        duplicate = item;
        let newQty = Number(duplicate.qty) + Number(newItem.qty);
        let newPrice =
          Number(duplicate.price.split('$')[1].replaceAll(',', '')) * newQty;

        items = _.map(cartItems, elm =>
          elm.id === duplicate.id && elm.size === duplicate.size
            ? (elm = {
                ...elm,
                qty: newQty,
                price: `HKD$${newPrice.toFixed(2)}`,
              })
            : elm,
        );
        newArr = items;
      } else {
        let price = newItem.price.split('$')[1].replaceAll(',', '');
        let newPrice = Number(price) * newItem.qty;
        newArr = [...items, {...newItem, price: `HKD$${newPrice.toFixed(2)}`}];
      }
    });
  } else {
    newArr = [newItem];
  }

  return newArr;
};
