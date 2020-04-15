// checks if an id is included in a list
export const isIncluded = (id, list) => list.includes(id);

// map wishlist
export const arrMapped = list => (list.length > 0 ? list.map(({ game }) => game._id) : []);
