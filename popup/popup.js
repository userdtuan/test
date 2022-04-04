// alert("clicked")
// document.getElementById("el_key").value = "test";
const el_key = document.getElementById("el_key");
const speed = document.getElementById("speed");
const auto_scroll = document.getElementById("auto_scroll");
const auto_next = document.getElementById("auto_next");
const button = document.getElementById("save");

chrome.runtime.sendMessage(
  {
    message: "get-el_key",
  },
  (response) => {
    if (response.message === "success") {
      el_key.value = response.payload;
    }
  }
);

chrome.runtime.sendMessage(
  {
    message: "get-auto_scroll",
  },
  (response) => {
    if (response.message === "success") {
      auto_scroll.checked = response.payload;
    }
  }
);
chrome.runtime.sendMessage(
  {
    message: "get-speed",
  },
  (response) => {
    if (response.message === "success") {
      speed.value = response.payload;
    }
  }
);

chrome.runtime.sendMessage(
  {
    message: "get-auto_next",
  },
  (response) => {
    if (response.message === "success") {
      auto_next.checked = response.payload;
    }
  }
);
const save_state = () => {
   chrome.runtime.sendMessage(
    {
      message: "change-speed",
      payload: speed.value,
    },
    (response) => {}
  );
   chrome.runtime.sendMessage(
    {
      message: "change-auto_scroll",
      payload: auto_scroll.checked,
    },
    (response) => {}
  );
   chrome.runtime.sendMessage(
    {
      message: "change-auto_next",
      payload: auto_next.checked,
    },
    (response) => {}
  );
   chrome.runtime.sendMessage(
    {
      message: "change-el_key",
      payload: el_key.value,
    },
    (response) => {}
  );
   chrome.runtime.sendMessage({
    message: "update_from_btn",
  });
};
button.onclick = async() => {
    let promise = new Promise((resolve, reject) => {
    save_state()
    resolve()
  });
  await promise
  console.log("hello")
  let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 100)
  });

  let result = await promise2; // wait until the promise resolves (*)

  // alert(result); // "done!"
  window.close();

};
