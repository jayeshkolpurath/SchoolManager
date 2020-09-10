//Controller Class
'use strict';
class LayoutController extends ControllerBase {
    constructor() {
        super();
        this.Model = new LayoutModel(this.Settings);
        this.Model.GetMenu();
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
        try {
            return [
                { MenuName: "Home", MenuText: "Home" },
                { MenuName: "Student", MenuText: "Student Register" },
                { MenuName: "Settings", MenuText: "Settings" }
            ];

        } catch (Ex) {
            throw Ex;
        }
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
                            { MenuName: "BloodGroups", MenuText: "BloodGroups", MenuLink: "/Views/BloodGroups.html" },
                            { MenuName: "Countries", MenuText: "Countries", MenuLink: "/Views/Countries.html" },
                            { MenuName: "Relation", MenuText: "Relation", MenuLink: "/Views/Relation.html" },
                            { MenuName: "Section", MenuText: "Section", MenuLink: "/Views/Section.html" },
                            { MenuName: "States", MenuText: "States", MenuLink: "/Views/States.html"}
                        ]
                    }
                ];
                break;
        }
        return SideMenu;
    }
    _FetchLeftMenuItemsOld(TopMenu) { 
        var SideMenu;
        Model.GetMenu();     
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
        throw Ex;
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
        throw Ex;
    }
}

function GenerateMenuItems(Element, Parent, Pos, Level, Suffix, Settings) {
    try {
        var Nm;
        var DisplayStyle = (Parent[0].id == "LeftPanel") ? "display:block;" : "display:none;";
        var eID = "LeftMenu" + Suffix + "_" + Level + "" + Pos;
        if (typeof Element.SubMenu !== 'undefined') {
            Nm = $("<div>", { id: eID, class: "LeftMenuHead ThemeLeftMenuHead ", style: DisplayStyle, text: Element.MenuText });
            Nm.on("click", { MenuItem: Element, Settings: Settings, ID: eID }, SubMenuClick);
            var j = 1;
            Element.SubMenu.forEach(elm => {
                GenerateMenuItems(elm, Nm, j, Level + 1, Suffix + "_" + Level + "" + Pos, Settings);
                j++;
            });
            Parent.append(Nm);
        }
        else {
            Nm = $("<div>", { id: "LeftMenu" + Suffix + "_" + Level + "" + Pos, class: "LeftMenu ThemeLeftMenu ", style: DisplayStyle, text: Element.MenuText });
            Nm.on("click", { MenuItem: Element, Settings: Settings, ID: eID }, SubMenuClick);
            Parent.append(Nm);
        }
    }
    catch (Ex) {
        throw Ex;
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
            LoadContentPage("PagePanel", e.data.MenuItem.MenuLink, e.data.MenuItem.MenuName, e.data.MenuItem.RefURLs);
        }
    } catch (Ex) {
        throw Ex;
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
        throw Ex;
    }
}

function LoadContentPage(Location, ContentHTMLPageURL, ControllerName) {
    try {
        var objScriptComponent = new ScriptComponent();
        $("#" + Location).load(ContentHTMLPageURL);
        objScriptComponent.LoadScripts(ControllerName); //Loading files Controller, Model and Helper(if not already loaded)
        objScriptComponent.LoadCSS(ControllerName);
        var fn = "Render" + ControllerName + "Page()";
        setTimeout(fn, 10); //Call partial page rendering from the controller
    } catch (Ex) {
        throw Ex;
    }
}









