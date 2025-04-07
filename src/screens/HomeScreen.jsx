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
import service from '../service/service';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts, setLoading, setError} from '../store/slice/productsSlice';
import {getRandomImageIndex} from '../utils/getRandomImageIndex';
import {COLORS} from '../theme/colors';
import Delivery from '../components/badges/Delivery';
import FreeShipping from '../components/badges/FreeShipping';
import Discount from '../components/badges/Discount';
import {fetchCategories} from '../store/slice/categoriesSlice';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {products, pending, error} = useSelector(state => state.products);
  const {
    categories,
    pending: categoriesLoading,
    error: categoriesError,
  } = useSelector(state => state.categories);
  console.log('Fetched products:', categories);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading());
      try {
        const products = await service.getAllProducts();
        console.log('Fetched products:', products);
        dispatch(setProducts(products));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };

    fetchProducts();
    dispatch(fetchCategories());
  }, []);

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View>
        <View style={defaultScreenStyle.container}>
          <Text style={styles.visitHeader}>Categories</Text>
          <FlatList
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
                    {/* Ürün başlığını 2 satır ile sınırlıyoruz */}
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
    marginTop: 15,
    color: COLORS.secondary,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    height: 200,
    width: '100%',
  },
  productContainer: {
    backgroundColor: '#fff',
    marginRight: 15,
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: 160, // Ürün kartlarının genişliğini sabit tutuyoruz
    height: 360, // Kartın yüksekliğini artırdık
  },
  productImageContainer: {
    height: 150,
    width: 150,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center', // Görseli ortaladık
  },
  productImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1, // İçeriği dikeyde esnetiyoruz
    justifyContent: 'space-between', // Başlık, kategori ve fiyatı arasında dengeyi sağlamak için
    paddingVertical: 5, // Üstten ve alttan boşluk bırakıyoruz
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
    width: '100%', // Başlık için genişliği tam olarak ayarladık
  },
  productCategory: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.tertiary,
    backgroundColor: COLORS.secondary,
    marginBottom: 10, // Kategori ile fiyat arasında boşluk bırakıyoruz
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.red,
    textAlign: 'center',
  },
  free: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  categoriesView: {
    marginTop: 10,
    marginBottom: 30,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  categoriesText: {
    fontSize: 18,
  },
});
