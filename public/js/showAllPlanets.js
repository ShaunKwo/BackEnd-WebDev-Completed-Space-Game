//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const PlanetsList = document.getElementById("PlanetsList");
    responseData.forEach((Planets) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
          <img src="./img_folder/planet${Planets.planet_id}.jpg" class="card-img-top" alt="Planet Image">
              <div class="card-body">
                  <h5 class="card-title">ID: ${Planets.planet_id}</h5>
                  <p class="card-text">
                      Planet Name: ${Planets.planet_name} <br>
                      Description: ${Planets.description} <br>
                  </p>
              </div>
          </div>
          `;
      PlanetsList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/planets", callback);