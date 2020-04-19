const datasetCelebSuicides = d3.csv("./data/celeb-suicides.csv");

datasetCelebSuicides.then(function(data) {
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
        .attr("cy", height-30)
        .attr("r", 4)
        .attr("class","point")
        .style("opacity", .5)
        .text(function(d) { return d.name; });

});