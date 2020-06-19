const data = [
  
   {
    id: "conversations",
    icon: "iconsminds-air-balloon-1",
    label: "Conversations",
    to: "/app/conversations",
    subs: []
  }

];
//debugger;
if(localStorage.getItem("role") == "admin"){
  var adminpath = {
    id: "admin",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.administration",
    to: "/app/admin/",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/admin/users"
      }
    ]
  }; 
  data.push(adminpath);
}
export default data;
