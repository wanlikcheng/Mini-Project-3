
const margin = ({top: 20, right: 40, bottom: 50, left: 80})

const width = 550 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

var svg2 = d3.select(".scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height+ margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// adding labels
svg2.append("text")
        .attr("class", "xlabel")
        .attr('x', width - 60)
        .attr('y', height + 30)
        .attr("alignment-baseline", "baseline")
        .text("Year")

svg2.append("text")
        .attr("class", "ylabel")
        .attr('x', 10)
        .attr('y', 5)
        .attr("alignment-baseline", "baseline")
        .text("Gross Profit")


var xScale = d3.scaleLinear()
    .range([0, width])

var yScale = d3.scaleLinear()
    .range([height, 0])

var xAxis = d3.axisBottom()
    .ticks(5, "s")

var yAxis = d3.axisLeft()

var xAxisGroup = svg2.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)

var yAxisGroup = svg2.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(0, ${0})`)



function genreChart(data, genre){
    console.log("chosenGenre", genre);
    d3.csv("imdb_top_1000.csv", d3.autoType)
        .then(data => {

    
    var datafilter = data.filter(function(d) {
        if(d["Genre"] == genre){
            return d;
        }
    })
    datafilter.forEach(function(d){
        d.Released_Year = +d.Released_Year;
        d.Gross = +d.Gross;
        d.IMDB_Rating = +d.IMDB_Rating;
    })

    //datafilter = data.filter(d=> d.Gross != null)
    //datafilter = data.filter(d=> d.Gross != 0)

    
    
    console.log("genreFiltered", datafilter);

    xScale.domain(d3.extent(datafilter, d => d.Released_Year)).nice()
    yScale.domain(d3.extent(datafilter, d => d.Gross)).nice()

    svg2.selectAll("circle")
            .data(datafilter)
            .attr("cx", d => xScale(d.Released_Year))
            .attr("cy", d => yScale(d.Gross))
            .attr("r", 5)
            .attr("class","circle")
            .attr("fill", "white")
            .attr("opacity", 0.6)
            .attr("stroke", "black")
            .on("mouseover", function(event, d) {
                //Update the tooltip position and value

                const pos = d3.pointer(event, window)
                
                d3.select('#tooltip2')
                    .classed("hidden", false)
                    .style('display', 'block')
                    .style('left', (pos[0] - margin.left) + "px")
                    .style('top', (pos[1] - margin.bottom - margin.top) + 'px')
                    .html(`
                        <div> Movie: ${d.Series_Title} </div>
                        <div> Rating: ${d.IMDB_Rating} </div>
                        <div> Gross Profit: ${d3.format(",")(d.Gross)} </div>
                        `
                    );
                /*
                d3.select("#tooltip3")
                    .style("left", d3.select(this).attr("cx") + "px")
                    .style("top", d3.select(this).attr("cy") + "px")
                    .text(d.Series_Title);
                    console.log(d.Series_Title);
                    console.log(d.Gross);
                */
                //Show the tooltip
                //d3.selectAll('.circle').style('fill', 'blue');
                //d3.select(this).style("fill", "#9B111E");
    
                console.log("mouseoverred scatter");
            })
            .on("mouseout", function(d) {
                //Hide the tooltip
                d3.select("#tooltip2").classed("hidden", true);
                d3.select("#tooltip2").style("display", "none");
               // d3.selectAll('.circle').style('fill', 'white');
            })
            .exit().remove()
        
    svg2.selectAll("text")
            .data(datafilter)
            .enter()
            .append("text")
            .text(d => d.year)
            .attr("x", d => xScale(d.Released_Year))
            .attr("y", d => yScale(d.Gross))
            .attr("font-size", 10)

    xAxis.scale(xScale)
    yAxis.scale(yScale)

    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

})}
//release year and rating scatterplot

const width2 = 550 - margin.left - margin.right;
const height2 = 500 - margin.top - margin.bottom;

var svg3 = d3.select(".scatterplot2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height+ margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// adding labels
svg3.append("text")
        .attr("class", "xlabel")
        .attr('x', width2 - 60)
        .attr('y', height2 +30)
        .attr("alignment-baseline", "baseline")
        .text("Year")

svg3.append("text")
        .attr("class", "ylabel")
        .attr('x', 10)
        .attr('y', 5)
        .attr("alignment-baseline", "baseline")
        .text("IMDB Rating")


var xScale2 = d3.scaleLinear()
    .range([0, width2])

var yScale2 = d3.scaleLinear()
    .range([height2, 0])

var xAxis2 = d3.axisBottom()
    .ticks(5, "s")

var yAxis2 = d3.axisLeft()

var xAxisGroup2 = svg3.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height2})`)

