var $ = require("jquery");
const { ipcRenderer } = require("electron")

$(function () {

    var isMove = false;

    disableForm("#speed");

    $("#start").on("click", function () {
        disableForm("#start");
        enableForm("#kill");
        enableForm("#stop");
        enableForm("#speed");
        isMove = true;
        ipcRenderer.send(this.id);
    });
    $("#kill").on("click", function () {
        enableForm("#start");
        disableForm("#kill");
        disableForm("#stop");
        disableForm("#speed");
        disableForm("#restart");
        ipcRenderer.send(this.id);
    });
    $("#stop").on("click", function () {
        disableForm("#stop");
        enableForm("#restart");
        isMove = false;
        ipcRenderer.send(this.id);
    });
    $("#restart").on("click", function () {
        enableForm("#stop");
        disableForm("#restart");
        isMove = true;
        ipcRenderer.send(this.id, $("#speed").val());
    });
    $("#speed").change(function () {
        if (isMove) {
            ipcRenderer.send(this.id, $("#speed").val());
        }
    });

    function enableForm(str) {
        $(str).prop("disabled", false);
        $(str).css({ "background": "" });
    }
    function disableForm(str) {
        $(str).prop("disabled", true);
        $(str).css({ "background": "#696969" });
    }
});

// ¡‚Íg—p‚µ‚Ä‚¢‚È‚¢
ipcRenderer.on('output', (event, arg) => {
    var stdout = $("#stdout").val();
    $("#stdout").val(stdout + '\n' + arg);
})