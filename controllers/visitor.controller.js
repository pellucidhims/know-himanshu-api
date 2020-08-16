const util = require('../utils/util');
const mail = require('../utils/mailingUtil')
const Visitor = require('../models/visitor.model')

const automatedMailHTML = (name = '', subject = '', message = '') => {
    return `<div style='text-align:center;'>
    <h3>
    	Thank you ${name || ''} for your message
    </h3>
    ${!!subject && `<p>
      	Here is what you wrote to me <br/><br/>
        <strong>${subject}</strong>
        <br/>
        ${(!!message && `<em>${message}</em>`) || ''}
    </p>`}
    <p>
    	I have received your message and if needed, will revert back shortly. 
    </p>
    <p>
    	Thanks and regards
    </p>
    <p>
    	Himanshu <br/>
        https://knowhimanshu.in
    </p>
  </div>`
}

const findVisitor = async (id = "", type = "email") => {
    if (!!id) {
        return await Visitor.findOne({ [type]: id })
    } else {
        throw (util.createError('Cannot find visitor by id', 400))
    }
}


const postMessage = async (req, res, next) => {
    try {
        if (req.body) {
            const { name = '', email = '', subject = '', message = '' } = req.body
            if (!name || !email || !subject) {
                return next(util.createError('Cannot save visitor message. Parameters missing', 400));
            }
            let newMessage = {
                subject,
                message,
                postedAt: Date.now()
            }
            let query = { email }, update = { '$push': { 'messages': newMessage }, '$set': { 'name': name } }
            Visitor.findOneAndUpdate(query, update, { upsert: true, new: 1 }, (err, doc) => {
                if (err)
                    next(err)
                mail.sendEmail({
                    sendTo: email,
                    subject: 'Thank you for your reaching out - knowhimanshu.in',
                    from: process.env.EMAIL_SENDER,
                    htmlMessage: automatedMailHTML(name,subject,message)
                })
                return res.send({ message: 'Message sent successfully.' })
            })
        } else {
            throw (util.createError('Request body missing', 400))
        }
    } catch (err) {
        return next(err);
    }
};

const getVisitor = async (req, res, next) => {
    try {
        let docs = await Visitor.aggregate([
            { $unwind: '$messages' },
            { $sort: { 'messages.postedAt': -1 } },
            { $group: { _id: '$_id', email: { $first: '$email' }, name: { $first: '$name' }, latestTs: { $max: '$messages.postedAt' }, messages: { $push: '$messages' } } },
            { $sort: { latestTs: -1 } }
        ])
        return res.send({ visitorMessages: docs })
    } catch (err) {
        console.log('$err:', err)
        return next(err);
    }
};

module.exports = {
    postMessage,
    findVisitor,
    getVisitor
};