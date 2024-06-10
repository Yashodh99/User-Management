const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");


router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET request to retrieve a user by ID
router.get('/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user)
          return res.status(404).send({ message: "User not found" });

      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



// POST request to create a new user
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Update a user

router.put('/:id', async (req, res) => {
  try {
      // Check if the user exists
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Validate the request body
      const { error } = validate(req.body);
      if (error) {
          return res.status(400).json({ message: error.details[0].message });
      }

      // Update user data
      const updatedUserData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password
          // Add other fields as needed
      };

      // Update password if provided
      if (req.body.password) {
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          updatedUserData.password = hashPassword;
      }

      // Perform the update
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });

      // Respond with the updated user data
      res.json(updatedUser);
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
});

  
  // Delete a user
  router.delete('/:id', async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  
module.exports = router;
