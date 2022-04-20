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
        this.id=this.median_age+this.median_income+this.median_value+this.households+this.latitude+this.longitude+this.population+this.total_bedrooms+this.total_rooms+this.distance_to_coast;
        if(info[10]<info[11]&&info[10]<info[12]&&info[10]<info[13]){
            this._closest_metro="Los Angeles";
        }
        else if(info[11]<info[10]&&info[11]<info[12]&&info[11]<info[13]){
            this._closest_metro="San Diego";
        }
        else if(info[12]<info[11]&&info[12]<info[10]&&info[12]<info[13]){
            this._closest_metro="San Jose";
        }
        else if(info[13]<info[11]&&info[13]<info[12]&&info[13]<info[10]){
            this._closest_metro="San Francisco";
        }
        else{
            this._closest_metro="Two or more";
        }
    }
    get id(){
        return this._id;
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
    closest_metro_distance(){
        if(this.closest_metro==="Los Angeles")return this._distance_to_LA;
        else if(this.closest_metro==="San Diego")return this._distance_to_SD;
        else if(this.closest_metro==="San Jose")return this._distance_to_SJ;
        else if(this.closest_metro==="San Francisco")return this._distance_to_SF;
        else{
            if(this._distance_to_LA>=this._distance_to_SD&&this._distance_to_LA>=this._distance_to_SJ&&this._distance_to_LA>=this._distance_to_SF){
                return this._distance_to_LA;
            }
            else if(this._distance_to_SD>=this._distance_to_SJ&&this._distance_to_SD>=this._distance_to_SF){
                return this._distance_to_SD;
            }
            else if(this._distance_to_SF>=this._distance_to_SD&&this._distance_to_SF>=this._distance_to_SJ){
                return this._distance_to_SF;
            }
            else return this._distance_to_SJ;
        }
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
         if(input<this.closest_metro_distance()){
             this._closest_metro="Los Angeles";
         }
    }
    set distance_to_SD(input){
         this._distance_to_SD=input;
         if(input<this.closest_metro_distance()){
             this._closest_metro="San Diego";
         }
    }
    set distance_to_SF(input){
         this._distance_to_SF=input;
         if(input<this.closest_metro_distance()){
             this._closest_metro="San Francisco";
         }
    }
    set distance_to_SJ(input){
         this._distance_to_SJ=input;
         if(input<this.closest_metro_distance()){
             this._closest_metro="San Jose";
         }
    }
    set id(input){
        this._id=this.median_age+this.median_income+this.median_value+this._distance_to_coast+this._households+this._latitude+this.longitude+this._population+this._total_bedrooms+this._total_rooms;
    }
    avg_household_size(){
        return (this.population/this.households);
    }
}
module.exports = neighborhood