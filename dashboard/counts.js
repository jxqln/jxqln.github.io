async function loadData() {
  const response = await fetch("record_counts.json");
  const data = await response.json();
  return data;
}

function countsByCountry(width, height, data) {
  const margin = { top: 20, right: 20, bottom: 50, left: 170 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  data.sort((a, b) => b["Record Count"] - a["Record Count"]);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["Record Count"])])
    .range([0, innerWidth * 0.8]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Country))
    .range([0, innerHeight])
    .padding(0.5);

  const colorScale = d3.scaleSequential(d3.interpolateViridis)
    .domain([0, d3.max(data, d => d["Record Count"])]);

  const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickSize(0);

  const yAxis = d3.axisLeft(yScale)
    .tickSize(0);

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(xAxis)
    .select(".domain")
    .attr("stroke", "#CACBC1");

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .select(".domain")
    .attr("stroke", "#CACBC1");

  svg.append("g")
    .attr("class", "grid")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale)
      .ticks(5)
      .tickSize(-innerHeight)
      .tickFormat(""))
    .selectAll(".tick line")
    .attr("stroke", "#1D1D1D")
    .attr("stroke-opacity", 0.1);

  svg.append("g")
    .selectAll(".rule")
    .data(data)
    .enter()
    .append("line")
    .attr("class", "rule")
    .attr("y1", d => yScale(d.Country) + yScale.bandwidth() / 2)
    .attr("y2", d => yScale(d.Country) + yScale.bandwidth() / 2)
    .attr("x1", 0)
    .attr("x2", d => xScale(d["Record Count"]))
    .attr("stroke", "#CACBC1")
    .attr("stroke-width", 0.5);

  const dots = svg.append("g")
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale(d["Record Count"]))
    .attr("cy", d => yScale(d.Country) + yScale.bandwidth() / 2)
    .attr("r", 4)
    .attr("fill", d => colorScale(d["Record Count"]))
    .attr("stroke", "#CACBC1")
    .attr("stroke-width", 0.5);

  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "rgba(255, 255, 255, 0.9)")
    .style("padding", "5px")
    .style("border-radius", "3px")
    .style("pointer-events", "none")
    .style("font-size", "12px")
    .style("color", "#000");

  dots.on("mouseover", (event, d) => {
    tooltip.transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip.html(`<strong>${d.Country}</strong><br>Number of Eruptions: ${d["Record Count"]}`)
      .style("left", `${event.pageX + 5}px`)
      .style("top", `${event.pageY - 28}px`);
  })
  .on("mouseout", () => {
    tooltip.transition()
      .duration(200)
      .style("opacity", 0);
  });

  svg.append("text")
    .attr("class", "axis-label")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + margin.bottom - 10)
    .attr("text-anchor", "middle")
    .text("Number of Eruptions")
    .style("fill", "#CACBC1")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "12px");

  svg.append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -margin.left + 20)
    .attr("text-anchor", "middle")
    .text("Country")
    .style("fill", "#CACBC1")
    .style("font-family", "Arial, sans-serif")
    .style("font-size", "12px");
}

async function renderPlot() {
  const data = await loadData();
  const card = document.querySelector(".chart-card");
  const cardWidth = card.clientWidth;
  const cardHeight = card.clientHeight;
  countsByCountry(cardWidth, cardHeight, data);
}

renderPlot();