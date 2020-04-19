//------------------------1. PREPARATION------------------------//
//-----------------------------SVG------------------------------//
const width = 1500;
const height = 500;
const margin = 5;
const padding = 5;
const adj = 30;
// we are appending SVG first
const svg = d3.select("div#container").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
        + adj + " -"
        + adj + " "
        + (width + adj *3) + " "
        + (height + adj*3))
    .style("padding", padding)
    .style("margin", margin)
    .classed("svg-content", true);

const timeConv = d3.timeParse("%d-%b-%Y");
const dataset = d3.csv("./data/testFile.csv");

dataset.then(function(data) {
    var slices = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d){
                return {
                    date: timeConv(d.date),
                    name: d.celebName
                };
            })
        };
    });

    const xScale = d3.scaleTime().range([0,width]);
    xScale.domain(d3.extent(data, function(d){
        return timeConv(d.date)}));


    const celebSuicides = svg.selectAll()
        .data(slices)
        .enter()
        .append("g")
        .attr("class", "celeb-suicides");

    celebSuicides.selectAll("points")
        .data(function(d) {return d.values})
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.date); })
        .attr("cy", 50)
        .attr("r", 3)
        .attr("class","point")
        .style("opacity", 1)
        .text(function(d) { return d.name; });

});