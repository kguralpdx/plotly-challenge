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
  
      // console.log(names);
      // console.log(defaultID);
      // console.log(metadata);
      // console.log(samples[0]);

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
      var washFreq;
      metadata.forEach(row => {
        if (row.id === parseInt(defaultID)) {
            //console.log(row);
            washFreq = row.wfreq;
            var sampleDiv = d3.selectAll("#sample-metadata")
            var ulTag = sampleDiv.append("ul");
            //for (const [key, value] of Object.entries(row)) {
              Object.entries(row).forEach(([key, value]) =>
                ulTag.append("li").text(`${key}: ${value}`) 
              );
          }
        //}
      });
      console.log(washFreq);
      //  var filteredData = metadata.filter(id => id === parseInt(defaultID));
      //    console.log(filteredData);



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
        //console.log(sampleValues);

      // Get the y axis data
      // Create a new array that concatenates OTU to the beginning of each otu_id
      var otuLabels = samples[0].otu_ids.map(d => `OTU ${d}`)
        // Get the first 10
        .slice(0,10)
        // Reverse the order for plotting
        .reverse();
          //console.log(otuLabels);

      // Hovertext
      var otuHover = samples[0].otu_labels.slice(0,10).reverse();
       //console.log(otuHover);

      var layout = {
        title: `Top 10 OTUs for Test Subject ID ${defaultID}`,
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
      // Get x values
      var otuidBB = samples[0].otu_ids

      // Get y values
      var sampleBB = samples[0].sample_values

      // Get text values
      var otulabelsBB = samples[0].otu_labels

      var trace = {
        type: "scatter", 
        x: otuidBB,
        y: sampleBB,
        text: otulabelsBB,
        mode: 'markers',
        marker: {
          color: otuidBB,
          size: sampleBB,
          colorscale: "Portland"
        }
      };
      
      var data = [trace];
      
      var layout = {
        title: `Prevalence of Microbes for Test Subject ID ${defaultID}`,
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', data, layout);


      // Gauge Chart

     // console.log(row.wfreq);
      
      var data = [
       {
        type: "indicator",
        mode: "gauge",
        value: washFreq,
       // domain: {x: [0,1], y: [0,1]},
        title: { text: "Belly Button Washing Frequency<br>Scrubs per Week"},
        subtitle: {text: "Scrubs per Week"},
        //title: { text: "Belly Button Washing Frequency", font: { size: 24 }},
        //subtext: { text: "Scrubs per Week" },
          gauge: {
            axis: [
              {range: [0, 9]},
            ],  

      //       bar: { color: "darkblue" },
      //       bgcolor: "white",
      //       borderwidth: 2,
      //       bordercolor: "gray",
            steps: [
               { range: [0, 1], color: "dodgerblue" },
               { range: [1, 2], color: "royalblue" },
               { range: [2, 3], color: "royalblue" },
               { range: [3, 4], color: "royalblue" },
               { range: [4, 5]},//, color: "royalblue" },
               { range: [5, 6]},//, color: "royalblue" },
               { range: [6, 7]},//, color: "royalblue" },
               { range: [7, 8]},//, color: "royalblue" },
               { range: [8, 9]}//, color: "royalblue" }
            ],
      //       threshold: {
      //         line: { color: "red", width: 4 },
      //         thickness: 0.75,
      //         value: 490
      //       }
           }
        }
      ];
      
      var glayout = {
         width: 500,
         height: 400,
         margin: { t: 25, r: 25, l: 25, b: 0 },
         font: { color: "black", family: "Arial" }
       };
      
      Plotly.newPlot('gauge', data, glayout);

  });
};

function optionChanged() {

   // Prevent the page from refreshing
   //d3.event.preventDefault();
  // Get the data
  d3.json("./data/samples.json").then((data) => {
    //console.log(data);

    // Grab values from the data json object to build the plots
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;

    // Use D3 to select the dropdown menu and assign it to a variable
    var testSubject = d3.select("#selDataset").node().value;
    // Assign the value of the dropdown menu option to a variable
    //var testSubject = dropdownMenu.property("value");
      //console.log(testSubject)

    // Loop through the metadata and return just the row matching the dropdown value
    metadata.forEach(row => {
      if (row.id === parseInt(testSubject)) {
          //console.log(row);
          var sampleDiv = d3.selectAll("#sample-metadata")
          // Clear out the previous test subject's data
          sampleDiv.html("");
          var ulTag = sampleDiv.append("ul");
          //for (const [key, value] of Object.entries(row)) {
            Object.entries(row).forEach(([key, value]) =>
              ulTag.append("li").text(`${key}: ${value}`) 
            );
        }
      //}
    });

    samples.forEach(sample => {
      if (sample.id === (testSubject)) {
        //console.log(sample);

      // Horizontal Bar plot
      var sampleValues = sample.sample_values
        // Sort values in descending order
        .sort((a, b) => b - a)
        // Get the top 10 highest values
        .slice(0, 10)
        // Reverse the order so they get plotted correctly 
        .reverse();
          //console.log(sampleValues);

      // Get the y axis data
      // Create a new array that concatenates OTU to the beginning of each otu_id
      var otuLabels = sample.otu_ids.map(d => `OTU ${d}`)
        // Get the first 10
        .slice(0,10)
        // Reverse the order for plotting
        .reverse();
          //console.log(otuLabels);

      // Hovertext
      var otuHover = sample.otu_labels.slice(0,10).reverse();
        //console.log(otuHover);

      var layout = {
        title: `Top 10 OTUs for Test Subject ID ${testSubject}`,
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
        // Get x values
        var otuidBB = sample.otu_ids

        // Get y values
        var sampleBB = sample.sample_values

        // Get text values
        var otulabelsBB = sample.otu_labels

        var trace = {
          type: "scatter", 
          x: otuidBB,
          y: sampleBB,
          text: otulabelsBB,
          mode: 'markers',
          marker: {
            color: otuidBB,
            size: sampleBB,
            colorscale: "Portland"
          }
        };
        
        var data = [trace];
        
        var layout = {
          title: `Prevalence of Microbes for Test Subject ID ${testSubject}`,
          showlegend: false,
          height: 600,
          width: 1200
        };
        
        Plotly.newPlot('bubble', data, layout);
      }
    });

  });
};

init();
  