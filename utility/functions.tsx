export const sortAlphabetically=( words:string[])=>{

  for(let i=1;i<words.length;i++){
      let word1 = words[i];
      let lim;
      let limword;
      comparer:for(let j=i-1;j>=0;j--){
          let word2=words[j];
          if(word1.length<word2.length){
               lim = word1.length;
               limword = word1;
          }else{
               lim = word2.length;
               limword = word2;
          }
          for(let k=0;k<lim;k++){
              if(word1[k]<word2[k]){
                  words[j]=word1;
                  words[i]=word2;
                  i--;
                  break;
              }else if(word1[k]==word2[k]){
                  if(k==lim-1&&limword==word1){
                      words[j]=word1;
                      words[i]=word2;
                      i--;
                  }
              }else if(word1[k]>word2[k]){
                  break comparer;
              }
          }
      }
  }
  return words;
}


export function randomIntBetween(min:number, max:number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const getAverage = (array:number[]|Uint8Array) =>{
  if(array.length===0)return 0;
  let res = 0;
  array.forEach(number => {
    res+=number;
  });
  return (res/array.length);
}

export const getNeighbors = (dataArray:Uint8Array|number[],i:number,numOfNeighbors:number)=>{
  const reach = Math.floor(numOfNeighbors/2);
  let start = i-reach;
  let end = i+reach+1;

  const res = [];
  for (let j = start; j < end; j++) {
    if(j!==i){
      let point = j;
      if(j<0) point=dataArray.length+j
      else if(j>=dataArray.length)point=j-dataArray.length;
      res.push(dataArray[point]);
    }
  }
  return res 
}

export const getDifference = (n1:number,n2:number)=>{
  return Math.abs(n1-n2) 
}

export const flatten = (numbers:number[],loopCount:number):number[]=>{
  let result:number[]=[];

  while(loopCount!=0){

    let temp:number[] = [];
    if(result.length>0)numbers=result;

    for (let i = 0; i < numbers.length; i++) {
      const frequency = numbers[i];
      const neighbors = getNeighbors(numbers,i,2);
      const average = getAverage([...neighbors,frequency]);
      temp.push(average);
    }
    loopCount--
    result=temp;
  }
  
  return result
}



