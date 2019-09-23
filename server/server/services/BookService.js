// helps interface with the model
import database from '../src/models';

class BookService {
  static async getAllBooks() {
    try {
      return await database.Book.findAll();
    } catch (error) {
      throw error;
    }
  }
}

export default BookService;
