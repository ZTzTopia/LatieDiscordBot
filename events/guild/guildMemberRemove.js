const db = require("../../configdb.js");
module.exports = (client, member) => {
    db.query(`SELECT * FROM guildconfig WHERE gid = '${member.guild.id}'`, (err, result) => {
    	if(err) {
    		console.log(err)
    	} else {
    		if(result > 1) {
		    	let leaveId = result[0].lid;
		    	if (parseInt(leaveId) > 0)
		    	{
			        let leaveMsg = result[0].leavemsg
			        	.replace('{guildid}', member.guild.id)
			        	.replace('{guildsize}', member.guild.members.size)
			        	.replace('{guild}', member.guild)
			        	.replace('{userid}', member.id)
			        	.replace('{usertag}', member.user.tag)
			        	.replace('{username}', member.user.username)
			        	.replace('{user}', member)
			        	.replace('{avatar}', member.user.avatarURL);
			        let channelLeave = client.channels.get(leaveId);
			        channelLeave.send(leaveMsg);
			    }
			}
		}
    });
}
