/**
 * Created by hama on 2017/3/29.
 */
function parsePromised (json) {
    return new Promise(function (fulfill, reject) {
        try {
            fulfill(JSON.parse(json));
        } catch (e) {
            reject(e);
        }
    });
};
parsePromised(process.argv[2])
    .then(null, console.log)