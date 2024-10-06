let books = [
  {
      ISBN: "12345Book",
      title: "The God of Small Things",
      pubDate: "1997-03-10",
      language: ["en", "hindi"],
      numPage: 250,
      authors: [1],
      publications: [2],
      category: ["fiction", "literature", "drama"],
  },
  {
      ISBN: "54321Book",
      title: "Train to Pakistan",
      pubDate: "1956-01-01",
      language: ["en", "hindi"],
      numPage: 180,
      authors: [2],
      publications: [1],
      category: ["fiction", "history", "drama"],
  },
  {
      ISBN: "67890Book",
      title: "The White Tiger",
      pubDate: "2008-10-15",
      language: ["en", "hindi"],
      numPage: 300,
      authors: [1],
      publications: [2],
      category: ["fiction", "thriller", "social"],
  },
  {
      ISBN: "98765Book",
      title: "A Train to Pakistan",
      pubDate: "1956-01-01",
      language: ["en", "hindi"],
      numPage: 150,
      authors: [2],
      publications: [1],
      category: ["fiction", "historical", "drama"],
  }
];

const authors = [
  { 
      id: 1,
      name: "Arundhati Roy",
      books: ["12345Book", "67890Book"],
  },
  { 
      id: 2, 
      name: "Khushwant Singh", 
      books: ["54321Book", "98765Book"] 
  },
];

const publications = [
  {
      id: 2,
      name: "Penguin Random House",
      books: ["12345Book", "67890Book"],
  },
  {
      id: 1,
      name: "Rupa Publications",
      books: ["54321Book", "98765Book"],
  },
];

module.exports = { books, authors, publications };
