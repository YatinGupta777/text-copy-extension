document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  var text_area = document.getElementById('get_url');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      //alert(tab.url)
      chrome.storage.sync.set({'URL': tab.url}, function() {
          // Notify that we saved.
         // message('Settings saved');
          alert('Settings saved');
          text_area.innerHTML = tab.url;
          //google tracking here
        });
    });
  }, false);


  //Storage
  chrome.storage.sync.get("URL", function(result){
    if(result.URL!=undefined){
      text_area.innerHTML = result.URL;
    }else{
      text_area.innerHTML = "HI";
    }
    }); 

  //Can be used if listener needed

  // chrome.storage.onChanged.addListener(function(changes, namespace) {
  //       for (var key in changes) {
  //         var storageChange = changes[key];
  //         alert(storageChange.URL);
  //       }
  //     });


}, false);



