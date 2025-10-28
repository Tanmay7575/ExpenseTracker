import User from "../model/User.js";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register a user

export const register= async (req, res) => {
  try {
    const { name, email, password } = req.body;
   
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z](?=.*[a-zA-Z0-9]).{8,})/;
    if(passwordRegex.test(password)){
      return res.status(400).json({
        message:"password must contain at least one uppercase,lowerCase and 8 character min"
      })
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "user allready Exists" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id,role:newUser.role}, process.env.SECRETKEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
      sameSite: "None",
    });

    return res
      .status(200)
      .json({ message: "user Registered Susscessfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//login user
export const login=async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const hashedpassword = await bcrypt.compare(password, user.password);
    if (!hashedpassword) {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const token=jwt.sign(
      {userId:user._id,role:user.role},
      process.env.SECRETKEY,
      {expiresIn:"1d"}
    );
    res.cookie("auth_token",token,{
      httpOnly:true,
      secure: true,
      maxAge:86400000,
      sameSite:"None"
    });
  

    return res.status(200).json({ message: "user LogedIn Successfully",token});
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

//if you want to forgot password 
export const forgotPassword=async(req,res)=>{
  try {
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"User not Found"});
    }

    const token=jwt.sign({id:user._id},process.env.SECRETKEY,
      {expiresIn:"15m",});
      const resetLink =`${process.env.FRONTEND_URL}/reset-password/${token}`;
      
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host:"smtp.ethereal.email",
        port:587,
        auth:{
          user:testAccount.user,
          pass:testAccount.pass,
        }
      });

      const info = await transporter.sendMail({
      from: '"MyApp" <no-reply@myapp.com>',
      to: `${email}`,
      subject: "Password Reset",
      html:`<a href=${resetLink}>click to reset password</a>`
});
     console.log("Preview URL:", nodemailer.getTestMessageUrl(info));   
     const link=nodemailer.getTestMessageUrl(info);
      res.json({message:"password reset link sent to your email.",link});
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
};

//reset password using nodemailer
export const resetPassword=async(req,res)=>{
  try {

    const {token}=req.params;
    const {password}=req.body;

    const decoded = jwt.verify(token,process.env.SECRETKEY);
    const user=await User.findById(decoded.id);
    if(!user)return res.status(400).json({message:"Invalid Token"});

    const hashedPassword=await bcrypt.hash(password,10);
    user.password=hashedPassword;
    await user.save();
    return res.status(200).json({message:"password change successfully"});
  } catch (error) {
    res.status(400).json({message:"Invalid or Expireed token"});
  }
};

// get all users
export const allUsers=async (req, res) => {
  const users = await User.find();
  return res.status(200).json(users);
};

//verify token for authentication in frontend
export const verifyTok= (req, res) => {
  res.status(200).json({ userId: req.userId, role: req.role });
};

//logout the valid user
export const logout= (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Logged Out Successfully" });
};

