### plotly-challenge
# Belly Button Biodiversity

## Overview

The purpose of this challenge is to build an interactive dashboard to explore belly button biodiversity data, which catalogs the microbes that colonize human navels. Several plots are included on the dashboard--a bar chart to show the top 10 OTUs found in the chosen test subject's belly button, a gauge chart to show the washing frequency, and a bubble chart to display each sample found in that individual. There's also some demographic information displayed about that individual test subject. A dropdown list of all test subjects is used to determine which information to display; selecting a test subject ID from the dropdown list updates all the plots on the page.


### Files and Folders

* [Main Page](index.html) - this *index.html* file is the page that opens in the Browser; this page is the dashboard that, when first opened, shows the data for just Test Subject ID 940. Data for different test subjects is show by selecting one of the entries in the *Test Subject ID No.* dropdown on the left side of the dashboard.
* [data](data/) - this folder holds the belly button biodiversity dataset file
    * [samples.json](data/samples.json) - this *JSON* file contains the belly button biodiversity data used to source the dashboard
* [static](static/) - this folder holds two subfolders--css and js
    * [css](static/css/) - this folder holds the *style.css* file that helps format the webpage
    * [js](static/js/) - this folder holds the the *JavaScript* file
        * [app.js](static/js/app.js) - this file contains the *JavaScript* script that manipulates the *HTML* page


## Development and Analysis

### Step 1 - Plotly

We started out with an HTML page that had the `<div>` tags for the various plots and the Demographic Info that needed to be added as well as the `<section>` tags for the dropdown. We also had the *samples.json* file for the data and an empty *app.js* file to hold our script. First I rearranged the files we were given into a little different folder structure. I left the *index.html* file at the root since this needed to be deployed to *GitHubPages*. It seemed like the data file should not be in that root folder so added a *data* folder and moved it there. Created a *static* folder to hold the *css* folder should I need to create a *style.css* file (which I eventually did) and the *js* folder into which I put the *app.js* file.

With the folder structure set and the files moved, next step was to start tackling the code. Got the connection to the data working and pulling. With the dashboard needing to be populated with something when it first opens, created an `init()` function and put the connection information inside that. Since everything in the dashboard revolves around the dropdown list of test subject IDs, the next step was to get that created and populated. Did that by appending `<option>` tags to the `<select>` tags with an id of `selDataset`. Once that was populating, I decided to use the first Test Subject ID as the default when the page opens initially. So captured that value in a variable to be used later in the `init()` function code. 

Then I moved on to the *Demographic Info* section. Was going to make this a table at first glance but an unordered list without the bullets seemed like a better fit so I went that route. I did run into some issues with the text and the margins so ended up resolving that by adding a *style.css* file and putting the style information in there regarding `<ul>` tags. Actually added it directly to the *index.html* file first but when I needed the *CSS* file for the gauge chart, I added the *style.css* file and put the code in there as well.

Next was the top 10 OTUs horizontal bar chart. I sorted the data first in descending order, then sliced out first 10, and then reversed the order once more because *Plotly* bar charts, when horizontal, start from the bottom and work up so the smallest value needed to be first. Had a little bit of trouble getting the size of the bar chart to be taller. But I also wanted to add a title to it to clarify what data was actually being displayed. After adding the title, that ended up occupying some of the blank space at the top.

The bubble chart was added next. This one ended up being a lot more straightforward than the bar chart; less data manipulation. Ran into an issue displaying everything at first. It would show the x-axis and y-axis but no bubbles. After reviewing things in *Google Inspector* and looking through the code, I realized I had used `[]` when creating both the *trace* variable and the *data* variable. Removed those from the *trace* variable definition and the bubbles appeared. I didn't like the colors being used for those, however, I did some googling to see how those could be changed. I stumbled upon the *colorscheme* property in the *Plotly* documentation and even though bubble plots weren't mentioned, I tried applying it anyway and it worked. I used the *Portland* colorscheme because I liked the colors and since this is Portland, it seemed to fit.

That filled out the `init()` function. So still needed to complete the `optionChanged` function that would run when a new Test Subject ID is selected and updates all the plots withe new Test Subject's data. Mainly just copied all the `init()` function steps with the exception of having to change out the default Test Subject ID functionality. I did start creating this function once I got the dropdown list and Demographic Info sections working to make sure changing the Test Subject ID would update what was on the page.


## Advanced Challenge - Gauge Chart

I decided to try doing the gauge chart because I had some time and I wanted to see how to do it. I now know why it was called an *Advanced* challenge. I first went down the path of a *Plotly* gauge chart. It had the right shape but I couldn't find anything about how to add the needle. After much *Google* searching, I came about a few articles about using a pie chart instead. I did find one article that did a good job of breaking it all down except his gauge didn't have as many sections. But most of the code i used was found [here](https://com2m.de/blog/technology/gauge-charts-with-plotly/). That got me most of the way there except the needle wasn't really working as far as I could tell. After adding some *Values* and *Direction* information from [here](https://stackoverflow.com/questions/53211506/calculating-adjusting-the-needle-in-gauge-chart-plotly-js), I was closer but still had the needle barely moving. After thinking it through a bit more, realized that the *wash frequencies* being used were not in degrees, so fixed that by multiplying those by 20 which got the needle pointing to the correct place on the gauge. Searched out a colorscheme and added that. 

The end result is below:

![Images/bb_dashboard.PNG](Images/bb_dashboard.PNG)


## Notes

Set Test Subject ID 940 as the default for when the page opens. It's the first one in the list so seemed like the natural choice to use for the default. That way, when the user uses the dropdown list for the first time, all the choices are listed below instead of potentially having to scroll up the list as well.

I used *newPlot* for each plot in the *optionChanged* function instead of *restyle*. At first it seemed like *restyle* should be used because the plots already existed. But there wasn't anything to update, the underlying data was changing but none of the attributes were, so *newPlot* seemed like the better route.

The gauge is rather small on the dashboard but when I tried to make it larger, it didn't display correctly so I just left it as it.

I'm amazed at how many times I used `console.log()` and the amount of time analyzing results in *Google Inspector*. Both were invaluable for this challenge. Didn't realize how much I was looking at through *Google Inspector* until I was cleaning up my script at the end and having to delete `console.log()` over and over again.
