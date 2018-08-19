var $ = require("jquery");
const { ipcRenderer } = require("electron")

$(function () {
    $("button").on("click", function () {
        var btnId = this.id;
        var arg = $("#speedParam").val();
        // ipcRenderer.send(btnId, arg);
        if (btnId === "start") {
            $("#start").prop("disabled", true);
            $("#start").css({ "background": "#696969"});
        }
        if (btnId === "kill") {
            $("#start").prop("disabled", false);
            $("#start").css({ "background": "" });
        }
    });

    $("#speed").change(function () {
        var arg = $("#speedParam").val();
        // ipcRenderer.send("speed", arg);
    });
});

// ¡‚Íg—p‚µ‚Ä‚¢‚È‚¢
ipcRenderer.on('output', (event, arg) => {
    var stdout = $("#stdout").val();
    $("#stdout").val(stdout + '\n' + arg);
})