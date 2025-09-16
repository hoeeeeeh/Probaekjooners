function solution(record) {
    const userList = {};
    
    const records = [...record].map((rec) => {
        const [status, uid, nickname] = rec.split(' ');
        if(status.toLowerCase() === "enter") {
            if(userList.hasOwnProperty(uid)) {
                userList[uid].user.nickname = nickname;
                return new Record(status, userList[uid].user);
            }
            
            const user = new User(uid, nickname);
            const userRecord = new Record(status, user);
            userList[uid] = userRecord;
            return userRecord;
        }
        
        if(status.toLowerCase() === 'leave') {
            return new Record(status, userList[uid].user);
        }
        
        userList[uid].user.nickname = nickname;
        return new Record(status, userList[uid].user);
    })
    .filter((rec) => {
        return rec.status.toLowerCase() !== 'change';
    })
    .map((rec) => {
        const {status, user} = rec;
        return `${user.nickname}${statusString(status)}`;
    })
    
    return records;
}

class Record {
    status = null;
    user = null;
    
    constructor(status, user) {
        this.status = status;
        this.user = user;
    }
}

function statusString(string) {
    if(string.toLowerCase() === 'enter') {
        return "님이 들어왔습니다.";
    }
    
    if(string.toLowerCase() === 'leave') {
        return "님이 나갔습니다."
    }
    
    return undefined;
}

class User {
    uid = null;
    nickname = null;
    
    constructor(uid, nickname) {
        this.uid = uid;
        this.nickname = nickname;
    }
}