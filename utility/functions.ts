import axios from "axios";

// ----------- api caching

export const cacheApiData = async (endpoint: string) => {
  const db = await openDatabase();
  const cachedData = await getDataFromObjectStore(db, 'cache', endpoint);

  if (cachedData) {
    return Promise.resolve({ data: cachedData, success: true });
  }

  const result = await axios.get(endpoint).catch(() => {
    console.log('fetch failed');
  });

  if (!result) return { data: null, success: false };

  await putDataInObjectStore(db, 'cache', result.data, endpoint);

  return { data: result.data, success: true };
};

const openDatabase = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('cache');
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error);
    };
    request.onupgradeneeded = () => {
      request.result.createObjectStore('cache', { keyPath: 'endpoint' })
    };
  });
};

const getDataFromObjectStore = async (db: IDBDatabase, name: string, key: string) => {
  return new Promise<any>((resolve, reject) => {
    const transaction = db.transaction(name, 'readonly');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.get(key);
    request.onsuccess = () => {
      resolve(request.result ? request.result.data : null);
    }
    request.onerror = () => {
      reject(request.error);
    }
  });
};

const putDataInObjectStore = async (db: IDBDatabase, name: string, data: any, key: string) => {
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(name, 'readwrite');
    const objectStore = transaction.objectStore(name);
    const request = objectStore.put({ endpoint: key, data: data });
    request.onsuccess = () => {
      resolve();
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

// ----------------- 

export const getTotalPaddingX = (element: HTMLElement) => {
  const elementCSS = window.getComputedStyle(element)

  const left = parseFloat(elementCSS.paddingTop || '0')
  const right = parseFloat(elementCSS.paddingTop || '0')

  return left+right;
}


export const getTotalPaddingY = (element: HTMLElement) => {
  const elementCSS = window.getComputedStyle(element)
  
  const top = parseFloat(elementCSS.paddingTop || '0')
  const bottom = parseFloat(elementCSS.paddingTop || '0')

  return top+bottom;
}

interface GetCardsPerRowProps {
  container: HTMLElement,
  cardWidth: number,
  flexGap: number,
}

export const getItemsPerRow = ({ container, cardWidth, flexGap }: GetCardsPerRowProps) =>{
  const allowableWidth = container.offsetWidth - getTotalPaddingX(container)
  if(allowableWidth<cardWidth) return 1
  const cardsPerRow = Math.floor(allowableWidth/cardWidth)
  const gapped = (cardWidth*cardsPerRow) + (flexGap*(cardsPerRow-1))
  if (gapped<=allowableWidth)
    return cardsPerRow
  return cardsPerRow-1
}


export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const onClickUrl = (url: string): (() => void) => () => openInNewTab(url)

export const isImageCached = (src: string, callback: (src:string)=>void = ()=>{}) => {
  const image = new Image();
  image.src = src;
  image.onload = ()=> callback(src)
  return image.complete;
}

export const getCoordinates = (element: HTMLElement) => {
  const {x,y} = element.getBoundingClientRect()
  return ({x,y})
}
export const sortAlphabetically = (arr: string[]) => arr.sort((a, b) => a.localeCompare(b));

export const reverseSortAlphabetically = (arr: string[]) => {
  return arr.sort((a, b) => b.localeCompare(a));
}

export const capitalizeWords = (string: string) => string.replace(/\b\w/g, (match) => match.toUpperCase())

export const objectKeyValuesToArray = (obj:{[key:string]: string}) =>{
  const arr = [];
  for (const [key, value] of Object.entries(obj)) {
    arr.push(value);
  }
  return arr;
}

export const arrayValuesToString = <T>(arr: T[]) => arr.join(', ')

export const randomNumberBetween = ({min=0, max}: {min?: number, max: number}) => {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

export const parseTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

export const getIntersections = <T>(baseArray:T[], topArray:T[]): T[] => {
  return baseArray.filter(x => topArray.includes(x));
}

export const getLastItemOf = <T>(array: T[]):T | null => {

  if(array.length === 0) 
  return null

  return array[array.length-1]
}

export const map2DArray = <T>(array:T[][]) => {
  return array.reduce((acc, cur) => {
    return acc.concat(cur);
  }, []);
}

export const isWhitespace = (str?: string | number | null) => {
  if (str === null || str === undefined || typeof str === 'number')
    return false
  if (!str.replace(/\s/g, '').length) 
    return true
  return false
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

  for (let i = 0; i < arrayLength; i++) {
    const averaged = getAverage(arraySlice)
    result.push(averaged)
    arraySlice.shift();
    arraySlice.push(array[(i + rightWing) < arrayLength ? (i + rightWing) : ((i + rightWing) - arrayLength)]);
  }
  
  return result;
}

export const getAverage = (array:number[]) =>{
  if(array.length===0) return 0;
  let sum = 0;
  for (let i = 0; i < array.length; i++)
    sum += array[i];
  return sum/array.length
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

export const removeBlanksFromArray = <T>(array: T[]): T[] => 
  array.filter(item=>item!=null||item!=undefined)


export const delay = async (milliseconds:number) => new Promise(res=>setTimeout(res, milliseconds))

export const bufferToLocalImage = (buffer: Buffer) => {
  const arrayBufferView = new Uint8Array( buffer );
  const blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL( blob );
  return imageUrl
}


