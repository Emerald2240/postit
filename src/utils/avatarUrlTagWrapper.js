//convert avatar url into img tag with src filled. Add user handle as alt text
function wrapAvatar(url, userHandle) {
    let img = `<img src='${url}' alt='${userHandle}'>`
    return img;
}

module.exports = wrapAvatar;