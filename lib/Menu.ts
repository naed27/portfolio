
export interface MenuItem  {
  index: number;
  name: 'Tap or swipe the circle!' | 'YGO Card Searcher' | 'Country Informer' | 'Audio Visualizer' | 'Phantasmora';
  link: string;
  imgSrc: string;
  description: string;
}

const MENU: MenuItem[] = 
[
  {
    index: -1, 
    name: 'Tap or swipe the circle!', 
    link:'/', 
    imgSrc:'',
    description: '',
    },
  {
    index: 0, 
    name: 'YGO Card Searcher', 
    link:'/projects/card-searcher', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112753476980719678/image.png',
    description: 'Access stats, effects, and more for every card in the game!',
  },
  {
    index: 1, 
    name: 'Country Informer', 
    link:'/projects/country-informer', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112761535689936936/image.png',
    description: 'Discover information on any nation in seconds!',
  },
  {
    index: 2, 
    name: 'Audio Visualizer', 
    link:'/projects/audio-visualizer', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112761209339519006/image.png',
    description: 'Watch as sounds come to life!',
  },
  {
    index: 3, 
    name: 'Phantasmora', 
    link:'/games/phantasmora', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1112760858163028091/image.png',
    description: 'A thrilling game about a ghost trapped in a dungeon!',
  },
]

export default MENU