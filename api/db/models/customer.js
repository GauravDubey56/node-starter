module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "users",
    {
      name: {
        type: DataTypes.STRING,
      },
      extra_details: {
        type: DataTypes.JSON,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  Users.get = async (whereData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await Users.findAll({
          raw: true,
          ...(Object.keys(whereData).length && { where: whereData }),
        });
        if (data && Array.isArray(data) && data.length) {
          resolve({ status: 200, data });
        } else {
          resolve({ status: 400 });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  Users.insertData = async (newObject, transaction) => {
    return new Promise(async (resolve, reject) => {
      try {
        const insertData = await Users.create(newObject, {
          transaction,
        });
        if (insertData && insertData.dataValues) {
          resolve({ status: 200, data: insertData.dataValues });
        } else {
          reject("Data cannot be inserted into users table.");
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  Users.updateData = async (
    newObject,

    whereData,
    transaction
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const updateData = await Users.update(
          newObject,
          {
            where: whereData,
          },
          { transaction }
        );
        resolve({ status: 200, data: {} });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  return Users;
};
