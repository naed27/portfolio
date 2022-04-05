import { Dispatch, SetStateAction } from 'react'

type linkMark = 'Right' | 'Left' | 'Top' | 'Top-Right' | 'Top-Left' | 'Bottom' | 'Bottom-Right' | 'Bottom-Left'

export interface YGOCard{
  id:number,
  name:string,
  desc:string,
  type:string,
  atk?:number,
  def?:number,
  level?:number,
  race?:string,
  attribute?:string,
  linkval?:number,
  linkmarkers?:linkMark[],
  scale?:number,
  card_images:card_images_type[],
  card_prices?:card_prices_type[],
  card_sets?:card_sets[],
  banlist_info?:banlist_info
  previousIndex?:number,
}

export interface card_images_type{
  id:number,
  image_url:string,
  image_url_small:string
}

export interface card_prices_type{
  amazon_price:string,
  cardmarket_price:string,
  coolstuffinc_price:string,
  ebay_price:string,
  tcgplayer_price:string
}

export interface card_sets{
  set_code:string,
  set_name:string,
  set_price:string,
  set_rarity:string,
  set_rarity_code:string
}

export interface banlist_info{
  ban_goat?: 'Banned' | 'Limited' | 'Semi-Limited',
  ban_ocg: 'Banned' | 'Limited' | 'Semi-Limited',
  ban_tcg: 'Banned' | 'Limited' | 'Semi-Limited',
}

export type YGOCardGame = 'T.C.G.' | 'O.C.G.'

export interface Query {
  name:string,
  desc:string,
  keywords:string,
  type:string,
  subtype:string,
  race:string,
  attribute:string,
  atk:{min:number,max:number}
  def:{min:number,max:number}
  level:{min:number,max:number},
  limit: number
  cardGame: YGOCardGame
}

export interface GlobalContextType{
  readonly query: Query
  readonly showDeck: boolean,
  readonly showImages: boolean,
  readonly pageNumber: number,
  readonly cardTypes: CardTypes,
  readonly mainCards: YGOCard[],
  readonly showSearcher: boolean,
  readonly maxPageOfTable: number,
  readonly tablePageRange: number,
  readonly searchedCards: YGOCard[],
  readonly searchIndex: number|null,
  readonly mainDeck: (YGOCard|null)[],
  readonly sideDeck: (YGOCard|null)[], 
  readonly selectedCard: YGOCard|null,
  readonly extraDeck: (YGOCard|null)[],
  readonly showMoreFilters: boolean,
  readonly showDeckBuilder: boolean,
  readonly numberOfCardsShownOnPage: number,

  readonly setQuery: Dispatch<SetStateAction<Query>>,
  readonly toggleDeck: Dispatch<SetStateAction<boolean>>,
  readonly setShowImages: Dispatch<SetStateAction<boolean>>,
  readonly setPageNumber: Dispatch<SetStateAction<number>>,
  readonly setMainCards: Dispatch<SetStateAction<YGOCard[]>>,
  readonly toggleSearcher: Dispatch<SetStateAction<boolean>>,
  readonly setMaxPageOfTable: Dispatch<SetStateAction<number>>,
  readonly setTablePageRange: Dispatch<SetStateAction<number>>,
  readonly setSearchIndex: Dispatch<SetStateAction<number|null>>,
  readonly setSearchedCards: Dispatch<SetStateAction<YGOCard[]>>,
  readonly setMainDeck: Dispatch<SetStateAction<(YGOCard|null)[]>>,
  readonly setSideDeck: Dispatch<SetStateAction<(YGOCard|null)[]>>,
  readonly setSelectedCard: Dispatch<SetStateAction<YGOCard|null>>,
  readonly setExtraDeck: Dispatch<SetStateAction<(YGOCard|null)[]>>,
  readonly setShowMoreFilters: Dispatch<SetStateAction<boolean>>,
  readonly setShowDeckBuilder: Dispatch<SetStateAction<boolean>>,
  readonly setNumberOfCardsShownOnPage: Dispatch<SetStateAction<number>>,

}


export interface CardTypes{
 
  primaryTypes:string[],
  races:string[],
  monsterTypes:string[],
  spellTypes:string[],
  trapTypes:string[],
  attributes:string[],
  levels:number[]

}

export interface NotifType{
  id:string,
  deck:string,
  action:string,
  message:string,
  card:YGOCard|null,
  timer:NodeJS.Timeout
}