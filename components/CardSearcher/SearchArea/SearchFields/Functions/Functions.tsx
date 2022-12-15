import { pushIfUnique, removeBlanksFromArray } from "../../../../../utility/functions";
import { sortStrings, containsKeyword, sortNumbers } from "../../../Misc/globalFunctions";
import { YGOCard } from "../../../Misc/globalTypes";

export const fetchCardTypes = (mainCards:YGOCard[])=>{
  
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
    if(containsKeyword(type,'Spell')) return pushIfUnique(spellTypes,race)
    if(containsKeyword(type,'Trap')) return pushIfUnique(trapTypes,race)
    if(containsKeyword(type,'Monster')) {
      if(attribute===undefined)return
      pushIfUnique(monsterTypes,type.split(' ')[0])
      pushIfUnique(attributes,attribute)
      pushIfUnique(races,race)
      pushIfUnique(levels,level)
      return
    }
    return
  });

  return {
    primaryTypes:removeBlanksFromArray(primaryTypes).sort(sortStrings),
    races:removeBlanksFromArray(races).sort(sortStrings),
    monsterTypes:removeBlanksFromArray(monsterTypes).sort(sortStrings),
    spellTypes:removeBlanksFromArray(spellTypes).sort(sortStrings),
    trapTypes:removeBlanksFromArray(trapTypes).sort(sortStrings),
    attributes:removeBlanksFromArray(attributes).sort(sortStrings),
    levels:removeBlanksFromArray(levels).sort(sortNumbers),
  }
}