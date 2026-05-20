let dateElement=document.getElementById("dateTime");
if(dateElement){
    setInterval(()=>{
        let now=new Date();
        dateElement.innerHTML=now.toLocaleString();
    },1000);
}
let participants=[];
let sportsForm=document.getElementById("sportsForm");
if(sportsForm){
    sportsForm.addEventListener("submit", function(e){
        e.preventDefault();
        let name=document.getElementById("studentName").value.trim();
        let reg=document.getElementById("registerNumber").value.trim();
        let email=document.getElementById("email").value.trim();
        let mobile=document.getElementById("mobile").value.trim();
        let event=document.getElementById("event").value;
        let type=document.getElementById("type").value;
        let message=document.getElementById("message");
        let regPattern=/^[A-Z0-9]+$/;
        let emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if(name.length<3){
            message.innerHTML="Enter valid student name";
            message.className="error";
            return;
        }
        if(!regPattern.test(reg)){
            message.innerHTML = "Invalid register number";
            message.className = "error";
            return;
        }
        if(!emailPattern.test(email)){
            message.innerHTML = "Invalid email format";
            message.className = "error";
            return;
        }
        if(mobile.length != 10){
            message.innerHTML = "Mobile number must contain 10 digits";
            message.className = "error";
            return;
        }
        if(event==""){
            message.innerHTML = "Please select an event";
            message.className = "error";
            return;
        }
        let duplicate=participants.find(function(item){
            return item.reg == reg && item.event == event;
        });
        if(duplicate){
            message.innerHTML="Duplicate participation not allowed";
            message.className="error";
            return;
        }
        participants.push({
            reg:reg,
            event:event
        });
        message.innerHTML="Participation submitted successfully";
        message.className="success";
        let participantDiv=document.getElementById("participants");
        let newEntry=document.createElement("div");
        newEntry.innerHTML="<b>Name:</b> " +name+" | <b>Register No:</b> "+reg+" | <b>Event:</b> "+event+" | <b>Type:</b> "+type;
        participantDiv.appendChild(newEntry);
        document.getElementById("count").innerHTML = participants.length;
        sportsForm.reset();
    });
}
let feedbackForm=document.getElementById("feedbackForm");
let totalRating=0;
let feedbackCount=0;
if(feedbackForm){
    feedbackForm.addEventListener("submit",function(e){
        e.preventDefault();
        let name=document.getElementById("fbName").value.trim();
        let reg=document.getElementById("fbReg").value.trim();
        let event=document.getElementById("fbEvent").value;
        let rating=document.getElementById("rating").value;
        let comments=document.getElementById("comments").value.trim();
        let feedbackMessage=document.getElementById("feedbackMessage");
        let regPattern=/^[A-Z0-9]+$/;
        if(!regPattern.test(reg)){
            feedbackMessage.innerHTML="Invalid register number";
            feedbackMessage.className="error";
            return;
        }
        if(event==""){
            feedbackMessage.innerHTML="Please select event";
            feedbackMessage.className="error";
            return;
        }
        if(rating==""){
            feedbackMessage.innerHTML="Please select rating";
            feedbackMessage.className="error";
            return;
        }
        if(comments.length<20){
            feedbackMessage.innerHTML="Comments must contain minimum 20 characters";
            feedbackMessage.className="error";
            return;
        }
        feedbackMessage.innerHTML="Feedback submitted successfully";
        feedbackMessage.className="success";
        let feedbackList=document.getElementById("feedbackList");
        let div = document.createElement("div");
        div.innerHTML="<b>Name:</b> " +name+" | <b>Event:</b> "+event+" | <b>Rating:</b> "+rating;
        feedbackList.appendChild(div);
        totalRating+=Number(rating);
        feedbackCount++;
        let average=totalRating/feedbackCount;
        document.getElementById("average").innerHTML =
        average.toFixed(1);
        feedbackForm.reset();

    });
}
