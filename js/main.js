/**
 * Here goes the global var
 */

var counterQrCodeLoading = 0;

$().ready(function () {

  let myCurrentPage = window.location.pathname;

  switch(myCurrentPage) {

    case "/primeiros-passos.html":
      setInterval(utils.loadingQrCode, 1000);
      break;

    case "/dispositivos.html":
      $('.modal').modal();
      $('.tooltipped').tooltip();
      break;

    case "/horarios.html":
      $('.modal').modal();
      break;
  }

  $(".sidenav").sidenav();
});

var modals = function() {

  /** Modal to add a new hour */
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
        <div class="row">\
          <div class="col s12 m8 l8 offset-m2 offset-l2">\
            <div class="error-div left warning left-align">\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class="modal-footer">\
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="modals.dimissModal(\'modal1\');">Cancelar</a>\
        <a href="#!" class="waves-effect waves-green btn-flat" onclick="modals.saveDevice(\'modal1\');">Salvar</a>\
      </div>\
    ');
    $('select').formSelect();

    $('body').keyup(function(e) {
      if(e.keyCode  == 27) dimissModal("modal1");
    });

    $(document).mouseup(function(e) {
      let container = $("#modal1");
      if(!container.is(e.target) && container.has(e.target).length === 0) dimissModal("modal1");
    })
  }

  /** Add a new device and hour */
  function saveDevice(modalToBeRemove) {
    let name = $("#device").val();
    let hour = $("#hour").val();

    if(validateFieldsOfDevice()) {
      dimissModal(modalToBeRemove);
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

  /** Validade fields on add now hour */
  function validateFieldsOfDevice() {

    $(".error-div").empty();

    $(".select-wrapper :input").removeClass("field-wrong");
    $("#hour").removeClass("field-wrong");

    var error = "";

    var name = $("#device").val();
    var hour = $("#hour").val();

    if(name == "" || name == null) {
      $(".select-wrapper :input").addClass("field-wrong");
      error += '<p><i class="material-icons">error_outline</i> Você deve inserir um nome válido! </p>';
    }

    if(hour == "") {
      $("#hour").addClass("field-wrong");
      error += '<p><i class="material-icons">error_outline</i> Você deve inserir um horário! </p>';
    }

    if(error != "") {
      $(".error-div").append(error);
      scroolModalToBottom();
      return false;
    }

    return true;
  }

  /** Modal to edit a device */
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
        <a href="#!" class="modal-close waves-effect waves-green btn-flat" onclick="modals.dimissModal(\'show\');">Cancelar</a>\
        <a href="#!" class="waves-effect waves-green btn-flat" onclick="modals.saveName(\''+device+'\');">Salvar</a>\
      </div>\
    ');
    $('select').formSelect();
  }

  /** Save the device name */
  function saveName(device) {
    let name = $("#newName").val();
    $("." + device + "-name").html(name);
    dimissModal('show');
  }

  function scroolModalToBottom() {
    $('.modal').children().animate({ scrollTop: $('.modal').height() }, 'slow');
  }

  /** Remove the modal pass by param */
  function dimissModal(Tipo) {
    $('.'+Tipo+'').modal("close");
    $("#"+Tipo+"").html("");
  }

  return {
    showModalHour: showModalHour,
    dimissModal: dimissModal,
    saveDevice: saveDevice,
    editThisDevice: editThisDevice,
    saveName: saveName,
    validateFieldsOfDevice: validateFieldsOfDevice,
    scroolModalToBottom: scroolModalToBottom
  }
}();


var utils = function() {

  function loadingQrCode() {
    counterQrCodeLoading++;
    var text = $(".readingQrCode").text();
    if (counterQrCodeLoading < 4) {
      text += ".";
    } else {
      text = "Lendo QR Code";
      counterQrCodeLoading = 0;
    }

    $(".readingQrCode").text(text);
  }

  return {
    loadingQrCode: loadingQrCode
  }
}();