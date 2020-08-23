//Controller Class
'use strict';
class LayoutController extends ControllerBase {
    constructor() {
        super();
    }
    HandleMenuClicks() {
        try {
            //Top Panel Menu Clicks
            MenuItems = this._FetchTopMenuItems();
            for (var i = 0; i < MenuItems.length; i++) {
                var Nm = $("<div>", { id: "TopMenu" + (i + 1), class: "TopMenu ThemeTopMenu", text: MenuItems[i].MenuText });
                Nm.on("click", { MenuItem: MenuItems[i], Settings: JSON.parse(JSON.stringify(this.Settings)) }, MenuClick);
                $("#TopMenuPanel").append(Nm);
            }
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("HandleMenuClicks", Ex);
        }
    }

    _FetchTopMenuItems() {
        return [
            { MenuName: "Home", MenuText: "Home" },
            { MenuName: "Student", MenuText: "Student Register" },
            { MenuName: "Settings", MenuText: "Settings" }
        ];
    }

    _FetchLeftMenuItems(TopMenu) { //To be replaced with a data fetching from database
        var SideMenu;
        switch (TopMenu) {
            case "Home":
                SideMenu = [
                    {
                        MenuName: "Home", MenuText: "Home", SubMenu: [
                            { MenuName: "Home", MenuText: "Dashboard", MenuLink: "/Views/Home.html" },
                            {
                                MenuName: "Gallery", MenuText: "Gallery 4", SubMenu: [
                                    { MenuName: "Gallery", MenuText: "Photos", MenuLink: "/Views/Gallery.html" },
                                    { MenuName: "Gallery", MenuText: "Photos", MenuLink: "/Views/Gallery.html" },
                                    { MenuName: "Gallery", MenuText: "Photos", MenuLink: "/Views/Gallery.html" },
                                    { MenuName: "Gallery", MenuText: "Events", MenuLink: "/Views/Events.html" }
                                ]
                            }
                        ]
                    },
                    { MenuName: "Notifications", MenuText: "Notifications", MenuLink: "/Views/Notifications.html" }
                ];
                break;
            case "Student":
                SideMenu = [
                    { MenuName: "StudentRegister", MenuText: "Student Register", MenuLink: "/Views/StudentRegister.html" },
                    { MenuName: "FeesCollection", MenuText: "Student Fees", MenuLink: "/Views/FeesCollection.html" },
                    { MenuName: "MarksEntry", MenuText: "Marks Entry", MenuLink: "/Views/MarksEntry.html" }];
                break;
            case "Settings":
                SideMenu = [
                    {
                        MenuName: "MasterData", MenuText: "Master Data", SubMenu: [
                            { MenuName: "Departments", MenuText: "Departments", MenuLink: "/Views/Departments.html" },
                            { MenuName: "BloodGroups", MenuText: "BloodGroups", MenuLink: "/Views/BloodGroups.html" }
                        ]
                    }
                ];
                break;
        }
        return SideMenu;
    }
    _FetchThemes() {
        var ThemeList = [{ Name: "Classic" }, { Name: "Dark" }, { Name: "Modern" }];
        return ThemeList;
    }

    GetTheme() {
        try {
            var ThemeName;
            var objStorage = new StorageHelper();
            if (objStorage.Get("Theme")) {
                ThemeName = objStorage.Get("Theme");
            } else {
                ThemeName = "Classic";
            }
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("GetTheme", Ex);
        }
        return ThemeName;
    }

    SetTheme(ThemeName) {
        try {
            var objStorage = new StorageHelper();
            objStorage.Set("Theme", ThemeName);
        } catch (Ex) {
            new LogHelper(this.Settings).LogError("SetTheme", Ex);
        }
    }
}


