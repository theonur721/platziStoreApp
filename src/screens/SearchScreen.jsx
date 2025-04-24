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
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../navigation/routes';
import normalize from '../constants/normalize';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {categories, pending: catLoading} = useSelector(
    state => state.categories,
  );
  const {products, pending: prodLoading} = useSelector(
    state => state.categoryProducts,
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(fetchProductsByCategory(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  const handleProductClick = product => {
    navigation.navigate(ROUTES.PRODUCTDETAIL, {product});
  };

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        <Text style={styles.title}>Categories</Text>

        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              gap: normalize(10),
              paddingVertical: normalize(10),
            }}
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

        <View style={styles.productSection}>
          {prodLoading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <>
              {products && products.length === 0 ? (
                <Text style={styles.noProducts}>
                  Sorry, we have no products left in this category.
                </Text>
              ) : (
                <FlatList
                  data={products}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={{
                    gap: normalize(10),
                    paddingBottom: normalize(100),
                  }}
                  renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleProductClick(item)}>
                      <View style={styles.productItem}>
                        <View style={styles.productRow}>
                          {item.images && item.images[0] && (
                            <Image
                              style={styles.image}
                              source={{uri: item.images[0]}}
                              resizeMode="contain"
                            />
                          )}
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
            </>
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
    marginBottom: normalize(10),
  },
  categoriesContainer: {
    paddingVertical: normalize(10),
    marginBottom: normalize(10),
  },
  categoryButton: {
    paddingHorizontal: normalize(16),
    paddingVertical: normalize(8),
    backgroundColor: '#eee',
    borderRadius: normalize(20),
  },
  activeCategory: {
    backgroundColor: '#222',
  },
  categoryText: {
    fontSize: normalize(16),
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  productSection: {
    marginTop: normalize(20),
  },
  productItem: {
    padding: normalize(10),
    borderWidth: normalize(1),
    borderColor: '#ccc',
    borderRadius: normalize(10),
    backgroundColor: '#f8f8f8',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(10),
    marginRight: normalize(15),
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: normalize(16),
  },
  productPrice: {
    fontSize: normalize(14),
    color: COLORS.red,
  },
  noProducts: {
    fontSize: normalize(18),
    color: COLORS.tertiary,
    textAlign: 'center',
    marginTop: normalize(20),
  },
});
