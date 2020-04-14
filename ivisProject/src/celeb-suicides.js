//------------------------1. PREPARATION------------------------//
//-----------------------------SVG------------------------------//

const celebSuicides = svg.append("g")
    .attr("class", "celeb-suicides");

// celebSuicides.append("circle")
//     .attr("cx", 50)
//     .attr("cy", height-50)
//     .attr("r", 10)
//     .attr("class","point--celeb");



//-----------------------------DATA-----------------------------//
const datasetCelebSuicides = d3.csv("./data/test.csv");

datasetCelebSuicides.then(function(data) {
    const heightDomain = d3.extent(data, d => Number(d.Height));

    const xScale = d3.scaleLinear()
        .domain(heightDomain)
        .rangeRound([0,width])
        .nice(5);

    celebSuicides.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Height))
        .attr("cy", 50)
        .attr("r", 4)
        .style("fill", "blue")
        .text(d => d.CelebName);
});
