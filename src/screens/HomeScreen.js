import { StyleSheet, Text, View, FlatList} from 'react-native'
import React from 'react'
import { bookCategory } from '../../Data/BookCategory'

const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.subtitleBox}>
        <Text style={styles.subtitle}>
            Pick A Card!
        </Text>
      </View>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>
            Each Card Contains Different Genre
        </Text>
      </View>

      <FlatList 
        data={bookCategory}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
            return (
                <View style={styles.cardContainer}>
                    <Text style={styles.card}>{item.category}</Text>
                </View>
            )
        }}
        numColumns={2}
        key={2}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'lightblue'
    },
    subtitleBox: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 30,
    },
    descriptionBox: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    description: {
        fontSize: 20,
    },
    flatlistContainer:{
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    cardContainer : {
        backgroundColor: 'red',
        margin: 15,
        width: 170,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'

    },
    card: {
        color: 'white',
        fontSize: 30,
        padding: 10,
        textAlign: 'center'
    }
})