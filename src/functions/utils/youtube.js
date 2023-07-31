const ytdl = require('ytdl-core')

const { BadRequestError, InternalServerError } = require("../../errors/commonErrors");

// https://www.npmjs.com/package/ytdl-core
const videoFormatFilter = ['audioonly','videoonly','audioandvideo']

module.exports.selectVideoFormat = async(youtubeLink, formatFilter='audioandvideo')=>{
  try {
    if(!videoFormatFilter.includes(formatFilter)){
      throw new BadRequestError("Invalid formatFilter for Youtube video.","youtube-selectVideoFormat")
    }
    const info = await ytdl.getInfo(youtubeLink);
    // You can mux audio+video manually and stream it for better quality
    // let format = ytdl.chooseFormat(info.formats, { quality: '134' });
    let audioAndVideoFormats = ytdl.filterFormats(info.formats, formatFilter);
    if (audioAndVideoFormats){
      return audioAndVideoFormats[0]
    }else{
      throw new BadRequestError("Video with required quality is not availble.","youtube-getLink")
    }
  } catch (err) {
    console.log(err);
    throw new InternalServerError(err.message,"youtube-selectVideoFormat")
  }
}

module.exports.getThumbnail = (youtubeLink) =>{
  try {
    return `https://i.ytimg.com/vi/${ytdl.getURLVideoID(youtubeLink)}/maxresdefault.jpg`
  } catch (err) {
    throw new BadRequestError(`Invalid Youtube URL: ${youtubeLink}`,'youtube-getThumbnail')
  }
}
