import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {COLORS} from '../../theme/colors';
import {getRandomImageIndex} from '../../utils/getRandomImageIndex';
import {ROUTES} from '../../navigation/routes';

const AllProductsScreen = () => {
  const navigation = useNavigation();
  const {products} = useSelector(state => state.products);

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={{paddingHorizontal: 10}}>
        <Icon
          name={'arrow-back'}
          color={COLORS.secondary}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={defaultScreenStyle.container}>
        <View style={styles.allcontainer}>
          <Text style={styles.header}>All Products</Text>
          <Text style={styles.found}>{products.length} found...</Text>
        </View>

        <FlatList
          data={products}
          numColumns={2}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  allcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  found: {
    fontSize: 16,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
  },
  productImage: {
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
});
