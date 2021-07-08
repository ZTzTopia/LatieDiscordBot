const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    lUserId: { type: Number },
    lGuildId: { type: Number },
    
    lLevel: { type: Number, default: 1 },
    lXp: { type: Number, default: 0 },
    lMathXp: { type: Number, default: 50 }
});

module.exports = mongoose.model('Member', MemberSchema);