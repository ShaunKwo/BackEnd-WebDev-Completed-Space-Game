//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const UsersList = document.getElementById("UsersList");
    responseData.forEach((Users) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
          <img src="./img_folder/astronaut.jpg" class="card-img-top" alt="users Image" width="100" height="200">
              <div class="card-body">
                  <h5 class="card-title">ID: ${Users.user_id}</h5>
                  <p class="card-text">
                      Username: ${Users.username} <br>
                      Email: ${Users.email} <br>
                  </p>
                  <div class="card-footer">
                  <a href="singleUserInfo.html?user_id=${Users.user_id}" class="btn btn-dark">View details</a>
              </div>
              </div>
          </div>
          `;
      UsersList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/users", callback);