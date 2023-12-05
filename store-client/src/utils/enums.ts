export const tags = [
  {
    name: "Fiction",
    value: "fiction",
  },
  {
    name: "Non-fiction",
    value: "non-fiction",
  },
  {
    name: "Science",
    value: "science",
  },
  {
    name: "Essay",
    value: "essay",
  },
];

export interface BooksPropsArray  {
  createdAt: number;
  id: string;
  image: string;
  price: number;
  tag: any[];
  title: string;
  updatedAt: number;
  writer: string;
};
