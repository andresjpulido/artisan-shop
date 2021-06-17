export function dateFormatter(d){
    var date = new Date(d)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + month + "/" + date.getFullYear() + "  " + strTime;
  }


  export function getdate(){
    var date = new Date()   
    var month = (date.getMonth()+1) < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1    
    var day = date.getDate() > 10? date.getDate() : '0' + date.getDate()
    return date.getFullYear() + "-" + month + "-" + day;
  }