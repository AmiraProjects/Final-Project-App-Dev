import Realm from 'realm';

class BookSchema extends Realm.Object {
  static schema = {
    primaryKey: 'id',
    name: 'Book',
    properties: {
      title: 'string',
      id: 'string',
      author: 'string',
      category: 'string',
      page: 'string',
      rating: 'string',
      bookImage: 'string',
      isBookmark: {
        type: 'bool',
        default: false,
      },
    },
  };
}

const realm = new Realm({
  schema: [BookSchema],
  schemaVersion: 3,
  migration: (oldRealm, newRealm) => {
    if (oldRealm.schemaVersion < 3) {
      const newBooks = newRealm.objects('Book');
      for (let i = 0; i < newBooks.length; i++) {
        newBooks[i].isBookmark = false;
      }
    }
  },
});

export default realm;
