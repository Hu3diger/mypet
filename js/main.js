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
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="dimissModal(\'modal1\');">Cancelar</a>\
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

function dimissModal(Tipo) {
  $('.'+Tipo+'').modal("close");
  $("#"+Tipo+"").html("");
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

function editThisDevice(device) {
  let name = $("." + device + "-name").html();
  $("#show").append('\
    <div class="modal-content center-align">\
      <h5>Novo horário de alimentação</h5>\
      <div class="row">\
        <div class="input-field col s12 m8 l8 offset-m2 offset-l2">\
          <input id="newName" type="text" class="validate" value="'+ name +'">\
        </div>\
      </div>\
    </div>\
    <div class="modal-footer">\
      <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="dimissModal(\'show\');">Cancelar</a>\
      <a href="#!" class="waves-effect waves-green btn-flat" onclick="saveName(\''+device+'\');">Salvar</a>\
    </div>\
  ');
  $('select').formSelect();
}

function saveName(device) {
  let name = $("#newName").val();
  $("." + device + "-name").html(name);
  dimissModal('show');
}