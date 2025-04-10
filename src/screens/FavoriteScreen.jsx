import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {defaultScreenStyle} from '../styles/defaultScreenStyle';
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from '../store/slice/favoriteSlice';
import {COLORS} from '../theme/colors';
import normalize from '../constants/normalize';
import Icon from 'react-native-vector-icons/Ionicons';

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  const handleRemoveFavorite = product => {
    dispatch(toggleFavorite(product)); // Favoriyi çıkar
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={{uri: item.images[0]}}
        style={styles.itemImage}
        resizeMode="cover"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price} $</Text>
        <TouchableOpacity
          onPress={() => handleRemoveFavorite(item)}
          style={styles.removeButton}>
          <Icon name="trash-outline" size={24} color={COLORS.red} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={defaultScreenStyle.safeAreaContainer}>
      <View style={defaultScreenStyle.container}>
        <Text style={styles.header}>Favorites Products</Text>
        {favorites.length === 0 ? (
          <Text style={styles.noFavorites}>
            No favorite products added yet.
          </Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: normalize(24),
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: normalize(20),
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: normalize(15),
    padding: normalize(10),
    backgroundColor: COLORS.white,
    borderRadius: normalize(10),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  itemImage: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: normalize(10),
    marginRight: normalize(10),
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: normalize(18),
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  itemPrice: {
    fontSize: normalize(16),
    color: COLORS.red,
    marginTop: normalize(5),
  },
  removeButton: {
    marginTop: normalize(10),
  },
  noFavorites: {
    fontSize: normalize(18),
    color: COLORS.gray,
    textAlign: 'center',
  },
});
