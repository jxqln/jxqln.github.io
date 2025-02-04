async function loadDataAndPlot() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    const pointTrace = {
      type: "scattergeo",
      mode: "markers",
      lat: data.points.map(point => point.latitude),
      lon: data.points.map(point => point.longitude),
      text: data.points.map(
        point =>
          `Name: ${point.name}<br>Country: ${point.country}<br>Year: ${point.year}<br>Type: ${point.type}<br>VEI: ${point.vei}<br>Total Deaths: ${point.totalDeaths}`
      ),
      marker: {
        size: data.points.map(point => 5 + 15 * (point.vei / data.metadata.maxVEI)),
        color: data.points.map(point => point.vei),
        colorscale: [
          [0, '#C99EE9'],
          [0.25, '#54ACD1'],
          [0.5, '#4BAAAB'],
          [0.75, '#DECD4F'],
          [1, '#FF69B4']
        ],
        cmin: data.metadata.minVEI,
        cmax: data.metadata.maxVEI,
        showscale: false
      }
    };

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

    const layout = {
      geo: {
        projection: {
          type: "orthographic",
          scale: 0.90,
          rotation: {
            lon: -45,
            lat: 15
          }
        },
        bgcolor: '#161617',
        showocean: true,
        oceancolor: "rgba(4, 17, 29, 50)",
        showland: true,
        landcolor: "rgba(4, 17, 29, 50)",
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
      paper_bgcolor: 'black',
      showlegend: false
    };

    const config = {
      displayModeBar: false
    };

    Plotly.newPlot("map", [pointTrace, equatorTrace, meridianTrace], layout, config);

    rotateGlobe();
  } catch (error) {
    console.error('Error loading or plotting data:', error);
  }
}

function rotateGlobe() {
  let currentRotation = -150;
  const totalRotation = 100;
  const targetRotation = currentRotation + totalRotation;
  const step = 0.5;

  function animate() {
    if (currentRotation < targetRotation) {
      currentRotation += step;

      Plotly.relayout('map', {
        'geo.projection.rotation.lon': currentRotation
      });

      requestAnimationFrame(animate);
    }
  }

  animate();
}

loadDataAndPlot();
