//------------------------1. PREPARATION------------------------//
//-----------------------------SVG------------------------------//
const width = 1500;
const height = 450;
const adj = 30;
// we are appending SVG first
const svg = d3.select("div#chart--googletrend-celebs").append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "-"
        + adj + " -"
        + adj + " "
        + (width + adj *6) + " "
        + (height + adj*3))
    .classed("svg-content", true);

//-----------------------------DATA-----------------------------//
const timeConv = d3.timeParse("%d-%b-%Y");
const dataset = d3.csv("./data/googletrends-suicide.csv");

dataset.then(function(data) {
    var slices = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d){
                return {
                    date: timeConv(d.date),
                    measurement: +d[id]
                };
            })
        };
    });

//----------------------------SCALES----------------------------//
    const xScale = d3.scaleTime().range([0,width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    xScale.domain(d3.extent(data, function(d){
        return timeConv(d.date)}));
    yScale.domain([(0), d3.max(slices, function(c) {
        return d3.max(c.values, function(d) {
            return d.measurement; });
    })
    ]);

//-----------------------------AXES-----------------------------//
    const yaxis = d3.axisLeft()
        .ticks(5)
        .scale(yScale);

    const xaxis = d3.axisBottom()
        .ticks(d3.timeMonth.every(3))
        .tickFormat(d3.timeFormat('%b %Y'))
        .scale(xScale);

//----------------------------LINES-----------------------------//
    const line = d3.line()
        .x(function(d) { return xScale(d.date); })
        .y(function(d) { return yScale(d.measurement); });

    let id = 0;
    const ids = function () {
        return "line-"+id++;
    }

//-------------------------2. DRAWING---------------------------//
//-----------------------------AXES-----------------------------//
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis);

    svg.append("g")
        .attr("class", "axis")
        .call(yaxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", ".75em")
        .attr("y", 6)
        .style("text-anchor", "end")
        .text("Frequency");

//----------------------------LINES-----------------------------//
    const lines = svg.selectAll("lines")
        .data(slices)
        .enter()
        .append("g");

    lines.append("path")
        .attr("class", ids)
        .attr("d", function(d) { return line(d.values); });

    lines.append("text")
        .attr("class","label")
        .datum(function(d) {
            return {
                id: d.id,
                value: d.values[d.values.length - 1]}; })
        .attr("transform", function(d) {
            return "translate(" + (xScale(d.value.date) + 10)
                + "," + (yScale(d.value.measurement) + 5 )+ ")"; })
        .attr("x", 5)
        .text("Google Trends 'suicide'");

});