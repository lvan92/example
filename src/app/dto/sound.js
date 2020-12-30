const moment = require('moment');

const createSoundDTO = (soundReq, user) => {
    let result = [];
    soundReq.map(item => {
        let soundData = {
            sound_file_name: item.sound_file_name,
            sound_url: item.sound_url,
            sound_file_size: item.sound_file_size,
            created_by: user.user_id,
            sound_uploaded_date: new moment.utc().format('YYYY-MM-DD HH:mm:ss')
        };
        result.push(soundData);
    });

    return result;
};

const soundBasicDTO = (sounds) => {
    let result = [];
    sounds.map(item => {
        const obj = {
            sound_id: item.sound_id,
            sound_file_name: item.sound_file_name,
            sound_url: item.sound_url,
            sound_file_size: item.sound_file_size,
            sound_uploaded_date: moment.utc(item.sound_uploaded_date).local().format('YYYY-MM-DD HH:mm:ss'),
            isactive: item.isactive,
            created_by: item.created_by,
        }
        result.push(obj);
    });

    return result;
}

module.exports = {
    createSoundDTO,
    soundBasicDTO
}