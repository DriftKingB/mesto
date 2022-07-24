export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getCohortCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
    });
  }

  postSectionItem(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  removeCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  putCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    });
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  patchUserInfo(userName, userAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    });
  }

  patchUserAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }
}
