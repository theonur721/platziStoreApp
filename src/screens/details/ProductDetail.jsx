import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../../styles/defaultScreenStyle';
import {useRoute, useNavigation} from '@react-navigation/native';
import {COLORS} from '../../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import FreeShipping from '../../components/badges/FreeShipping';
import Delivery from '../../components/badges/Delivery';
import Discount from '../../components/badges/Discount';

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {product} = route.params;

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <ScrollView style={defaultScreenStyle.container}>
        <Icon
          name="arrow-back"
          size={30}
          color={COLORS.secondary}
          onPress={() => navigation.goBack()}
          style={{marginBottom: 20}}
        />

        <View style={{position: 'relative'}}>
          <Image
            source={{uri: product?.images[0]}}
            style={styles.image}
            resizeMode="cover"
          />

          <TouchableOpacity
            onPress={() => {
              console.log('Favorilere eklenecek');
            }}
            style={styles.favoriteIconContainer}>
            <Icon name="heart-outline" size={24} color={COLORS.red} />
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
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 5, // Android için gölge
    shadowColor: '#000', // iOS için gölge
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.red,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: COLORS.tertiary,
    marginBottom: 15,
    backgroundColor: COLORS.secondary,
    padding: 2,
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.secondary,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
});
