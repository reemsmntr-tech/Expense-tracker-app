export async function login(email: string, password:string): Promise<IAuth>{
const response = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        email,
        password
    }),
});
const data = await response.json();
return data
}

export async function register(
username: string,
email: string,
password:string ,
confirmPassword: string
): Promise<IAuth>{
const response = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers:{
        "Content-Type":"application/json",
    },
    body: JSON.stringify({
        username,
        email,
        password ,
        confirmPassword
    }),
});
const data = await response.json();
return data
};




interface IUser {
    username: string;
    email: string;
    password: string;
    _id: string ;
    createdAt: string ;
    updatedAt : string
};

export interface IAuth {
    token: string;
    user: IUser;
};

export interface Transaction {
    _id: string ;
    amount: number;
    name: string;
    startDate: Date;
    message?: string
};