//Controller Class
'use strict';
class LayoutController extends ControllerBase {
    constructor() {
        super();
    }
    HandleMenuClicks() {
        //Top Panel Menu Clicks
        MenuItems = this._FetchTopMenuItems();
        for (var i = 0; i < MenuItems.length; i++) {
            var Nm = $("<div>", { id: "TopMenu" + (i + 1), class: "TopMenu ThemeTopMenu", text: MenuItems[i].MenuText });
            Nm.on("click", { MenuItem: MenuItems[i] }, MenuClick);
            $("#TopMenuPanel").append(Nm);
        }
        
    }

    _FetchTopMenuItems() {
        return [
            { MenuName: "Home", MenuText: "Home", MenuLink: "/Views/Home.html" },
            { MenuName: "Student", MenuText: "Student Register", MenuLink: "/Views/StudentRegister.html" },
            { MenuName: "Department", MenuText: "Department", MenuLink: "/Views/Departments.html" }
        ];
    }

    _FetchLeftMenuItems(TopMenu) { //To be replaced with a data fetching from database
        var SideMenu;
        switch (TopMenu) {
            case "Home":
                SideMenu = [
                    { MenuName: "Home", MenuText: "Home", MenuLink: "/Views/Home.html" },
                    { MenuName: "Gallery", MenuText: "Gallery", MenuLink: "/Views/Gallery.html" },
                    { MenuName: "Notifications", MenuText: "Notifications", MenuLink: "/Views/Notifications.html" }
                ];
                break;
            case "Student":
                SideMenu = [
                    { MenuName: "StudentRegister", MenuText: "Student Register", MenuLink: "/Views/StudentRegister.html" },
                    { MenuName: "FeesCollection", MenuText: "Student Fees", MenuLink: "/Views/FeesCollection.html" },
                    { MenuName: "MarksEntry", MenuText: "Marks Entry", MenuLink: "/Views/MarksEntry.html" }];
                break;
            case "Department":
                SideMenu = [{ MenuName: "Departments", MenuText: "Departments", MenuLink: "/Views/Departments.html" }];
                break;
        }
        return SideMenu;
    }
    _FetchThemes() {
        var ThemeList = [{ Name: "Classic" }, { Name: "Dark" }, { Name: "Modern" }];
        return ThemeList;
    }
}


//Page Events
var LoadedScripts = [];
var Ctrl;
$(document).ready(function () {
    Ctrl = new LayoutController();
    Ctrl.PageInit();
    Ctrl.HandleMenuClicks();
    LoadTheme(Ctrl);
    if (Ctrl.SessionCheck()) {
        var UserName = sessionStorage.getItem("SACurrentUserName");
        $("#UserName").html(UserName);
        setTimeout("LoadContentPage('PagePanel', '/Views/Home.html', 'Home')",10);
    } else {
        $("#TitlePanel").css("display", "none");
        Ctrl.Logout();
        window.location = "/Views/Login.html";
    }

    $("#btnTheme").click(function () {
        var Themes = Ctrl._FetchThemes();
        var html = "<div id='lst_ThemeOptions'><div>Select Theme</div><ul>";
        Themes.forEach(element => {
            html += "<li onclick='ThemeSelect(\"" + element.Name + "\")'>" + element.Name + "</li>";
        });
        html += "</ul></div>";
        $("#PopupBox").html(html);
        $("#PopupBox").show();
    });

    $("#lnkSignOut").click(function () {
        Ctrl.Logout(); 
        window.location = "/Views/Login.html";
    });
    //Menu Click Handling
});

function ThemeSelect(ThemeName) {
    Ctrl.SetTheme(ThemeName);
    $("#PopupBox").hide();
    window.location = "/Views/Layout.html";
}
var MenuItems;
function MenuClick(e) {
    $("#LeftPanel").empty();
    $("#LeftPanel").hide();
    var SubMenuList = Ctrl._FetchLeftMenuItems(e.data.MenuItem.MenuName);
    for (var i = 0; i < SubMenuList.length; i++) {
        var Nm = $("<div>", { id: "LeftMenu" + (i + 1), class: "LeftMenu ThemeLeftMenu", text: SubMenuList[i].MenuText });
        Nm.on("click", { MenuItem: SubMenuList[i] }, SubMenuClick);
        $("#LeftPanel").append(Nm);
    }
    $("#LeftPanel").show();
}

function SubMenuClick(e) {
    var MenuItem = e.data.MenuItem;
    LoadContentPage("PagePanel", MenuItem.MenuLink, MenuItem.MenuName);
}

function LoadTheme(Ctrl) {
    var ThemeName = Ctrl.GetTheme();
    var ThemeUTL = "/Content/CSS/Themes/" + ThemeName + ".css";
    var cssFile = document.createElement("link");
    cssFile.rel = "stylesheet";
    cssFile.Type = "text/css";
    cssFile.href = ThemeUTL;
    document.head.appendChild(cssFile);
}

function LoadContentPage(Location, ContentHTMLPageURL, ControllerName) {
    $("#" + Location).load(ContentHTMLPageURL);
    LoadScripts(ControllerName);
    LoadCSS(ControllerName);
    var fn = "Render" + ControllerName + "Page()";
    setTimeout(fn, 10);
}

function LoadScripts(ControllerName) {
    var ScriptURLs = [{ Name: "Helper" }, { Name: "Model" }, { Name: "Controller" }];
    ScriptURLs.forEach(element => {
        var URL = "../" + element.Name + "s/" + ControllerName + element.Name + ".js";
        if (!$("script[src='" + URL + "']").length) {
            $('<script src="' + URL + '" type="text/javascript"></script>').appendTo("head");
        }
    });
}

function LoadCSS(ControllerName) {
    var URL = "/Content/CSS/" + ControllerName + ".css";
    if (!$("link[href='" + URL + "']").length) {
        $('<link href="' + URL + '" rel="stylesheet">').appendTo("head");
    }
}








