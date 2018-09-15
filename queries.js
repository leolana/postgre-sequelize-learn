const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "postgres://itlab:45qweas45@localhost:5432/puppies"
);

const Puppy = sequelize.define(
  "pups",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    breed: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    },
    sex: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

function getAllPuppies(req, res, next) {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  Puppy.findAll()
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL puppies"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  Puppy.findById(pupID)
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE puppy"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age);
  const { name, breed, age, sex } = req.body;
  Puppy.create({ name, breed, age, sex })
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Inserted one puppy"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  req.body.age = parseInt(req.body.age);
  const { name, breed, age, sex } = req.body;

  var puppy = Puppy.build({ id: pupID, name, breed, age, sex }, { isNewRecord: false })

  puppy.save({fields: ['name', 'breed', 'age', 'sex']})
    .then(function() {
      res.status(200).json({
        status: "success",
        message: "Updated puppy"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  var puppy = Puppy.build({ id: pupID }, { isNewRecord: false })
  puppy.destroy().then(function(result) {
      /* jshint ignore:start */
      res.status(200).json({
        status: "success",
        message: `Removed ${result.rowCount} puppy`
      });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
};
