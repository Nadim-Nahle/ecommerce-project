//Login script
const loginBtn = document.querySelector("#login-btn");
const emailLogin = document.getElementById("email-login");
const passwordlogin = document.getElementById("password-login");
if(loginBtn){
  loginBtn.addEventListener("click", function (event) {
 
    event.preventDefault();
     let data = new FormData();

     data.append('email', emailLogin.value);
     data.append('password', passwordlogin.value);
     
     axios({
       method: 'post',
       url: 'http://127.0.0.1:8000/api/v1/user/auth/login',
       data: data,
   }).then(function (response) {
        
        let result = (response.data);
        const jwt = result.access_token;
        //console.log(jwt);
        localStorage.setItem('jwt', jwt);
        if(result.token_type == 'bearer'){
          window.location.href='adminpanel.html';
        }     
   })
     
});
}

var bearer = localStorage.getItem('jwt');

//Add Item Script
let restBtn = document.getElementById("contact-submit");
let newImage = document.getElementById("new-image ");
let newItem = document.querySelector(".new-item ");
  if(restBtn){
    restBtn.addEventListener("click", function(event){
      event.preventDefault();
      
      const itemName = document.getElementById("rest-name").value;
      const itemDescription = document.getElementById("rest-description").value;
      const itemPrice = document.getElementById("rest-description").value;
      const itemPic = document.getElementById("rest-pic").value;
      var y;
      document.getElementById('rest-pic');
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      var file = document.querySelector('#rest-pic').files[0];
      getBase64(file).then(
        data => {
          var pic  = data 
          console.log(pic)
          let newData = new FormData();
      newData.append('name', itemName);
      newData.append('detail', itemDescription);
      newData.append('price', itemPrice);
      newData.append('pic_link',pic )
      
      
      axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/v1/admin/auth/additem',
          data: newData,
          headers: {'Authorization': 'Bearer '+bearer}
      })
      .then(function (response) {
        let result = (response.data);
        //console.log(result)
        let message = result.status;
        console.log(message);
        if (message === 'Success'){
          console.log("hello");
          newItem.innerHTML = 'New Item Added !!!!!';
        }
                     
      })     
        },
           
      );
      //console.log(bearer);
      //console.log(y);
      
      
      
  })
  }

  //Logout Script
  let logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", function(event){
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/user/auth/logout',
      headers: {'Authorization': 'Bearer '+bearer}
  })
  .then(function (response) {
      let result = (response.data);
      localStorage.clear();
      //console.log(result);
      window.location.href='login.html';

      });

  })


  //Authorization script
  var body = document.getElementById("body");
  window.addEventListener('load', (event) => {
    if (bearer){
      body.style.display='block';
    }
    else{
      window.location.href='login.html';
    }

  });

  function createBrowserWindow() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      height: 600,
      width: 800
    });
  
    win.loadURL('adminpanel.html');
  }
  