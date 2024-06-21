//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

document.addEventListener("DOMContentLoaded", function () {
    const url = new URL(document.URL);
    const urlParams = url.searchParams;
    user_id = urlParams.get('user_id')

    const progressBar = document.getElementById("progressBarFill");
    const claimEngineerBtn = document.getElementById("claimEngineerBtn");
    const claimScientistBtn = document.getElementById("claimScientistBtn");
    const claimCaptainBtn = document.getElementById("claimCaptainBtn");

    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userInfo = document.getElementById("userInfo");
        if (responseStatus == 404) {
            userInfo.innerHTML = `${responseData.message}`;
            return;
        }

        userInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                        UserID: ${responseData.user_id} <br>
                        Username: ${responseData.username} <br>
                        Appearance: ${responseData.appearance_name} <br>
                        Colony Level: ${responseData.colony_level} <br>
                        Power Level: ${responseData.power_level} <br>
                        Total Points: ${responseData.total_points} <br>
                    </p>
                </div>
            </div>
        `;

        updateProgressBar(responseData.total_points);
        checkAppearanceClaim(responseData.total_points);
    };

    const updateProgressBar = (points) => {
        const progress = Math.min((points / 1000) * 100, 100);
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute("aria-valuenow", progress);
    };

    const checkAppearanceClaim = (points) => {
        const claimedAppearances = JSON.parse(localStorage.getItem('claimed_appearances')) || [];

        if (points >= 600 ) {
            claimEngineerBtn.style.display = "block";
        }
        if (points >= 800 ) {
            claimScientistBtn.style.display = "block";
        }
        if (points >= 1000 ) {
            claimCaptainBtn.style.display = "block";
        }
    };

    const claimAppearance = (appearance_id) => {
        fetchMethod(`${currentUrl}/api/users/${user_id}/claim_appearance/${appearance_id}`, (responseStatus, responseData) => {
            const claimedAppearances = JSON.parse(localStorage.getItem('claimed_appearances')) || [];
            claimedAppearances.push(appearance_id);
            localStorage.setItem('claimed_appearances', JSON.stringify(claimedAppearances));

            location.reload();
            console.log(`Claiming Appearance ID ${appearance_id}:`, responseData);
        }, "PUT");
    };

    claimEngineerBtn.addEventListener("click", () => {
        claimAppearance(4); // appearance_id for Engineer
        claimEngineerBtn.style.display = "none";
    });

    claimScientistBtn.addEventListener("click", () => {
        claimAppearance(3); // appearance_id for Scientist
        claimScientistBtn.style.display = "none";
    });

    claimCaptainBtn.addEventListener("click", () => {
        claimAppearance(2); // appearance_id for Captain
        claimCaptainBtn.style.display = "none";
    });

    fetchMethod(currentUrl + `/api/users/${user_id}`, callbackForUserInfo);
});
