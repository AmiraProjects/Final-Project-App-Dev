import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import realm from '../database/realm';
import {useRoute, useNavigation} from '@react-navigation/native';
import {CheckBox} from 'react-native-elements';
import {Icon} from 'react-native-elements';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const [bookmark, setBookmark] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const loadingBookMark = () => {
    const bookSaved = realm.objects('Book').filtered('isBookmark == true');
    setBookmark(Array.from(bookSaved));
  };

  const setCheckBox = id => {
    const updatedBooks = bookmark.map(item =>
      item.id === id ? {...item, checkedStatus: !item.checkedStatus} : item,
    );

    setBookmark(updatedBooks);
  };

  const removeBook = () => {
    let removed = false;

    realm.write(() => {
      bookmark.forEach(item => {
        if (item.checkedStatus) {
          const book = realm.objectForPrimaryKey('Book', item.id);
          if (book) {
            book.isBookmark = false;
            removed = true;
          }
        }
      });
    });

    if (removed) {
      alert('Successfully removed the selected book(s) from your wishlist!');
    }

    loadingBookMark();
    setIsEdit(false);
  };

  useEffect(() => {
    const wishlistPage = navigation.addListener('focus', () => {
      loadingBookMark();
    });
    return wishlistPage;
  }, [navigation]);

  useEffect(() => {
    const updateBookMark = () => {
      loadingBookMark();
    };
    realm.addListener('change', updateBookMark);
    return () => realm.removeListener('change', updateBookMark);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Bookmark</Text>
      </View>

      {bookmark.length !== 0 && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setIsEdit(!isEdit);

            if (!isEdit) {
              setBookmark(prevBookmarks =>
                prevBookmarks.map(book => ({...book, checkedStatus: false})),
              );
            }
          }}>
          <Text style={{color: 'white'}}>{isEdit ? 'Cancel' : 'Edit'}</Text>
        </TouchableOpacity>
      )}

      {bookmark.length > 0 ? (
        <FlatList
          data={bookmark}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.bookContainer}>
                <View style={styles.bookImageContainer}>
                  <Image
                    style={styles.bookImage}
                    source={{
                      uri: item.bookImage,
                    }}
                  />
                </View>

                <View style={styles.bookInfoContainer}>
                  <Text style={styles.title}>Title: {item.title}</Text>
                  <Text style={styles.author}>Author: {item.author}</Text>
                  <Text style={styles.pages}>Page: {item.page}</Text>
                  <Text style={styles.rating}>Rating: {item.rating}</Text>
                  <TouchableOpacity
                    style={styles.seeDetailButton}
                    onPress={() =>
                      navigation.navigate('BookDetail', {
                        id: item.id,
                        title: item.title,
                        author: item.author,
                        rating: item.rating,
                        description: item.description,
                        page: item.page,
                        bookImage: item.bookImage,
                        category: item.category,
                        // isBookmark: item.isBookmark,
                      })
                    }>
                    <Text style={styles.seeDetail}>See Details</Text>
                  </TouchableOpacity>

                  {isEdit && (
                    <CheckBox
                      size={20}
                      containerStyle={styles.checkbox}
                      onPress={() => setCheckBox(item.id)}
                      checked={item.checkedStatus || false}
                    />
                  )}
                </View>
              </View>
            );
          }}
        />
      ) : (
        <Text>No bookmarks</Text>
      )}

      {isEdit && (
        <TouchableOpacity style={styles.deleteButton} onPress={removeBook}>
          <Icon name="delete" type="antdesign" size={20} color="white" />
          <View style={styles.containerDelete}>
            <Text style={styles.deleteText}> Delete </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  headerContainer: {
    backgroundColor: 'darkblue',
    padding: 15,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  flatListContainer: {
    padding: 8,
  },
  bookContainer: {
    borderColor: 'darkblue',
    borderWidth: 2,
    margin: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue',
  },
  bookImageContainer: {
    width: 100,
    height: 150,
  },
  bookInfoContainer: {
    // borderColor: 'black',
    // borderWidth: 2,
    backgroundColor: 'darkblue',
    padding: 8,
    width: '70%',
  },
  title: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  author: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  pages: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  rating: {
    color: 'white',
    fontFamily: 'SourGummy-Regular',
  },
  seeDetail: {
    color: 'white',
    textDecorationLine: 'underline',
    textAlign: 'right',
    position: 'relative',
    fontFamily: 'SourGummy-SemiBold',
  },
  bookImage: {
    borderWidth: 2,
    borderColor: 'darkblue',
    borderRadius: 5,
    marginBottom: 10,
    width: 100,
    height: 150,
  },
  checkbox: {
    paddingRight: 0,
    paddingLeft: 0,
    marginLeft: 5,
  },
  editButton: {
    position: 'absolute',
    padding: 20,
    right: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerDelete: {
    marginLeft: 8,
  },
  deleteText: {
    color: 'white',
  },
});
