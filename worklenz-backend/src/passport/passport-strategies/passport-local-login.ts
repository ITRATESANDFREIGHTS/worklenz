import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { log_error } from "../../shared/utils";
import db from "../../config/db";
import { Request } from "express";

async function handleLogin(req: Request, email: string, password: string, done: any) {
  console.log("Login attempt for:", email);

  if (!email || !password) {
    console.log("Missing credentials");
    return done(null, false, { message: "Please enter both email and password" });
  }

  try {
    const q = `SELECT id, email, google_id, password
               FROM users
               WHERE email = $1
                 AND google_id IS NULL
                 AND is_deleted IS FALSE;`;
    const result = await db.query(q, [email]);
    console.log("User query result count:", result.rowCount);
    
    const [data] = result.rows;
    console.log("data", data);

    if (!data?.password) {
      console.log("No account found");
      return done(null, false, { message: "No account found with this email" });
    }

    const passwordMatch = bcrypt.compareSync(password, data.password);
    console.log("Password match:", passwordMatch);
    
    if (passwordMatch && email === data.email) {
      delete data.password;
      console.log("=== LOGIN SUCCESS DEBUG ===");
      console.log("About to call done with user:", data);
      console.log("User structure:", JSON.stringify(data, null, 2));
      return done(null, data, {message: "User successfully logged in"});
    }
    return done(null, false, { message: "Incorrect email or password" });
  } catch (error) {
    console.error("Login error:", error);
    log_error(error, req.body);
    return done(error);
  }
}

export default new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true
}, (req, email, password, done) => void handleLogin(req, email, password, done));