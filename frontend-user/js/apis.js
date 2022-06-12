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
        //console.log(result.token_type);
        if(result.token_type == 'bearer'){
          location.href = 'file:///C:/xampp/htdocs/ecommerce-project/frontend-user/index.html';
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
          console.log(newName);
          newDescription =(result.items[i].detail);
          console.log(newDescription);
          newPic =(result.items[i].pic_link);
          console.log(newPic);
          
          const itemContainer = document.querySelector(".item-container");
          const itemCard = document.createElement("div");
          itemCard.classList.add("item-card");

          const itemImage = document.createElement("div");
          itemImage.classList.add("item-image");
          

          const itemInfo = document.createElement("div");
          itemInfo.classList.add("item-info");

          const a = document.createElement("a");

          const img = document.createElement("img");
          img.classList.add("item-thumb");
          img.src = newPic;

          const fav = document.createElement("button");
          fav.classList.add("card-btn");

          const h2 = document.createElement("h2");
          h2.classList.add("item-name");
          h2.innerHTML=newName;

          const p1 = document.createElement("p");
          p1.classList.add("item-short-description");
          p1.innerHTML=newDescription;

          itemContainer.appendChild(itemCard);
          itemCard.appendChild(itemImage);
          itemImage.appendChild(a);
          itemImage.appendChild(fav);
          fav.innerHTML="add to favorites";
          a.appendChild(img);
          itemCard.appendChild(itemInfo);
          itemInfo.appendChild(h2);
          itemInfo.appendChild(p1);
          a.setAttribute('href', "review.html")
        }
        
      })

               
  })

}


