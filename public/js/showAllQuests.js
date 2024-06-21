//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const QuestsList = document.getElementById("QuestsList");
    responseData.forEach((Quests) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
          <div class="card">
          <img src="./img_folder/quest${Quests.quest_id}.jpg" class="card-img-top" alt="quests Image">
              <div class="card-body">
                  <h5 class="card-title">ID: ${Quests.quest_id}</h5>
                  <p class="card-text">
                      Quest Name: ${Quests.quest_name} <br>
                      Item ID: ${Quests.item_id} <br>
                      Planet ID: ${Quests.planet_id} <br>
                      <a href="getQuestProgress.html?quest_id=${Quests.quest_id}" class="btn btn-primary" data-quest_id=${Quests.quest_id}>Complete Quests</a>
                  </p>
              </div>
          </div>
          `;
      QuestsList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/quests", callback);