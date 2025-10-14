import cloudinary from "../../../config/cloudinary.config.js";
import Message from "../../../models/Message.js";
import User from "../../../models/User.js";

const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    console.log(filteredUsers);
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Errors in getAllContacts controller." });
  }
};
const getMessageById = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id } = req.params;
    const message = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: id,
        },
        {
          senderId: id,
          receiverId: myId,
        },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send({ message: "Error in the message controller." });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      // upload base64 image to cloudinary
      const uploadImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadImage.secure_url;
    }
    console.log(text, imageUrl);
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    // todo: send message in real time if user is online.
    res.status(200).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Server Error" });
  }
};

const getAllChats = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // find all the messages where the logged in user is either sender or receiver

    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
        },
        {
          receiverId: loggedInUserId,
        },
      ],
    });

    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error from message controller." });
  }
};

export { getMessageById, sendMessage, getAllChats, getAllContacts };
