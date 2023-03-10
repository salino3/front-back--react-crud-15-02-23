const router = require('express').Router();
const { getUsers, getUser, createUser, modifyUser, deleteUser } = require("../controllers/users");


router.get("/", getUsers);

router.get("/:userId", getUser);

router.post('/', createUser)

router.put('/:userId', modifyUser);

router.delete('/:userId', deleteUser);


module.exports = router;


 
