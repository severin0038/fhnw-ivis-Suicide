// create svg
const svgBipHeight = 600, svgBipWidth = 1000;
const svgBip = d3.select("#chart--suicidrate-bip").append("svg")
    .attr("width", svgBipWidth)
    .attr("height", svgBipHeight)

const marginBIP = {top: 10, right: 10, bottom: 60, left: 80};
const widthBIP = svgBipWidth - marginBIP.left - marginBIP.right;
const heightBIP = svgBipHeight - marginBIP.bottom;

const g = svgBip.append("g")
    .attr("id", "chart-area")
    .attr("transform", "translate(" +marginBIP.left + "," + marginBIP.top + ")");

// text label for the x and y axis
g.append("text")
    .attr("y", heightBIP + marginBIP.bottom / 2)
    .attr("x", widthBIP / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Suizidrate pro 100'000 Einwohner");

g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - marginBIP.left)
    .attr("x",0 - (heightBIP / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("BIP pro Kopf in USD");

// create legends for continents
function createLegend(legendDomain, colorScale) {
    const legendBIP = svgBip.append("g")
        .attr("id", "legend")
        .attr("transform", "translate(" + (svgBipWidth - marginBIP.right - 150) + "," + marginBIP.top + ")")

    const legend_entry = legendBIP.selectAll("rect")
        .data(legendDomain)
        .enter();

    legend_entry.append("rect")
        .attr("x", 10)
        .attr("y", (d,i) => 30 * i + 10)
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d => colorScale(d))

    legend_entry.append("text")
        .attr("x", 40)
        .attr("y", (d,i) => 30 * i + 25)
        .text(d => d);
}


d3.csv("./data/suicide-bip.csv").then(function(data) {
    const heightBIPDomain = d3.extent(data, d => Number(d.Suizidrate));
    const weightBIPDomain = d3.extent(data, d => Number(d.BIP));

    // scales for x direction, y direction and color coding
    const xScaleBIP = d3.scaleLinear()
        .domain(heightBIPDomain)
        .rangeRound([0, widthBIP])
        .nice(5);

    const yScaleBIP = d3.scaleLinear()
        .domain(weightBIPDomain)
        .rangeRound([heightBIP, 0])
        .nice(5);

    const colorScaleBIP = d3.scaleOrdinal(d3.schemeCategory10);

    // x-axis
    const xAxisBIP = d3.axisBottom(xScaleBIP);
    g.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(0, "+ heightBIP +")")
        .call(xAxisBIP);

    // y-axis
    const yAxisBIP = d3.axisLeft(yScaleBIP);
    g.append("g")
        .attr("id", "y-axis")
        .call(yAxisBIP);


    // data-points (circle)
    var data_pointsBIP = g.selectAll("circle")
        .data(data)
        .enter();
    data_pointsBIP.append("circle")
        .style("fill", d=> colorScaleBIP(d["Kontinent"]))
        .attr("cx", 0)
        .attr("cy", heightBIP)
        .attr("r", 4)
        .attr("class", "person_data_point")
        .attr("cx", d=> xScaleBIP(d.Suizidrate))
        .attr("cy", d=> yScaleBIP(d.BIP))
        .attr("r", 4)
    ;

    // legend
    let legendDomainBIP = ["Afrika", "Asien", "Europa", "Nordamerika", "Ozeanien", "Südamerika"];
    createLegend(legendDomainBIP, colorScaleBIP);

    // tooltip
    var tooltipBIP = d3.select("body").append("div").classed("tooltip--bip", true);
    g.selectAll("circle").on("mouseover", (d,i) => {
        tooltipBIP
            .style("left", (d3.event.pageX + 15 + "px"))
            .style("top", (d3.event.pageY + 15 + "px"))
            .style("visibility", "visible")
            .style("position", "absolute")
            .attr("r", 6)
            .style("fill","#880000")
            .html(`<h5>${d["Land"]}</h5>`
                + `<p><span class="tooltip__label">Suizidrate:</span>${d.Suizidrate}</p>`
                + `<p><span class="tooltip__label">BIP:</span>USD ${thousands_separators(d.BIP)}.–</p>`);
    })
        .on("mouseout", (d,i) => {
            tooltipBIP.style("visibility", "hidden");
        });

});


function thousands_separators(num)
{
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    return num_parts.join(".");
}
