import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Anuoluwapo',
      email: 'oluronbianu@gmail.com',
      password: bcrypt.hashSync('jextoban'),
      isAdmin: true,
    },
    {
      name: 'Hannah',
      email: 'omomurewale@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'The Murna Piece',
      slug: 'the-Murna-piece',
      category: 'Dress',
      image: '/images/Pictures/Facetune_18-06-2023-15-27-28.jpg',
      price: 35000,
      brand: 'Koree Kulture',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description:
        'A beautiful dress with varieties of colour from the Joy Kulture Collection.',
      subImage: [
        '/images/Pictures/IMG_3345.jpg',
        '/images/Pictures/IMG_3362.jpg',
      ],
    },
    {
      name: 'The Chara Piece',
      slug: 'the-chara-piece',
      category: 'Dress',
      image: '/images/Pictures/Facetune_07-06-2023-07-57-11.jpg',
      price: 30000,
      brand: 'Koree Kulture',
      rating: 3.2,
      numReviews: 10,
      countInStock: 0,
      description:
        'A beautiful dress with varieties of colour from the Joy Kulture Collection.',
      subImage: [
        '/images/Pictures/Facetune_18-06-2023-14-26-09.jpg',
        '/images/Pictures/Facetune_18-06-2023-14-35-21.jpg',
        '/images/Pictures/Facetune_18-06-2023-15-01-41.jpg',
        '/images/Pictures/Facetune_18-06-2023-14-52-04.jpg',
      ],
    },
    {
      name: 'The Marah Block Piece',
      slug: 'the-marah-block-piece',
      category: 'Dress',
      image: '/images/Pictures/Facetune_07-06-2023-22-49-39.jpg',
      price: 38000,
      brand: 'Koree Kulture',
      rating: 4.5,
      numReviews: 8,
      countInStock: 3,
      description:
        'A beautiful dress with varieties of colour from the Joy Kulture Collection.',
      subImage: [
        '/images/Pictures/Facetune_07-06-2023-22-46-41.jpg',
        '/images/Pictures/Facetune_07-06-2023-22-54-21.jpg',
        '/images/Pictures/KK_4.jpg',
        '/images/Pictures/KK_3.jpg',
      ],
    },
  ],
};

export default data;
