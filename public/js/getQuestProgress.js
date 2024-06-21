//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


document.addEventListener("DOMContentLoaded", function () {
    let user_id;
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const quest_id = urlParams.get("quest_id");
    const token = localStorage.getItem('token');
    const store_userid =localStorage.getItem('store_userid')
    const createModelText = document.getElementById("createModelText");

    const callbackForVerification = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 401) {
            createModelText.innerHTML += `
                <p class="text-warning">
                    ${responseData.message}
                </p>`;
        } else if (responseStatus == 200) {
            user_id = responseData.userId;
            // Check if user_id is undefined, if yes, use store_userid
            if (user_id === undefined && store_userid !== undefined) {
                user_id = store_userid;
            }

            fetchMethod(currentUrl + `/api/questProgress/${quest_id}/users/${user_id}`, callbackForQuestProgressList, 'POST');
        }
    };

    const QuestProgressList = document.getElementById("QuestProgressList");

    const callbackForQuestProgressList = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 404) {
            QuestProgressList.innerHTML = `${responseData.message}`;
            return;
        }

        QuestProgressList.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">questProgressID: ${responseData[0].quest_progress_id}</h5>
                    <p class="card-text">
                        UserID: ${responseData[0].user_id} <br>
                        QuestID: ${responseData[0].quest_id} <br><br>
                        ItemID: ${responseData[0].item_id}<br>
                        Item: ${responseData[0].item_name}<br><br>
                       
                        PlanetID:${responseData[0].planet_id}<br>
                        Planet: ${responseData[0].planet_name}<br>
                        Planet Description: ${responseData[0].description}<br>
                    </p>
                </div>
            </div>
        `;
    };

    fetchMethod(currentUrl + `/api/jwt/verify`, callbackForVerification, "GET", null, token);
});
