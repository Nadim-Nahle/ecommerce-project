//signup script
let signupBtn = document.getElementById("sign-up-btn");
if( signupBtn){
  signupBtn.addEventListener("click", function(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const emailSignup = document.getElementById("email").value;
    const passwordSignup = document.getElementById("pwd").value;
    const passwordSignupConfirm = document.getElementById("pwd-confirm").value;
    let data = new FormData();
    data.append('name', username);
    data.append('email', emailSignup);
    data.append('password', passwordSignup);
    data.append('password_confirmation', passwordSignupConfirm);
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/user/auth/register',
        data: data,
    })
    .then(function (response) {
      let result = (response.data);
      console.log(result.message);
      let message = result.status;
      if(result.message){
        location.href = 'file:///C:/xampp/htdocs/ecommerce-project/frontend-user/login.html';
     };

                
    })
})
}



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
        localStorage.setItem('jwt', jwt);
        //console.log(result.token_type);
        if(result.token_type == 'bearer'){
          location.href = 'file:///C:/xampp/htdocs/ecommerce-project/frontend-user/item.html';
        }
        
              

   })
     

});
}



//Get Items Script
let nxtBtns = document.querySelector(".nxt-btn")
if(nxtBtns){
  window.addEventListener('load', (event) => {
    let data = new FormData();
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/v1/items/item',
      data: data,
  })
      .then(function(response) {
        
        let result=(response.data);
        //console.log(result.items.length);
        for (let i =0; i<result.items.length; i++){
          newName = (result.items[i].name);
          //console.log(newName);
          newDescription =(result.items[i].detail);
          //console.log(newDescription);
          newPic =(result.items[i].pic_link);
          //console.log(newPic);
          
          $(".item-container").append('<div class="item-card"> <div class="item-image"> <img src='+newPic+' class="item-thumb" alt=""> <button class="card-btn" type="button" id="qwe">add to favorites</button> </div> <div class="item-info"> <h2 class="item-name">'+newName+'</h2> <p class="item-short-description">'+newDescription+'</p></div></div>');
        }
        
      })

               
  })

}
var bearer = localStorage.getItem('jwt');
//Add to fav script
  favBtn = document.querySelector(".item-container")
  if(favBtn){
    console.log("dd");
    $(document).on('click', '.card-btn', function(){
      
      const newName = $(this).parent().siblings('.item-info').children('.item-name').text();
      //console.log(newName);
      const newDesc = $(this).parent().siblings('.item-info').children('.item-short-description').text();
      //console.log(newDesc);
      $(this).hide();
      const newPrice = '10';
      
      let newData = new FormData();
      newData.append('title', newName);
      newData.append('detail', newDesc);
      newData.append('price', newPrice);

      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/fav/auth/addtofav',
        data: newData,
        headers: {'Authorization': 'Bearer '+bearer}
    })
    .then(function (response) {
      let result = (response.data);
      console.log(result);
    });
                
  });
  }

  //Logout Script
  let logoutBtn = document.getElementById("logout");
  logoutBtn.addEventListener("click", function(event){
    //console.log('s');
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/v1/user/auth/logout',
      headers: {'Authorization': 'Bearer '+bearer}
  })
  .then(function (response) {
      let result = (response.data);
      localStorage.clear();
      //console.log(result);
      location.href = 'file:///C:/xampp/htdocs/ecommerce-project/frontend-user/login.html';;

      });

  })

  //Get Fav Script

  let newFav = document.querySelector(".favio")
  if(newFav){
  window.addEventListener('load', (event) => {
    let data = new FormData();
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/api/v1/fav/auth/fav',
      data: data,
      headers: {'Authorization': 'Bearer '+bearer}
  })
      .then(function(response) {
        
        let result=(response.data);
        //console.log(result.favourites.length);
        for (let i =0; i<result.favourites.length; i++){
          newName = (result.favourites[i].title);
          //console.log(newName);
          newDescription =(result.favourites[i].detail);
          //console.log(newDescription);
          newPic =(result.favourites[i].pic_link);
          //console.log(newPic);
          
          $(".item-containerr").append('<div class="item-card"> <div class="item-image"> <img src='+newPic+' class="item-thumb" alt=""> </div> <div class="item-info"> <h2 class="item-name">'+newName+'</h2> <p class="item-short-description">'+newDescription+'</p></div></div>');
        }
        
      })

               
  })
}

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
