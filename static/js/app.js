function init() {
  // Get the data
  d3.json("./data/samples.json").then((data) => {
    console.log(data);

      // Grab values from the data json object to build the plots
      var names = data.names;
      var metadata = data.metadata;
      var samples = data.samples;
      // var endDate = data.dataset.end_date;
      // var dates = unpack(data.dataset.data, 0);
      // var closingPrices = unpack(data.dataset.data, 4);

      // Setting the page to open using the first test subject id
      var defaultID = names[0];
  
      console.log(names);
      console.log(defaultID);
      console.log(metadata);
      console.log(samples[0]);

      // Build Test Subject dropdown
      // d3.select("body").append("p").text("one").attr("id","p_1");
      var dropdownList = d3.selectAll("#selDataset")
        .selectAll("option")
        .data(names)
        .enter()
        .append("option")
        .attr("value", d => d)
        .text(d => d);

      // Populate Demographic Table

      // Loop through the metadata and return just the row matching the dropdown value
      metadata.forEach(row => {
        if (row.id === parseInt(defaultID)) {
            console.log(row);
            var sampleDiv = d3.selectAll("#sample-metadata")
            var ulTag = sampleDiv.append("ul");
            //for (const [key, value] of Object.entries(row)) {
              Object.entries(row).forEach(([key, value]) =>
                ulTag.append("li").text(`${key}: ${value}`) 
                
              );
              
              //console.log(`${key}: ${value}`);
          }
        //}
      });
      // var filteredData = metadata.filter(id => id === parseInt(defaultName));
      //   console.log(filteredData);



     // got help on this dropdown from https://www.aspsnippets.com/Articles/Populate-DropDownList-from-JSON-Array-using-JavaScript.aspx
      // var selectDatatset = document.getElementById("selDataset");

      // // Add option tags for each name in dataset
      // for (var i = 0; i < names.length; i++) {
      //   var option = document.createElement("OPTION");

      //   // Add the test subjects as the text
      //   option.textContent = names[i];
      //   console.log(option.textContent);

      //   // Add the test subjects as the value
      //   option.value = option.textContent;
      //   console.log(option.value);

      //   // Add the option tags
      //   selectDatatset.options.add(option);


      // Horizontal Bar plot
      // Get x axis data
      var sampleValues = samples[0].sample_values
        // Sort values in descending order
        .sort((a, b) => b - a)
        // Get the top 10 highest values
        .slice(0, 10)
        // Reverse the order so they get plotted correctly 
        .reverse();
        console.log(sampleValues);

      // Get the y axis data
      // Create a new array that concatenates OTU to the beginning of each otu_id
      var otuLabels = samples[0].otu_ids.map(d => `OTU ${d}`)
        // Get the first 10
        .slice(0,10)
        // Reverse the order for plotting
        .reverse();
          console.log(otuLabels);

      // Hovertext
      var otuHover = samples[0].otu_labels.slice(0,10).reverse();
       console.log(otuHover);

      var layout = {
        //title: `ID ${defaultID} Data`,
        yaxis: {
            autorange: true,
        },
        xaxis: {
            autorange: true,
        },
    };
        // Create the trace including orientation so the bar chart is horizontal
        var trace1 = {
          type: 'bar',
          x: sampleValues,
          y: otuLabels,
          text: otuHover,
          orientation: 'h'
        };
        
        var data = [trace1];

        // Create the bar plot
        Plotly.newPlot("bar", data, layout);

        








        // Bubble Plot

        // var trace1 = {
        //   x: [1, 2, 3, 4],
        //   y: [10, 11, 12, 13],
        //   text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        //   mode: 'markers',
        //   marker: {
        //     color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //     size: [40, 60, 80, 100]
        //   }
        // };
        
        // var data = [trace1];
        
        // var layout = {
        //   title: 'Bubble Chart Hover Text',
        //   showlegend: false,
        //   height: 600,
        //   width: 600
        // };
        
        // Plotly.newPlot('myDiv', data, layout);

      });











   
   
   
   
    //  Create the Traces
    // var trace1 = {
    //   x: data.organ,
    //   y: data.survival.map(val => Math.sqrt(val)),
    //   type: "box",
    //   name: "Cancer Survival",
    //   boxpoints: "all"
    // };
  
    // // Create the data array for the plot
    // var data = [trace1];
  
    // // Define the plot layout
    // var layout = {
    //   title: "Square Root of Cancer Survival by Organ",
    //   xaxis: { title: "Organ" },
    //   yaxis: { title: "Square Root of Survival" }
    // };
  
    // // Plot the chart to a div tag with id "plot"
    // Plotly.newPlot("plot", data, layout);
  //})
};

function optionChanged() {

   // Prevent the page from refreshing
   //d3.event.preventDefault();
    // Get the data
  d3.json("./data/samples.json").then((data) => {
    console.log(data);

      // Grab values from the data json object to build the plots
      var names = data.names;
      var metadata = data.metadata;

    // Use D3 to select the dropdown menu
    var testSubject = d3.select("#selDataset").node().value;
    // Assign the value of the dropdown menu option to a variable
    //var testSubject = dropdownMenu.property("value");
      console.log(testSubject)

    // Loop through the metadata and return just the row matching the dropdown value
    metadata.forEach(row => {
      if (row.id === parseInt(testSubject)) {
          console.log(row);
          var sampleDiv = d3.selectAll("#sample-metadata")
          // Clear out the previous test subject's data
          sampleDiv.html("");
          var ulTag = sampleDiv.append("ul");
          //for (const [key, value] of Object.entries(row)) {
            Object.entries(row).forEach(([key, value]) =>
              ulTag.append("li").text(`${key}: ${value}`) 
              
            );
            
            //console.log(`${key}: ${value}`);
        }
      //}
    });


          // Bar plot

        // var data = [{
        //   type: 'bar',
        //   x: [20, 14, 23],
        //   y: ['giraffes', 'orangutans', 'monkeys'],
        //   orientation: 'h'
        // }];
        
        // Plotly.restyle('myDiv', data);


        // Bubble Plot

        // var trace1 = {
        //   x: [1, 2, 3, 4],
        //   y: [10, 11, 12, 13],
        //   text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
        //   mode: 'markers',
        //   marker: {
        //     color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        //     size: [40, 60, 80, 100]
        //   }
        // };
        
        // var data = [trace1];
        
        // var layout = {
        //   title: 'Bubble Chart Hover Text',
        //   showlegend: false,
        //   height: 600,
        //   width: 600
        // };
        
        // Plotly.restyle('myDiv', data, layout);

  });
};

init();
  