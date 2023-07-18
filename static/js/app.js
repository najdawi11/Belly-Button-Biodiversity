    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it

d3.json(url).then(function(data) {
  console.log(data);
});
// Initialize the dashboard at start up 
function init() {

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Use D3 to get sample names and populate the drop-down selector
  d3.json(url).then((data) => {
      
      // Set a variable for the sample names
      let names = data.names;

      // Add  samples to dropdown menu
      names.forEach((idNumber) => {

          // Log the value of id for each iteration of the loop
          console.log(idNumber);

          dropdownMenu.append("option")
          .text(idNumber)
          .property("value",idNumber);
      });

      // Set the first sample from the list
      let sampleInit = names[0];

      // Log the value of sample_one
      console.log(sampleInit);

      // Build the initial plots
      buildMetadata(sampleInit);
      buildBarChart(sampleInit);
      buildBubbleChart(sampleInit);
      buildGaugeChart(sampleInit);

  });
};

// Function that populates metadata info
function buildMetadata(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the value of the sample
      let value = metadata.filter(result => result.id == sample);

      // Log the array of metadata objects after the have been filtered
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to add each key/value pair to the panel
      Object.entries(valueData).forEach(([key,value]) => {

          // Log the individual key/value pairs as they are being appended to the metadata panel
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};

// Function that builds the bar chart
function buildBarChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all sample data
      let sampleInfo = data.samples;

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let xticks = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      // Set up the trace for the bar chart
      let trace = {
          x: xticks,
          y: yticks,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      // Set up layout
      let layout = {
        title: "<b>Top 10 OTUs"
      }

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout)
  });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {
      
      // Retrieve all sample data
      let sampleInfo = data.samples;

      // Filter based on the value of the sample
      let value = sampleInfo.filter(result => result.id == sample);

      // Get the first index from the array
      let valueData = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = valueData.otu_ids;
      let otu_labels = valueData.otu_labels;
      let sample_values = valueData.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);
      
      // Set up the trace for bubble chart
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
          }
      };

      // Set up the layout
      let layout = {
          title: "<b>Bacteria Present Per Sample",
          xaxis: {title: "OTU ID"}
      };

      // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", [trace1], layout)
  });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

  // Log the new value
  console.log(value); 

  // Call all functions 
  buildMetadata(value);
  buildBarChart(value);
  buildBubbleChart(value);
  buildGaugeChart(value);
};

// Call the initialize function
init();

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Initialize the dashboard at start up 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        // Build the initial plots
        buildGaugeChart(sample_one);
    });
};

// Function that builds the gauge chart
function buildGaugeChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Use Object.entries to get the key/value pairs and put into the demographics box on the page
        let washFrequency = Object.values(valueData)[6];
        
        // Set up the trace for the gauge chart
        let trace2 = {
            value: washFrequency,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 16}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "maroon"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, 0.5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, 0.5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, 0.5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, 0.5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, 0.5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , 0.5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, 0.5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(14, 127, 0, 0.5)"},
                ],
                threshold: {
                  line: { color:"red", width: 4},
                  thickness: 0.75,
                  value: 10
                }
            } 
        };

        // Set up the Layout
        let layout = {
            width: 420, 
            height: 420,
            margin: {t: 0, b:0}
        };

        // Call Plotly to plot the gauge chart
        Plotly.newPlot("gauge", [trace2], layout)
    });
};

// Call the initialize function
init();