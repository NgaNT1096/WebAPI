// add items to the "Add Items" tab

$(document).ready(function() {
  var items = [
    {
      "name" : "Coffee Table - Wood",
      "image" : "textures/room/bar_couter.jpg",
      "model" : "models/item/room/bar_couter.json",
      "type" : "1"
    }, 
    {
      "name" : "Side Table",
      "image" : "textures/room/bed.jpg",
      "model" : "models/item/room/bed.json",
      "type" : "1"
    }, 
    {
      "name" : "Dining Table",
      "image" : "textures/room/bollard.jpg",
      "model" : "models/item/room/bollard.json",
      "type" : "1"
    }, 
    {
      "name" : "Dining table",
      "image" : "textures/room/table.jpg",
      "model" : "models/item/room/table.json",
      "type" : "1"
    },
      {
      "name" : "Dining table",
      "image" : "textures/room/washbasin.jpg",
      "model" : "models/item/room/washbasin.json",
      "type" : "1"
    }
      ,
      {
      "name" : "Dining table",
      "image" : "textures/room/tvself.JPG",
      "model" : "models/item/room/tv_shelf.json",
      "type" : "1"
    }
  ]



  var itemsDiv = $("#items-table")
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var html = '<div id="item"  onmousedown="enableInNavigation()" draggable="true" ondragstart="addItem()" ondragover="unenableInNavigation()" style="position:relative; width: 125px;height : 125px;  float: left;padding: 1%; color = 0x41cece; >' +
                '<a   class="thumbnail add-item" model-name="' + 
                item.name + 
                '"target="' +
                item.model +
                '" model-url="' +
                item.model +
                '" model-type="' +
                item.type + 
                '"><img " width="336" height="69" src="' +
                item.image + 
                
                '" model-url="' +
                item.model +
                '"id="' +
                "addItem" +
                '"ondragstart=" return GetObjectFromTable(this)' +
                '" alt="Add Item"> '+
                
               
                ' </a></div>';
    itemsDiv.append(html);
  }
});