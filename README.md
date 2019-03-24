# nasa-imagesearch


App: ______ Github: https://github.com/rezamadhavan/nasa-imagesearch

I built a website that allows users to search the NASA media database by entering a search word (i.e. "Saturn") and refine by year and location (through the search bar). The first 50 results are displayed on the page and they are able to click on them to expand and see metadata for each of the files. For videos, they are also able to play in the expanded view.

Due to the fact that the NASA API supports cross-origin resource sharing, all of the website could be engineered through a front-end interface using Javascript, HTML5, and CSS, working in tangent with the JQuery Library. The search function simply collects the words and date range inputted by the user, then passes these arguments as parameters into a GET request to NASA API. The GET request returns a collection and JSON that is parsed through to retrieve the media files and metadata. The file types are all put into a array for adjusting display preferences. Thumbnails for the first 50 files are displayed on the page. When the user clicks on a thumbnail image, the index of that file is sent to a function that display a modal with the source file either displayed as an video or an image, along with a caption that is also retrieved in the JSON from NASA API. If the user inputs gibberish into the search function, they are alerted that no files were found from the NASA API. If the GET request fails completely, they are also notified. 

This was my first exposure to full web development and it was extremely challenging, but also very educational. I learned how Javascript, HTML, and CSS all work together to create the website in terms of what is displayed, how it is displayed, and the actual functionality of the website.

In the future, I would like to accomplish 2 goals:

1. Understand how to use a fluid layout grid for files to maintain aspect ratios of all files. I tried to implement this, however the packages I tried to use did not seem to accomplish the task.

2. Implement a autocorrect function, so that if a user puts in a word that is close to one that is valid in the NASA API, it will consider them equal and display those files instead.


The favicon is made by Dave Gandy from www.flaticon.com 
