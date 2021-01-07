'use strict';

class Tab{
    constructor(url,favicon,counter){
        this.url = url;
        this.favicon = favicon;
        if(counter !== undefined){
            this.counter = counter;
        } else{
            this.counter = 0;
        }
        this.blacklist = false;
        this.limit = -1;
        this.begstr = "http";
    }
}