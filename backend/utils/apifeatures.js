// query is any like myKeyword and queryString is like wadapao this results into localhost:/?myKeyword=wadapao
// query in url means anything after /?
class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search()
    {
        // tertiary opertor if found and if not found
        // below i means case-insensitive means abc==ABC
        const keyword = this.queryString.keyword ? {
            name : {
                $regex: this.queryString.keyword,
                $options: "i"
            }
        } : {}

        // console.log(keyword);

        // spread syntax is a new addition to the set of operators in JavaScript ES6.It takes in an iterable (e.g an array) and expands it into individual elements
        this.query = this.query.find({...keyword});
        // we are returning this class
        return this;
    }

    filter()
    {
        // spread syntax is a new addition to the set of operators in JavaScript ES6.It takes in an iterable (e.g an array) and expands it into individual elements
        // below this.queryStr is an object's reference hence it is reference to that object hence we have to use below to make it object not reference
        // const queryCopy = {...this.queryStr}

        // removing some fields for category

    }
}

module.exports = ApiFeatures;