//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const user_id = localStorage.getItem("store_userid");
console.log(user_id)

const TPcallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const taskProgressList = document.getElementById("taskProgressList");
        responseData.forEach((taskProgress) => {
            const taskProgressItem = document.createElement("div");
            taskProgressItem.className =
                "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            taskProgressItem.innerHTML = `    
            <div class ="card">          
                <div class="card-body">
                    <h5 class="card-title">Task: ${taskProgress.task_name}</h5>
                        <p class="card-text">
                            Task ID: ${taskProgress.task_id}<br>
                            Completion Date: ${taskProgress.completion_date}<br>
                        </p>    
                <div>
            </div>        
            `;

            taskProgressList.appendChild(taskProgressItem);
        });
    };
    fetchMethod(currentUrl + `/api/taskProgress/users/${user_id}`, TPcallback);
        
    const QPcallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const questProgressList = document.getElementById("questProgressList");
            responseData.forEach((questProgress) => {
                const questProgressItem = document.createElement("div");
                questProgressItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                questProgressItem.innerHTML = `    
                <div class ="card">          
                    <div class="card-body">
                        <h5 class="card-title">Quest: ${questProgress.quest_name}</h5>
                            <p class="card-text">
                                Quest ID: ${questProgress.quest_id}<br>
                                Planet ID obtained: ${questProgress.planet_id}<br>
                                Completion Date: ${questProgress.completion_date}<br>
                            </p>    
                    <div>
                </div>        
                `;
    
                questProgressList.appendChild(questProgressItem);
            });
        };
    fetchMethod(currentUrl + `/api/questProgress/users/${user_id}`, QPcallback);

    const ABcallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const userAbilitiesList = document.getElementById("userAbilitiesList");
            responseData.forEach((questProgress) => {
                const userAbilitiesItem = document.createElement("div");
                userAbilitiesItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                    userAbilitiesItem.innerHTML = `    
                <div class ="card">          
                    <div class="card-body">
                        <h5 class="card-title">Ability: ${questProgress.ability_name}</h5>
                            <p class="card-text">
                            Planet conquered to get Ability: ${questProgress.planet_name}<br>
                            </p>    
                    <div>
                </div>        
                `;
    
                userAbilitiesList.appendChild(userAbilitiesItem);
            });
        };
    fetchMethod(currentUrl + `/api/questProgress/userAbilities/${user_id}`, ABcallback);

    const INVcallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        const inventoryList = document.getElementById("inventoryList");
            responseData.forEach((inventory) => {
                const inventoryItem = document.createElement("div");
                inventoryItem.className =
                    "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
                    inventoryItem.innerHTML = `    
                <div class ="card">          
                    <div class="card-body">
                        <h5 class="card-title">Item Name: ${inventory.item_name}</h5>
                            <p class="card-text">
                            Item ID: ${inventory.item_id}<br>
                            </p>    
                    <div>
                </div>        
                `;
    
                inventoryList.appendChild(inventoryItem);
            });
        };
    fetchMethod(currentUrl + `/api/inventory/users/${user_id}`, INVcallback);


