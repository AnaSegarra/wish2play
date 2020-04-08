const faker = require('faker');

const reviews = [];

for (let i = 0; i < 20; i++) {
  let rating = Math.round(Math.random() * 5);
  let numParagraphs = Math.round(Math.random() * 8 + 1);
  const content = faker.lorem.paragraph(numParagraphs);

  reviews.push({ content, rating });
}

module.exports = reviews;
