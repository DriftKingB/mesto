export class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const userInfo = {};

    userInfo['userName'] = this._userNameElement.textContent;
    userInfo['userAbout'] = this._userAboutElement.textContent;

    return userInfo
  }

  setUserInfo(userName, userAbout) {
    this._userNameElement.textContent = userName;
    this._userAboutElement.textContent = userAbout;
  }
}
