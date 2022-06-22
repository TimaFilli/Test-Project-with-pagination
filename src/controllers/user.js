import { AuthenticationError, ValidationError } from "../utils/errors.js";
import { Op } from "sequelize";
import sha256 from "sha256";
import path from "path";
import JWT from "../config/jwt.js";

const GET_USERS = async (req, res, next) => {
  try {
    const page = req.query.page;
    
    if (!page) {
      const users = await req.models.User.findAll({
        where: {
          userId: {
            [Op.ne]: req.userId,
          },
        },
        attributes: { exclude: ["password"] },
      });

      return res.status(200).send(users);
    }

    const limit = process.env.PAGINATION_LIMIT;
    const offset = 0 + (page - 1) * limit;

    const users = await req.models.User.findAndCountAll({
      offset: offset,
      limit: limit,
      where: {
        userId: {
          [Op.ne]: req.userId,
        },
      },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).send(users.rows);
  } catch (error) {
    next(error);
  }
};

const POST_LOGIN = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await req.models.User.findOne({
      where: {
        username,
        password: sha256(password),
      },
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new AuthenticationError("Wrong username or password!");
    }
    return res.status(200).json({
      status: 200,
      message: "The user successfully logged in!",
      data: user,
      token: JWT.sign({
        userId: user.userId,
        agent: req.headers["user-agent"],
      }),
    });
  } catch (error) {
    next(error);
  }
};
const POST_REGISTER = async (req, res, next) => {
  try {
    const { username, password, gender, age, email } = req.body;
    const file = req.files?.file;

    if (!file) {
      throw new ValidationError("file is required!");
    }

    if (!["image/jpg", "image/png", "image/jpeg"].includes(file.mimetype)) {
      throw new ValidationError("file must be valid image!");
    }

    if (file.size > 1024 * 1024 * 10) {
      throw new ValidationError("file size is too large!");
    }

    const user = await req.models.User.findOne({
      where: {
        username,
      },
    });

    if (user) {
      throw new AuthenticationError("The user already exists!");
    }

    const [, extname] = file.mimetype.split("/");
    const fileName = username + "." + extname;
    file.mv(path.join(process.cwd(), "uploads", fileName));

    const record = await req.models.User.create(
      {
        username,
        password: sha256(password),
        gender,
        age,
        email,
        userImg: fileName,
      },
      {
        returning: true,
      }
    );

    record.password = undefined;

    return res.status(200).json({
      status: 200,
      message: "The user successfully registered!",
      data: record,
      token: JWT.sign({
        userId: record.userId,
        agent: req.headers["user-agent"],
      }),
    });
  } catch (error) {
    next(error);
  }
};

const GET_USER = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await req.models.User.findOne({
      where: {
        userId,
      },
      attributes: { exclude: ["password"] },
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export default {
  POST_REGISTER,
  POST_LOGIN,
  GET_USERS,
  GET_USER,
};