var yAxisGroup2 = svg3.append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(0, ${0})`)



function genreChart2(data, genre){
    console.log("chosenGenre", genre);
    d3.csv("imdb_top_1000.csv", d3.autoType)
        .then(data => {

    
    var datafiltered = data.filter(function(d) {
        if(d["Genre"] == genre){
            return d;
        }
    })
    datafiltered.forEach(function(d){
        d.Released_Year = +d.Released_Year;
        d.IMDB_Rating = +d.IMDB_Rating;
    })

    //datafilter = data.filter(d=> d.Gross != null)
    //datafilter = data.filter(d=> d.Gross != 0)

    
    
    console.log("ratingsFiltered", datafiltered);

    xScale2.domain(d3.extent(datafiltered, d => d.Released_Year)).nice()
    yScale2.domain(d3.extent(datafiltered, d => d.IMDB_Rating)).nice()

    svg3.selectAll("circle")
            .data(datafiltered)
            .attr("cx", d => xScale2(d.Released_Year))
            .attr("cy", d => yScale2(d.IMDB_Rating))
            .attr("r", 5)
            .attr("class","circle2")
            .attr("fill", "white")
            .attr("opacity", 0.6)
            .attr("stroke", "black")
            .on("mouseover", function(event, d) {
                //Update the tooltip position and value

                const pos = d3.pointer(event, window)
                
                d3.select('#tooltip3')
                .classed("hidden", false)
                .style('display', 'block')
                .style('left', (pos[0] - margin.left) + "px")
                .style('top', (pos[1] - margin.bottom - margin.top) + 'px')
                .html(`
                    <div> Movie: ${d.Series_Title} </div>
                    <div> Rating: ${d.IMDB_Rating} </div>
                    <div> Gross Profit: ${d3.format(",")(d.Gross)} </div>
                    `
                );
                /*
                d3.select("#tooltip3")
                    .style("left", d3.select(this).attr("cx") + "px")
                    .style("top", d3.select(this).attr("cy") + "px")
                    .text(d.Series_Title);
                    console.log(d.Series_Title);
                    console.log(d.Gross);
                */
                //Show the tooltip
                //d3.selectAll('.circle').style('fill', 'blue');
                //d3.select(this).style("fill", "#9B111E");
    
                console.log("mouseoverred scatter");
            })
            .on("mouseout", function(d) {
                //Hide the tooltip
                d3.select("#tooltip3").classed("hidden", true);
                d3.select("#tooltip3").style("display", "none");
               // d3.selectAll('.circle').style('fill', 'white');
            })
            .exit().remove()
        
    svg3.selectAll("text")
            .data(datafiltered)
            .enter()
            .append("text")
            .text(d => d.year)
            .attr("x", d => xScale2(d.Released_Year))
            .attr("y", d => yScale2(d.IMDB_Rating))
            .attr("font-size", 10)

    xAxis2.scale(xScale2)
    yAxis2.scale(yScale2)

    xAxisGroup2.call(xAxis2)
    yAxisGroup2.call(yAxis2)

    //svg2.exit().remove();

})}




//barchart.js insert for test
let movieData;
let data;
let clicked;
d3.csv("genres.csv", d3.autoType).then(data=>{
    d3.csv("imdb_top_1000.csv", d3.autoType).then(movieData => {

        // display plots
        genreChart(movieData,null);
        genreChart2(movieData,null);

        console.log("Movie data: ", data);
        //movieData = data;

        // margin
        const margin = ({top: 40, right: 40, bottom: 40, left: 40})

        const width = 750 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

        const svg = d3.select(".barchart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // scales
        const xScale = d3.scaleBand()
            .domain(data.map(function(d) {
                return d.genre;
            }))
            .range([0, width]) 
            .paddingInner(0.1)

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(d3.extent(data, d => d.count))])
            .range([height, 0])

        // creating bars
        let bars = svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return xScale(d.genre);
            })
            .attr("y", function(d) {
                return yScale(d.count);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return height - yScale(d.count);
            })
            .on("mouseover", function(event, d) {
                //Get this bar's x/y values, then augment for the tooltip
                
                let xPosition =
                    margin.left +
                    width / 3 +
                    parseFloat(d3.select(this).attr("x")) +
                    xScale.bandwidth() / 2;

                let yPosition =
                    parseFloat(d3.select(this).attr("y")) / 3 + 200;

                //Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.count);

                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
                //hover color added (it stopped working for me thru the css)
                d3.selectAll('.bar').style('fill', 'red');
                d3.select(this).style("fill", "#9B111E");

            })
            .on("mouseout", function(d) {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
                d3.selectAll('.bar').style('fill', 'red'); //had to add bc hover color did not leave otherwise
            })
            //changes color of clicked bar-- calls the genreChart function for scatter plot
            .on("click", function(event, d){
                //d3.select("svg2").remove();
                clicked = d.genre;
                
                d3.select("#barchart")
                    .attr("fill", function () { return "rgb(0, 0, " + Math.round(d * 10) + ")"; });
               
                d3.selectAll('.bar').style('fill', 'red');
                d3.select(this).style("fill", "#012B4E");

                movieData = movieData.filter(d=> d.Gross != null)
                
                svg2.selectAll("circle")
                    .data(movieData)
                    .enter()
                    .append("circle")
                    .attr("cx", d => xScale(d.Released_Year))
                    .attr("cy", d => yScale(d.Gross))
                    .attr("r", 5)
                    .attr("fill", "white")
                    .attr("opacity", 0.6)
                    .attr("stroke", "black")
                svg3.selectAll("circle")
                    .data(movieData)
                    .enter()
                    .append("circle")
                    .attr("cx", d => xScale(d.Released_Year))
                    .attr("cy", d => yScale(d.IMDB_Rating))
                    .attr("r", 5)
                    .attr("fill", "white")
                    .attr("opacity", 0.6)
                    .attr("stroke", "black")
                    
                genreChart(movieData,clicked);
                genreChart2(movieData,clicked);
                var active   = clicked.active ? false : true;

                //could use different opacities to display instead

               //newOpacity = active ? 0 : 1;
                //d3.select(".scatterplot").style("opacity",newOpacity);
                clicked.active = active;
                //genreChart(data, clicked);
               
               console.log("clicked", clicked);

            });

        // using axis
        const xAxis = d3.axisBottom()
	        .scale(xScale)
            .ticks(5, "s")

        const yAxis = d3.axisLeft()
	        .scale(yScale)

        // Draw the axis
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(0, ${0})`)
            .call(yAxis);
        
        svg.append("text")
            .attr("class", "ylabel")
            .attr('x', -12)
            .attr('y', -3)
            .attr("alignment-baseline", "baseline")
            .text("Number of Movies")

    })

})
