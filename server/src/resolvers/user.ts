import fetch from "node-fetch";
import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";
import { User } from "../entities/User";
import { COOKIE_NAME } from "../constants";
import { FieldError } from "./FieldError";

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    // Only reveal email if it belongs to the logged in user
    if (req.session.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @Query(() => Boolean)
  async verifyCaptcha(@Arg("token") token: string) {
    const parameters = new URLSearchParams();
    parameters.append("secret", process.env.GOOGLE_CAPTCHA_SECRET_KEY);
    parameters.append("response", token);

    const json = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "post",
      body: parameters as any,
    }).then(res => res.json());

    return json.success;
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    return User.findOne({ id: req.session.userId });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => UsernamePasswordInput) options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // Validate input
    const errors = validateRegister(options);

    if (errors) {
      return {
        errors,
      };
    }

    // Hash password
    const hashedPassword = await argon2.hash(options.password);

    let user;
    try {
      // Attempt to create new user with inputted values
      user = await User.create({
        displayName: options.username,
        username: options.username.toLowerCase(),
        email: options.email.toLowerCase(),
        password: hashedPassword,
      }).save();
    } catch (err) {
      if (err.code === "23505") {
        // Duplicate user error
        return {
          errors: [
            {
              field: "username",
              message: "Username or email already taken",
            },
          ],
        };
      }
    }

    // Store user id in session
    req.session.userId = user?.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail", () => String) usernameOrEmail: string,
    @Arg("password", () => String) password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const isEmail = usernameOrEmail.includes("@");

    // Find user entity matching email or username
    const user = await User.findOne({
      where: isEmail
        ? {
            email: usernameOrEmail.toLowerCase(),
          }
        : {
            username: usernameOrEmail.toLowerCase(),
          },
    });

    if (!user) {
      // If user does not exist
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "That username/email does not exist",
          },
        ],
      };
    }

    // Compare stored hashed password with inputted password
    const isLogin = await argon2.verify(user.password, password);

    if (!isLogin) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect credentials",
          },
        ],
      };
    }

    // Set user's session
    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      // destroy session data on server
      req.session.destroy((err) => {
        // clear cookie on client
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
