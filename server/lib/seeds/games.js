const games = [
  {
    name: 'The Last Of Us',
    description:
      'Abandoned cities reclaimed by nature. A population decimated by a modern plague. Survivors are killing each other for food, weapons whatever they can get their hands on. Joel, a brutal survivor, and Ellie, a brave young teenage girl who is wise beyond her years, must work together if they hope to survive their journey across the US.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/tlou_rcpuvy.jpg',
    releaseYear: 2014,
    platforms: ['ps3', 'ps4'],
    linkToBuy:
      'https://www.amazon.es/The-Last-of-us-Hits/dp/B07FF8XJWT/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1UYWVAYTNRIKB&dchild=1&keywords=the+last+of+us&qid=1585927861&sprefix=the+last+%2Caps%2C173&sr=8-1',
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Naughty Dog'
  },
  {
    name: 'The Last Of Us: Left Behind',
    description:
      'New light is shed on Ellie’s relationship with Riley, her best friend and sometime-mentor from a military boarding school they grew up in together. After disappearing for weeks, Riley returns with a surprising revelation on her whereabouts. Ellie and Riley sneak out of school for the last time, leading to a series of events that will forever change both of their lives.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/tlouLB_zyle65.jpg',
    releaseYear: 2015,
    platforms: ['ps3', 'ps4'],
    linkToBuy:
      'https://store.playstation.com/es-es/product/EP9000-CUSA00558_00-THELASTOFUS00000?emcid=pa-st-233073',
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Naughty Dog'
  },
  {
    name: "Uncharted: Drake's Fortune",
    description:
      'A 400-year-old clue in the coffin of Sir Francis Drake sets a modern-day fortune hunter on a exploration for the fabled treasure of El Dorado, leading to the discovery of a forgotten island in the middle of the Pacific Ocean. The search turns deadly when Nathan Drake becomes stranded on the island and hunted by mercenaries. Outnumbered and outgunned, Drake and his companions must fight to survive as they begin to unravel the terrible secrets hidden on the Island.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/uncharted1_axwkbn.jpg',
    releaseYear: 2007,
    platforms: ['ps3', 'ps4'],
    linkToBuy:
      'https://www.amazon.es/Uncharted-El-Tesoro-Drake-Remasterizado/dp/B01MQ24C44/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=uncharted+drake%27s+fortune&qid=1585927921&sr=8-2',
    genres: ['Action', 'Adventure'],
    ESRB: 'T',
    company: 'Naughty Dog'
  },
  {
    name: 'Uncharted 2: Among Thieves',
    description:
      'In this sequel, Drake is drawn back into the treacherous world of thieves and treasure-seekers. A mystery artifact propels him to undertake an expedition to the legendary Himalayan valley of Shambhala where he finds himself embroiled in a dangerous game of cat-and-mouse against a fugitive war criminal. Pushed to his limits, Drake is forced to risk everything.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/uncharted2_xt5mxa.jpg',
    releaseYear: 2009,
    platforms: ['ps3', 'ps4'],
    linkToBuy:
      'https://www.amazon.es/Uncharted-Reino-Los-Ladrones-Remasterizado/dp/B01MQ1MF8Z/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=uncharted+2&qid=1585927948&sr=8-1',
    genres: ['Action', 'Adventure'],
    ESRB: 'T',
    company: 'Naughty Dog'
  },
  {
    name: "Uncharted 3: Drake's Deception",
    description:
      'A search for the fabled "Atlantis of the Sands" propels fortune hunter Nathan Drake into a desperate bid for survival that strains the limits of his endurance, forcing him to confront his deepest fears.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/uncharted3_x8vy0b.jpg',
    releaseYear: 2011,
    platforms: ['ps3', 'ps4'],
    linkToBuy:
      'https://www.amazon.es/Uncharted-3-Traici%C3%B3n-Drake-Remasterizado/dp/B01M3VAT2F/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=uncharted+3&qid=1585925642&sr=8-2',
    genres: ['Action', 'Adventure'],
    ESRB: 'T',
    company: 'Naughty Dog'
  },
  {
    name: "Uncharted 4: A thief's End",
    description:
      'Several years after his last adventure, retired fortune hunter, Nathan Drake, is forced back into the world of thieves. With the stakes much more personal, Drake embarks on a globe-trotting journey in pursuit of a historical conspiracy behind a fabled pirate treasure. His greatest adventure will test his physical limits, his resolve, and ultimately what he’s willing to sacrifice to save the ones he loves.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586273080/wish2play/games/uncharted4_azdyps.jpg',
    releaseYear: 2016,
    platforms: ['ps4'],
    linkToBuy:
      'https://www.amazon.es/Uncharted-El-Desenlace-Del-Ladr%C3%B3n/dp/B00JZPEHCS/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=uncharted+4&qid=1585927991&sr=8-2',
    genres: ['Action'],
    ESRB: 'T',
    company: 'Naughty Dog'
  },
  {
    name: 'Watch Dogs 2',
    description:
      'Play as Marcus Holloway, a brilliant young hacker living in the birthplace of the tech revolution, the San Francisco Bay Area.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272718/wish2play/games/watchdogs2_rsve3r.jpg',
    releaseYear: 2016,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Watch-Dogs-2-Standard-Edition/dp/B00ZIW2V1Q/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=SO376WOU9452&dchild=1&keywords=watch%2Bdogs%2B2&qid=1585700659&sprefix=watc%2Caps%2C167&sr=8-2&th=1',
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Ubisoft'
  },
  {
    name: 'Watch Dogs',
    description:
      'Become Aiden Pearce, a brilliant hacker whose criminal past lead to a violent family tragedy. While on the hunt for those responsible, you will be able to tap into the city’s omnipresent security cameras, download personal information, control systems such as traffic lights and the electrical grid to stop a chase, and more.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272718/wish2play/games/watchdogs_qjtkay.jpg',
    releaseYear: 2014,
    platforms: ['ps3', 'ps4', 'Xbox', 'PC'],
    linkToBuy: 'https://www.amazon.es/dp/B00ZIW2V1Q/ref=twister_B00ZR563V8?_encoding=UTF8&th=1',
    genres: ['Action', 'Adventure', 'Shooter'],
    ESRB: 'M',
    company: 'Ubisoft'
  },
  {
    _id: '5e847df652a3737b30a13c66',
    name: 'Death Stranding',
    description:
      'Sam Bridges must brave a world utterly transformed by the Death Stranding. Carrying the disconnected remnants of our future in his hands, he embarks on a journey to reconnect the shattered world one step at a time. What is the mystery of the Death Stranding? What will Sam discover on the road ahead? An unprecedented gameplay experience holds these answers and more.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272716/wish2play/games/death-stranding_eposwc.jpg',
    releaseYear: 2019,
    platforms: ['ps4', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Sony-CEE-Games-New-Gen/dp/B07TC26VY8/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2OZ3U9TCOWGKY&dchild=1&keywords=death+stranding+ps4&qid=1585928076&s=videogames&sprefix=death+s%2Cvideogames%2C157&sr=1-1',
    genres: ['Action'],
    ESRB: 'M',
    company: 'Kojima Productions'
  },
  {
    name: 'Until Dawn',
    description:
      'Eight friends are trapped together on a remote mountain retreat, and they aren’t alone. Gripped by dread, with tensions running high, they must fight through their fear if they all hope to make it through the night in one piece. Play as each of the eight characters and experience fear like you never have before. Every decision you make in your terrifying search for answers could mean the difference between life and death, but for whom? Your actions alone will decide who survives Until Dawn.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/until-dawn_mstdol.jpg',
    releaseYear: 2015,
    platforms: ['ps4'],
    linkToBuy:
      'https://www.amazon.es/Sony-CEE-Games-New-9816539/dp/B00WKCIDFK/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1IDT6IHI14Q72&dchild=1&keywords=until+dawn&qid=1585928093&s=videogames&sprefix=until+d%2Cvideogames%2C163&sr=1-2',
    genres: ['Adventure'],
    ESRB: 'M',
    company: 'Supermassive Games'
  },
  {
    name: 'Fallout 4',
    description:
      'As the sole survivor of Vault 111, you enter a world destroyed by nuclear war. Only you can rebuild and determine the fate of the Wasteland. Welcome home.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272716/wish2play/games/fo4_znhes8.jpg',
    releaseYear: 2015,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Koch-Media-Fallout-4/dp/B00YSM7PB8/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3NB4M1D3IKE6L&dchild=1&keywords=fallout%2B4&qid=1585743546&s=videogames&sprefix=fallout%2B4%2Cvideogames%2C160&sr=1-1&th=1',
    genres: ['RPG'],
    ESRB: 'M',
    company: 'Bethesda Game Studios'
  },
  {
    name: 'Fallout 76',
    description:
      'Reclamation Day, 2102. Twenty-five years after the bombs fall, you and your fellow Vault Dwellers—chosen from the nation’s best and brightest – emerge into post-nuclear America. Play solo or join together as you explore, quest, build, scavenge and triumph against the wasteland’s greatest threats.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272716/wish2play/games/fo76_zg288o.jpg',
    releaseYear: 2018,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy: 'https://www.amazon.es/dp/B07DFVX1NV/ref=twister_B07PF1HM9Y?_encoding=UTF8&th=1',
    genres: ['RPG'],
    ESRB: 'M',
    company: 'Bethesda Game Studios'
  },
  {
    name: 'The Dark Pictures Anthology: Man Of Medan',
    description:
      'In Man of Medan, five friends set sail on a holiday diving trip that soon changes into something much more sinister... Embark on a horrific journey aboard a ghost ship. All playable characters can live or die. The choices you make will decide their fate. Who will you save?',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/man-of-medan_objii7.jpg',
    releaseYear: 2019,
    platforms: ['ps4', 'Xbox'],
    linkToBuy:
      'https://www.amazon.es/Dark-Pictures-Man-Medan/dp/B07K3GFJ77/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=man%2Bof%2Bmedan&qid=1585744521&s=videogames&sr=1-1&th=1',
    genres: ['Horror'],
    ESRB: 'M',
    company: 'Supermassive Games'
  },
  {
    name: 'Detroit: Become Human',
    description:
      'Set in Detroit City during the year 2036, the city has been revitalized by the invention and introduction of Androids into everyday life. But when Androids start behaving as if they are alive, events begin to spin out of control. Step into the roles of the story’s pivotal three playable characters, each with unique perspectives as they face their new way of life. In this ambitiously bending and thrilling narrative, every choice and action will not only determine the character’s fate, but that of the entire city and possibly beyond.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272716/wish2play/games/detroit_ujjwtt.jpg',
    releaseYear: 2018,
    platforms: ['ps4', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Detroit-Become-Human-Edici%C3%B3n-Est%C3%A1ndar/dp/B07B9RNDP2/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3NPXT0KC7CV2V&dchild=1&keywords=detroit+become+human&qid=1585918484&sprefix=detroit+b%2Caps%2C165&sr=8-1',
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Quantic Dream'
  },
  {
    name: 'Crash Bandicoot™ N. Sane Trilogy',
    description:
      "Your favourite marsupial, Crash Bandicoot™, is back! He's enhanced, entranced & ready-to-dance with the N. Sane Trilogy game collection. Now you can experience Crash Bandicoot™ like never before. Spin, jump, wump and repeat as you take on the epic challenges and adventures through the three games that started it all, Crash Bandicoot™, Crash Bandicoot™ 2: Cortex Strikes Back and Crash Bandicoot™: Warped. Relive all your favourite Crash moments in their fully-remastered graphical glory and get ready to put some UMPH in your WUMP!",
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272716/wish2play/games/crash_krxq7p.jpg',
    releaseYear: 2017,
    platforms: ['ps4', 'Xbox', 'PC', 'Nintendo Switch'],
    linkToBuy:
      'https://www.amazon.es/ACTIVISION-Crash-Bandicoot-N-Sane-Trilogy/dp/B07JJGZVNR/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=crash+bandicoot&qid=1585925430&sr=8-1',
    genres: ['Action'],
    ESRB: 'E 10+',
    company: 'Naughty Dog'
  },
  {
    name: 'The Sims™ 4',
    description:
      "Unleash your imagination and create a unique world of Sims that's an expression of you! Explore and customize every detail from Sims to homes, and much more.",
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/sims_kpjygg.jpg',
    releaseYear: 2017,
    platforms: ['ps4', 'Xbox', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Electronic-Arts-1051215-The-Sims/dp/B0749V8T1B/ref=sr_1_4?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=los+sims+ps4&qid=1585926339&sr=8-4',
    genres: ['Simulation'],
    ESRB: 'T',
    company: 'Maxis'
  },
  {
    name: "Assassin's Creed® Odyssey",
    description:
      'Write your own epic odyssey and become a legendary Spartan hero. Forge your destiny in a world on the brink of tearing itself apart. Influence how history unfolds in an ever-changing world shaped by your choices.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/odyssey_z7amdy.jpg',
    releaseYear: 2018,
    platforms: ['ps4', 'Xbox'],
    linkToBuy:
      'https://www.amazon.es/UBI-Soft-Assassins-Creed-Odyssey/dp/B07DKV22D7/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=15SQR54VZIUQC&dchild=1&keywords=assassins+creed+odyssey&qid=1585927197&sprefix=assas%2Caps%2C165&sr=8-2',
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Ubisoft'
  },
  {
    name: 'Life is Strange',
    description:
      'Follow the story of Max Caulfield, a photography senior who discovers she can rewind time while saving her best friend Chloe Price. The pair soon find themselves investigating the mysterious disappearance of fellow student Rachel Amber, uncovering a dark side to life in Arcadia Bay. Meanwhile, Max must quickly learn that changing the past can sometimes lead to a devastating future.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/LiS_urmaxr.jpg',
    releaseYear: 2015,
    platforms: ['ps3', 'ps4', 'Xbox', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Life-Is-Strange-Standard-Edition/dp/B01C43H7WO/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1C1RCA6YBN7T1&dchild=1&keywords=life+is+strange&qid=1585927799&sprefix=life+%2Caps%2C168&sr=8-1',
    genres: 'Arcade',
    ESRB: 'M',
    company: 'Dontnod Entertainment'
  },
  {
    name: 'Heavy Rain',
    description:
      'Experience a gripping psychological thriller filled with innumerable twists and turns. Spanning four days of mystery and suspense, the hunt is on for a murderer known only as the Origami Killer - named after his macabre calling card of leaving behind folded paper shapes at crime scenes. Four characters, each following their own leads and with their own motives, must take part in a desperate attempt to prevent the killer from claiming a new victim. You need to think fast and act even faster, as every choice and move you make can result in dramatic, game-changing consequences – and even determine who lives… and who dies. How this story ends is entirely up to you.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/heavy-rain_dkurol.jpg',
    releaseYear: 2016,
    platforms: ['ps3', 'ps4', 'PC'],
    linkToBuy:
      'https://www.amazon.es/Heavy-Rain-PS3-Importaci%C3%B3n-inglesa/dp/B002BWONF8/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=heavy+rain+ps3&qid=1585929037&sr=8-1',
    genres: ['Action', 'Adventure'],
    ESRB: 'M',
    company: 'Quantic Dream'
  },
  {
    name: 'FIFA 20',
    description:
      'This year FIFA 20 brings two sides of The World’s Game to life, the prestige of the professional stage and an all new authentic street soccer experience in EA sports VOLTA.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272716/wish2play/games/fifa20_yocnxg.jpg',
    releaseYear: 2019,
    platforms: ['ps4', 'Xbox', 'PC', 'Nintendo Switch'],
    linkToBuy:
      'https://www.amazon.es/Electronic-Arts-FIFA-20-Est%C3%A1ndar/dp/B07SRD5GGF/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=fifa+20&qid=1585929431&sr=8-1',
    genres: ['Sports'],
    ESRB: 'E',
    company: 'EA Sports'
  },
  {
    name: 'Horizon Zero Dawn',
    description:
      'Take on the role of skilled hunter Aloy as you explore a lush world inhabited by mysterious mechanized creatures in an exhilarating open world. How have machines dominated this world, and what is their purpose? What happened to the civilization here before? Scour every corner of a realm filled with ancient relics and mysterious buildings in order to uncover your past and unearth the many secrets of a forgotten land.',
    image:
      'https://res.cloudinary.com/diimdgeux/image/upload/v1586272717/wish2play/games/horizon_dv6mfo.jpg',
    releaseYear: 2017,
    platforms: ['ps4'],
    linkToBuy:
      'https://www.amazon.es/Sony-CEE-Games-New-Gen/dp/B07THC6RDF/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2UBYZHUJOSU0V&dchild=1&keywords=horizon+zero+dawn&qid=1585930143&sprefix=horizon%2Caps%2C171&sr=8-1',
    genres: ['Action', 'RPG'],
    ESRB: 'T',
    company: 'Guerrilla Games'
  }
];

module.exports = games;
