$().ready(function () {
  $(".sidenav").sidenav();

  charts.barChart();
  charts.pieChart();
  charts.resizeCharts();
});


var charts = function() {
  /**
   * Configuration of plotly
   */

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

    Plotly.newPlot("plotlyDashboardChart", dataChart, layoutChart);

    Plotly.relayout("plotlyDashboardChart", {
      width: 0.7 * window.innerWidth,
      height: 0.5  * window.innerHeight
    });
  }

  function pieChart() {

    var dataPie = [{
      values: [80, 20, 50],
      labels: ['Água', 'Comida', 'Bateria'],
      type: 'pie'
    }];

    var layoutPie = {
      height: 400,
      width: 500
    }

    Plotly.newPlot("plotlyDashboardPie", dataPie, layoutPie);

    Plotly.relayout("plotlyDashboardPie", {
      width: 0.7 * window.innerWidth,
      height: 0.7  * window.innerHeight
    });
  }

  function resizeCharts() {
    window.onresize = function() {
      Plotly.relayout("plotlyDashboardChart", {
        width: 0.7 * window.innerWidth,
        height: 0.5  * window.innerHeight
      })
      Plotly.relayout("plotlyDashboardPie", {
        width: 0.7 * window.innerWidth,
        height: 0.7  * window.innerHeight
      })
    }
  }

  return {
    pieChart: pieChart,
    barChart: barChart,
    resizeCharts: resizeCharts
  }
}();

