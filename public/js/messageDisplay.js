//Author: Shaun Kwo Rui Yu
//Adm No.: 2317933
// Class: DAAA/FT/1B06

// Function to delete a message by message_id
function deleteMessage(message_id) {
    // Callback function for deleting Messages
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        // Reload the page after deleting the message
        window.location.reload(true);
    };

    // Perform the delete request
    fetchMethod(currentUrl + `/api/Messages/${message_id}`, callback, "DELETE");
}


function editMessage(event) {
    const message_id = event.target.getAttribute("stored_messageID");

    document.getElementById('editMessagesModal').setAttribute("stored_messageID", message_id);
    const editMessageForm = document.getElementById("editMessageForm").value;


    document.getElementById('editMessagesModal').classList.add('show');
    document.getElementById('editMessagesModal').style.display = 'block';

}

function save() {
    const user_id = localStorage.getItem("stored_userid");

    // Get the stored message_id from the modal
    const message_id = parseInt(document.getElementById('editMessagesModal').getAttribute('stored_messageID'));

    // Get the edited message text from the input field
    const editedContent = document.getElementById("editMessageForm").value;

    const data = {
        user_id: user_id,
        message_id: message_id,
        content: editedContent
    };

    const callback = (responseStatus, responseData) => {
        console.log("Response Status:", responseStatus);
        if (responseStatus === 200) {
            console.log("Message successfully edited:", responseData);
            location.reload();
        } else {
            console.error("Error editing message:", responseData);
        }
    };

    fetchMethod(currentUrl + `/api/Messages/${message_id}`, callback, "PUT", data);
}




// Wait for the DOM to be ready before executing the code
document.addEventListener("DOMContentLoaded", function () {
    
    // Retrieve user ID from local storage
    const store_userid = localStorage.getItem("store_userid");

    // Callback function for displaying Messages
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // Iterate through each Messages in the response data
      responseData.forEach((Messages) => {
        
        // Display the appropriate username based on reciever conditions
        var reciever_id = Messages.reciever_id;
        var reciever_username = Messages.reciever_username;
        if (reciever_id == 0) {
            reciever_username = "Everyone";
        } else if (reciever_id == store_userid) {
            reciever_username = "You";
        } else if (reciever_id > 0) {
            reciever_username = Messages.reciever_username;
        }

        // Determine which list to append to based on reciever_id
        if (Messages.reciever_id == 0) {
            var MessagesList = document.getElementById("MessagesList");
        } else if (Messages.reciever_id == store_userid) {
            var MessagesList = document.getElementById("recievedMessagesList");
        } else if (Messages.store_userid == store_userid) {
            var MessagesList = document.getElementById("sentMessagesList");
        } else {
            return;
        }

        // Create a new <div> element for displaying Messages
        const displayItem = document.createElement("div");
        displayItem.className =
            "col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-3 ";
        displayItem.innerHTML = `
            <div class="card h-100 d-flex flex-column">
                <div class="card-body">
                    <div class="row">                  
                        <u><h2 class="pl-2 card-title">User ${Messages.sender_username}:</h2></u>
                        <button class="btn btn-secondary mt-2 ml-auto" id="editButton" stored_messageID="${Messages.message_id}" onclick="editMessage(event)"  data-toggle="modal" data-target="#editMessagesModal">edit</button>

                        <button class="btn btn-danger mt-2 " id="deleteButton" onclick=deleteMessage(${Messages.message_id})>delete</button>
                    </div>
                </div>
                <div class="form-group mt-auto m-3 ">
                    <p class="card-text" id="Content${Messages.message_id}"><h3>${Messages.content}</h3></p>
                    <p class="card-text">Created on: ${Messages.created_at}</p>
                    <p class="card-text">Send to:${reciever_username}</p>

                </div>
            </div>
        `;

        // Append the new Messages <div> to the appropriate list
        MessagesList.appendChild(displayItem);

        // Create edit and delete buttons for each Messages
        const editButton = document.getElementById(`editButton`);
        const deleteButton = document.getElementById(`deleteButton`);
        if (Messages.store_userid == store_userid) {
            // Display edit and delete buttons only for user's own Messages
            editButton.classList.remove("d-none");
            deleteButton.classList.remove("d-none");
        } else {
            editButton.classList.add("d-none");
            deleteButton.classList.add("d-none");
        }


        // Event listener to send delete request when delete button is clicked
        deleteButton.addEventListener("click", function (event) {
            event.preventDefault();
            // Callback function for deleting Messages
            const callback5 = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
            }

            const message_id = Messages.message_id;
            event.preventDefault();
            fetchMethod(currentUrl + `/api/Messages/${message_id}`, callback5, "DELETE");
            window.location.reload(true);
        });

      });
    };

    // Callback function for displaying users in the dropdown list
    const callback2 = (responseStatus, responseData) => {
        // Assuming you have an "Everyone" user with store_userid 0, if not, modify accordingly
        const everyoneUser = { store_userid: 0, username: "Everyone" };

        // Clear existing dropdown items
        const dropdownList = document.getElementById("UserSelect");
        dropdownList.innerHTML = "";

        // Create a new <option> element for the "Everyone" user
        const dropdownItemEveryone = document.createElement("option");
        dropdownItemEveryone.setAttribute("class", "dropdown-item");
        dropdownItemEveryone.setAttribute("id", everyoneUser.store_userid);
        dropdownItemEveryone.textContent = everyoneUser.username;

        // Append the "Everyone" <option> element to the dropdownList
        dropdownList.appendChild(dropdownItemEveryone);
    }
    
    // Get the Messages button element
    const MessagesButton = document.getElementById("MessagesButton");

    // Callback function for Messages request
    const callback3 = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    }
   
    // Event listener to send Messages request when Messages button is clicked
    MessagesButton.addEventListener("click", function (event) { 
        const userSelect = document.getElementById("UserSelect");
        const selectedOption = userSelect.selectedOptions[0];
        
        // Get the id of the currently selected option
        const selectedOptionId = selectedOption.id;
        const data = {
            reciever_id: selectedOptionId,
            content: document.getElementById("MessagesField").value
        };
        event.preventDefault();
        fetchMethod(currentUrl + `/api/Messages/${store_userid}`, callback3, "POST", data);
    });

    // Fetch users data and populate the dropdown list
    fetchMethod(currentUrl + "/api/users", callback2);
  
    // Fetch Messages data and display Messages
    fetchMethod(currentUrl + "/api/Messages", callback);
});
