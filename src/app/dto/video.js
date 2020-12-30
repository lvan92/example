const videoDetailDTO = (video) => {
    return {
        video_id: video.video_id,
        sponsor_id: video.sponsor_id,
        country_id: video.country_id,
        video_start: (video.video_start !== undefined) ? video.video_start : null,
        video_end: (video.video_end !== undefined) ? video.video_end : null,
        video_url: video.video_url,
        video_duration: video.video_duration,
    }
}

module.exports = {
    videoDetailDTO,
}