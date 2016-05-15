declare module RandomUser {
    interface User {
        cell:string;
        dob: number;
        email:string;
        gender:string;
        id: number,
        location: Location,
        login: Login,
        name: Name,
        nat:string;
        phone:string;
        picture: Picture,
        registered:number;
    }
    interface Location {
        city:string;
        postcode:number;
        state:string;
        street:string;
    }
    interface Login {
        md5:string;
        password:string;
        salt:string;
        sha1:string;
        sha256:string;
        username:string;
    }
    interface Name {
        first:string;
        last:string;
        title:string;
    }
    interface Picture {
        large:string;
        medium:string;
        thumbnail:string;
    }
}