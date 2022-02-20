export default class ChangePassUser {
  constructor(_oldPassword,_newPassword, _confirmPassword) {
    this.oldPassword = _oldPassword;
    this.password = _newPassword;
    this.confirmPassword = _confirmPassword;
  }
}
