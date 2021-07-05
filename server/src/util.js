function addDays(dateStr, dias) {
    let currentDate = new Date(dateStr);
    currentDate.setDate(currentDate.getDate() + dias);

    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(currentDate);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(currentDate);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(currentDate);
    console.log(`${da}-${mo}-${ye}`);
    return `${da}/${mo}/${ye}`
    //return currentDate.getFullYear() + "/" + (currentDate.getMonth()+1) + "/" + currentDate.getDate();
}


function getNameOfDay(dayNumber) {

    switch (dayNumber) {
        case 0:
            return 'Sun'
        case 1:
            return 'Mon'
        case 2:
            return 'Tue'
        case 3:
            return 'Wed'
        case 4:
            return 'Thu'
        case 5:
            return 'Fri'
        case 6:
            return 'Sat'
    }
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

export { addDays, getNameOfDay, zfill }