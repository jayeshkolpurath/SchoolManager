//Controller Class
class LayoutController extends ControllerBase {
    HandleMenuClicks() {
        //Top Panel Menu Clicks
        MenuItems = this._FetchTopMenuItems();
        for (var i = 0; i < MenuItems.length; i++) {
            var Nm = $("<div>", { id: "TopMenu" + (i + 1), class: "TopMenu ThemeTopMenu", text: MenuItems[i].MenuText });
            Nm.on("click", { MenuItem: MenuItems[i] }, MenuClick);
            $("#TopMenuPanel").append(Nm);
        }
        $("#lnkSignOut").click(function () {
            //ParentClass.prototype.Logout.call(this); //calling base class method
            window.location = "/Views/Login.html";
        });
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
    _FetchThemes(){
        var ThemeList =  [{Name:"Classic"},{Name:"Dark"},{Name:"Modern"}];
        return ThemeList;
    }
}


//Page Events
var LoadedControllers = [];
var Ctrl;
$(document).ready(function () {
    Ctrl = new LayoutController();
    Ctrl.PageInit();
    Ctrl.HandleMenuClicks();
    LoadTheme(Ctrl);
    if (Ctrl.SessionCheck()) {
        var UserName = sessionStorage.getItem("SASessionID");
        $("#UserName").html(UserName);
        LoadContentPage("PagePanel", "/Views/Home.html", "/Controllers/HomeController.js");
    } else {
        $("#TitlePanel").css("display", "none");
        Ctrl.Logout();
        window.location = "/Views/Login.html";
    }

    $("#btnTheme").click(function(){
        var Themes = Ctrl._FetchThemes();
        var html= "<div id='lst_ThemeOptions'><div>Select Theme</div><ul>";
        Themes.forEach(element => {
            html += "<li onclick='ThemeSelect(\"" + element.Name + "\")'>"+ element.Name +"</li>";            
        });
        html += "</ul></div>";
        $("#PopupBox").html(html);
        $("#PopupBox").show();
    });
    //Menu Click Handling
});

function ThemeSelect(ThemeName){
    Ctrl.SetTheme(ThemeName);
    $("#PopupBox").hide();
    window.location = "/Views/Layout.html";
}
var MenuItems;
function MenuClick(e) {
    /*   $("#PagePanel").load(e.data.MenuItem.MenuLink);*/
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
    LoadContentPage("PagePanel", MenuItem.MenuLink, "/Controllers/" + MenuItem.MenuName + "Controller.js");
}

function LoadTheme(Ctrl) {
    var ThemeName=Ctrl.GetTheme();
    var ThemeUTL = "/Content/CSS/Themes/" +  ThemeName  + ".css";
    var cssFile = document.createElement("link");
    cssFile.rel="stylesheet";
    cssFile.Type = "text/css";
    cssFile.href = ThemeUTL;
    document.body.appendChild(cssFile);
}

function LoadContentPage(Location, ContentHTMLPageURL, ControllerURL) {
    $("#" + Location).load(ContentHTMLPageURL);
    if (LoadedControllers.indexOf(ControllerURL) === -1) {
        LoadedControllers.push(ControllerURL);
        var Contrl = document.createElement("script");
        Contrl.Type = "application/javascript";
        Contrl.src = ControllerURL;
        document.body.appendChild(Contrl);
    }
}









