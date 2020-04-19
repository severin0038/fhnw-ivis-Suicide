//------------------------1. PREPARATION------------------------//
//-----------------------------SVG------------------------------//

const celebSuicidesTest = svg.append("g")
    .attr("class", "celeb-suicides-test");

//-----------------------------DATA-----------------------------//
const datasetCelebSuicidesTest = d3.csv("./data/test.csv");

datasetCelebSuicidesTest.then(function(data) {
    const heightDomain = d3.extent(data, d => Number(d.Height));

    const xScale = d3.scaleLinear()
        .domain(heightDomain)
        .rangeRound([0,width])
        .nice(5);

    celebSuicidesTest.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.Height))
        .attr("cy", 100)
        .attr("r", 4)
        .style("fill", "red")
        .style("opacity", 0.3)
        .text(d => d.CelebName);
});
