document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  var text_area = document.getElementById('get_url');

  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      alert(tab.url)
      chrome.storage.local.set({'URL': tab.url}, function() {
          // Notify that we saved.
         // message('Settings saved');
          alert('Settings saved');
          //google tracking here
        });
    });
  }, false);


  //Storage
  chrome.storage.local.get("URL", function(result){
    if(result.URL!=undefined){
      text_area.innerHTML = result.URL;
    }else{
      text_area.innerHTML = "HI";
    }
    }); 



}, false);



