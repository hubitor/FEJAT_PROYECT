'use strict';

exports.hello = function(request,response){
    return response.view('front/hello', {name: request.params.name});
}