//Page Events
var LoadedScripts = [];
var Ctrl;
$(document).ready(function () {
    try {
        Ctrl = new LayoutController();
        Ctrl.PageInit();
        Ctrl.HandleMenuClicks();
        LoadTheme(Ctrl);
        if (Ctrl.SessionCheck()) {
            var objStorage = new StorageHelper();
            var UserName = objStorage.Get("SACurrentUserName");
            $("#UserName").html(UserName);
            setTimeout("LoadContentPage('PagePanel', '/Views/Home.html', 'Home')", 10);
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
    } catch (Ex) {
        new LogHelper(Ctrl.Settings).LogError("doc ready", Ex);
    }
});

function ThemeSelect(ThemeName) {
    try {
        Ctrl.SetTheme(ThemeName);
        $("#PopupBox").hide();
        window.location = "/Views/Layout.html";
    } catch (Ex) {
        new LogHelper(this.Settings).LogError("ThemeSelect", Ex);
    }
}
var MenuItems;
function MenuClick(e) {
    try {
        $("#LeftPanel").empty();
        $("#LeftPanel").hide();
        var SubMenuList = Ctrl._FetchLeftMenuItems(e.data.MenuItem.MenuName);
        var i = 0;
        SubMenuList.forEach(element => {
            GenerateMenuItems(element, $("#LeftPanel"), i, 0, "_", e.data.Settings);
            i++;
        });

        $("#LeftPanel").show();
    } catch (Ex) {
        new LogHelper(e.data.Settings).LogError("MenuClick", Ex);
    }
}

function GenerateMenuItems(Element, Parent, Pos, Level, Suffix, Settings) {
    try {
        var Nm;
        var DisplayStyle = (Parent[0].id == "LeftPanel") ? "display:block;" : "display:none;";
        var eID = "LeftMenu" + Suffix + "_" + Level + "" + Pos;
        if (typeof Element.SubMenu !== 'undefined') {
            Nm = $("<div>", { id: eID, class: "LeftMenuHead ThemeLeftMenuHead ", style: DisplayStyle, text: Element.MenuText });
            Nm.on("click", { MenuItem: Element, Settings: Settings, ID: eID  }, SubMenuClick);
            var j = 1;
            Element.SubMenu.forEach(elm => {
                GenerateMenuItems(elm, Nm, j, Level+1, Suffix + "_" + Level + "" +Pos , Settings);
                j++;
            });
            Parent.append(Nm);
        }
        else {
            Nm = $("<div>", { id: "LeftMenu" + Suffix + "_" + Level + "" + Pos, class: "LeftMenu ThemeLeftMenu ", style: DisplayStyle, text: Element.MenuText });
            Nm.on("click", { MenuItem: Element, Settings: Settings, ID: eID  }, SubMenuClick);
            Parent.append(Nm);
        }
    }
    catch (Ex) {
        new LogHelper(Settings).LogError("GenerateMenuItems", Ex);
    }
}

function SubMenuClick(e) {
    try {
        if (typeof e.data.MenuItem.SubMenu != 'undefined') {
            var ID = e.data.ID;
            $("#" + ID).children().each(function (index) {
                var Item = $(this);
                Item.toggle();
            });
        } else {
            var MenuItem = e.data.MenuItem;
            LoadContentPage("PagePanel", e.data.MenuItem.MenuLink, e.data.MenuItem.MenuName);
        }
    } catch (Ex) {
        new LogHelper(e.data.Settings).LogError("SubMenuClick", Ex);
    }
    return false;
}

function LoadTheme(Ctrl) {
    try {
        var ThemeName = Ctrl.GetTheme();
        var ThemeUTL = "/Content/CSS/Themes/" + ThemeName + ".css";
        var cssFile = document.createElement("link");
        cssFile.rel = "stylesheet";
        cssFile.Type = "text/css";
        cssFile.href = ThemeUTL;
        document.head.appendChild(cssFile);
    } catch (Ex) {
        new LogHelper(this.Settings).LogError("LoadTheme", Ex);
    }
}

function LoadContentPage(Location, ContentHTMLPageURL, ControllerName) {
    try {
        $("#" + Location).load(ContentHTMLPageURL);
        LoadScripts(ControllerName);
        LoadCSS(ControllerName);
        var fn = "Render" + ControllerName + "Page()";
        setTimeout(fn, 10);
    } catch (Ex) {
        new LogHelper(this.Settings).LogError("LoadContentPage", Ex);
    }
}

function LoadScripts(ControllerName) {
    try {
        var ScriptURLs = [{ Name: "Helper" }, { Name: "Model" }, { Name: "Controller" }];
        ScriptURLs.forEach(element => {
            var URL = "../" + element.Name + "s/" + ControllerName + element.Name + ".js";
            if (!$("script[src='" + URL + "']").length) {
                $('<script src="' + URL + '" type="text/javascript"></script>').appendTo("head");
            }
        });
    } catch (Ex) {
        new LogHelper(this.Settings).LogError("LoadScripts", Ex);
    }
}

function LoadCSS(ControllerName) {
    try {
        var URL = "/Content/CSS/" + ControllerName + ".css";
        if (!$("link[href='" + URL + "']").length) {
            $('<link href="' + URL + '" rel="stylesheet">').appendTo("head");
        }
    } catch (Ex) {
        new LogHelper(this.Settings).LogError("LoadCSS", Ex);
    }
}








