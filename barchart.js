// CHART INIT ------------------------------
let movieData;
let data;

// // sorting with button
// let sort = document.querySelector('#sort-order').onclick = function(){
//     if (this.value == "ascending") {
//         this.value = "descending";
//         console.log(this.value);

//         // sort descending
//         movieData.sort(function(a, b) {
//             return parseFloat(b.stores) - parseFloat(a.stores);
//         });
//         console.log("Sorted descending stores: ", movieData);
//         update(movieData, typeSelection);
//     }
//     else {
//         this.value = "ascending";
//         console.log(this.value);
//         // sort ascending
//         movieData.sort(function(a, b) {
//             return parseFloat(a.stores) - parseFloat(b.stores);
//         });
//         console.log("Sorted descending stores: ", movieData);
//         update(movieData, typeSelection);
//     }
//     this.blur();
// }

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
        svg.selectAll("rect")
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

                console.log("mouseoverred xd", xPosition, yPosition);
            })
            .on("mouseout", function(d) {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
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