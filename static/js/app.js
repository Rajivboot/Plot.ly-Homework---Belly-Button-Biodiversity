// to pull jason file
var data ; 
async function main() {
    const response = await fetch("./samples.json");
    data = await response.json();
    console.log(data)

 //selecting the dropdown to add stuff to it   
let dropdown = document.getElementById ("selDataset")
//creating HTML to add data to drop down from json file. Data is the link to jason
data.names.forEach(number => {
let newOption = document.createElement("option")
newOption.value = number 
newOption.text = number
dropdown.appendChild(newOption)    
});

//calling the functions
buildchart(data.names[0])
build_bubbles(data.names[0])
demoinfo(data.names[0])
gauge(data.names[0])
}

// when u change the drop down it recreate the charts based on user selection
function optionChanged (select){
    buildchart(select)
    build_bubbles(select)
    demoinfo (select)
    gauge(select)
    }

//building charts based on selection
function buildchart (select){
//find sample data for selected users
    let current = data.samples.filter(romeo => romeo.id== select)[0]
console.log (current)
// Creating and defining the bar chart
let barData=[{
x: current.sample_values.slice(0,10).reverse(),
y: current.otu_ids.slice(0,10).reverse().map(id=>`\OTU ${id}`), 
type:"bar",
orientation: "h" ,
text: current.otu_labels
}
]
Plotly.newPlot("bar",barData)
}

function build_bubbles(select){
//find sample data for selected users
    let current = data.samples.filter(romeo => romeo.id== select)[0]
console.log (current)
// create and define bubble chart
let bubbleData = [{
    x: current.otu_ids.reverse().map(id=>`\OTU ${id}`),
    y: current.sample_values.reverse(),
    mode: 'markers',
    marker: {
    size: current.sample_values.reverse(),
    color: current.otu_ids.reverse(),
    colorscale: "Earth" 
  },
    text: current.otu_labels,
    type: "bubble",
}]
Plotly.newPlot("bubble",bubbleData)
}

function demoinfo(select){
    //find metadata for selected users
        let current = data.metadata.filter(romeo2 => romeo2.id== select)[0]
    console.log (current)

     //selecting the dropdown to add stuff to it   
let demobox = document.getElementById ("sample-metadata")
//reset or clearing previous data
demobox.innerHTML=""
//creating HTML to add data to drop down from json file. Data is the link to jason
Object.entries(current). forEach(([k,v]) => {
let newOption = document.createElement("p")
//newOption.value = number 
newOption.innerHTML = `<b>${k}:</b> ${v}`
demobox.appendChild(newOption)    
});

}

function gauge(select){
    //find metadata for selected users
        let current = data.metadata.filter(romeo2 => romeo2.id==select)[0]
    console.log (current)

let gaugedata = [
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: current.wfreq,
		title: { text: "Belly Button Washing Frequency <br>Scrubs Per Week" },
		type: "indicator",
		mode: "gauge+number",
        gauge: {axis:{range:[0,9]},
                steps: [
                    {range:[0,2],color:"rgba(13, 180, 185,0.2)"},
                    {range:[2,4],color:"rgba(13, 180, 185,0.4)"},
                    {range:[4,6],color:"rgba(13, 180, 185,0.6)"},
                    {range:[6,8],color:"rgba(13, 180, 185,0.8)"},
                    {range:[8,9],color:"rgba(13, 180, 185,1)"}
                ]  } 
	}
];

var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
Plotly.newPlot('gauge', gaugedata, layout);
}



main()