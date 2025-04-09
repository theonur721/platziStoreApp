import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {useDispatch, useSelector} from 'react-redux';
import {getRandomImageIndex} from '../utils/getRandomImageIndex';
import {COLORS} from '../theme/colors';
import Delivery from '../components/badges/Delivery';
import FreeShipping from '../components/badges/FreeShipping';
import Discount from '../components/badges/Discount';
import {fetchCategories} from '../store/slice/categoriesSlice';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import normalize from '../constants/normalize'; // ✅ normalize importu

import {fetchProducts} from '../store/slice/productsSlice';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {products, pending, error} = useSelector(state => state.products);
  const {
    categories,
    pending: categoriesLoading,
    error: categoriesError,
  } = useSelector(state => state.categories);
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View>
        <View style={defaultScreenStyle.container}>
          <Text style={styles.visitHeader}>Categories</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={categories}
            renderItem={({item}) => (
              <TouchableOpacity>
                <View style={styles.categoriesView}>
                  <Text style={styles.categoriesText}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity>
          <Image
            source={require('../assets/picture-2.jpg')}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={defaultScreenStyle.container}>
          <Text style={styles.visitHeader}>All Products</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            keyExtractor={item => item.id.toString()}
            data={products.slice(0, 10)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.PRODUCTS)}>
                <View style={styles.productContainer}>
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{uri: item?.images[getRandomImageIndex()]}}
                      style={styles.productImage}
                    />
                  </View>
                  <View style={styles.productDetails}>
                    <Text numberOfLines={2} style={styles.productTitle}>
                      {item?.title}
                    </Text>
                    <Text style={styles.productCategory}>
                      {item?.category?.name}
                    </Text>
                    <Text style={styles.productPrice}>
                      {item?.price} {''} $
                    </Text>
                    <View style={styles.free}>
                      <FreeShipping />
                      <Delivery />
                      <Discount />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  visitHeader: {
    marginTop: normalize(15),
    color: COLORS.secondary,
    fontSize: normalize(22),
    fontWeight: 'bold',
    marginBottom: normalize(5),
  },
  image: {
    height: normalize(200),
    width: '100%',
  },
  productContainer: {
    backgroundColor: '#fff',
    marginRight: normalize(15),
    borderRadius: normalize(10),
    elevation: 5,
    padding: normalize(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: normalize(4)},
    shadowOpacity: 0.1,
    shadowRadius: normalize(10),
    width: normalize(160),
    height: normalize(360),
  },
  productImageContainer: {
    height: normalize(150),
    width: normalize(150),
    overflow: 'hidden',
    borderRadius: normalize(10),
    marginBottom: normalize(10),
    alignSelf: 'center',
  },
  productImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: normalize(5),
  },
  productTitle: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    marginBottom: normalize(5),
    textAlign: 'center',
    color: '#333',
    width: '100%',
  },
  productCategory: {
    fontSize: normalize(14),
    fontWeight: '800',
    color: COLORS.tertiary,
    backgroundColor: COLORS.secondary,
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  productPrice: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: COLORS.red,
    textAlign: 'center',
  },
  free: {
    flexDirection: 'row',
    width: '100%',
    gap: normalize(10),
  },
  categoriesView: {
    marginTop: normalize(10),
    marginBottom: normalize(20),
    margin: normalize(10),
    borderWidth: 1,
    padding: normalize(10),
    borderRadius: normalize(20),
  },
  categoriesText: {
    fontSize: normalize(18),
  },
});
