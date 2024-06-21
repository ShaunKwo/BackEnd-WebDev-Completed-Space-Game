//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

document.addEventListener("DOMContentLoaded", function () {
    let user_id
    const quest_id = urlParams.get("quest_id");
    const token = localStorage.getItem('token')
    const callbackForVerification = (responseStatus, responseData) => {

        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        
        if (responseStatus == 401) {
            createModelText.innerHTML += `
            <p class = text-warning>
                ${responseData.message}
            </p>`
        }
        else if (responseStatus == 200){
            user_id = responseData.userId
            fetchMethod(currentUrl + `/api/questProgress/${quest_id}/users/${user_id}`,  callbackForQuestProgressList,'POST');

        }
    }

    const callbackForQuestProgressList = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        const QuestProgressList = document.getElementById("QuestProgressList");
        if (responseStatus == 404) {
            QuestProgressList.innerHTML = `${responseData.message}`;
            return;
        }
  
        QuestProgressList.innerHTML = `
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">TaskProgressID: ${responseData.quest_progress_id}</h5>
                <p class="card-text">
                    UserID: ${responseData.user_id} <br>
                    QuestID: ${responseData.quest_id} <br>
                    Completion Date: ${responseData.quest_completion_date} <br>
                    ItemID: ${responseData.itemid} <br>
                    PlanetId: ${responseData.planet_id}<br>
                    Updated Colony Level: ${responseData.colony_level}<br>
                    </p>
                </div>
            </div>
        `;
    };

    fetchMethod(currentUrl + `/api/jwt/verify`, callbackForVerification, "GET", null, token)
})



