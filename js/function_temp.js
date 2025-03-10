chatRank = (rank, cl) => {
	return `<img title="${systemRankTitle(rank)}" src="${systemRankIcon(rank)}" class="${cl}"/>`;
}
myAvatar = t => {
	if(t.includes('default')){
		return `default_images/avatar/${t}`;
	}
	else {
		return `avatar/${t}`;
	}
}
ghostLog = t => {
	if(t > 0){
		return 'ghost_post';
	}
	else {
		return '';
	}
}

// CHAT LOGS

chatLogTemplate = t => {
	var quoted = '';
		var style_level = levelStyle(t.user_level);
	if(t.quote !== null && !ignored(t.quote.quser)){
		quoted = `
			<div class="cqbox quote${t.quote.qid}">
				<div class="cquote">
					<div class="cqwrap">
						<div class="cqav">
							<img src="${myAvatar(t.quote.qtumb)}" onerror="avFix(this);"/>
						</div>
						<div class="cqcontent">
							<div class="cqname">${t.quote.qname}</div>
							<div class="cqmess">${t.quote.qcontent}</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
	return 	`
		<li id="log${t.log_id}" data="${t.log_id}" class="chat_log ch_logs ${t.log_type} ${ghostLog(t.gpost)}">
			<div class="avtrig avs_menu chat_avatar" data-i="l${t.log_id}" data-av="${myAvatar(t.user_tumb)}" data-cover="${t.user_cover}" data-id="${t.user_id}" data-name="${t.user_name}" data-rank="${t.user_rank}" data-level="${t.user_level}" data-bot="${t.user_bot}" data-gender="${t.user_gender}" data-country="${t.user_country}" data-age="${t.user_age}">
				<img class="cavatar avav ${t.gborder}" src="${myAvatar(t.user_tumb)}"/>${t.level}
				<span style="background:${style_level}" title="stage" class="user_stage_2023">${t.user_level}</span>
			</div>
			<div class="my_text">
				<div class="btable">
					<div class="cname">${chatRank(t.user_rank, 'chat_rank')}<span class="username ${t.user_color}">${t.user_name}</span></div>
					<div class="cdate sub_chat">${t.log_date}</div>
				<div class="cclear logs_menu sub_chat" data-id="${t.log_id}" data-user="${t.user_id}" data-bot="${t.user_bot}">
    <i class="fa fa-ellipsis-h"></i>
 
</div>

				</div>
				${quoted}
				<div class="chat_message ${t.user_tcolor}">${t.log_content}</div>
			</div>
		</li>
	`;
}
systemLogTemplate = t => {
	return 	`
		<li id="log${t.log_id}" class="chat_log sys_log">
			<div data="${t.user_id}" class="get_info chat_savatar">
				<img class="savatar avav" src="${myAvatar(t.user_tumb)}"/>
			</div>
			<div class="bcell_mid chat_system hpad5">
				${t.log_content}
			</div>
		</li>
	`;
}

createChatLog = t => {
	if(t === null){
		return;
	}
	if(t.log_sys > 0){
		return `${systemLogTemplate(t)}`;
	}
	else {
		return `${chatLogTemplate(t)}`;
	}
}

// CHAT TOPIC 

topicTemplate = t => {
	if('content' in t){
		return `
			<li class="other_logs splog topic_log">
				<div class="topic_icon">
					<img class="tpicon" src="${t.icon}"/>
				</div>
				<div class="my_text">
					<div class="btable">
						<div class="bcell_mid bold tptitle">
							${t.title}
						</div>
						<div onclick="hideThisPost(this)"; class="tpclear">
							<i class="fa fa-times"></i>
						</div>
					</div>
					<div class="chat_message text_small tptext">
						${t.content}
					</div>
				</div>
			</li>
		`;
	}
}
renderTopic = t => {
	if(t !== ''){
		return topicTemplate(t);
	}
}

// PRIVATE LOGS

hunterPrivateTemplate = t => {
	var quoted = '';
	if(t.quote !== null){
		quoted = `<div class="pquote${t.quote.qpost} hunt_quote">${t.quote.qcontent}</div><div class="clear"></div>`;
	}
	return `
		<li  data-id="${t.log_id}" data-av="${myAvatar(t.user_tumb)}" data-name="${t.user_name}" class="outpriv privlog" id="priv${t.log_id}">
			<div class="private_logs">
				<div class="private_avatar">
					<img data="${t.user_id}" class="get_info avatar_private" src="${myAvatar(t.user_tumb)}"/>
				</div>
				<div class="priwrap">
					<div class="privcont">
						<div class="prbox">${quoted}<div class="hunter_private">${t.log_content}</div></div>
						<div class="privopt sub_priv"></div>
					</div>
					<div class="prdate sub_priv">${t.log_date}</div>
				</div>
			</div>
		</li>
	`;
}
targetPrivateTemplate = t => {
	var quoted = '';
	if(t.quote !== null){
		quoted = `<div class="pquote${t.quote.qpost} targ_quote">${t.quote.qcontent}</div><div class="clear"></div>`;
	}
	return `
		<li data-id="${t.log_id}" data-av="${myAvatar(t.user_tumb)}" data-name="${t.user_name}" class="inpriv privlog" id="priv${t.log_id}">
			<div class="private_logs">
				<div class="priwrap">
					<div class="privcont">
						<div class="privopt sub_priv"></div>
						<div class="prbox">${quoted}<div class="target_private">${t.log_content}</div></div>
					</div>
					<div class="prdate sub_priv">${t.log_date}</div>
				</div>
				<div class="private_avatar">
					<img data="${t.user_id}" class="get_info avatar_private" src="${myAvatar(t.user_tumb)}"/>
				</div>
			</div>
		</li>
	`;
}
createPrivateLog = t => {
	if(t === null){
		return;
	}
	if(mySelf(t.user_id)) {
		return `${hunterPrivateTemplate(t)}`;
	} 
	else {
		return `${targetPrivateTemplate(t)}`;
	}
}
cannotPrivateTemplate = () => {
	return `
		<li id="cannot_private" class="vpad5 hpad5">
			<div class="cannotpriv">
				<div class="bcell_mid  pad10 alert_neutral centered_element brad10 text_small bold">
					${system.cannotContact}
				</div>
			</div>
		</li>
	`;
}

function levelStyle(level) {
    var color;
    if (level >= 0 && level <= 3) {
        color = '#4d0000';
    } else if (level >= 4 && level <= 10) {
        color = '#660099';
    } else if (level >= 11 && level <= 15) {
        color = '#e60000';
    } else if (level >= 16 && level <= 20) {
        color = '#00b377';
    } else if (level >= 21 && level <= 25) {
        color = '#0000b3';
    } else if (level >= 26 && level <= 30) {
        color = '#b300b3';
    } else if (level >= 31 && level <= 35) {
        color = '#e68a00';
    } else if (level >= 36 && level <= 40) {
        color = '#009900';
    } else if (level >= 41 && level <= 45) {
        color = '#000099';
    } else if (level >= 46 && level <= 50) {
        color = '#e6005c';
    } else if (level >= 51 && level <= 55) {
        color = '#6A5ACD';
    } else if (level >= 56 && level <= 60) {
        color = '#800080';
    } else if (level >= 61 && level <= 65) {
        color = '#8B4513';
    } else if (level >= 66 && level <= 70) {
        color = '#2E8B57';
    } else if (level >= 71 && level <= 75) {
        color = '#800000';
    } else if (level >= 76 && level <= 80) {
        color = '#000080';
    } else if (level >= 81 && level <= 85) {
        color = '#552D00';
    } else if (level >= 86 && level <= 90) {
        color = '#000000';
    } else {
        color = '#000000';
    }
    return color;
}