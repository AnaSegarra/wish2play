// checks if an id is included in a list
export const isIncluded = (id, list) => list.includes(id);

// map wishlist
export const arrMapped = list => (list.length > 0 ? list.map(({ game }) => game._id) : []);

// sort by game name
export const sortByName = list => list.sort((a, b) => a.game.name.localeCompare(b.game.name));

// sort by status
export const sortByStatus = list => list.sort((a, b) => a.status.localeCompare(b.status));

// shorten game names
export const shortenStr = (str, num) => (str.length <= num ? str : `${str.slice(0, num)}...`);

// retrieve cover img
export const findCover = (arr, width) => arr.find(img => img.width === width);

// filter track information
export const filterTracks = arr => {
  return arr
    .filter(track => track.preview_url)
    .map((track, i) => {
      return {
        artist: track.artists.length > 1 ? 'Various artists' : track.artists[0].name,
        songName: track.name,
        audio: track.preview_url,
        trackNum: i
      };
    });
};
