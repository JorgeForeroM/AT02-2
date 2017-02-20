/**
 * Created by Administrator on 2/20/2017.
 */
module.exports = {
    TokenString : '',
    UserEmail : '',
    ExpirationTime : '',

    isValid:function () {
        return this.TokenString !== '';
    }
}