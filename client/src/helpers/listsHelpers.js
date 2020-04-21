// checks if an id is included in a list
export const isIncluded = (id, list) => list.includes(id);

// map wishlist
export const arrMapped = list => (list.length > 0 ? list.map(({ game }) => game._id) : []);

// sort by game name
export const sortByName = list => list.sort((a, b) => a.game.name.localeCompare(b.game.name));

// sort by status
export const sortByStatus = list => list.sort((a, b) => a.status.localeCompare(b.status));
