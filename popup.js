document.addEventListener('DOMContentLoaded', function() {
  
  var addItemButton = document.getElementById('addItemButton');
  var textItemInput = document.getElementById('textItemInput');

  var textList = document.getElementById('textList');

  var textsList = new Array();

  chrome.storage.sync.get(['list1'], function (result) {

      if(result.list1 !=undefined){
            textsList = result.list1;
            for (let key in textsList)
            {
                addItem(textsList[key]);
            }
      }
  })

  addItemButton.addEventListener('click', function() {

    var inputValue = textItemInput.value;
    if(inputValue == ''){
      chrome.tabs.getSelected(null, function(tab) {
        addItem(tab.url);
        textsList.push(tab.url)
        chrome.storage.sync.set({'list1': textsList}, function() {
          });
      });

    }else{
        addItem(inputValue);
        textsList.push(inputValue);
        chrome.storage.sync.set({'list1': textsList}, function() {
        });
    }

  }, false);


  function addItem(value){
    var div = document.createElement("DIV");          
    var para = document.createElement("P");    
    var deleteButton = document.createElement("BUTTON");                   // Create a <p> node
    var t = document.createTextNode(value);      // Create a text node
    
    para.style.width="50px";
    para.appendChild(t); 
    div.appendChild(para);
    div.appendChild(deleteButton);
    textList.appendChild(div);
  }
  //Storage
  // chrome.storage.sync.get("list1", function(result){
  //   if(result.URL!=undefined){
  //     text_area.innerHTML = result.URL;
  //   }else{
  //     text_area.innerHTML = "HI";
  //   }
  //   }); 

  //Can be used if listener needed

  // chrome.storage.onChanged.addListener(function(changes, namespace) {
  //       for (var key in changes) {
  //         var storageChange = changes[key];
  //         alert(storageChange.URL);
  //       }
  //     });


}, false);



