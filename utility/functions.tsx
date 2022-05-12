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


export const randomIntBetween = (min:number, max:number) => 
  Math.floor(Math.random() * (max - min + 1) + min)

export const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export const smoothenNumbers = ({ array, wingSpan } : { array:number[], wingSpan: number }) =>{
  const result: number[] = [];                 
  const arrayLength = array.length; 
  const leftWing = wingSpan;
  const rightWing = wingSpan+1;
  const arraySlice = array.slice(-leftWing)
  arraySlice.push(...array.slice(0, rightWing))

  for (let i = 0; i <= arrayLength; i++) {
    const averaged = getAverage(arraySlice)
    result.push(averaged)
    arraySlice.shift();
    arraySlice.push(array[(i + rightWing) < arrayLength ? (i + rightWing) : ((i + rightWing) - arrayLength)]);
  }
  
  return result;
}

export const getAverage = (array:number[]) =>{
  if(array.length===0)
    return 0;
  let result = 0;
  for (let i = 0; i < array.length; i++)
    result += array[i];
  return result
}

export const getNeighbors = (numberArray:number[],index:number,numOfNeighbors:number)=>{
  const reach = Math.floor(numOfNeighbors / 2)
  const leftReach = index - reach
  const rightReach = index + reach + 1

  const res = [];
  for (let i = leftReach; i < rightReach; i++) {
    if(i !== index){
      const point = (()=>{
        if(i < 0) 
          return numberArray.length + i
        if(i >= numberArray.length)
          return  i - numberArray.length
        return i
      })()
      res.push(numberArray[point])
    }
  }
  return res 
}

export const getDifference = (n1:number,n2:number) => Math.abs(n1-n2) 

export const pushIfUnique = (array: any[], element: any) => 
  !array.includes(element) && array.push(element)

export const delay = async (milliseconds:number) => new Promise(res=>setTimeout(res, milliseconds))

export const bufferToLocalImage = (buffer: Buffer) => {
  const arrayBufferView = new Uint8Array( buffer );
  const blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL( blob );
  return imageUrl
}


