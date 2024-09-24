import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            fname: string;
            lname: string; 
            username?: string 
            password?: string  
        };
    }

    interface User {
        id: string; 
        role: string; 
        fname: string; 
        lname: string; 
    }
}
