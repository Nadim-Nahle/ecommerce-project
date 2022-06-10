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


