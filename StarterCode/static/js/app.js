// Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

function cardBody(TestSubject) {

    d3.json(url).then(function(samplesdata) {

        let TestSubjectInfo = samplesdata.metadata.filter(results => results.id == TestSubject)[0];

        console.log(TestSubjectInfo);
        // Select the html code section
        data = d3.select("#sample-metadata")

        // clear the data in the sectiom
        data.html("")

        // Write the data
        data.append('tbody').text(`id: ${TestSubjectInfo.id}`);
        data.append('tbody').text(`ethnicity: ${TestSubjectInfo.ethnicity}`);
        data.append('tbody').text(`age: ${TestSubjectInfo.age}`);
        data.append('tbody').text(`location: ${TestSubjectInfo.location}`);
        data.append('tbody').text(`bbtype: ${TestSubjectInfo.bbtype}`);
        data.append('tbody').text(`wfreg: ${TestSubjectInfo.wfreq}`);

    })
       
};

 
function barChart(TestSubject) {
    
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    d3.json(url).then(function(samplesdata) {
        let limitTop = 10; 

        let TestSubjectInfo = samplesdata.samples.filter(results => results.id == TestSubject)[0];

        console.log(samplesdata.samples.filter(results => results.id == TestSubject));
    
        // Assingn Top Ten to variables for ploting
        let values = TestSubjectInfo.sample_values.slice(0,limitTop).reverse();
        let ids = TestSubjectInfo.otu_ids.slice(0,limitTop).map(id => `OTU ${id}`).reverse();
        let labels = TestSubjectInfo.otu_labels.slice(0,limitTop).reverse();

        //console.log(TopTestSubjectInfo);
        //console.log(values);

        // Design the plot
        let to_plot =[{
            type: 'bar',
            x: values,
            y: ids,
            text: labels,
            orientation :'h'
        }];

        let layout = {
            title: `Top 10 OTUs for Test Subject ${TestSubject}`
        }

        // Insert plot into HTML with div id = "bar"
        Plotly.newPlot("bar", to_plot, layout);
    })
};

function bubbleChart(TestSubject) {
    
    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    d3.json(url).then(function(samplesdata) {

        let TestSubjectInfo = samplesdata.samples.filter(results => results.id == TestSubject)[0];

        //console.log(samplesdata.samples.filter(results => results.id == TestSubject));
    
        // Assingn All Data to variables for ploting
        let values = TestSubjectInfo.sample_values;
        let ids = TestSubjectInfo.otu_ids;
        let labels = TestSubjectInfo.otu_labels;

        // Design the plot
        let bubble_plot =[{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: values,
                color: ids,
                colorscale: 'Jet'
            }
        }];

        let bubble_layout = {
            title: `OTUs for Test Subject ${TestSubject}`,
            xaxis: {
                title: "OTU ID"
            },
            height: 600,
            width: 600
        }

        // Insert plot into HTML with div id = "bubble"
        Plotly.newPlot("bubble", bubble_plot, bubble_layout);
    })
};

function init(){

    let dropdownMenu = d3.select("#selDataset");
    
    d3.json(url).then(function(samplesdata){

        let IDs = samplesdata.names;

        let firstId = IDs[0];
        
        console.log(firstId);

        //Append the Drop Down Menu with the IDs
        IDs.forEach(element => {
            dropdownMenu.append("option").text(element).property("value", element);
        });
        
        // Call Function to make graphs with the first ID

        barChart(firstId);
        bubbleChart(firstId);
        cardBody(firstId);

    });
}

function optionChanged(selection){
        
    console.log(`Selecte ID ${selection}`);
    barChart(selection);
    bubbleChart(selection);
    cardBody(selection);

};


init();