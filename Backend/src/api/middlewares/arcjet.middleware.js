import aj from "../../config/arcjet.config.js";

import { isSpoofedBot } from "@arcjet/inspect";

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded. Please, try again later." });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({ message: "Access denied by security." });
      }
    }

    // check for the spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Malicious bot activity detected.",
        error: "Spoofed bot detected.",
      });
    }
    next();
  } catch (error) {
    console.log("arcjet error", error);
    next();
  }
};

export default arcjetProtection;
