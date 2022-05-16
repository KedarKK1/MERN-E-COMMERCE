// query is any like myKeyword and queryString is like wadapao this results into localhost:/?myKeyword=wadapao
// query in url means anything after /?
class ApiFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search()
    {
        // tertiary opertor if found and if not found
        // below i means case-insensitive means abc==ABC
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                // small i means case insensitive regex this can be found on mongodb
                $options: "i",
            }
        } : {}

        // console.log(keyword);

        // spread syntax is a new addition to the set of operators in JavaScript ES6.It takes in an iterable (e.g an array) and expands it into individual elements
        this.query = this.query.find({ ...keyword });
        // we are returning this class
        return this;
    }

    filter()
    {
        // spread syntax is a new addition to the set of operators in JavaScript ES6.It takes in an iterable (e.g an array) and expands it into individual elements
        // below this.queryStr is an object's reference hence it is reference to that object hence we have to use below to make it object not reference
        // const queryCopy = {...this.queryStr}
        const queryCopy = {...this.queryStr}
        console.log(queryCopy);
        // removing some fields for category
        // eg. we'll be removing ?keywords after tag
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key) => delete queryCopy[key]);
        // console.log(queryCopy);
        // this.query= this.query.find(queryCopy);

        // for changing our querrys to a range, gt and lt, we have to insert it a $ sign, after that we can use mngodb operators for that range
        // for $ sign, we have to make it string
        let queryStr = JSON.stringify(queryCopy);
        // using regex here for replacing gt by $gt
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);
        // console.log(queryStr);

        this.query= this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage)
    {
        const currentPage = Number(this.queryStr.page) || 1;

        // say per page 10 and total page 50 then on 2nd page we skip 10 then on 3rd page we skip 20
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;