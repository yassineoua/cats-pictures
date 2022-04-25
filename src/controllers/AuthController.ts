import User from '../models/User';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

/**
 *
 */
export async function register(req, res): Promise<void | any> {
  try {
    // Get user input
    const { firstname, lastname, email, password } = req.body;

    // Validate user input
    if (!(email && password && firstname && lastname)) {
      res.status(400).send('All input is required');
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.query().findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user: any = await User.query().insertAndFetch({
      firstname,
      lastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // return new user
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    return res.status(501).json(error);
  }
}

/**
 *
 * @param req
 * @param res
 */
export async function login(req, res): Promise<void | any> {
  const { email, password } = req.body;

  try {
    const user: any = await User.query().findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        if (response) {
          const expiresIn = 24 * 60 * 60;
          const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
            expiresIn: expiresIn,
          });

          return res.status(200).json({
            access_token: token,
            type: 'Bearer',
            expiresIn,
          });
        }

        return res.status(403).json('wrong_credentials');
      });
    } else {
      return res.status(404).json('user_not_found');
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json(error);
  }
}
