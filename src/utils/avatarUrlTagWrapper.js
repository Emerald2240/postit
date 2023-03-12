function wrapAvatar(url, userHandle) {
    let img = `<img src='${url}' alt='${userHandle}'>`
    return img;
}

module.exports = wrapAvatar;