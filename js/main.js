$().ready(function () {
  $(".sidenav").sidenav();
  $('.modal').modal();
  $('.tooltipped').tooltip();
});

function showModalHour() {
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

  $('body').keyup(function(e) {
    if(e.keyCode  == 27) dimissModal();
  });

  $(document).mouseup(function(e) {
    let container = $("#modal1");
    if(!container.is(e.target) && container.has(e.target).length === 0) dimissModal();
  })

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
    M.toast({html: 'Novo horário cadastrado'});
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

$("#tico").click(function(e){
  let linha = $("tr").parents();
  console.log($("linha").find(".left-align").text());
});