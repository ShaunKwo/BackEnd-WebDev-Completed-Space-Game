//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

document.addEventListener("DOMContentLoaded", function () {
    let user_id;
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    const task_id = urlParams.get("task_id");
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

            fetchMethod(currentUrl + `/api/taskProgress/${task_id}/users/${user_id}`, callbackForProgressList, 'POST');
        }
    };

    const ProgressList = document.getElementById("ProgressList");

    const callbackForProgressList = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 404) {
            ProgressList.innerHTML = `${responseData.message}`;
            return;
        }

        ProgressList.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">TaskProgressID: ${responseData[0].progress_id}</h5>
                    <p class="card-text">
                        UserID: ${responseData[0].user_id} <br>
                        TaskID: ${responseData[0].task_id} <br>
                        Completion Date: ${responseData[0].completion_date} <br>
                    </p>
                </div>
            </div>
        `;
    };

    fetchMethod(currentUrl + `/api/jwt/verify`, callbackForVerification, "GET", null, token);
});
