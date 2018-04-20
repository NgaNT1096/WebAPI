// add items to the "Add Items" tab

$(document).ready(function() {
  var items = [
   
    {
      "id" : 1,
      "name" : "Red Chair",
      "image" : "textures/plant/1.JPG",
      "model" : "models/item/plant/dragon.json",
      "type" : "1"
    },
    {
        "id" : 2,
      "name" : "Blue Chair",
      "image" : "textures/plant/2.JPG",
      "model" : "models/item/plant/3.json",
      "type" : "1"
    },
    {
        "id" : 3,
      "name" : "Dresser - Dark Wood",
      "image" : "textures/plant/3.JPG",
      "model" : "models/js/DWR_MATERA_DRESSER2.js",
      "type" : "1"
    }, 
    {
        "id" : 4,
      "name" : "Dresser - White",
      "image" : "textures/plant/4.JPG",
      "model" : "models/js/we-narrow6white_baked.js",
      "type" : "1"
    },  
    {
        "id" : 5,
      "name" : "Bedside table - Shale",
      "image" : "textures/plant/5.JPG",
      "model" : "models/js/bd-shalebedside-smoke_baked.js",
      "type" : "1"
    }, 
    {
        "id" : 4,
      "name" : "Dresser - White",
      "image" : "textures/plant/6.JPG",
      "model" : "models/js/we-narrow6white_baked.js",
      "type" : "1"
    },  
    {
        "id" : 5,
      "name" : "Bedside table - Shale",
      "image" : "textures/plant/7.JPG",
      "model" : "models/js/bd-shalebedside-smoke_baked.js",
      "type" : "1"
    },
    {
        "id" : 6,
      "name" : "Bookshelf",
      "image" : "textures/plant/8.JPG",
      "model" : "models/js/cb-kendallbookcasewalnut_baked.js",
      "type" : "1"
    }
   /*     
   {
      "name" : "",
      "image" : "",
      "model" : "",
      "type" : "1"
    }, 
    */
  ]



  var itemsDiv = $("#items-chair")
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
