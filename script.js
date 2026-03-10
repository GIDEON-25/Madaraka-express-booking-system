let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
let totalSeats = 50;

function updateSeats(){
seatInfo.innerHTML="Available Seats: "+(totalSeats - tickets.length);
}
updateSeats();

/* FARE */

function calculateFare(cls){
if(cls=="First") return 3000;
if(cls=="Second") return 2000;
return 1000;
}

/* BOOK TICKET */

function bookTicket(){

if(name.value==""){alert("Enter Name"); return;}
if(tickets.length>=totalSeats){alert("Train Full"); return;}

let ticketID="TKT"+Math.floor(Math.random()*100000);

let cls=classType.value;

let data={
id:ticketID,
name:name.value,
train:train.value,
class:cls,
from:from.value,
to:to.value,
date:date.value,
fare:calculateFare(cls),
status:"Booked"
};

tickets.push(data);

localStorage.setItem("tickets",JSON.stringify(tickets));

alert("Ticket Booked!\nTicket ID: "+ticketID+"\nFare: KES "+data.fare);

name.value="";
age.value="";
from.value="";
to.value="";
date.value="";

updateSeats();
}

/* NAVIGATION */

function showAdminLogin(){
bookingPage.classList.add("hide");
loginPage.classList.remove("hide");
}

function showBooking(){
adminPage.classList.add("hide");
loginPage.classList.add("hide");
bookingPage.classList.remove("hide");
}

/* ADMIN LOGIN */

function adminLogin(){

if(adminUser.value=="admin" && adminPass.value=="admin123"){

loginPage.classList.add("hide");
adminPage.classList.remove("hide");

loadTickets();

}else{

alert("Wrong Login");

}

}

/* LOAD TICKETS */

function loadTickets(){

ticketTable.innerHTML=`
<tr>
<th>Ticket ID</th>
<th>Name</th>
<th>Train</th>
<th>Class</th>
<th>From</th>
<th>To</th>
<th>Date</th>
<th>Fare</th>
<th>Status</th>
<th>Action</th>
</tr>
`;

let filter=search.value.toLowerCase();

tickets.forEach((t,i)=>{

if(t.id.toLowerCase().includes(filter)||t.name.toLowerCase().includes(filter)){

let row=ticketTable.insertRow();

row.insertCell(0).innerHTML=t.id;
row.insertCell(1).innerHTML=t.name;
row.insertCell(2).innerHTML=t.train;
row.insertCell(3).innerHTML=t.class;
row.insertCell(4).innerHTML=t.from;
row.insertCell(5).innerHTML=t.to;
row.insertCell(6).innerHTML=t.date;
row.insertCell(7).innerHTML="KES "+t.fare;
row.insertCell(8).innerHTML=t.status;

row.insertCell(9).innerHTML=`<button onclick="cancelTicket(${i})">Cancel</button>`;

}

});

}

/* CANCEL */

function cancelTicket(i){

tickets[i].status="Cancelled";

localStorage.setItem("tickets",JSON.stringify(tickets));

loadTickets();

}

/* CLEAR */

function clearAll(){

if(confirm("Delete all tickets?")){

localStorage.removeItem("tickets");

tickets=[];

loadTickets();

updateSeats();

}

}

/* EXPORT */

function exportExcel(){

let csv="TicketID,Name,Train,Class,From,To,Date,Fare,Status\n";

tickets.forEach(t=>{

csv+=`${t.id},${t.name},${t.train},${t.class},${t.from},${t.to},${t.date},${t.fare},${t.status}\n`;

});

let blob=new Blob([csv]);

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="railway_tickets.csv";

a.click();

}

/* PRINT */

function printReport(){

let w=window.open("");

w.document.write("<h2>Railway Ticket Report</h2><table border='1'><tr><th>ID</th><th>Name</th><th>Train</th><th>Status</th></tr>");

tickets.forEach(t=>{

w.document.write(`<tr><td>${t.id}</td><td>${t.name}</td><td>${t.train}</td><td>${t.status}</td></tr>`);

});

w.document.write("</table>");

w.print();

}