# plotly-challenge
# Belly Button Biodiversity

## Overview

The purpose of this challenge is to build an interactive dashboard to explore belly button biodiversity data, which catalogs the microbes that colonize human navels. Several plots are included on the dashboard--a bar chart to show the top 10 OTUs found in the chosen test subject's belly button, a gauge chart to show the washing frequency, and a bubble chart to display each sample found in that individual.


### Files and Folders

#### Level 1

* [UFO-level-1](UFO-level-1/) - main folder that holds all the files used and created for the level 1 part of this challenge
    * [Main Page](UFO-level-1/index.html) - this *index.html* file is the page to open in a Browser; the full dataset is displayed when first opening this page. Filtering is applied by adding input in the form on the left side of the page and then clicking the *Filter Table* button
    * [static](UFO-level-1/static/) - this folder holds three subfolders--css, images and js
        * [css](UFO-level-1/static/css/) - this folder holds the *style.css* file that helps format the webpage
        * [images](UFO-level-1/static/images/) - this folder holds the image files used as the background of the header section on the webpage (*PIA23121.jpg*) and the spaceship icon (*ufo.svg*)
        * [js](UFO-level-1/static/js/) - this folder holds the two *JavaScript* files
            * [app.js](UFO-level-1/static/js/app.js) - this file contains the *JavaScript* script that manipulates the *HTML* page and does the filtering
            * [data.js](UFO-level-1/static/js/app.js) - this file contains the UFO sightings data

#### Level 2

* [UFO-level-2](UFO-level-2/) - main folder that holds all the files used and created for the level 2 part of this challenge
    * [Main Page](UFO-level-2/index.html) - this *index.html* file is the page to open in a Browser; the full dataset is displayed when first opening this page. Filtering is applied by adding input in the form on the left side of the page and then clicking the *Filter Table* button
    * [static](UFO-level-2/static/) - this folder holds three subfolders--css, images and js
        * [css](UFO-level-2/static/css/) - this folder holds the *style.css* file that helps format the webpage
        * [images](UFO-level-2/static/images/) - this folder holds the image files used as the background of the header section on the webpage (*nebulla.jpg*) and the spaceship icon (*ufo.svg*)
        * [js](UFO-level-2/static/js/) - this folder holds the two *JavaScript* files
            * [app.js](UFO-level-2/static/js/app.js) - this file contains the *JavaScript* script that manipulates the *HTML* page and does the filtering
            * [data.js](UFO-level-2/static/js/app.js) - this file contains the UFO sightings data



## Development and Analysis

### Level 1 - Date Filtering

We started out with an HTML page that had the filter form section already added as well as the beginnings of a table. Just the first row, or table headings row, was included. The `<tr>` and `<td>` tags still needed to be added based on how many rows of data were in the source file. So that was the first thing I tackled--figuring out how to add those tags and populate them based on and using the data in the *data.js* file. That actually didn't turn out to be too difficult. I did run into an issue in which the `<td>` tags were not nested within the `<tr>` tags but rather were at the same level. With the help of *Google Inspector* I was able to see what was going on and then was able to resolve it. 

Then came the date filtering and how to get that filtered data to appear as the only data in the table. Getting the data filtered was pretty straightforward; it was get that data into the table and as the only data that caused me grief. I tried several different options and did a lot of *Google* searching but was not having much luck. Finally found that I could loop through each row of data and show the row if that row's date matched the input date or hide the row if it didn't. It took a bit to get that working but it was displaying just the filtered rows as required. 

Thinking that was basically solved, started changing the appearance of the webpage. I changed the background image in the top section of the page. I also formatted the *Filter Table* button to look more like a button and to center it. The spaceship icon was added to the button as well. I had wanted to try adding an icon in another challenge but ran out of time and with the icon already appearing in the header, this seemed like the perfect opportunity. I wanted to change the background color of the table section but figured I'd get to that if time allowed. 

At this point I moved on to the *Level 2* challenge. However, later I re-read the rubric and saw that the table should re-render with the filtered data. The way I solved it didn't re-render the table, it just hid non-matching rows. So I ended up reworking things, scrapped the hide/show rows approach, and figured out how to get the table re-renedered with just the filtered data. The end result is below:

![images/level1_page.png](images/level1_page.PNG)


## Notes

I created two separate versions of this--one for each level--mainly so that if I got the date working and was adding the other filters but that ended up breaking things, I'd at least have the date one, the required one, working.

The two images I used in the top sections of the webpages were from [NASA's JPL](https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars) site. Decided to use two different images partly to keep the two webpages separate visually but mainly because it was too hard to choose just one image.

I put sample text in each of the filter input boxes. It probably only needed to be in the *Enter a Date* one to show the date format needed but then I figured it would also show that *Enter a Country* was looking for just 2 characters and *Enter a State* used the state abbreviation, not the state name. So I just left them all showing sample text. I should have made the actual entered values a different color or at least darker to contrast better with the sample values. Right now it's a little difficult to tell which ones were manually entered and which ones are just for show. Time just wasn't on my side for this challenge.

The input boxes are case-sensitive so all text needs to be lowercase.

I wish I had more time to format both pages more. But functionality took priority on this challenge.

I really found the value of the *Google Inspector* through this challenge. It helped me immensely figure out where things were going astray and what types of values or what actual values it was returning, if any at all.
