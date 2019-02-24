var express = require('express');
var router = express.Router();
const Users = require('../models/user');
const Invitations = require('../models/invitation');


/**delete invitation for user after approved */
// {
//     "userId":"5c6efb040595a400173ae0bf",
//     "invitationId":"5c71abd02378b04bd03b114a"
// }
router.post('/deleteInvitation',function(req, res) {
    Users.update({_id: req.body.userId},{$pull:{invitations:{$in:[req.body.invitationId]}}},function(err, user){
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else{
            Invitations.deleteOne({_id:req.body.invitationId},function(err,invite){
                if (err) {
                    console.error('GET Error: There was a problem retrieving: ' + err);
                    res.status(err.statusCode || 500).json(err);
                } 
                else{
                   console.log("deeddeddede");
                   res.sendStatus(200);
                }
            })
        }
    })
})


//manager create invitation for user
// {
//     הלל מזמין את שמשון הגיבור
//     "userId": "5c6edadfd365780017fb96ec",
//     "auth": "5c6ea9761583090c5c4ba591",
//     "groupId": "5c6efa990595a400173ae0bd",
//     "newUser": "5c6efb040595a400173ae0bf",
// }
router.post('/invitationByAdmin', function (req, res) {
    Users.findOne({ _id: req.body.userId, 'groups.authorizationId': "5c6ea9761583090c5c4ba591" }).exec(function (err, admin) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            if (admin) {
                Invitations.create({ invitedBy: req.body.userId, groupId: req.body.groupId }, function (err, invitation) {
                    if (err) {
                        console.error('GET Error: There was a problem retrieving: ' + err);
                        res.status(err.statusCode || 500).json(err);
                    }
                    else {
                        Users.updateOne({ _id: req.body.newUser }, { $push: { invitations: invitation._id } }, function (err, newUser) {
                            if (err) {
                                console.error('GET Error: There was a problem retrieving: ' + err);
                                res.status(err.statusCode || 500).json(err);
                            }
                            else {
                                res.json(newUser);
                            }
                        })

                    }
                })
            }

        }
    });
});



/* get user invitations*/
router.post('/', function (req, res) {
    Users.findOne({ _id: req.body.userId }).populate({path: 'invitations', populate: [
    { path: 'invitedBy', populate: 'user',select:
    {'userName':0,'password':0,'groups':0,'email':0,'invitations':0,'img':0}},
    { path: 'groupId', populate: 'group',select:
    'groupName'}] }).exec(function (err, invitations) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            res.json(invitations);
        }
    }
    );
});
/** get all exist invitations */
router.get('/', function (req, res) {
    Invitations.find({}).exec(function (err, invitations) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            res.json(invitations);
        }
    });
});
router.post('/new', function (req, res) {
    Invitations.create({ invitedBy: req.body.userId, groupId: req.body.groupId }, function (err, invitation) {
        if (err) {
            console.error('GET Error: There was a problem retrieving: ' + err);
            res.status(err.statusCode || 500).json(err);
        }
        else {
            res.json(invitation);
        }
    });
});


module.exports = router;
