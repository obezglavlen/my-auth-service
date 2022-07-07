import statusController from "../../../controllers/status";

export default [
  {
    method: "get",
    route: "/status",
    controller: statusController,
    action: "get",
    validate: [],
  },
];
