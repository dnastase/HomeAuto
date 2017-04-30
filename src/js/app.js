/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Vibe = require('ui/vibe');

var motion = 0;
var main = new UI.Window({
  fullscreen:true
});

var text = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text:'Fetching...',
  font:'mono-font-14',
  color:'black',
  textOverflow:'wrap',
  textAlign:'left',
  backgroundColor:'white',
});

main.add(text);
main.show();

function getInfo() {
   console.log('getInfo.');
   ajax({ url: 'http://www.dnastase.net', type: 'text' },
     function(data) {
       text.text(data);
       console.log('getInfo data:' + data);
       if (data.indexOf("motion: 1") != -1 && motion === 0) {
          Vibe.vibrate('short');
          motion = 1; 
       }
     },
     function(error, status, request) {
       main.text('Error: ' + error);
     }
   );
}

console.log('bef getInfo.');
getInfo();
setInterval(getInfo, 30000);

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    color:'black',
    textOverflow:'wrap',
    textAlign:'left',
    backgroundColor:'white'
  });
  wind.add(textfield);
  var c = new UI.Circle({
     position: new Vector2(20, 20),
     radius: 25,
     backgroundColor: 'white',     
  });
  wind.add(c);
  wind.show();
});

main.on('click', 'down', function(e) {
   console.log('main click down');
   motion = 0;
   getInfo();
   console.log('main click down - end');
});

main.on('click', 'back', function(e) {
   console.log('main click back');
   main.remove(text);
   main.add(text);
   main.show();
});

main.on('show', function(e) {
   console.log('main show');
   main.remove(text);
   main.add(text);
   main.show();
});


