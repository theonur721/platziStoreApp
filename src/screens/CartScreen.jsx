import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {removeFromCart, clearCart} from '../store/slice/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/colors';
import AddToCart from '../components/AddToCart';
import normalize from '../constants/normalize';
import CustomNotification from '../components/CustomNotification'; // Yeni import

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false); // Bildirim durumunu kontrol etmek için bir state

  // Ürünü sepetten silme işlemi
  const handleRemove = productID => {
    dispatch(removeFromCart(productID));
  };

  // Sepetteki toplam fiyatı hesapla
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity; // Ürün fiyatı ile miktarını çarpıyoruz
  }, 0);

  // Sepeti temizleme ve bildirim gösterme
  const handleConfirmCart = () => {
    // Sepet onaylandığında bildirim göster
    setShowNotification(true);

    // Bildirimi 3 saniye sonra gizle
    setTimeout(() => {
      setShowNotification(false);
      dispatch(clearCart()); // Sepeti temizle
    }, 3000);
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={[defaultScreenStyle.container, styles.container]}>
        <Text style={styles.title}>CartScreen</Text>
        {totalPrice > 0 ? (
          <FlatList
            keyExtractor={item => item.id.toString()}
            data={cartItems}
            renderItem={({item}) => (
              <View style={styles.item}>
                <View style={styles.itemInfo}>
                  <Image
                    source={{uri: item?.images[0]}}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.itemText}>
                    <Text style={styles.name}>{item.title}</Text>
                    <Text style={styles.quantity}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.price}>{item.price} $</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  style={styles.removeButton}>
                  <Icon name="trash" size={normalize(24)} color={COLORS.red} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        )}

        {totalPrice > 0 && (
          <View style={styles.buttonContainer}>
            <Text style={styles.totalPrice}>
              <Text style={styles.total}>total:</Text> {totalPrice} $
            </Text>
            <AddToCart title={'Confirm Cart'} onPress={handleConfirmCart} />
          </View>
        )}
      </View>

      {/* Eğer bildirim gösterilecekse CustomNotification bileşenini ekleyelim */}
      {showNotification && (
        <CustomNotification
          message="Your order has been placed successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: normalize(100),
  },
  title: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    marginBottom: normalize(20),
  },
  item: {
    flexDirection: 'row',
    marginBottom: normalize(15),
    borderBottomWidth: 1,
    paddingBottom: normalize(10),
    borderColor: '#ccc',
    alignItems: 'center',
  },
  itemInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: normalize(80),
    height: normalize(80),
    borderRadius: normalize(10),
    marginRight: normalize(15),
  },
  itemText: {
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(18),
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: normalize(16),
    color: '#777',
  },
  price: {
    fontSize: normalize(18),
    color: COLORS.red,
    fontWeight: 'bold',
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(5),
    marginLeft: normalize(10),
  },
  totalPrice: {
    fontSize: normalize(30),
    color: COLORS.red,
  },
  total: {
    fontSize: normalize(24),
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(10),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  emptyCart: {
    fontSize: normalize(18),
    color: COLORS.secondary,
    textAlign: 'center',
    marginTop: normalize(30),
  },
});
