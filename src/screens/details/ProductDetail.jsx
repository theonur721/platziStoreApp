import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {useRoute, useNavigation} from '@react-navigation/native';
import {COLORS} from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import FreeShipping from '../../components/badges/FreeShipping';
import Delivery from '../../components/badges/Delivery';
import Discount from '../../components/badges/Discount';
import AddToCart from '../../components/AddToCart';
import {ROUTES} from '../../navigation/routes';
import normalize from '../../constants/normalize';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../../store/slice/favoriteSlice'; // Burada toggleFavorite action'ını import etmelisin.

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {product} = route.params;

  const favorites = useSelector(state => state.favorites);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  // Favori durumu başlangıçta ürünün favorilerde olup olmadığına göre belirleniyor.
  useEffect(() => {
    setIsFavorite(favorites.some(item => item.id === product?.id));
  }, [favorites, product?.id]);

  const handleFavorite = () => {
    dispatch(toggleFavorite(product)); // Favoriye ekle/çıkar
    setIsFavorite(prevState => !prevState); // Favori durumunu değiştir
    // Burada herhangi bir yönlendirme yapılmıyor, sadece favori işlemi yapılır.
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <ScrollView style={defaultScreenStyle.container}>
        <View style={styles.iconContainer}>
          <Icon
            name="arrow-back"
            size={30}
            color={COLORS.secondary}
            onPress={() => navigation.goBack()}
            style={{marginBottom: 20}}
          />
          <Icon
            name="cart"
            color={COLORS.secondary}
            size={30}
            onPress={() => navigation.navigate(ROUTES.CART)}
          />
        </View>

        <View style={{position: 'relative'}}>
          <Image
            source={{uri: product?.images[0]}}
            style={styles.image}
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={handleFavorite} // Favori işlemine tıklandığında handleFavorite çalışacak
            style={styles.favoriteIconContainer}>
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? COLORS.red : COLORS.gray} // Favori durumu kırmızı ya da gri olacak
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{product?.title}</Text>
        <Text style={styles.category}>Category: {product?.category?.name}</Text>
        <Text style={styles.price}>{product?.price} $</Text>

        <View style={styles.badges}>
          <FreeShipping />
          <Delivery />
          <Discount />
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product?.description}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <AddToCart title={'Add to Cart'} />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: normalize(250),
    borderRadius: normalize(10),
    marginBottom: normalize(15),
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(10),
    backgroundColor: '#fff',
    padding: normalize(8),
    borderRadius: normalize(20),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  title: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: normalize(5),
  },
  price: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: normalize(10),
  },
  category: {
    fontSize: normalize(16),
    color: COLORS.tertiary,
    marginBottom: normalize(15),
    backgroundColor: COLORS.secondary,
    padding: normalize(2),
  },
  badges: {
    flexDirection: 'row',
    gap: normalize(10),
    marginBottom: normalize(20),
  },
  descriptionTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    marginBottom: normalize(5),
    color: COLORS.secondary,
  },
  description: {
    fontSize: normalize(16),
    lineHeight: normalize(22),
    color: '#333',
  },
  buttonContainer: {
    position: 'absolute',
    left: normalize(20),
    right: normalize(20),
    bottom: normalize(80),
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
