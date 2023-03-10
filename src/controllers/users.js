const { db } = require("../connection/db");


//* GET All
const getUsers =  (req, res) => {
 const q = 'SELECT * FROM users';
    try {  
        db.query(q, (err, data) => {
           if(err) {
               return res.json(err);
           }else{
               return res.json(data);
           };
        });
    } catch (error) {
         return res.json(err);
 };
};
 
//* GET One User
const getUser = (req, res) => {
  const { userId } = req.params;

  const q = `SELECT * FROM users WHERE id = ?`;
    try { 
        db.query(q, userId, (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            return res.json(data);
          }
        });
    } catch (error) {
            return res.json(err);
    };
};

//* POST create User
const createUser = (req, res) => {

 const q = "INSERT INTO users (name, email, password, active, age, img) VALUES (?)";

    const { name, email, password, active = true, age, img } = req.body;
  const values = [
        name,
        email, 
        password, 
        active, 
        age,
        img
     ];

      try {
        db.query(q, [values], (err, data) => {
          if (err) return res.json(err);
          res.json("User has been created sussefully");
        });     
      } catch (error) {
            return res.json(err);
      };
};


//* PUT modify User
const modifyUser = (req, res) => {
  const userId = req.params.userId;
  const updates = req.body; // Campos a actualizar

  // Crea dinámicamente la consulta SQL y los valores a actualizar
  let q = "UPDATE users SET ";
  const values = [];
  for (const [key, value] of Object.entries(updates)) {
    q += `${key} = (?), `;
    values.push(value);
  };
  q = q.slice(0, -2) + " WHERE id = (?)";
  values.push(userId);

  try {
    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
      res.json("User has been updated successfully");
    });
  } catch (error) {
    return res.json(error);
  };
};


//* DELETE User
const deleteUser = (req, res) => {
  const userId = req.params.userId;
  const { email, password, id } = req.body;

  const q = "SELECT * FROM users WHERE id = ?";
  db.query(q, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error retrieving user from database");
    }

    if (result.length === 0) {
      return res.status(404).send("User not found");
    }

    const user = result[0];

    if (user.password !== password && user.email !== email  ) {
      return res.status(401).send("Incorrect email or password");
    } 

    const qDelete = "DELETE from users WHERE id = ?";
    db.query(qDelete, [userId], (err, data) => {
      if (err) { 
        console.log(err);
        return res.status(500).send("Error deleting user from database");
      }
      return res.send("User has been deleted successfully");
    });
  });
};
  


module.exports = { getUsers, getUser, createUser, modifyUser, deleteUser };