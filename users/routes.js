import * as dao from "./dao.js";

function UserRoutes(app) {
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    if (req.session["currentUser"]._id === userId) {
      const currentUser = await dao.findUserById(userId);
      req.session["currentUser"] = currentUser;
    }
    res.json(status);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser({
      ...req.body,
      signUpDate: new Date().toJSON(),
    });
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };
  const account = async (req, res) => {
    res.json(req.session["currentUser"]);
  };
  const addToRecentlyViewed = async (req, res) => {
    if (req.session["currentUser"]) {
      const { pokemonId } = req.params;
      const recentlyViewed = req.session["currentUser"].recentlyViewed;
      // add the new pokemon and removes any duplicates
      const updatedViewed = recentlyViewed.filter((pok) => pok !== pokemonId);
      updatedViewed.push(pokemonId);
      // make sure it only tracks up to 10
      if (updatedViewed.length > 10) {
        updatedViewed.shift();
      }
      const newUser = {
        ...req.session["currentUser"],
        recentlyViewed: updatedViewed,
      };
      await dao.updateUser(req.session["currentUser"]._id, newUser);
      req.session["currentUser"] = newUser;
      res.json(newUser);
    } else {
      res.status(401).send("Unauthorized, not logged in");
    }
  };

  // TODO: update these to fit us
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/account", account);
  app.put("/api/users/recentlyViewed/:pokemonId", addToRecentlyViewed);
}

export default UserRoutes;
