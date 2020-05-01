document.addEventListener('DOMContentLoaded', function() {
  
  var addItemButton = document.getElementById('addItemButton');
  var textItemInput = document.getElementById('textItemInput');

  //var chromeStorage = 'list2';
  var elementsList = document.getElementById('elementsList');

  var textsList = new Array();

  function getList(){
    chrome.storage.local.get(['list'], function (result) {

        if(result.list !=undefined){
              textsList = result.list;
              for (let key in textsList)
              {
                  addItem(textsList[key]);
              }
        }
    })
  }
  getList()

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


  // function addItem(value){
  //   var li = document.createElement("LI");          
  //   var para = document.createElement("P");    
  //   var deleteButton = document.createElement("BUTTON");                   // Create a <p> node
  //   var t = document.createTextNode(value);      // Create a text node
    
  //   deleteButton.className = "delete";

  //   para.appendChild(t); 
  //   li.appendChild(para);
  //   li.appendChild(deleteButton);
  //   elementsList.appendChild(li); 

  //   $(deleteButton).click(function () {
  //               var index = $(this).index(".delete");
  //               alert(index);
  //               var li = this.parentElement;
  //               li.style.display = "none";
  //               removeItem(index);  //This function just removes it from chrome local storage
  //               $(".delete").eq(index).remove();
  //           })
  //   }

function addItem(value) { 
  $(elementsList).append(`<li><p>${value}</p><button class="delete"></button></li>`);
}

jQuery($ => {
  $(elementsList).on('click', '.delete', function() {
    let $button = $(this);
    removeItem($button.index('.delete'));
    $button.closest('li').remove();
  });
});


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



