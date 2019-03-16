var info = {}
var requestComplete = false
const initialUrl = 'https://images-api.nasa.gov/search?'

if(requestComplete = true){
    console.log(info)
}

function call_Nasa(search, location='', startDate='', endDate=''){
  var url = initialUrl + "q=" + search //+ "&location=" + location + "&year_start=" + startDate + "&year_end=" + endDate
  
  fetch(url)
  
  .then(function(data)){
    info = (res => res.JSON()))
    console.log(data)
    requestComplete = true
    }

.catch(function(error) {
    console.log("Error!")
  });   
  
  
  
  
  
}
