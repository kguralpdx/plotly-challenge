function buildDropdown() {
  // Get the data
  d3.json("data/samples.json").then((data) => {
    console.log(data);

      // Grab values from the data json object to build the plots
      var names = data.names;
      // var stock = data.dataset.dataset_code;
      // var startDate = data.dataset.start_date;
      // var endDate = data.dataset.end_date;
      // var dates = unpack(data.dataset.data, 0);
      // var closingPrices = unpack(data.dataset.data, 4);
  
      console.log(names);

     // d3.select("#selDataset").selectAll("option").data()
      var selectDatatset = document.getElementById("selDataset");

      // Add option tags for each name in dataset
      for (var i = 0; i < names.length; i++) {
        var option = document.createElement("OPTION");

        // Add the test subjects as the text
        option.textContent = names[i];
        console.log(option.textContent);

        // Add the test subjects as the value
        option.value = option.textContent;
        console.log(option.value);

        // Add the option tags
        selectDatatset.options.add(option);

      };


















   
   
   
   
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
  })
};

buildDropdown();
  