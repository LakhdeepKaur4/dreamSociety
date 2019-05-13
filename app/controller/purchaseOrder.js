const db = require("../config/db.config.js");
const config = require("../config/config.js");
const httpStatus = require("http-status");
var passwordGenerator = require("generate-password");
const key = config.secret;
const fs = require("fs");
const http = require('http');
const crypto = require("crypto");
const Op = db.Sequelize.Op;
const path = require("path");
const shortId = require("short-id");
const nodeMailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const jwt = require('jsonwebtoken');
const mailjet = require('node-mailjet').connect('5549b15ca6faa8d83f6a5748002921aa', '68afe5aeee2b5f9bbabf2489f2e8ade2');
const bcrypt = require('bcryptjs');
const randomInt = require('random-int');
const RfId = db.rfid;
const Vendor = db.vendor;


exports.create1 = async (req, res, next) => {
    try{
        
    } catch(error){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);

    }
}