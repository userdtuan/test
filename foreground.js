// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

// console.log("This prints to the console of the page (injected only if the page url matched)")
var speed = 7;
var auto_scroll = true;
var auto_next = true;
var el_key = "#chapterNavBottom .fa-chevron-right";
// chrome.runtime.sendMessage(
//   {
//     message: "get-el_key",
//   },
//   (response) => {
//     if (response.message === "success") {
//       el_key=response.payload
//     }
//     else{
//       console.log("get el_key fail")
//     }
//   }
// );

// chrome.runtime.sendMessage(
//   {
//     message: "get-auto_scroll",
//   },
//   (response) => {
//     if (response.message === "success") {
//       el_key=response.payload
//     }
//     else{
//       console.log("get el_key fail")
//     }
//   }
// );

// function logStorageChange(changes, area) {
//   console.log("Change in storage area: " + area);

//   let changedItems = Object.keys(changes);

//   // for (let item of changedItems) {
//   //   console.log(item + " has changed:");
//   //   console.log("Old value: ");
//   //   console.log(changes[item].oldValue);
//   //   console.log("New value: ");
//   //   console.log(changes[item].newValue);
//   // }
//   console.log("updated")
// }

// chrome.storage.onChanged.addListener(logStorageChange);



const update_from_storage = ()=>{
  chrome.storage.local.get("auto_scroll", function (data) {
  if (data.auto_scroll != undefined|| data.auto_scroll!=null||data.auto_scroll!="") {
    auto_scroll = data.auto_scroll;
    console.log(`auto scroll is ${auto_scroll}`);
    myFunc();
  } else {
    chrome.storage.local.set({ auto_scroll: auto_scroll });
  }
});
chrome.storage.local.get("speed", function (data) {
  if (data.speed != undefined|| data.speed!=null||data.speed!="") {
    speed = data.speed;
    console.log(`set speed ${speed}`);
  } else {
    chrome.storage.local.set({ speed: speed });
  }
});
chrome.storage.local.get("auto_next", function (data) {
  if (data.auto_next != undefined|| data.auto_next!=null||data.auto_next!="") {
    auto_next = data.auto_next;
    console.log(`auto next is ${auto_next}`);
  } else {
    chrome.storage.local.set({ auto_next: auto_next });
  }
});
chrome.storage.local.get("el_key", function (data) {
  if (data.el_key != undefined|| data.el_key!=null||data.el_key!="") {
    el_key = data.el_key;
    console.log(`current element key is ${el_key}`);
  } else {
    chrome.storage.local.set({ el_key: el_key });
  }
});}
update_from_storage()
chrome.storage.onChanged.addListener(function(changes) {
  auto_scroll=false
  update_from_storage()
  console.log(`\n`)
});

function isInViewport(el) {
  // console.log(el)
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const target_el = document.querySelector(el_key);

function pageScroll() {
  if (auto_scroll == true) {
    window.scrollBy(0, 1);
    scrolldelay = setTimeout(pageScroll, speed);
  }
}
function myFunc() {
  $(document).ready(function () {
    // console.log(`el key is ${el_key}`)
    if (el_key && target_el) {
      $(window).scroll(function () {
        if (isInViewport(target_el) && auto_next) {
          console.log("Target Element appear");
          myFunc();
          target_el.click();
        }
      });
    }
    pageScroll();
  });
}
myFunc();
$(document).on("keydown", function (e) {
  //   console.log(e.which);
  //   e.preventDefault();
  if (e.which == 191) {
    speed += 3;
    chrome.storage.local.set({ speed: speed });
    // console.log(`set speed ${speed}`);
  } else if (e.which == 222) {
    speed -= 3;
    chrome.storage.local.set({ speed: speed });
    // console.log(`set speed ${speed}`);
  } else if (e.which == 13) {
    if (auto_scroll) {
      auto_scroll = false;
      chrome.storage.local.set({ auto_scroll: auto_scroll });
    } else if (auto_scroll == false || auto_scroll == null) {
      auto_scroll = true;
      chrome.storage.local.set({ auto_scroll: auto_scroll });
    }
    // console.log(`auto scroll is ${auto_scroll}`);
  } else if (e.which == 16) {
    auto_next = !auto_next;
    chrome.storage.local.set({ auto_next: auto_next });
    // console.log(`auto next is ${auto_next}`);
    // myFunc();
  }
});
