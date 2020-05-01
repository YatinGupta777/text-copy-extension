document.addEventListener('DOMContentLoaded', function() {
  
  var addItemButton = document.getElementById('addItemButton');
  var textItemInput = document.getElementById('textItemInput');

  //var chromeStorage = 'list2';
  var textList = document.getElementById('textList');

  var textsList = new Array();

  chrome.storage.local.get(['list'], function (result) {

      if(result.list !=undefined){
            textsList = result.list;
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
        textsList.push(tab.url);
        chrome.storage.local.set({'list': textsList}, function() {
          });
      });

    }else{
        addItem(inputValue);
        textsList.push(inputValue);
        chrome.storage.local.set({'list': textsList}, function() {
        });
    }

  }, false);


  function addItem(value){
    var li = document.createElement("LI");          
    var para = document.createElement("P");    
    var deleteButton = document.createElement("BUTTON");                   // Create a <p> node
    var t = document.createTextNode(value);      // Create a text node
    
    deleteButton.className = "delete";
    para.style.width="500px";
    $(".delete").click(function () {
                var index = $(this).index(".delete");
                alert(index);
                var li = this.parentElement;
                li.style.display = "none";
                removeItem(index);  
                $(".delete").eq(index).remove();
            })

    para.appendChild(t); 
    li.appendChild(para);
    li.appendChild(deleteButton);
    textList.appendChild(li);
  }

  function removeItem(itemIndex) {
            console.log("removeitem");
            
            chrome.storage.local.get(['list'], function (result) {
                textsList = result.list;
                textsList.splice(itemIndex, 1);
                console.log("new list", textsList);
                chrome.storage.local.set({
                    'list': textsList
                })

            })

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



