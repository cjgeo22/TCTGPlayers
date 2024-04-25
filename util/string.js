export function getNumberString(string){
    //return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`
    return string.replace(/[^0-9]*/g, "")
}