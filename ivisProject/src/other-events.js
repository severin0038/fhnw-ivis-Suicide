
svg.append("g")
    .attr("id", "events");


const trailerSuicideSquad = d3.select("#events")
    .append("g")
    .attr("class", "event--suicidesquad");

trailerSuicideSquad.append("circle")
    .attr("r", 4)
    .attr("cx", 72)
    .attr("cy", 210)
    .attr("fill", '#880000');

trailerSuicideSquad.append("text")
    .text("Trailer des Films Suicide Squad")
    .attr("transform", "translate(87, 215)")
    .attr("class", "eventlabel");

const suicideSquad = d3.select("#events")
    .append("g")
    .attr("class", "event--suicidesquad");

suicideSquad.append("circle")
    .attr("r", 4)
    .attr("cx", 405)
    .attr("cy", 5)
    .attr("fill", '#880000');

suicideSquad.append("text")
    .text("Veröffentlichung des Films Suicide Squad")
    .attr("transform", "translate(420, 10)")
    .attr("class", "eventlabel");