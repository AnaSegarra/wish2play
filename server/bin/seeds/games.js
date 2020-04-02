const games = [
  {
    _id: '5e80a79e7ebc4201f8e44251',
    name: 'The Last Of Us',
    description:
      'Abandoned cities reclaimed by nature. A population decimated by a modern plague. Survivors are killing each other for food, weapons whatever they can get their hands on. Joel, a brutal survivor, and Ellie, a brave young teenage girl who is wise beyond her years, must work together if they hope to survive their journey across the US.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585494841/wish2play/games/tlou_lsjgdm.jpg',
    releaseYear: 2014,
    platforms: ['ps3', 'ps4'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP9000-CUSA00556_00-THELASTOFUS00000?emcid=pa-st-233073'
    ],
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Naughty Dog',
    reviews: ['5e827610e7ea2a2173759b02'],
    totalRating: 3.5
  },
  {
    _id: '5e80c0ab8f6fde067adeeef4',
    name: 'The Last Of Us: Left Behind',
    description:
      'New light is shed on Ellie’s relationship with Riley, her best friend and sometime-mentor from a military boarding school they grew up in together. After disappearing for weeks, Riley returns with a surprising revelation on her whereabouts. Ellie and Riley sneak out of school for the last time, leading to a series of events that will forever change both of their lives.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585496051/wish2play/games/tlouLB_tp1ihe.jpg',
    releaseYear: 2015,
    platforms: ['ps3', 'ps4'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP9000-CUSA00558_00-THELASTOFUS00000?emcid=pa-st-233073'
    ],
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Naughty Dog',
    reviews: ['5e85db9bb5d9adda931af826'],
    totalRating: 3
  },
  {
    _id: '5e80c4800b959407b76c47f1',
    name: "Uncharted: Drake's Fortune",
    description:
      'A 400-year-old clue in the coffin of Sir Francis Drake sets a modern-day fortune hunter on a exploration for the fabled treasure of El Dorado, leading to the discovery of a forgotten island in the middle of the Pacific Ocean. The search turns deadly when Nathan Drake becomes stranded on the island and hunted by mercenaries. Outnumbered and outgunned, Drake and his companions must fight to survive as they begin to unravel the terrible secrets hidden on the Island.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585497133/wish2play/games/uncharted1_yqwohp.jpg',
    releaseYear: 2007,
    platforms: ['ps3', 'ps4'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP9000-CUSA02826_00-UNCHARTEDTRILOGY?emcid=pa-st-233073'
    ],
    genres: ['Action', 'Adventure'],
    ESRB: 'T',
    company: 'Naughty Dog',
    reviews: []
  },
  {
    _id: '5e847df652a3737b30a13c63',
    name: 'Uncharted 2: Among Thieves',
    description:
      'In this sequel, Drake is drawn back into the treacherous world of thieves and treasure-seekers. A mystery artifact propels him to undertake an expedition to the legendary Himalayan valley of Shambhala where he finds himself embroiled in a dangerous game of cat-and-mouse against a fugitive war criminal. Pushed to his limits, Drake is forced to risk everything.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585740926/wish2play/games/uncharted2_pkpcqu.jpg',
    releaseYear: 2009,
    platforms: ['ps3', 'ps4'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP9000-CUSA02826_00-UNCHARTEDTRILOGY?emcid=pa-st-233073'
    ],
    genres: ['Action', 'Adventure'],
    ESRB: 'T',
    company: 'Naughty Dog',
    reviews: []
  },
  {
    _id: '5e83dfa0caa7e861e2a43625',
    name: 'Watch Dogs 2',
    description:
      'Play as Marcus Holloway, a brilliant young hacker living in the birthplace of the tech revolution, the San Francisco Bay Area.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585700519/wish2play/games/watchdogs2_tuqmsv.jpg',
    releaseYear: 2016,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP0001-CUSA04294_00-WD2FULLGAME00000?emcid=pa-st-233073',
      'https://www.amazon.es/Watch-Dogs-2-Standard-Edition/dp/B00ZIW34T4/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=SO376WOU9452&dchild=1&keywords=watch%2Bdogs%2B2&qid=1585700659&sprefix=watc%2Caps%2C167&sr=8-2&th=1'
    ],
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Ubisoft',
    reviews: []
  },
  {
    _id: '5e83e190a88e5462a996bb42',
    name: 'Watch Dogs',
    description:
      'Become Aiden Pearce, a brilliant hacker whose criminal past lead to a violent family tragedy. While on the hunt for those responsible, you will be able to tap into the city’s omnipresent security cameras, download personal information, control systems such as traffic lights and the electrical grid to stop a chase, and more.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585701236/wish2play/games/watchdogs_netgin.jpg',
    releaseYear: 2014,
    platforms: ['ps3', 'ps4', 'Xbox', 'PC'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP0001-CUSA00016_00-B000000000000752?emcid=pa-st-233073',
      'https://www.amazon.es/dp/B00ZIW34T4/ref=twister_B00ZR563V8?_encoding=UTF8&psc=1'
    ],
    genres: ['Action', 'Adventure', 'Shooter'],
    ESRB: 'M',
    company: 'Ubisoft',
    reviews: []
  },
  {
    _id: '5e847df652a3737b30a13c66',
    name: 'Death Stranding',
    description:
      'Sam Bridges must brave a world utterly transformed by the Death Stranding. Carrying the disconnected remnants of our future in his hands, he embarks on a journey to reconnect the shattered world one step at a time. What is the mystery of the Death Stranding? What will Sam discover on the road ahead? An unprecedented gameplay experience holds these answers and more.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585741274/wish2play/games/death-stranding_c1ki2a.jpg',
    releaseYear: 2019,
    platforms: ['ps4', 'PC'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP9000-CUSA12606_00-DEATHSTRAND00001?emcid=pa-st-233073'
    ],
    genres: ['Action'],
    ESRB: 'M',
    company: 'Kojima Productions',
    reviews: []
  },
  {
    _id: '5e8488f8085ae07e7ce425e3',
    name: 'Until Dawn',
    description:
      'Eight friends are trapped together on a remote mountain retreat, and they aren’t alone. Gripped by dread, with tensions running high, they must fight through their fear if they all hope to make it through the night in one piece. Play as each of the eight characters and experience fear like you never have before. Every decision you make in your terrifying search for answers could mean the difference between life and death, but for whom? Your actions alone will decide who survives Until Dawn.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585744102/wish2play/games/until-dawn_ezb7jv.jpg',
    releaseYear: 2015,
    platforms: ['ps4'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP9000-CUSA02636_00-UNTILDAWN0000001?emcid=pa-st-233073'
    ],
    genres: ['Adventure'],
    ESRB: 'M',
    company: 'Supermassive Games',
    reviews: []
  },
  {
    _id: '5e8488f8085ae07e7ce425e4',
    name: 'Fallout 4',
    description:
      'As the sole survivor of Vault 111, you enter a world destroyed by nuclear war. Only you can rebuild and determine the fate of the Wasteland. Welcome home.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585743708/wish2play/games/fo4_xn2hgi.jpg',
    releaseYear: 2015,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP1003-CUSA02962_00-FALLOUT4FULLGAME?emcid=pa-st-233073',
      'https://www.amazon.es/Koch-Media-Fallout-4/dp/B00YSM7Q58/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3NB4M1D3IKE6L&dchild=1&keywords=fallout%2B4&qid=1585743546&s=videogames&sprefix=fallout%2B4%2Cvideogames%2C160&sr=1-1&th=1'
    ],
    genres: ['RPG'],
    ESRB: 'M',
    company: 'Bethesda Game Studios',
    reviews: []
  },
  {
    _id: '5e8484d4e32c067caec49d8b',
    name: 'Fallout 76',
    description:
      'Reclamation Day, 2102. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers—chosen from the nation’s best and brightest – emerge into post-nuclear America. Play solo or join together as you explore, quest, build, scavenge and triumph against the wasteland’s greatest threats.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585742770/wish2play/games/fo76_x2io6c.jpg',
    releaseYear: 2018,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP1003-CUSA12054_00-PRJMTN0000000000?emcid=pa-st-233073',
      'https://www.amazon.es/dp/B07DG3J77J/ref=twister_B07PF1HM9Y?_encoding=UTF8&psc=1'
    ],
    genres: ['RPG'],
    ESRB: 'M',
    company: 'Bethesda Game Studios',
    reviews: []
  },
  {
    _id: '5e848b777b96277f9a8cc798',
    name: 'The Dark Pictures Anthology: Man Of Medan',
    description:
      'In Man of Medan, five friends set sail on a holiday diving trip that soon changes into something much more sinister... Embark on a horrific journey aboard a ghost ship. All playable characters can live or die. The choices you make will decide their fate. Who will you save?',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1585744736/wish2play/games/man-of-medan_sjbbdj.jpg',
    releaseYear: 2019,
    platforms: ['ps4', 'Xbox'],
    linkToBuy: [
      'https://store.playstation.com/es-es/product/EP0700-CUSA14102_00-SMGDARKPICTURESA?emcid=pa-st-233073',
      'https://www.amazon.es/Dark-Pictures-Man-Medan/dp/B07K3FNMBT/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=man%2Bof%2Bmedan&qid=1585744521&s=videogames&sr=1-1&th=1'
    ],
    genres: ['Horror'],
    ESRB: 'M',
    company: 'Supermassive Games',
    reviews: []
  }
];

module.exports = games;
