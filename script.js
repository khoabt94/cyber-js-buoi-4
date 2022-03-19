///////////////////////////////////////////////////////////////////////////
// HELPER FUNCTION
const stepUp = (arrNumberRange, arrPriceRange, num) => {
    return arrNumberRange.reduce((acc, el, i) => {
        acc.remain > el 
            ? acc.sum += el*arrPriceRange[i] 
            : acc.sum += acc.remain*arrPriceRange[i]
        acc.remain = Math.max(acc.remain - el, 0)
        return acc
    }, {sum: 0, remain: num})
}  


///////////////////////////////////////////////////////////////////////////
// BAI 1 
const e1 = document.querySelector('.e1')
const e1Btn = e1.querySelector('.e1Btn')
const e1ResultScore = e1.querySelector('.e1ResultScore')
const e1ResultType = e1.querySelector('.e1ResultType')
const e1AreaScoreObj = {
    A: 2,
    B: 1,
    C: 0.5,
    X: 0,
}
const e1TypeScoreObj = {
    '1': 2.5,
    '2': 1.5,
    '3': 1,
    '0': 0,
}

e1Btn.addEventListener('click', e => {
    e.preventDefault()

    // Get Data
    const e1BaseScore = [...e1.querySelectorAll('.e1BaseScore input')].map(el => el.value * 1)
    const e1TargetScore = e1.querySelector('.e1TargetScore input').value * 1
    const e1Area = e1.querySelector('.e1Area input').value
    const e1Type = e1.querySelector('.e1Type input').value

    // Validation
    if (e1BaseScore.some(el => Number.isNaN(el)) ||
        Number.isNaN(e1TargetScore) ||
        e1Area === '' ||
        e1Type === ''
        ) {
        alert('Vui lòng nhập đầy đủ dữ liệu')
        return
    }

    // Get baseScore
    const baseScore = e1BaseScore.reduce((acc, el) => acc + el,0)

    // Get Area Score
    const areaGroup = Object.keys(e1AreaScoreObj).includes(e1Area.toUpperCase()) ? e1Area.toUpperCase() : 'X'  
    const areaScore = e1AreaScoreObj[areaGroup]

    // Get Type Score
    const typeGroup = Object.keys(e1TypeScoreObj).includes(e1Type) ? e1Type : '0'  
    const typeScore = e1TypeScoreObj[typeGroup]
    console.log(Object.keys(e1Area))
    // Get Sum Score
    const sumScore = baseScore + areaScore + typeScore

    // Compare Target
    const result = sumScore >= e1TargetScore 
        ? 'Chúc mừng bạn đã trúng tuyển! 🎉'
        : 'Chúc bạn may mắn lần sau! 🤦‍♂️'

    // Manipulate DOM
    e1ResultScore.textContent = `Số điểm của bạn là: ${sumScore}`
    e1ResultType.textContent = result
})

///////////////////////////////////////////////////////////////////////////
// BAI 2 
const e2 = document.querySelector('.e2')
const e2Btn = e2.querySelector('.e2Btn')
const e2NameShow = e2.querySelector('.e2NameShow')
const e2Result = e2.querySelector('.e2Result')
const e2NumberRange = [50, 50, 100, 150]
const e2Pricerange = [500, 650, 850, 1100]

e2Btn.addEventListener('click', e => {
    e.preventDefault()

    // Get Data
    const e2Number = e2.querySelector('.e2Number input').value * 1
    const e2Name = e2.querySelector('.e2Name input').value

    // Validation
    if (Number.isNaN(e2Number) ||
        e2Number <= 0 ||
        e2Name === "") {
        alert('Vui lòng nhập đầy đủ dữ liệu')
        return
    }

    // Step-up accumulation
    const e2stepUp = stepUp(e2NumberRange, e2Pricerange, e2Number)

    // Calculate remaining and sum up
    const result = e2stepUp.sum + e2stepUp.remain*1300

    // Manipulate DOM
    e2NameShow.textContent = `Hộ gia đình: ${e2Name}`
    e2Result.textContent = `Số tiền điện của bạn là: ${result.toLocaleString()} vnd`
})

///////////////////////////////////////////////////////////////////////////
// BAI 3 
const e3 = document.querySelector('.e3')
const e3Btn = e3.querySelector('.e3Btn')
const e3NameShow = e3.querySelector('.e3NameShow')
const e3Result = e3.querySelector('.e3Result')
const e3NumberRange = [60, 60, 90, 174, 240, 336]
const e3Pricerange = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3]

e3Btn.addEventListener('click', e => {
    e.preventDefault()

    // Get Data
    const e3Number = e3.querySelector('.e3Income input').value * 1
    const e3Name = e3.querySelector('.e3Name input').value
    const e3People = e3.querySelector('.e3People input').value * 1

    // Validation
    if (Number.isNaN(e3Number) ||
        Number.isNaN(e3People) ||
        e3Number <= 0 ||
        e3People <= 0 ||
        e3Name === "") {
        alert('Vui lòng nhập đầy đủ dữ liệu')
        return
    }

    // Get Taxable Income
    const e3Income = e3Number - 4 - e3People * 1.6

    // Step-up accumulation
    const e3stepUp = stepUp(e3NumberRange, e3Pricerange, e3Income)

    // Calculate remaining and sum up
    const result = e3stepUp.sum + e3stepUp.remain*0.35

    // Manipulate DOM
    e3NameShow.textContent = `Hộ gia đình: ${e3Name}`
    e3Result.textContent = `Số thuế thu nhập của bạn là: ${result.toLocaleString()} triệu vnd`
})

///////////////////////////////////////////////////////////////////////////
// BAI 4 
const e4 = document.querySelector('.e4')
const e4Btn = e4.querySelector('.e4Btn')
const e4PortEl = e4.querySelector('.e4Port')
const e4NameShow = e4.querySelector('.e4NameShow')
const e4Result = e4.querySelector('.e4Result')
const e4TypeEl = e4.querySelector('.e4Type select')

e4TypeEl.addEventListener('change', e => {
    const type = e.target.value
    if (type === 'doanhnghiep') {
        e4PortEl.classList.remove('invisible')
        e4PortEl.classList.remove('opacity-0')
        return
    }
    e4PortEl.classList.add('invisible')
    e4PortEl.classList.add('opacity-0')
})

e4Btn.addEventListener('click', e => {
    e.preventDefault()

    // Get Data
    const e4Port = !e4PortEl.classList.contains('invisible') ? e4PortEl.querySelector('input').value * 1 : 0
    const e4Channel = e4.querySelector('.e4Channel input').value * 1
    const e4Name = e4.querySelector('.e4Name input').value
    const e4Type = e4TypeEl.value

    // Validation
    if (Number.isNaN(e4Channel) ||
        e4Channel <= 0 ||
        e4Name === "" ||
        e4Type === "Vui lòng chọn loại khách hàng") {
        alert('Vui lòng nhập đầy đủ dữ liệu')
        return
    }

    // Calculate remaining and sum up
    let result
    if (e4Type === 'doanhnghiep') {
        const portFee = e4Port > 10 ? 75 + (e4Port - 10) * 5 : 75
        const channelFee = e4Channel * 50
        result = 15 + portFee + channelFee
    } 
    if (e4Type === 'canhan') {
        const channelFee = e4Channel * 7.5
        result = 4.5 + 20.5 + channelFee
    } 

    // Manipulate DOM
    e4NameShow.textContent = `Mã khách hàng: ${e4Name}`
    e4Result.textContent = `Số tiền phí cáp của bạn là: $${result.toLocaleString()}`
})