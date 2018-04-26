// add items to the "Add Items" tab

$(document).ready(function() {
  var items = [
    {
      "id" : 1,
      "name" : "Red Chair",
      "image" : "textures/navigation/chair/1.png",
      "model" : "models/item/chair/1.glb",
      "type" : "1"
    },
       {
      "id" : 0,
      "name" : "Chair",
      "image" : "textures/navigation/chair/2.png",
      "model" : "models/item/chair/3.glb",
      "type" : "1"
    }, 
    {
        "id" : 2,
      "name" : "Blue Chair",
      "image" : "textures/navigation/chair/3.png",
      "model" : "models/item/chair/2.glb",
      "type" : "1"
    },
    {
        "id" : 3,
      "name" : "Dresser - Dark Wood",
      "image" : "textures/navigation/chair/4.png",
      "model" : "models/item/chair/4.glb",
      "type" : "1"
    }
  ]



  var itemsDiv = $("#items")
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