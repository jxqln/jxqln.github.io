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

    const frames = [];
    for (let i = -80; i <= 280; i += 10) {
      frames.push({
        layout: {
          geo: {
            projection: {
              rotation: {
                lon: i,
                lat: 10
              }
            }
          }
        }
      });
    }

    const layout = {
      geo: {
        projection: {
          type: "orthographic",
          scale: 0.65,
          rotation: {
            lon: -80,
            lat: 10
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
      displayModeBar: false
    };

    Plotly.newPlot("map", plotData, layout, config).then(function() {
      Plotly.animate("map", frames, {
        transition: {
          duration: 0
        },
        frame: {
          duration: 50,
          redraw: false
        }
      }, {
        mode: "immediate",
        transition: {
          duration: 0
        },
        frame: {
          duration: 50,
          redraw: false
        }
      }).then(function() {
        // Reset globe after the animation
        Plotly.update("map", {}, {
          geo: {
            projection: {
              rotation: {
                lon: -80,
                lat: 10
              }
            }
          }
        });
      });
    });
  })
  .catch(error => {
    console.error("Error loading JSON data:", error);
  });
