$().ready(function () {
  charts.barChart();
  charts.resizeCharts();
});


var charts = function() {
  /**
   * Configuration of plotly
   */

  var options = {
    modeBarButtonsToRemove: ["zoom2d", "pan2d", "select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "resetScale2d",
    "hoverClosestCartesian", "hoverCompareCartesian",
    "zoom3d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "hoverClosest3d",
    "orbitRotation", "tableRotation",
    "zoomInGeo", "zoomOutGeo", "resetGeo", "hoverClosestGeo",
    "sendDataToCloud",
    "hoverClosestGl2d",
    "hoverClosestPie",
    "toggleHover",
    "resetViews",
    "toggleSpikelines",
    "resetViewMapbox"],
    displaylogo: false
  }

  function barChart() {
    var dataChart = [{
      x: [80, 20, 50],
      y: ['Água', 'Comida', 'Bateria'],
      orientation: 'h',
      type: 'bar'
    }];

    var layoutChart = {
      autosize: true,
      xaxis: {
        range: [0, 100]
      }
    }

    Plotly.newPlot("plotlyDashboardChart", dataChart, layoutChart, options);

    Plotly.relayout("plotlyDashboardChart", {
      width: 0.7 * window.innerWidth,
      height: 0.4 * window.innerHeight
    });
  }

  function resizeCharts() {
    window.onresize = function() {
      Plotly.relayout("plotlyDashboardChart", {
        width: 0.7 * window.innerWidth,
        height: 0.4  * window.innerHeight
      })
    }
  }

  return {
    barChart: barChart,
    resizeCharts: resizeCharts
  }
}();

