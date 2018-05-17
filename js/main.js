$().ready(function () {
  $(".sidenav").sidenav();
  $('.modal').modal();
  

  charts.barChart();
  charts.pieChart();
  charts.resizeCharts();
});

function showModal() {
  $("#modal1").append('\
    <div class="modal-content center-align">\
      <h5>Novo horário de alimentação</h5>\
      <div class="row">\
        <div class="input-field col s12 m8 l8 offset-m2 offset-l2">\
          <select id="device">\
            <option value="0" disabled selected>Selecione o aparelho</option>\
            <option value="Pandora">Pandora</option>\
            <option value="Chiquinha">Chiquinha</option>\
            <option value="Toby">Toby</option>\
          </select>\
          <label>Petfeeder</label>\
        </div>\
      </div>\
      <div class="row">\
        <div class="input-field col s12 m8 l8  offset-m2 offset-l2">\
          <input id="hour" type="time" class="validate">\
          <label for="hour">Hora</label>\
        </div>\
      </div>\
    </div>\
    <div class="modal-footer">\
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="dimissModal();">Cancelar</a>\
      <a href="#!" class="waves-effect waves-green btn-flat" onclick="saveDevice();">Salvar</a>\
    </div>\
  ');
  $('select').formSelect();
}

function dimissModal() {
  $('.modal').modal("close");
  $("#modal1").html("");
}

function saveDevice() {
  let name = $("#device").val();
  let hour = $("#hour").val();

  if(name != null && hour != "" ) {
    dimissModal();
    $("#mainTable").append("\
    <tr>\
      <td>" + name +"</td>\
      <td>" + hour + "</td>\
      <td>\
        <div class='switch'>\
          <label>\
            <input type='checkbox' checked>\
            <span class='lever'></span>\
          </label>\
        </div>\
      </td>\
    </tr>\
    <tr>\
    ");
  }
}


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

