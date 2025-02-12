const data = {
  "counts": {
    "USA": 54504,
    "FRA": 22093,
    "ITA": 19540,
    "ESP": 6645,
    "PRT": 5691,
    "CHL": 4472,
    "ARG": 3800,
    "AUT": 3345,
    "AUS": 2329,
    "DEU": 2165,
    "NZL": 1419,
    "ZAF": 1401,
    "ISR": 505,
    "GRC": 466,
    "CAN": 257,
    "HUN": 146,
    "BGR": 141,
    "ROU": 120,
    "URY": 109,
    "TUR": 90,
    "SVN": 87,
    "GEO": 86,
    "GBR": 74,
    "HRV": 73,
    "MEX": 70,
    "MDA": 59,
    "BRA": 52,
    "LBN": 35,
    "MAR": 28,
    "PER": 16,
    "UKR": 14,
    "SRB": 12,
    "CZE": 12,
    "MKD": 12,
    "CYP": 11,
    "IND": 9,
    "CHE": 7,
    "LUX": 6,
    "BIH": 2,
    "ARM": 2,
    "SVK": 1,
    "CHN": 1,
    "EGY": 1
  },
  "metadata": {
    "minCount": 1,
    "maxCount": 54504,
    "totalSamples": 129908
  }
};

const choroplethTrace = {
  type: 'choropleth',
  locationmode: 'ISO-3',
  locations: Object.keys(data.counts),
  z: Object.values(data.counts),
  text: Object.keys(data.counts).map(country => 
    `${country}: ${data.counts[country]} reviews`
  ),
  colorscale: [
    [0, '#012538'],
    [0.25, '#00B8B2'],
    [0.5, '#2FF3E0'],
    [0.75, '#F7EC4F'],
    [1, '#FF69B4']
  ],
  zmin: data.metadata.minCount,
  zmax: data.metadata.maxCount,
  showscale: false,
  colorbar: {
    title: 'Review Count',
    tickcolor: 'rgb(250, 255, 250)',
    tickfont: { color: 'rgb(250, 255, 250)' },
    titlefont: { color: 'rgb(250, 255, 250)' }
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
      scale: 0.93,
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

Plotly.newPlot("map", [choroplethTrace, equatorTrace, meridianTrace], layout, config);

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

rotateGlobe();
