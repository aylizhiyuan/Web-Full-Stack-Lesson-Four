/**
 * Created by hama on 2017/3/29.
 */
Parse.User.logIn('user', 'pass', {
    success: function (user) {
        query.find({
            success: function (results) {
                results[0].save({ key: value }, {
                    success: function (result) {
                        // the object was saved
                    }
                });
            }
        });
    }
});

//使用promise的好处
Parse.User.logIn('user', 'pass').then(function (user) {
    query.find().then(function (results) {
        results[0].save({ key: value }).then(function (result) {
            // the object was saved
        });
    });
});


//示例代码
var firstPromise = first();
var secondPromise = firstPromise.then(function(val){
    return second(val);
})
secondPromise.then(console.log);
// As an alternative to the code above, ou could also do this:
// first().then(second).then(console.log);