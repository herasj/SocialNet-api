
module.exports = {
    render: (err,res) => {
        switch (err) {
            case 404:
                res.render('error',{err: "404"});
                break;

            case 403:
                res.render('error',{err: "403"});
                break;

            case 401:
                res.render('error',{err: "401"});
                break;    
            default:
                res.render('error',{err: " . . . "});
                break;
        }
    }
    
}