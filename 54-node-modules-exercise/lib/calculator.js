{
    this.i = 0;

    this.add = function(i){ 
        this.i += i;   
        return this;  
    };
    
    this.subtract = function(i){  
        this.i -= i;  
        return this;  
    };

    this.divide = function(i){  
        this.i /= i;  
        return this;  
    };

    this.multiply = function(i){  
        this.i *= i;  
        return this;  
    };
    
    this.total = function(){
        const result = this.i  
        this.i= 0;
        return result
}
}
