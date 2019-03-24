const initial_url = 'https://images-api.nasa.gov/search?';
var startDate = 1920;
var endDate = 2019;
var info = {};
var fileTypes = {};

//function called when search button is pressed
function call_Nasa(search){
  url = initial_url
  //get start date from slider
  startDate = $('#slider-range').slider('values', 0);
  //get end date from slider
  endDate = $('#slider-range').slider('values', 1);
  //clears the page of images when a new search is made
  document.getElementById('table').innerHTML = '';
  //validate data
  if(search == ''){
    alert('Input a word/phrase to search');
  }
  else{
    //sent GET request to NASA API
       $.ajax({
         url: url,
         type: 'GET',
         dataType: 'json',
         data: {
           q: search, //user input
           year_start: startDate,
           year_end: endDate,
         },
         success: function(data) {
            //parse return data to get to file array
            info = data['collection']['items'];
            if(info.length < 1){
              alert('No media found for your search!');
            }
            else{
              handleReturnData();
            }
          },
          error: function() {
            alert('API call failed! contact rm855@cornell.edu asap, thank you!');
            }
        });
     }
}

function handleReturnData(){
  for(var i = 0; i < 50 && i < info.length; i++){
    //parses through file array and store file types in array
    fileTypes[i] = info[i]['data'][0]['media_type'];
    }
  getLinks(0); //start processing files
}

function getLinks(i){
  if(i < 50 && i < info.length){
    $.getJSON(fixLink(info[i]['href']), function(data){
      //find thumbnail image to display from array of images
      for(var x = 0; x<data.length; x++){
        if(data[x].includes('thumb.jpg')){
          display(fixLink(data[x]), i); //display as images get returned
        }
      }
    getLinks(i+1); //recursion to process all data
    });
  }
}

//replaces all spaces in string with the encoded string '%20'
function fixLink(link){
  return link.replace(/ /g, '%20');
}

function display(link, num){
  //adds image to page
  document.getElementById('table').innerHTML += '<img ' + 'id=' + num +
    ' src = ' + link + ' onclick= expand(this)>';
}

//function called when image or video is clicked on
function expand(element){
  var num = parseInt(element.id, 10); //get index of image in array
  var file = element //sets initial file to thumbnail image that was clicked on page
  createCaption(num); //passes index as argument to find info for caption
  $.getJSON(fixLink(info[num]['href']), function(data){
    //request to get array of images
      for(var x = 0; x < data.length; x++){
        //find original image or video
        if(data[x].includes('orig')){
            file = data[x];
            if(fileTypes[num] == 'image'){
              document.getElementById('img1').src = file;
              //lines 95-100 used to fix image size
              if(file.width > file.height){
                document.getElementById('img1').style = 'width:50%; height:auto;';
              }
              else{
                document.getElementById('img1').style = 'width:auto; height:50%;';
              }
            //show modal over page
            document.getElementById('modal1').style.display = 'block';
            }
            else{
              var correctLink = fixLink(file);
              document.getElementById('vid1').innerHTML = '<source src=' +correctLink+ '>';
              //lines 108-113 used to fix video size
              if(correctLink.width > correctLink.height){
                document.getElementById('vid1').style = 'width:50%; height:auto;';
              }
              else{
                document.getElementById('vid1').style = 'width:auto; height:50%;';
              }
              //show modal over page
            document.getElementById('modal2').style.display = 'block';
          }
        }
      }
  });
}

function createCaption(num){
  //gets metadata array from retrieved info from NASA API
  var rawMetadata = info[num]['data'][0];

  //lines 127-133 used to create caption for image modal
  if(fileTypes[num] == 'image'){
    document.getElementById('caption1').innerHTML =
    rawMetadata['title'] + '<br>' +
    '<br>' + rawMetadata['description'] + '<br><br>' +
    'Data Created: ' + rawMetadata['date_created'] + '<br>' +
    'NASA ID: ' + rawMetadata['nasa_id'] + '<br>' +
    'Center: ' + rawMetadata['center'] + '<br>' +
    'Keywords: ';
    var keywordsLength = rawMetadata['keywords'].length;
    //loops through and retrieves all keywords
    for(var i = 0; i < keywordsLength -1; i++){
      document.getElementById('caption1').innerHTML += rawMetadata['keywords'][i] + ', '
    }
    document.getElementById('caption1').innerHTML += rawMetadata['keywords'][keywordsLength -1];
  }
  //lines 137-142 used to create caption for video modal
  else{
    document.getElementById('caption2').innerHTML =
    rawMetadata['title'] + '<br>' +
    '<br>' + rawMetadata['description'] + '<br><br>' +
    'Date Created: ' + rawMetadata['date_created'] + '<br>' +
    'NASA ID: ' + rawMetadata['nasa_id'] + '<br>' +
    'Center: ' + rawMetadata['center'] + '<br>' +
    'Keywords: ';
    var keywordsLength = rawMetadata['keywords'].length;
    //loops through and retrieves all keywords
    for(var i = 0; i < keywordsLength -1; i++){
      document.getElementById('caption2').innerHTML += rawMetadata['keywords'][i] + ', ';
    }
    document.getElementById('caption2').innerHTML += rawMetadata['keywords'][keywordsLength -1];
  }
}

//if x button is clicked in image modal, close the modal
var span1 = document.getElementsByClassName('close')[0];
span1.onclick = function() {
  document.getElementById('modal1').style.display = 'none';
}

//if x button is clicked in video modal, close the modal and pause video
var span2 = document.getElementsByClassName('close')[1];
span2.onclick= function(){
  document.getElementById('modal2').style.display = 'none';
  document.getElementById('vid1').pause();
}

//if enter key is pressed, treat as search button clicked
var input = document.getElementById('input');
input.addEventListener('keyup', function(event) {
  if(event.keyCode === 13) {
    event.preventDefault();
    document.getElementById('searchButton').click();
  }
});

//if search button is clicked, call function call_Nasa with input value as argument
$('#searchButton').click(function() {
    call_Nasa($('#input').val());
});


//ilf slider is moved, adjust the label accordingly
$( "#slider-range").slider({
    range: true,
    min: 1920,
    max: 2019,
    values: [ 1920, 2019 ],
    slide: function( event, ui ) {
      $( "#yearLabel" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
});

//ensures that year range label is alwasys correct
$( "#yearLabel" ).val($( "#slider-range" ).slider( "values", 0 ) +
  " - " + $( "#slider-range" ).slider( "values", 1 ) );
