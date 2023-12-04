import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

const famousWriters = [
  'William Shakespeare',
  'Jane Austen',
  'Charles Dickens',
  'Fyodor Dostoevsky',
  'Leo Tolstoy',
  'Mark Twain',
  'George Orwell',
  'Emily Dickinson',
  'Virginia Woolf',
  'Ernest Hemingway',
  'Franz Kafka',
  'J.K. Rowling',
  'Harper Lee',
  'Gabriel Garcia Marquez',
  'Toni Morrison',
  'Homer',
  'J.R.R. Tolkien',
  'Stephen King',
  'Agatha Christie',
  'Oscar Wilde',
  'John Steinbeck',
  'Mary Shelley',
  'George R.R. Martin',
  'Hermann Hesse',
  'Edgar Allan Poe',
  'Rabindranath Tagore',
  'Chinua Achebe',
  'Gustave Flaubert',
  'Margaret Atwood',
  'Yukio Mishima',
];
const priceOptions = [10, 15, 20, 25, 30, 35, 40, 45, 50];
const availableTags: string[] = ['fiction', 'non-fiction', 'science', 'essay'];

const getRandomWriter = () => {
  return famousWriters[Math.floor(Math.random() * famousWriters.length)];
};

const getRandomPrice = () => {
  return priceOptions[Math.floor(Math.random() * priceOptions.length)];
};

function getRandomTags() {
  const numTags = Math.floor(Math.random() * availableTags.length) + 1;
  const tags: string[] = [];
  for (let i = 0; i < numTags; i++) {
    const tag = availableTags[Math.floor(Math.random() * availableTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  return tags;
}

async function main() {
  const books: any = [];

  // seed 500 dummy books
  for (let i = 0; i < 500; i++) {
    const writer = getRandomWriter();
    const title = `${writer}'s Book ${i}`;
    const image =
      'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg';
    const price = getRandomPrice();
    const tag = getRandomTags();

    books.push({
      title,
      writer,
      image,
      price,
      tag,
      createdAt: dayjs().unix(),
      updatedAt: dayjs().unix(),
    });
  }

  await prisma.book.createMany({
    data: books,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
