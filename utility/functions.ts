export const map2DArray = <T>(array:T[][]) => {
  return array.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
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


