import { xPrisma } from '../../commons/database';
import { ListBooksPayload } from './types';

export default class BooksService {
  private booksRepository = xPrisma.book;

  listBooks = async (payload: ListBooksPayload) => {
    const {
      bookId,
      page,
      limit,
      price_max = 500,
      price_min = 0,
      tag = '',
      search = '',
    } = payload;
    const whereQuery: any = {};

    if (bookId) whereQuery['id'] = bookId;
    if (price_min || price_max) {
      whereQuery['price'] = {
        gte: price_min,
        lte: price_max,
      };
    }
    if (tag) {
      whereQuery['tag'] = {
        hasEvery: JSON.parse(tag),
      };
    }
    if (search) {
      whereQuery['OR'] = [
        { writer: { contains: search } },
        { title: { contains: search } },
      ];
    }

    try {
      const totalBooks = await this.booksRepository.count({
        where: whereQuery,
      });
      let pages = Math.ceil(totalBooks / limit);
      const offset = limit * (page - 1) || 0;

      const books = await this.booksRepository.findMany({
        where: whereQuery,
        skip: offset,
        take: limit,
      });

      return { pages, total: totalBooks, page, limit, books };
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  };
}
