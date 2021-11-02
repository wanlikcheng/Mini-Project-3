d3.csv("imdb_top_1000.csv", d3.autoType)
    .then(data => {
        
        data = data.filter(d => d.Released_Year >= 2000);
        console.log("Movie data: ", data);
        
        // margin convention
        const margin = ({top: 20, right: 40, bottom: 20, left: 40})

        const width = 650 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(".scatterplot")
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
            .text("Gross Profit")

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
