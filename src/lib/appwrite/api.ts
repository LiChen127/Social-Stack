import { INewUser } from "../../types/index."
import { ID } from "appwrite";
import { account } from "./config";

export const createUserAccount = async (user: INewUser) => {
  try {
    const body = {
      userId: ID.unique(),
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
    }
    const newAccount = await account.create(
      body.userId, body.email, body.password, body.username
    );
    return newAccount;
  } catch (err) {
    console.log(err);
    return err;
  }
}