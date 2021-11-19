import { Dispatch, SetStateAction } from 'react'


export interface YGOCard{
  id:number,
  name:string,
  desc:string,
  type:string,
  atk?:number,
  def?:number,
  level?:number,
  race?:string,
  attribute?:string
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
  ban_goat: string,
  ban_ocg: string,
  ban_tcg: string,
}


export interface Query {
  name:string,
  desc:string,
  type:string,
  subtype:string,
  race:string,
  attribute:string,
  atk:{min:number,max:number}
  def:{min:number,max:number}
  level:{min:number,max:number},
}

export interface DeckFunctions{
  getCard:(category: string, index: number) => YGOCard | null,
  getSetter:(category: string) => Dispatch<SetStateAction<(YGOCard | null)[]>> | null,
  getDeck:(category: string) => (YGOCard | null)[] | null,
  getExistingCardCount:(card: YGOCard) => number
}


export interface GlobalContextType{
  readonly showSearcher:boolean,
  readonly toggleSearcher: Dispatch<SetStateAction<boolean>>,
  readonly showDeck:boolean,
  readonly toggleDeck:  Dispatch<SetStateAction<boolean>>

  readonly mainDeck:(YGOCard|null)[],
  readonly setMainDeck:Dispatch<SetStateAction<(YGOCard|null)[]>>,
  readonly extraDeck:(YGOCard|null)[],
  readonly setExtraDeck:Dispatch<SetStateAction<(YGOCard|null)[]>>,
  readonly sideDeck:(YGOCard|null)[], 
  readonly setSideDeck:Dispatch<SetStateAction<(YGOCard|null)[]>>,

  readonly mainCards:YGOCard[],
  readonly setMainCards:Dispatch<SetStateAction<YGOCard[]>>,
  readonly searchedCards:YGOCard[],
  readonly setSearchedCards:Dispatch<SetStateAction<YGOCard[]>>,
  readonly pageNumber:number,
  readonly setPageNumber:Dispatch<SetStateAction<number>>,
  readonly pageCardCount:number,
  readonly setPageCardCount:Dispatch<SetStateAction<number>>,
  readonly query:Query
  readonly setQuery:Dispatch<SetStateAction<Query>>,

  readonly selectedCard:YGOCard|null,
  readonly setSelectedCard:Dispatch<SetStateAction<YGOCard|null>>,
  readonly searchIndex:number|null,
  readonly setSearchIndex:Dispatch<SetStateAction<number|null>>,

  readonly cardTypes:CardTypes
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