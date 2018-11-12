/**
 * Created by hama on 2017/3/29.
 */
function attachTitle(name){
    return 'DR.' + name;
}
Promise.resolve('MANHATTAN').then(attachTitle).then(console.log);

