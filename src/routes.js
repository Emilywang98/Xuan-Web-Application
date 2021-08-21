/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Exercises from "views/Exercises.js";
import Programs from "views/Programs.js";
import Program from "views/Program.js";
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Habits.js";
import Maps from "views/Map.js";
import UserPage from "views/Workout.js";
import UpgradeToPro from "views/Upgrade.js";
import Client from "views/Client.js";

var routes = [
  {
    path: "/exercises",
    name: "Exercises",
    // icon: "nc-icon nc-bank",
    component: Exercises,
    layout: "/admin",
  },

  {
    path: "/programs",
    name: "Programs",
    // icon: "nc-icon nc-bell-55",
    component: Programs,
    layout: "/admin",
  },

  {
    type: "program",
    path: "/homeworkclub",
    name: "Homework Club",
    // icon: "nc-icon nc-bell-55",
    component: Program,
    layout: "/admin",
    clients: [
      {
        name: "Client 1",
      },
      {
        name: "Client 2"
      },
    ]
  },

  {
    path: "/client",
    name: "Client A",
    // icon: "nc-icon nc-bell-55",
    component: Client,
    layout: "/admin",
  },

  // //Workout page 
  // {
  //   path: "/Workout",
  //   name: "Add Workout",
  //   // icon: "FaDumbbell",
  //   component: UserPage,
  //   layout: "/admin",
  // },

  // //Habits page
  // {
  //   path: "/Habits",
  //   name: "Add Habits",
  //   // icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },


];
export default routes;
