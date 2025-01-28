const wineData = {'titles': ['Charles Smith 2006 Royal City Syrah (Columbia Valley (WA))', 'Cayuse 2008 Bionic Frog Syrah (Walla Walla Valley (WA))', 'Cayuse 2009 En Chamberlin Vineyard Syrah (Walla Walla Valley (OR))', 'Williams Selyem 2010 Hirsch Vineyard Pinot Noir (Sonoma Coast)', 'Cayuse 2011 En Chamberlin Vineyard Syrah (Walla Walla Valley (OR))', 'Williams Selyem 2009 Precious Mountain Vineyard Pinot Noir (Sonoma Coast)', 'Trefethen 2005 Reserve Cabernet Sauvignon (Oak Knoll District)', 'Pirouette 2008 Red Wine Red (Columbia Valley (WA))', 'Gramercy 2010 Lagniappe Syrah (Columbia Valley (WA))', 'Brezza 2013 Cannubi  (Barolo)', 'Mt. Brave 2008 Merlot (Mount Veeder)', 'Williams Selyem 2013 Westside Road Neighbors Pinot Noir (Russian River Valley)', 'Comm. G. B. Burlotto 2013 Monvigliero  (Barolo)', 'Château Climens 2014  Barsac', 'Cayuse 2008 En Cerise Vineyard Syrah (Walla Walla Valley (WA))', 'Von Strasser 2009 Estate Vineyard Cabernet Sauvignon (Diamond Mountain District)', 'Vine Cliff 2007 Cabernet Sauvignon (Oakville)', 'Williams Selyem 2013 Coastlands Vineyard Pinot Noir (Sonoma Coast)', 'Cayuse 2011 En Cerise Vineyard Syrah (Walla Walla Valley (OR))', 'Williams Selyem 2014 Coastlands Vineyard Pinot Noir (Sonoma Coast)', 'Wayfarer 2014 Wayfarer Vineyard Chardonnay (Fort Ross-Seaview)', 'Brovia 2013 Garblèt Suè  (Barolo)', 'Dolce 2006 Semillon-Sauvignon Blanc (Napa Valley)', 'Figgins 2009 Estate Red (Walla Walla Valley (WA))', 'R.L. Buller & Son NV Calliope Rare Tokay (Rutherglen)', 'Château Léoville Poyferré 2010  Saint-Julien', 'Williams Selyem 2010 Precious Mountain Vineyard Pinot Noir (Sonoma Coast)', 'Conti Costanti 2012  Brunello di Montalcino', 'Goldeneye 2007 Ten Degrees Pinot Noir (Anderson Valley)', 'Limerick Lane 2013 Rocky Knoll Zinfandel (Russian River Valley)', 'Williams Selyem 2010 Allen Vineyard Chardonnay (Russian River Valley)', 'René Muré 2015 Clos Saint Landelin Vorbourg Grand Cru Riesling (Alsace)', 'Dutton-Goldfield 2010 Dutton Ranch Rued Vineyard Chardonnay (Green Valley)', 'Trefethen 2005 Estate Cabernet Sauvignon (Oak Knoll District)', 'Joseph Swan Vineyards 2007 Trenton Estate Vineyard Pinot Noir (Russian River Valley)', 'Arista 2005 Ferrington Vineyard Pinot Noir (Anderson Valley)', 'Merry Edwards 2007 Meredith Estate Pinot Noir (Russian River Valley)', 'Clos Haut-Peyraguey 2014  Sauternes', 'Betz Family 2005 Père de Famille Cabernet Sauvignon (Columbia Valley (WA))', 'Giacomo Fenocchio 2013 Bussia  (Barolo)', "Roar 2014 Garys' Vineyard Pinot Noir (Santa Lucia Highlands)", 'Produttori del Barbaresco 2011 Rabajà Riserva  (Barbaresco)', 'Williams Selyem 2012 Bucher Vineyard Pinot Noir (Russian River Valley)', 'Passopisciaro 2013 Contrada R Nerello Mascalese (Terre Siciliane)', 'Failla 2010 Occidental Ridge Vineyard Pinot Noir (Sonoma Coast)', 'Rochioli 2010 South River Vineyard Chardonnay (Russian River Valley)', 'Ken Wright 2012 Abbott Claim Vineyard Pinot Noir', 'Ramey 2012 Ritchie Vineyard Chardonnay (Russian River Valley)', 'Redmon 2006 Cabernet Sauvignon (St. Helena)', 'Domaine Ostertag 2015 Muenchberg Grand Cru Riesling (Alsace)'], 'prices': [80.0, 80.0, 75.0, 75.0, 75.0, 94.0, 100.0, 50.0, 55.0, 60.0, 60.0, 69.0, 70.0, 70.0, 70.0, 70.0, 75.0, 75.0, 75.0, 75.0, 80.0, 83.0, 85.0, 85.0, 86.0, 92.0, 94.0, 95.0, 100.0, 50.0, 50.0, 50.0, 50.0, 50.0, 52.0, 54.0, 54.0, 55.0, 55.0, 55.0, 58.0, 58.0, 59.0, 60.0, 60.0, 60.0, 65.0, 65.0, 65.0, 66.0], 'points': [100, 100, 99, 99, 99, 99, 99, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 98, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97, 97]};

function generateColors(n) {
  const colors = [];
  const colorScale = [
    '#FF9B9B', '#FFB178', '#FFD478', '#73F7DD', '#2FF3E0',
    '#00D8D6', '#00B8B2', '#1A9988', '#207F76', '#255E57'
  ];
  for (let i = 0; i < n; i++) {
    const index = Math.floor((i / n) * (colorScale.length - 1));
    colors.push(colorScale[index]);
  }
  return colors;
}
const barTrace = {
  x: wineData.titles,
  y: wineData.prices,
  type: 'bar',
  marker: {
    color: generateColors(wineData.titles.length),
  },
  hovertemplate: 
    '<b>%{x}</b><br>' +
    'Price: $%{y:,.0f}<br>' +
    'Points: %{customdata:,.0f}<br>' +
    '<extra></extra>',
  customdata: wineData.points
};
const barLayout = {
  paper_bgcolor: '#161617',
  plot_bgcolor: '#161617',
  height: 300,
  autosize: true,
  barmode: 'group',
  bargap: 0.15,
  margin: {
    l: 0,
    r: 20,
    t: 20,
    b: 0
  },
  xaxis: {
    showticklabels: false,
    showgrid: false,
    showline: false
  },
  yaxis: {
    showticklabels: false,
    showgrid: false,
    showline: false,
    zeroline: false
  }
};
const barConfig = {
  displayModeBar: false
};

Plotly.newPlot("chart", [barTrace], barLayout, barConfig);
