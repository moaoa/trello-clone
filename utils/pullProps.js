module.exports = (obj, props) => {
    return props.reduce((accemulatedVal, currentProp)=>{
        accemulatedVal[currentProp] = obj[currentProp]
        return accemulatedVal
    }, {})
}