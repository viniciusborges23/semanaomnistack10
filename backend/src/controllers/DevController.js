const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(_, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [latitude, longitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },

  async update(req, res) {},

  async destroy(req, res) {
    const { id } = req.params;

    try {
      const dev = await Dev.findOne({ _id: id });
      if (!dev) {
        return res.sendStatus(404);
      }

      await Dev.deleteOne({ _id: id });
      return res.sendStatus(204);
    } catch (e) {
      return res.sendStatus(500);
    }
  }
};
