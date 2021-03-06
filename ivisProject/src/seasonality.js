const div = d3.select('#chart--seasonality');
const width_seasonality = 1200;
const height_seasonality = 450;

d3.csv("./data/suicides-seasonality-males.csv").then(function(data) {

    const svg_seasonality = div.append('svg')
        .attr('width', width_seasonality + 50)
        .attr('height', height_seasonality + 30)
        .append('g')
        .attr('transform', `translate(40,5)`);

    /*
     * X and Y scales.
     */
    const xScale = d3.scaleLinear()
        .domain([0, 3])
        .range([50, width_seasonality]);

    const xScaleQuarter = d3.scalePoint()
        .domain(["Q1", "Q2", "Q3", "Q4"])
        .range([50, width_seasonality]);

    const yScale = d3.scaleLinear()
        .domain([500, 1100])
        .range([height_seasonality, 0]);

    /*
     * The function that describes how the line is drawn.
     * Notice that we apply the xScale and yScale to the
     * data in order to keep the data in bounds to our scale.
     */
    const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

    /*
     * X and Y axis
     */

    const xAxis = d3.axisBottom()
        .ticks(3)
        .scale(xScaleQuarter);

    svg_seasonality.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${height_seasonality})`)
        .call(xAxis)

    const yAxis = d3.axisLeft()
        .ticks(10)
        .scale(yScale);

    svg_seasonality.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    /*
     * Appending the lines to the SVG.
     */

    var average = [];
    for(var i=0; i<Object.values(data[i]).length-1; i++) {
        average[i] = 0;
    }

    for(var i=0; i<data.length ;i++) {
        svg_seasonality.append('path')
            .datum(Object.values(data[i]).slice(1))
            .style('stroke', '#880000')
            .style('stroke-width', 1)
            .style('fill', 'none')
            .attr('d', line)
            .attr('class', Object.values(data[i])[0]);

        /* average calculation */
        for(var j=0; j<Object.values(data[i]).length-1; j++) {
            average[j] += parseInt(Object.values(data[i]).slice(1)[j]);
        }
    }

    /* average calculation */
    for(var i=0; i<average.length; i++) {
        average[i] = average[i]/data.length;
    }

    /* appending the average line to the SVG */
    svg_seasonality.append('path')
        .datum(average)
        .style('stroke', '#880000')
        .style('stroke-width', 6)
        .style('stroke-dasharray', "30, 10")
        .style('fill', 'none')
        .attr('d', line)
        .attr('class', 'average')

});