export const formatNumber = (digit:number) =>{
    return new Intl.NumberFormat('en-FR').format(digit)
}