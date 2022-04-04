// This is the service worker script, which executes in its own context helloooo
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log(
  "This prints to the console of the service worker (background script)"
);

// Importing and using functionality from external files is also possible.
importScripts("service-worker-utils.js");

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.
chrome.runtime.onInstalled.addListener(() => {
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)
  console.log("service-worker hereeee");
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
      chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: ["./foreground_styles.css"]
      })
          .then(() => {
              console.log("INJECTED THE FOREGROUND STYLES.");

              chrome.scripting.executeScript({
                  target: { tabId: tabId },
                  files: ["./foreground.js"]
              })
                  .then(() => {
                      console.log("INJECTED THE FOREGROUND SCRIPT.");
                  });
          })
          .catch(err => console.log(err));
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'get-el_key') {
      chrome.storage.local.get('el_key', data => {
          if (chrome.runtime.lastError) {
              sendResponse({
                  message: 'fail'
              });
              return;
          }

          sendResponse({
              message: 'success',
              payload: data.el_key
          });
      });

      return true;
  } 
  else if (request.message === 'get-auto_scroll') {
      chrome.storage.local.get('auto_scroll', data => {
          if (chrome.runtime.lastError) {
              sendResponse({
                  message: 'fail'
              });
              return;
          }

          sendResponse({
              message: 'success',
              payload: data.auto_scroll
          });
      });

      return true;
  }
  else if (request.message === 'get-auto_next') {
      chrome.storage.local.get('auto_next', data => {
          if (chrome.runtime.lastError) {
              sendResponse({
                  message: 'fail'
              });
              return;
          }

          sendResponse({
              message: 'success',
              payload: data.auto_next
          });
      });

      return true;
  }
  else if (request.message === 'get-speed') {
      chrome.storage.local.get('speed', data => {
          if (chrome.runtime.lastError) {
              sendResponse({
                  message: 'fail'
              });
              return;
          }

          sendResponse({
              message: 'success',
              payload: data.speed
          });
      });

      return true;
  }
  else if (request.message === 'change-el_key') {
      console.log("got it")
    chrome.storage.local.set({
      el_key: request.payload
    }, () => {
        if (chrome.runtime.lastError) {
            sendResponse({ message: 'fail' });
            return;
        }

        sendResponse({ message: 'success' });
    })

    return true;
}
  else if (request.message === 'change-auto_scroll') {
    chrome.storage.local.set({
      auto_scroll: request.payload
    }, () => {
        if (chrome.runtime.lastError) {
            sendResponse({ message: 'fail' });
            return;
        }

        sendResponse({ message: 'success' });
    })

    return true;
}
  else if (request.message === 'change-auto_next') {
    chrome.storage.local.set({
      auto_next: request.payload
    }, () => {
        if (chrome.runtime.lastError) {
            sendResponse({ message: 'fail' });
            return;
        }

        sendResponse({ message: 'success' });
    })

    return true;
}
  else if (request.message === 'change-speed') {
    chrome.storage.local.set({
      speed: request.payload
    }, () => {
        if (chrome.runtime.lastError) {
            sendResponse({ message: 'fail' });
            return;
        }

        sendResponse({ message: 'success' });
    })

    return true;
}
else if (request.message === 'update_from_btn') {
  // console.log("updated")
  chrome.storage.local.set({ action: Date.now() });

  return true;
}
else if (request.message === 'alert_di') {
  console.log("alert dayyyyyy")
//   chrome.storage.local.set({ action: Date.now() });

  return true;
}
});
