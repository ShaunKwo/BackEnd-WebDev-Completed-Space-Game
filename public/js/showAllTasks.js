//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06


const callback = (responseStatus, responseData) => {
  const newresponseData=responseData.slice(0,5);
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", newresponseData);  
  
    const TaskList = document.getElementById("TaskList");
    newresponseData.forEach((Task) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = ` 
          <div class="card">
          <img src="./img_folder/task${Task.task_id}.jpg" class="card-img-top" alt="task Image">
              <div class="card-body">
                  <h5 class="card-title">ID: ${Task.task_id}</h5>
                  <p class="card-text">
                      Title: ${Task.title} <br>
                      Description: ${Task.description} <br>
                      Points: ${Task.points} <br>
                      <a href="getTaskProgress.html?task_id=${Task.task_id}" class="btn btn-primary" data-task_id=${Task.task_id}>Complete Task</a>
                  </p>
              </div>
          </div>
          `;
      TaskList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/tasks", callback);