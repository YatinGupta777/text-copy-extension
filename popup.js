document.addEventListener('DOMContentLoaded', function() {
  
  var addItemButton = document.getElementById('addItemButton');
  var textItemInput = document.getElementById('textItemInput');

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

function addItem(value) { 
  $(elementsList).append(`<li><p>${value}</p><button class="delete">\u00D7</button><button class="alert">AlertText</button></li>`);
}

jQuery($ => {
  $(elementsList).on('click', '.delete', function() {
    let $button = $(this);
    removeItem($button.index('.delete'));
    $button.closest('li').remove();
  });

  $(elementsList).on('click', '.alert', function() {
    let $button = $(this);
    let copyFrom = $button.siblings('p')[0];
    alert(copyFrom.innerText)
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

}, false);



