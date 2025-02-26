const ctrls = require("../controllers/event");
const { isAdmin, verifyToken } = require("../middlewares/verify");
const router = require("express").Router();

router.get("/category", ctrls.getEventByCategoryName);
router.post("/", [verifyToken, isAdmin], ctrls.createEvent);
router.get("/", [verifyToken, isAdmin], ctrls.listAllEvent);
router.get("/categorydefaultleft", ctrls.getEventByCategoryLeft);
router.get("/categorydefaultright", ctrls.getEventByCategoryRight);
router.get("/:eid", ctrls.getEventById);

router.post("/insertmany", [verifyToken, isAdmin], ctrls.createManyEvent);
router.put("/:eid", [verifyToken], ctrls.updateEvent);
router.get(
  "/registerevent/:eid",
  [verifyToken, isAdmin],
  ctrls.listUserRegisEvent
);
router.delete("/:eid", [verifyToken], ctrls.deleteEvent);

router.put("/updevent/:eid", [verifyToken, isAdmin], ctrls.updateStatus);

module.exports = router;
