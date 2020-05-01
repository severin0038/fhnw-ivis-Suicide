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
        .attr("cy", height-35)
        .attr("r", 4)
        .attr("class","point")
        .style("opacity", .5)
        .text(function(d) { return d.name; });

    //---------------------------TOOLTIP----------------------------//
    const tooltipCeleb = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute");

    //---------------------------EVENTS-----------------------------//
    celebSuicides.selectAll("circles")
        .data(function(d) { return(d.values); } )
        .enter()
        .append("circle")
        .attr("cx", function(d) { return xScale(d.date); })
        .attr("cy", height-35)
        .attr('r', 10)
        .style("opacity", 0)
        .on('mouseover', function(d) {
            tooltipCeleb.transition()
                .delay(30)
                .duration(200)
                .style("opacity", 1);
            tooltipCeleb.html(d.name)
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY + 10) + "px");
            const selection = d3.select(this).raise();
            selection
                .transition()
                .delay("20")
                .duration("200")
                .attr("r", 6)
                .style("opacity", 1)
                .style("fill","#880000");
        })
        .on("mouseout", function(d) {
            tooltipCeleb.transition()
                .duration(100)
                .style("opacity", 0);
            const selection = d3.select(this);
            selection
                .transition()
                .delay("20")
                .duration("200")
                .attr("r", 10)
                .style("opacity", 0);
        });


});