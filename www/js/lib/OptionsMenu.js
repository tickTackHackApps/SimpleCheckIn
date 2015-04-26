var OptionsMenu = function(menu) {
    var detectIconSize = function() {
        var width = screen.width;
        if (width >= 640) {
            return 36;
        } else if (width >= 470) {
            return 54;
        } else {
            return 38;
        }
    };

    var iconSize = detectIconSize();
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", menu.id);
    menuDiv.setAttribute("style", "display: none; position: fixed; bottom: 0; width: 100%; z-index: 1000;");
    var menuTable = document.createElement("table");
    menuTable.setAttribute("style", "width: 100%;");
    menuTable.setAttribute("cellpadding", "0");
    menuTable.setAttribute("cellspacing", "0");
    for (i in menu.items) {
        var menuTableRow = menuTable.appendChild(document.createElement("tr"));
        var menuTableRowData = menuTableRow.appendChild(document.createElement("td"));
        var rowTable = document.createElement("table");
        rowTable.setAttribute("style", "width: 100%;");
        rowTable.setAttribute("cellpadding", "15");
        rowTable.setAttribute("cellspacing", "0");
        var rowTableRow = rowTable.appendChild(document.createElement("tr"));
        var width = Math.ceil(100 / menu.items[i].length) + "%";
        for (j in menu.items[i]) {
            var item = menu.items[i][j];
            var menuItem = document.createElement("td");
            menuItem.setAttribute("align", "center");
            menuItem.setAttribute("width", width);
            menuItem.setAttribute("style", "padding: 5px; font-size: 11px; color: white; border-top: 2px solid grey; border-right: 0.1em solid grey; background-color: black");
            menuItem.addEventListener("click", item.action, false);
            menuItem.addEventListener("click", function() {
                    document.getElementById(menu.id).style.display = 'none';
                }, false);
            if (item.image) {
                var imgItem = document.createElement("img");
                imgItem.setAttribute("src", item.image);
                if(item.image != "img/drawable-hdpi/stat_sys_upload_anim0.png")  {
                	imgItem.setAttribute("width", iconSize);
                	imgItem.setAttribute("height", iconSize);
                }
                menuItem.appendChild(imgItem);
            }
            menuItem.appendChild(document.createElement("br"));
            menuItem.appendChild(document.createTextNode(item.label));
            rowTableRow.appendChild(menuItem);
        }
        menuTableRowData.appendChild(rowTable);
    }
    menuDiv.appendChild(menuTable);
   document.body.appendChild(menuDiv);
    
/*function onMenuKeyDown() {
    	console.log('eclipse:: clicked menu button');
    	alert("menu key pressed");
        if (menuDiv.style.display != 'none') {
            menuDiv.style.display = 'none';
        } else {
            menuDiv.style.display = 'block';
        }
	};*/
        
};