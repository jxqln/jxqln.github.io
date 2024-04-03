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

  const equatorTrace = {
    type: "scattergeo",
    mode: "lines",
    lat: Array(360).fill(0),
    lon: Array.from({ length: 360 }, (_, i) => i - 180),
    line: {
      color: "rgba(250, 255, 250, 100)",
      width: 1,
      dash: "dash"
    },
    name: ""
  };

  plotData.push(equatorTrace);

  const meridianTrace = {
    type: "scattergeo",
    mode: "lines",
    lon: Array(360).fill(0),
    lat: Array.from({ length: 360 }, (_, i) => i - 180),
    line: {
      color: "rgba(250, 255, 250, 100)",
      width: 1,
      dash: "dash"
    },
    name: ""
  };

  plotData.push(meridianTrace);

  const layout = {
    geo: {
      projection: {
        type: "orthographic",
        scale: 0.65,
        rotation: {
          lon: -60,
          lat: 15
        }
      },
      bgcolor: "black",
      oceancolor: "rgba(4, 17, 29, 50)",
      landcolor: "rgba(4, 17, 29, 50)",
      showocean: true,
      showland: true,
      showcountries: true,
      countrycolor: "rgba(25, 100, 155, 0.5)",
      coastlinecolor: "rgba(250, 255, 250, 100)",
      framecolor: "rgba(80, 20, 80, 10)",
      lonaxis: {
        showgrid: true,
        gridcolor: "rgba(80, 20, 80, 100)",
        gridwidth: 0.5,
        dtick: 35
      },
      lataxis: {
        showgrid: true,
        gridcolor: "rgba(80, 20, 80, 100)",
        gridwidth: 0.5,
        dtick: 20
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
    displayModeBar: false
  };

  Plotly.newPlot("map", plotData, layout, config);
})
.catch(error => {
  console.error("Error loading JSON data:", error);
});
