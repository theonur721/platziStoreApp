import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {COLORS} from '../../theme/colors';
import {getRandomImageIndex} from '../../utils/getRandomImageIndex';
import {ROUTES} from '../../navigation/routes';
import normalize from '../../constants/normalize';

const AllProductsScreen = () => {
  const navigation = useNavigation();
  const {products} = useSelector(state => state.products);

  // Arama için kullanılan state
  const [searchTerm, setSearchTerm] = useState('');

  // Arama fonksiyonu
  const handleSearch = text => {
    setSearchTerm(text);
  };

  // Arama sonucunu filtrele
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={{paddingHorizontal: 10}}>
        <Icon
          name={'arrow-back'}
          color={COLORS.secondary}
          size={normalize(30)}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={defaultScreenStyle.container}>
        <View style={styles.allcontainer}>
          <Text style={styles.header}>All Products</Text>
          <Text style={styles.found}>{filteredProducts.length} found...</Text>
        </View>

        {/* Arama inputu */}
        <TextInput
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Search Products"
          style={styles.searchInput}
        />

        <FlatList
          data={filteredProducts}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 100}}
          renderItem={({item}) => (
            <View style={styles.productCard}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.PRODUCTDETAIL, {
                    product: item,
                  })
                }>
                <Image
                  source={{uri: item?.images[getRandomImageIndex()]}}
                  style={styles.productImage}
                />
              </TouchableOpacity>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>{item.price} $</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllProductsScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: normalize(22),
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  allcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: normalize(20),
  },
  found: {
    fontSize: normalize(16),
  },
  searchInput: {
    height: normalize(40),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: normalize(10),
    marginBottom: normalize(20),
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: normalize(10),
    marginBottom: normalize(15),
    elevation: 3,
  },
  productImage: {
    height: normalize(120),
    borderRadius: 10,
    marginBottom: normalize(10),
  },
  title: {
    fontWeight: 'bold',
    fontSize: normalize(14),
    marginBottom: normalize(5),
  },
  price: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
});
