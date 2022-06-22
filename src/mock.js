import sha256 from "sha256";

export default async ({ sequelize }) => {
  const user = await sequelize.models.User.findOne();
  if (!user)
    await sequelize.models.User.bulkCreate([
      {
        username: "John",
        password: sha256("secret"),
        gender: "male",
        email: "john@gmail.com",
        age: 150,
        userImg: "John.png",
      },
      {
        username: "Tom",
        password: sha256("secret"),
        gender: "male",
        email: "tom@gmail.com",
        age: 25,
        userImg: "Tom.jpg",
      },
      {
        username: "Nick",
        password: sha256("secret"),
        gender: "male",
        email: "nick@gmail.com",
        age: 15,
        userImg: "Nick.jpg",
      },
      {
        username: "Julia",
        password: sha256("secret"),
        gender: "female",
        email: "julia@gmail.com",
        age: 19,
        userImg: "Julia.jpg",
      },
    ]);
};
