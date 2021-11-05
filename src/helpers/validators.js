//Make the varible and have value pass into the arrow function, which will contain two if statements 
//to check if value is true or false by validate the  value is a string or not - through the 2 new varibles, which contain an array
//and the other have value being onto split() and pop() and then use .include() to return the array with the elements - if its true or not
export const isValidImage = value => {
    if (!value) return true
    if (typeof value !== 'string') return false
  
    const validFormats = ['png', 'jpeg', 'jpg', 'svg']
    const extenstion = value.split('.').pop()
    return validFormats.includes(extenstion)
  }

  //make varible to contain value by doing the same value string statement validator and make 2 varbiles 
  //expression and regex then match on value into regex to see if its true or false
  export const isValidUrl = value => {
    if (!value) return true
    if (typeof value !== 'string') return false
  
    const exression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    //regexp can match text with patterns
    const regex = new RegExp(exression)
  
    return value.match(regex) ? true : false
  }
  
  //Make the varible and let it have getValues and field into value by have the getValues method into an array field and 
  //compare the newly data with the data in the field
  export const sameAs = (getValues, field) => value => {
    if (!value) return true
    if (typeof value !== 'string') return false
    debugger
  
    const compareToValue = getValues()[field]
    return compareToValue === value
  } 