import { sortStrings, containsKeyword, sortNumbers } from "../../../Misc/Functions";
import { YGOCard } from "../../../Misc/Types";

const pushUniquely = (array: any[], element: any) => {
  if (!array.includes(element)) {
    array.push(element);
  }
}

export const fetchUniqueProps = (mainCards:YGOCard[])=>{
  const primaryTypes = ['Monster','Spell','Trap'];
  const races:string[] = [];
  const monsterTypes:string[] = [];
  const spellTypes:string[] = [];
  const trapTypes:string[] = [];
  const attributes:string[] = [];
  const levels:number[] = [];

  mainCards.map((card)=>{
    const {type,race,attribute,level} = card;
    if(race===undefined)return
    if(containsKeyword(type,'Spell')) return pushUniquely(spellTypes,race)
    if(containsKeyword(type,'Trap')) return pushUniquely(trapTypes,race)
    if(containsKeyword(type,'Monster')) {
      if(attribute===undefined)return
      if(level===undefined)return
      pushUniquely(monsterTypes,type.split(' ')[0])
      pushUniquely(attributes,attribute)
      pushUniquely(races,race)
      pushUniquely(levels,level)
      return
    }
    return
  });

  return {
    primaryTypes:primaryTypes.sort(sortStrings),
    races:races.sort(sortStrings),
    monsterTypes:monsterTypes.sort(sortStrings),
    spellTypes:spellTypes.sort(sortStrings),
    trapTypes:trapTypes.sort(sortStrings),
    attributes:attributes.sort(sortStrings),
    levels:levels.sort(sortNumbers),
  }
}