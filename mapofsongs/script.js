fetch("data.json")
.then(response => response.json())
.then(data => {
  // Create the plot
  const plotData = data.map(point => ({
    type: "scattergeo",
    mode: "markers",
    lat: [point.latitude],
    lon: [point.longitude],
    hovertext: point.hovertext,
    marker: {
      size: 15,
      color: point.color
    },
    name: ""
  }));

  const layout = {
    geo: {
      projection: {
        type: "orthographic",
        scale: 0.6,
        rotation: {
          lon: -90
        }
      }
    },
    width: 800,
    height: 800,
    margin: {
      r: 0,
      t: 0,
      l: 0,
      b: 0
    },
    showlegend: false
  };

  const config = {
    displayModeBar: false // Hide the mode bar
  };

  Plotly.newPlot("map", plotData, layout, config);
})
.catch(error => {
  console.error("Error loading JSON data:", error);
});
