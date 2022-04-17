class neighborhood{
    constructor(info){
        this.median_value=info[0];
        this.median_income=info[1];
        this.median_age=info[2];
        this.total_rooms=info[3];
        this.total_bedrooms=info[4];
        this.population=info[5];
        this.households=info[6];
        this.latitude=info[7];
        this.longitude=info[8];
        this.distance_to_coast=info[9];
        this.distance_to_LA=info[10];
        this.distance_to_SD=info[11];
        this.distance_to_SJ=info[12];
        this.distance_to_SF=info[13];
        if(info[10]>info[11]&&info[10]>info[12]&&info[10]>info[13]){
            this._closest_metro="Los Angeles";
        }
        else if(info[11]>info[10]&&info[11]>info[12]&&info[11]>info[13]){
            this._closest_metro="San Diego";
        }
        else if(info[12]>info[11]&&info[12]>info[10]&&info[12]>info[13]){
            this._closest_metro="San Jose";
        }
        else if(info[13]>info[11]&&info[13]>info[12]&&info[13]>info[10]){
            this._closest_metro="San Francisco";
        }
        else{
            this._closest_metro="Two or more";
        }
    }
    get median_value(){
        return this._median_value;
    }
    get median_income(){
        return this._median_income;
    }
    get median_age(){
        return this._median_age;
    }
    get total_rooms(){
        return this._total_rooms;
    }
    get total_bedrooms(){
        return this._total_bedrooms;
    }
    get population(){
        return this._population;
    }
    get households(){
        return this._households;
    }
    get latitude(){
        return this._latitude;
    }
    get longitude(){
        return this._longitude;
    }
    get distance_to_coast(){
        return this._distance_to_coast;
    }
    get distance_to_LA(){
        return this._distance_to_LA;
    }
    get distance_to_SD(){
        return this._distance_to_SD;
    }
    get distance_to_SF(){
        return this._distance_to_SF;
    }
    get distance_to_SJ(){
        return this._distance_to_SJ;
    }
    get closest_metro(){
        return this._closest_metro;
    }
    set median_value(input){
        this._median_value=input;
    }
    set median_income(input){
        this._median_income=input;
    }
    set median_age(input){
         this._median_age=input;
    }
    set total_rooms(input){
         this._total_rooms=input;
    }
    set total_bedrooms(input){
         this._total_bedrooms=input;
    }
    set population(input){
         this._population=input;
    }
    set households(input){
         this._households=input;
    }
    set latitude(input){
         this._latitude=input;
    }
    set longitude(input){
         this._longitude=input;
    }
    set distance_to_coast(input){
         this._distance_to_coast=input;
    }
    set distance_to_LA(input){
         this._distance_to_LA=input;
         if(input<this.closest_metro){
             this._closest_metro=input;
         }
    }
    set distance_to_SD(input){
         this._distance_to_SD=input;
         if(input<this.closest_metro){
             this._closest_metro=input;
         }
    }
    set distance_to_SF(input){
         this._distance_to_SF=input;
         if(input<this.closest_metro){
             this._closest_metro=input;
         }
    }
    set distance_to_SJ(input){
         this._distance_to_SJ=input;
         if(input<this.closest_metro){
             this._closest_metro=input;
         }
    }
    avg_household_size(){
        return population/households;
    }
}
module.exports = neighborhood