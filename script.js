
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
    })
    
    
    console.log("genreFiltered", datafilter);

    const margin = ({top: 20, right: 40, bottom: 20, left: 40})

    const width = 650 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    const svg2 = d3.select(".scatterplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height+ margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
       
        
        const xScale = d3.scaleLinear()
            .domain(d3.extent(datafilter, d => d.Released_Year))
            .range([0, width]) 
        
        const yScale = d3.scaleLinear()
            .domain(d3.extent(datafilter, d => d.Gross)).nice()
            .range([height, 0])
            svg2.selectAll("circle")
            .data(datafilter)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.Released_Year))
            .attr("cy", d => yScale(d.Gross))
            .attr("r", 5)
            .attr("fill", "white")
            .attr("opacity", 0.6)
            .attr("stroke", "black");
        
        svg2.selectAll("text")
            .data(datafilter)
            .enter()
            .append("text")
            .text(d => d.year)
            .attr("x", d => xScale(d.Released_Year))
            .attr("y", d => yScale(d.Gross))
            .attr("font-size", 10)

        
        // using axis
        const xAxis = d3.axisBottom()
	        .scale(xScale)
            .ticks(5, "s")

        const yAxis = d3.axisLeft()
	        .scale(yScale)
        // Draw the axis
        let xAxisGroup = svg2.append("g")
            .call(xAxis)
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)

        let yAxisGroup = svg2.append("g")
            .call(yAxis)
            .attr("class", "axis y-axis")
            .attr("transform", `translate(0, ${0})`)

        // adding labels
        svg2.append("text")
            .attr("class", "xlabel")
            .attr('x', width - 150)
            .attr('y', height - 10)
            .attr("alignment-baseline", "baseline")
            .text("Year")

        svg2.append("text")
            .attr("class", "ylabel")
            .attr('x', 10)
            .attr('y', 5)
            .attr("alignment-baseline", "baseline")
            .text("Gross Profit")

        svg2.exit().remove();

})}


//barchart.js insert for test
let movieData;
let data;
let clicked;
d3.csv("genres.csv", d3.autoType)
    .then(data=>{
        console.log("Movie data: ", data);
        movieData = data;

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
            .data(movieData)
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
                    margin.top + parseFloat(d3.select(this).attr("y")) / 3 + height;

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

                console.log("mouseoverred xd", xPosition, yPosition);
            })
            .on("mouseout", function(d) {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
                d3.selectAll('.bar').style('fill', 'red'); //had to add bc hover color did not leave otherwise
            })
            //changes color of clicked bar-- calls the genreChart function for scatter plot
            .on("click", function(event, d){
                d3.select("svg2").remove();
                 clicked =d.genre;
                
               
              
               d3.select("#barchart")
                    .attr("fill", function () { return "rgb(0, 0, " + Math.round(d * 10) + ")"; });
               
               d3.selectAll('.bar').style('fill', 'red');
               d3.select(this).style("fill", "#012B4E");
               genreChart(data,clicked);
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

d3.csv("imdb_top_1000.csv", d3.autoType)
    .then(data => {
        //data.forEach(function(d) {
            //d.Genre = +d.Genre;
            //d.revenue = +d.revenue;
           
            
         //});
        data = data.filter(d => d.Released_Year >= 2000);
                console.log("Movie data: ", data);
        
        // margin convention
        const margin = ({top: 20, right: 40, bottom: 20, left: 40})

        const width = 650 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;


         //I commented this out to put it in a different function -- probably could uncomment 
        /*const svg = d3.select(".scatterplot")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Released_Year))
            .range([0, width]) 
        
        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Gross)).nice()
            .range([height, 0])
        
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.Released_Year))
            .attr("cy", d => yScale(d.Gross))
            .attr("r", 5)
            .attr("fill", "white")
            .attr("opacity", 0.6)
            .attr("stroke", "black");
        
        svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text(d => d.year)
            .attr("x", d => xScale(d.Released_Year))
            .attr("y", d => yScale(d.Gross))
            .attr("font-size", 10)

        
        // using axis
        const xAxis = d3.axisBottom()
	        .scale(xScale)
            .ticks(5, "s")

        const yAxis = d3.axisLeft()
	        .scale(yScale)

        // Draw the axis
        let xAxisGroup = svg.append("g")
            .call(xAxis)
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)

        let yAxisGroup = svg.append("g")
            .call(yAxis)
            .attr("class", "axis y-axis")
            .attr("transform", `translate(0, ${0})`)

        // adding labels
        svg.append("text")
            .attr("class", "xlabel")
            .attr('x', width - 150)
            .attr('y', height - 10)
            .attr("alignment-baseline", "baseline")
            .text("Year")

        svg.append("text")
            .attr("class", "ylabel")
            .attr('x', 10)
            .attr('y', 5)
            .attr("alignment-baseline", "baseline")
            .text("Gross Profit")*/

        // line and path
        // const line = d3
        //     .line()
        //     .x(d => xScale(d.miles))
        //     .y(d => yScale(d.gas));

        // const path = svg.append("path")
        //     .datum(data)
        //     .attr("fill", "none")
        //     .attr("stroke", "black")
        //     .attr("d", line);

        
       
    
    })
