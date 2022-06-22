import sha256 from "sha256";

export default async ({ sequelize }) => {
  const user = await sequelize.models.User.findOne();
  if (!user)
    await sequelize.models.User.bulkCreate([
      {
        username: "John",
        password: sha256("secret"),
        gender: "male",
        age: 150,
        userImg: 'John.png'
      },
      {
        username: "Tom",
        password:sha256("secret"),
        gender: "male",
        age: 25,
        userImg: 'Tom.jpg'
      },
      {
        username: "Nick",
        password:sha256("secret"),
        gender: "male",
        age: 15,
        userImg: 'Nick.jpg'
      },
      {
        username: "Julia",
        password:sha256("secret"),
        gender: "female",
        age: 19,
        userImg: 'Julia.jpg'
      },
    ]);
};
