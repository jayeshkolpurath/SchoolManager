class ScriptComponent {
    LoadScripts(ControllerName) {
        try {
            var ScriptURLs = [{ Name: "Helper" }, { Name: "Model" }, { Name: "Controller" }];
            ScriptURLs.forEach(element => {
                var URL = "../" + element.Name + "s/" + ControllerName + element.Name + ".js";
                this.LoadScript(URL);
            });
        } catch (Ex) {
            throw Ex;
        }
    }
    LoadScript(URL) {
        try {
            if (!$("script[src='" + URL + "']").length) {
                $('<script src="' + URL + '" type="text/javascript"></script>').appendTo("head");
            }
        }
        catch (Ex) {
            throw Ex;
        }
    }
    LoadCSS(ControllerName) {
        try {
            var URL = "/Content/CSS/" + ControllerName + ".css";
            if (!$("link[href='" + URL + "']").length) {
                $('<link href="' + URL + '" rel="stylesheet">').appendTo("head");
            }
        } catch (Ex) {
            throw Ex;
        }
    }
}