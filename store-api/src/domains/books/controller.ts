import { IBookController } from './interface';
import BooksService from './service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { defaultCatchBlock } from '../../commons/constants';
import { ListBooksPayload } from './types';

export default class BooksController implements IBookController {
  private booksService;

  constructor({ booksService }: { booksService: BooksService }) {
    this.booksService = booksService;
  }

  listBooks = async (req: Request, res: Response) => {
    const {
      bookId = '',
      page = 1,
      limit = 50,
      tag = '',
      price_max = 500,
      price_min = 0,
      search = '',
    } = req.query as unknown as ListBooksPayload;

    try {
      const response = await this.booksService.listBooks({
        bookId,
        page: Number(page),
        limit: Number(limit),
        tag,
        price_max: Number(price_max),
        price_min: Number(price_min),
        search,
      });

      return res.status(StatusCodes.OK).json({
        status: true,
        message: 'Books fetched successfully',
        data: response,
      });
    } catch (error: any) {
      console.error(error);
      return defaultCatchBlock(res, error?.message);
    }
  };
}
