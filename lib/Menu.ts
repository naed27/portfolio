//vercel pls deploy

export interface MenuItem  {
  index: number;
  name: 'Tap or swipe the portfolio!' 
  | 'YGO Card Searcher' 
  | 'Country Informer' 
  | 'Audio Visualizer' 
  | 'Phantasmora' 
  | 'Whiteside'
  | 'Contacts';
  link: string;
  imgSrc: string;
  description: string;
}

const MENU: MenuItem[] = 
[
  {
    index: -1, 
    name: 'Tap or swipe the portfolio!', 
    link:'/', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1114435135077617785/image.png',
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
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1113728964658221087/image.png',
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
  {
    index: 4, 
    name: 'Whiteside', 
    link:'https://whiteside.vercel.app/', 
    imgSrc:'https://media.discordapp.net/attachments/1112753458165063701/1138792995349606420/image.png',
    description: 'A fullstack app online clothing store!',
  },
  {
    index: 5, 
    name: 'Contacts', 
    link:'/', 
    imgSrc:'https://cdn.discordapp.com/attachments/1112753458165063701/1114421849598742549/image.png',
    description: '',
  },
]

export default MENU