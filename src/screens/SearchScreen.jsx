import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../store/slice/categoriesSlice';
import {fetchProductsByCategory} from '../store/slice/categoryProductsSlice';
import {COLORS} from '../theme/colors';
import {useNavigation} from '@react-navigation/native'; // useNavigation import ediliyor
import {ROUTES} from '../navigation/routes';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // useNavigation hook'u ile navigation nesnesini alıyoruz
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Kategorileri ve ürünleri state'lerden alıyoruz
  const {categories, pending: catLoading} = useSelector(
    state => state.categories,
  );
  const {products, pending: prodLoading} = useSelector(
    state => state.categoryProducts,
  );

  // Kategorileri yalnızca bir kez alalım
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Kategori seçildiğinde ürünleri getir
  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(fetchProductsByCategory(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  // Kategori seçildikçe verileri console'a yazdır
  useEffect(() => {
    console.log('Seçili Kategori:', selectedCategoryId);
    console.log('Gelen Ürünler:', products);
  }, [products, selectedCategoryId]);

  // Ürüne tıklandığında ProductDetail ekranına gitme fonksiyonu
  const handleProductClick = product => {
    navigation.navigate(ROUTES.PRODUCTDETAIL, {product}); // ProductDetail ekranına navigasyon
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        <Text style={styles.title}>Categories</Text>

        {/* Kategoriler kısmı sabit kalacak şekilde düzenlendi */}
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{gap: 10, paddingVertical: 10}}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setSelectedCategoryId(item.id)}
                style={[
                  styles.categoryButton,
                  selectedCategoryId === item.id && styles.activeCategory,
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategoryId === item.id && styles.activeCategoryText,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Ürünler kısmı */}
        <View style={styles.productSection}>
          {prodLoading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <View>
              {/* Ürün yoksa mesaj */}
              {products && products.length === 0 ? (
                <Text style={styles.noProducts}>
                  Sorry, we have no products left in this category.
                </Text>
              ) : (
                <FlatList
                  data={products}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={{gap: 10, paddingBottom: 100}}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleProductClick(item)}>
                      <View style={styles.productItem}>
                        <View style={styles.productRow}>
                          {/* Resim kısmı */}
                          {item.images && item.images[0] && (
                            <Image
                              style={styles.image}
                              source={{uri: item.images[0]}}
                              resizeMode="contain" // Resmin boyutunu koruyarak ekrana sığdırır
                            />
                          )}
                          {/* Ürün ismi ve fiyatı */}
                          <View style={styles.productInfo}>
                            <Text style={styles.productTitle}>
                              {item.title}
                            </Text>
                            <Text style={styles.productPrice}>
                              {item.price} $
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    paddingVertical: 10, // Kategoriler kısmı sabit
    marginBottom: 10, // Kategoriler kısmı ile ürünler arasında boşluk
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: '#222',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  productSection: {
    marginTop: 20,
  },
  productItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
  },
  productRow: {
    flexDirection: 'row', // Resim ve bilgilerin yan yana olmasını sağlıyor
    alignItems: 'center', // Ortalamayı sağlıyoruz
  },
  image: {
    width: 100, // Resmin genişliğini ayarlayın
    height: 100, // Resmin yüksekliğini ayarlayın
    borderRadius: 10, // Resme köşe yuvarlama ekleyebilirsiniz
    marginRight: 15, // Resim ile metin arasına boşluk bırakıyoruz
  },
  productInfo: {
    flex: 1, // Metin kısmının geri kalan alanı almasını sağlıyoruz
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.red,
  },
  noProducts: {
    fontSize: 18,
    color: COLORS.tertiary,
    textAlign: 'center',
    marginTop: 20,
  },
});
