export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userAvatarElement = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {};

    userInfo.name = this._userNameElement.textContent;
    userInfo.about = this._userAboutElement.textContent;
    userInfo.avatar = window.getComputedStyle(this._userAvatarElement).backgroundImage.slice(4, -1).replace(/"/g, "");

    return userInfo
  }

  setUserInfo(userName, userAbout) {
    this._userNameElement.textContent = userName;
    this._userAboutElement.textContent = userAbout;
  }

  setUserAvatar(avatarLink) {
    this._userAvatarElement.style.backgroundImage = `url(${avatarLink})`;
  }
}
