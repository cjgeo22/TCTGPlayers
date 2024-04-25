export function getFormattedDate(date){
    //return `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`
    return date.toISOString().slice(0, 10)
}